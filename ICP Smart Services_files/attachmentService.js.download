mainApp.service('attachmentService', function (apiHelperService, notificationsService, $translate, $http) {
    var _attachmentService = {
        validatePassportAttachment: function (file, attachmentPassportAllowedTypes) {

            var isAllowedType = false;
            if (attachmentPassportAllowedTypes != undefined)
                config.attachmentPassportAllowedTypes = attachmentPassportAllowedTypes;
            var commaSeperatedTypes = config.attachmentPassportAllowedTypes.substring(1, config.attachmentPassportAllowedTypes.length - 1);
            var arrAllowedTypes = commaSeperatedTypes.split(',');
            if (arrAllowedTypes) {
                for (i = 0; i < arrAllowedTypes.length; i++) {
                    var typeName = arrAllowedTypes[i].trim().substring(1, arrAllowedTypes[i].length);

                    if (file.type.indexOf(typeName) != -1) {
                        isAllowedType = true;
                    }
                }
            }
            if (!isAllowedType) {
                var options = { type: "error", isSticky: true, messageKey: $translate.instant("passportNotAllowedType"), titleKey: '', localizationControllers: ['passportNotAllowedType', 'request'] };
                notificationsService.showNotification(options);

            }
            return isAllowedType;
        },
        getAttachmentFileAsBlob: function (id, attachmentToken, callback) {
            if (!attachmentToken)
                return;

            var url = window.config.apiHostUrl + 'attachment/' + id + '/' + attachmentToken + '/view';

            $http.get(url, { responseType: "blob" }).then(function (blob) {
                // encode data to base 64 url
                callback(blob.data);
            });
        },
        //getAttachmentFileAsBlobByUrl: function (url, callback) {
        //    url = window.config.apiHostUrl + url;
        //    $http.get(url, { responseType: "blob" }).then(function (blob) {
        //        // encode data to base 64 url
        //        callback(blob.data);
        //    });
        //},
        getAttachmentThumbAsBlob: function (id, attachmentToken, callback) {
            if (!attachmentToken)
                return;

            var url = window.config.apiHostUrl + 'attachment/' + id + '/' + attachmentToken + '/thumbnail';

            $http.get(url, { responseType: "blob" }).then(function (blob) {
                // encode data to base 64 url
                callback(blob.data);
            });
        },
        downlaodRequestAttachments: function (requestId, requestNumber) {
            var options = {
                success: function (response) {

                    var binary_string = window.atob(response.byteArrayBase64String);
                    var len = binary_string.length;
                    var bytes = new Uint8Array(len);
                    for (var i = 0; i < len; i++) {
                        bytes[i] = binary_string.charCodeAt(i);
                    }


                    var data = bytes.buffer;
                    var blob = new Blob([data], {
                        type: 'application/octet-stream'
                    });

                    var link = document.createElement('a');
                    link.setAttribute("type", "hidden"); // make it hidden if needed
                    // append to body
                    document.body.appendChild(link);
                    link.href = window.URL.createObjectURL(blob);
                    var fileName = requestNumber + '.zip';
                    link.download = fileName;
                    // click it (download)
                    link.click();
                    // remove link from body
                    document.body.removeChild(link);
                },
                params: {
                    requestId: requestId,
                    requestNumber: requestNumber,

                },
                error: function (err) {
                    var errorOption = { type: "error", duration: 5000, isSticky: true, messageBody: 'UNHANDLED EXCEPTION HAS OCCURRED.', titleBody: "" };
                    notificationsService.showNotification(errorOption);
                },

            };

            apiHelperService.get("attachment/attachmentsFiles", options, 'blob');
        },
        validateAttachment: function (file) {
            var isAllowedType = false;
            var commaSeperatedTypes = config.attachmentAllowedTypes.substring(1, config.attachmentAllowedTypes.length - 1);
            var arrAllowedTypes = commaSeperatedTypes.split(',');
            if (arrAllowedTypes) {
                for (i = 0; i < arrAllowedTypes.length; i++) {
                    var typeName = arrAllowedTypes[i].trim().substring(1, arrAllowedTypes[i].length);

                    if (file.type.indexOf(typeName) != -1) {
                        isAllowedType = true;
                    }
                }
            }
            if (!isAllowedType) {
                var options = {
                    type: "error",
                    isSticky: true,
                    messageKey: $translate.instant("attachmentTypeNotAllowed"),
                    titleKey: '',
                    localizationControllers: ['attachmentTypeNotAllowed', 'request']
                };
                notificationsService.showNotification(options);

            }
            return isAllowedType;
        }
    }
    return _attachmentService;
});