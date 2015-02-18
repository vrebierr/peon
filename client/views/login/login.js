'use strict';

angular.module('peon')
  .config(function ($stateProvider) {
    $stateProvider
      .state('/login', {
        templateUrl: 'views/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      });
  });
