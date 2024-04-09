import { LitElement, html, css } from "../node_modules/lit";
import { customElement, property } from "../node_modules/lit/decorators.js";
import sharedStyles from "./sharedStyles";

@customElement("ew-collapsible")
export class EwCollapsible extends LitElement {
  static styles = [
    sharedStyles,
    css`
      .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 20em;
        border: 1px solid var(--ew-gray-light);
        border-radius: var(--input-border-radius);
      }
      .content {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 2em;
      }
      .header {
        border-bottom: 1px solid var(--ew-gray-light);
      }
      .answers {
        flex: 1;
        align-self: flex-start;
        text-align: left;
      }
      .footer {
        display: flex;
        justify-self: flex-end;
        flex-direction: row;
      }
    `,
  ];

  // @Todo: limit range to positive integers
  @property({ type: String })
  title = "";
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
    return html`<div class="container">
      <div class="header">
        <h3>${this.title}</h1>
      </div>

      <div class="content">
        <div class="answers">
            <div>agree: ${this.agree}</div>
            <div>disagree ${this.disagree}</div>
            <div>neutral ${this.neutral}</div>
            <div>stronglyAgree ${this.stronglyAgree}</div>
            <div>stronglyDisagree ${this.stronglyDisagree}</div>
        </div>

        <div class="footer">
            <div>
            [answered]
            ${
              this.agree +
              this.disagree +
              this.neutral +
              this.stronglyAgree +
              this.stronglyDisagree
            }
            </div>

            <div>[skipped] ${this.skipped}</div>
        </div>
      </div>

    </div>`;
  }
}
