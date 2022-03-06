import {LitElement, html, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {ViewType} from '../controllers/AppController';

@customElement('view-component')
class ViewComponent extends LitElement {
  @property({type: String})
  view: ViewType = 'entry';

  override render() {
    return html`
      ${this.view === 'entry'
        ? html`<slot name="entry">Entry view</slot>`
        : nothing}
      ${this.view === 'calendar'
        ? html`<slot name="calendar">Calendar view</slot>`
        : nothing}
      ${this.view === 'settings'
        ? html`<slot name="settings">Settings view</slot>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'view-component': ViewComponent;
  }
}

export default ViewComponent;
