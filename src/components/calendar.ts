import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('calendar-component')
class CalendarComponent extends LitElement {
  @property({type: Array})
  dates: string[];

  override render() {
    return html`
      <section>
        <h3>Dates</h3>
        <ul>
          ${this.dates.map((date) => html`<li>${date}</li>`)}
        </ul>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'calendar-component': CalendarComponent;
  }
}

export default CalendarComponent;
