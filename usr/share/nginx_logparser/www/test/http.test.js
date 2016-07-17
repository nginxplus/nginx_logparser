import { expect } from 'chai';
import { readFile } from 'fs';
import Http from './../src/helpers/http.js';

let testObject = null;
readFile(`${__dirname}/fixture.json`, (err, data) => {
  if (err)
    throw err;
  testObject = data;
});

describe('Http', function() {
  it('should be a function', function() {
    expect(Http).to.be.a('function');
  });

  describe('#get', function() {
    it('should be function', function() {
      expect(Http.get).to.be.a('function');
    });
    it('should return promise', function() {
      expect(Http.get()).to.be.a('promise');
    });
  });
});
