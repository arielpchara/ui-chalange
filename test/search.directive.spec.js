describe('Search directive', function() {

    var $compile,
        $rootScope;

    beforeEach(module('app'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should contain an input', function() {
        var element = $compile("<app-search></app-search>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).to.contain("input");
    });
});