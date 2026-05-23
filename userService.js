mainApp.factory('userService', ['$http', '$q', 'apiHelperService', function ($http, $q, apiHelperService) {
    return {
        login: function (user, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback
            };
            return apiHelperService.post('user/login', user, options);
        },

        activateUser: function (user, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback
            };
            return apiHelperService.get('user/activate?userGuid=' + user, options);
        },

        registerGCC: function (data, registrationToken, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback
            };
            return apiHelperService.post('user/individual/gcc/register/' + registrationToken, data, options);
        },

        registerResident: function (data, registrationToken, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback
            };
            return apiHelperService.post('user/individual/resident/register/' + registrationToken, data, options);
        },

        registerVisaHolder: function (data, registrationToken, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback
            };
            return apiHelperService.post('user/visaHolder/register/' + registrationToken, data, options);
        },

        registerEstablishment: function (data, isTypingCenter, registrationToken, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback
            };
            if (isTypingCenter)
                options.params = { isTypingCenter: true }
            return apiHelperService.post('user/establishment/register/' + registrationToken, data, options);
        },

       

        verifyUserForRegistration: function (registrationType, requests, successCallback, errorCallback ) {
            
            var options = {
                success: successCallback,
                error: errorCallback
            };
            return apiHelperService.post('user/registration/type/' + registrationType + '/email/verification', requests, options);
        },

        loadRegistrationDetails: function (token, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback
            };
            return apiHelperService.get('user/registration/' + token + '/details', options);
        },

        loadRegistrationDetailsForChangeUser: function (token, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback
            };
            return apiHelperService.get('user/registrationForChangeUser/' + token + '/details', options);
        },

        changeUsername: function (registrationType, email, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback
            };
            return apiHelperService.post('user/username/' + registrationType + '/email', email, options);
        }
    }
}]);