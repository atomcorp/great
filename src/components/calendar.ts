import {LitElement, html, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {getDisplayDate, todaysDate, yesterdaysDate} from '../utils/dates';
import {setCurrentEntry, setView} from '../utils/events';

import defaultStyles from '../styles/default-styles';
import footerStyles from '../styles/footer-styles';
import calendarStyles from '../styles/calendar-styles';

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
  static override styles = [defaultStyles, footerStyles, calendarStyles];

  @property({type: Array})
  entries: string[][] = [];

  override render() {
    if (Array.isArray(this.entries)) {
      return html`
        <layout-component>
          <section slot="main">
            <h3>Calender</h3>
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
            <div class="entries">
              ${this.entries.map(
                ([date, entry]) =>
                  html`<div class="line"></div>
                    <button
                      class="entry"
                      @click=${(e: Event) => {
                        const el = e.target as HTMLElement;
                        setCurrentEntry(el, date, entry);
                      }}
                    >
                      <div class="date">
                        ${getDisplayDate(date, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      <div class="text">${entry}</div>
                    </button>`
              )}
            </div>
          </section>
          <footer slot="footer">
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
          </footer>
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
