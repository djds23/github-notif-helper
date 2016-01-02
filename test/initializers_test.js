import {assert, expect} from 'chai';
import jsdom from 'mocha-jsdom';
import simple from 'simple-mock';

import Utils from '../src/utils/utils.js';
import Initializers from '../src/initializers.js';
import MockLocalStorage from './localStorage.js';


describe('Initializers', function () {
  describe('#invalidateCache', function () {
    beforeEach(function () {
      global.localStorage = new MockLocalStorage();
      global.location = {
        'href': '/djds23/github-notif-helper/pull/1/files'
      };
    })

    it('returns false if no new commits & cache is newer than 30 days', function () {
      expect(Initializers.invalidateCache({}, [], -1)).to.be.false;
    })

    it('returns false if timestamp is older than 30 days', function () {
      const oldTimestamp = new Date("Thur August 23 1990 00:00:00 UTC")
      expect(Initializers.invalidateCache({}, [], 10)).to.be.false;
    })
  })
});

