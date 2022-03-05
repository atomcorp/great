import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {TodayController} from '../controllers/TodayController';

import {todaysDate} from '../utils/dates';

@customElement('today-component')
class TodayComponent extends LitElement {
  state = new TodayController(this);
  date = todaysDate();

  constructor() {
    super();
    console.log('hello');
  }

  handleEntry = (e: Event) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    if (formElement) {
      const formData = new FormData(formElement);
      const entry = formData.get('editable-entry');
      if (typeof entry === 'string') {
        this.state.handleSetEntry(entry);
      }
    }
  };

  override render() {
    if (!this.state.entry || this.state.isEditable) {
      // is new or can edit
      return html`
        <h3>${this.date}</h3>
        <form @submit=${this.handleEntry}>
          <label>
            <textarea
              .value=${this.state.entry}
              name="editable-entry"
              placeholder="Write what you were grateful for today."
            ></textarea>
          </label>
          <br />
          <button>Save</button>
          ${this.state.entry
            ? html`<button @click=${this.state.handleToggleEdit} type="button">
                Cancel
              </button>`
            : ''}
        </form>
      `;
    }
    return html`
      <section>
        <h3>${this.date}</h3>
        <div>${this.state.entry}</div>
        <button @click=${this.state.handleToggleEdit} type="button">
          Edit
        </button>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'today-component': TodayComponent;
  }
  interface WindowEventMap {
    'today--set-entry': CustomEvent<{date: string; entry: string}>;
  }
}

export default TodayComponent;
