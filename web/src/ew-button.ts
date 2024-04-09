import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators";
import sharedStyles from "./sharedStyles";

@customElement("ew-button")
export class EWButton extends LitElement {
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
    `,
  ];

  render() {
    return html`<button @click="${this._getData}">Get data</button>`;
  }

  async _getData() {
    const response = await fetch("/api/data");

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Request rejected with status ${response.status} and data ${text} `
      );
    }

    const jsonData = await response.json();
    console.log({ jsonData });
  }
}
