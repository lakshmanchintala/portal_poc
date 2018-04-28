portal.controller('registerLookupPopUpInstanceCtrl', function ($scope, $uibModalInstance, items, $rootScope) {

    $scope.ok = function () {
       $uibModalInstance.close();
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

});