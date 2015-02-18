'use strict';

angular.module('peon')
    .controller('ClientEditCtrl', function ($scope, $state, client, Restangular) {
        $scope.client = client;

        if ($scope.client._id) {
            Restangular.all('bills').one('client', $scope.client._id).getList().then(function (bills) {
                $scope.bills = bills;
            });
        };

        $scope.send = function () {
            if ($scope.client._id) {
                $scope.client.put().then(function (res) {
                    $state.go('clientList');
                });
            }
            else {
                Restangular.all('clients').post($scope.client).then(function (res) {
                    $state.go('clientList');
                });
            }
        }
    });
