//Main angular module.  Imports all other modules
var plotTwist = angular.module('plotTwist', ['appRoutes',
    'mainController',
    'roomController',
    'roomService',
    'btford.socket-io',])
