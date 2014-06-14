angular.module('kcd.services').factory('JWTAuthInterceptor', function ($q, $window) {
  'use strict';
  return {
    request: function (config) {
      config.headers = config.headers || {};
      var token = $window.localStorage.getItem('user-token');
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        console.warn('user not authenticated', response);
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
});