import {ReactiveController, ReactiveControllerHost} from 'lit';

import {getTodaysEntry, todaysDate} from '../utils/dates';
import {getEntries, setData} from '../utils/storage';

export class TodayController implements ReactiveController {
  host: ReactiveControllerHost;

  entry = '';
  isEditable = false;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  hostConnected() {
    this._handleInit();
  }

  public handleToggleEdit = () => {
    this.isEditable = !this.isEditable;
    this.host.requestUpdate();
  };

  private _handleInit = () => {
    const entries = getEntries();
    if (entries) {
      const todaysEntry = getTodaysEntry(entries);
      this.entry = todaysEntry ? todaysEntry[1] : '';
    }
    this.host.requestUpdate();
  };

  public handleSetEntry = (entry: string) => {
    const today = todaysDate();
    const entries = getEntries();
    const existingEntryIndex = entries.findIndex(
      ([existingDate]) => existingDate === today
    );
    if (existingEntryIndex >= 0) {
      entries[existingEntryIndex][1] = entry;
    } else {
      entries.push([today, entry]);
    }
    setData(entries);
    this.entry = entry;
    this.isEditable = false;
    this.host.requestUpdate();
  };
}
