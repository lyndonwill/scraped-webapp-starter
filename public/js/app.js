'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', '$strap.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home', controller: HomeCtrl});
    $routeProvider.when('/admin', {templateUrl: 'partials/secure/admin', controller: AdminCtrl});
    $routeProvider.when('/userlogins', {templateUrl: 'partials/secure/userlogins', controller: UserLoginsCtrl});
    $routeProvider.otherwise({redirectTo: '/home'});
    $locationProvider.html5Mode(true);
  }]);