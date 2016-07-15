const expect = require('chai').expect;
const readFile = require('fs').readFile;

let testObject = null;
readFile(`${__dirname}/fixture.json`, (err, data) => {
  if (err)
    throw err;
  testObject = data;
});
