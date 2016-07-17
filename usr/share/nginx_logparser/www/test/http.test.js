import chai from 'chai';
const expect = chai.expect;
import { readFile } from 'fs';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import Http from './../src/helpers/http.js';

//let testObject = null;
//readFile(`${__dirname}/fixture.json`, (err, data) => {
//  if (err)
//    throw err;
//  testObject = data;
//});

describe('Http', function() {
  it('should be a function', function() {
    return expect(Http).to.be.a('function');
  });

  describe('#get', function() {
    it('should be function', function() {
      return expect(Http.get).to.be.a('function');
    });
    it('should return promise', function() {
      return expect(Http.get()).to.be.a('promise');
    });
    it('should be rejected on null', function() {
      const promise = Http.get(null);
      return expect(promise).to.be.rejectedWith(Error);
    });
    it('should be rejected on empty argumets', function() {
      const promise = Http.get();
      return expect(promise).to.be.rejectedWith(Error);
    });
  });

  describe('#_isSuccessCode', function() {
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
  describe('#_checkStatus', function() {

  });
});
