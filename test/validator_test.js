import {assert, expect} from 'chai';
import jsdom from 'mocha-jsdom';
import simple from 'simple-mock';

import CacheValidator from '../src/utils/cache_validator.js';


describe('CacheValidator', function () {
  describe('#cacheIsFresh', function () {
    it('returns true if timestamp was saved in the last 30 days', function () {
      expect(CacheValidator.cacheIsFresh(Date.now())).to.be.true;
    })

    it('returns false if timestamp is older than 30 days', function () {
      const oldTimestamp = new Date("Thur August 23 1990 00:00:00 UTC")
      expect(CacheValidator.cacheIsFresh(oldTimestamp)).to.be.false;
    })
  })
});

