import {LitElement, html, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {TodayController} from '../controllers/TodayController';

import {saveCurrentEntry, setView} from '../utils/events';

import todayStyles from '../styles/today-styles';
import defaultStyles from '../styles/default-styles';

import './layout';

@customElement('entry-component')
class EntryComponent extends LitElement {
  state = new TodayController(this);

  static override styles = [defaultStyles, todayStyles];

  @property({type: String})
  entry = '';
  @property({type: String})
  date = '';

  private _handleSave = () => {
    const el = this.renderRoot.querySelector(
      '#editable-entry'
    ) as HTMLTextAreaElement;
    saveCurrentEntry(el, this.date, el.value);
    this.state.handleToggleEdit();
  };

  override firstUpdated() {
    if (!this.entry) {
      this.renderRoot.querySelector('textarea')?.focus();
    }
  }

  override updated() {
    if (this.state.isEditable) {
      this.renderRoot.querySelector('textarea')?.focus();
    }
  }

  override render() {
    if (!this.entry || this.state.isEditable) {
      // is new or can edit
      return html`
        <layout-component>
          <section slot="main" class="container">
            <h3>
              <span class="date">${this.date}</span>
            </h3>
            <textarea
              .value=${this.entry}
              id="editable-entry"
              name="editable-entry"
              placeholder="Write what you were grateful for today..."
              rows="3"
            ></textarea>
          </section>
          <footer slot="footer">
            <button
              type="button"
              @click=${(e: Event) => {
                const el = e.target as HTMLButtonElement;
                setView(el, 'calendar');
              }}
            >
              Calendar
            </button>
            <button type="button" @click=${this._handleSave}>Save</button>
            ${this.entry
              ? html`<button
                  @click=${() => {
                    this.state.handleToggleEdit();
                  }}
                  type="button"
                >
                  Cancel
                </button>`
              : nothing}
          </footer>
        </layout-component>
      `;
    }
    return html`
      <layout-component>
        <section slot="main">
          <h3>
            <span class="date">${this.date}</span>
          </h3>
          <div>${this.entry}</div>
        </section>
        <footer slot="footer">
          <button
            type="button"
            @click=${(e: Event) => {
              const el = e.target as HTMLButtonElement;
              setView(el, 'calendar');
            }}
          >
            Calendar
          </button>
          <button
            @click=${() => {
              this.state.handleToggleEdit();
            }}
            type="button"
          >
            Edit
          </button>
        </footer>
      </layout-component>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'entry-component': EntryComponent;
  }
  interface WindowEventMap {
    'today--set-entry': CustomEvent<{date: string; entry: string}>;
  }
}

export default EntryComponent;