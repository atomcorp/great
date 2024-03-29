import {LitElement, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import Papa from 'papaparse';
import {saveAs} from 'file-saver';

import {localStorageKeys, eventKeys} from '../consts';
import {refreshAppEntries, setView} from '../utils/events';

import defaultStyles from '../styles/default-styles';

import './layout';

@customElement('upload-component')
class UploadComponent extends LitElement {
  static override styles = [defaultStyles];
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
          refreshAppEntries(formElement);
        }
      }
    };
    reader.readAsText(csvFile);
  };

  override render() {
    return html`
      <layout-component>
        <section slot="main">
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
          <hr />
          <h3>Export</h3>
          <p>Download your data</p>
          <button
            @click=${() => {
              const memories = localStorage.getItem(localStorageKeys.data);
              const file = new Blob([JSON.stringify(memories, null, 2)]);
              saveAs(file, `great-${new Date().toISOString()}.json`);
            }}
          >
            Download
          </button>
        </section>
        <section slot="footer">
          <section slot="footer">
            <button
              type="button"
              @click=${(e: Event) => {
                const el = e.target as HTMLButtonElement;
                setView(el, 'calendar');
              }}
            >
              Calendar
            </button>
            <button type="button" disabled>Settings</button>
          </section>
        </section>
      </layout-component>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'upload-component': UploadComponent;
  }
}

export default UploadComponent;
