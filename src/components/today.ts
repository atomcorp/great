import {LitElement, html, nothing} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {TodayController} from '../controllers/TodayController';

import {todaysDate} from '../utils/dates';
import {refreshAppEntries} from '../utils/events';

import todayStyles from '../styles/today-styles';
import defaultStyles from '../styles/default-styles';

@customElement('today-component')
class TodayComponent extends LitElement {
  state = new TodayController(this);
  date = todaysDate();

  static override styles = [defaultStyles, todayStyles];

  @property({type: String})
  todaysEntry = '';

  handleEntry = (e: Event) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    if (formElement) {
      const formData = new FormData(formElement);
      const entry = formData.get('editable-entry');
      if (typeof entry === 'string') {
        this.state.handleSetEntry(entry);
        refreshAppEntries(formElement);
      }
    }
  };

  override firstUpdated() {
    if (!this.todaysEntry) {
      this.renderRoot.querySelector('textarea')?.focus();
    }
  }

  override updated() {
    if (this.state.isEditable) {
      this.renderRoot.querySelector('textarea')?.focus();
    }
  }

  override render() {
    if (!this.todaysEntry || this.state.isEditable) {
      // is new or can edit
      return html`
        <form @submit=${this.handleEntry} class="container">
          <h3>
            <span class="date">${this.date}</span>
            <button>Save</button>
            ${this.todaysEntry
              ? html`<button
                  @click=${() => {
                    this.state.handleToggleEdit();
                  }}
                  type="button"
                >
                  Cancel
                </button>`
              : nothing}
          </h3>
          <textarea
            .value=${this.todaysEntry}
            name="editable-entry"
            placeholder="Write what you were grateful for today."
            rows="3"
          ></textarea>
        </form>
      `;
    }
    return html`
      <section>
        <h3>
          <span class="date">${this.date}</span>
          <button
            @click=${() => {
              this.state.handleToggleEdit();
              console.log(this.renderRoot.querySelector('textarea'));
            }}
            type="button"
          >
            Edit
          </button>
        </h3>
        <div>${this.todaysEntry}</div>
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
