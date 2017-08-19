var app = angular.module('roomController',['roomService'])
.controller('roomController', function($scope, roomService,socket) {
    $scope.rooms = roomService.getRoomsinfo();
    console.log($scope.rooms);

    $scope.joinRoom = function(key) {
        console.log('joinRoom executed, with room: ' + key);
        socket.emit('joinRoom',{room: key});
    }
});