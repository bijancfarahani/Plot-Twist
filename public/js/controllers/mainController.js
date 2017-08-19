var app = angular.module('mainController',['roomService'])
    .controller('mainController', function($scope,$location, roomService,socket) {
        $scope.submitInfo = function () {
            socket.emit('clientInfo', {name: $scope.name, age: $scope.age});
            socket.on('roomInfo', function (roomInfo) {
                console.log('in roomInfo')
                roomService.setRoomsInfo(roomInfo);  //add room sizes to scope
                console.log($scope);
                //change the route and let angular know
                $location.path('/rooms');
                $scope.$apply();
                });
        }
    })