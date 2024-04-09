import { LitElement, html, css } from "../node_modules/lit";
import { customElement, property } from "../node_modules/lit/decorators";
import sharedStyles from "./sharedStyles";
import "./file-selector.js";

@customElement("ew-content")
export class EwContent extends LitElement {
  static styles = [
    sharedStyles,
    css`
      button {
        color: var(--ew-white);
        background-color: var(--ew-theme-color);
        border: none;
        border-radius: 4px;
        padding: 8px;
      }

      .container {
        width: 60vw;
        margin: auto;
      }

      .center {
        text-align: center;
      }
    `,
  ];

  @property()
  world = "";

  render() {
    return html`
      <div class="container center">
        <h1>Hello, ${this.world}</h1>

        <file-selector></file-selector>

        ${this.world === ""
          ? html`<button @click="${this._getWorld}">Get data</button>`
          : html``}
      </div>
    `;
  }

  async _getWorld() {
    const response = await fetch("/api/hello");
    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Request rejected with status ${response.status} and message ${text} `
      );
    }
    const jsonData = await response.json();
    const resp = JSON.parse(jsonData);
    this.world = resp.data;
  }
}
