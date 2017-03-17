'use strict';

const angular = require('angular');


const SearchDirective = require('./directives/search.directive');
const MapDirective = require('./directives/map.directive');
const MyLocationDirective = require('./directives/my-location.directive');

const modules = [
    SearchDirective.name,
    MapDirective.name,
    MyLocationDirective.name,
];

function MainController() {
    const vm = this;
    vm.title = "Title TEste hello";
}

angular.module('app', modules).controller('MainController', MainController);
