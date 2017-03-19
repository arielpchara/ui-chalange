'use strict';

const angular = require('angular');

function Geo() {
    return {
        getCoords(cb) {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    cb(position.coords);
                });
            } else {
                cb(false);
            }
        },
        setPosition(coords) {}
    }
}

module.exports = angular.module('app.main', []).factory('Geo', Geo);