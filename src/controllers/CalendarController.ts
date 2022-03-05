import {ReactiveController, ReactiveControllerHost} from 'lit';

import {getEntries, getEntryFromDate, setData} from '../utils/storage';

export class CalendarController implements ReactiveController {
  host: ReactiveControllerHost;

  selectedDate = '';
  selectedEntry = '';
  isEditing = false;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  hostConnected() {
    //  when the host is connected
  }
  hostDisconnected() {
    // when the host is disconnected
  }

  public handleCancelEdit = () => {
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

  public handleSetEntry = (date: string, entry: string) => {
    const entries = getEntries();
    const existingEntryIndex = entries.findIndex(
      ([existingDate]) => existingDate === date
    );
    if (existingEntryIndex >= 0) {
      entries[existingEntryIndex][1] = entry;
    } else {
      entries.unshift([date, entry]);
    }
    setData(entries.sort((a, b) => (a[0] < b[0] ? 1 : -1)));
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
