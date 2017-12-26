angular.module('attRiskManagementApp').filter('map_colour', [function () {
    return function (input) {
    	if(input==undefined){
    		return "grey";
    	}
    	var r = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var a = Math.floor(Math.random() * 255);
        return "rgba(255," + g + "," + b + ",1)";
    }
}]);