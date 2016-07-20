import chai from 'chai';
const expect = chai.expect;
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import Model from './../src/helpers/model.js';

describe('Model', function() {
  it('should be a function', function() {
    return expect(Model).to.be.a('function');
  });
});
