//Main angular module.  Imports all other modules
var plotTwist = angular.module('plotTwist', ['appRoutes',
    'mainController',
    'roomController',
    'inRoomController',
    'gameController',
    'btford.socket-io'])
plotTwist.run(function(socket, $location) {
    window.sessionStorage.clear();
    $location.path('/')
});
