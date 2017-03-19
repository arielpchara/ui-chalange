'use strict';

const angular = require('angular');

function LocateService($http) {
    return {
        getMyCoords(cb) {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    cb(position.coords);
                });
            } else {
                cb(false);
            }
        },
        locateHost(host) {
            const url = 'http://ip-api.com/json/' + host;
            return $http.get(url).then(response => response.data);
        }
    }
}

LocateService.$inject = ['$http'];

module.exports = angular.module('app.locate', []).factory('LocateService', LocateService);