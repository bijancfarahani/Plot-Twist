//Main angular module.  Imports all other modules
var plotTwist = angular.module('plotTwist', ['appRoutes',
    'mainController',
    'roomController',
    'btford.socket-io',])
plotTwist.run(function(socket) {
    console.log('in run');
    console.log(window.sessionStorage.getItem('clientInfo'));
    socket.emit('register',window.sessionStorage.getItem('clientInfo'));
});
