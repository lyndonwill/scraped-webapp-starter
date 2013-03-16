'use strict';

/* Controllers */

function AppCtrl($scope, socket) {
  socket.on('send:name', function (data) {
    $scope.name = data.name;
  });
};

function HomeCtrl() {

};
HomeCtrl.$inject = [];

function AdminCtrl() {

};
AdminCtrl.$inject = [];

