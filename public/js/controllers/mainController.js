var app = angular.module('mainController',[])
    .controller('mainController', function($scope,$location,socket) {

        window.sessionStorage.removeItem('clientInfo');
        window.sessionStorage.removeItem('hasJoinedRoom');
        if(JSON.parse(window.sessionStorage.getItem('clientInfo'))) {
            console.log(JSON.parse(window.sessionStorage.getItem('clientInfo')));
            $location.path('/rooms');
        }
        $scope.submitInfo = function () {
            var clientInfo = {};
            clientInfo.userID = Math.random().toString(36).substring(3,16) + +new Date;
            clientInfo.userName = $scope.name;
            clientInfo.userAge = $scope.age;
            console.log(clientInfo);
            window.sessionStorage.setItem('clientInfo', JSON.stringify(clientInfo));
            window.sessionStorage.setItem('hasJoinedRoom', false);
            socket.emit('register', clientInfo);
            $location.path('/rooms');
        }
    });