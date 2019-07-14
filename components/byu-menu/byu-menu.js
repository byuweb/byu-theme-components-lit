import { html, css, customElement, LitElement, unsafeCSS } from 'lit-element'
import style from './byu-menu.sass'

@customElement('byu-menu')
export class BYUMenu extends LitElement {

  static get styles () {
    return css`${unsafeCSS(style)}`
  }

  // TODO: Show menu items

  render () {
    return html`
<nav class="byu-site-navigation">
    <slot class="byu-menu-items"></slot>
</nav>
    `
  }
}
