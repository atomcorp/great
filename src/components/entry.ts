import {LitElement, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

import {localStorageKeys, eventKeys} from '../consts';

@customElement('entry-component')
class EntryComponent extends LitElement {
  @property({type: String})
  date = '';

  @property({type: String})
  entry = '';

  override render() {
    return html`
      <section>
        <h3>Entry</h3>
        ${this.entry
          ? html`<div>${this.date}: ${this.entry}</div>`
          : 'No date chosen'}
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'entry-component': EntryComponent;
  }
}

export default EntryComponent;
