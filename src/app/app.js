'use strict';

const angular = require('angular');

const SearchDirective = require('./directives/search/search.directive');
const MapDirective = require('./directives/map/map.directive');
const MyLocationDirective = require('./directives/my-location/my-location.directive');

const modules = [
    SearchDirective.name,
    MapDirective.name,
    MyLocationDirective.name
];

angular.module('app', modules)
    .directive('app', function search() {
        return {
            template: require('fs').readFileSync(__dirname + '/app.html', 'utf-8')
        }
    });