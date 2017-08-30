var app = angular.module('mainController',[])
    .controller('mainController', function($scope,$location,socket) {
        $scope.submitInfo = function () {
            var clientInfo = {};
            clientInfo.userName = $scope.name;
            clientInfo.userAge = $scope.age;
            clientInfo.isReady = false;
            clientInfo.inRoom = null;
            console.log(clientInfo);
            window.sessionStorage.setItem('userName', clientInfo.userName);
            window.sessionStorage.setItem('userAge', clientInfo.userAge);
            window.sessionStorage.setItem('hasJoinedRoom', false);
            window.sessionStorage.setItem('isReady', false);
            socket.emit('register', clientInfo);
            $location.path('/rooms');
        }
    });