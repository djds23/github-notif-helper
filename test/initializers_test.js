import {assert, expect} from 'chai';
import jsdom from 'mocha-jsdom';
import simple from 'simple-mock';

import Utils from '../src/utils/utils.js';
import Initializers from '../src/initializers.js';
import MockLocalStorage from './localStorage.js';


describe('Initializers', function () {

  jsdom();

  before(function () {
    // Mock each function so I can pass array and iterate over it
    // as if it was a jQuery selector.
    Array.prototype.each = function (func) {
      this.forEach((element, index, array) => {
        func(index, element);
      });
    };
  })

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
      expect(postRequestCache.commitNum).to.eql(1);
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
      expect(Utils.getCachedCommitNumber()).to.eql(10);
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

  describe('#addToggleAll', function () {
    beforeEach(function () {
      simple.mock(Utils, 'getCachedFiles').callOriginal();
    })

    it('does nothing if no files are passed', function () {
      Initializers.addToggleAll({}, [], 0)
      expect(Utils.getCachedFiles.callCount).to.eql(0)
    })
  })

  describe('#addToggle', function () {
    beforeEach(function () {
      global.window = document.defaultView;
      global.$ = require('jquery')(window);
      simple.mock(Utils, 'addToggleButtonForElement').returnWith(undefined);
      simple.mock(Utils, 'getCachedFiles').callOriginal();

    })

    it('does nothing if no files are passed', function () {
      Initializers.addToggle({}, [], 0);
      expect(Utils.getCachedFiles.callCount).to.eql(0);
    })

    it('adds id to cache for each file object', function () {
      const mockFileOne = { id: 'diff-0' };
      const mockFileTwo = { id: 'diff-1' };
      const mockFileThree = { id: 'diff-2' };

      let callToggle = () => {
        Initializers.addToggle({}, [mockFileOne, mockFileTwo, mockFileThree], 1)
      };

      let cachedFilesFunc = Utils.getCachedFiles;
      let expectedOutput = {
        'diff-0': true,
        'diff-1': true,
        'diff-2': true
      };

      expect(callToggle).to.increase(cachedFilesFunc, 'callCount');
      expect(Utils.getCachedFiles()).to.eql(expectedOutput);
    })
  })
});

