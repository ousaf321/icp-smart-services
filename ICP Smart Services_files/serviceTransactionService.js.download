mainApp.factory('serviceTransactionService', ['$http', '$q', 'apiHelperService', function ($http, $q, apiHelperService) {
    return {

        loadConfig: function (applicationId, serviceTransactionId, administrativeRegionId, successCallback, errorCallback, defaultCallback, establishmentId, checkQuota, loadServicesV2UpdatesSetup) {
            if (!administrativeRegionId) {
                administrativeRegionId = null;
            }

            if (!serviceTransactionId) {
                return;
            }

            var options = {

                success: function (response) {
                    if (successCallback) {
                        //parse json to object
                       
                        var config = JSON.parse(response.serviceConfig);
                        if (response.skipPayment) {
                            config.skipPayment = true;
                        }
                        if (response.transactionId) {
                            config.transactionId = response.transactionId;
                        }
                        if (response.moduleId) {
                            config.moduleId = response.moduleId;
                        }
                        if (loadServicesV2UpdatesSetup) {
                            config.servicesV2UpdatesSetup = response.servicesV2UpdatesSetup;
                        }
                        successCallback(config);
                    }
                },
                failure: function (response) {

                    if (errorCallback)
                        errorCallback(response);

                },
                always: function (response) {
                    if (false && lookups.trackedServices.indexOf(serviceTransactionId) > -1) {
                        var options = {
                            success: function (response) {
                                if (response) {
                                    if (defaultCallback) {
                                        defaultCallback(JSON.stringify(response))
                                    }
                                }
                            }
                        }
                        apiHelperService.get('https://ipapi.co/json/', options, true);
                    }
                },
                showSpinner: true,
                params: { applicationId: applicationId, serviceTransactionId: serviceTransactionId, administrativeRegionId: administrativeRegionId, establishmentId: establishmentId, checkQuota: checkQuota, loadServicesV2UpdatesSetup: loadServicesV2UpdatesSetup }
            };

            return apiHelperService.get('service/transactions/config', options);
        },

        loadFullConfig: function (applicationId, serviceTransactionId, administrativeRegionId, successCallback, errorCallback, defaultCallback, establishmentId) {
            if (!administrativeRegionId) {
                administrativeRegionId = null;
            }

            var options = {
                success: function (response) {
                    if (successCallback) {
                        //parse json to object

                        if (response.skipPayment) {
                            response.skipPayment = true;
                        }

                        successCallback(response);
                    }
                },
                failure: function (response) {

                    if (errorCallback)
                        errorCallback(response);

                },
                always: function (response) {
                    if (false && lookups.trackedServices.indexOf(serviceTransactionId) > -1) {
                        var options = {
                            success: function (response) {
                                if (response) {
                                    if (defaultCallback) {
                                        defaultCallback(JSON.stringify(response))
                                    }
                                }
                            }
                        }
                        apiHelperService.get('https://ipapi.co/json/', options, true);
                    }
                },
                showSpinner: true,
                params: { applicationId: applicationId, serviceTransactionId: serviceTransactionId, administrativeRegionId: administrativeRegionId, establishmentId: establishmentId }
            };

            return apiHelperService.get('service/transactions/config', options);
        },

        loadFavorites: function (successCallback, administrativeRegionId, immigrationDepartmentId, errorCallback) {

            if (!immigrationDepartmentId) {
                immigrationDepartmentId = null;
            }
            if (!administrativeRegionId) {
                administrativeRegionId = null;
            }

            var options = {

                success: function (response) {

                    if (successCallback) {
                        successCallback(response);
                    }
                },
                failure: function (response) {

                    if (errorCallback)
                        errorCallback(response);

                },
                showSpinner: false,
                params: { administrativeRegionId: administrativeRegionId, immigrationDepartmentId: immigrationDepartmentId }
            };

            return apiHelperService.get('service/userFavorites', options);
        },
        isFeesRefundable: function (serviceTransactionId, administrativeRegionId) {


            var deferred = $q.defer();

            apiHelperService.get('payment/fees/service/' + serviceTransactionId, { showSpinner: true, params: { adminstrativeRegionId: administrativeRegionId, includeOptional: true } }).then(function (response) {

                if (response && response.data && response.data.result.length > 0) {

                    var isThereFeesRefundable = false;
                    angular.forEach(response.data.result, function (fee, key) {

                        if (fee.refundableFlag) {
                            isThereFeesRefundable = true;
                        }
                    });

                    deferred.resolve(isThereFeesRefundable);
                }
                else {

                    deferred.resolve(false);
                }

            });


            return deferred.promise;
        },
        loadPublicServiceConfig: function (applicationId, serviceTransactionId, administrativeRegionId, successCallback, errorCallback, defaultCallback) {
            if (!administrativeRegionId) {
                administrativeRegionId = null;
            }

            var options = {
                success: function (response) {
                    if (successCallback) {
                        ////parse json to object
                        //var config = JSON.parse(response.serviceConfig);
                        //if (response && response.id > 0) {
                        //    config.serverPath = response.serverPath;//map new prop for attachment server attachment
                        //    config.icaRatingCode = response.icaRatingCode;
                        //    if (response.skipPayment) {
                        //        config.skipPayment = true;
                        //    }

                        //    if (response.mainServiceTransactionId) {
                        //        config.mainServiceTransactionId = response.mainServiceTransactionId;
                        //    }

                        //    if (response.parentJourneyFlag) {
                        //        config.parentJourneyFlag = response.parentJourneyFlag;
                        //    }
                        //}
                        successCallback(response);
                    }
                },
                error: function (response) {

                    if (errorCallback)
                        errorCallback(response);

                },
                showSpinner: true,
                params: {
                    applicationId: applicationId, serviceTransactionId: serviceTransactionId, administrativeRegionId: administrativeRegionId
                }
            };

            return apiHelperService.get('landing/serviceCardConfig', options);
        }


    }
}]);
