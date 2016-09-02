import 'aurelia-webpack-plugin';
import 'aurelia-framework';

/**
 * The entry point of aurelia application
 * @param {Aurelia} aurelia -- Main aurelia object
 * @returns {undefined}
 */
export function configure(aurelia) {
  aurelia.use.basicConfiguration();
  aurelia.start()
    .then(() => aurelia.setRoot());
}
