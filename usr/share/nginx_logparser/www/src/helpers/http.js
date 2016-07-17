import fetch from 'isomorphic-fetch';
/**
 * Class represents http requests layer to API
 */
export default class Http {
  /**
   * Method represents http get request
   * @param {string} url - Absolute URL
   * @returns {promise} http response
   */
  static get(url) {
    return fetch(url);
  }
}
