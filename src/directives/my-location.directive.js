'use strict';

const angular = require('angular');

function MyLocationController($scope, $log, Geo) {
    const vm = this;

    vm.latitude = 0;
    vm.longitude = 0;

    function getCoords(coords) {
        if (coords) {
            vm.latitude = coords.latitude;
            vm.longitude = coords.longitude;
            $scope.$emit('setCoords', coords);
            $scope.$digest();
        }
    }
    Geo.getCoords(getCoords);
}

MyLocationController.$inject = ['$scope', '$log', 'Geo'];

function SearchDirective() {
    return {
        template: '{{location.latitude}} / {{location.longitude}}',
        controller: 'MyLocationController as location'
    }
}


module.exports = angular.module('app.myLocation', [
        require('../services/geo.service').name
    ])
    .controller('MyLocationController', MyLocationController)
    .directive('appMyLocation', SearchDirective);