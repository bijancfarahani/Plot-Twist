var app = angular.module('appRoutes',['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'clientInput.html'
            })
            .when('/about', {
                templateUrl: 'test.html'
        })

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })