import {ReactiveController, ReactiveControllerHost} from 'lit';

import {getEntries, getTodaysEntry} from '../utils/storage';

export class AppController implements ReactiveController {
  host: ReactiveControllerHost;

  entries: string[][] = getEntries();
  todaysEntry = getTodaysEntry();

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  hostConnected() {
    //  when the host is connected
    window.addEventListener('app--refresh-entries', this._refreshEntries);
  }
  hostDisconnected() {
    // when the host is disconnected
    window.removeEventListener('app--refresh-entries', this._refreshEntries);
  }

  private _refreshEntries = () => {
    this.entries = getEntries();
    this.todaysEntry = getTodaysEntry();
    this.host.requestUpdate();
  };
}
