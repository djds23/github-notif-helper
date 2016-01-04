import {assert, expect} from 'chai';
import jsdom from 'mocha-jsdom';
import simple from 'simple-mock';

import Utils from '../src/utils/utils.js';
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

  describe('#noNewCommits', function () {
    it('returns false if the cached value is -1', function () {
      expect(CacheValidator.noNewCommits(-1, -1)).to.be.false;
    })

    it('returns false if cached number is lower than number on page', function () {
      expect(CacheValidator.noNewCommits(9, 10)).to.be.false;
    })

    it('returns false if cached number is greater than the number on page', function () {
      expect(CacheValidator.noNewCommits(11, 10)).to.be.false;
    })

    it('returns true if cached number is equal to number on page', function () {
      expect(CacheValidator.noNewCommits(10, 10)).to.be.true;
    })
  })
});

