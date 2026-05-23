mainApp.directive('usernameAvailable', function ($timeout, $q, apiHelperService) {
    return {
        restrict: 'AE',
        require: 'ngModel',
        link: function (scope, elm, attr, model) {
            model.$asyncValidators.usernameExists = function () {

                return apiHelperService.get('user/username/' + elm.val() + '/isExist').then(function (res) {

                    $timeout(function () {
                        model.$setValidity('usernameExists', !!res.data);
                    }, 1000);
                });


                //var defer = $q.defer();
                //$timeout(function () {
                //    model.$setValidity('usernameExists', false);
                //    defer.resolve;
                //}, 1000);
                //return defer.promise;
            };
        }
    }
});