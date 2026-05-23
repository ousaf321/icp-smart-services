/*
 module.run(function($http) {
 $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w'
 });
 * */

// register the interceptor as a service
// helps pass creds to api
// helps kickout unauthorized users
// helps handle global errors
mainApp.factory('httpInterceptor', function ($q, $rootScope, $location, languageService, $timeout) {
    return {
        // optional method
        'request': function (config) {

            if (config.url.indexOf('/api/') >= 0 || config.url.indexOf('esb') >= 0) {
                var user = localStorage.getItem('user');
                if (user) {
                    user = JSON.parse(user);
                    config.headers.refreshToken = user.refreshToken;
                    config.headers.userToken = user.userToken;
                }
                if (config.headers == null || (config.headers.languageId == undefined || config.headers.languageId <= 0)) {

                    config.headers.languageId = languageService.getCurrentID();
                }

                let  ip = localStorage.getItem('ip');

                if (ip) {
                    config.headers.comingFrom = ip;
                }

            }
            return config || $q.when(config);
        },
        'response': function (response) {
            //var refreshToken = response.headers('refreshToken');
            //if (refreshToken != undefined) {
            //    var user = JSON.parse(localStorage.user);
            //    if (user) {

            //        user.refreshToken = refreshToken;
            //        localStorage.removeItem('user');
            //        localStorage.setItem('user', JSON.stringify(user));

            //        $rootScope.showExtendTimePopup = false;
            //        if ($rootScope.activeTimeOut) {
            //            $timeout.cancel($rootScope.activeTimeOut);
            //        }
            //        $rootScope.activeTimeOut = $timeout(function () {
            //            $rootScope.showExtendTimePopup = true;
            //            $rootScope.noResponseOnExtendTime = false;
            //            $rootScope.activeTimeOut = $timeout(function () {
            //                $rootScope.noResponseOnExtendTime = true;

            //            }, (((user.timeout - user.askToExtendAfter) * 60) * 1000));

            //        }, ((user.askToExtendAfter * 60) * 1000));

            //    }
            //    else {
            //        try { // for IE
            //            localStorage.removeItem('user');
            //        }
            //        catch (e) {
            //        }
            //    }


            //}

            // do something on success
            return response || $q.when(response);
        },
        'responseError': function (e) {
            if (e.config.url.indexOf('refreshTokenNew') > -1) {
                $rootScope.isRefreshingToken = false;
                localStorage.setItem('backLastURL', window.location.href);

                if (localStorage && localStorage.applicationId == lookups.application.etihad) {
                    window.location.replace(window.config.etihadLoginUrl);
                }
                else if (localStorage.getItem("secondaryLogin") == 'true') {
                    localStorage.removeItem("secondaryLogin");
                    window.location.replace(window.config.secondaryLoginUrl)
                } 
                else {
                    window.location.replace(window.config.loginUrl);
                }
                if (localStorage.user != undefined) {
                    localStorage.removeItem('user');
                }

                return $q.reject(e);
            }

            if (e && e.status == 403) {
                var subscribeURL = e.headers('subscribeURL');
                var deploymentUrl = e.headers ? e.headers('systemDeploymentUrl') : undefined;
                var changePasswordUrl = e.headers ? e.headers('changePasswordUrl') : undefined;
                var lastRenewRequestNumber = e.headers ? e.headers('lastRenewRequestNumber') : undefined;

                if (subscribeURL) {
                    if (lastRenewRequestNumber) {
                        window.location.replace(subscribeURL + '&refRequestNumber=' + lastRenewRequestNumber);
                        return $q.reject(e);
                    }

                    window.location.replace(subscribeURL);
                    return $q.reject(e);
                } else if (deploymentUrl) {
                    if (window.location.href.indexOf("etihad/") > -1 ||
                        window.location.href.indexOf("mofa/") > -1) {
                        window.location.replace(window.location.pathname + "#/deployment");
                    } else {
                        window.location.replace(deploymentUrl); //window.location.replace(window.location.pathname + "#/deployment");
                    }
                    return $q.reject(e);
                }
                else if (changePasswordUrl) {
                    if (!window.location.hash.includes('changePassword'))
                        window.location.hash = changePasswordUrl;

                    return $q.reject(e);
                }
                else {
                    $rootScope.isRefreshingToken = false;
                    localStorage.setItem('backLastURL', window.location.href);

                    if (localStorage && localStorage.applicationId == lookups.application.etihad) {
                        window.location.replace(window.config.etihadLoginUrl);
                    } else if (localStorage && localStorage.secondaryLogin == 'true') {
                        window.location.replace(window.config.secondaryLoginUrl)
                    }
                    else {
                        window.location.replace(window.config.loginUrl);
                    }
                    if (localStorage.user != undefined) {
                        localStorage.removeItem('user');
                    }

                    return $q.reject(e);
                }
            }

            console.error(e);
            if (e.config.bypassInterceptorForStatus == e.status) {
                // will be handled locally
                return $q.reject(e);
            }

            if (e && (e.status == 401)) {
                return $q.reject(e);
            }
            else {
                // http://michalostruszka.pl/blog/2013/09/06/selective_http_errors_handling_in_angularjs/
                if (e.responseJSON && e.responseJSON.code)
                    e.code = e.responseJSON.code;
                else
                    e.code = e.status;

                if (e.responseJSON && e.responseJSON.message) {
                    // $rootScope.$broadcast('apiError', e.responseJSON);
                    e.message = e.responseJSON.message;
                }
                else {
                    // broadcast indicating message is missing
                    // $rootScope.$broadcast('apiError', { code: e.code, message: 'ERR_NO_MSG' });
                    e.message = e.responseText;
                }
            }
            //  if (console.error) console.error(e);

            return $q.reject(e);
        }
    };
});

mainApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
}]);
