import Http from './http';

/**
 * Class represents data access layer to server
 */
export default class Model {
  /**
   * Function makes request to url and parse response to JSON
   * @param {String} url - Url to a remote resource
   * @returns {Promise} JSON object
   */
  static _parse(url) {
    return Http.get(url)
      .then((body) => JSON.parse(body));
  }
}
