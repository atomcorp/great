import {ReactiveController, ReactiveControllerHost} from 'lit';
import {todaysDate} from '../utils/dates';

import {getEntries, getTodaysEntry, setData} from '../utils/storage';

export type ViewType = 'calendar' | 'settings' | 'entry';

export class AppController implements ReactiveController {
  host: ReactiveControllerHost;

  entries: string[][] = getEntries();
  currentEntry = getTodaysEntry();
  currentDate = todaysDate();
  view: ViewType = 'entry';

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  hostConnected() {
    //  when the host is connected
    window.addEventListener('app--refresh-entries', this._refreshEntries);
    window.addEventListener('app--set-view', this._setView);
    window.addEventListener('app--set-current-entry', this._setCurrentEntry);
    window.addEventListener('app--save-current-entry', this._saveCurrentEntry);
  }
  hostDisconnected() {
    // when the host is disconnected
    window.removeEventListener('app--refresh-entries', this._refreshEntries);
    window.removeEventListener('app--set-view', this._setView);
    window.removeEventListener('app--set-current-entry', this._setCurrentEntry);
    window.removeEventListener(
      'app--save-current-entry',
      this._saveCurrentEntry
    );
  }

  private _refreshEntries = () => {
    this.entries = getEntries();
    this.host.requestUpdate();
  };

  private _setView = (event: CustomEvent) => {
    this.view = event.detail.view;
    this.host.requestUpdate();
  };

  private _setCurrentEntry = (event: CustomEvent) => {
    this.currentEntry = event.detail.entry;
    this.currentDate = event.detail.date;
    this.view = 'entry';
    this.host.requestUpdate();
  };

  private _saveCurrentEntry = (event: CustomEvent) => {
    const entry = event.detail.entry;
    const date = event.detail.date;
    const entries = getEntries();
    const existingEntryIndex = entries.findIndex(
      ([existingDate]) => existingDate === date
    );
    if (entry.length > 0) {
      if (existingEntryIndex >= 0) {
        entries[existingEntryIndex][1] = entry;
      } else {
        entries.unshift([date, entry]);
      }
    } else if (existingEntryIndex >= 0) {
      // delete entry if it exists
      entries.splice(existingEntryIndex, 1);
    }
    setData(entries.sort((a, b) => (a[0] < b[0] ? 1 : -1)));
    this.currentEntry = event.detail.entry;
    this.currentDate = event.detail.date;
    this.entries = entries;
    this.host.requestUpdate();
  };
}
