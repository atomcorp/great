import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import Papa from 'papaparse';

@customElement('upload-component')
class UploadComponent extends LitElement {
  @property({type: Array})
  dates: string[];

  handleSubmit = (e: Event) => {
    console.log('click', e);
    e.preventDefault();
    const formdata = new FormData(e.target as HTMLFormElement);
    const csvFile = formdata.get('data') as Blob;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const parsedCsv = Papa.parse(reader.result);
        console.log(parsedCsv);
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
          entryContent.
        </p>
        <form @submit=${this.handleSubmit}>
          <label>Choose a file to upload</label>
          <input id="upload" type="file" accept=".csv" name="data" />
          <button>Upload</button>
        </form>
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
