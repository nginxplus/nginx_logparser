const expect = require('chai').expect;
const readFile = require('fs').readFile;

let testObject = null;
readFile(`${__dirname}/fixture.json`, (err, data) => {
  if (err)
    throw err;
  testObject = data;
});

describe('#http', function() {
  describe('get', function() {
    it('write some code', function() {
      expect(true).to.be.false;
    });
  });
});
