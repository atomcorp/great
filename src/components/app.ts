import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import {AppController, ViewType} from '../controllers/AppController';

import './calendar';
import './settings';
import './view';
import './entry';

@customElement('app-component')
class AppComponent extends LitElement {
  state = new AppController(this);

  override render() {
    return html`
      <view-component .view=${this.state.view}>
        <entry-component
          slot="entry"
          .entry=${this.state.currentEntry}
          .date=${this.state.currentDate}
        ></entry-component>
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
    'app--set-view': CustomEvent<{detail: {view: ViewType}}>;
    'app--set-current-entry': CustomEvent<{
      detail: {date: string; entry: string};
    }>;
    'app--save-current-entry': CustomEvent<{
      detail: {date: string; entry: string};
    }>;
  }
}

export default AppComponent;
