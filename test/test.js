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
    })

    it('returns an empty object if nothing exists', function () {
      expect(Utils.getCachedFiles()).to.eql({})
      expect(localStorage.getItem.callCount).to.eql(1)
    })
  })

  describe('#updateLocalStorage', function () {
    beforeEach(function () {
      global.localStorage = new MockLocalStorage();
      global.location = {
        'href': '/djds23/github-notif-helper/pull/1/files'
      }
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
