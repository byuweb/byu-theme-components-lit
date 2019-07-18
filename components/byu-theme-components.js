'use strict'

import '@byuweb/web-components-loader'
import { version } from '../package.json'

const myUrl = document.currentScript.src;

window.WebComponents = window.WebComponents || {
  waitFor (cb) { addEventListener('WebComponentsReady', cb) }
}

WebComponents.waitFor(() => {

  console.log(`--------------- Starting byu-theme-components ${version} ---------------`);
  loadScript('components.min.js')

})

function loadScript(relativeUrl) {
  const url = new URL(relativeUrl, myUrl);
  const el = document.createElement("script");
  el.src = url.href;
  el.type = 'module';
  document.head.append(el);
}
