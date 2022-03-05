import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import './calendar';
import './upload';
import './today';
import './view';

@customElement('app-component')
class AppComponent extends LitElement {
  override render() {
    return html`
      <view-component>
        <today-component slot="today"></today-component>
        <calendar-component slot="calendar"></calendar-component>
        <upload-component slot="settings"></upload-component>
      </view-component>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-component': AppComponent;
  }
}

export default AppComponent;
