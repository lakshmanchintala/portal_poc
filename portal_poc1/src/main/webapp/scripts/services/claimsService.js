cams.factory('claimsService', ['$http', function($http) {
	
	var urlBase = 'api/claims';
    var claimsService = {};

    claimsService.getClaims = function () {
        return $http.get(urlBase);
    };

    claimsService.getClaim = function (id) {
    	 return $http.get(urlBase + '/' + id);
    };

    claimsService.createClaim = function (claim) {
    	return $http.post(urlBase, claim);
    };
    
    claimsService.deleteClaim = function (id) {
    	console.log('in service '+id);
    	return $http.delete(urlBase + '/' + id);
    };
    
    claimsService.getUploadedFiles = function (id) {
        return $http.get(urlBase + '/' + id + '/files');
    };
    
    return claimsService;
}]);
