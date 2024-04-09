import { LitElement, html, css } from "../node_modules/lit";
import { customElement, property } from "../node_modules/lit/decorators.js";
import sharedStyles from "./sharedStyles";

// I had planned to make this element collapsible, but ran out of time! Please forgive the inaccurate naming.
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
        gap: 8px;
      }
    `,
  ];

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
            <div>Helemaal mee eens: ${this.stronglyAgree}</div>
            <div>Mee eens: ${this.agree}</div> 
            <div>Neutraal: ${this.neutral}</div>
            <div>Niet mee eens: ${this.disagree}</div>
            <div>Helemaal niet mee eens: ${this.stronglyDisagree}</div>
        </div>

        <div class="footer">
            <div>
                Beantwoord:
                ${
                  this.agree +
                  this.disagree +
                  this.neutral +
                  this.stronglyAgree +
                  this.stronglyDisagree
                }
            </div>

            <div>Overgeslagen: ${this.skipped}</div>
        </div>
      </div>
    </div>`;
  }
}
