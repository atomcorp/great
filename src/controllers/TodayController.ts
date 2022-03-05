import {ReactiveController, ReactiveControllerHost} from 'lit';

import {todaysDate} from '../utils/dates';
import {getEntries, setData} from '../utils/storage';

export class TodayController implements ReactiveController {
  host: ReactiveControllerHost;

  isEditable = false;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  hostConnected() {
    // do nothing
  }

  public handleToggleEdit = () => {
    this.isEditable = !this.isEditable;
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
      entries.unshift([today, entry]);
    }
    setData(entries.sort((a, b) => (a[0] < b[0] ? 1 : -1)));
    this.isEditable = false;
    this.host.requestUpdate();
  };
}
