'use strict';

angular.module('peon')
  .config(function ($stateProvider) {
    $stateProvider
      .state('/', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      });
  });
