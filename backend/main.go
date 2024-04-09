package main

import (
	"encoding/csv"
	"fmt"
	"net/http"

	"github.com/evanw/esbuild/pkg/api"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

type questionnaire struct {
	Questions []string `json:"questions"`
}

type invitation struct {
	Answers []answer `json:"answers"`
}

type answer struct {
	Answer string `json:"answer"`
}

type results struct {
	Questionnaire questionnaire `json:"questionnaire"`
	Invitations   []invitation  `json:"invitations,omitempty"`
}

var resultsData *results

func main() {
	reloadChan := make(chan struct{})
	liveReloadPlugin := api.Plugin{
		Name: "livereload",
		Setup: func(pb api.PluginBuild) {
			pb.OnEnd(func(result *api.BuildResult) (api.OnEndResult, error) {
				if len(result.Errors) > 0 {
					zap.S().Errorw("watch build failed", "errors", len(result.Errors))
				} else {
					zap.S().Infow("watch build succeeded", "warnings", len(result.Warnings))
				}
				reloadChan <- struct{}{}
				return api.OnEndResult{}, nil
			})
		},
	}

	conf := zap.NewDevelopmentConfig()
	logger, err := conf.Build()
	if err != nil {
		panic(err)
	}
	log := logger.Sugar()

	ctx, ctxErr := api.Context(api.BuildOptions{
		EntryPoints: []string{"C:/Users/quang/dev/ew/web/src/ew-content.ts"},
		Outfile:     "C:/Users/quang/dev/ew/web/build/bundle.js",
		Bundle:      true,
		LogLevel:    api.LogLevelInfo,
		Write:       true,
		Plugins:     []api.Plugin{liveReloadPlugin},
	})

	if ctxErr != nil {
		log.Fatalw("unable to get serving context", ctxErr)
	}

	err = ctx.Watch(api.WatchOptions{})
	if err != nil {
		log.Fatalw("unable to watch for changes", err)
	}

	r := gin.Default()
	r.Use(static.Serve("/", static.LocalFile("C:/Users/quang/dev/ew/web", false)))
	api := r.Group("/api")
	{
		api.GET("/hello", func(ctx *gin.Context) {
			ctx.JSON(http.StatusOK, "{\"data\": \"world!\"}")
		})
		api.POST("/upload", func(c *gin.Context) {
			// single file
			fileHeader, err := c.FormFile("file")
			if err != nil {
				c.String(http.StatusBadRequest, fmt.Sprintf("unable to read file: %s", err))
				return
			}

			file, err := fileHeader.Open()
			if err != nil {
				log.Errorw("unable to open file", err)
				c.Status(http.StatusInternalServerError)
				return
			}

			fileReader := csv.NewReader(file)
			data, err := fileReader.ReadAll()
			if err != nil {
				log.Errorw("unable to read file contents", err)
				c.String(http.StatusInternalServerError, fmt.Sprintf("unable to read file contents: %s", err))
				return
			}

			res := &results{}

			for i := 0; i < len(data); i++ {
				if i == 0 {
					q := questionnaire{}
					for _, v := range data[0] {
						q.Questions = append(q.Questions, v)
					}
					res.Questionnaire = q
					continue
				}

				inv := invitation{}
				for _, v := range data[i] {
					inv.Answers = append(inv.Answers, answer{Answer: v})
				}

				res.Invitations = append(res.Invitations, inv)
			}

			resultsData = res

			c.String(http.StatusOK, "file uploaded!")
		})
		api.GET("/data", func(c *gin.Context) {
			c.JSON(http.StatusOK, resultsData)
		})
	}

	// Allow live reloading of page when build is done
	r.GET("/esbuild", func(ctx *gin.Context) {
		ctx.Header("Content-Type", "text/event-stream")
		ctx.Header("Cache-Control", "no-cache")
		ctx.Header("Connection", "keep-alive")
		select {
		case <-reloadChan:
			ctx.SSEvent("change", "reload")
			zap.S().Info("Event sent")
			ctx.Writer.Flush()
			// ctx.Writer.Flush()
		case <-ctx.Done():
			// No-op
		}
	})

	r.NoRoute(func(ctx *gin.Context) {
		http.ServeFile(ctx.Writer, ctx.Request, "C:/Users/quang/dev/ew/web/index.html")
	})

	if err := r.Run(":8080"); err != nil {
		log.Fatalln(err)
	}
}
