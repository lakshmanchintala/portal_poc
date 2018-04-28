portal.directive('smallPanel', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/account/smallPanel.html'
    };
});

portal.directive('emptyPanel', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/account/emptyPanel.html'
    };
});
