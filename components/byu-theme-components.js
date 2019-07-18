'use strict'

import '@byuweb/web-components-loader'
import { version } from '../package.json'

window.WebComponents = window.WebComponents || {
    waitFor(cb) { addEventListener('WebComponentsReady', cb) }
}

WebComponents.waitFor(async () => {

    import('../dist/components.min.js');

    console.log(`--------------- Starting byu-theme-components ${version} ---------------`);
});
