var app = angular.module('roomController',[])
.controller('roomController',function($scope,$location, socket) {

    setInterval(function() {
        socket.emit('roomsRequest');
    }, 1000);
    socket.on('roomInfo',function(roomInfo) {
        console.log(roomInfo);
        $scope.rooms = roomInfo;
    });

    var roomIndex;
    socket.on('joinedRoom', function() {
        window.sessionStorage.setItem('hasJoinedRoom','true');
        window.sessionStorage.setItem('inRoom', roomIndex);
        $location.path('/inRoom');
    });

    $scope.joinRoom = function(key) {
        console.log('joinRoom executed, with room: ' + key);
        switch(key) {
            case 0:
                roomIndex = 0;
                break;
            case 1:
                roomIndex = 1;
                break;
            case 2:
                roomIndex = 2;
                break;
            case 3:
                roomIndex = 3;
        }
        socket.emit('joinRoom',{
            roomIndex: roomIndex,
            hasJoinedRoom: window.sessionStorage.getItem('hasJoinedRoom')
        });
    }
});