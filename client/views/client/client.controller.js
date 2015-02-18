'use strict';

angular.module('peon')
    .controller('ClientCtrl', function ($scope, $state, clients) {
        $scope.clients = clients;

        $scope.delete = function (client) {
            client.remove().then(function () {
                $scope.clients = _.without($scope.clients, client);
            });
        };
    });
