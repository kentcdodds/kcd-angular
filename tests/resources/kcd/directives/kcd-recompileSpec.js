var expect = chai.expect;
describe('Kent C. Dodds', function () {
  'use strict';

  // load the directive's module
  beforeEach(module('kcd.directives'));
  beforeEach(module(function($provide) {
  }));

  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should apologize to Joe Eames for not having tests for this component yet...', inject(function ($compile) {
    expect(true).to.be.true;
  }));
});
