'use strict';

const angular = require('angular');

function search() {
    return {
        template: '<input type="text"/>'
    }
}

module.exports = angular.module('app.search', [])
.directive('appSearch', search);