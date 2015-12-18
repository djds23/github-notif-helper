import {assert, expect} from 'chai';
import jsdom from 'mocha-jsdom';

import Utils from '../src/utils/utils.js';
import $ from 'jquery';


describe('Utils', function () {
  jsdom()
  describe('#toggleVisibility', function () {
    it('has document', function () {
      var div = $(document.createElement('div'));
      expect(Utils.toggleVisibility(div)).to.be.true;
      expect(1).to.equal('true');
    })
  })
});
