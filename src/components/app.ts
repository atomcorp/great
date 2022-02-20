import {LitElement, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';

import {getData, getEntryFromDate} from '../utils/storage';

import './calendar';
import './upload';
import './entry';

@customElement('app-component')
class AppComponent extends LitElement {
  constructor() {
    super();
    const dateFromStorage = getData();
    if (dateFromStorage) {
      this.data = dateFromStorage;
    }
  }

  @state()
  date = '';

  @state()
  entry = '';

  @state()
  data = '';

  handleSelect = (e: CustomEvent<{date: string}>) => {
    const date = e.detail.date;
    this.date = date;
    this.entry = getEntryFromDate(date);
  };

  override render() {
    return html`
      <upload-component></upload-component>
      <calendar-component data=${this.data}></calendar-component>
      <entry-component date=${this.date} entry=${this.entry}></entry-component>
    `;
  }

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('clicked-date', this.handleSelect);
  }

  override disconnectedCallback() {
    window.removeEventListener('clicked-date', this.handleSelect);
    super.disconnectedCallback();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-component': AppComponent;
  }
}

export default AppComponent;
