'use strict';

angular.module('peon')
    .config(function ($stateProvider) {
        $stateProvider
            .state('clientList', {
                url: '/clients',
                templateUrl: 'views/client/client.html',
                controller: 'ClientCtrl',
                resolve: {
                    clients: function (Restangular) {
                        return Restangular.all('clients').getList();
                    }
                }
            })
            .state('client', {
                url: '/client/:id',
                templateUrl: 'views/client/edit/edit.html',
                controller: 'ClientEditCtrl',
                resolve: {
                    client: function (Restangular, $stateParams) {
                        if ($stateParams.id)
                            return Restangular.one('clients', $stateParams.id).get();
                        else
                            return {};
                    }
                }
            });
    });
