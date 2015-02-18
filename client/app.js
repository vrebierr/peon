'use strict';

angular.module('peon', [
  'ui.router',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'restangular',
  'angularFileUpload'
])
  .config(function ($urlRouterProvider, $locationProvider, $httpProvider, RestangularProvider) {
      $urlRouterProvider
        .otherwise('/home');

    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({id: '_id'});

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

  })
  .factory('authInterceptor',
  function ($rootScope, $q, $cookieStore, $location) {
    return {

      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      responseError: function (response) {
        if (response.status === 401) {
          $location.path('/login');
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }

    };
  })

  .run(function ($rootScope, Auth) {

    $rootScope.Auth = Auth;

  });
