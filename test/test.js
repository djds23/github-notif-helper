import {assert, expect} from 'chai';
import jsdom from 'mocha-jsdom';
import simple from 'simple-mock';

import Utils from '../src/utils/utils.js';
import MockLocalStorage from './localStorage.js';


describe('Utils', function () {
  jsdom()

  before(function () {
    let localStorage = new MockLocalStorage();
    global.window = document.defaultView;
    global.localStorage = localStorage;
    global.$ = require('jquery')(window);
  })


  describe('#toggleVisibility', function () {

    it('returns false for a visible element', function () {
      let div = $(document.createElement('div'));
      let hide = simple.stub()
      simple.mock(div, 'is', () => { return true; });
      simple.mock(div, 'hide', hide);

      expect(Utils.toggleVisibility(div)).to.be.false;
      expect(hide.callCount).to.eql(1);
    })

    it('returns true for a hidden element', function () {
      let div = $(document.createElement('div'));
      let show = simple.stub()
      simple.mock(div, 'is', () => { return false; });
      simple.mock(div, 'show', show);

      expect(Utils.toggleVisibility(div)).to.be.true;
      expect(show.callCount).to.eql(1);
    })
  })

  describe('#getCachedFiles', function () {
    it('returns an empty object if nothing exists', function () {
      expect(Utils.getCachedFiles()).to.eql({})
    })
  })
});
