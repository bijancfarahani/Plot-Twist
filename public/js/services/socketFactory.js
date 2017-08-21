//Uses the btFord lib to create a socketIO socket obj which can be used across controllers as 'socket'
plotTwist.factory('socket', ['socketFactory', function(socketFactory) {
  return socketFactory();
}]);