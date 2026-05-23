mainApp.service('authManager',
    ['$http', 'apiHelperService', 'languageService', 'notificationsService', '$translate', '$cookies',
        function ($http, apiHelperService, languageService, notificationsService, $translate, $cookies) {
            var authManager = {
                _currentUser: null,
                attemptAutoLogin: function () {
                    var user = this.getCurrentUser();
                    if (user)
                        this._loggedIn(user);
                    return user;
                },
                getCurrentUser: function () {
                    if (this._currentUser)
                        return this._currentUser;
                    else if (localStorage.user) {
                        var user;
                        try {
                            user = JSON.parse(localStorage.user);
                            //this._loggedIn(user);
                        }
                        catch (e) {
                            this.setCurrentUser(null);
                        }
                        if (user && user.userToken)
                            return user;
                        else {
                            try { // for IE
                                localStorage.removeItem('user');
                            }
                            catch (e) {
                            }
                            return null;
                        }
                    }
                    else
                        return null;
                },

                getEstablishmentId: function () {
                    return localStorage.getItem('establishmentId');
                },
                getUserAdminRegionId: function () {
                    return localStorage.getItem('adminRegionId');
                },
                successLogin: function (user) {
                    if (Boolean(localStorage.getItem('rememberMe')) == true) {
                        var now = new Date(),
                            // this will set the expiration to 12 months
                            exp = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
                        let _usr = JSON.stringify({ userName: localStorage.getItem('userName'), password: localStorage.getItem('password') });
                        $cookies.put('rememberMeData', _usr, {
                            expires: exp
                        });

                        localStorage.setItem('rememberMe', null);
                        localStorage.setItem('userName', null);
                        localStorage.setItem('password', null);

                    }

                    if (user.userClaims) {
                        var establishmentClaim = user.userClaims.filter(function (c) {
                            return c.key == 'EstablishmentId';
                        });

                        if (establishmentClaim && establishmentClaim.length > 0) {
                            if (establishmentClaim[0].values && establishmentClaim[0].values.length > 0) {
                                localStorage.setItem('establishmentId', establishmentClaim[0].values[0]);
                            }
                        }
                    }


                    if (user && user.isUsingBetaVersion) {
                        //this to redirect users to beta version based on DB setup
                        window.location.assign(user.defaultUrl);
                    }
                    else {
                        authManager._currentUser = user;
                        if (user) {
                            try {
                                if (window.location.pathname.indexOf('mofa') > -1 && user.applicationId != lookups.application.mofa && user.applicationId != lookups.application.mofaProtocol) {
                                    localStorage.removeItem('user');
                                    var options = { type: "error", isSticky: true, messageKey: $translate.instant("invalidUsernameOrPassword"), titleKey: '', localizationControllers: ['notification', 'request'] };
                                    notificationsService.showNotification(options);
                                    return;
                                }
                                else {
                                    if (user.applicationId == 4) {
                                        localStorage.setItem('adminUser', JSON.stringify(user));
                                    } else {
                                        localStorage.setItem('user', JSON.stringify(user));
                                    }

                                    if (localStorage.getItem('cacheVersion') == null) {
                                        localStorage.setItem('cacheVersion', user.cacheVersion);
                                    } else
                                        if (localStorage.getItem('cacheVersion') != user.cacheVersion) {
                                            localStorage.setItem('cacheVersion', user.cacheVersion)
                                        }

                                    if (user.preferedLanguageId != undefined && user.preferedLanguageId != null) {
                                        var preferedLangText = user.preferedLanguageId == 1 ? "ar" : "en";
                                        if (languageService.getCurrent() != preferedLangText) {
                                            let version = localStorage.cacheVersion;
                                            version = version + 1;
                                            localStorage.setItem('cacheVersion', version)
                                        }
                                        languageService.setCurrent(user.preferedLanguageId);
                                    }


                                }
                            } catch (e) {
                            }// IE sucks
                        }
                        else {
                            try { // for IE
                                localStorage.removeItem('user');
                            }
                            catch (e) {
                            }
                        }
                        if (user && localStorage.getItem('serviceQrToken') && localStorage.getItem('serviceQrToken') != "null" && localStorage.getItem('serviceQrToken') != "undefined") {

                            let _split = window.config.loginUrl.split("#");//split by hash (SPA standered)
                            let qrToken = localStorage.getItem('serviceQrToken');

                            let url = `${_split[0]}#/serviceQrCodeHandler?token=${qrToken}`;//concat URL with Token
                            localStorage.setItem('serviceQrToken', null);//clear token

                            window.location.assign(url);
                            return;
                        }

                        // check if user ica management has to fill missing info
                        if (authManager.getCurrentUser() && authManager.getCurrentUser().applicationId == lookups.application.TypingCenter && !authManager.getCurrentUser().isImpersonateLogin && authManager.getCurrentUser().accountTypeId == 8) {
                            if (authManager.userHasCustomPermission(['ESTAB_ADMIN_USER'])) {
                                authManager.getEstabInfo(user);
                            }
                            else {
                                authManager.redirectLogin(user);
                            }
                        }
                        else {
                            authManager.redirectLogin(user);
                        }

                    }
                },

                redirectLogin: function (user) {
                    var lastUrl = localStorage.getItem('backLastURL');

                    if (lastUrl && lastUrl.indexOf(window.config.loginPage) == -1 && lastUrl.indexOf("outRedirect") != -1) {
                        localStorage.getItem('backLastURL');
                        window.location.assign(lastUrl);
                    } else if (user && user.defaultUrl && user.defaultUrl.indexOf("etihad") != -1) {
                        user.defaultUrl = user.defaultUrl.replace('etihad/', '');
                        window.location.assign(user.defaultUrl);

                    } else {

                        if (user.itShouldRedirectToNewEchannels == true) {

                            window.location.assign(user.defaultUrl + "?ut=" + user.userToken);
                        }
                        else {

                            if (user.applicationId == 4) {
                                localStorage.setItem('isFromClientPortal', 1);
                                let currentUrl = window.location.href
                                let basePath = currentUrl.substring(0, currentUrl.indexOf("client"));
                                let newUrl = basePath + "clients/" + user.defaultUrl
                                window.location.replace(newUrl);
                            } else {
                                window.location.assign(user.defaultUrl);//get the url from the user object
                                sessionStorage.setItem('loginFromClientPortal', true);
                            }
                        }
                    }
                },

                getExternalUsers: function (user) {
                    var options = {
                        success: function (response) {
                            var externalUsers = response;

                            if (externalUsers.length > 0) {
                                // check if the logged in user is the main user for the typing center :: if yes then check if the ICA typing centre standard info are exist
                                authManager.getUserProfile(user);
                            }
                            else {
                                authManager.redirectLogin(user);
                            }
                        },
                        showSpinner: true,
                    };

                    apiHelperService.get('user/getEstablishmentExternalUsers', options);
                },

                getEstabInfo: function (user) {
                    var options = {
                        success: function (response) {
                            if (!response) {
                                window.location.assign('typingcenter/index.html#/icaTypingCentreInfo');
                            }
                            else {
                                authManager.redirectLogin(user);
                            }
                        },
                        showSpinner: true
                    };
                    apiHelperService.get('establishment/CheckTypingCenterUpdatedInfo', options);
                },

                getUserProfile: function (user) {

                    var options = {
                        success: function (response) {
                            if (response && (!response.identityNumber || !response.currentNationalityID)) { // || response.isSponsoredByTheTypingCenterFlag == undefined
                                window.location.assign('typingcenter/index.html#/icaSubUserProfileInfo');
                            }
                            else {
                                authManager.redirectLogin(user);
                            }
                        },
                        showSpinner: true
                    };

                    // update typing center sub user details :: without set the (isSponsoredByTheTypingCenterFlag)
                    apiHelperService.get('userProfile/current', options);
                },

                setCurrentUser: function (user) {
                    authManager._currentUser = user;
                    if (user) {
                        try {
                            localStorage.setItem('user', JSON.stringify(user));
                        } catch (e) {
                        }// IE sucks
                    }
                    else {
                        try { // for IE
                            localStorage.removeItem('user');
                        }
                        catch (e) {
                        }
                    }
                },

                isUserLoggedIn: function () {
                    return (localStorage.user != null);
                },

                _login: function (loginApi, user, errorCallback) {
                    user;
                    var t = this;
                    var options = {
                        success: t.successLogin,
                        error: function (err) {
                            if (errorCallback)
                                errorCallback(err);
                        }
                    };
                    return apiHelperService.post(loginApi, user, options);
                },

                logout: function () {
                    if (this.getCurrentUser() != null) {
                        //logout user from server
                        if (localStorage.smartpasssso == "true") {
                            sessionStorage.clear();//to clear new layout for users
                            authManager.setCurrentUser(null);

                            var CurrentLanguage = languageService.getCurrent();
                            localStorage.removeItem('user');
                            //clear show related establishment popup from localStorage
                            localStorage.removeItem('relatedEstablishment');
                            languageService.setCurrent(CurrentLanguage);
                            authManager.smartPasslogoutHandler();
                        } else if (localStorage.uaepassuser == "true" || authManager.isUAEPASSLogin()) {
                            authManager.setCurrentUser(null);
                            var CurrentLanguage = languageService.getCurrent();
                            localStorage.removeItem('user');
                            //clear show related establishment popup from localStorage
                            localStorage.removeItem('relatedEstablishment');
                            languageService.setCurrent(CurrentLanguage);
                            localStorage.removeItem('uaepassuser');
                            window.location.replace(window.config.uaePassLogoutURL);
                        }
                        else {
                            var options = {
                                success: function (response) {
                                    authManager.setCurrentUser(null);
                                    // this code is to keep user language after logout

                                    var CurrentLanguage = languageService.getCurrent();

                                    if (localStorage.fastActionId) {
                                        localStorage.removeItem("fastActionId");
                                    }

                                    if (localStorage.requiredActionFlag) {
                                        localStorage.removeItem("requiredActionFlag");
                                    }

                                    //clear logged user from localStorage
                                    localStorage.removeItem('user');

                                    //clear show related establishment popup from localStorage
                                    localStorage.removeItem('relatedEstablishment');

                                    languageService.setCurrent(CurrentLanguage);

                                    //Check if the user loggedIn through SmartPass or Normal Login
                                    //For The Smart Pass must use Global Logout

                                    if (localStorage.smartpasssso == "true") {
                                        authManager.smartPasslogoutHandler();
                                    } else {
                                        authManager.logoutHandler();
                                    }

                                    localStorage.removeItem('typingCenterDelegationId');
                                    localStorage.removeItem('serviceTransactionURL');
                                    localStorage.removeItem('serviceDelegation')
                                },
                                error: function (error) {
                                    authManager.setCurrentUser(null);
                                    var CurrentLanguage = languageService.getCurrent();
                                    localStorage.removeItem('user');
                                    //clear show related establishment popup from localStorage
                                    localStorage.removeItem('relatedEstablishment');
                                    languageService.setCurrent(CurrentLanguage);

                                    //Check if the user loggedIn through SmartPass or Normal Login
                                    //For The Smart Pass must use Global Logout

                                    if (localStorage.smartpasssso == "true") {
                                        authManager.smartPasslogoutHandler();
                                    } else {
                                        authManager.logoutHandler();
                                    }

                                    if (localStorage.fastActionId) {
                                        localStorage.removeItem("fastActionId");
                                    }

                                    if (localStorage.requiredActionFlag) {
                                        localStorage.removeItem("requiredActionFlag");
                                    }
                                }
                            };
                            apiHelperService.get('user/logout', options);


                        }
                    }

                },

                logoutHandler: function () {

                    // This Only for Global Logout (Smart Pass Logout)
                    if (localStorage.applicationId == lookups.application.etihad) {
                        window.location.replace(window.config.etihadLoginUrl);
                    } else if (localStorage.CURRENT_PORTAL == "TAMM") {
                        window.location.replace(window.config.tammLoginUrl);
                    } else if (localStorage.CURRENT_PORTAL == "GOLDEN_RESIDENCY") {
                        window.location.replace(window.config.goldenResidencyLoginUrl);
                    } else if (localStorage.getItem("secondaryLogin") == 'true') {
                        window.location.replace(window.config.secondaryLoginUrl)
                    }
                    else {
                        window.location.replace(window.config.loginUrl);
                    }
                    //window.location.hash = '/login';
                },

                smartPasslogoutHandler: function () {
                    // This Only for Global Logout (Smart Pass Logout)
                    var smartPassGlobalLogout = localStorage.smartpassslo;
                    localStorage.removeItem('smartPassstatus');
                    localStorage.removeItem('smartpassslo');
                    localStorage.removeItem('smartpasssso');
                    localStorage.removeItem('smartPasssErroCode');
                    window.location.replace(smartPassGlobalLogout);
                },

                logoutWithoutRedirect: function () {
                    if (this.getCurrentUser() != null) {
                        //logout user from server
                        var options = {
                            success: function (response) {
                                authManager.setCurrentUser(null);
                                // this code is to keep user language after logout
                                var CurrentLanguage = languageService.getCurrent();
                                //clear logged user from localStorage
                                localStorage.removeItem('user');
                                //clear show related establishment popup from localStorage
                                localStorage.removeItem('relatedEstablishment');
                                languageService.setCurrent(CurrentLanguage);
                            },
                            error: function (error) {
                                authManager.setCurrentUser(null);
                                var CurrentLanguage = languageService.getCurrent();
                                localStorage.removeItem('user');
                                //clear show related establishment popup from localStorage
                                localStorage.removeItem('relatedEstablishment');
                                languageService.setCurrent(CurrentLanguage);
                            }
                        };
                        apiHelperService.get('user/logout', options);
                    }
                },

                //resetPassword: function (UserTokenname, callback) {
                //},

                login: function (user, errorCallback) {

                    if (window.config.EnableTrack) {
                        var options = {
                            success: (response) => {
                                console.log(response);
                                localStorage.setItem("ip", response["ip"]);
                                return this._login('user/login', user, errorCallback);
                            }
                        }
                        apiHelperService.get(`${window.config.TrackUrl}/Tracker/get/xforwarded`, options, true);
                    }
                    else {

                        return this._login('user/login', user, errorCallback);
                    }
                },

                loginFromNewEchannels: function (user, errorCallback) {

                    return this._login('user/loginFromNewEchannels', user, errorCallback);
                },

                forgotPassword: function (changePasswordDto, successCallBack, errorCallback) {
                    var options = {
                        success: successCallBack,
                        error: errorCallback
                    };
                    return apiHelperService.post('user/forgotPassword', changePasswordDto, options);
                },

                changePassword: function (oldPassword, newPassword, successCallBack, errorCallback) {

                    var options = {
                        success: function (result) {

                            //update access token and refresh token
                            if (authManager.getCurrentUser()) {
                                var user = authManager.getCurrentUser();

                                var options = {
                                    success: function (response) {
                                        var user = authManager.getCurrentUser();
                                        if (user != null) {


                                            user.userToken = response.userToken;
                                            user.refreshToken = response.refreshToken;

                                            authManager.setCurrentUser(user);

                                            if (successCallBack)
                                                successCallBack(result);
                                        }
                                    },
                                    error: errorCallback
                                };

                                apiHelperService.post('user/login', { userName: user.userName, password: newPassword }, options);

                            }

                        },
                        error: errorCallback
                    };

                    var changePassObj = { oldPassword: oldPassword, newPassword: newPassword };
                    return apiHelperService.post('user/changePassword', changePassObj, options);
                },

                changeUserName: function (oldPassword, newUserName, recaptchaResponse, successCallBack, errorCallback) {
                    if (authManager.getCurrentUser()) {
                        //var user = authManager.getCurrentUser();
                        var options = {
                            success: function (response) {
                                if (successCallBack)
                                    successCallBack(response);
                            },
                        }
                        error: errorCallback
                    };

                    apiHelperService.post('user/IndividualChangeUsername', { userName: newUserName, password: oldPassword, recaptchaResponse: recaptchaResponse }, options)
                },

                resetPassword: function (userToken, password, successCallBack, errorCallback) {
                    var options = {
                        success: successCallBack,
                        error: errorCallback
                    };
                    return apiHelperService.post('user/resetPassword/' + userToken, password, options);
                },

                loginApi: null,

                userHasPermissionForView: function (view) {
                    if (!this.isUserLoggedIn()) {
                        return false;
                    }

                    if (!view.permissions || !view.permissions.length) {
                        view.permissions = [view.name];
                    }

                    return this.userHasPermission(view.permissions);
                },

                userHasPermission: function (permissions) {
                    if (!this.isUserLoggedIn()) {
                        return false;
                    }

                    var found = false;
                    angular.forEach(permissions, function (permission, index) {
                        var currentUser = JSON.parse(localStorage.user);
                        if (currentUser && currentUser.userClaims) {
                            for (var i = 0; i < currentUser.userClaims.length; i++) {
                                var userClaim = currentUser.userClaims[i];
                                if (userClaim.key == "permission") {
                                    if (userClaim.values.indexOf(permission) >= 0) {
                                        found = true;
                                        return;
                                    }
                                    break;
                                }
                            }
                        }

                    });

                    return found;
                },

                checkPermissionForView: function (view) {
                    if (!view.requiresAuthentication) {
                        return true;
                    }
                    return this.userHasPermissionForView(view);
                },

                forgotUserName: function (changeUserDto, successCallBack, errorCallback) {
                    var options = {
                        success: function (response) {
                            if (successCallBack)
                                successCallBack(response);
                        },
                        error: errorCallback

                    };
                    return apiHelperService.post('user/forgotUserName', changeUserDto, options);
                },

                userHasSinglePermission: function (resource) {
                    if (!this.isUserLoggedIn()) {
                        return false;
                    }

                    var found = false;

                    var currentUser = JSON.parse(localStorage.user);
                    if (currentUser && currentUser.userClaims) {
                        for (var i = 0; i < currentUser.userClaims.length; i++) {
                            var userClaim = currentUser.userClaims[i];
                            if (userClaim.key == "permission") {
                                if (userClaim.values.indexOf(resource) >= 0) {
                                    found = true;
                                    break;
                                }
                                break;
                            }
                        }
                    }
                    return found;
                },
                userHasCustomPermission: function (permissions) {
                    if (!this.isUserLoggedIn()) {
                        return false;
                    }

                    var found = false;
                    angular.forEach(permissions, function (permission, index) {
                        var currentUser = JSON.parse(localStorage.user);
                        if (currentUser && currentUser.userClaims) {
                            for (var i = 0; i < currentUser.userClaims.length; i++) {
                                var userClaim = currentUser.userClaims[i];
                                if (userClaim.key == "CUSTOM_PERMISSION") {
                                    if (userClaim.values.indexOf(permission) >= 0) {
                                        found = true;
                                        return;
                                    }
                                    break;
                                }
                            }
                        }

                    });

                    return found;
                },
                successServicesDelegationLogin: function (result, hideVisitorFlightInfo) {
                    var user = result.userLoginInfo;
                    if (Boolean(localStorage.getItem('rememberMe')) == true) {
                        var now = new Date(),
                            // this will set the expiration to 12 months
                            exp = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
                        let _usr = JSON.stringify({ userName: localStorage.getItem('userName'), password: localStorage.getItem('password') });
                        $cookies.put('rememberMeData', _usr, {
                            expires: exp
                        });

                        localStorage.setItem('rememberMe', null);
                        localStorage.setItem('userName', null);
                        localStorage.setItem('password', null);

                    }

                    if (user) {
                        try {
                            localStorage.setItem('typingCenterDelegationId', result.typingCenterDelegationId);
                            localStorage.setItem('serviceTransactionURL', result.serviceTransactionURL.split('step1')[0]);
                            localStorage.setItem('user', JSON.stringify(user));

                            if (user.preferedLanguageId != undefined && user.preferedLanguageId != null) {
                                var preferedLangText = user.preferedLanguageId == 1 ? "ar" : "en";
                                if (languageService.getCurrent() != preferedLangText) {
                                    let version = localStorage.cacheVersion;
                                    version = version + 1;
                                    localStorage.setItem('cacheVersion', version)
                                }
                                languageService.setCurrent(user.preferedLanguageId);
                            }

                            authManager.redirectServicesDelegationLogin(result);
                        }
                        catch (e) {
                        }


                    } else {
                        try { // for IE
                            localStorage.removeItem('user');
                        }
                        catch (e) {
                        }
                    }

                },
                redirectServicesDelegationLogin: function (result) {

                    var user = result.userLoginInfo;
                    var transactionId = result.serviceTransactionId
                    var currentUrl = window.location.href;

                    var serviceTransactionURL = result.serviceTransactionURL


                    var dict = [];

                    if (result.beneficiaryPersonalInformation?.unifiedNumber) {
                        dict.push({
                            key: "personUN", value: result.beneficiaryPersonalInformation?.unifiedNumber
                        });
                    }
                    if (result.beneficiaryPersonalInformation?.fileSequence) {
                        dict.push({
                            key: "wifeFamilySequence", value: result.beneficiaryPersonalInformation?.fileSequence
                        });
                    }
                    if (result.beneficiaryPersonalInformation?.fileDepartmentCode) {
                        dict.push({
                            key: "wifeCityCode", value: result.beneficiaryPersonalInformation?.fileDepartmentCode
                        });
                    }
                    if (result.beneficiaryPersonalInformation?.familyRelationshipId) {
                        dict.push({
                            key: "familyRelationship", value: result.beneficiaryPersonalInformation?.familyRelationshipId
                        });
                    }

                    if (result.applicantPersonalInformation?.adminRegionId) {
                        dict.push({
                            key: "administrativeRegionId", value: result.applicantPersonalInformation?.adminRegionId
                        });
                    }
                    if (result.applicantPersonalInformation?.defaultImmigrationDepartmentId) {
                        dict.push({
                            key: "immigrationDepartmentId", value: result.applicantPersonalInformation?.defaultImmigrationDepartmentId
                        });
                    }
                    if (result.beneficiaryPersonalInformation?.identityNumber) {
                        dict.push({
                            key: "identityNumber", value: result.beneficiaryPersonalInformation?.identityNumber
                        });
                    }
                    if (result.beneficiaryPersonalInformation?.unifiedNumber) {
                        dict.push({
                            key: "unifiedNumber", value: result.beneficiaryPersonalInformation?.unifiedNumber
                        });
                    }



                    var redirectUrl = `${currentUrl.split('typingcenter')[0]}individual/index.html#${serviceTransactionURL}?withException=false`;


                    angular.forEach(dict, function (dict, index) {
                        redirectUrl = redirectUrl + '&' + dict.key + '=' + dict.value;
                    });

                    window.location.assign(redirectUrl)
                },
                refreshToken: function (refreshToken, applicationId, callBack) {

                    var options = {
                        success: function (response) {
                            var localStorageKey = 'user';
                            localStorage.setItem(localStorageKey, JSON.stringify(response));
                            if (callBack) {
                                callBack(response);
                            }
                        }
                    };
                    return apiHelperService.post('user/refreshTokenNew', { refreshToken: refreshToken, applicationId: applicationId }, options);
                },
                isEstablishmentMainUser: function () {
                    if (this.getCurrentUser()) {
                        //this function to check if the loged in user is main establishment user
                        if (this.getCurrentUser().userClaims && this.getCurrentUser().userClaims.find(x => x.key == 'IsEstablishmentMainUser')?.values[0] == "True") {
                            return true;
                        }
                        else
                            return false;
                    } else {
                        return false;
                    }

                },
                isUAEPASSLogin: function () {
                    if (this.getCurrentUser()) {
                        //this function to check if the loged in user is main establishment user
                        if (this.getCurrentUser().userClaims && this.getCurrentUser().userClaims.find(x => x.key == 'IsUAEPASSLogin')?.values[0] == "True") {
                            return true;
                        }
                        else
                            return false;
                    }
                    else {
                        return false;
                    }
                }
                ,
                isSecondaryLogin: function () {
                    if (this.getCurrentUser()) {
                        //this function to check if the loged in user is main establishment user
                        if (this.getCurrentUser().userClaims && this.getCurrentUser().userClaims.find(x => x.key == 'IsSecondaryLogin')?.values[0] == "true") {
                            return true;
                        }
                        else
                            return false;
                    }
                    else {
                        return false;
                    }
                },
                isEstablishmentRelatedPerson: function () {
                    if (this.getCurrentUser()) {
                        if (this.getCurrentUser().userClaims && this.getCurrentUser().userClaims.find(x => x.key == 'IsEstablishmentRelatedPerson')?.values[0] == "True") {
                            return true;
                        }
                        else
                            return false;
                    } else {
                        return false;
                    }

                }
            };

            return authManager;

        }]);