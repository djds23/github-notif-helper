import {assert, expect} from 'chai';
import jsdom from 'mocha-jsdom';
import simple from 'simple-mock';

import Utils from '../src/utils/utils.js';
import MockLocalStorage from './localStorage.js';


describe('Utils', function () {
  jsdom()

  before(function () {
    global.window = document.defaultView;
    global.$ = require('jquery')(window);
  })

  describe('#getCachedCommitNumber', function () {
    beforeEach(function () {
      global.localStorage = new MockLocalStorage();
      global.location = {
        'href': '/djds23/github-notif-helper/pull/1/files'
      };
    })

    it('returns -1 when no value is stored', function() {
      expect(Utils.getCachedCommitNumber()).to.eql(-1);
    })

    it('gets the number of commits stached', function () {
      Utils.updateLocalStorage("commitNum", 5);
      expect(Utils.getCachedCommitNumber()).to.eql(5);
    })
  })

  describe('#setFileInCache', function () {
    beforeEach(function () {
      global.localStorage = new MockLocalStorage();
      global.location = {
        'href': '/djds23/github-notif-helper/pull/1/files'
      };
    })

    it('sets file if no page cache exists', function() {
      expect(Utils.getCachedFiles()).to.eql({});
      Utils.setFileInCache('diff-0', true);
      expect(Utils.getCachedFiles()).to.eql({'diff-0': true});
    })

    it('appends to the existing cache', function() {
      Utils.updateLocalStorage('files', {'diff-0': true});
      Utils.setFileInCache('diff-1', false);
      expect(Utils.getCachedFiles()).to.eql({'diff-0': true, 'diff-1': false});
    })
  })

  describe('#resetCacheForPage', function () {
    beforeEach(function () {
      global.localStorage = new MockLocalStorage();
      global.location = {
        'href': '/djds23/github-notif-helper/pull/1/files'
      };
    })

    it('resets the namespaced cache', function () {
      Utils.updateLocalStorage('commitNum', 5);
      Utils.updateLocalStorage('files', {'diff-0': true});
      expect(Utils.getCachedCommitNumber()).to.eql(5);
      expect(Utils.getCachedFiles()).to.eql({'diff-0': true});

      Utils.resetCacheForPage();
      expect(Utils.getCachedCommitNumber()).to.eql(-1);
      expect(Utils.getCachedFiles()).to.eql({});
    })
  })

  describe('#toggleVisibility', function () {

    it('returns false for a visible element', function () {
      let div = $(document.createElement('div'));
      let hide = simple.stub();
      simple.mock(div, 'is', () => { return true; });
      simple.mock(div, 'hide', hide);

      expect(Utils.toggleVisibility(div)).to.be.false;
      expect(hide.callCount).to.eql(1);
    })

    it('returns true for a hidden element', function () {
      let div = $(document.createElement('div'));
      let show = simple.stub();
      simple.mock(div, 'is', () => { return false; });
      simple.mock(div, 'show', show);

      expect(Utils.toggleVisibility(div)).to.be.true;
      expect(show.callCount).to.eql(1);
    })
  })

  describe('#getCachedFiles', function () {
    beforeEach(function () {
      global.localStorage = new MockLocalStorage();
      global.location = {
        'href': '/djds23/github-notif-helper/pull/1/files'
      };
    })

    it('returns an empty object if nothing exists', function () {
      expect(Utils.getCachedFiles()).to.eql({});
      expect(localStorage.getItem.callCount).to.eql(1);
    })

    it('only returns file diffs', function () {
      Utils.updateLocalStorage('files', {'diff-0': true});
      Utils.updateLocalStorage('commitNum', 1);
      expect(Utils.getCachedFiles()).to.eql({'diff-0': true});
      expect(Utils.getCachedCommitNumber()).to.eql(1);
    })
  })

  describe('#updateLocalStorage', function () {
    beforeEach(function () {
      global.localStorage = new MockLocalStorage();
      global.location = {
        'href': '/djds23/github-notif-helper/pull/1/files'
      };
    })

    it('updates localStorage with proper keys and values', function () {
      expect(Utils.updateLocalStorage('diff-0', true)).to.be.true;
      expect(localStorage.getItem.callCount).to.eql(1);
      expect(localStorage.setItem.callCount).to.eql(1);
      expect(localStorage.store[location.href]).to.eql('{"diff-0":true}');
    })

    it('updates localStorage with different hrefs', function () {
      let url1 = '/url1';
      location.href = url1;
      Utils.updateLocalStorage('diff-0', true);

      let url2 = '/url2';
      location.href = url2;
      Utils.updateLocalStorage('diff-0', true);

      expect(localStorage.store[url1]).to.eql('{"diff-0":true}');
      expect(localStorage.store[url2]).to.eql('{"diff-0":true}');
    })
  })
});

