import chai from 'chai';
const expect = chai.expect;
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import { createServer } from './devServer';
import { readFileSync } from 'fs';
const DEFAULT_PORT = 8081;
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

  describe('#_parse', function() {
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
