import { LitElement, html, css } from "../node_modules/lit";
import { customElement } from "../node_modules/lit/decorators";
import sharedStyles from "./sharedStyles";

@customElement("file-selector")
export class FileSelector extends LitElement {
  static styles = [
    sharedStyles,
    css`
      .container {
        padding: 8px;
      }

      input[type="file"] {
        display: none;
      }

      .file-input {
        border: 1px solid #ccc;
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
      }
    `,
  ];

  render() {
    return html`
      <div class="container">
        <label for="fileInput" class="file-input"> Select file </label>
        <input
          accept=".csv"
          type="file"
          id="fileInput"
          @change="${(e: Event) => console.log(e)}"
        />
      </div>
    `;
  }
}
