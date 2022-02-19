import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {localStorageKeys, eventKeys} from '../consts';

@customElement('calendar-component')
class CalendarComponent extends LitElement {
  @property({type: Array})
  data: string[][] = [];

  private getData = () => {
    const data = localStorage.getItem(localStorageKeys.data);
    if (data) {
      this.data = JSON.parse(data);
    }
  };

  override render() {
    return html`
      <section>
        <h3>Dates</h3>
        <ul>
          ${this.data.map((data) => html`<li>${data[0]}</li>`)}
        </ul>
      </section>
    `;
  }

  override connectedCallback() {
    this.getData();
    super.connectedCallback();
    window.addEventListener(eventKeys.uploadData, this.getData);
  }

  override disconnectedCallback() {
    window.removeEventListener(eventKeys.uploadData, this.getData);
    super.disconnectedCallback();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'calendar-component': CalendarComponent;
  }
}

export default CalendarComponent;
