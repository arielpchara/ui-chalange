'use strict';

const angular = require('angular');
const leaflet = require('ui-leaflet');
const nemLogging = require('angular-simple-logger');

function MapController($scope, leafletData, $log) {

    angular.extend($scope, {
        defaults: {
            // tileLayer: 'http://{s}.tile.openstreetmap.org/cycle/{z}/{x}/{y}.png',
            maxZoom: 14,
            boxZoom: false,
            scrollWheelZoom: false,
            path: {
                weight: 10,
                opacity: 1
            }
        }
    });

    function setCoords(event, coords) {
        leafletData.getMap('mymap').then(function(map) {
            const zoom = coords.accuracy > 200 ? 10 : 14;
            map.setView(new L.LatLng(coords.latitude, coords.longitude)).setZoom(zoom);
        });
    }
    $scope.$on('setCoords', setCoords)
}

MapController.$inject = ['$scope', 'leafletData', '$log'];

module.exports = angular.module('app.map', ['nemLogging', 'ui-leaflet'])
    .directive('appMap', function search() {
        return {
            controller: MapController,
            template: '<leaflet id="mymap" defaults="defaults" lf-center="center" height="300px" width="100%"></leaflet>'
        }
    });