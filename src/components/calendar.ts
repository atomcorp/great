import {LitElement, html, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {CalendarController} from '../controllers/CalendarController';
import {getDisplayDate, todaysDate, yesterdaysDate} from '../utils/dates';
import {uploadedNewData, setCurrentEntry, setView} from '../utils/events';

import defaultStyles from '../styles/default-styles';

import './layout';

const hasTodaysEntry = (entries: string[][]) => {
  const todaysEntry = entries.find(([date]) => date === todaysDate());
  return !!todaysEntry;
};

const hasYesterDaysEntry = (entries: string[][]) => {
  const todaysEntry = entries.find(([date]) => date === yesterdaysDate());
  return !!todaysEntry;
};

@customElement('calendar-component')
class CalendarComponent extends LitElement {
  state = new CalendarController(this);

  static override styles = [defaultStyles];

  @property({type: Array})
  entries: string[][] = [];

  private _handleSubmit = (e: Event, date: string) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    if (formElement) {
      const formData = new FormData(formElement);
      const entry = formData.get('editable-entry');
      if (typeof entry === 'string') {
        this.state.handleSetEntry(date, entry);
        uploadedNewData(formElement);
      }
    }
  };

  override render() {
    if (Array.isArray(this.entries)) {
      return html`
        <layout-component>
          <section slot="main">
            <h3>History</h3>
            <ul>
              ${!hasTodaysEntry(this.entries)
                ? html`<button
                    @click=${(e: Event) => {
                      const el = e.target as HTMLElement;
                      setCurrentEntry(el, todaysDate(), '');
                    }}
                  >
                    Add todays entry
                  </button>`
                : nothing}
              ${!hasYesterDaysEntry(this.entries)
                ? html`<button
                    @click=${(e: Event) => {
                      const el = e.target as HTMLElement;
                      setCurrentEntry(el, yesterdaysDate(), '');
                    }}
                  >
                    Add Yesterdays entry
                  </button>`
                : nothing}
              ${this.entries.map(
                ([date, entry]) =>
                  html`<li>
                    ${date === this.state.selectedDate
                      ? html`<strong>${getDisplayDate(date)}</strong>`
                      : getDisplayDate(date)}
                    ${this.state.isEditing && date === this.state.selectedDate
                      ? html`<form
                          @submit=${(e: Event) => {
                            this._handleSubmit(e, date);
                          }}
                        >
                          <textarea
                            .value=${entry}
                            name="editable-entry"
                            placeholder="Write what you were grateful for today."
                          ></textarea>
                          <button>Save</button>
                          <button
                            type="button"
                            @click=${this.state.handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </form>`
                      : html`<p>${entry}</p>
                          <button
                            @click=${(e: Event) => {
                              const el = e.target as HTMLElement;
                              setCurrentEntry(el, date, entry);
                            }}
                          >
                            Edit
                          </button>`}
                  </li>`
              )}
            </ul>
          </section>
          <section slot="footer">
            <button type="button" disabled>Calendar</button>
            <button
              type="button"
              @click=${(e: Event) => {
                const el = e.target as HTMLButtonElement;
                setView(el, 'settings');
              }}
            >
              Settings
            </button>
          </section>
        </layout-component>
      `;
    }
    return html`<section>No data found</section>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'calendar-component': CalendarComponent;
  }
}

export default CalendarComponent;
