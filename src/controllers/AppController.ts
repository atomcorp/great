import {ReactiveController, ReactiveControllerHost} from 'lit';

import {getTodaysEntry, todaysDate} from '../utils/dates';
import {getData, getEntryFromDate, setData} from '../utils/storage';

export class AppController implements ReactiveController {
  host: ReactiveControllerHost;

  selectedDate = todaysDate();
  selectedEntry = getEntryFromDate(todaysDate());
  entries: string[][] = [];
  hasTodaysEntry = false;
  isEditable = false;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
    this._handleInit();
  }

  hostConnected() {
    // Start a timer when the host is connected
    window.addEventListener('clicked-date', this._handleSelect);
    window.addEventListener('set-entry', this._handleSetEntry);
    window.addEventListener('toggle-editable', this.handleToggleEdit);
  }
  hostDisconnected() {
    // Clear the timer when the host is disconnected
    window.removeEventListener('clicked-date', this._handleSelect);
    window.removeEventListener('set-entry', this._handleSetEntry);
    window.removeEventListener('toggle-editable', this.handleToggleEdit);
  }

  public handleToggleEdit = () => {
    this.isEditable = !this.isEditable;
    this.host.requestUpdate();
  };

  private _handleInit = () => {
    const dataFromStorage = getData();
    if (dataFromStorage) {
      const entries = JSON.parse(dataFromStorage) as string[][];
      this.entries = entries;
      this.hasTodaysEntry = !!getTodaysEntry(entries);
    }
    this.host.requestUpdate();
  };

  private _handleSetEntry = (e: CustomEvent<{date: string; entry: string}>) => {
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
    setData(this.entries);
    this.hasTodaysEntry = !!getTodaysEntry(this.entries);
    this.selectedDate = date;
    this.selectedEntry = entry;
    this.isEditable = false;
    this.host.requestUpdate();
  };

  private _handleSelect = (e: CustomEvent<{date: string}>) => {
    const date = e.detail.date;
    this.selectedDate = date;
    this.selectedEntry = getEntryFromDate(date);
    this.isEditable = false;
    this.host.requestUpdate();
  };
}
