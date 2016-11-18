'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
      'ngCookies',
      'ngRoute',
      'ui.router',
      'mainModule',
      'headerModule',
      'mapModule',
      'restaurantModule',
      'profileModule',
      'joinModule',
      'historyModule'
    ])
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
      $stateProvider
          .state('main',{
            url: '/main',
            views: {
              'main': {
                templateUrl: 'template/main.html',
                controller: 'MainCtrl'
              }
            }
          })
          .state('login',{
            url: '/login',
            views: {
              'login': {
                templateUrl: 'template/login.html',
                controller: 'LoginCtrl'
              }
            }
          })
          .state('register',{
            url: '/register',
            views: {
              'register': {
                  templateUrl: 'template/register.html',
                  controller: 'RegisterCtrl'
              }
            }
          })
          .state('profile',{
              url: '/profile',
              views: {
                  'profile': {
                      templateUrl: 'template/profile.html',
                      controller: 'ProfileCtrl'
                  }
              }
          })
          .state('map',{
              url: '/map',
              views: {
                  'map': {
                      templateUrl: 'template/map.html',
                      controller: 'MapCtrl'
                  }
              }
          })
          .state('restaurant',{
              url: '/restaurant?rid',
              views: {
                  'restaurant': {
                      templateUrl: 'template/restaurant.html',
                      controller: 'RestaurantCtrl'
                  }
              }
          })
          .state('join',{
              url: '/join',
              views: {
                  'join': {
                      templateUrl: 'template/join.html',
                      controller: 'JoinCtrl'
                  }
              }
          })
          .state('history',{
              url: '/history',
              views: {
                  'history': {
                      templateUrl: 'template/history.html',
                      controller: 'HistoryCtrl'
                  }
              }
          })



      $urlRouterProvider.otherwise('main');
    }])
.run(['$rootScope',  function ($rootScope) {
    var server = "http://localhost:8080/DelicacyMap/";
    if (window.localStorage) {
        localStorage.setItem("serverAddress", server);
    } else {
        console.log("cookie");
        Cookie.write("serverAddress", server);
    }

    $rootScope.isLogin = false;


    var isLogin = window.localStorage ? localStorage.getItem("isLogin") : Cookie.read("isLogin");

    if (!(isLogin == "login")){
        if (window.localStorage) {
            console.log("localStorage ");
            localStorage.setItem("isLogin", "offline");
        } else {
            console.log("cookie");
            Cookie.write("isLogin", "offline");
        }
    } else {
        if (window.localStorage) {
            console.log("localStorage ", "login");
            localStorage.setItem("isLogin", "login");
        } else {
            console.log("cookie");
            Cookie.write("isLogin", "login");
        }
        $rootScope.isLogin = true;
        $rootScope.username = window.localStorage ? localStorage.getItem("username") : Cookie.read("username");
        $rootScope.head = window.localStorage ? localStorage.getItem("head") : Cookie.read("head");
    }

}])
    .provider('myCSRF', [function () {
    var headerName = 'X-CSRFToken';
    var cookieName = 'csrftoken';
    var allowedMethods = ['GET'];

    this.setHeaderName = function (n) {
        headerName = n;
    }
    this.setCookieName = function (n) {
        cookieName = n;
    }
    this.setAllowedMethods = function (n) {
        allowedMethods = n;
    }
    this.$get = ['$cookies', function ($cookies) {
        return {
            'request': function (config) {
                if (allowedMethods.indexOf(config.method) === -1) {
                    // do something on success
                    config.headers[headerName] = $cookies[cookieName];
                }
                return config;
            }
        }
    }];
}]).config(function ($httpProvider) {
    $httpProvider.interceptors.push('myCSRF');
});
