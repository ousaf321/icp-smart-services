mainApp.directive("loader", function ($rootScope) {
    return function ($scope, element, attrs) {
        $scope.$on("loader_show", function () {
            return $scope.showLoader = true;
        });
        return $scope.$on("loader_hide", function () {
            return $scope.showLoader = false;
        });
        return $scope.$on($rootScope.isLoading, function () {
            return $scope.showLoader = $rootScope.isLoading;
        });
    };
});