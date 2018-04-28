portal.controller('RouteCtrl', function($scope, $routeParams) {
     if ($routeParams.action === 'logout'){
        $scope.logout();
     }
});