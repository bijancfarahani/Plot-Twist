var app = angular.module('plotTwist', ['appRoutes'])
.controller('mainController', function($scope) {
    $scope.submitInfo = function(){
        console.log('submitted')
        var client = {};
        client.socket = io.connect();
        client.socket.emit('clientInfo',{name: $scope.name,age:$scope.age});

    }
})