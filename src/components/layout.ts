import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

import viewStyles from '../styles/view-styles';
import defaultStyles from '../styles/default-styles';

@customElement('layout-component')
class LayoutComponent extends LitElement {
  static override styles = [defaultStyles, viewStyles];

  override render() {
    return html`
      <div id="view" class="view">
        <footer>
          <slot name="footer">Main view</slot>
        </footer>
        <main>
          <slot name="main">Main view</slot>
        </main>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'layout-component': LayoutComponent;
  }
}

export default LayoutComponent;
