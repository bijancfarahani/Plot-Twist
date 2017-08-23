var app = angular.module('mainController',[])
    .controller('mainController', function($scope,$location,socket) {
        $scope.submitInfo = function () {
            var clientInfo = {};
            clientInfo.userID = Math.random().toString(36).substring(3,16) + +new Date;
            clientInfo.userName = $scope.name;
            clientInfo.userAge = $scope.age;
            clientInfo.isReady = false;
            console.log(clientInfo);
            window.sessionStorage.setItem('userID', clientInfo.userID);
            window.sessionStorage.setItem('userName', clientInfo.userName);
            window.sessionStorage.setItem('userAge', clientInfo.userAge);
            window.sessionStorage.setItem('hasJoinedRoom', false);
            window.sessionStorage.setItem('isReady', true);
            socket.emit('register', clientInfo);
            $location.path('/rooms');
        }
    });