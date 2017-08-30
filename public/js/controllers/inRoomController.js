var app = angular.module('inRoomController',[])
.controller('inRoomController', function($scope,$rootScope,socket,$location,$interval) {
    $scope.stop = $interval(function() {
        socket.emit('requestThisRoom', {roomIndex: window.sessionStorage.getItem('inRoom')});
    }, 1000);
    var endRoomRequest = $rootScope.$on('$locationChangeSuccess', function() {
        $interval.cancel($scope.stop);
        endRoomRequest();
    });

    socket.on('thisRoomInfo', function(roomClients) {
        console.log(roomClients);
        $scope.roomClients = roomClients;

    });

    socket.on('initGame', function() {
        $location.path('/game');
    });

    $scope.setReadyStatus = function(isReady) {
        console.log(isReady);
        if(isReady) {
            console.log('in is ready');
            socket.emit('clientReady',{roomIndex: window.sessionStorage.getItem('inRoom')});
        }

        if(!isReady) {
            console.log('is in NOT ready');
            socket.emit('clientNotReady',{roomIndex: window.sessionStorage.getItem('inRoom')});
        }
    }
});