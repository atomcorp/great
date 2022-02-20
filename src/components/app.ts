import {LitElement, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';

import {getData, getEntryFromDate} from '../utils/storage';
import {getTodaysEntry, todaysDate} from '../utils/dates';

import './calendar';
import './upload';
import './entry';

@customElement('app-component')
class AppComponent extends LitElement {
  constructor() {
    super();
    const dataFromStorage = getData();
    if (dataFromStorage) {
      const entries = JSON.parse(dataFromStorage) as string[][];
      this.entries = entries;
      this.hasTodaysEntry = !!getTodaysEntry(entries);
    }
  }

  @state()
  selectedDate = todaysDate();

  @state()
  entry = '';

  @state()
  entries: string[][] = [];
  @state()
  hasTodaysEntry = false;

  handleSelect = (e: CustomEvent<{date: string}>) => {
    const date = e.detail.date;
    this.selectedDate = date;
    this.entry = getEntryFromDate(date);
  };

  handleSetEntry = (e: CustomEvent<{date: string; entry: string}>) => {
    const date = e.detail.date;
    const entry = e.detail.entry;
    const copiedEntries = this.entries.reduce<string[][]>(
      (acc, entry) => [...acc, [...entry]],
      []
    );
    const existingEntryIndex = copiedEntries.findIndex(
      ([existingDate]) => existingDate === date
    );
    if (existingEntryIndex >= 0) {
      copiedEntries[existingEntryIndex][1] = entry;
    } else {
      copiedEntries.push([date, entry]);
    }
    this.entries = copiedEntries;
    this.hasTodaysEntry = !!getTodaysEntry(this.entries);
  };

  override render() {
    return html`
      <upload-component></upload-component>
      <calendar-component
        ?hasTodaysEntry=${this.hasTodaysEntry}
        .isEditingTodaysDate=${this.selectedDate === todaysDate()}
        .entries=${this.entries}
      ></calendar-component>
      <entry-component
        .date=${this.selectedDate}
        .entry=${this.entry}
      ></entry-component>
    `;
  }

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('clicked-date', this.handleSelect);
    window.addEventListener('set-entry', this.handleSetEntry);
  }

  override disconnectedCallback() {
    window.removeEventListener('clicked-date', this.handleSelect);
    window.removeEventListener('set-entry', this.handleSetEntry);
    super.disconnectedCallback();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-component': AppComponent;
  }
}

export default AppComponent;
