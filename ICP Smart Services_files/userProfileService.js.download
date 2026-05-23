mainApp.factory('userProfileService', ['$http', '$q', 'apiHelperService', function ($http, $q, apiHelperService) {
    return {

        getCurrent: function (successCallback, errorCallback) {




            var options = {
                success: successCallback,
                error: errorCallback
            };

            return apiHelperService.get('userProfile/current', options);

        },
        update: function (userProfile, successCallback, errorCallback) {

            var options = {
                success: successCallback,
                error: errorCallback
            };

            return apiHelperService.post('userProfile/update', userProfile, options);
        },
        syncUserFullNameWithUDB: function (successCallback, errorCallback) {
            
            var options = {
                success: successCallback,
                failure: errorCallback
            };

            return apiHelperService.get('userProfile/syncUserFullNameWithUDB',options);
        }
    }
}]);
