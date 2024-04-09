import { LitElement, html, css } from "../node_modules/lit";
import { customElement } from "../node_modules/lit/decorators";
import sharedStyles from "./sharedStyles";
import "./file-selector.js";
import "./ew-button.js";

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
    `,
  ];

  render() {
    return html`
      <div class="container center">
        <file-selector></file-selector>
        <ew-button></ew-button>
      </div>
    `;
  }
}
