import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {CalendarController} from '../controllers/CalendarController';

@customElement('calendar-component')
class CalendarComponent extends LitElement {
  state = new CalendarController(this);

  private _handleSubmit = (e: Event, date: string) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    if (formElement) {
      const formData = new FormData(formElement);
      const entry = formData.get('editable-entry');
      if (typeof entry === 'string') {
        this.state.handleSetEntry(date, entry);
      }
    }
  };

  override render() {
    console.log(this.state.isEditing, this.state.selectedDate);
    if (Array.isArray(this.state.entries)) {
      return html`
        <section>
          <h3>Dates</h3>
          <ul>
            ${this.state.entries.map(
              ([date, entry]) =>
                html`<li>
                  ${date === this.state.selectedDate
                    ? html`<strong>${date}</strong>`
                    : date}
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
                          @click=${() =>
                            this.state.handleEditEntry(date, entry)}
                        >
                          Edit
                        </button>`}
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
}

export default CalendarComponent;
