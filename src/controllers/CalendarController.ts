import {ReactiveController, ReactiveControllerHost} from 'lit';

import {getEntries, getEntryFromDate, setData} from '../utils/storage';

export class CalendarController implements ReactiveController {
  host: ReactiveControllerHost;

  selectedDate = '';
  selectedEntry = '';
  entries: string[][] = [];
  isEditing = false;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
    this._handleInit();
  }

  hostConnected() {
    //  when the host is connected
  }
  hostDisconnected() {
    // when the host is disconnected
  }

  public handleCancelEdit = () => {
    console.log('click');
    this.isEditing = false;
    this.selectedDate = '';
    this.selectedEntry = '';
    this.host.requestUpdate();
  };

  public handleEditEntry = (date: string, entry: string) => {
    this.isEditing = true;
    this.selectedDate = date;
    this.selectedEntry = entry;
    this.host.requestUpdate();
  };

  private _handleInit = () => {
    const entries = getEntries();
    if (entries) {
      this.entries = this._sortEntries(entries);
    }
    this.host.requestUpdate();
  };

  private _sortEntries = (entries: string[][]) =>
    entries.sort((a, b) => (a[0] > b[0] ? 1 : 0));

  public handleSetEntry = (date: string, entry: string) => {
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
    this.entries = this._sortEntries(copiedEntries);
    setData(this.entries);
    this.selectedDate = '';
    this.selectedEntry = '';
    this.isEditing = false;
    this.host.requestUpdate();
  };

  public handleSelect = (date: string) => {
    this.selectedDate = date;
    this.selectedEntry = getEntryFromDate(date);
    this.isEditing = true;
    this.host.requestUpdate();
  };
}
