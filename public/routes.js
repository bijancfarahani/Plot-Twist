var app = angular.module('appRoutes',['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/clientInput.html',
                controller: 'mainController'
            })
            .when('/rooms', {
                templateUrl: 'partials/rooms.html',
                controller: 'roomController'
            })

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })