import {LitElement, html, nothing} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

import {saveCurrentEntry, setView} from '../utils/events';

import entryStyles from '../styles/entry-styles';
import defaultStyles from '../styles/default-styles';
import footerStyles from '../styles/footer-styles';

import './layout';
import {getDisplayDate, todaysDate, yesterdaysDate} from '../utils/dates';

const getHeading = (date: string) => {
  if (date === todaysDate()) {
    return html`<h3>Today<br />I am grateful for</h3>`;
  }
  if (date === yesterdaysDate()) {
    return html`<h3>Yesterday<br />I was grateful for</h3>`;
  }
  return html`<h3>${getDisplayDate(date)}<br />I was grateful for</h3>`;
};

@customElement('entry-component')
class EntryComponent extends LitElement {
  static override styles = [defaultStyles, footerStyles, entryStyles];

  @property({type: String})
  entry = '';
  @property({type: String})
  date = '';
  @state()
  isEditable = false;

  private _handleSave = () => {
    const el = this.renderRoot.querySelector(
      '#editable-entry'
    ) as HTMLTextAreaElement;
    saveCurrentEntry(el, this.date, el.value);
    this.isEditable = false;
  };

  // override firstUpdated() {
  //   if (!this.entry) {
  //     this.updateComplete.then(() => {
  //       this.renderRoot.querySelector('textarea')?.focus();
  //     });
  //   }
  // }

  // override updated() {
  //   if (this.isEditable) {
  //     this.updateComplete.then(() => {
  //       this.renderRoot.querySelector('textarea')?.focus();
  //     });
  //   }
  // }

  private _toggleIsEditable = () => {
    this.isEditable = !this.isEditable;
  };

  override render() {
    console.log(this.isEditable);
    if (!this.entry || this.isEditable) {
      // is new or can edit
      return html`
        <layout-component>
          <section slot="main" class="container">
            ${getHeading(this.date)}
            <textarea
              .value=${this.entry}
              id="editable-entry"
              name="editable-entry"
              placeholder="What are you grateful for?"
              rows="3"
            ></textarea>
          </section>
          <footer slot="footer">
            <button
              type="button"
              @click=${(e: Event) => {
                if (this.isEditable) {
                  this.isEditable = false;
                }
                const el = e.target as HTMLButtonElement;
                setView(el, 'calendar');
              }}
            >
              Calendar
            </button>
            <div class="buttons">
              <button type="button" @click=${this._handleSave}>Save</button>
              ${this.entry
                ? html`<button
                    @click=${() => {
                      this._toggleIsEditable();
                    }}
                    type="button"
                  >
                    Cancel
                  </button>`
                : nothing}
            </div>
          </footer>
        </layout-component>
      `;
    }
    return html`
      <layout-component>
        <section slot="main">
          ${getHeading(this.date)}
          <div class="entry">${this.entry}</div>
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
              this._toggleIsEditable();
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
