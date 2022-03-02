import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {todaysDate} from '../utils/dates';
@customElement('calendar-component')
class CalendarComponent extends LitElement {
  @property({type: Array})
  dates: string[];
  @property({type: Boolean})
  hasTodaysEntry = false;
  @property({type: Boolean})
  isEditingTodaysDate = false;
  @property({type: String})
  selectedDate: string;

  handleDate = (date: string) => {
    const event = new CustomEvent('clicked-date', {
      detail: {date},
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  };

  override render() {
    if (Array.isArray(this.dates)) {
      return html`
        <section>
          <h3>Dates</h3>
          <ul>
            ${this.dates.map(
              (date) =>
                html`<li @click=${() => this.handleDate(date)}>
                  ${date === this.selectedDate
                    ? html`<strong>${date}</strong>`
                    : date}
                </li>`
            )}
          </ul>
          ${!this.hasTodaysEntry && !this.isEditingTodaysDate
            ? html`<button @click=${() => this.handleDate(todaysDate())}>
                Add todays
              </button>`
            : ''}
        </section>
      `;
    }
    return html`<section>No data found</section>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'calendar-component': CalendarComponent;
  }
  interface WindowEventMap {
    'clicked-date': CustomEvent<{date: string}>;
  }
}

export default CalendarComponent;
