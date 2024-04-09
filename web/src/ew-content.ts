import { LitElement, html, css } from "../node_modules/lit";
import { customElement, property } from "../node_modules/lit/decorators.js";
import sharedStyles from "./sharedStyles";
import "./file-selector.js";
import "./ew-collapsible.js";

@customElement("ew-content")
export class EwContent extends LitElement {
  static styles = [
    sharedStyles,
    css`
      .container {
        width: 60vw;
        margin: auto;
      }

      .center {
        text-align: center;
      }

      .flex-grid {
        display: flex;
        gap: 16px;
        flex-direction: column;
      }

      button {
        color: var(--ew-white);
        background-color: var(--ew-theme-color);
        border: none;
        border-radius: 4px;
        padding: 8px;
        cursor: pointer;
      }
    `,
  ];

  @property({ type: Object })
  data = [
    {
      q: "",
      agree: -1,
      disagree: -1,
      neutral: -1,
      skipped: -1,
      stronglyAgree: -1,
      stronglyDisagree: -1,
    },
  ];
  @property({ type: Boolean })
  loaded = false;

  render() {
    return html`
      <div class="container center flex-grid">
        <file-selector></file-selector>
        <div>
          <button @click="${this._getData}">Get data</button>
        </div>

        ${this.data?.length > 0 && this.loaded
          ? this.data.map(
              ({
                q,
                agree,
                disagree,
                neutral,
                skipped,
                stronglyAgree,
                stronglyDisagree,
              }) =>
                html`
                  <ew-collapsible
                    title=${q}
                    agree=${agree}
                    disagree=${disagree}
                    neutral=${neutral}
                    skipped=${skipped}
                    stronglyAgree=${stronglyAgree}
                    stronglyDisagree=${stronglyDisagree}
                  ></ew-collapsible>
                `
            )
          : html``}
      </div>
    `;
  }

  async _getData() {
    const response = await fetch("/api/data");

    if (!response.ok) {
      const text = await response.text();
      this.loaded = false;
      throw new Error(
        `Request rejected with status ${response.status} and data ${text} `
      );
    }

    const jsonData = await response.json();
    this.data = this._parseData(jsonData);
    this.loaded = true;
  }

  _parseData(data: EwResult) {
    try {
      if (!data?.invitations) {
        throw new Error(`Questionnaire is empty!`);
      }
      return data.questionnaire.questions.map((q, index) => {
        let agree = 0;
        let disagree = 0;
        let neutral = 0;
        let skipped = 0;
        let stronglyAgree = 0;
        let stronglyDisagree = 0;

        data.invitations.forEach((inv) => {
          const matchedAnswer = inv.answers[index].answer;
          switch (matchedAnswer) {
            case "Mee eens": {
              agree++;
              break;
            }
            case "Niet mee eens": {
              disagree++;
              break;
            }
            case "Neutraal": {
              neutral++;
              break;
            }
            case "Overgeslagen": {
              skipped++;
              break;
            }
            case "Helemaal mee eens": {
              stronglyAgree++;
              break;
            }
            case "Helemaal niet mee eens": {
              stronglyDisagree++;
              break;
            }
          }
        });

        return {
          q,
          agree,
          disagree,
          neutral,
          skipped,
          stronglyAgree,
          stronglyDisagree,
        };
      });
    } catch (e) {
      console.log(e);
      throw new Error(`Error while parsing data: ${e}`);
    }
  }
}

interface EwResult {
  invitations: { answers: { answer: string }[] }[];
  questionnaire: { questions: string[] };
}
