import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import Papa from 'papaparse';

import {localStorageKeys, eventKeys} from '../consts';

@customElement('upload-component')
class UploadComponent extends LitElement {
  @property({type: Array})
  dates: string[];

  @state()
  hasUploaded = false;

  handleSubmit = (e: Event) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const csvFile = formData.get('data') as Blob;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const parsedCsv = Papa.parse<string>(reader.result);
        parsedCsv.data = parsedCsv.data.filter((entry) => entry.length === 2);
        if (
          parsedCsv.data[0][0] === 'entryDate' &&
          parsedCsv.data[0][1] === 'entryContent'
        ) {
          parsedCsv.data = parsedCsv.data.slice(1, parsedCsv.data.length);
        }
        if (parsedCsv.data) {
          localStorage.setItem(
            localStorageKeys.data,
            JSON.stringify(parsedCsv.data)
          );
          this.hasUploaded = true;
          const event = new Event(eventKeys.uploadData, {
            bubbles: true,
            composed: true,
          });
          formElement.dispatchEvent(event);
        }
      }
    };
    reader.readAsText(csvFile);
  };

  override render() {
    return html`
      <section>
        <h3>Upload</h3>
        <p>
          Should be a csv, with two fields: entryDate (yyyy-mm-dd) and
          entryContent. Will remove header with those names.
        </p>
        <form @submit=${this.handleSubmit}>
          <label>Choose a file to upload</label>
          <input id="upload" type="file" accept=".csv" name="data" />
          <button>Upload</button>
        </form>
        ${this.hasUploaded ? html`<strong>Upload success</strong>` : ''}
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'upload-component': UploadComponent;
  }
}

export default UploadComponent;
