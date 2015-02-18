'use strict';

angular.module('peon')
    .config(function ($stateProvider) {
        $stateProvider
            .state('signup', {
                url: '/signup',
                templateUrl: 'views/signup/signup.html',
                controller: 'SignupCtrl',
                controllerAs: 'vm'
            });
    });
