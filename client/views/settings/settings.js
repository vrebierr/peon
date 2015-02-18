'use strict';

angular.module('peon')
  .config(function ($stateProvider) {
    $stateProvider
      .state('settings', {
          url: '/settings',
        templateUrl: 'views/settings/settings.html',
        controller: 'SettingsCtrl',
        resolve: {
            bills: function (Restangular) {
                return Restangular.all('bills').getList();
            },
            clients: function (Restangular) {
                return Restangular.all('clients').getList();
            }
        }
      });
  });
