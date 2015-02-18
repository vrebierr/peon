'use strict';

describe('Controller: ClientCtrl', function () {

  beforeEach(module('peon'));

  var ClientCtrl;

  beforeEach(inject(function ($controller) {
    ClientCtrl = $controller('ClientCtrl', {});
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
