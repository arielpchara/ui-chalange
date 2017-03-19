'use strict';

const angular = require('angular');

const uileaflet = require('ui-leaflet');
const uiGmapgoogleMaps = require('angular-google-maps');

const googleApiKey = 'AIzaSyDJS-4L-LFcVSbeiPd5TjP1JcI2KsnAeiE';

const nemLogging = require('angular-simple-logger');

function MapController($scope, $log, uiGmapGoogleMapApi) {
    let vm = this;
    vm.center = {
        latitude: 37.3388,
        longitude: -121.8914
    };
    vm.visible = false;
    vm.zoom = 3;
    vm.options = {
        streetViewControl: false,
        panControl: false,
        maxZoom: 8,
        minZoom: 1
    };

    vm.mymarker = {};

    vm.markers = [];

    uiGmapGoogleMapApi.then(function(maps) {
        vm.maps = maps;
    });

    function addMark(event, marker) {
        if (!vm.visible) vm.visible = true;
        let existsMark = vm.markers.find(mrk => mrk.id === marker.id);
        if (existsMark) {
            vm.markers = vm.markers.map(mrk => {
                if (mrk.id === marker.id) {
                    return marker;
                }
                return mrk;
            });
        } else {
            vm.markers.push(marker)
        };
    }
    $scope.$on('addMark', addMark);

    function rmMark(e, id) {
        vm.markers = vm.markers.filter(mrk => mrk.id !== id);
    }
    $scope.$on('rmMark', rmMark);
}

MapController.$inject = ['$scope', '$log', 'uiGmapGoogleMapApi'];

function Config(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: googleApiKey
    });
}

Config.$injeft = ['uiGmapGoogleMapApiProvider'];

function SeachDirective() {
    return {
        controller: 'MapController as map',
        template: require('fs').readFileSync(__dirname + '/map.html', 'utf-8')
    }
}

module.exports = angular.module('app.map', ['nemLogging', 'uiGmapgoogle-maps'])
    .config(Config)
    .controller('MapController', MapController)
    .directive('appMap', SeachDirective);