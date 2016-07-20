import Http from './http';

/**
 * Class represents data access layer to server
 */
export default class Model {
  /**
   * Creates new model instanse with given url
   * @param {String} url - Url to remote resource
   * @constructor
   */
  constructor(url) {
    if (typeof url !== 'string' || !url)
      throw new TypeError(`Url expected, ${url} given`);
    this._url = url;
  }
  /**
   * Returns model url
   * @returns {String} Url to remote resource
   */
  get url() {
    return this._url;
  }
  /**
   * Function makes request to url and parse response to JSON
   * @param {String} url - Url to a remote resource
   * @returns {Promise} JSON object
   */
  static _parse(url) {
    // TODO: on server, when there is bad url, return 400
    return Http.get(url)
      .then((body) => JSON.parse(body));
  }
}
