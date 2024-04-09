import { LitElement, html, css } from "../node_modules/lit";
import { customElement, property } from "../node_modules/lit/decorators.js";
import sharedStyles from "./sharedStyles";

// enum Answer {
//     Agree = "Mee eens",
//     Disagree = "Niet mee eens",
//     Neutral = "Neutraal",
//     Skipped = "Overgeslagen",
//     StronglyArgee = "Helemaal mee eens",
//     StronglyDisargee = "Helemaal niet mee eens",
// }

interface Invitation {
  answers: string[];
}

interface EwResult {
  invitations: Invitation[];
  questionnaire: { questions: string[] };
}

@customElement("ew-collapsible")
export class EwCollapsible extends LitElement {
  static styles = [
    sharedStyles,
    css`
      .collapsible-container {
        display: block;
        width: 100%;
        min-height: 10em;
        border: 1px solid var(--ew-gray-light);
        border-radius: var(--input-border-radius);
      }
    `,
  ];
  @property({ type: String })
  title = "";

  //   @property({ type: Object })
  //   data = { questionnaire: { questions: [] }, invitations: { answers: [] } };

  @property({ type: Number })
  agree = 0;
  @property({ type: Number })
  disagree = 0;
  @property({ type: Number })
  neutral = 0;
  @property({ type: Number })
  skipped = 0;
  @property({ type: Number })
  stronglyAgree = 0;
  @property({ type: Number })
  stronglyDisagree = 0;

  render() {
    return html`<div class="collapsible-container">${this.title}</div>`;
  }
}
