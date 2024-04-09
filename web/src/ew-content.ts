import { LitElement, html, css } from "../node_modules/lit";
import { customElement } from "../node_modules/lit/decorators.js";
import sharedStyles from "./sharedStyles";
import "./file-selector.js";
import "./ew-button.js";
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
        gap: 4px;
        flex-direction: column;
      }
    `,
  ];

  render() {
    return html`
      <div class="container center flex-grid ">
        <file-selector></file-selector>
        <ew-button></ew-button>

        <!-- Map data: each (question, index) in questionnaire, count invitations.answers[index] -->
        ${this.mockData?.questionnaire?.questions.length > 0
          ? this.mockData.questionnaire.questions.map(
              (q, index) => html` <ew-collapsible title=${q}></ew-collapsible> `
            )
          : html``}
      </div>
    `;
  }

  mockData = {
    questionnaire: {
      questions: [
        "1 Ik vind aardappels een lekkere groente",
        "1 Aardappels moet je koken in water",
        "2 Ik heb plezier tijdens het koken van aardappels",
        "2 Als ik plezier had tijdens het koken smaken aardappels lekkerder",
        "3 Het afgieten van het water is lastig",
        "3 Soms brand ik mijn handen aan het water dat in de theedoek terecht komt",
        "3 Mijn handen laten de pan dan los en deze valt dan in de gootsteen",
        "3 De volgende keer gebeurt me dit niet nogeens",
        "3 Mentaal zie ik op tegen het afgieten van aardappels",
      ],
    },
    invitations: { answers: [] },
  };
}
