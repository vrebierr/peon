'use strict';

angular.module('peon')
    .config(function ($stateProvider) {
    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            resolve: {
                bills: function (Restangular) {
                    return Restangular.all('bills').one('state', 'published').getList();
                },
                clients: function (Restangular) {
                    return Restangular.all('clients').getList();
                }
            }
    });
});
