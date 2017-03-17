describe('Search directive', function() {

    var $compile,
        $rootScope;

    beforeEach(module('app'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should contain a leaflet directive', function() {
        var element = $compile("<app-map></app-map>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).to.contain("leaflet");
    });
});