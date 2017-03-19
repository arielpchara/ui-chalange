describe('Locate Service', function() {

    var $locateService, $httpBackend;

    beforeEach(module('app'));

    beforeEach(inject(function(LocateService, $injector) {
        $locateService = LocateService;
        $httpBackend = $injector.get('$httpBackend');
    }));

    it('shouuld return google data', function(done) {
        $httpBackend.expectGET('http://ip-api.com/json/google.com').respond({
            "as": "AS15169 Google Inc.",
            "city": "Jupiter",
            "country": "United States",
            "countryCode": "US",
            "isp": "Google",
            "lat": 26.937,
            "lon": -80.135,
            "org": "Google",
            "query": "172.217.11.46",
            "region": "FL",
            "regionName": "Florida",
            "status": "success",
            "timezone": "America/New_York",
            "zip": "33458"
        });
        $locateService.locateHost('google.com').then(function(data) {
            expect(data.org).to.equal('Google');
            done();
        }, done);
        $httpBackend.flush();
    })

});