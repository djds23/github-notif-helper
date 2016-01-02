import {assert, expect} from 'chai';
import jsdom from 'mocha-jsdom';
import simple from 'simple-mock';

import DateUtils from '../src/utils/dateutils.js';


describe('DateUtils', function () {
  describe('#shouldBustCache', function () {
    it('false if timestamp is newer than 30 days', function () {
      expect(DateUtils.shouldBustCache(Date.now())).to.be.false;
    })

    it('true if timestamp is older than 30 days', function () {
      const oldTimestamp = new Date("Thur August 23 1990 00:00:00 UTC")
      expect(DateUtils.shouldBustCache(oldTimestamp)).to.be.true;
    })
  })
});

