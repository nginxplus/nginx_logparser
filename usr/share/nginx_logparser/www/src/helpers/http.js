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
    const checkStatus = (response) => {
      // TODO: what should we do on redirections?
      if (response.status >= 200 && response.status <= 300)
        return response;
      else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    }
    // TODO: what should we do on errors?
    return fetch(url)
        .then(checkStatus);
  }
}
