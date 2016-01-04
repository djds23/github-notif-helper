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

      simple.mock(Utils, 'resetCacheForPage').callOriginal();
      simple.mock(Utils, 'setLastViewed').callOriginal();
    })

    it('invalidates cache if localstorage is empty', function () {
      let preRequestCache = Utils.getPageCache();

      expect(preRequestCache.lastViewed).to.be.undefined;
      expect(Initializers.invalidateCache({}, [], 1)).to.be.true;

      let postRequestCache = Utils.getPageCache();

      expect(postRequestCache.lastViewed).to.not.be.undefined;
      expect(postRequestCache.commitNum).to.equal(1);
      expect(Utils.resetCacheForPage.callCount).to.eql(1);
    })

    it('invalidates cache if timestamp is older than 30 days', function () {
      const oldTimestamp = new Date("Thur August 23 1990 00:00:00 UTC");
      Utils.updateLocalStorage('commitNum', 10);
      Utils.updateLocalStorage('lastViewed', oldTimestamp);

      expect(Initializers.invalidateCache({}, [], 10)).to.be.true;
      expect(Utils.resetCacheForPage.callCount).to.eql(1);
      expect(Utils.setLastViewed.callCount).to.eql(1);

    })

    it('invalidates cache if cached commits is less than new commits', function () {
      const currentTimestamp = Date.now();
      Utils.updateLocalStorage('commitNum', 9);
      Utils.updateLocalStorage('lastViewed', currentTimestamp);

      expect(Initializers.invalidateCache({}, [], 10)).to.be.true;
      expect(Utils.resetCacheForPage.callCount).to.eql(1);
      expect(Utils.getCachedCommitNumber()).to.equal(10);
      expect(Utils.setLastViewed.callCount).to.eql(1);
    })

    it('sets new timestamp but does not invalidate cache when no new commits & page was recently viewed', function () {
      const currentTimestamp = Date.now();
      Utils.updateLocalStorage('commitNum', 10);
      Utils.updateLocalStorage('lastViewed', currentTimestamp);

      expect(Initializers.invalidateCache({}, [], 10)).to.be.false;
      expect(Utils.resetCacheForPage.callCount).to.eql(0);
      expect(Utils.setLastViewed.callCount).to.eql(1);
    })
  })
});

