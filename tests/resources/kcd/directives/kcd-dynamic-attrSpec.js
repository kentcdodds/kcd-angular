var expect = chai.expect;
describe('kcd-dynamic-attr', function () {
  'use strict';

  // load the directive's module
  beforeEach(module('kcd.directives'));

  var element;
  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should evaluate the value of name and set name to the evaluated value', inject(function ($compile) {
    scope.formName = 'my-form-name';
    element = angular.element('<input kcd-dynamic-attr="name" name="formName" />');
    element = $compile(element)(scope);

    scope.$digest();

    expect(element.attr('name')).to.equal(scope.formName);
  }));

  it('should be able to evaluate multiple attributes', inject(function($compile) {
    scope.formName = 'my-form-name';
    scope.className = 'my-class-name';
    element = angular.element('<input kcd-dynamic-attr="name,class" name="formName" class="className" />');
    element = $compile(element)(scope);

    scope.$digest();

    expect(element.attr('name')).to.equal(scope.formName);
    expect(element.attr('class')).to.equal(scope.className);
  }));

  it('should remove itself from the list of attributes', inject(function($compile) {
    scope.formName = 'my-form-name';
    element = angular.element('<input kcd-dynamic-attr="name" name="formName" />');
    expect(element.attr('kcdDynamicAttr')).to.be.defined;

    element = $compile(element)(scope);

    scope.$digest();

    expect(element.attr('kcdDynamicAttr')).to.be.undefined;
  }));
});