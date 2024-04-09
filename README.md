# Ervaringwijzer

## Assignment

### Context
For a questionnaire sent per physical letter to respondents, all results are entered into a csv file. We are responsible for reading that data into our system. The system is composed of two parts, a backend and a frontend. The backend handles all the data, while the frontend is responsible for serving this data to our users. For evaluation, the frontend should present the user with a small dashboard in which the user is able to upload these results and view them.

### Input
The input data is in the form of a `.csv` file. This CSV file can be uploaded to the backend through the `/api/upload` endpoint. After uploading, this data is served through the `/api/data` route. There are a couple CSV files, one of a questionnaire without answers and one with a couple answers.

### Output
For this assignment, the goal is to upload the data from the csv to the backend and show this to the user in dashboard. The dashboard should get the data from the backend.

In the dashboard, the data shown should be presented in a way that represents the structure in the questionnaire. Additionally, for each question, the number of times a specific answer has been given has to be shown as well. An example of displaying the answers can be seen in `images/example_question.png`. You can use this way of visualizing the results, but alternatively, you can also create graphs or other ways of analysis.

The amount of time to spend on this assignment should be between 3-4 hours. If things take too long, write an explanation about how you would tackle the problem you couldn't solve in time and what solution you would use. Use `git` to track your work in small commits and write an explanation in the commit contents. Making these commits is VERY important.

## Frontend
We use Lit and Typescript for building our frontend components. Think about:
- Reusability of the component(s)
- Responsive design
- Sharing styles
- Usage of browser events
- Error handling when uploading `data_invalid.txt`
- When applicable: dialog windows, error/success messages, animations

## Developing
Running this repository is done by running `npm install` or `yarn` in the `web`-folder to install the dependencies for the frontend. Executing `go run main.go` or `./bin/backend_{osx/windows/linux}` serves the frontend and automatically rebuilds and reloads the frontend on filechanges on `ew-content.ts` and elements imported there.

To verify that everything looks as intended, see `images/look_landing.png` and `images/look_dashboard.png`. If we missed something or if anything is unclear, please reach out. 