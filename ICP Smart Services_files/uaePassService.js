

mainApp.factory('uaePassService', [function () {
    var data = null;
    var uaePassUserProfileData = null;
    var errorCode = null;
    var uaePassService = {
        setUaePassUserWithRelatedEstabsData: function (d) {
            data = d;
        },
        getUaePassUserWithRelatedEstabsData: function () {
            return data;
        },
        setUaePassUserProfileData: function (d) {
            uaePassUserProfileData = d;
        },
        getUaePassUserProfileData: function () {
            return uaePassUserProfileData;
        },
        setErrorCode: function (d) {
            errorCode = d;
        },
        getErrorCode: function () {
            return errorCode;
        }
    };

    return uaePassService;
}]);
