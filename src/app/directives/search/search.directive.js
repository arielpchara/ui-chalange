'use strict';

const angular = require('angular');

const template = require('fs').readFileSync(__dirname + '/search.html', 'utf-8');

function SearchController($log, $scope, LocateService) {
    const vm = this;
    vm.host = '';
    vm.loading = false;
    vm.invalid = false;
    vm.locate = function(form) {
        if (form.$valid) {
            vm.loading = true;
            LocateService.locateHost(vm.host).then(data => {
                vm.loading = false;
                if (data.status = 'success' && data.lat && data.lon) {
                    vm.invalid = false;
                    $scope.$emit('addMark', {
                        id: 'host',
                        latitude: data.lat,
                        longitude: data.lon
                    });
                } else {
                    vm.invalid = true;
                    $scope.$emit('rmMark', 'host');
                }
            });
        }
    };
}

SearchController.$inject = ['$log', '$scope', 'LocateService'];

function SearchDirective() {
    return {
        controller: 'SearchController as search',
        template: template
    }
}

const HOST_REGEXP = /^(?:www\.)?.*\.\w+$/;

function HostValidationDirective($log) {
    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.host = function(modelValue, viewValue) {
                return HOST_REGEXP.test(viewValue);
            }
        }
    }
}
HostValidationDirective.$inject = ['$log'];

module.exports = angular.module('app.search', [])
    .controller('SearchController', SearchController)
    .directive('appSearch', SearchDirective)
    .directive('host', HostValidationDirective);