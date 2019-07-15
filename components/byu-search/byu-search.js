'use strict';

import { html, css, customElement, LitElement, unsafeCSS, property } from 'lit-element'
import style from './byu-search.sass'

const DEFAULT_SEARCH_INPUT_SELECTOR = 'input[type="search"], input[type="text"]'
const DEFAULT_PLACEHOLDER = 'Search';
const CLASS_SELECTED_INPUT = '__byu-search-selected-input';

@customElement('byu-search')
export class BYUSearch extends LitElement {
  @property( { type: String } ) placeholder = 'Search'
  @property( { type: String } ) searchInputSelector = DEFAULT_SEARCH_INPUT_SELECTOR

  // TODO: Implement BYU Search features

  firstUpdated (_changedProperties) {
    const searchElSlot = this.shadowRoot.querySelector('#search')
    if (searchElSlot.assignedNodes().length > 0) {
      this.shadowRoot.querySelector('#byu-site-search-label').remove()
      this.shadowRoot.querySelector('#byu-site-search').remove()
    }

    this._lookupAndConfigureInputElement(this, this.searchInputSelector)
    this._hideExtraInputElements()
  }

  _lookupAndConfigureInputElement (search, selector) {
    let input = this.querySelector(selector) || this.shadowRoot.querySelector(selector);

    if (input) {
      this._setupInputElement(search, input);
    } else {
      console.error(`[byu-search] WARNING! Unable to find a search input element using the selector '${selector}' on `, search);
    }
  }

  _hideExtraInputElements() {
    const inputs = this.querySelectorAll(DEFAULT_SEARCH_INPUT_SELECTOR)
    inputs.forEach((el) => {
      if (!el.classList.contains(CLASS_SELECTED_INPUT)) {
        el.classList.add('hidden')
      }
    })
  }

  _setupInputElement(search, input) {
    this._applyStyleHelpers(search, input);
    this._applyA11yHelpers(search, input);
    this._setupEnterKeySearchDispatcher(search, input);
  }

  _setupEnterKeySearchDispatcher(search, input) {
    let keypress = input.__byu_search_keyObserver = function (e) {
      if (e.key === 'Enter') {
        search.search();
      }
    };
    input.addEventListener('keypress', keypress, false);
  }

  _applyStyleHelpers(search, input) {
    input.classList.add(CLASS_SELECTED_INPUT);
  }

  // For Accessibility, it's good for us to have a title and placeholder set. So, if there isn't one, we'll set it.
  _applyA11yHelpers(search, input) {
    if (input.title && input.placeholder) return;

    let helped = [];

    if (!input.placeholder) {
      input.placeholder = search.placeholder || input.title || DEFAULT_PLACEHOLDER;
      helped.push('placeholder');
    }
    if (!input.title) {
      input.title = input.placeholder || search.placeholder || DEFAULT_PLACEHOLDER;
      helped.push('title');
    }

    input.__byu_search_a11yHelpersApplied = helped;
  }

  /* --- RENDER COMPONENT --- */

  static get styles () {
    return css`${unsafeCSS(style)}`
  }

  render () {
    return html`
<div id="search-form">
    <div class="byu-search">
        <slot id="search">
            <label class="byu-search-label" for="site-search" id="byu-site-search-label">Search</label>
            <input type="text" id="byu-site-search" name="q" aria-label="Site search" placeholder="${this.placeholder}">
        </slot>
        <button class="byu-search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <style>.st{stroke-width:10;fill:none;stroke:currentColor;stroke-linecap:round;}</style>
                <circle class="st" cx="45.5" cy="45.5" r="24.5"/><path class="st" d="M63 63l16 16"/>
            </svg>
        </button>
    </div>
</div>
    `
  }
}
