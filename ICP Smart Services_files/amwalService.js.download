
mainApp.factory('amwalService', ['$http', '$q', 'apiHelperService', 'authManager', function ($http, $q, apiHelperService, authManager) {
    return {

        loadBankAccounts: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                failure: errorCallback
            };

            return apiHelperService.get('payment/bankAccounts', options);

        },
         loadBankAccountsForDigitalAuthentication: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                failure: errorCallback
            };

            return apiHelperService.get('payment/bank-Accounts-digital-authentication', options);

        },
        hasAmwalAccount: function (successCallback, errorCallback) {
            return authManager.getCurrentUser().hasAmwalAccount;
        },
        eligibleForAmwalWalletPayment: function (successCallback, errorCallback) {
            return authManager.getCurrentUser().eligibleForAmwalWalletPayment;
        },
        eligibleForTokenizationPayment: function (successCallback, errorCallback) {

            var options = {
                success: successCallback,
                failure: errorCallback
            };

            return apiHelperService.get('payment/eligibleForTokenizationPayment', options);
        },
        archivedCardInquiry: function (successCallback, errorCallback) {

            var options = {
                success: successCallback,
                failure: errorCallback
            };

            return apiHelperService.get('payment/ArchivedCardInquiry', options);
        },
    }
}]);