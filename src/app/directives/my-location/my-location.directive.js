'use strict';

const angular = require('angular');

function MyLocationController($scope, $log, LocateService) {

    let coords = {
        latitude: 0,
        longitude: 0
    };

    $scope.mylocatedisabled = true;

    LocateService.getMyCoords(function(res) {
        $scope.mylocatedisabled = false;
        coords = res;
        $scope.$apply();
    });

    $scope.getMyLocation = function() {
        $scope.$emit('addMark', {
            id: 'mylocation',
            latitude: coords.latitude,
            longitude: coords.longitude
        });
    }
    $scope.resetMyLocation = function() {
        $scope.$emit('rmMark', 'mylocation');
    }
}

MyLocationController.$inject = ['$scope', '$log', 'LocateService'];

function SearchDirective() {
    return {
        template: require('fs').readFileSync(__dirname + '/my-location.html', 'utf-8'),
        controller: MyLocationController,
        transclude: true
    }
}


module.exports = angular.module('app.myLocation', [
        require('../../services/locate.service').name
    ])
    .directive('appMyLocation', SearchDirective);