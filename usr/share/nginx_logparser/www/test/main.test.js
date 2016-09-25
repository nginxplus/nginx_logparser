import chai from 'chai';
const expect = chai.expect;

import { createServer } from './devServer';
const MOCK = [{
  'id': 1,
  'ip': '46.216.14.248',
  'date': '25/Jun/2016:11:18:00',
  'method': 'GET',
  'domain': 'pv-photo.by',
  'uri': '/contacts/style.css',
  'code': '200',
  'platform': 'Mozilla/5.0 (X11; Linux x86_64)',
}, {
  'id': 2,
  'ip': '46.216.14.248',
  'date': '25/Jun/2016:11:18:00',
  'method': 'GET',
  'domain': 'pv-photo.by',
  'uri': '/contacts/style.css',
  'code': '200',
  'platform': 'Mozilla/5.0 (X11; Linux x86_64)',
}];
const PORT = 3003;
const SUCCESS = 200;
createServer(SUCCESS, JSON.stringify(MOCK)).listen(PORT);

import { Main } from './../src/main';

describe('Main', function() {
  describe('#statistics', function() {
    it('should be saved', function() {
      const apiUrl = `http://localhost:${PORT}`;
      const main = new Main(apiUrl);
      expect(main.statistics).to.be.equal(MOCK);
    });
  });
});
