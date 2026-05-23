mainApp.service('apiHelperService', ['$rootScope', '$http', '$httpParamSerializer', '$q', '$state', 'notificationsService', 'languageService',
    function ($rootScope, $http, $httpParamSerializer, $q, $state, notificationsService, languageService) {
        var ongoingActionsCount = 0;
        var ongoingActionsWithSpinnerCount = 0;
        var isLoading = false;
        var nextActionId = 1;
        var actionOngoing = false;
        var ongoingActions = [];
        var loadingsNumber = 0;
        var baseApiUrl = window.config.apiHostUrl;
        window.apiHelper = {};
        window.apiHelper.modelIsValid = true;
        window.apiHelper.modelErrors = [];
        var queuedCalls = [];
        var defaultOptions = {
            success: function () { },
            error: function (result) {
                handleFailure(uiActionId, result, error);
            },
            always: function (uiActionId, sSpinner) {
                ongoingActionsCount -= 1;

                if (sSpinner == true || (sSpinner == undefined && defaultOptions.showSpinner == true)) {
                    ongoingActionsWithSpinnerCount -= 1;
                }

                var index = ongoingActions.indexOf(uiActionId);
                ongoingActions.splice(index, 1);

                if (ongoingActionsCount === 0) {
                    isLoading = false;
                    actionOngoing = false;
                }

                if (ongoingActionsWithSpinnerCount <= 0) {
                    $rootScope.$broadcast("loader_hide");
                }
            },
            showSpinner: true,
            actionId: 0,
            AdvanceOptions: {},
            params: {}
        };

        this.modelIsValid = true;
        this.modelErrors = [];

        this.get = get;

        this.getWithType = getWithType;

        this.post = post;

        this.postWithHeaderKey = postWithHeaderKey;

        this.postFormDataWithModel = postFormDataWithModel;

        this.postFormData = postFormData;

        function handlePreOperationLogic(options) {
            if (!options)
                return true;

            ongoingActions.push(options.uiActionId);
            actionOngoing = true;
            modelIsValid = true;
            modelErrors = [];
            isLoading = true;
            ongoingActionsCount += 1;
            if (options.showSpinner == true || (options.showSpinner == undefined && defaultOptions.showSpinner == true)) {

                $rootScope.$broadcast("loader_show");
                ongoingActionsWithSpinnerCount += 1;
            }
        };

        function handleSuccess(uiActionId, result, options) {
            if (!options) {
                return;
            }
            if (result != null) {
                result.uiActionId = uiActionId;
            }
            if (options.success) {
                options.success(result);
            }
            else { defaultOptions.success(result); }
            handleAlways(uiActionId, options);
        };

        function handleFailure(uiActionId, result, options, apiUri, retryFunction) {
            notificationsService.clear();
            // Forbidden (403) with headers of subscribeURL is returned in case of  establishments SubscriptionValidity, so we need to exclude this case from Generating new token
            var subscribeURL = result.headers ? result.headers('subscribeURL') : undefined;

            // Forbidden (403) with headers of  systemDeploymentUrl is returned in case of enableDeployment config is true
            var deploymentUrl = result.headers ? result.headers('systemDeploymentUrl') : undefined;

            if (result.status === 401 || result.status === 403 && !subscribeURL && !deploymentUrl) {
                var refreshToken = null;
                var localStorageKey = '';
                var applicationId = 0;

                if (window.location.pathname.indexOf('/clients/') == -1) {
                    var user = JSON.parse(localStorage.user);

                    if (user && user.refreshToken) {
                        refreshToken = user.refreshToken;
                        localStorageKey = 'user';
                    }
                } else {
                    if (localStorage.adminUser) {
                        var adminUser = JSON.parse(localStorage.adminUser);

                        if (adminUser && adminUser.refreshToken) {
                            refreshToken = adminUser.refreshToken;
                            localStorageKey = 'adminUser';
                            applicationId = 4;
                        }
                    }
                }

                if (refreshToken && localStorageKey) {
                    if ($rootScope.isRefreshingToken) {
                        if (retryFunction) {
                            enqueue(retryFunction);
                        }
                        return;
                    }

                    $rootScope.isRefreshingToken = true;
                    post('user/refreshTokenNew', { refreshToken: refreshToken, applicationId: applicationId }, {
                        success: function (response) {
                            $rootScope.isRefreshingToken = false;
                            localStorage.setItem(localStorageKey, JSON.stringify(response));
                            try {
                                if (retryFunction) {
                                    retryFunction();
                                }

                                while (queuedCalls.length > 0) {
                                    var callback = dequeue();
                                    callback();
                                }
                            } catch (e) {
                                console.error(e);
                                queuedCalls = [];
                            }
                        },
                        showSpinner: true
                    });
                    return;
                }
            }

            if (!options)
                return;
            if (!result) {
                if (options) {
                    handleAlways(uiActionId, options);
                }
                return;
            }

            if (result != null)

                if (result.messageCode == 'UserNotHavePermissionToViewSponsors') {
                    $state.go('unauthorized');
                }
            if (result.status === 404) {
                window.apiHelper.modelErrors = ['Wrong API call!'];
            }
            else if (result.isClientError) {
                $rootScope.ShowGeneralError(result);
            }
            else {
                if (result.constructor === Array) {
                    var showNotification = true;
                    var errorMessage = '';

                    for (var errorIndex in result) {

                        if (result[errorIndex].message)
                            errorMessage += '<br/ >' + result[errorIndex].message + '<br/ >';

                        if (result[errorIndex].messageCode == 'UserNotHavePermissionToViewSponsors') {
                            $state.go('unauthorized');
                            showNotification = false;
                        }
                    }

                    // the below flag is applied for validateDraft in requestMaster Controller ,to show the auditing result for Business rules in payment result page .
                    let isAutoValidationBusinessRulesApplied = window.config.enableValidateDraftAPI && apiUri.includes("api/payment/fees/service")  ? true : false;

                    if (showNotification && !location.href.includes('/708/') && !isAutoValidationBusinessRulesApplied) {
                        errorOption = { type: "error", duration: 5000, isSticky: true, messageBody: errorMessage, titleBody: "" };
                        notificationsService.showNotification(errorOption);
                    }
                }
                else {

                    if (result && result.message) {
                        errorMessage = result.message;
                    }

                    if (errorMessage) {
                        errorOption = { type: "error", duration: 5000, isSticky: true, messageBody: errorMessage, titleBody: "" };

                        if (result.error === "NO_DATA_FOUND")
                            errorOption.messageKey = "NO_DATA_FOUND";

                        notificationsService.showNotification(errorOption);
                    }
                }
            }
            if (options.error)
                options.error(result);
            handleAlways(uiActionId, options);
        }

        function handleAlways(uiActionId, options) {
            if (!options)
                return;
            defaultOptions.always(uiActionId, options.showSpinner);
            if (options.always != null) {
                options.always();

            }
        }

        function enqueue(element) {
            queuedCalls.push(element);
        }

        function dequeue() {
            return queuedCalls.shift();
        }

        function get(apiUri, options, externalRequest) {
            let staticVersion = localStorage.cacheVersion;
            if (options && options.enableCache) {
                if (apiUri.indexOf('?') != -1)
                    apiUri = apiUri + '&v=' + staticVersion;
                else
                    apiUri = apiUri + '?v=' + staticVersion;
            }
            else
                if (apiUri.indexOf('?') != -1)
                    apiUri = apiUri + '&v=' + Math.random().toString(36).substr(2, 9);
                else
                    apiUri = apiUri + '?v=' + Math.random().toString(36).substr(2, 9);

            var deferred = $q.defer();
            var qs = null;
            if (options && options.params) {
                qs = $httpParamSerializer(options.params);
                apiUri = apiUri + "&" + qs;
            }

            var uiActionId = nextActionId;
            nextActionId += 1;
            if (options)
                handlePreOperationLogic(options)

            if (externalRequest === true) {
                $http.get(apiUri, { responseType: "json" })
                    .then(function (result) {
                        try {
                            deferred.resolve({ data: result.data });
                            handleSuccess(uiActionId, result.data, options);
                        }
                        catch (err) {
                            err.isClientError = true;
                            handleFailure(uiActionId, err, options);
                        }
                    }, function (result) {
                        handleFailure(uiActionId, result.data ? result.data : result, options, apiUri, function () {
                            //get(apiUri, options, externalRequest);
                            $http
                                .get(apiUri, { responseType: "json" })
                                .then(function (result) {
                                    try {
                                        deferred.resolve({ data: result.data });
                                        handleSuccess(uiActionId, result.data, options);
                                    }
                                    catch (err) {
                                        err.isClientError = true;
                                        handleFailure(uiActionId, err, options);
                                    }
                                }, function (result) {
                                    handleFailure(uiActionId, result.data ? result.data : result, options, apiUri, null);
                                });
                        });
                    });

                return deferred.promise;
            } else {
                $http
                    .get(baseApiUrl + apiUri, { responseType: "json", headers: { languageId: languageService.getCurrentID(), CURRENT_PORTAL: localStorage.CURRENT_PORTAL, refreshToken: options?.headerValues?.refreshToken, userToken: options?.headerValues?.userToken } })
                    .then(function (result) {
                        try {
                            deferred.resolve({ data: result.data });
                            handleSuccess(uiActionId, result.data, options);
                        }
                        catch (err) {
                            err.isClientError = true;
                            handleFailure(uiActionId, err, options);
                        }
                    }, function (result) {
                        handleFailure(uiActionId, result.data ? result.data : result, options, apiUri, function () {
                            //get(apiUri, options, externalRequest);
                            $http.get(baseApiUrl + apiUri, { responseType: "json", headers: { languageId: languageService.getCurrentID(), CURRENT_PORTAL: localStorage.CURRENT_PORTAL } })
                                .then(function (result) {
                                    try {
                                        deferred.resolve({ data: result.data });
                                        handleSuccess(uiActionId, result.data, options);
                                    }
                                    catch (err) {
                                        err.isClientError = true;
                                        handleFailure(uiActionId, err, options);
                                    }
                                }, function (result) {
                                    handleFailure(uiActionId, result.data ? result.data : result, options, apiUri, null);
                                });
                        });
                    });

                return deferred.promise;
            }
        }

        function getWithType(apiUri, options, ResponseType) {
            var deferred = $q.defer();
            var qs = null;
            if (options && options.params) {
                qs = $httpParamSerializer(options.params);
                apiUri = apiUri + "?" + qs;
            }

            var uiActionId = nextActionId;
            nextActionId += 1;
            if (options)
                handlePreOperationLogic(options)


            $http.get(baseApiUrl + apiUri, { responseType: ResponseType, headers: { languageId: languageService.getCurrentID(), CURRENT_PORTAL: localStorage.CURRENT_PORTAL } })
                .then(function (result) {
                    deferred.resolve({ data: result.data });
                    handleSuccess(uiActionId, result.data, options);
                }, function (result) {
                    handleFailure(uiActionId, result.data ? result.data : result, options, apiUri, function () {
                        //getWithType(apiUri, options, ResponseType);
                        $http
                            .get(baseApiUrl + apiUri, { responseType: ResponseType, headers: { languageId: languageService.getCurrentID(), CURRENT_PORTAL: localStorage.CURRENT_PORTAL } })
                            .then(function (result) {
                                deferred.resolve({ data: result.data });

                                handleSuccess(uiActionId, result.data, options);
                            }, function (result) {
                                handleFailure(uiActionId, result.data ? result.data : result, options, apiUri, null);
                            });
                    });
                });

            return deferred.promise;
        }

        function post(apiUri, data, options) {
            var deferred = $q.defer();

            if (options && options.params) {
                qs = $httpParamSerializer(options.params);
                apiUri = apiUri + "?" + qs;
            }

            var uiActionId = nextActionId;
            nextActionId += 1;

            if (options)
                handlePreOperationLogic(options)

            if (apiUri.indexOf("http") < 0)
                apiUri = baseApiUrl + apiUri;

            var dataStringified = JSON.stringify(data);
            var optionExtended = angular.extend({}, {
                headers: {
                    languageId: languageService.getCurrentID(),
                    CURRENT_PORTAL: localStorage.CURRENT_PORTAL,
                    refreshToken: options?.headerValues?.refreshToken,
                    userToken: options?.headerValues?.userToken
                
                }
            }, options.AdvanceOptions);

            $http.post(apiUri, dataStringified, optionExtended)
                .then(function (result) {
                    deferred.resolve({ data: result.data });
                    handleSuccess(uiActionId, result.data, options);
                }, function (result) {
                    handleFailure(uiActionId, result.data ? result.data : result, options, apiUri, function () {
                        $http.post(apiUri, dataStringified, optionExtended)
                            .then(function (result) {
                                deferred.resolve({ data: result.data });
                                handleSuccess(uiActionId, result.data, options);
                            }, function (result) {
                                handleFailure(uiActionId, result.data ? result.data : result, options, apiUri, null);
                            });
                    });
                });

            return deferred.promise;
        }

        function postWithHeaderKey(apiUri, data, options, header) {
            var deferred = $q.defer();

            if (options && options.params) {
                qs = $httpParamSerializer(options.params);
                apiUri = apiUri + "?" + qs;
            }

            var uiActionId = nextActionId;
            nextActionId += 1;

            if (options)
                handlePreOperationLogic(options)


            if (apiUri.indexOf("http") < 0)
                apiUri = baseApiUrl + apiUri;

            var dataStringified = JSON.stringify(data);
            var optionExtended = angular.extend({}, {
                headers: header
            }, options.AdvanceOptions);

            $http
                .post(apiUri, dataStringified, optionExtended)
                .then(function (result) {
                    deferred.resolve({ data: result.data });
                    handleSuccess(uiActionId, result.data, options);
                }, function (result) {
                    handleFailure(uiActionId, result.data ? result.data : result, options, apiUri, function () {
                        //postWithHeaderKey(apiUri, data, options, header);
                        $http.post(apiUri, dataStringified, optionExtended)
                            .then(function (result) {
                                deferred.resolve({ data: result.data });
                                handleSuccess(uiActionId, result.data, options);
                            }, function (result) {
                                handleFailure(uiActionId, result.data ? result.data : result, options, apiUri, null);
                            });
                    });
                });

            return deferred.promise;
        }

        function postFormDataWithModel(apiUri, formData, options) {
            var deferred = $q.defer();

            if (options && options.params) {
                qs = $httpParamSerializer(options.params);
                apiUri = apiUri + "?" + qs;
            }

            var uiActionId = nextActionId;
            nextActionId += 1;

            if (options)
                handlePreOperationLogic(options);

            $http.post(baseApiUrl + apiUri, formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(function (result) {
                deferred.resolve({ data: result.data });
                handleSuccess(uiActionId, result.data, options);
            }, function (result) {
                handleFailure(uiActionId, result.data ? result.data : result, options, apiUri, function () {
                    //postFormDataWithModel(apiUri, formData, options);
                    $http.post(baseApiUrl + apiUri, formData, {
                        transformRequest: angular.identity,
                        headers: { 'Content-Type': undefined }
                    }).then(function (result) {
                        deferred.resolve({ data: result.data });
                        handleSuccess(uiActionId, result.data, options);
                    }, function (result) {
                        handleFailure(uiActionId, result.data ? result.data : result, options, apiUri, null);
                    });
                });
            });

            return deferred.promise;
        }

        function postFormData(apiUri, formData, options) {
            var deferred = $q.defer();
            var uiActionId = nextActionId;
            nextActionId += 1;

            if (options)
                handlePreOperationLogic(options)

            $http.post(baseApiUrl + apiUri, formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then(function (result) {
                deferred.resolve({ data: result.data });
                handleSuccess(uiActionId, result.data, options);
            }, function (result) {
                handleFailure(uiActionId, result.data ? result.data : result, options, apiUri, function () {
                    //postFormData(apiUri, formData, options);
                    $http.post(baseApiUrl + apiUri, formData, {
                        transformRequest: angular.identity,
                        headers: { 'Content-Type': undefined }
                    }).then(function (result) {
                        deferred.resolve({ data: result.data });
                        handleSuccess(uiActionId, result.data, options);
                    }, function (result) {
                        handleFailure(uiActionId, result.data ? result.data : result, options, apiUri, null);
                    });
                });
            });

            return deferred.promise;
        }
    }])