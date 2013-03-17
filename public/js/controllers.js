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

function UserLoginsCtrl($scope, $http) {
	$http.get('/api/getuserlogins').success(function(data) {
		$scope.userlogins = data;
	}).error(function(data, status, headers, config) {
		$scope.userlogins = "ERROR";
	});
	$scope.trEval = function(num) {
		if(num == 0) {return "error";}
		if(num == 1) {return "success";}
	};
	$scope.radioVal = function(status) {
		if(status == "all") {$scope.query2 = "";}
		if(status == 1) {$scope.query2 = true;}
		if(status == 2) {$scope.query2 = false;}
	};
};
UserLoginsCtrl.$inject = ['$scope', '$http'];

