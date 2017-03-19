'use strict';

const angular = require('angular');

function MainController() {
    const vm = this;
    vm.title = "Title TEste hello";
}

module.exports = angular.module('app.main', [])
    .controller('MainController', MainController);