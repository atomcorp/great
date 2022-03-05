import {LitElement, html, nothing} from 'lit';
import {customElement, state} from 'lit/decorators.js';

import {viewStyles} from '../styles/view-styles';

type ViewType = 'today' | 'calendar' | 'settings';

@customElement('view-component')
class ViewComponent extends LitElement {
  @state()
  currentView: ViewType = 'today';

  static override styles = [viewStyles];

  private _handleClick = (view: ViewType) => {
    this.currentView = view;
  };

  override render() {
    return html`
      <div id="view" class="view">
        <footer>
          <button
            type="button"
            @click=${() => {
              this._handleClick('today');
            }}
          >
            Today
          </button>
          <button
            type="button"
            @click=${() => {
              this._handleClick('calendar');
            }}
          >
            Calendar
          </button>
          <button
            type="button"
            @click=${() => {
              this._handleClick('settings');
            }}
          >
            Settings
          </button>
        </footer>
        <main>
          ${this.currentView === 'today'
            ? html`<slot name="today">Today view</slot>`
            : nothing}
          ${this.currentView === 'calendar'
            ? html`<slot name="calendar">Calendar view</slot>`
            : nothing}
          ${this.currentView === 'settings'
            ? html`<slot name="settings">Settings view</slot>`
            : nothing}
        </main>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'view-component': ViewComponent;
  }
}

export default ViewComponent;
