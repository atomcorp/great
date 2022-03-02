import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('entry-component')
class EntryComponent extends LitElement {
  @property({type: String})
  date = '';
  @property({type: String})
  entry = '';
  @property({type: Boolean})
  isEditable = false;

  handleEntry = (e: Event) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    if (formElement) {
      const formData = new FormData(formElement);
      const entry = formData.get('editable-entry');
      // TODO: add this entry
      const event = new CustomEvent('set-entry', {
        detail: {date: this.date, entry},
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  };

  handleToggleEditable = () => {
    const event = new CustomEvent('toggle-editable', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  };

  override render() {
    if (!this.entry || this.isEditable) {
      // is new or can edit
      return html`
        <form @submit=${this.handleEntry}>
          <label>
            ${this.date}:<br />
            <textarea
              .value=${this.entry}
              name="editable-entry"
              placeholder="Write what you were grateful for today."
            ></textarea>
          </label>
          <br />
          <button>Save</button>
          ${this.entry
            ? html`<button @click=${this.handleToggleEditable} type="button">
                Cancel
              </button>`
            : ''}
        </form>
      `;
    }
    return html`
      <section>
        <h3>Entry</h3>
        <div>${this.date}: ${this.entry}</div>
        <button @click=${this.handleToggleEditable} type="button">Edit</button>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'entry-component': EntryComponent;
  }
  interface WindowEventMap {
    'set-entry': CustomEvent<{date: string; entry: string}>;
    'toggle-editable': CustomEvent;
  }
}

export default EntryComponent;
