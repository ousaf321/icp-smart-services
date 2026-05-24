angular.module('mainApp').controller("dialogCtrl", ['$scope', '$dialog', '$rootScope', '$interval', function ($scope, $dialog, $rootScope, $interval) {
   // $rootScope.CurrentController(['confirmDialogsCtrl']);
    $scope.options = $dialog.options.data.options;

    $scope.confirmLabel = $dialog.options.data.options?.confirmLabel;
    $scope.cancelLabel = $dialog.options.data.options?.cancelLabel;

    $scope.options = $dialog.options.data.options;
    $scope.individualInfo = $dialog.options.data.options.info;
    $scope.confirm = function (reasonTxt) {
        if (reasonTxt) {
            $scope.options.reasonTxt = reasonTxt;
        }
        $dialog.close($scope.options);
    };

    $scope.closeDialog = function () {
        $scope.showPopup = true;
        $dialog.close(false);
    };
    if ($scope.options.showTimer) {
        $scope.showSendAfter = true;
        $scope.startTime = 60;
        $scope.timer = $interval(function () {
            if ($scope.startTime == 0) {
                $interval.cancel($scope.timer);
                $scope.showSendAfter = false;
            }
            $scope.startTime = (getTimeLeft($scope.startTime));
        }, 1000);
    }
    function getTimeLeft(timeout) {
        if (timeout == 0) {
            return 0;
        }
        return (timeout - 1);
    }
}]);

