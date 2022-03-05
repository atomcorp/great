import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import {AppController} from '../controllers/AppController';

import './calendar';
import './upload';
import './today';
import './view';

@customElement('app-component')
class AppComponent extends LitElement {
  state = new AppController(this);

  override render() {
    return html`
      <view-component>
        <today-component
          slot="today"
          .todaysEntry=${this.state.todaysEntry}
        ></today-component>
        <calendar-component
          .entries=${this.state.entries}
          slot="calendar"
        ></calendar-component>
        <upload-component slot="settings"></upload-component>
      </view-component>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-component': AppComponent;
  }
  interface WindowEventMap {
    'app--refresh-entries': CustomEvent;
  }
}

export default AppComponent;
