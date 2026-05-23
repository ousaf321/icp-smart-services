
mainApp.directive('tahalufAttachmentsViewer', ['$http', 'userApplicantService', '$stateParams', 'apiHelperService', '$rootScope', '$q', '$translate', 'notificationsService', 'fileService', 'attachmentService', 'languageService', 'authManager',
    function ($http, userApplicantService, $stateParams, apiHelperService, $rootScope, $q, $translate, notificationsService, fileService, attachmentService, languageService, authManager) {
        return {
            restrict: 'EA',
            scope: {
                attachments: '=',
                attachmentTypes: '=',
                deleteAttachment: "&",
                control: '=',
                nameTemplate: '=?',
                maxSize: '@?',
                accept: '@?',
                hideRequiredAttachmentsInfo: '=?',
                showExceptionCategory: '=',
                imageCropper: '=',//it will be deleted later-not used
                requestDraft: '=?',
                hintResidency: '=?',
                hasIntegration: '=?',
                isUnifiedForm: '=?',
                allowedAttachmentTypes: '=?',
                isGccCitizenIcaService: '=?',
                allowReplicatedImage: '=?',
                maxFileCheck: '=?',
                hideScannerElements: '=?',
                callback: "&",
                lastUploadedAttachment: '=?',
                enableAutoUpload: '=?',
                establishmentInfo: '=?',
                checkIcaoForAdditionalService: '=?',
                mohreCancellationReceipt: '=?',
                hideAlertInfo: '=?'
            },
            templateUrl: '../framework/directives/tahaluf-attachments-viewer.html',
            link: function (scope, elm, attrs, ValidationService, $filter) {
                scope.clientURL = config.host;
                scope.examResultCode = lookups.medicalHealthExamResultCode.noDataFound;
                scope.scanFormatIsPDF = "pdf";
                scope.scanFormat = "jpg";
                scope.scanAppURL = config.scannerAppLink;
                scope.imageAttachmentAllowedTypes = config.imageAttachmentAllowedTypes;
                scope.enableICAOPersonalPhotoConditions = false;
                scope.invalidPersonalImageSizeAndResolution = false;
                scope.adminRegionsLookup = lookups.adminRegions;
                scope.attachmentInfoSourceLookup = lookups.attachmentInfoSource;
                scope.useAttachmentIntegrationDetailsFromDBConfigKey = config.useAttachmentIntegrationDetailsFromDB;
                scope.currentUserApplicationId = authManager.getCurrentUser().applicationId;
                scope.previousNumber = 0;
                scope.isExceptionalServicesForAttachmentIntegrationList = config.exceptionalServicesForAttachmentIntegrationList.includes($stateParams.serviceTransactionId);

                if (angular.isUndefined(scope.maxSize))
                    if ($stateParams.serviceTransactionId == lookups.ServiceTransactions.mohreWorkPackage ||
                        $stateParams.serviceTransactionId == lookups.ServiceTransactions.mohreWorkPackageWorkRenew ||
                        $stateParams.serviceTransactionId == lookups.ServiceTransactions.mohreWorkPackageWorkCancel ||
                        $stateParams.serviceTransactionId == lookups.ServiceTransactions.exceptionalCancelResidancyMohreWorkPackage ||
                        $stateParams.serviceTransactionId == lookups.ServiceTransactions.cancelVisaMohreWorkPackage ||
                        $stateParams.serviceTransactionId == lookups.ServiceTransactions.exceptionalCancelVisaMohreWorkPackage ||
                        $stateParams.serviceTransactionId == 1069 ||
                        $stateParams.serviceTransactionId == 1075 ||
                        scope.mohreCancellationReceipt) {
                        scope.maxSize = config.mohreDocumentMaxSize;
                    } else {
                        scope.maxSize = config.attachmentMaxSize;
                    }


                if (angular.isUndefined(scope.accept)) {
                    if ($stateParams.serviceTransactionId == lookups.ServiceTransactions.mohreWorkPackage ||
                        $stateParams.serviceTransactionId == lookups.ServiceTransactions.mohreWorkPackageWorkRenew ||
                        $stateParams.serviceTransactionId == lookups.ServiceTransactions.mohreWorkPackageWorkCancel ||
                        $stateParams.serviceTransactionId == lookups.ServiceTransactions.exceptionalCancelResidancyMohreWorkPackage ||
                        $stateParams.serviceTransactionId == lookups.ServiceTransactions.cancelVisaMohreWorkPackage ||
                        $stateParams.serviceTransactionId == lookups.ServiceTransactions.exceptionalCancelVisaMohreWorkPackage ||
                        $stateParams.serviceTransactionId == 1069 ||
                        $stateParams.serviceTransactionId == 1075 ||
                        scope.mohreCancellationReceipt) {
                        scope.accept = config.attachmentMohreAllowedTypes;
                    } else {
                        scope.accept = config.attachmentAllowedTypes;
                    }

                    if (scope.accept.includes("pdf"))
                        scope.allowedPdf = true;
                    else scope.allowedPdf = false;
                } else {
                    if (scope.accept.includes("pdf"))
                        scope.allowedPdf = true;
                    else scope.allowedPdf = false;
                }

                if (!scope.attachments)
                    scope.attachments = [];

                if (scope.requestDraft != null && scope.requestDraft != undefined && !scope.requestDraft.deletedAttachments)
                    scope.requestDraft.deletedAttachments = [];

                scope.isFemaleChildrenService = false;
                if ($stateParams.serviceTransactionId && $stateParams.serviceTransactionId == lookups.ServiceTransactions.femaleChildrenNaturalizationRequest) {
                    scope.isFemaleChildrenService = true;
                }


                if ($stateParams.serviceTransactionId) {
                    if (window.config.ServiceTransactionUsedICAO.filter(c => c == $stateParams.serviceTransactionId).length > 0) {
                        scope.enableICAOPersonalPhotoConditions = window.config.enableICAOPersonalPhotoConditions;
                    }
                }
                scope.isPassportAttachment = function (id) {
                    if (window.config.PassportAttachmentTypeIds.filter(c => c == id).length > 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                scope.internalControl = scope.control || {};

                scope.internalControl.validate = function () {
                    //check that all name and types selected
                    for (i = 0; i < scope.attachments.length; i++) {

                        //if (scope.attachments.length > 0) {
                        //    scope.attachmentTypes.filter(function (a) {
                        //        if (a.id == scope.attachments[i].attachmentTypeId && a.icaAttachment == true) {
                        //            if ((scope.attachments[i].attachmentFile && scope.attachments[i].attachmentFile.type && scope.attachments[i].attachmentFile.type.indexOf('pdf') > -1) || (scope.attachments[i].attachmentFileMIMEType && scope.attachments[i].attachmentFileMIMEType.indexOf('pdf') > -1)) {
                        //                var options =
                        //                {
                        //                    duration: 5000, type: "error", isSticky: true, messageKey: $translate.instant('cannotUploadThisAttachments'), titleKey: scope.attachments[i].name
                        //                };
                        //                notificationsService.showNotification(options);
                        //                arrError.push(scope.attachments[i].name);
                        //                throw ex;
                        //            }
                        //        }
                        //    })
                        //}

                        if (!scope.attachments[i].name ||
                            scope.attachments[i].name.length <= 0 ||
                            !scope.attachments[i].attachmentTypeId ||
                            scope.attachments[i].attachmentTypeId <= 0) {
                            return false;
                        }
                    }
                    return true;
                }

                scope.showHealthInsuranceNote = true;
                if (scope.requestDraft != null && scope.requestDraft != undefined && scope.requestDraft.serviceTransactionId == lookups.ServiceTransactions.ResidencySponsorShipReportEscape) {
                    scope.showHealthInsuranceNote = false;
                }

                scope.setOptionalIntegrationAttachStyle = function (attachmentType) {

                    if (attachmentType.isMandatory == false && attachmentType.hasIntegration && !attachmentType.integrationDetailsFound) {

                        return true;
                    }
                    return false;
                }


                scope.checkUploadFileStyle = function (attachmentType) {
                    if (scope.attachments != null || scope.attachments != undefined) {
                        for (i = 0; i < scope.attachments.length; i++) {
                            if (scope.attachments[i]) {

                                if (scope.attachments[i].attachmentTypeId == attachmentType.id) {
                                    return true;
                                }
                                if ((attachmentType.id == 141 || attachmentType.id == 402 || attachmentType.id == 611 || attachmentType.id == 401) && scope.invalidPersonalImageSizeAndResolution) {
                                    return false;
                                }
                            }
                        }
                        return false;
                    }
                }
                scope.maxFileCheck = true;
                scope.isAdministrativeRegionAllowed = function (attachmentType) {

                    if (scope.requestDraft != null && scope.requestDraft.administrativeRegionId != null) {
                        if (attachmentType) {
                            // New approach get attachment integration details from DB  "lookupInfoSourceId, integrationApplicationTypesIds, integrationAdminReagionsIds"
                            if (attachmentType.integrationAdminReagionsIds && attachmentType.integrationAdminReagionsIds.length > 0
                                && attachmentType.lookupInfoSourceId && scope.useAttachmentIntegrationDetailsFromDBConfigKey == true) {

                                //get the applicationId from draft if not from current user application id 
                                let applicationId;
                                if (scope.requestDraft.applicationId) {
                                    applicationId = scope.requestDraft.applicationId;
                                } else {
                                    applicationId = scope.currentUserApplicationId;
                                }

                                if (lookups.lookupInfoSourceIdsForApplicant.filter(e => e === attachmentType.lookupInfoSourceId).length > 0
                                    || lookups.lookupInfoSourceIdsForBenficiary.filter(e => e === attachmentType.lookupInfoSourceId).length > 0
                                    || lookups.lookupInfoSourceIdsForMother.filter(e => e === attachmentType.lookupInfoSourceId).length > 0
                                    || lookups.lookupInfoSourceIdsForVisa.filter(e => e === attachmentType.lookupInfoSourceId).length > 0) {

                                    if (scope.enableAutoUploadAttachment(attachmentType.lookupInfoSourceId) || window.config.enableDisableAutoLoaderForAttachments == false) {
                                        return false;
                                    }
                                }

                                //check the admin administrative region id if allowed 
                                if (attachmentType.integrationAdminReagionsIds.includes(scope.requestDraft.administrativeRegionId)) {
                                    // if the integrationApplicationTypesIds null we will not check the appplication id 
                                    // else we will check it if allowed 
                                    if (attachmentType.integrationApplicationTypesIds && attachmentType.integrationApplicationTypesIds.length > 0) {
                                        if (!attachmentType.integrationApplicationTypesIds.includes(applicationId)) {
                                            return false;
                                        }
                                    }
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                            // Old approach
                            else {
                                if (attachmentType.id == 1410) { //Proof of ownership of the property
                                    if (scope.requestDraft.administrativeRegionId == 4) { //Ajman
                                        return true;
                                    }
                                    else {
                                        return false;
                                    }
                                }

                                return scope.requestDraft.administrativeRegionId == 1 || scope.requestDraft.administrativeRegionId == 8 || scope.requestDraft.administrativeRegionId == 9 || scope.requestDraft.administrativeRegionId == 4  //Abu Dhabi, Al ain or AlDafra or Ajman
                                    || ((attachmentType.id == 122 || attachmentType.id == 49 || attachmentType.id == 50 || attachmentType.id == 24 || attachmentType.id == 338 || attachmentType.id == 806) && (scope.requestDraft.administrativeRegionId == 4 || scope.requestDraft.administrativeRegionId == 3 || scope.requestDraft.administrativeRegionId == 5 || scope.requestDraft.administrativeRegionId == 6 || scope.requestDraft.administrativeRegionId == 7))//medical fitness + ajman + Fujairah + UmAlQuwain + RasAlKhaimah + Sharjah
                                    || ((attachmentType.id == 190 || attachmentType.id == 102 || attachmentType.id == 800 || attachmentType.id == 358) && (scope.requestDraft.administrativeRegionId == 6 || scope.requestDraft.administrativeRegionId == 4 || scope.requestDraft.administrativeRegionId == 3 || scope.requestDraft.administrativeRegionId == 5))//tawtheeq + Ras Akhaima + Ajman
                                    || ((attachmentType.id == 17 || attachmentType.id == 144 || attachmentType.id == 149 || attachmentType.id == 150 || attachmentType.id == 18 || attachmentType.id == 226) && (scope.requestDraft.administrativeRegionId == 3 || scope.requestDraft.administrativeRegionId == 6 || scope.requestDraft.administrativeRegionId == 5))//trade license + sharjah
                                    || (attachmentType.id == 73 || attachmentType.id == 245 || attachmentType.id == 55 || attachmentType.id == 790)//health insurance
                                    || (attachmentType.id == 994 || attachmentType.id == 992)
                                    || (attachmentType.id == 1001);
                            }
                        }
                        else {
                            return scope.requestDraft.administrativeRegionId == scope.adminRegionsLookup.abuDhabi
                                || scope.requestDraft.administrativeRegionId == scope.adminRegionsLookup.ain
                                || scope.requestDraft.administrativeRegionId == scope.adminRegionsLookup.dhafra;
                        }
                    }
                    else
                        return false;
                }

                scope.checkAllowReplicatedImage = function () {
                    if (scope.allowReplicatedImage) {
                        var arrReplicatedImag = scope.allowReplicatedImage;
                        if (arrReplicatedImag) {
                            for (j = 0; j < arrReplicatedImag.length; j++) {
                                if (scope.requestDraft != null && (arrReplicatedImag.indexOf(parseInt(scope.requestDraft.serviceTransactionId)) > -1)) {
                                    scope.maxFileCheck = false;
                                    return true;
                                }
                                else {
                                    scope.maxFileCheck = true;
                                    return false;
                                }
                            }
                        }
                        return false;
                    }
                }

                //scope.checkMaxReplicatedImage = function (attachmentType, attachments) {
                //    var maxCount = attachmentType.maxNumberOfReplicated;
                //    var maxEl = 0;
                //    for (i = 0; i < attachments.length; i++) {
                //        if (attachmentType.id == attachments[i].attachmentTypeId)
                //            maxEl = ++maxEl;
                //    }
                //    if (maxEl >= maxCount)
                //        return true;
                //    else
                //        return false;
                //}

                scope.checkMaxReplicatedImage = function (attachmentType, attachments, maxNumberOfReplicated) {
                    var maxCount = 1;
                    if ((attachmentType.id == 612 || attachmentType.id == 975 || attachmentType.id == 983 || attachmentType.id == 972 || attachmentType.id == 973 || attachmentType.id == 974 ||
                        attachmentType.id == 969 || attachmentType.id == 970 || attachmentType.id == 971 || attachmentType.id == 614 || attachmentType.id == 976 || attachmentType.id == 956 ||
                        attachmentType.id == 958 || attachmentType.id == 979 || attachmentType.id == 957 || attachmentType.id == 955 || attachmentType.id == 953 || attachmentType.id == 605 ||
                        attachmentType.id == 611 || attachmentType.id == 954 || attachmentType.id == 959 || attachmentType.id == 968) &&
                        (scope.requestDraft.serviceTransactionId == lookups.ServiceTransactions.femaleChildrenNaturalizationRequest ||
                            scope.requestDraft.serviceTransactionId == lookups.ServiceTransactions.citizenWifeNaturalizationRequest ||
                            scope.requestDraft.serviceTransactionId == lookups.ServiceTransactions.naturalizationRequest)) {
                        maxCount = maxNumberOfReplicated;
                    }
                    else {
                        maxCount = attachmentType.maxNumberOfReplicated;
                    }


                    var maxEl = 0;
                    for (i = 0; i < attachments.length; i++) {
                        if (attachmentType.id == attachments[i].attachmentTypeId)
                            maxEl = ++maxEl;
                    }
                    if (maxEl >= maxCount)
                        return true;
                    else
                        return false;
                }

                //filter attachment types
                scope.filteredAttachmentTypes = function (attachmentTypes, currentAttachment) {
                    if (scope._attachmentTypes) {
                        return scope._attachmentTypes.filter(function (attachmentType) {
                            //loop on existing attachments
                            for (i = 0; i < scope.attachments.length; i++) {

                                //check if current attachment already has same attachment type
                                //then will be just shown for this attachment
                                if (currentAttachment.attachmentTypeId == attachmentType.id)
                                    return true;

                                //hide this attachment type if there any attachment already select it
                                if (scope.attachments[i] && !scope.checkAllowReplicatedImage()) {
                                    if (attachmentType.id == scope.attachments[i].attachmentTypeId) {
                                        return false;
                                    }
                                }

                                var maxLength = 1;
                                if ((attachmentType.id == 612 || attachmentType.id == 975 || attachmentType.id == 983 || attachmentType.id == 972 || attachmentType.id == 973 || attachmentType.id == 974 ||
                                    attachmentType.id == 969 || attachmentType.id == 970 || attachmentType.id == 971 || attachmentType.id == 614 || attachmentType.id == 976 || attachmentType.id == 956 ||
                                    attachmentType.id == 958 || attachmentType.id == 979 || attachmentType.id == 957 || attachmentType.id == 955 || attachmentType.id == 953 || attachmentType.id == 605 ||
                                    attachmentType.id == 611 || attachmentType.id == 954 || attachmentType.id == 959 || attachmentType.id == 968) &&
                                    (scope.requestDraft.serviceTransactionId == lookups.ServiceTransactions.femaleChildrenNaturalizationRequest ||
                                        scope.requestDraft.serviceTransactionId == lookups.ServiceTransactions.citizenWifeNaturalizationRequest ||
                                        scope.requestDraft.serviceTransactionId == lookups.ServiceTransactions.naturalizationRequest)) {
                                    maxLength = attachmentType.maxNumberOfReplicated;
                                    if (attachmentType.id == 612 && scope.requestDraft.request.relativesInformation != null && scope.requestDraft.request.relativesInformation.length > 0) {
                                        maxLength = scope.requestDraft.request.relativesInformation.length;
                                    }

                                }
                                if (scope.checkAllowReplicatedImage() && scope.checkMaxReplicatedImage(attachmentType, scope.attachments, maxLength)) {
                                    return false;
                                }

                            }
                            return true;
                        });
                    }
                };

                scope.uploadFiles = function (files, errFiles, attachmentType, isFromUpload) {

                    var isValid = true;
                    if (attachmentType != null) {
                        if (scope.attachments == null || scope.attachments == undefined) {
                            scope.attachments = [];
                        }
                        var checkForAtachment = ((scope.attachments.filter(
                            function (checkForAtachment) {
                                if (!scope.checkAllowReplicatedImage()) {
                                    if (checkForAtachment.attachmentTypeId == attachmentType.id) {
                                        var options =
                                        {
                                            duration: 5000, type: "warning", isSticky: false, messageKey: $translate.instant('YouUploadThisPhotoAlready'), titleKey: 'warning'
                                        };
                                        notificationsService.showNotification(options);
                                        isValid = false;
                                        return false;
                                    }
                                }

                                var maxLengthAttach = 1;
                                if ((attachmentType.id == 612 || attachmentType.id == 975 || attachmentType.id == 983 || attachmentType.id == 972 || attachmentType.id == 973 || attachmentType.id == 974 ||
                                    attachmentType.id == 969 || attachmentType.id == 970 || attachmentType.id == 971 || attachmentType.id == 614 || attachmentType.id == 976 || attachmentType.id == 956 ||
                                    attachmentType.id == 958 || attachmentType.id == 979 || attachmentType.id == 957 || attachmentType.id == 955 || attachmentType.id == 953 || attachmentType.id == 605 ||
                                    attachmentType.id == 611 || attachmentType.id == 954 || attachmentType.id == 959 || attachmentType.id == 968) &&
                                    (scope.requestDraft.serviceTransactionId == lookups.ServiceTransactions.femaleChildrenNaturalizationRequest ||
                                        scope.requestDraft.serviceTransactionId == lookups.ServiceTransactions.citizenWifeNaturalizationRequest ||
                                        scope.requestDraft.serviceTransactionId == lookups.ServiceTransactions.naturalizationRequest)) {
                                    maxLengthAttach = attachmentType.maxNumberOfReplicated;

                                    if (attachmentType.id == 612 && scope.requestDraft.request.relativesInformation != null && scope.requestDraft.request.relativesInformation.length > 0) {
                                        maxLengthAttach = scope.requestDraft.request.relativesInformation.length;
                                    }
                                } else if (scope.requestDraft && scope.requestDraft.serviceTransactionId == lookups.ServiceTransactions.renewPassportEidaPackage && attachmentType.id == lookups.attachmentTypes.supportingDocument) {
                                    maxLengthAttach = attachmentType.maxNumberOfReplicated;
                                }
                                if (scope.checkAllowReplicatedImage() && scope.checkMaxReplicatedImage(attachmentType, scope.attachments, maxLengthAttach)) {
                                    var options = { duration: 5000, type: "warning", isSticky: false, messageKey: $translate.instant('YouUploadTheMaxOfThisPhoto'), titleKey: 'warning' };
                                    notificationsService.showNotification(options);
                                    isValid = false;
                                    return false;
                                }

                                return true;
                            })));

                    }
                    if (isValid) {
                        if (errFiles && errFiles.length > 0) {
                            angular.forEach(errFiles, function (errFile) {
                                if (errFile.$error == 'maxSize') {
                                    var message = "";
                                    if (scope.maxSize)
                                        message = $translate.instant("InvalidFileUploaded").replace("{MAX_SIZE}", $translate.instant(scope.maxSize));
                                    else message = $translate.instant("InvalidFileUploaded").replace("{MAX_SIZE}", $translate.instant(config.attachmentMaxSize));

                                    var options = { duration: 5000, type: "warning", isSticky: false, messageKey: message, titleKey: "" };
                                    notificationsService.showNotification(options);
                                }
                            });
                        }

                        if (!scope.attachments) {
                            scope.attachments = [];
                        }
                        else {
                            if (!scope.checkAllowReplicatedImage()) {
                                if (scope.maxFiles == 0) {
                                    var options = {
                                        type: "error", isSticky: true, messageKey: $translate.instant("ExceededMaxSize"), titleKey: '', localizationControllers: ['exceededMaxSize', 'request']
                                    };
                                    notificationsService.showNotification(options);
                                    return;

                                }
                            }

                        }

                        for (i = 0; i < files.length; i++) {
                            var attachment = {
                                attachmentFile: files[i],
                                attachmentThumbnail: files[i],
                            };
                            var isAllowedType = false;
                            var isNotAllowedTypePdf = false;
                            var isNotAllowedTypeJpgAndJpeg = false;
                            if (scope.allowedAttachmentTypes) {
                                var commaSeperatedTypes = scope.allowedAttachmentTypes;
                                if (scope.allowedAttachmentTypes.split(',').length > 1) {
                                    commaSeperatedTypes = scope.allowedAttachmentTypes.substring(1, scope.allowedAttachmentTypes.length - 1);
                                }
                                var arrAllowedTypes = commaSeperatedTypes.split(',');
                                if (arrAllowedTypes) {
                                    for (j = 0; j < arrAllowedTypes.length; j++) {
                                        var typeName = arrAllowedTypes[j].trim().substring(1, arrAllowedTypes[j].length);

                                        if (files[i].type.indexOf(typeName) != -1) {
                                            if (attachmentType != undefined) {
                                                for (var z = 0; z < scope.attachmentTypes.length; z++) {
                                                    if (files[i].type.indexOf("pd") != -1 && (attachmentType.code == 141 || attachmentType.code == 402 || attachmentType.code == 611 || attachmentType.code == 401)) {
                                                        isNotAllowedTypePdf = true;
                                                    }
                                                    //Bug#:577435: eChannels\Companies\Work-Residence\Transfer to Court Request - Sharjah: Transfer to the Respective Court Request and Pledge (Required) accepts jpeg, jpg and should only accept PDF.
                                                    //  attachmentType.code == 854 ==> Transfer to the Respective Court Request and Pledge (Required) 
                                                    else if ((files[i].type.indexOf("jpeg") != -1 || files[i].type.indexOf("jpg") != -1) && (attachmentType.code == 854)) {
                                                        isNotAllowedTypeJpgAndJpeg = true;
                                                    }
                                                    else {
                                                        isAllowedType = true;
                                                    }

                                                }
                                            }
                                            isAllowedType = true;
                                        }
                                    }
                                }
                            } else {
                                var commaSeperatedTypes = config.attachmentAllowedTypes.substring(1, config.attachmentAllowedTypes.length - 1);
                                var arrAllowedTypes = commaSeperatedTypes.split(',');
                                if (arrAllowedTypes) {
                                    for (j = 0; j < arrAllowedTypes.length; j++) {
                                        var typeName = arrAllowedTypes[j].trim().substring(1, arrAllowedTypes[j].length);
                                        var fileType = files[i].type;
                                        if (fileType.indexOf(typeName) != -1) {
                                            if (attachmentType != undefined) {
                                                for (var z = 0; z < scope.attachmentTypes.length; z++) {
                                                    //if (fileType.indexOf("pd") != -1 && scope.attachmentTypes[z].code == attachmentType.code && scope.attachmentTypes[z].icaAttachment != undefined && scope.attachmentTypes[z].icaAttachment == true) {
                                                    //    isNotAllowedTypePdf = true;
                                                    //}
                                                    if (fileType.indexOf("pd") != -1 && (attachmentType.code == 141 || attachmentType.code == 402 || attachmentType.code == 611 || attachmentType.code == 401)) {
                                                        isNotAllowedTypePdf = true;
                                                    }
                                                    //Bug#:577435: eChannels\Companies\Work-Residence\Transfer to Court Request - Sharjah: Transfer to the Respective Court Request and Pledge   accepts jpeg, jpg and should only accept PDF.
                                                    //  attachmentType.code == 854 ==> Transfer to the Respective Court Request and Pledge
                                                    else if ((files[i].type.indexOf("jpeg") != -1 || files[i].type.indexOf("jpg") != -1) && (attachmentType.code == 854)) {
                                                        isNotAllowedTypeJpgAndJpeg = true;
                                                    }
                                                    else {
                                                        isAllowedType = true;
                                                    }

                                                }
                                            }
                                            isAllowedType = true;

                                        }
                                    }
                                }
                            }

                            if (isNotAllowedTypeJpgAndJpeg) {
                                var options = {
                                    type: "error", isSticky: true, messageKey: ($translate.instant("NotAllowedBasedOnPassedType") + " " + "(pdf)"), titleKey: '', localizationControllers: ['notAllowedType', 'request']
                                };
                                notificationsService.showNotification(options);
                                return;
                            }

                            if (isNotAllowedTypePdf) {
                                var options = {
                                    type: "error", isSticky: true, messageKey: ($translate.instant("NotAllowedBasedOnPassedType") + " " + "(jpeg , jpg)"), titleKey: '', localizationControllers: ['notAllowedType', 'request']
                                };
                                notificationsService.showNotification(options);
                                return;
                            }

                            if (isNotAllowedTypePdf) {
                                var options = {
                                    type: "error", isSticky: true, messageKey: ($translate.instant("NotAllowedBasedOnPassedType") + " " + "(jpeg , jpg)"), titleKey: '', localizationControllers: ['notAllowedType', 'request']
                                };
                                notificationsService.showNotification(options);
                                return;
                            }
                            if (scope.allowedAttachmentTypes && !isAllowedType) {
                                var options = {
                                    type: "error", isSticky: true, messageKey: ($translate.instant("NotAllowedBasedOnPassedType") + " " + scope.allowedAttachmentTypes), titleKey: '', localizationControllers: ['notAllowedType', 'request']
                                };
                                notificationsService.showNotification(options);
                                return;
                            }
                            else if (!isAllowedType) {
                                var options = {
                                    type: "error", isSticky: true, messageKey: $translate.instant("NotAllowedType"), titleKey: '', localizationControllers: ['notAllowedType', 'request']
                                };
                                notificationsService.showNotification(options);
                                return;
                            }


                            //if (!scope.checkTotalMaxSize(attachment)) {
                            //    var maxSizeOfAttachment = "9";
                            //    if ($stateParams.serviceTransactionId &&
                            //        lookups.icaAndResiServiceTransactions.includes(parseInt($stateParams.serviceTransactionId))) {
                            //        maxSizeOfAttachment = "4.5";
                            //    }
                            //    var options = {
                            //        type: "error", isSticky: true, messageKey: ($translate.instant("MaxSizeOfAttachment") + maxSizeOfAttachment + " MB"), titleKey: '', localizationControllers: ['MaxSizeOfAttachment', 'request']
                            //    };
                            //    notificationsService.showNotification(options);
                            //    return;
                            //}

                            attachment.originalFileName = attachment.attachmentFile.name;
                            attachment.typeChanged = false;
                            if ($stateParams.serviceTransactionId == lookups.ServiceTransactions.renewPassportEidaPackage) {
                                if (isFromUpload) {
                                    attachment.enableUpload = true;
                                } else {
                                    attachment.enableUpload = false;
                                }
                            }


                            if (attachmentType != null) {
                                attachment.attachmentTypeId = attachmentType.id;

                                scope.attachments.push(attachment);
                                scope.changeType(attachment, attachmentType, null);
                            }
                            else {
                                scope.attachments.push(attachment);
                            }

                            scope.setMaxFiles();

                        }

                        scope.lastUploadedAttachment = [];
                        scope.lastUploadedAttachment = scope.attachments;
                        if (scope.callback)
                            scope.callback();

                    }

                    if (files && files.length > 0) {

                        // This Code to handle  Integration optioal attachment Style if uploaded from user , to be in green color
                        if (attachmentType && attachmentType.isMandatory == false && attachmentType.hasIntegration && !attachmentType.integrationDetailsFound) {
                            //Attachment Title Text
                            var textElement = document.getElementById('attachmentTitlespan' + attachmentType.id);
                            if (textElement) {
                                textElement.style.color = "rgb(81,171,155)";
                            }
                            // (Optional / Required ) Text
                            var attachmentOptionalElement = document.getElementById('attachmentOptionalspan' + attachment.attachmentType.id);
                            if (attachmentOptionalElement) {
                                attachmentOptionalElement.style.color = "rgb(81,171,155)";
                            }

                        }
                    }



                }

                scope.delete = function (attachment) {

                    scope.enhancedPersonalPhotoBase64String = undefined; // for TICAO
                    scope.validationErrors = undefined;  // for TICAO

                    if (scope.requestDraft != null && scope.requestDraft != undefined && !scope.requestDraft.deletedAttachments) {
                        scope.requestDraft.deletedAttachments = [];
                    }

                    if (attachment) {
                        if (attachment.attachmentTypeId == 141 || attachment.attachmentTypeId == 402 || attachment.attachmentTypeId == 611 || attachment.attachmentTypeId == 401) {
                            scope.invalidPersonalImageSizeAndResolution = false;
                        }
                        if (attachment.attachmentTypeId === 141) {
                            $rootScope.$emit('personalImageDeleted', attachment);
                        }
                    }
                    //window.showConfirm({
                    //    title: $translate.instant("AttachmentDeleteConfirmationTitle"), body: $translate.instant("AttachmentDeleteConfirmationMSG")
                    //}, function (operation) {
                    //    if (operation) {
                    var index = scope.attachments.indexOf(attachment);
                    scope.attachments.splice(index, 1);
                    scope.setMaxFiles();
                    if (attachment.token) {
                        scope.requestDraft.deletedAttachments.push(attachment);
                    }

                    // This Code to handle  Integration optioal attachment Style if deleted from user , to be in gray color
                    if (attachment && attachment.attachmentType && attachment.attachmentType.isMandatory == false && attachment.attachmentType.hasIntegration && !attachment.attachmentType.integrationDetailsFound) {
                        var textElement = document.getElementById('attachmentTitlespan' + attachment.attachmentType.id);
                        if (textElement) {
                            textElement.style.color = "#808080";
                        }
                        var attachmentOptionalElement = document.getElementById('attachmentOptionalspan' + attachment.attachmentType.id);
                        if (attachmentOptionalElement) {
                            attachmentOptionalElement.style.color = "#808080";
                        }
                    }
                }


                function create_blob(file, callback) {
                    var reader = new FileReader();
                    reader.onload = function () { callback(reader.result) };
                    reader.readAsDataURL(file);

                }

                $rootScope.personal = false;

                function setCropParamters(blob_string) {

                    scope.options = {};
                    // scope.options.viewSizeWidth = 600;      // canvas size default 480 or 30% 50% 80%...
                    //  scope.options.viewSizeHeight = 600;
                    scope.options.outputImageRatioFixed = true;
                    scope.imageOut = '';
                    scope.showCropImageTool = true;
                    scope.options.image = blob_string;
                    scope.options.viewShowCropTool = true;

                    if ($rootScope.attachemtnId == 141 || $rootScope.attachemtnId == 401 || $rootScope.attachemtnId == 402 || $rootScope.attachemtnId == 611) {
                        $rootScope.personal = true;
                        scope.imageCropperInternal.uploadImage(blob_string);
                        $rootScope.personal = false;
                    }
                    else {
                        scope.imageCropperInternal.uploadImage(blob_string);
                    }


                    scope.$apply();

                }

                scope.showEditButton = function (attachment) {
                    // ticao
                    if (scope.ticaoIsEnabled()) return false;

                    if ($stateParams.serviceTransactionId == lookups.ServiceTransactions.renewPassportEidaPackage) {
                        return false;
                    }
                    if ((attachment.attachmentFile != null && fileService.isImage(attachment.attachmentFile.type)) || fileService.isImage(attachment.attachmentFileMIMEType)) {
                        return true;
                    }
                    else {
                        return false;
                    }

                }
                scope.modify = function (attachment) {
                    if (attachment.attachmentTypeId == 141) {
                        localStorage.setItem('personalImage', true);
                    } else {
                        localStorage.setItem('personalImage', false);
                    }

                    if ((attachment.attachmentFile != null && fileService.isImage(attachment.attachmentFile.type)) || fileService.isImage(attachment.attachmentFileMIMEType)) {
                        $rootScope.attachemtnId = attachment.attachmentTypeId;
                        if (attachment.attachmentFile == null) {
                            attachmentService.getAttachmentFileAsBlob(attachment.id, attachment.token, function (blob) {

                                attachment.attachmentFile = blob;
                                scope.modifiedAttachment = attachment;
                                create_blob(attachment.attachmentFile, setCropParamters);
                            });
                        }
                        else {
                            $rootScope.attachemtnId = attachment.attachmentTypeId;
                            scope.modifiedAttachment = attachment;
                            create_blob(attachment.attachmentFile, setCropParamters);
                        }
                    }

                }

                scope.internalControl.getUnSelectedAttachments = function () {
                    var selectedTypes = scope.internalControl.getSelectedAttachments();
                    var notSelectedTypes = [];

                    if (scope._attachmentTypes) {
                        for (i = 0; i < scope._attachmentTypes.length; i++) {
                            var exist = false;
                            if (selectedTypes) {
                                for (x = 0; x < selectedTypes.length; x++) {
                                    if (selectedTypes[x] != undefined) {
                                        if (selectedTypes[x].id == scope._attachmentTypes[i].id)
                                            exist = true;
                                    } else {
                                        var options = {
                                            type: "error", isSticky: true, messageKey: $translate.instant("RemoveUnSelectedAttachments"), titleKey: '', localizationControllers: ['notAllowedType', 'request']
                                        };
                                        notificationsService.showNotification(options);
                                        return;
                                    }

                                }
                            }

                            if (!exist)
                                notSelectedTypes.push(scope._attachmentTypes[i]);
                        }
                    }


                    return notSelectedTypes;
                }

                scope.internalControl.getRestrictedAttachments = function () {

                    return true;

                    var isAttachmentsFounded = true;
                    var listOfRestrictedServiceTransId = [122, 121, 120, 57, 58, 59, 36, 37, 38, 502, 503, 504, 505, 506, 507, 1094, 1095, 1093, 1096, 1092, 563, 879, 1210, 1212];
                    var listOfRestrictedAdminRegionId = [1, 8, 9];

                    if (listOfRestrictedAdminRegionId.includes(parseInt(scope.requestDraft.administrativeRegionId))) {
                        if (listOfRestrictedServiceTransId.includes(parseInt(scope.requestDraft.serviceTransactionId))) {

                            for (x = 0; x < scope.attachmentTypes.length; x++) {
                                if (scope.attachmentTypes[x] && scope.attachmentTypes[x].id) {
                                    //if (scope.attachmentTypes[x].id == 122 || scope.attachmentTypes[x].id == 49
                                    //    || scope.attachmentTypes[x].id == 50 || scope.attachmentTypes[x].id == 24) {
                                    //    if (!scope.attachmentTypes[x].integrationDetailsFound && scope.isOlderThan(18) && scope.attachmentTypes[x].isMandatory) {
                                    //        var options = {
                                    //            type: "error", isSticky: true, messageKey: $translate.instant("MidicalFitnessNotExists1") + " " + scope.getIdentityNumber() + " " + $translate.instant("MidicalFitnessNotExists2"), titleKey: '', localizationControllers: ['notAllowedType', 'request']
                                    //        };
                                    //        notificationsService.showNotification(options);
                                    //        isAttachmentsFounded = false;
                                    //    }
                                    //}
                                    if (scope.attachmentTypes[x].id == 190 || scope.attachmentTypes[x].id == 102 || scope.attachmentTypes[x].id == 800 ||
                                        scope.attachmentTypes[x].id == 358) {
                                        if (!scope.attachmentTypes[x].integrationDetailsFound && scope.attachmentTypes[x].isMandatory) {
                                            var options = {
                                                type: "error", isSticky: true, messageKey: $translate.instant("TawtheeqNotExists1") + " " + $translate.instant("TawtheeqNotExists2"), titleKey: '', localizationControllers: ['notAllowedType', 'request']
                                            };
                                            notificationsService.showNotification(options);
                                            isAttachmentsFounded = false;
                                        }
                                    }
                                    //if (scope.attachmentTypes[x].id == 45) {
                                    //    if (!scope.attachmentTypes[x].integrationDetailsFound && scope.attachmentTypes[x].isMandatory) {
                                    //        var options = {
                                    //            type: "error", isSticky: true, messageKey: $translate.instant("EIDANotExists1"), titleKey: '', localizationControllers: ['notAllowedType', 'request']
                                    //        };
                                    //        notificationsService.showNotification(options);
                                    //        isAttachmentsFounded = false;
                                    //    }
                                    //}
                                }
                            }
                        }
                    }
                    return isAttachmentsFounded;
                }

                scope.internalControl.getSelectedAttachments = function () {

                    var selectedTypes = [];
                    if (scope._attachmentTypes && scope.attachments) {

                        if (scope._attachmentTypes && scope.attachments) {

                            for (x = 0; x < scope.attachments.length; x++) {

                                if (scope.attachments[x] && scope.attachments[x].attachmentTypeId) {

                                    if (selectedTypes.indexOf(scope.attachments[x].attachmentTypeId) < 0)

                                        selectedTypes.push((scope._attachmentTypes.filter(
                                            function (attachmentType) {
                                                if (attachmentType.id == scope.attachments[x].attachmentTypeId) {
                                                    return true;
                                                }
                                                else {
                                                    return false;
                                                }

                                            }))[0]);
                                }
                            }
                        }
                    }

                    return selectedTypes
                }

                scope.previewAttachmentImage = function (attachment) {

                    if ((attachment.attachmentFile != null && fileService.isImage(attachment.attachmentFile.type)) || fileService.isImage(attachment.attachmentFileMIMEType)) {


                        if (attachment.attachmentFile == null) {

                            attachmentService.getAttachmentFileAsBlob(attachment.id, attachment.token, function (blob) {

                                scope.viewImage = true;
                                attachment.attachmentFile = blob;
                                scope.attachmentToView = attachment;
                            });
                        }
                        else {
                            scope.viewImage = true;
                            scope.attachmentToView = attachment;
                        }
                    }

                }

                scope.downloadAttachment = function (attachment) {


                    if (attachment.id && attachment.token) {

                        attachmentService.getAttachmentFileAsBlob(attachment.id, attachment.token, function (blob) {

                            attachment.attachmentFile = blob;


                            fileService.downloadFile(blob, attachment.name + '.' + mime.extension(blob.type));
                        });

                    }
                    else if (attachment.attachmentFile) {

                        fileService.downloadFile(attachment.attachmentFile, attachment.name + '.' + mime.extension(attachment.attachmentFile.type));
                    }
                }

                scope.$watch('nameTemplate', function (newValue) {
                    if (scope.attachments)
                        for (x = 0; x < scope.attachments.length; x++) {
                            scope.changeAttachmentName(x);
                        }
                });

                scope.$watch('showExceptionCategory', function () {
                    scope.checkAttachmentTypes();
                    scope.setMaxFiles();
                });

                scope.$watch('attachmentTypes', function () {
                    scope.checkAttachmentTypes();
                    scope.setMaxFiles();
                    if ($stateParams.serviceTransactionId && ($stateParams.serviceTransactionId == lookups.ServiceTransactions.familyUnifiedFormIssuance ||
                        $stateParams.serviceTransactionId == lookups.ServiceTransactions.familyUnifiedFormRenewal)) {
                        //set time out throw an issue when we have more than one attachment component injected.
                        scope.setIntegrationDetails();
                    }
                    else {
                        setTimeout(function () {
                            scope.setIntegrationDetails();
                        }, 500);
                    }
                });

                scope.$watch('attachments', function () {
                    scope.setMaxFiles();
                });

                scope.setMaxFiles = function () {
                    if (scope.attachments && scope._attachmentTypes)
                        scope.maxFiles = (scope._attachmentTypes.length - scope.attachments.length);
                    else if (scope._attachmentTypes)
                        scope.maxFiles = scope._attachmentTypes.length;
                    else
                        scope.maxFiles = 0;

                };

                function getAttachmentSize(callback) {
                    //if (!scope.attachments || scope.attachments.length == 0) {
                    callback();
                    return;
                    //}
                    //var index = 0;
                    //angular.forEach(scope.attachments, function (objAttachment) {
                    //    if (objAttachment.id && objAttachment.token) {
                    //        attachmentService.getAttachmentFileAsBlob(objAttachment.id, objAttachment.token, function (blob) {

                    //            objAttachment.attachmentFile = blob;
                    //            index++;
                    //            if (scope.attachments.length == index) {
                    //                callback();
                    //            }
                    //        });
                    //    }
                    //    else {
                    //        index++;
                    //        if (scope.attachments.length == index)
                    //            callback();

                    //    }
                    //});
                }


                scope.checkTotalMaxSize = function (attachment) {
                    var maxSizeOfAttachment = config.maxSizeOfAttachment;
                    var totalAttachmentSize = 0;
                    if ($stateParams.serviceTransactionId &&
                        lookups.icaAndResiServiceTransactions.includes(parseInt($stateParams.serviceTransactionId))) {
                        maxSizeOfAttachment = maxSizeOfAttachment / 2;
                    }
                    if (attachment && attachment.attachmentFile && attachment.attachmentFile.size) {
                        totalAttachmentSize = attachment.attachmentFile.size;
                    }
                    if (scope.attachments && maxSizeOfAttachment) {
                        angular.forEach(scope.attachments, function (objAttachment) {
                            if (objAttachment.attachmentFile && objAttachment.attachmentFile.size) {
                                totalAttachmentSize = totalAttachmentSize + objAttachment.attachmentFile.size;
                            }
                        });

                        if (totalAttachmentSize > maxSizeOfAttachment) {
                            return false;
                        }
                    }
                    return true;
                };


                scope.checkAttachmentTypes = function () {

                    if (scope.attachmentTypes) {
                        var filteredattachments = [];
                        for (x = 0; x < scope.attachmentTypes.length; x++) {
                            if (scope.establishmentInfo && !scope.establishmentInfo.isHotelEstablishment &&
                                scope.attachmentTypes[x].code == lookups.attachmentTypes.employmentContract &&
                                (scope.requestDraft.serviceTransactionId == lookups.ServiceTransactions.issueResidence_Work_PrivateSector ||
                                    scope.requestDraft.serviceTransactionId == lookups.ServiceTransactions.renewResidence_Work_PrivateSector)) {
                                continue;
                            }
                            if (scope.showExceptionCategory && scope.showExceptionCategory != "false")
                                scope.attachmentTypes[x].isMandatory = false;

                            if (scope.attachmentTypes[x].attachmentCategoryId == 2) {
                                if (scope.showExceptionCategory)
                                    filteredattachments.push(scope.attachmentTypes[x]);
                            }
                            else
                                filteredattachments.push(scope.attachmentTypes[x]);
                        }
                        //sort by isMandatory
                        filteredattachments.sort(function (a, b) { return b.isMandatory - a.isMandatory });
                        if (scope.currentUserApplicationId == lookups.application.etihad) {
                            filteredattachments = filteredattachments.filter(x => x.id != lookups.attachmentTypes.etihadTourGuide);
                            scope.attachments = scope.attachments.filter(x => x.attachmentTypeId != lookups.attachmentTypes.etihadTourGuide)
                        }

                        scope._attachmentTypes = filteredattachments;
                        var sortAttachments = (scope._attachmentTypes.filter(a => (a.attachmentCategoryId != 3 && a.attachmentCategoryId != 2 && !scope.isExtraAttachment(a.code)))).concat(scope._attachmentTypes.filter(a => a.attachmentCategoryId == 3 || scope.isExtraAttachment(a.code))).concat(scope._attachmentTypes.filter(a => a.attachmentCategoryId == 2));
                        scope._attachmentTypes = sortAttachments;
                        scope.enableCategorizeAttachment = window.config.enableCategorizeAttachment;

                        scope.applicantAttachment = [];
                        scope.beneficiaryAttachment = [];
                        scope.otherAttachment = [];
                        if (scope.enableCategorizeAttachment) {

                            scope.beneficiaryAttachment = (scope._attachmentTypes.filter(a => (a.categorizeAttachment == 1 && !scope.isExtraAttachment(a.code))));
                            scope.applicantAttachment = (scope._attachmentTypes.filter(a => (a.categorizeAttachment == 2)));
                            scope.otherAttachment = (scope._attachmentTypes.filter(a => (a.categorizeAttachment == 3 && !scope.isExtraAttachment(a.code))));
                            if (scope.applicantAttachment.length > 0 || scope.beneficiaryAttachment.length > 0 || scope.otherAttachment.length > 0) {
                                var sortAttachments = (scope.beneficiaryAttachment.filter(a => a.categorizeAttachment == 1)).concat(scope.applicantAttachment.filter(a => a.categorizeAttachment == 2)).concat(scope.otherAttachment.filter(a => a.categorizeAttachment == 3));
                                scope._attachmentTypes = sortAttachments;
                            }
                        }

                        if (scope.attachmentTypes.filter(x => x.id == 141).length > 0)
                            scope.hasPersonalPhoto = true;
                    }
                }

                scope.changeType = function (attachment, attachmentType, attachmentsType) {
                    //// not allowed PDF for icaAttachment
                    //if (attachmentsType) {
                    //    if (attachmentsType.length > 0) {
                    //        for (var i = 0; i < attachmentsType.length; i++) {
                    //            if (attachment) {
                    //                if (attachment.attachmentTypeId == attachmentsType[i].id) {
                    //                    if (attachment.attachmentFile.type) {
                    //                        if (attachmentsType[i].icaAttachment && attachment.attachmentFile.type.indexOf('pd') != -1) {
                    //                            var options = {
                    //                                type: "error", isSticky: true, messageKey: ($translate.instant("NotAllowedBasedOnPassedType") + " " + "(jpeg , jpg)"), titleKey: '', localizationControllers: ['notAllowedType', 'request']
                    //                            };

                    //                            notificationsService.showNotification(options);
                    //                            attachment.attachmentTypeId = null;
                    //                            attachment.name = "";
                    //                            return;
                    //                        }
                    //                    }

                    //                }
                    //            }
                    //        }
                    //    }
                    //}

                    if (attachmentType)
                        attachment.attachmentType = attachmentType;

                    attachment.typeChanged = true;

                    var index = scope.attachments.indexOf(attachment);

                    scope.changeAttachmentName(index);
                }

                scope.changeAttachmentName = function (index) {
                    scope.cropPhotoIndex = null
                    if (scope._attachmentTypes) {
                        scope.attachments[index].name = undefined;
                        for (i = 0; i < scope._attachmentTypes.length; i++) {

                            if (scope.attachments[index].attachmentTypeId == scope._attachmentTypes[i].id) {
                                //Check if the attachment type is valid type
                                //get file extension
                                if (scope._attachmentTypes[i].allowedMimeType) {
                                    var selectedAttachmentType = scope.attachments[index].attachmentFile ? scope.attachments[index].attachmentFile.type : scope.attachments[index].attachmentFileMIMEType;
                                    if (scope._attachmentTypes[i].allowedMimeType.indexOf(selectedAttachmentType) == -1) {

                                        //var options = { type: "error", duration: 5000, messageBody: $translate.instant('allowedAttachmentTypes'), titleBody: "" };
                                        var options = { type: "error", isSticky: true, messageBody: $translate.instant("allowedAttachmentTypes"), titleKey: '' };
                                        notificationsService.showNotification(options);
                                        return;
                                    }
                                }
                                //type for personal photo check the photo size and reselution
                                if (window.config.allowIcaoValidationForAdditionalServices && scope.checkIcaoForAdditionalService && scope._attachmentTypes[i].id == 141) {

                                    var photoIndex = i;
                                    scope.cropPhotoIndex = index
                                    scope.attachments[index].enabled = false;
                                    var personAge = getAge();
                                    GeneralCheckForPersonalPhotoICAO(scope.attachments[index], function () {
                                        scope.attachments[index].name = scope.nameTemplate.replace('{type}', scope._attachmentTypes[photoIndex].text);
                                        scope.attachments[index].enabled = scope.isExtraAttachment(scope._attachmentTypes[photoIndex].code);
                                        return;
                                    })
                                }
                                if (scope._attachmentTypes[i].id == 141 || scope._attachmentTypes[i].id == 401 || scope._attachmentTypes[i].id == 402 || scope._attachmentTypes[i].id == 611) {
                                    var photoIndex = i;
                                    scope.cropPhotoIndex = index
                                    scope.attachments[index].enabled = false;
                                    var personAge = 0;
                                    if (scope.requestDraft && scope.requestDraft.request && scope.requestDraft.request.dateOfBirth &&
                                        ($stateParams.serviceTransactionId == lookups.ServiceTransactions.issuePassport ||
                                            $stateParams.serviceTransactionId == lookups.ServiceTransactions.issuePassportFromOutsideUae ||
                                            $stateParams.serviceTransactionId == lookups.ServiceTransactions.newPassportReplacementService)) {
                                        personAge = getAge();
                                    }
                                    else if ($stateParams.serviceTransactionId == lookups.ServiceTransactions.issuePassport ||
                                        $stateParams.serviceTransactionId == lookups.ServiceTransactions.replacePassport ||
                                        $stateParams.serviceTransactionId == lookups.ServiceTransactions.newPassportReplacementService ||
                                        $stateParams.serviceTransactionId == lookups.ServiceTransactions.issuePassportFromOutsideUae) {
                                        personAge = 1;// date if birth not exist on passport services
                                    }
                                    else
                                        personAge = getAge();

                                    //if (window.config.ServiceTransactionUsedICAO.filter(c => c == $stateParams.serviceTransactionId).length > 0
                                    //  && personAge != -1 && personAge > 0) {
                                    GeneralCheckForPersonalPhotoICAO(scope.attachments[index], function () {
                                        scope.attachments[index].name = scope.nameTemplate.replace('{type}', scope._attachmentTypes[photoIndex].text);
                                        scope.attachments[index].enabled = scope.isExtraAttachment(scope._attachmentTypes[photoIndex].code);
                                        return;
                                    })
                                    //  }
                                    //else {
                                    //    GeneralCheckForPersonalPhoto(scope.attachments[index], "WithOutIcao", function () {
                                    //        scope.attachments[index].name = scope.nameTemplate.replace('{type}', scope._attachmentTypes[photoIndex].text);
                                    //        scope.attachments[index].enabled = scope.isExtraAttachment(scope._attachmentTypes[photoIndex].code);
                                    //        return;
                                    //    })
                                    //}

                                }
                                else {

                                    if (scope.invalidPersonalImageSizeAndResolution != true)
                                        scope.invalidPersonalImageSizeAndResolution = false;

                                    if (scope.nameTemplate) {


                                        scope.attachments[index].name = scope.nameTemplate.replace('{type}', scope._attachmentTypes[i].text);
                                        scope.attachments[index].enabled = scope.isExtraAttachment(scope._attachmentTypes[i].code);
                                    }
                                }
                            }
                        }
                        scope.lastUploadedAttachment = [];
                        scope.lastUploadedAttachment = scope.attachments;
                        if (scope.callback)
                            scope.callback();
                    }
                }

                scope.getThumb = function (attachment) {
                    if (!attachment) return;

                    function safeApply() {
                        if (!scope.$$phase && !scope.$root.$$phase) {
                            scope.$apply();
                        } else {
                            scope.$evalAsync(); // يضيفها للدورة الحالية أو الجاية
                        }
                    }

                    if (fileService.isImage(attachment.attachmentFileMIMEType) ||
                        (attachment.attachmentFile && fileService.isImage(attachment.attachmentFile.type))) {

                        if (attachment.token) {

                            if (!attachment.name) {
                                attachment.name = attachment.originalFileName;
                            }

                            if (attachment.attachmentTypeId == 141) {
                                attachmentService.getAttachmentFileAsBlob(attachment.id, attachment.token, function (blob) {
                                    attachment.attachmentThumbnail = blob;
                                    $rootScope.$emit('previewPersonalImage', attachment);
                                    safeApply();
                                });
                            } else {
                                fileService.getBase64FromImageUrl("../images/jpg_thumb.png", function (dataURL) {
                                    attachment.attachmentThumbnail = fileService.dataURItoBlob(dataURL);
                                    safeApply();
                                });
                            }
                        } else {
                            attachment.attachmentThumbnail = attachment.attachmentFile;
                            if (attachment.attachmentTypeId == 141) {
                                $rootScope.$emit('previewPersonalImage', attachment);
                            }
                            safeApply();
                        }

                    } else if (fileService.isPDF(attachment.attachmentFileMIMEType) ||
                        (attachment.attachmentFile && fileService.isPDF(attachment.attachmentFile.type))) {

                        fileService.getBase64FromImageUrl("../images/pdf-thumb.png", function (dataURL) {
                            attachment.attachmentThumbnail = fileService.dataURItoBlob(dataURL);
                            if (attachment.attachmentTypeId == 141) {
                                $rootScope.$emit('previewPersonalImage', attachment);
                            }
                            safeApply();
                        });
                    }
                };


                function displayImagesOnPage(successful, mesg, response) {
                    if (successful && response) {
                        var scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
                        for (var i = 0; (scannedImages instanceof Array) && i < scannedImages.length; i++) {
                            if (scope.maxFiles > 0) {
                                var scannedImage = scannedImages[i];
                                scope.attachments.push({ attachmentFile: fileService.blobToFile(fileService.dataURItoBlob(scannedImage.src)) });
                                scope.setMaxFiles();
                                scope.$apply();
                            }
                        }

                    }
                    scope.scanLoader = false;
                    scope.$apply();
                }

                if (scope.invalidPersonalImageSizeAndResolution != true)
                    scope.invalidPersonalImageSizeAndResolution = false;

                function checkPersonalPhoto(attachments, callback) {
                    if (!attachments.token) {
                        var fd = new FormData();

                        //check if attachment type object and it is blob
                        if (typeof attachments.attachmentFile === 'object') {
                            var uploadedFileName = 0;
                            fd.append(uploadedFileName, attachments.attachmentFile);

                            //will be used to map every attachment to its file
                            attachments.uploadedFileName = 0;

                            fd.append('attachment', angular.toJson(attachments));
                        }

                        var options = {
                            success: function (result) {
                                if (result.errorMessage == "INVALID_PERSONAL_IMAGE_SIZE_AND_RESOLUTION" || result.errorMessage == "") {
                                    scope.invalidPersonalImageSizeAndResolution = false;
                                    callback();
                                    scope.cropPhotoIndex = null
                                }
                                else {
                                    scope.invalidPersonalImageSizeAndResolution = true;

                                }
                            }
                        };

                        apiHelperService.postFormData('draft/check/personalPhoto', fd, options)
                    }
                }
                //ICAO CHECK

                //function checkICAOPersonalPhoto(attachments, callback)
                //{
                //    if (!attachments.token)
                //    {
                //        var fd = new FormData();
                //        //check if attachment type object and it is blob
                //        if (typeof attachments.attachmentFile === 'object') {
                //            var uploadedFileName = 0;
                //            fd.append(uploadedFileName, attachments.attachmentFile);

                //            //will be used to map every attachment to its file
                //            attachments.uploadedFileName = 0;

                //            fd.append('attachment', angular.toJson(attachments));
                //        }
                //        var options = {
                //            success: function (result) {
                //                if (result.errorMessage != "")
                //                {
                //                    scope.invalidICAOPersonalImageSizeAndResolution = true;
                //                }
                //                else
                //                {
                //                    scope.invalidICAOPersonalImageSizeAndResolution = false;
                //                    callback();
                //                }
                //            }
                //        };
                //        apiHelperService.postFormData('draft/check/personalICAOPhoto', fd, options)
                //    }
                //}
                function GeneralCheckForPersonalPhotoICAO(attachments, callback) {
                    if (!attachments.token) {
                        var fd = new FormData();
                        //check if attachment type object and it is blob
                        if (typeof attachments.attachmentFile === 'object') {
                            var uploadedFileName = 0;
                            fd.append(uploadedFileName, attachments.attachmentFile);

                            //will be used to map every attachment to its file
                            attachments.uploadedFileName = 0;

                            fd.append('attachment', angular.toJson(attachments));
                        }
                        var draftNumber = 'null';
                        if (scope.requestDraft && scope.requestDraft.requestNumber) {
                            draftNumber = scope.requestDraft.requestNumber;
                        }
                        var options = {
                            success: function (result) {

                                if (result.errorMessage != "" && result.errorMessage != undefined) {
                                    if (result.errorMessage.toLowerCase() == "personal_icao_photo_worning_message") {
                                        scope.invalidICAOPersonalImageSizeAndResolution = true;
                                        scope.delete(attachments);
                                    }
                                    else {
                                        if (result.errorMessage == "INVALID_PERSONAL_IMAGE_SIZE_AND_RESOLUTION_LESS_THAN_200" ||
                                            result.errorMessage == "INVALID_PERSONAL_IMAGE_CONTENT") {
                                            var options = {
                                                type: "error", isSticky: true, messageKey: $translate.instant(result.errorMessage), titleKey: ''
                                            };
                                            notificationsService.showNotification(options);

                                            var lastAttachment = scope.attachments[scope.attachments.length - 1];
                                            if (lastAttachment.attachmentTypeId == 141 || lastAttachment.attachmentTypeId == 402 || lastAttachment.attachmentTypeId == 611 || lastAttachment.attachmentTypeId == 401) {
                                                if (result.errorMessage == "INVALID_PERSONAL_IMAGE_SIZE_AND_RESOLUTION_LESS_THAN_200"
                                                    || result.errorMessage == "INVALID_PERSONAL_IMAGE_CONTENT") {
                                                    var index = scope.attachments.indexOf(x);
                                                    scope.attachments.splice(index, 1);
                                                    scope.setMaxFiles();

                                                }
                                            }
                                        }
                                        else {
                                            scope.invalidPersonalImageSizeAndResolution = true;
                                            if (attachments.attachmentTypeId == 141 || attachments.attachmentTypeId == 402 || attachments.attachmentTypeId == 611 || attachments.attachmentTypeId == 401) {

                                                scope.modify(attachments);
                                            }
                                        }

                                    }

                                }
                                else {

                                    if (result?.isValidated && result?.validationErrors !== null) {
                                        scope.showTICAOPersonalPhotoDailog = true;
                                        scope.validationErrors = result.validationErrors;
                                        if (result?.enhancedPersonalPhotoBase64String !== null) {
                                            scope.enhancedPersonalPhotoBase64String = result.enhancedPersonalPhotoBase64String;
                                        }
                                        else {
                                            scope.enhancedPersonalPhotoBase64String = undefined;
                                        }
                                    }
                                    else {
                                        scope.showTICAOPersonalPhotoDailog = false;
                                        scope.enhancedPersonalPhotoBase64String = undefined;
                                        scope.validationErrors = undefined;
                                    }

                                    scope.personalPhotoBase64String = result?.personalPhotoBase64String;

                                    $rootScope.attachemtnId = attachments.attachmentTypeId;
                                    scope.modifiedAttachment = attachments;

                                    scope.invalidICAOPersonalImageSizeAndResolution = false;
                                    scope.invalidPersonalImageSizeAndResolution = false;
                                    callback();
                                }
                            },
                            error: function (error) {
                                scope.delete(attachments);
                                if (!error?.[0]?.message) {
                                    var options = {
                                        type: "error", isSticky: true, messageKey: $translate.instant("uploadPersonalPhotoAgain"), titleKey: ''
                                    };
                                    notificationsService.showNotification(options);
                                }
                            }
                        };
                        apiHelperService.postFormData('draft/check/newPersonalPhoto/' + draftNumber + '?serviceTransactionId=' + ($stateParams.serviceTransactionId ? $stateParams.serviceTransactionId : 0), fd, options);
                        //if (imageType == "WithIcao") {
                        //    apiHelperService.postFormData('draft/check/newPersonalICAOPhoto/' + draftNumber, fd, options);
                        //}
                        //else if (imageType == "WithOutIcao") {
                        //    apiHelperService.postFormData('draft/check/personalPhoto', fd, options);
                        //}
                    } else {
                        callback();
                    }
                }
                scope.scan = function () {
                    if (scope.maxFiles == 0) {
                        var options = {
                            type: "error", isSticky: true, messageKey: $translate.instant("ExceededMaxSize"), titleKey: '', localizationControllers: ['exceededMaxSize', 'request']
                        };
                        notificationsService.showNotification(options);
                        return;

                    }
                    var scanRequest = {
                        "twain_cap_setting": {
                            "ICAP_PIXELTYPE": "TWPT_RGB", // Color
                            "ICAP_XRESOLUTION": "100", // DPI: 100
                            "ICAP_YRESOLUTION": "100",
                            "ICAP_SUPPORTEDSIZES": "TWSS_USLETTER" // Paper size: TWSS_USLETTER, TWSS_A4, ...
                        },
                        "output_settings": [{
                            "type": "return-base64",
                            "format": scope.scanFormat
                        }]
                    };
                    try {
                        scope.scanLoader = true;
                        scanner.initialize();
                        window.setTimeout(function () {
                            scanner.scan(displayImagesOnPage, scanRequest, false, false);
                        }, 2000);

                    } catch (e) {
                        displayImagesOnPage();
                    }
                }

                scope.isExtraAttachment = function (code) {
                    var extra = false;
                    angular.forEach(lookups.extraOptionalAttachments, function (extraAttachment) {
                        if (extraAttachment == code) {
                            extra = true;
                        }
                    });
                    angular.forEach(lookups.supportAttachmentsForExemptions, function (supportAttachment) {
                        if (supportAttachment == code) {
                            extra = true;
                        }
                    });

                    if (scope.attachmentTypes.filter(s => s.code == code)[0]?.hideOptionalAttachment) {
                        extra = true;
                    }
                    return extra;
                }

                scope.changeScanFormat = function () {
                    scope.scanFormat = "jpg";
                    if (document.getElementById('cbScanFormat').checked) {
                        scope.scanFormat = "pdf";
                    }
                }

                scope.cancelCrop = function () {
                    var lastAttachment = scope.attachments[scope.attachments.length - 1];
                    if (lastAttachment.attachmentTypeId == 141 || lastAttachment.attachmentTypeId == 402 || lastAttachment.attachmentTypeId == 611 || lastAttachment.attachmentTypeId == 401) {
                        if (scope.invalidPersonalImageSizeAndResolution) {
                            var index = scope.attachments.indexOf(x);
                            scope.attachments.splice(index, 1);
                        }
                    }

                    scope.showCropImageTool = false;
                    scope.$apply();
                }

                scope.cropImage = function (croppedImage) {
                    var lastAttachment = scope.attachments[scope.attachments.length - 1];
                    if (scope.cropPhotoIndex != null) {
                        lastAttachment = scope.attachments[scope.cropPhotoIndex];
                    }
                    scope.modifiedAttachment.attachmentFile = fileService.blobToFile(fileService.dataURItoBlob(croppedImage), scope.modifiedAttachment.attachmentFile.name);

                    checkPersonalPhoto(lastAttachment, function () {
                        if (!scope.invalidPersonalImageSizeAndResolution) {
                            var personalPhoto = scope.attachments.filter(attachment => (attachment.attachmentTypeId == 141 || attachment.attachmentTypeId == 401 || attachment.attachmentTypeId == 402 || attachment.attachmentTypeId == 611))[0];
                            var index = scope.attachments.indexOf(personalPhoto);
                            if (index >= 0) {
                                if (scope.cropPhotoIndex != null) {
                                    scope.attachments[scope.cropPhotoIndex].name = scope.nameTemplate.replace('{type}', scope.modifiedAttachment.originalFileName);
                                }
                                else {
                                    scope.attachments[index].name = scope.nameTemplate.replace('{type}', scope.modifiedAttachment.originalFileName);
                                }
                            }
                        }
                        return;
                    });

                    scope.modifiedAttachment.token = undefined;
                    scope.getThumb(scope.modifiedAttachment);
                    scope.showCropImageTool = false;
                    scope.$apply();

                }

                scope.replaceOrAddIntegrationDetail = function (result) {
                    var isIntegrationDetailFound = false;
                    for (var i = 0; i < scope.requestDraft.integrationDetails.length; i++) {
                        if (scope.requestDraft.integrationDetails[i].requestAttachmentId == result.requestAttachmentId) {
                            isIntegrationDetailFound = true;
                            scope.requestDraft.integrationDetails[i] = result;
                            break;
                        }
                    }
                    if (!isIntegrationDetailFound) {
                        scope.requestDraft.integrationDetails.push(result);
                    }
                }

                scope.getIntegrationDetails = function (attachmentType) {
                    attachmentType.loadIntegrationDetails = true;

                    var options = {
                        success: function (result) {
                            if (window.config.AllowDynamicIntegrationImageGeneration) {
                                const url = result?.base64Image;
                                if (url && url !== '') {
                                    let uploaded = false;

                                    for (var i = 0; i < scope.attachments.length; i++)
                                        if (uploaded === false && scope.attachments[i].attachmentTypeId == attachmentType.id)
                                            uploaded = true;

                                    if (uploaded === false) {
                                        let _mimeType = url.split(',')[0].split(':')[1].split(';')[0];
                                        fetch(url)
                                            .then(res => res.blob())
                                            .then(blob => {
                                                let file = new File([blob], scope.shortGuid(), { type: _mimeType });
                                                scope.uploadFiles([file], [], attachmentType);
                                            });
                                    }

                                }
                            }
                            attachmentType.loadIntegrationDetails = false;
                            if (attachmentType.id == 73 || attachmentType.id == 245 || attachmentType.id == 55 || attachmentType.id == 790) {
                                if (result.resultDataNode.nodes.length == 0) {
                                    scope.requestDraft.request.healthInsuranceUploadedFromIntegration = false;
                                    scope.showAuthorizedInsuranceCompany = true;
                                    //if (window.config.IsMandatoryHealthInsuranceIntegration) {
                                    //    if (window.config.PreventUserGoNextStepWhenFaildHealthInsuranceIntegration) {
                                    //        var options = { type: "error", duration: 1, messageBody: $translate.instant('insurancePolicyNotRetrieved'), titleBody: '' };
                                    //        notificationsService.showNotification(options);
                                    //    }
                                    //}

                                    //#region Feature 820738: Requesting Insurance from Shory from eChannels
                                    //show the link of Navigation To Medical Insurance Service

                                    if (scope.currentUserApplicationId === lookups.application.resident ||
                                        scope.currentUserApplicationId === lookups.application.citizen ||
                                        scope.currentUserApplicationId === lookups.application.gcc_citizen ||
                                        (scope.currentUserApplicationId === lookups.application.establishment &&
                                            lookups.navigationToMohreWorkServiceTransactionIdsForMedicalInsurance.includes(parseInt(scope.requestDraft.serviceTransactionId)))) {

                                        if (scope.requestDraft.requestNumber.substring(0, 2) == '00') { //draft
                                            apiHelperService.get('medicalInsurance/getShoryMedicalInsuranceSetup', {
                                                success: function (response) {
                                                    if (response && response?.enableProcess) {
                                                        if (scope.currentUserApplicationId === lookups.application.establishment) {
                                                            if (response?.enableNavigationForEstablishments)
                                                                scope.showNavigationToMedicalInsuranceService = true;
                                                            else
                                                                scope.showNavigationToMedicalInsuranceService = false;
                                                        }
                                                        else {
                                                            if (response?.enableNavigationForIndividual)
                                                                scope.showNavigationToMedicalInsuranceService = true;
                                                            else
                                                                scope.showNavigationToMedicalInsuranceService = false;
                                                        }
                                                    }
                                                    else
                                                        scope.showNavigationToMedicalInsuranceService = false;
                                                }
                                            });
                                        }
                                    }

                                    //#endregion
                                }
                                else scope.requestDraft.request.healthInsuranceUploadedFromIntegration = true;
                            }

                            if (result && result.resultDataNode.nodes.length > 0) {

                                attachmentType.integrationDetailsFound = true;
                                attachmentType.aegoveIntegrationClass = true;
                                attachmentType.integrationDetailsNoFound = false;
                                attachmentType.integrationDetailsLoadingFinished = true;

                                if (!scope.requestDraft.integrationDetails)
                                    scope.requestDraft.integrationDetails = [];
                                //scope.requestDraft.integrationDetails.push(result);
                                scope.replaceOrAddIntegrationDetail(result);

                                //================= if Mdical Exam attachement

                                if (attachmentType.id == 122 || attachmentType.id == 49 || attachmentType.id == 50 || attachmentType.id == 24 || attachmentType.id == 338) {
                                    if (scope.isOlderThan(18)) {
                                        for (j = 0; j < scope.requestDraft.integrationDetails.length; j++) {
                                            if (scope.requestDraft.integrationDetails[j].requestAttachmentId == attachmentType.id) {
                                                if (scope.requestDraft.integrationDetails[j].result != "NO_DATA_FOUND") {
                                                    attachmentType.integrationDetailsFound = true;
                                                    attachmentType.aegoveIntegrationClass = true;
                                                    for (index = 0; index < scope.requestDraft.integrationDetails[j].resultDataNode.nodes.length; index++) {
                                                        // check if Mdical Exam Expired
                                                        if (scope.requestDraft.integrationDetails[j].resultDataNode.nodes[index].lableCode == lookups.medicalHealthExamExpiryDateLable) {
                                                            if (scope.isExpired(scope.requestDraft.integrationDetails[j].resultDataNode.nodes[index].value)) {
                                                                scope.examResultCode = lookups.medicalHealthExamResultCode.expired;
                                                                var options = { type: "error", isSticky: true, messageBody: $translate.instant('mdicalExamResultExpired'), titleBody: '' };
                                                                notificationsService.showNotification(options);
                                                                break;
                                                            }
                                                        }
                                                        // get Mdical Exam Result Code
                                                        if (scope.requestDraft.integrationDetails[j].resultDataNode.nodes[index].lableCode == lookups.medicalHealthExamResultLable) {
                                                            scope.examResultCode = scope.requestDraft.integrationDetails[j].resultDataNode.nodes[index].value;
                                                            // Medical Exam Result is Fit - Code = 1
                                                            if (scope.examResultCode == lookups.medicalHealthExamResultCode.fit) {
                                                                attachmentType.isMandatory = false;
                                                                var options = { type: "success", duration: 1, messageBody: $translate.instant('mdicalExamResultFit'), titleBody: '' };
                                                                notificationsService.showNotification(options);
                                                                break;
                                                            }
                                                            // Medical Exam Result is Under Processing (Code = 3) or Expired (Code = 5) or not Found (Code = 6)
                                                            else if (scope.examResultCode == lookups.medicalHealthExamResultCode.underProcess || scope.examResultCode == lookups.medicalHealthExamResultCode.expired || scope.examResultCode == lookups.medicalHealthExamResultCode.noDataFound) {
                                                                attachmentType.isMandatory = true;
                                                                if (scope.examResultCode == lookups.medicalHealthExamResultCode.underProcess) {
                                                                    var options = { type: "warning", isSticky: true, messageBody: $translate.instant('mdicalExamResultUnderProcess'), titleBody: '' };
                                                                    notificationsService.showNotification(options);
                                                                }
                                                                break;
                                                            }
                                                            // Medical Exam Result is Fit for One Year - Code = 4
                                                            else if (scope.examResultCode == lookups.medicalHealthExamResultCode.fitOneYear) {
                                                                attachmentType.isMandatory = false;
                                                                scope.requestDraft.request.numberOfYears = 1;
                                                                var options = { type: "warning", isSticky: true, messageBody: $translate.instant('mdicalExamResultFitOneYear'), titleBody: '' };
                                                                notificationsService.showNotification(options);
                                                                break;
                                                            }
                                                            // Medical Exam Result is unFit (Code = 2) and Citizen\Sheikh and the residency codes is 3 and family relationship
                                                            else if (scope.examResultCode == lookups.medicalHealthExamResultCode.unfit &&
                                                                scope.isAllowedSponsorType(scope.requestDraft.request.sponsorTypeId) &&
                                                                scope.isFamilyMemberService(scope.requestDraft.serviceTransactionId) &&
                                                                scope.isAllowedMaritalStatus(scope.requestDraft.request.maritalStatusId)) {
                                                                attachmentType.isMandatory = false;
                                                                break;
                                                            }
                                                            // Medical Exam Result is Unfit - Code = 2
                                                            else if (scope.examResultCode == lookups.medicalHealthExamResultCode.unfit) {
                                                                attachmentType.isMandatory = true;
                                                                var options = { type: "error", duration: 1, messageBody: $translate.instant('mdicalExamResultUnfit'), titleBody: '' };
                                                                notificationsService.showNotification(options);
                                                                break;
                                                            }
                                                        }

                                                    }
                                                }
                                                else { //if no data found
                                                    isNoDataFound = true;
                                                    attachmentType.integrationDetailsFound = false;
                                                    attachmentType.aegoveIntegrationClass = false;
                                                    attachmentType.isMandatory = true;
                                                    scope.examResultCode = lookups.medicalHealthExamResultCode.noDataFound;
                                                    var options = { type: "error", duration: 1, messageBody: $translate.instant('mdicalExamResultNoDataFound'), titleBody: '' };
                                                    notificationsService.showNotification(options);
                                                }
                                                requestBody = scope.requestDraft.integrationDetails[j].requestBody;
                                                break;
                                            }
                                        }

                                    } else {
                                        attachmentType.isMandatory = false;
                                        scope.examResultCode = lookups.medicalHealthExamResultCode.ageUnder18;
                                        var options = { type: "info", duration: 1, messageBody: $translate.instant('mdicalExamResultAgeUnder18'), titleBody: '' };
                                        notificationsService.showNotification(options);
                                    }
                                }
                                //================= if Mdical Exam attachement End
                                else {
                                    attachmentType.isMandatory = false;
                                }

                            }
                            else {
                                attachmentType.integrationDetailsFound = false;
                                attachmentType.aegoveIntegrationClass = false;
                                attachmentType.integrationDetailsNoFound = true;
                            }

                            if (result?.result == "NO_DATA_FOUND") {
                                // if no data found for Mdical Exam Result
                                if (attachmentType.id == 122 || attachmentType.id == 49 || attachmentType.id == 50 || attachmentType.id == 24 || attachmentType.id == 338) {
                                    if (scope.isOlderThan(18)) {
                                        scope.examResultCode = lookups.medicalHealthExamResultCode.noDataFound;
                                        attachmentType.isMandatory = true;
                                        var options = { type: "error", duration: 1, messageBody: $translate.instant('mdicalExamResultNoDataFound'), titleBody: '' };
                                        notificationsService.showNotification(options);
                                    }
                                    else {
                                        attachmentType.isMandatory = false;
                                        var options = { type: "info", duration: 1, messageBody: $translate.instant('mdicalExamResultAgeUnder18'), titleBody: '' };
                                        notificationsService.showNotification(options);
                                    }
                                }
                                // if no data found for health insurance
                                if ($stateParams.serviceTransactionId != 1
                                    && $stateParams.serviceTransactionId != lookups.ServiceTransactions.isCountriesofDisastersService
                                    && $stateParams.serviceTransactionId != lookups.ServiceTransactions.countriesOfDisastersAndWarsWithoutSponsorIssueUnifiedForm) {
                                    if (attachmentType.id == 73 || attachmentType.id == 245 || attachmentType.id == 55 || attachmentType.id == 790) {
                                        attachmentType.isMandatory = true;
                                    }
                                }
                                if ($stateParams.serviceTransactionId == lookups.ServiceTransactions.decree28_InvestorInRealEstate &&
                                    attachmentType.id == 1410) {//Proof of ownership of the property
                                    attachmentType.isMandatory = true;
                                }

                                if (!scope.requestDraft.integrationDetails)
                                    scope.requestDraft.integrationDetails = [];
                                scope.replaceOrAddIntegrationDetail(result);
                            }
                            if (result?.result == "NOT_ALLOWED_ADMIN_REGION_FOR_HEALTH_INSURANCE") {
                                attachmentType.loadIntegrationDetails = false;
                                attachmentType.integrationDetailsNoFound = false;
                            }

                        }
                        , error: function () {
                            attachmentType.loadIntegrationDetails = false;
                            attachmentType.integrationDetailsFound = false;
                            attachmentType.aegoveIntegrationClass = false;
                            attachmentType.integrationDetailsNoFound = true;
                            attachmentType.integrationDetailsLoadingFinished = true;

                        }, params: { draftId: scope.requestDraft.id }

                    };
                    //if ($stateParams.serviceTransactionId == lookups.ServiceTransactions.familyUnifiedFormIssuance ||
                    //    $stateParams.serviceTransactionId == lookups.ServiceTransactions.familyUnifiedFormIssuance) {
                    //    options.showSpinner = false;
                    //}
                    if (scope.isAdministrativeRegionAllowed(attachmentType) || scope.isExceptionalServicesForAttachmentIntegrationList) {
                        // New approach get attachment integration details from DB  "lookupInfoSourceId, integrationApplicationTypesIds, integrationAdminReagionsIds"
                        if (attachmentType.integrationAdminReagionsIds && attachmentType.integrationAdminReagionsIds.length > 0
                            && attachmentType.lookupInfoSourceId && scope.useAttachmentIntegrationDetailsFromDBConfigKey == true) {

                            switch (attachmentType.lookupInfoSourceId) {
                                case scope.attachmentInfoSourceLookup.abuDhabiMunicipalityTawtheeqContract:
                                    options.params = angular.extend(options.params, { draftId: scope.requestDraft.id, unifiedNumber: scope.requestDraft.request.sponsorNumber, administrativeRegionId: scope.requestDraft.administrativeRegionId });
                                    apiHelperService.get('documentIntegration/information/tawtheeq', options);
                                    break;
                                case scope.attachmentInfoSourceLookup.departmentOfHealthAbuDhabiHealthFitnessCertificate:
                                    if (scope.isOlderThan(18)) {
                                        var strfilenumber;

                                        var vDepartmentCode = scope.requestDraft.request.resiDepartmentCode;
                                        var vYear = scope.requestDraft.request.resiYear;
                                        var vServiceCode = scope.requestDraft.request.resiServiceCode;
                                        var vSequenceNumber = scope.requestDraft.request.resiSequenceNumber;

                                        if (vDepartmentCode == undefined || vDepartmentCode == '' || vDepartmentCode == null) {
                                            vDepartmentCode = scope.requestDraft.request.resiVisaDepartmentCode;
                                            vYear = scope.requestDraft.request.resiVisaYear;
                                            vServiceCode = scope.requestDraft.request.resiVisaServiceCode;
                                            vSequenceNumber = scope.requestDraft.request.resiVisaSequenceNumber;
                                        }

                                        if (vDepartmentCode != undefined && vDepartmentCode != '' && vDepartmentCode != null)
                                            strfilenumber = vDepartmentCode + '/' + vYear + '/' + vServiceCode + '/' + vSequenceNumber;

                                        var haadOptions = angular.extend(options, {
                                            params: {
                                                draftId: scope.requestDraft.id, emirateIdentityNumber: scope.getIdentityNumber(),
                                                unifiedNumber: scope.requestDraft.request.personUnifiedNumber, fileNumber: strfilenumber, haadCertificateNumber: '',
                                                administrativeRegionId: scope.requestDraft.administrativeRegionId,
                                                fileServiceCode: vServiceCode, fileYear: vYear,
                                                fileDepartmentCode: vDepartmentCode, fileSequanceNumber: vSequenceNumber,
                                                serviceTransactionId: $stateParams.serviceTransactionId
                                            }
                                        });   //, dateOfBirth: scope.requestDraft.request.dateOfBirth
                                        apiHelperService.get('documentIntegration/information/haad', options);
                                    }
                                    else {
                                        attachmentType.loadIntegrationDetails = false;
                                        attachmentType.integrationDetailsFound = false;
                                        attachmentType.integrationDetailsNoFound = true;
                                        attachmentType.integrationDetailsLoadingFinished = true;
                                        attachmentType.isMandatory = false;
                                        scope.examResultCode = lookups.medicalHealthExamResultCode.ageUnder18;
                                        var options = { type: "info", duration: 1, messageBody: $translate.instant('mdicalExamResultAgeUnder18'), titleBody: '' };
                                        notificationsService.showNotification(options);
                                    }
                                    break;
                                case scope.attachmentInfoSourceLookup.EmiratesIDAuthorityApplicationForID:
                                    var serviceCode = scope.requestDraft.request.serviceCode;
                                    var serviceYear = scope.requestDraft.request.serviceYear;
                                    var departmentCode = scope.requestDraft.request.departmentCode;
                                    var sequenceNumber = scope.requestDraft.request.sequenceNumber;

                                    if (departmentCode == undefined || departmentCode == '' || departmentCode == null) {
                                        serviceCode = scope.requestDraft.request.resiVisaServiceCode;
                                        serviceYear = scope.requestDraft.request.resiVisaYear;
                                        departmentCode = scope.requestDraft.request.resiVisaDepartmentCode;
                                        sequenceNumber = scope.requestDraft.request.resiVisaSequenceNumber;
                                    }

                                    var eidaOptions = angular.extend(options, { params: { draftId: scope.requestDraft.id, eIDAApplicationNumber: '', unifiedNumber: scope.requestDraft.request.personUnifiedNumber, fileServiceCode: serviceCode, fileYear: serviceYear, fileDepartmentCode: departmentCode, fileSequanceNumber: sequenceNumber, passportNumber: scope.requestDraft.request.passportNumber, passportTypeId: scope.requestDraft.request.passportTypeId, passportCountryId: scope.requestDraft.request.passportCountryId } })
                                    apiHelperService.get('documentIntegration/information/eida', options);
                                    break;
                                case scope.attachmentInfoSourceLookup.MinistryOfInteriorUAE:
                                    var serviceCode = scope.requestDraft.request.serviceCode;
                                    var serviceYear = scope.requestDraft.request.serviceYear;
                                    var departmentCode = scope.requestDraft.request.departmentCode;
                                    var sequenceNumber = scope.requestDraft.request.sequenceNumber;

                                    if (departmentCode == undefined || departmentCode == '' || departmentCode == null) {
                                        serviceCode = scope.requestDraft.request.resiVisaServiceCode;
                                        serviceYear = scope.requestDraft.request.resiVisaYear;
                                        departmentCode = scope.requestDraft.request.resiVisaDepartmentCode;
                                        sequenceNumber = scope.requestDraft.request.resiVisaSequenceNumber;
                                    }
                                    var visaOptions = angular.extend(options, { params: { draftId: scope.requestDraft.id, requestAttachmentId: attachmentType.id, visaRequestNumber: scope.requestDraft.request.currentVisaRequestNumber, departmentCode: departmentCode, serviceYear: serviceYear, serviceCode: serviceCode, sequenceNumber: sequenceNumber } })
                                    apiHelperService.get('documentIntegration/information/visaDocument', options);
                                    break;
                                case scope.attachmentInfoSourceLookup.AbuDhabiPoliceOwnershipOfTheVehicle:
                                    var vehicleownershipOptions = angular.extend(options, { params: { draftId: scope.requestDraft.id, emirateIdentityNumber: scope.getApplicantIdentityNumber(), unifiedNumber: scope.requestDraft.request.sponsorNumber } })
                                    apiHelperService.get('documentIntegration/information/vehicleownership', options);
                                    break;
                                case scope.attachmentInfoSourceLookup.AbuDhabiWaterAndElectricityAuthorityElectricitybill:
                                    var waterelectricityOptions = angular.extend(options, { params: { draftId: scope.requestDraft.id, emirateIdentityNumber: scope.getApplicantIdentityNumber(), administrativeRegionId: scope.requestDraft.administrativeRegionId } })
                                    apiHelperService.get('documentIntegration/information/waterelectricity', options);
                                    break;
                                case scope.attachmentInfoSourceLookup.MinistryOfHealthHealthFitnessCertificate:
                                    var healthinsuranceOptions = angular.extend(options, { params: { draftId: scope.requestDraft.id, emirateIdentityNumber: scope.getIdentityNumber(), unifiedNumber: scope.requestDraft.request.personUnifiedNumber, damanInsuranceCardNumber: scope.requestDraft.request.damanInsuranceCardNumber, passportNumber: scope.requestDraft.request.passportNumber, nationalityId: scope.requestDraft.request.currentNationalityId, birthCertificateNumber: scope.requestDraft.request.birthCertificateNumber } }) //, dateOfBirth: scope.requestDraft.request.dateOfBirth
                                    apiHelperService.get('documentIntegration/information/healthinsurance', options);
                                    break;
                                case scope.attachmentInfoSourceLookup.departmentOfEconomicDevelopmentAbuDhabiCommercialLicense:
                                    var tradelicenseOptions = angular.extend(options, {
                                        params: {
                                            draftId: scope.requestDraft.id,
                                            unifiedNumber: scope.requestDraft.request.sponsorNumber,
                                            tradeLicenseNumbers: scope.getTradeLicenseNumbers(),
                                            departmentId: scope.getDepartmentId()
                                        }
                                    })
                                    apiHelperService.get('documentIntegration/information/tradelicense', options);
                                    break;
                                case scope.attachmentInfoSourceLookup.IntegrationWithMOFA:
                                    options.params = angular.extend(options.params, { draftId: scope.requestDraft.id });
                                    apiHelperService.get('documentIntegration/information/MofaNOCRequest', options);
                                    break;
                            }

                            if (!scope.enableAutoUploadAttachment(attachmentType.lookupInfoSourceId) && (window.config.enableDisableAutoLoaderForAttachments == true)
                                && (lookups.lookupInfoSourceIdsForApplicant.filter(e => e === attachmentType.lookupInfoSourceId).length > 0
                                    || lookups.lookupInfoSourceIdsForBenficiary.filter(e => e === attachmentType.lookupInfoSourceId).length > 0
                                    || lookups.lookupInfoSourceIdsForMother.filter(e => e === attachmentType.lookupInfoSourceId).length > 0
                                    || lookups.lookupInfoSourceIdsForVisa.filter(e => e === attachmentType.lookupInfoSourceId).length > 0)) {

                                if (scope.requestDraft?.request?.identityNumber == null && lookups.lookupInfoSourceIdsForMother.filter(e => e === attachmentType.lookupInfoSourceId).length > 0) {
                                    scope.requestDraft.request.identityNumber = scope.requestDraft?.request?.motherEID;
                                }

                                apiHelperService.get('PrintUAEDocuments/getEmiratesDocumentAutoLoader?draftId=' + scope.requestDraft.id + '&lookupInfoSourceId=' + attachmentType.lookupInfoSourceId + '&beneficiaryIdentityNumber=' + (scope.requestDraft.request.identityNumber ? scope.requestDraft.request.identityNumber : "") + '&personUnifiedNumber=' + (scope.requestDraft.request.personUnifiedNumber ? scope.requestDraft.request.personUnifiedNumber : "") + '&motherUnifiedNumber=' + (scope.requestDraft.request.motherUnifiedNumber ? scope.requestDraft.request.motherUnifiedNumber : ""), options);

                            }

                        }
                        // Old approach 
                        else {
                            if (attachmentType.id == 435) {// Divorce Certificate
                                if (scope.currentUserApplicationId === lookups.application.citizen && scope.requestDraft && scope.requestDraft.request && scope.requestDraft.request.isFromMOJ && scope.requestDraft.request.mojExternalReferance) {
                                    options.params = angular.extend(options.params, { draftNumber: scope.requestDraft.requestNumber });
                                    apiHelperService.get('documentIntegration/moj-certificate-details', options);
                                } else {
                                    attachmentType.loadIntegrationDetails = false;
                                    attachmentType.integrationDetailsFound = false;
                                    attachmentType.integrationDetailsNoFound = true;
                                    attachmentType.integrationDetailsLoadingFinished = true;
                                }
                            }
                            if (attachmentType.id == 1410) { //Proof of ownership of the property
                                options.params = angular.extend(options.params, { draftNumber: scope.requestDraft.requestNumber });
                                apiHelperService.get('documentIntegration/information/realState', options);
                            }
                            else if (attachmentType.id == 190 || attachmentType.id == 102 || attachmentType.id == 800 || attachmentType.id == 358) {
                                options.params = angular.extend(options.params, { draftId: scope.requestDraft.id, unifiedNumber: scope.requestDraft.request.sponsorNumber, administrativeRegionId: scope.requestDraft.administrativeRegionId });
                                apiHelperService.get('documentIntegration/information/tawtheeq', options);
                            }
                            else if (attachmentType.id == 122 || attachmentType.id == 49 || attachmentType.id == 50 || attachmentType.id == 24 || attachmentType.id == 338) {
                                if (scope.isOlderThan(18)) {
                                    var strfilenumber;

                                    var vDepartmentCode = scope.requestDraft.request.resiDepartmentCode;
                                    var vYear = scope.requestDraft.request.resiYear;
                                    var vServiceCode = scope.requestDraft.request.resiServiceCode;
                                    var vSequenceNumber = scope.requestDraft.request.resiSequenceNumber;

                                    if (vDepartmentCode == undefined || vDepartmentCode == '' || vDepartmentCode == null) {
                                        vDepartmentCode = scope.requestDraft.request.resiVisaDepartmentCode;
                                        vYear = scope.requestDraft.request.resiVisaYear;
                                        vServiceCode = scope.requestDraft.request.resiVisaServiceCode;
                                        vSequenceNumber = scope.requestDraft.request.resiVisaSequenceNumber;
                                    }

                                    if (vDepartmentCode != undefined && vDepartmentCode != '' && vDepartmentCode != null)
                                        strfilenumber = vDepartmentCode + '/' + vYear + '/' + vServiceCode + '/' + vSequenceNumber;

                                    var haadOptions = angular.extend(options, {
                                        params: {
                                            draftId: scope.requestDraft.id, emirateIdentityNumber: scope.getIdentityNumber(),
                                            unifiedNumber: scope.requestDraft.request.personUnifiedNumber, fileNumber: strfilenumber, haadCertificateNumber: '',
                                            administrativeRegionId: scope.requestDraft.administrativeRegionId,
                                            fileServiceCode: vServiceCode, fileYear: vYear,
                                            fileDepartmentCode: vDepartmentCode, fileSequanceNumber: vSequenceNumber,
                                            serviceTransactionId: $stateParams.serviceTransactionId
                                        }
                                    });   //, dateOfBirth: scope.requestDraft.request.dateOfBirth
                                    apiHelperService.get('documentIntegration/information/haad', options);
                                }
                                else {
                                    attachmentType.loadIntegrationDetails = false;
                                    attachmentType.integrationDetailsFound = false;
                                    attachmentType.integrationDetailsNoFound = true;
                                    attachmentType.integrationDetailsLoadingFinished = true;
                                    attachmentType.isMandatory = false;
                                    scope.examResultCode = lookups.medicalHealthExamResultCode.ageUnder18;
                                    if ($stateParams.serviceTransactionId != lookups.ServiceTransactions.issueBlueResidencyAndIdentityForNewBornInsideUAE) {
                                        var options = { type: "info", duration: 1, messageBody: $translate.instant('mdicalExamResultAgeUnder18'), titleBody: '' };
                                        notificationsService.showNotification(options);
                                    }
                                }
                            }
                            else if (attachmentType.id == 45 || attachmentType.id == 339 || attachmentType.id == 70 || attachmentType.id == 814) {
                                var serviceCode = scope.requestDraft.request.serviceCode;
                                var serviceYear = scope.requestDraft.request.serviceYear;
                                var departmentCode = scope.requestDraft.request.departmentCode;
                                var sequenceNumber = scope.requestDraft.request.sequenceNumber;

                                if (departmentCode == undefined || departmentCode == '' || departmentCode == null) {
                                    serviceCode = scope.requestDraft.request.resiVisaServiceCode;
                                    serviceYear = scope.requestDraft.request.resiVisaYear;
                                    departmentCode = scope.requestDraft.request.resiVisaDepartmentCode;
                                    sequenceNumber = scope.requestDraft.request.resiVisaSequenceNumber;
                                }

                                var eidaOptions = angular.extend(options, { params: { draftId: scope.requestDraft.id, eIDAApplicationNumber: '', unifiedNumber: scope.requestDraft.request.personUnifiedNumber, fileServiceCode: serviceCode, fileYear: serviceYear, fileDepartmentCode: departmentCode, fileSequanceNumber: sequenceNumber, passportNumber: scope.requestDraft.request.passportNumber, passportTypeId: scope.requestDraft.request.passportTypeId, passportCountryId: scope.requestDraft.request.passportCountryId } })
                                apiHelperService.get('documentIntegration/information/eida', options);
                            }
                            else if (attachmentType.id == 268 || attachmentType.id == 301) {//ownerCode , ownerCode: scope.requestDraft.request.ownerCode
                                var vehicleownershipOptions = angular.extend(options, { params: { draftId: scope.requestDraft.id, emirateIdentityNumber: scope.getApplicantIdentityNumber(), unifiedNumber: scope.requestDraft.request.sponsorNumber } })
                                apiHelperService.get('documentIntegration/information/vehicleownership', options);
                            }
                            else if (attachmentType.id == 189) {//tradeLicenseNumber, company, premiseID, accountID , tradeLicenseNumber: scope.requestDraft.request.tradeLicenseNumber, company: scope.requestDraft.request.company, premiseID: scope.requestDraft.request.premiseID, accountID: scope.requestDraft.request.accountID
                                var waterelectricityOptions = angular.extend(options, { params: { draftId: scope.requestDraft.id, emirateIdentityNumber: scope.getApplicantIdentityNumber(), administrativeRegionId: scope.requestDraft.administrativeRegionId } })
                                apiHelperService.get('documentIntegration/information/waterelectricity', options);
                            }
                            else if (attachmentType.id == 73 || attachmentType.id == 245 || attachmentType.id == 55 || attachmentType.id == 790) {//insuranceMemberID , insuranceMemberID: scope.requestDraft.request.insuranceMemberID
                                // scope.requestDraft.request.personUnifiedNumber = scope && scope.requestDraft && scope.requestDraft.serviceTransactionId && scope.requestDraft.serviceTransactionId == 556 ? undefined : scope.requestDraft.request.personUnifiedNumber; // 556 : new born service for the sponsor working in public sector (fix bug number 65680)
                                var draftId = scope.requestDraft.id ? scope.requestDraft.id : scope.requestDraft.request.draftId;
                                var Options = angular.extend(options, { params: { draftId: draftId, emirateIdentityNumber: scope.getIdentityNumber(), unifiedNumber: scope.requestDraft.request.personUnifiedNumber, damanInsuranceCardNumber: scope.requestDraft.request.damanInsuranceCardNumber, passportNumber: scope.requestDraft.request.passportNumber, nationalityId: scope.requestDraft.request.currentNationalityId, birthCertificateNumber: scope.requestDraft.request.birthCertificateNumber } }) //, dateOfBirth: scope.requestDraft.request.dateOfBirth
                                apiHelperService.get('documentIntegration/information/healthinsurance', options);

                            }
                            else if (attachmentType.id == 17 || attachmentType.id == 144 || attachmentType.id == 149 || attachmentType.id == 150 || attachmentType.id == 18 || attachmentType.id == 226) {//
                                var draftId = scope.requestDraft.id ? scope.requestDraft.id : scope.requestDraft.request.draftId;
                                var tradelicenseOptions = angular.extend(options, {
                                    params: {
                                        draftId: draftId,
                                        unifiedNumber: scope.requestDraft.request.sponsorNumber,
                                        tradeLicenseNumbers: scope.getTradeLicenseNumbers(),
                                        departmentId: scope.getDepartmentId()
                                    }
                                })
                                apiHelperService.get('documentIntegration/information/tradelicense', options);
                            }
                            else if (attachmentType.id == 806) {
                                options.params = angular.extend(options.params, { draftId: scope.requestDraft.id });
                                apiHelperService.get('documentIntegration/information/MofaNOCRequest', options);
                            }
                            else if (attachmentType.id == 986 || attachmentType.id == 987) {
                                options.params = angular.extend(options.params, { draftId: scope.requestDraft.id, identityNumber: scope.requestDraft.request.identityNumber, administrativeRegionId: scope.requestDraft.administrativeRegionId, requestAttachmentId: attachmentType.id });
                                apiHelperService.get('documentIntegration/information/educationDocuments', options);
                            }
                            else if (attachmentType.id == 988) { //Marriage Certificate
                                if (scope.currentUserApplicationId === lookups.application.citizen && scope.requestDraft && scope.requestDraft.request && scope.requestDraft.request.isFromMOJ && scope.requestDraft.request.mojExternalReferance) {
                                    options.params = angular.extend(options.params, { draftNumber: scope.requestDraft.requestNumber });
                                    apiHelperService.get('documentIntegration/moj-certificate-details', options);
                                }
                                else {
                                    options.params = angular.extend(options.params, { draftId: scope.requestDraft.id, identityNumber: scope.requestDraft.request.identityNumber, unifiedNumber: scope.requestDraft.request.personUnifiedNumber, serviceTransactionId: scope.requestDraft.request.serviceTransId, administrativeRegionId: scope.requestDraft.administrativeRegionId, requestAttachmentId: attachmentType.id });
                                    apiHelperService.get('documentIntegration/information/marriageCertificateDocuments', options);
                                }
                            }
                            else if (attachmentType.id == 989) {
                                options.params = angular.extend(options.params, { draftId: scope.requestDraft.id, identityNumber: scope.requestDraft.request.identityNumber, unifiedNumber: scope.requestDraft.request.personUnifiedNumber, serviceTransactionId: scope.requestDraft.request.serviceTransId, administrativeRegionId: scope.requestDraft.administrativeRegionId, requestAttachmentId: attachmentType.id });
                                apiHelperService.get('documentIntegration/information/birthCertificateDocuments', options);
                            }
                            else if (attachmentType.id == 992 || attachmentType.id == 994) {
                                var serviceCode = scope.requestDraft.request.serviceCode;
                                var serviceYear = scope.requestDraft.request.serviceYear;
                                var departmentCode = scope.requestDraft.request.departmentCode;
                                var sequenceNumber = scope.requestDraft.request.sequenceNumber;

                                if (departmentCode == undefined || departmentCode == '' || departmentCode == null) {
                                    serviceCode = scope.requestDraft.request.resiVisaServiceCode;
                                    serviceYear = scope.requestDraft.request.resiVisaYear;
                                    departmentCode = scope.requestDraft.request.resiVisaDepartmentCode;
                                    sequenceNumber = scope.requestDraft.request.resiVisaSequenceNumber;
                                }
                                if (departmentCode != undefined || departmentCode != '' || departmentCode != null) {
                                    var draftId = scope.requestDraft.id ? scope.requestDraft.id : scope.requestDraft.request.draftId;
                                    var serviceTransactionId = scope.requestDraft.serviceTransactionId ? scope.requestDraft.serviceTransactionId : scope.requestDraft.request.serviceTransId;
                                    options.params = angular.extend(options.params, { draftId: draftId, requestAttachmentId: attachmentType.id, currentVisaRequestNumber: scope.requestDraft.request.currentVisaRequestNumber, serviceTransactionId: serviceTransactionId, departmentCode: departmentCode, serviceYear: serviceYear, serviceCode: serviceCode, sequenceNumber: sequenceNumber });
                                    apiHelperService.get('documentIntegration/information/visaDocument', options);
                                }
                            }
                            else if (attachmentType.id == 1001) {

                                var draftId = scope.requestDraft.id ? scope.requestDraft.id : scope.requestDraft.request.draftId;
                                var serviceTransactionId = scope.requestDraft.serviceTransactionId ? scope.requestDraft.serviceTransactionId : scope.requestDraft.request.serviceTransId;
                                options.params = angular.extend(options.params, { draftId: draftId, unifiedNumber: scope.requestDraft.request.fatherUnifiedNumber, identityNumber: scope.requestDraft.request.fatherEID, serviceTransactionId: serviceTransactionId, administrativeRegionId: scope.requestDraft.administrativeRegionId, requestAttachmentId: attachmentType.id });
                                apiHelperService.get('documentIntegration/information/passportDocuments', options);

                            }
                            else if (attachmentType.id == 350 || attachmentType.id == 351) {
                                var draftId = scope.requestDraft.id ? scope.requestDraft.id : scope.requestDraft.request.draftId;
                                var serviceTransactionId = scope.requestDraft.serviceTransactionId ? scope.requestDraft.serviceTransactionId : scope.requestDraft.request.serviceTransId;
                                options.params = angular.extend(options.params, { draftId: draftId, unifiedNumber: scope.requestDraft.request.personUnifiedNumber, serviceTransactionId: serviceTransactionId, administrativeRegionId: scope.requestDraft.administrativeRegionId, requestAttachmentId: attachmentType.id });
                                apiHelperService.get('documentIntegration/information/emiratesIdCopyAsXml', options);
                            }
                            else if (attachmentType.id == 774 || attachmentType.id == 775) {
                                var draftId = scope.requestDraft.id ? scope.requestDraft.id : scope.requestDraft.request.draftId;
                                var serviceTransactionId = scope.requestDraft.serviceTransactionId ? scope.requestDraft.serviceTransactionId : scope.requestDraft.request.serviceTransId;
                                options.params = angular.extend(options.params, { draftId: draftId, unifiedNumber: scope.requestDraft.request.sponsorNumber, serviceTransactionId: serviceTransactionId, administrativeRegionId: scope.requestDraft.administrativeRegionId, requestAttachmentId: attachmentType.id });
                                apiHelperService.get('documentIntegration/information/emiratesIdCopyAsXml', options);
                            }
                            else if (attachmentType.hasWorkContractIntegration && scope.currentUserApplicationId != lookups.application.TypingCenter) {
                                var draftId = scope.requestDraft.id ? scope.requestDraft.id : scope.requestDraft.request.draftId;
                                if (attachmentType.hasWorkContractIntegrationBySponsor)
                                    options.params = angular.extend(options.params, { draftId: draftId, unifiedNumber: scope.requestDraft.request.sponsorNumber, requestAttachmentId: attachmentType.id });
                                else
                                    options.params = angular.extend(options.params, { draftId: draftId, unifiedNumber: scope.requestDraft.request.personUnifiedNumber, requestAttachmentId: attachmentType.id });
                                apiHelperService.get('documentIntegration/information/work-contract', options);
                            }
                            if (!scope.enableAutoUploadAttachment(attachmentType.lookupInfoSourceId) && (window.config.enableDisableAutoLoaderForAttachments == true)
                                && (lookups.lookupInfoSourceIdsForApplicant.filter(e => e === attachmentType.lookupInfoSourceId).length > 0
                                    || lookups.lookupInfoSourceIdsForBenficiary.filter(e => e === attachmentType.lookupInfoSourceId).length > 0
                                    || lookups.lookupInfoSourceIdsForMother.filter(e => e === attachmentType.lookupInfoSourceId).length > 0
                                    || lookups.lookupInfoSourceIdsForVisa.filter(e => e === attachmentType.lookupInfoSourceId).length > 0)) {

                                if (scope.requestDraft?.request?.identityNumber == null && lookups.lookupInfoSourceIdsForMother.filter(e => e === attachmentType.lookupInfoSourceId).length > 0) {
                                    scope.requestDraft.request.identityNumber = scope.requestDraft?.request?.motherEID;
                                }

                                apiHelperService.get('PrintUAEDocuments/getEmiratesDocumentAutoLoader?draftId=' + scope.requestDraft.id + '&lookupInfoSourceId=' + attachmentType.lookupInfoSourceId + '&beneficiaryIdentityNumber=' + (scope.requestDraft.request.identityNumber ? scope.requestDraft.request.identityNumber : "") + '&personUnifiedNumber=' + (scope.requestDraft.request.personUnifiedNumber ? scope.requestDraft.request.personUnifiedNumber : "") + '&motherUnifiedNumber=' + (scope.requestDraft.request.motherUnifiedNumber ? scope.requestDraft.request.motherUnifiedNumber : ""), options);

                            }
                        }
                    }
                }

                scope.getIdentityNumber = function () {
                    return scope.requestDraft.request.identityNumber;
                }

                scope.getApplicantIdentityNumber = function () {
                    return scope.requestDraft.request.applicantIdentityNumber;
                }

                scope.getTradeLicenseNumbers = function () {
                    var tradeLicenseNumbers = [];
                    if (scope.requestDraft.request.delegateforCompany != null && scope.requestDraft.request.delegateforCompany.estabLicenseNumber) {
                        tradeLicenseNumbers.push(scope.requestDraft.request.delegateforCompany.estabLicenseNumber.toString().match(/\d+/))
                    }
                    else if (scope.requestDraft.request.delegateforCompanies != null && scope.requestDraft.request.delegateforCompanies.length > 0) {
                        for (var i = 0; i < scope.requestDraft.request.delegateforCompanies.length; i++) {
                            tradeLicenseNumbers.push(scope.requestDraft.request.delegateforCompanies[0].estabLicenseNumber.toString().match(/\d+/));
                        }
                    }
                    else if (scope.requestDraft.request.establishmentLicenceNumber != null) {
                        tradeLicenseNumbers.push(scope.requestDraft.request.establishmentLicenceNumber.toString());
                    }
                    //get only number from the string and concatenate the "CN-" with it
                    return tradeLicenseNumbers.toString();
                }

                scope.getDepartmentId = function () {
                    if (scope.requestDraft && scope.requestDraft.request && scope.requestDraft.request.sponsorDepartmentId)
                        return scope.requestDraft.request.sponsorDepartmentId;
                    if (scope.requestDraft && scope.requestDraft.request && scope.requestDraft.request.immigrationDepartmentId)
                        return scope.requestDraft.request.immigrationDepartmentId;
                }

                scope.setIntegrationDetails = function () {

                    if ($stateParams.serviceTransactionId &&
                        lookups.icaAndResiServiceTransactions.includes(parseInt($stateParams.serviceTransactionId))) {
                        if (scope.attachments && scope.attachments.length > 0) {
                            for (i = 0; i < scope.attachments.length; i++) {
                                if (scope.attachments[i].token)
                                    scope.attachments[i].hasToken = true;
                            }
                        }
                    }


                    if (scope.requestDraft && scope.requestDraft.request) {
                        var certificationRequestFlag = scope.requestDraft.request.CertificationFlag ? scope.requestDraft.request.CertificationFlag : scope.requestDraft.request.certificationFlag;
                        if (scope.requestDraft != null && scope.requestDraft.request != null && (certificationRequestFlag == undefined || certificationRequestFlag == false)) {
                            if (scope._attachmentTypes != null || scope._attachmentTypes != undefined) {
                                if (scope._attachmentTypes && scope._attachmentTypes.length > 0) {

                                    if (scope._attachmentTypes != null) {
                                        for (var i = 0; i < scope._attachmentTypes.length; i++) {
                                            var obj = scope._attachmentTypes[i];
                                            if (obj && obj.id) {
                                                //if (obj.id == 315 || obj.id == 316 || obj.id == 318 || obj.id == 319) {
                                                //    obj.isMandatory = false;
                                                //}
                                                //else
                                                if (scope.requestDraft.serviceTransactionId != lookups.ServiceTransactions.issueLeavePermitForExemption
                                                    && (obj.id == 141 || obj.id == 139)) {
                                                    obj.isMandatory = true;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        //Make proof of study manodatory if sponsored study inside/outside uae
                        if (scope.requestDraft.request.exceptionSponsorTypeId == lookups.exceptionSponsorType.studyingInsideUAE ||
                            scope.requestDraft.request.exceptionSponsorTypeId == lookups.exceptionSponsorType.studyingOutsideUAE) {
                            for (var i = 0; i < scope._attachmentTypes.length; i++) {
                                if (scope._attachmentTypes[i].id == lookups.proofOfStudyingCertificateAttachment.id) {
                                    scope._attachmentTypes[i].isMandatory = true;
                                }
                            }
                        }
                        else {
                            if (scope._attachmentTypes != null) {
                                for (var i = 0; i < scope._attachmentTypes.length; i++) {
                                    if (scope._attachmentTypes[i].id == lookups.proofOfStudyingCertificateAttachment.id) {
                                        scope._attachmentTypes[i].isMandatory = false;
                                    }
                                }
                            }
                        }

                        if (scope.requestDraft.request.sponsorStudyStatusId == lookups.sponsorStudyStatus.finishedUniversity) {
                            for (var i = 0; i < scope._attachmentTypes.length; i++) {
                                if (scope._attachmentTypes[i].id == lookups.finishedStudyingInsideUAEAttachmentTypes.certificateOfStudyUniversityCompletion) {
                                    scope._attachmentTypes[i].isMandatory = true;
                                }
                                if (scope._attachmentTypes[i].id == lookups.finishedStudyingInsideUAEAttachmentTypes.certificateOfContinuigStudyFromTheUniversity ||
                                    scope._attachmentTypes[i].id == lookups.finishedStudyingInsideUAEAttachmentTypes.certificateOfStudyCompletion) {
                                    scope._attachmentTypes[i].isMandatory = false;
                                }
                            }
                        }

                        if (scope.requestDraft.request.sponsorStudyStatusId == lookups.sponsorStudyStatus.finishedSecondarySchool) {
                            for (var i = 0; i < scope._attachmentTypes.length; i++) {
                                if (scope._attachmentTypes[i].id == lookups.finishedStudyingInsideUAEAttachmentTypes.certificateOfStudyCompletion) {
                                    scope._attachmentTypes[i].isMandatory = true;
                                }
                                if (scope._attachmentTypes[i].id == lookups.finishedStudyingInsideUAEAttachmentTypes.certificateOfStudyUniversityCompletion ||
                                    scope._attachmentTypes[i].id == lookups.finishedStudyingInsideUAEAttachmentTypes.certificateOfContinuigStudyFromTheUniversity) {
                                    scope._attachmentTypes[i].isMandatory = false;
                                }
                            }
                        }

                        if (scope.requestDraft.request.sponsorStudyStatusId == lookups.sponsorStudyStatus.studyingInUniversity) {
                            for (var i = 0; i < scope._attachmentTypes.length; i++) {
                                if (scope._attachmentTypes[i].id == lookups.finishedStudyingInsideUAEAttachmentTypes.certificateOfContinuigStudyFromTheUniversity) {
                                    scope._attachmentTypes[i].isMandatory = true;
                                }
                                if (scope._attachmentTypes[i].id == lookups.finishedStudyingInsideUAEAttachmentTypes.certificateOfStudyUniversityCompletion ||
                                    scope._attachmentTypes[i].id == lookups.finishedStudyingInsideUAEAttachmentTypes.certificateOfStudyCompletion) {
                                    scope._attachmentTypes[i].isMandatory = false;
                                }
                            }
                        }
                    }
                    if (scope.requestDraft && scope.requestDraft.requestNumber && scope._attachmentTypes) {
                        for (i = 0; i < scope._attachmentTypes.length; i++) {
                            if (scope._attachmentTypes[i].hasIntegration && scope.hasIntegration == true) {

                                //      if (scope.requestDraft.request.applicantClassDetailId != lookups.applicantClassDetails.NewBorn && (scope._attachmentTypes[i].id == 73 || scope._attachmentTypes[i].id == 245 || scope._attachmentTypes[i].id == 55)) {
                                scope._attachmentTypes[i].integrationDetailsFound = false;
                                var isNoDataFound = false;
                                var requestBody = null;
                                if (scope.requestDraft.integrationDetails != null) {
                                    for (j = 0; j < scope.requestDraft.integrationDetails.length; j++) {
                                        if (scope.requestDraft.integrationDetails[j].requestAttachmentId == scope._attachmentTypes[i].id) {
                                            if (scope.requestDraft.integrationDetails[j].result != "NO_DATA_FOUND") {
                                                scope._attachmentTypes[i].integrationDetailsFound = true;
                                                scope._attachmentTypes[i].aegoveIntegrationClass = true;
                                            }
                                            else {
                                                isNoDataFound = true;
                                                scope._attachmentTypes[i].integrationDetailsFound = false;
                                                scope._attachmentTypes[i].aegoveIntegrationClass = false;
                                            }
                                            requestBody = scope.requestDraft.integrationDetails[j].requestBody;
                                            break;
                                        }
                                    }
                                }

                                if (scope.isUnifiedForm != true || (scope.isUnifiedForm == true && scope.hasIntegration == true)) {
                                    if (!scope._attachmentTypes[i].integrationDetailsFound && !isNoDataFound) {

                                        scope.getIntegrationDetails(scope._attachmentTypes[i]);
                                    } else if (requestBody != null && scope._attachmentTypes[i] != null && scope.isParametersChanged(scope._attachmentTypes[i], requestBody)) {
                                        scope.getIntegrationDetails(scope._attachmentTypes[i]);
                                    }
                                }

                                if (isNoDataFound) {
                                    scope._attachmentTypes[i].loadIntegrationDetails = false;
                                    scope._attachmentTypes[i].integrationDetailsFound = false;
                                    scope._attachmentTypes[i].integrationDetailsNoFound = true;
                                    scope._attachmentTypes[i].integrationDetailsLoadingFinished = true;
                                }

                            }
                            //}
                        }
                    }
                }

                scope.isParametersChanged = function (attachmentType, requestBody) {
                    if (requestBody != null) {
                        var oldParameters = JSON.parse(requestBody);
                        var newParameters;
                        var newParameters = {
                            EmiratesIDNumber: null, MOIUnifiedNumber: null, VisaResidenceNumber: null,
                            FitnessCertificateNumber: null, TradeLicenseNumber: null, TradeLicenseNumbers: null, FileServiceCode: null,
                            OwnerCode: null, FileYear: null, FileDepartmentCode: null, FileSequanceNumber: null
                        };

                        if (attachmentType.id == 190 || attachmentType.id == 102 || attachmentType.id == 800 || attachmentType.id == 358) {
                            newParameters.MOIUnifiedNumber = scope.requestDraft.request.sponsorNumber;
                        }
                        else if (attachmentType.id == 122 || attachmentType.id == 49 || attachmentType.id == 50 || attachmentType.id == 24 || attachmentType.id == 338) {
                            var strfilenumber;
                            if (scope.requestDraft.request.resiDepartmentCode != undefined && scope.requestDraft.request.resiDepartmentCode != '')
                                strfilenumber = scope.requestDraft.request.resiDepartmentCode + '/' + scope.requestDraft.request.resiYear + '/' + scope.requestDraft.request.resiServiceCode + '/' + scope.requestDraft.request.resiSequenceNumber;
                            newParameters.EmiratesIDNumber = scope.getIdentityNumber();
                            //newParameters.DateOfBirth = getDateOfBirth();
                            newParameters.MOIUnifiedNumber = scope.requestDraft.request.personUnifiedNumber;
                            newParameters.VisaResidenceNumber = strfilenumber;
                        }
                        else if (attachmentType.id == 45) {

                            newParameters.MOIUnifiedNumber = scope.requestDraft.request.personUnifiedNumber;
                            newParameters.FileServiceCode = scope.requestDraft.request.serviceCode;
                            newParameters.FileYear = scope.requestDraft.request.serviceYear;
                            newParameters.FileDepartmentCode = scope.requestDraft.request.departmentCode;
                            newParameters.FileSequanceNumber = scope.requestDraft.request.sequenceNumber;
                        }
                        else if (attachmentType.id == 268 || attachmentType.id == 301) {
                            newParameters.EmiratesIDNumber = scope.getApplicantIdentityNumber();
                            newParameters.MOIUnifiedNumber = scope.requestDraft.request.sponsorNumber;
                        }
                        else if (attachmentType.id == 189) {
                            newParameters.EmiratesIDNumber = scope.getApplicantIdentityNumber();
                        }
                        else if (attachmentType.id == 73 || attachmentType.id == 245 || attachmentType.id == 790) {
                            newParameters.EmiratesIDNumber = scope.getIdentityNumber();
                            newParameters.MOIUnifiedNumber = scope.requestDraft.request.personUnifiedNumber;
                            //newParameters.DateOfBirth = scope.requestDraft.request.dateOfBirth;
                        }
                        else if (attachmentType.id == 17 || attachmentType.id == 144 || attachmentType.id == 150 || attachmentType.id == 18 || attachmentType.id == 226) {
                            //newParameters.EmiratesIDNumber = scope.getApplicantIdentityNumber();
                            newParameters.MOIUnifiedNumber = scope.requestDraft.request.sponsorNumber;
                            newParameters.TradeLicenseNumbers = scope.getTradeLicenseNumbers();
                            newParameters.DepartmentId = scope.getDepartmentId()
                        }
                        else if (attachmentType.id == 149) {
                            return true;
                        }

                        if (oldParameters != null && newParameters != null)
                            return !isTwoObjectsSame(oldParameters, newParameters);
                        else
                            return false;
                    }
                    return false;
                }

                function getDateOfBirth() {
                    if (scope.requestDraft.request.dateOfBirth) {
                        var yearThen = parseInt(scope.requestDraft.request.dateOfBirth.toString().substring(0, 4), 10);
                        var monthThen = parseInt(scope.requestDraft.request.dateOfBirth.toString().substring(5, 7), 10);
                        var dayThen = parseInt(scope.requestDraft.request.dateOfBirth.toString().substring(8, 10), 10);

                        return yearThen + '/' + monthThen + '/' + dayThen;
                    }
                    else {
                        return "";
                    }
                }

                function getAge() {
                    var value = -1;
                    if (scope.requestDraft && scope.requestDraft.request && scope.requestDraft.request.dateOfBirth) {
                        var dateString = scope.requestDraft.request.dateOfBirth.toString();
                        var today = new Date();
                        var birthDate = new Date(dateString);
                        var age = today.getFullYear() - birthDate.getFullYear();
                        var m = today.getMonth() - birthDate.getMonth();
                        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                            age--;
                        }
                        value = age;
                    }
                    return value;
                }

                function isTwoObjectsSame(obj1, obj2) {
                    var isObjectsEqual = true;
                    for (var p in obj1) {
                        if (!obj1[p] && !obj2[p]) {
                            obj1[p] = "";
                            obj2[p] = "";
                        }
                        if (obj1[p] != obj2[p])
                            isObjectsEqual = false;
                    }
                    return isObjectsEqual;
                }

                function openIntegrationDetailsPopup(integrationDetailsSubject, integrationDetails, attachmentType) {
                    scope.integrationDetailsSubject = integrationDetailsSubject;
                    scope.integrationDetails = integrationDetails;
                    scope.showIntegrationDetailsPopup = (scope.isAdministrativeRegionAllowed(attachmentType) || scope.isExceptionalServicesForAttachmentIntegrationList);
                }

                scope.closeIntegrationDetailsPopup = function () {
                    scope.integrationDetails = null;
                    scope.showIntegrationDetailsPopup = false;
                    scope.integrationDetailsSubject = null;
                }

                scope.showIntegrationDetails = function (attachmentType) {
                    if (scope.requestDraft.integrationDetails) {
                        for (i = 0; i < scope.requestDraft.integrationDetails.length; i++) {
                            if (scope.requestDraft.integrationDetails[i].requestAttachmentId == attachmentType.id) {
                                openIntegrationDetailsPopup(attachmentType.localizedName, scope.requestDraft.integrationDetails[i].resultDataNode.nodes, attachmentType);
                                return;
                            }
                        }
                    }
                }

                //scope.$watch('requestDraft.requestNumber', function (result) {
                //    scope.showAdultHints();
                //});

                scope.showAdultHints = function () {
                    if (scope.requestDraft && scope.requestDraft.request) {
                        var isOlderThan = scope.isOlderThan(18);
                        scope.displayHintEighteenMale = scope.requestDraft.request.genderId == 1 && isOlderThan && $stateParams.serviceTransactionId != lookups.ServiceTransactions.cancelResidency && $stateParams.serviceTransactionId != lookups.ServiceTransactions.cancelResidencyWithoutSponsored && $stateParams.serviceTransactionId != lookups.ServiceTransactions.residencyAndIdentityForGraduatesOfAccreditedUniversitiesOutsideUAE && $stateParams.serviceTransactionId != lookups.ServiceTransactions.residencyForGraduatesOfAccreditedUniversitiesOutsideUAE && $stateParams.serviceTransactionId != lookups.ServiceTransactions.renewResidenceForeignerRetired && $stateParams.serviceTransactionId != lookups.ServiceTransactions.residenceandIdentityForeignerRetired && $stateParams.serviceTransactionId != lookups.ServiceTransactions.renewResidenceForRealEstateInvestor && $stateParams.serviceTransactionId != lookups.ServiceTransactions.renewResidenceAndIdentityForRealEstateInvestor && $stateParams.serviceTransactionId != lookups.ServiceTransactions.renewResidenceGoldenVisaForBusinessPioneer && $stateParams.serviceTransactionId != lookups.ServiceTransactions.renewResidenceAndIdentityGoldenVisaForBusinessPioneer;
                        scope.displayHintEighteenFemale = scope.requestDraft.request.genderId == 2 && isOlderThan && $stateParams.serviceTransactionId != lookups.ServiceTransactions.cancelResidency && $stateParams.serviceTransactionId != lookups.ServiceTransactions.cancelResidencyWithoutSponsored && $stateParams.serviceTransactionId != lookups.ServiceTransactions.residencyAndIdentityForGraduatesOfAccreditedUniversitiesOutsideUAE && $stateParams.serviceTransactionId != lookups.ServiceTransactions.residencyForGraduatesOfAccreditedUniversitiesOutsideUAE && $stateParams.serviceTransactionId != lookups.ServiceTransactions.renewResidenceForeignerRetired && $stateParams.serviceTransactionId != lookups.ServiceTransactions.residenceandIdentityForeignerRetired && $stateParams.serviceTransactionId != lookups.ServiceTransactions.renewResidenceForRealEstateInvestor && $stateParams.serviceTransactionId != lookups.ServiceTransactions.renewResidenceAndIdentityForRealEstateInvestor && $stateParams.serviceTransactionId != lookups.ServiceTransactions.renewResidenceGoldenVisaForBusinessPioneer && $stateParams.serviceTransactionId != lookups.ServiceTransactions.renewResidenceAndIdentityGoldenVisaForBusinessPioneer;
                    }
                    else {
                        scope.displayHintEighteenMale = false;
                        scope.displayHintEighteenFemale = false;
                    }
                    scope.showIntegrationDetailsPopup = false;
                }

                scope.getLabelText = function (integrationDetail) {
                    if (languageService.getCurrentID() == 2)
                        return integrationDetail.englishLabel;
                    return integrationDetail.arabicLabel;
                }

                scope.isOlderThan = function (age) {
                    if (scope.requestDraft.request.dateOfBirth) {
                        var yearThen = parseInt(scope.requestDraft.request.dateOfBirth.toString().substring(0, 4), 10);
                        var monthThen = parseInt(scope.requestDraft.request.dateOfBirth.toString().substring(5, 7), 10);
                        var dayThen = parseInt(scope.requestDraft.request.dateOfBirth.toString().substring(8, 10), 10);

                        var today = new Date();
                        var birthday = new Date(yearThen, monthThen - 1, dayThen);
                        var differenceInMilisecond = today.valueOf() - birthday.valueOf();
                        var year_age = Math.floor(differenceInMilisecond / 31536000000);
                        if (year_age >= age) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                }

                scope.isFamilyMemberService = function (serviceId) {
                    if (lookups.familyMemberServiceId.filter(e => e === serviceId).length > 0) {
                        return true;
                    } else return false;
                }

                scope.isAllowedSponsorType = function (sponsorTypeId) {
                    if (lookups.sponsorTypeId.filter(e => e === sponsorTypeId).length > 0) {
                        return true;
                    } else return false;
                }

                scope.isAllowedMaritalStatus = function (maritalStatusId) {
                    if (lookups.maritalStatusId.filter(e => e === maritalStatusId).length > 0) {
                        return true;
                    } else return false;
                }

                scope.isExpired = function (expiryDate) {
                    var currentDate = new Date();
                    if (!expiryDate) return false;
                    else {
                        var dayThen = parseInt(expiryDate.toString().substring(0, 2), 10);
                        var monthThen = parseInt(expiryDate.toString().substring(3, 5), 10);
                        var yearThen = parseInt(expiryDate.toString().substring(6, 10), 10);
                        var exDate = new Date(yearThen, monthThen - 1, dayThen);
                        var differenceInMilisecond = exDate.valueOf() - currentDate.valueOf();

                        if (differenceInMilisecond >= 0)
                            return false;
                        else
                            return true;
                    }
                }
                scope.getRestrictedIntegrationSection = function () {

                    var isServiceHide = false;
                    var listOfRestrictedServiceTransId = [432, 617, 618, 619, 620, 740, 206, 208, 739, 207, 209, 692, 693, 1173];

                    if (listOfRestrictedServiceTransId.includes(parseInt($stateParams.serviceTransactionId))) {

                        isServiceHide = true;
                    }

                    return isServiceHide;
                }

                scope.shortGuid = () => {
                    return 'xxxxxxxx'.replace(/[xy]/g, (c) => {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                }
                scope.ShowTransferToCourtHint = function () {
                    var showCourtHint = false;
                    if (scope.requestDraft != null && scope.requestDraft.administrativeRegionId != null) {
                        var listOfTransferToCourtServiceTransIds = [206, 208, 739, 207, 209];
                        if (listOfTransferToCourtServiceTransIds.includes(parseInt($stateParams.serviceTransactionId)) &&
                            (scope.requestDraft.administrativeRegionId == 1 || scope.requestDraft.administrativeRegionId == 8 || scope.requestDraft.administrativeRegionId == 9)) {
                            showCourtHint = true;
                        }
                    }
                    return showCourtHint;
                }

                scope.uploadAttachment = function (attachmentType) {
                    var isValid = true;
                    var checkForAtachment = ((scope.attachments.filter(
                        function (checkForAtachment) {
                            if (!scope.checkAllowReplicatedImage()) {
                                if (checkForAtachment.attachmentTypeId == attachmentType.id) {
                                    var options =
                                    {
                                        duration: 5000, type: "warning", isSticky: false, messageKey: $translate.instant('YouUploadThisPhotoAlready'), titleKey: 'warning'
                                    };
                                    notificationsService.showNotification(options);
                                    isValid = false;
                                    return false;
                                }
                            }
                        })));
                    var option = {
                        success: function (response) {
                            if (response && response.byteArrayBase64String) {
                                var file = dataURLtoFile('data:application/pdf;base64,' + response.byteArrayBase64String, 'hello.txt');
                                if (!scope.attachments) {
                                    scope.attachments = [];
                                }

                                var attachment = {
                                    attachmentFile: file,
                                    attachmentThumbnail: file,
                                };

                                attachment.originalFileName = attachment.attachmentFile.name;
                                if (attachmentType != null) {
                                    attachment.attachmentTypeId = attachmentType.id;

                                    scope.attachments.push(attachment);
                                    scope.changeType(attachment, attachmentType, null);
                                }
                                else {
                                    scope.attachments.push(attachment);
                                }
                                attachmentType.integrationDetailsNoFound = false;
                                attachmentType.integrationDetailsFound = true;

                            } else {
                                attachmentType.integrationDetailsNoFound = true;
                                attachmentType.integrationDetailsFound = false;
                                attachmentType.hasIntegration = true;
                            }
                        },
                        error: function () {
                            attachmentType.integrationDetailsNoFound = true;
                            attachmentType.integrationDetailsFound = false;
                            attachmentType.hasIntegration = true;
                        }
                    }
                    if (isValid) {
                        if (window.config.enableDisableAutoLoaderForAttachments == true && (lookups.lookupInfoSourceIdsForApplicant.filter(e => e === attachmentType.lookupInfoSourceId).length > 0
                            || lookups.lookupInfoSourceIdsForBenficiary.filter(e => e === attachmentType.lookupInfoSourceId).length > 0
                            || lookups.lookupInfoSourceIdsForMother.filter(e => e === attachmentType.lookupInfoSourceId).length > 0
                            || lookups.lookupInfoSourceIdsForVisa.filter(e => e === attachmentType.lookupInfoSourceId).length > 0)) {
                            apiHelperService.get('PrintUAEDocuments/getEmiratesIDDocument?draftId=' + scope.requestDraft.id + '&lookupInfoSourceId=' + attachmentType.lookupInfoSourceId + '&beneficiaryIdentityNumber=' + (scope.requestDraft.request.identityNumber ? scope.requestDraft.request.identityNumber : "") + '&personUnifiedNumber=' + (scope.requestDraft.request.personUnifiedNumber ? scope.requestDraft.request.personUnifiedNumber : "") + '&motherUnifiedNumber=' + (scope.requestDraft.request.motherUnifiedNumber ? scope.requestDraft.request.motherUnifiedNumber : ""), option);
                        } else {
                            apiHelperService.get('PrintUAEDocuments/getUAEDocument?serviceTransactionId=' + $stateParams.serviceTransactionId + '&attachmentTypeId=' + attachmentType.id + '&beneficiaryIdentityNumber=' + (scope.requestDraft.request.identityNumber ? scope.requestDraft.request.identityNumber : "") + '&personUnifiedNumber=' + (scope.requestDraft.request.personUnifiedNumber ? scope.requestDraft.request.personUnifiedNumber : ""), option);
                        }
                    }
                }
                function dataURLtoFile(dataurl, filename) {

                    var arr = dataurl.split(','),
                        mime = arr[0].match(/:(.*?);/)[1],
                        bstr = atob(arr[1]),
                        n = bstr.length,
                        u8arr = new Uint8Array(n);

                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }

                    return new File([u8arr], filename, { type: mime });
                }
                scope.enableAutoUploadAttachment = function (lookupInfoSourceId) {
                    if (scope.enableAutoUpload && window.config.autoUploadAttachmentInfoSourceIds.includes(lookupInfoSourceId))
                        return true
                    else return false;
                }
                scope.adjustNumber = function (index) {
                    if (index > 1) {
                        index = (index - scope.previousNumber === 1) ? index : (scope.previousNumber + 1);
                    }
                    scope.previousNumber = index;
                    return index;
                };
                scope.internalControl.checkHasHealthInsuranceAttachment = function () {

                    var hasHealthInsurance = false;
                    if (scope._attachmentTypes && scope._attachmentTypes.length > 0) {

                        var healthInsuranceAttachment = scope._attachmentTypes.filter(function (attachmentType) {
                            return lookups.healthInsuranceAttachmentIds.indexOf(attachmentType.id) !== -1;
                        });
                        if (healthInsuranceAttachment && healthInsuranceAttachment.length > 0) {
                            hasHealthInsurance = true;
                        }
                    }
                    return hasHealthInsurance
                }

                //#region SignaturePad Setup
                scope.InitSignaturePad = function (attachmentType) {
                    scope.targetAttachmentTypeForSignature = attachmentType;
                    var canvas = document.getElementById('signatureCanvas');
                    scope.signaturePad = new SignaturePad(canvas);
                };

                scope.clickToSignPopUp = function (value, attachmentType) {
                    scope.clickToSignPopUpFlag = value
                    if (value) {
                        scope.InitSignaturePad(attachmentType);
                    }
                    else {
                        scope.targetAttachmentTypeForSignature = null;
                    }
                }
                scope.clearSignaturePad = function () {
                    scope.signaturePad.clear();
                };

                scope.saveSignature = function () {
                    if (!scope.signaturePad || scope.signaturePad.isEmpty()) {
                        var options = {
                            duration: 1000, type: "error", messageKey: $translate.instant("Please provide a signature first."), titleKey: '', localizationControllers: ['home']
                        };
                        notificationsService.showNotification(options);
                        return;
                    }

                    const jpgFile = convertToJpgFast(scope.signaturePad, 'signature.jpg');
                    scope.uploadFiles([jpgFile], [], scope.targetAttachmentTypeForSignature);
                    scope.clickToSignPopUp(false);
                };
                function convertToJpgFast(signaturePad, fileName) {
                    const originalCanvas = signaturePad.canvas;

                    const tempCanvas = document.createElement("canvas");
                    tempCanvas.width = originalCanvas.width;
                    tempCanvas.height = originalCanvas.height;

                    const ctx = tempCanvas.getContext("2d");

                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

                    ctx.drawImage(originalCanvas, 0, 0);

                    const dataUrl = tempCanvas.toDataURL("image/jpeg", 0.9);

                    const arr = dataUrl.split(',');
                    const bstr = atob(arr[1]);
                    const u8arr = new Uint8Array(bstr.length);
                    for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);

                    return new File([u8arr], fileName, { type: "image/jpeg" });
                }
                //#endregion


                //#region TICAO

                scope.ticaoIsEnabled = function () {

                    isEnabled = false;

                    if (window.config.enableTICAO === true &&
                        angular.isArray(window.config.enableTICAOByApplications) &&
                        window.config.enableTICAOByApplications.indexOf(scope.currentUserApplicationId) !== -1 &&
                        angular.isArray(window.config.enableTICAOByServices) &&
                        window.config.enableTICAOByServices.indexOf(parseInt($stateParams.serviceTransactionId)) !== -1) {
                        isEnabled = true;
                    }

                    return isEnabled;
                }

                scope.convertFileToBase64 = function (file) {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();

                        reader.readAsDataURL(file);

                        reader.onload = () => resolve(reader.result);
                        reader.onerror = (error) => reject(error);
                    });
                }

                function TicoValidateAndEnhancePersonalPhoto(attachment, callback) {

                    scope.convertFileToBase64(attachment.attachmentFile).then(base64String => {

                        var requestData = {
                            personalPhotoBase64String: base64String,
                            serviceTransactionId: $stateParams.serviceTransactionId,
                            attachmentFileName: attachment.attachmentFile.name,
                            attachmentFileType: attachment.attachmentFile.type
                        };

                        var options = {
                            success: function (result) {
                                if (result?.isValidated && result?.validationErrors !== null) {
                                    scope.showTICAOPersonalPhotoDailog = true;
                                    scope.validationErrors = result.validationErrors;
                                    if (result?.enhancedPersonalPhotoBase64String !== null) {
                                        scope.enhancedPersonalPhotoBase64String = result.enhancedPersonalPhotoBase64String;
                                    }
                                    else {
                                        scope.enhancedPersonalPhotoBase64String = undefined;
                                    }
                                }
                                else {
                                    scope.showTICAOPersonalPhotoDailog = false;
                                    scope.enhancedPersonalPhotoBase64String = undefined;
                                    scope.validationErrors = undefined;
                                }

                                scope.personalPhotoBase64String = result.personalPhotoBase64String;

                                $rootScope.attachemtnId = attachment.attachmentTypeId;
                                scope.modifiedAttachment = attachment;

                                callback();
                            },
                            error: function () {
                                var lastAttachment = scope.attachments[scope.attachments.length - 1];
                                scope.delete(lastAttachment);
                                scope.loading = false;

                            }
                        };
                        apiHelperService.post('ticao/validateAndEnhancePersonalPhotoByTICAO', requestData, options)
                    });
                }

                scope.ticaoCancelEnhancedPersonalPhoto = function () {
                    var lastAttachment = scope.attachments[scope.attachments.length - 1];
                    scope.delete(lastAttachment);
                    scope.showTICAOPersonalPhotoDailog = false;
                }

                scope.ticaoConfirmEnhancedPersonalPhoto = function () {
                    scope.modifiedAttachment.attachmentFile = fileService.blobToFile(fileService.dataURItoBlob(scope.enhancedPersonalPhotoBase64String),
                        scope.modifiedAttachment.attachmentFile.name);
                    scope.modifiedAttachment.token = undefined;
                    scope.showTICAOPersonalPhotoDailog = false;
                    scope.modifiedAttachment.attachmentThumbnail = scope.modifiedAttachment.attachmentFile;
                }

                scope.isRenewPackage = function () {
                    if ($stateParams.serviceTransactionId == lookups.ServiceTransactions.renewPassportEidaPackage) {
                        return true;
                    } else {
                        return false;
                    }
                }


                //#endregion


            }
        }
    }]);