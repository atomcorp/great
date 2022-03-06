import {ReactiveController, ReactiveControllerHost} from 'lit';

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

  public handleSetEntry = () => {
    this.isEditable = false;
    this.host.requestUpdate();
  };
}
