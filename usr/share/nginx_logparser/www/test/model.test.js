import chai from 'chai';
const expect = chai.expect;
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import { createServer } from './devServer';
import { readFileSync } from 'fs';
const DEFAULT_PORT = 3001;
const DEFAULT_URL = `http://localhost:${DEFAULT_PORT}`;
const OK = 200;
const fixturePath = `${__dirname}/fixture.json`;
const mock = readFileSync(fixturePath, {'encoding': 'utf-8'});
createServer(OK, mock).listen(DEFAULT_PORT);

import Model from './../src/helpers/model.js';

describe('Model', function() {
  it('should be a function', function() {
    return expect(Model).to.be.a('function');
  });

  describe('#constructor()', function() {
    it('should return new model object with '
        + 'readonly .url property', function() {
      const testModel = new Model(DEFAULT_URL);
      expect(testModel).to.have.property('url').and.equal(DEFAULT_URL);
      const urlReassign = () => {
        testModel.url = null;
      };
      expect(urlReassign).to.throw(TypeError);
    });
    it('should throws exception if url is bad', function() {
      const undefinedUrl = () => new Model();
      expect(undefinedUrl).to.throw(TypeError);
      const emptyString = () => new Model('');
      expect(emptyString).to.throw(TypeError);
    });
  });

  describe('#data', function() {
    it('should be array', function() {
      const promise = new Model(DEFAULT_URL).data();
      return expect(promise).to.eventually.be.an('array');
    });
    it('should return promise if url was given', function() {
      const promise = new Model(DEFAULT_URL).data();
      expect(promise).to.be.a('promise');
      return expect(promise).to.become(JSON.parse(mock));
    });
    it('should return null if no url in model object', function() {
      const model = new Model(DEFAULT_URL);
      model._url = null;
      return expect(model.data()).to.be.null;
    });
  });

  describe('#_parse()', function() {
    it('should be function', function() {
      return expect(Model._parse).to.be.a('function');
    });
    it('should return promise', function() {
      return expect(Model._parse()).to.be.a('promise');
    });
    it('should return string representation of object', function() {
      const promise = Model._parse(DEFAULT_URL);
      return expect(promise).to.become(JSON.parse(mock));
    });
  });
});
