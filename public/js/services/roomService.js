var app = angular.module('roomService',[])
.service('roomService', function() {
    var data = {
        rooms: ''
    };
        this.setRoomsInfo = function(roomsInfo) {
            data.rooms = roomsInfo;
        },
        this.getRoomsinfo = function() {
            return data.rooms;
        }
})