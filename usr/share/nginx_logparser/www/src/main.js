import Model from './helpers/model';

/**
 * Class represents main view
 */
export class Main {
  /**
   * @constructor
   * @param {String} api - url for model
   */
  constructor(api) {
    this.heading = 'main screen';
    this.statisticsModel = new Model(api);
    this.statisticsModel.data()
      .then((statistics) => {
        this.statistics = statistics;
      });
  }
}
