mainApp.factory('googleAnalyticsService', ['$http', '$q', 'apiHelperService', function ($http, $q, apiHelperService) {
    return {

        getTotalVisitors: function (successCallback, errorCallback) {




            var options = {
                success: successCallback,
                error: errorCallback,
                showSpinner: false
            };

            return apiHelperService.get('googleAnalytics/totalVisitors', options);

        }
    }
}]);
