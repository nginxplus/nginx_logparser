import chai from 'chai';
const expect = chai.expect;
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import { createServer, DEFAULT_MESSAGE } from './devServer';

import Http from './../src/helpers/http.js';

describe('Http', function() {
  it('should be a function', function() {
    return expect(Http).to.be.a('function');
  });

  describe('#get()', function() {
    it('should be function', function() {
      return expect(Http.get).to.be.a('function');
    });
    it('should to be a promise', function() {
      return expect(Http.get()).to.be.a('promise');
    });
    it('should be rejected on null', function() {
      const promise = Http.get(null);
      return expect(promise).to.be.rejected;
    });
    it('should be rejected on empty arguments', function() {
      const promise = Http.get();
      return expect(promise).to.be.rejected;
    });
    it('should return response body if OK', function() {
      const DEFAULT_PORT = 3000;
      const DEFAULT_URL = `http://localhost:${DEFAULT_PORT}`;
      createServer().listen(DEFAULT_PORT);
      const promise = Http.get(DEFAULT_URL);
      return Promise.all([
        expect(promise).to.be.fulfilled,
        expect(promise).to.eventually.be.a('string'),
        expect(promise).to.become(DEFAULT_MESSAGE),
      ]);
    });
  });

  describe('#_isSuccessCode()', function() {
    it('should return true if status code === 200', function() {
      const OK = 200;
      return expect(Http._isSuccessCode(OK)).to.be.true;
    });
    it('should return true if status code === 201', function() {
      const CREATED = 201;
      return expect(Http._isSuccessCode(CREATED)).to.be.true;
    });
    it('should return false if status code <= 300', function() {
      const MULTIPLE_CHOICES = 300;
      const INTERNAL_SERVER_ERROR = 500;
      const NEXT_TYPE = 100;
      for (let httpResponseCode = MULTIPLE_CHOICES;
          httpResponseCode <= INTERNAL_SERVER_ERROR;
          httpResponseCode += NEXT_TYPE)
        expect(Http._isSuccessCode(httpResponseCode)).to.be.false;
    });
  });

  describe('#_checkStatus()', function() {
    it('should throw error with http status text message '
        + 'if status code is not ok', function() {
      const mock = {
        status: 300,
        statusText: 'Multiple choices',
      };
      const checkStatusCallback = () => Http._checkStatus(mock);
      expect(checkStatusCallback).to.throw(mock.statusText);
    });
    it('error should contain response object', function() {
      const mock = {
        status: 300,
        statusText: 'Multiple choices',
      };
      const catchError = () => {
        let error = null;
        try {
          Http._checkStatus(mock);
        } catch(e) {
          error = e;
        }
        return error;
      };
      const errorObject = catchError();
      expect(errorObject).to.be.an('error');
      expect(errorObject.response).to.be.deep.equals(mock);
    });
  });
});
