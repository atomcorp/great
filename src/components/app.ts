import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import {todaysDate} from '../utils/dates';
import {AppController} from '../controllers/AppController';

import './calendar';
import './upload';
import './entry';

@customElement('app-component')
class AppComponent extends LitElement {
  app = new AppController(this);

  override render() {
    return html`
      <entry-component
        .date=${this.app.selectedDate}
        .entry=${this.app.selectedEntry}
        ?isEditable=${this.app.isEditable}
      >
        ${this.app.isEditable
          ? html`<button @click=${this.app.handleToggleEdit}>Edit</button>`
          : null}
      </entry-component>
      <calendar-component
        .selectedDate=${this.app.selectedDate}
        ?hasTodaysEntry=${this.app.hasTodaysEntry}
        ?isEditingTodaysDate=${this.app.selectedDate === todaysDate()}
        .dates=${this.app.entries.map(([date]) => date).sort()}
      ></calendar-component>
      <upload-component></upload-component>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-component': AppComponent;
  }
}

export default AppComponent;
