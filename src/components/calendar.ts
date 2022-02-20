import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('calendar-component')
class CalendarComponent extends LitElement {
  @property({type: Array})
  data: string[][] = [];

  handleDate = (date: string) => {
    const event = new CustomEvent('clicked-date', {
      detail: {date},
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  };

  override render() {
    if (Array.isArray(this.data)) {
      return html`
        <section>
          <h3>Dates</h3>
          <ul>
            ${this.data.map(
              (data) =>
                html`<li @click=${() => this.handleDate(data[0])}>
                  ${data[0]}
                </li>`
            )}
          </ul>
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
