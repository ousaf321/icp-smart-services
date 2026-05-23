mainApp.factory('userApplicantService', ['$http', '$q', 'apiHelperService', '$translate', 'serviceTransactionService', function ($http, $q, apiHelperService, $translate, serviceTransactionService) {

    //if (!$scope.config) {
    //    function loadConfig() {
    //        serviceTransactionService.loadConfig(null, $scope.draft.serviceTransactionId, $scope.draft.administrativeRegionId, function (config) {
    //            $scope.config = config;
    //            if (config.hideIdentity) {
    //                $scope.hideIdentity = config.hideIdentity;
    //            }
    //        });
    //    }
    //    loadConfig();
    //}

    var userApplicantService = {
        add: function (userApplicant, successCallback, errorCallback) {

            var options = {
                success: successCallback,
                error: errorCallback
            };


            return apiHelperService.post('userApplicant/add', userApplicant, options);
        },
        update: function (userApplicant, successCallback, errorCallback) {

            var options = {
                success: successCallback,
                error: errorCallback
            };

            return apiHelperService.post('userApplicant/update', userApplicant, options);
        },
        loadApplicantsWithPaging: function (searchCriteria, options) {



            return apiHelperService.post('userApplicant/search', searchCriteria, options);
        },
        loadMyApplicants: function (successCallback, errorCallback) {

            var options = {
                success: successCallback,
                error: errorCallback
            };


            return apiHelperService.get('userApplicant/applicants', options);
        },
        load: function (id, successCallback, errorCallback) {

            var options = {
                success: successCallback,
                error: errorCallback
            };

            return apiHelperService.get('userApplicant/' + id + '/load', options);
        },
        loadPrimary: function (successCallback, errorCallback) {

            var options = {
                success: successCallback,
                error: errorCallback
            };

            return apiHelperService.get('userApplicant/primary', options);

        },
        hasPrimary: function (successCallback, errorCallback) {

            var options = {
                success: successCallback,
                error: errorCallback
            };

            return apiHelperService.get('userApplicant/hasPrimary', options);

        },
        getAttachment: function (attachmentToken, successCallback, errorCallback) {

            var options = {
                success: successCallback,
                error: errorCallback
            };

            return apiHelperService.get('userApplicant/attachment/' + attachmentToken, options);
        },
        uploadAttachment: function (applicantId, attachment, serverPath, successCallback, errorCallback) {

            var options = {
                success: function (result) {
                    if (result) {

                        attachment.token = result.token;
                        attachment.id = result.id;

                    }

                    if (successCallback)
                        successCallback(result);

                },
                error: errorCallback
            };
            if (serverPath) {
                attachment.serverPath = serverPath;
            }
            var fd = new FormData();
            if (typeof attachment.attachmentFile === 'object') {
                fd.append('file', attachment.attachmentFile);

            }
            fd.append('attachment', angular.toJson(attachment));

            return apiHelperService.postFormData('userApplicant/' + applicantId + '/attachment/upload', fd, options);
        },
        updateAttachment: function (applicantId, attachment, serverPath, successCallback, errorCallback) {

            var options = {
                success: successCallback,
                error: errorCallback
            };
            if (serverPath) {
                attachment.serverPath = serverPath;
            }
            var fd = new FormData();
            if (typeof attachment.attachmentFile === 'object') {
                fd.append('file', attachment.attachmentFile);
            }


            fd.append('attachment', angular.toJson(attachment));

            return apiHelperService.postFormData('userApplicant/' + applicantId + '/attachment/update', fd, options);
        },
        searchMyAttachments: function (currentPage, pageSize, userApplicantId, successCallback, errorCallback) {

            var options = {
                success: successCallback,
                error: errorCallback,
                params: { currentPage: currentPage, pageSize: pageSize, applicantId: userApplicantId }
            };


            return apiHelperService.get('userApplicant/attachments/search', options);
        },
        loadApplicantAttachments: function (userApplicantId, successCallback, errorCallback) {

            var options = {
                success: successCallback,
                error: errorCallback
            };


            return apiHelperService.get('userApplicant/' + userApplicantId + '/attachments', options);
        },
        deleteAttachment: function (attachmentToken, successCallback, errorCallback) {

            var options = {
                success: successCallback,
                error: errorCallback
            };

            return apiHelperService.get('userApplicant/attachment/' + attachmentToken + '/delete', options);

        }, uploadAttachments: function (applicantId, attachments, serverPath, successCallback) {



            var uploadRequests = [];
            if (attachments) {
                for (var i = 0; i < attachments.length; i++) {

                    if (!attachments[i].token) {
                        if (serverPath) {
                            attachments[i].serverPath = serverPath;
                        }

                        var uploadReq = function (index) {

                            return userApplicantService.uploadAttachment(applicantId, attachments[index])
                        }

                        uploadRequests.push(uploadReq(i));
                    }
                }

                $q.all(uploadRequests).then(function (result) {

                    apiHelperService.post('userApplicant/attachments/updateDetail', attachments, {
                        success: function (reult) {
                            successCallback(result);

                        }
                    });

                });
            }
        }
    }

    return userApplicantService;
}]);
