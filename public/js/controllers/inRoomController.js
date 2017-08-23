var app = angular.module('inRoomController',[])
.controller('inRoomController', function($scope,socket,$location) {

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