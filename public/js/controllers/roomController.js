var app = angular.module('roomController',[])
.controller('roomController',function($scope,socket) {
    var roomRefresh = setInterval(function() {
        socket.emit('roomsRequest');
    }, 1000);
    socket.on('roomInfo',function(roomInfo) {
        $scope.rooms = roomInfo;
    });

    socket.on('joinedRoom', function() {
        window.sessionStorage.setItem('hasJoinedRoom',true)
    })

    $scope.joinRoom = function(key) {
        console.log('joinRoom executed, with room: ' + key);
        var roomIndex;
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
        socket.emit('joinRoom',{roomIndex: roomIndex, hasJoinedRoom: window.sessionStorage.getItem('hasJoinedRoom')});
    }
});