'use strict';

/* Controllers */

function AppCtrl($scope, socket, $http) {
	$scope.showLogout = false;
	$http.get('/api/getuser').success(function(data) {
		if(data.name.length>1) {$scope.showLogout = true;}
		$scope.name = data.name;
	});

	$scope.logout = function() {
		$http.post('/logout').success(function(data) {
			window.location.href='/';
		});
	};
};

function HomeCtrl() {

};
HomeCtrl.$inject = [];

function AdminCtrl() {

};
AdminCtrl.$inject = [];

