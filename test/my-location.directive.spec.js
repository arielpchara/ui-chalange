describe('Search directive', function() {

    var $compile,
        $rootScope;

    beforeEach(module('app'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should contain a numbers', function() {
        var element = $compile("<app-my-location></app-my-location>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).to.contain("0 / 0");
    });
});