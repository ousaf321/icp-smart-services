mainApp.directive('tahalufOcr', ['$http', 'userApplicantService', '$stateParams', 'apiHelperService', '$rootScope', '$q', '$translate', 'notificationsService', 'fileService', 'attachmentService', 'languageService', 'authManager', 'lookupService',
    function ($http, userApplicantService, $stateParams, apiHelperService, $rootScope, $q, $translate, notificationsService, fileService, attachmentService, languageService, authManager, lookupService) {
        return {
            restrict: 'EA',
            scope: {
                attachmentTypes: '=',
                requestDraft: '=?',
                isNewBorn: '=',
                passportOnly: '=?',
                hideSectionHeader: '=?'
            },
            templateUrl: '../framework/directives/tahaluf-ocr.html',
            link: function (scope) {

                //#region init

                $rootScope.CurrentController(['shared']);
                scope.showUpleoadPassportSection = false;
                scope.showTahalufOcr = false;
                scope.viewPassportImage = false;
                scope.requestDraft.showTahalufOcr = false;
                scope.invalidPersonalImageSizeAndResolution = false;
                scope.isNewBornService = false;

                scope.ocrObj = {
                    passportTypeId: null,
                    passportNumber: null,
                    passportExpiryDate: null,
                    passportCountryId: null,
                    passportIssueDate: null,
                    sponsoredFirstNameEnglish: '',
                    sponsoredSecondNameEnglish: '',
                    sponsoredThirdNameEnglish: '',
                    sponsoredFourthNameEnglish: '',
                    sponsoredFamilyNameEnglish: '',
                    englishName: '',
                    currentNationalityId: null,
                    dateOfBirth: null,
                    genderId: null,
                    motherEnglishName: '',
                    motherArabicName: '',
                    englishPlaceOfBirth: '',
                    arabicPlaceOfBirth: '',

                }


                var currentUser = authManager.getCurrentUser();
                if (currentUser.applicationId == lookups.application.establishment) {
                    scope.administrativeRegionId = currentUser.establishmentAdminRegionId;
                } else {
                    scope.administrativeRegionId = lookups.adminRegions.abuDhabi;
                }

                function init() {
                    if (scope.attachments == undefined) {
                        scope.attachments = [];
                    }
                    getOcrSetup();

                    $q.all(
                        [
                            lookupService.loadPassportTypes(),
                            lookupService.loadCountries(),
                            lookupService.loadGenders(),
                        ]
                    ).then(function (result) {
                        scope.passportTypes = result[0].data;
                        scope.countries = result[1].data;
                        scope.genders = result[2].data;
                    });
                }
                init();

                scope.$watch('isNewBorn', function (newValue) {
                    if (newValue) {
                        scope.isNewBornService = true;
                    } else {
                        scope.isNewBornService = false;
                    }
                });
                scope.$watch('requestDraft', function (draft) {
                    if (draft && draft.attachments != undefined && draft.attachments.length > 0) {
                        scope.requestDraft.attachmentView = scope.requestDraft.attachments.filter(c => c.attachmentTypeId == scope.defualPassportAttachmentTypeId)
                    }
                });

                //#endregion

                //#region upload file

                scope.onFileSelect = function (file, callback) {
                    if (file) {
                        var reader = new FileReader();

                        reader.onload = function (event) {
                            var base64Data = event.target.result;
                            callback(base64Data);
                        };

                        reader.onerror = function (error) {
                            console.error('Error reading file:', error);
                            callback(null, error);  // Pass error to callback for handling
                        };

                        reader.readAsDataURL(file);
                    }
                }

                scope.uploadPassportFile = function (file, errFiles) {
                    if (errFiles && errFiles.length > 0) {
                        angular.forEach(errFiles, function (errFile) {

                            if (errFile.$error == 'maxSize') {

                                var message = $translate.instant("InvalidFileUploaded").replace("{MAX_SIZE}", $translate.instant(scope.attachmentMaxSize));

                                var options = { duration: 5000, type: "warning", isSticky: false, messageKey: message, titleKey: "" };
                                notificationsService.showNotification(options);
                            }
                        });
                    }
                    if (!file) {
                        return;
                    }
                    var isValidFile = attachmentService.validatePassportAttachment(file, scope.attachmentPassportAllowedTypesForOcr);
                    if (!isValidFile) {
                        return;
                    }


                    if (scope.attachments == undefined) {
                        scope.attachments = [];
                    }

                    scope.attachmentPassport = { attachmentFile: file };
                    if (!scope.attachments.length > 0) {
                        scope.attachments.push({ attachmentTypeId: scope.defualPassportAttachmentTypeId, name: scope.getPassportAttachmentTypeName(), attachmentFile: file, attachmentFileMIMEType: file.type, originalFileName: file.name });
                    }
                    else {
                        angular.forEach(scope.attachments, function (attachment) {
                            if (attachment && attachment.attachmentTypeId == scope.defualPassportAttachmentTypeId) {
                                var index = scope.attachments.indexOf(attachment);
                                scope.attachments.splice(index, 1);
                            }
                        });
                        scope.attachments.push({ attachmentTypeId: scope.defualPassportAttachmentTypeId, name: scope.getPassportAttachmentTypeName(), attachmentFile: file, attachmentFileMIMEType: file.type, originalFileName: file.name });
                    }
                    if (scope.attachments.length > 0) {
                        if (scope.enableCropPassportImage) {
                            scope.modify(scope.attachments[0]);
                        } else {
                            scope.onFileSelect(file, function (imageSrc) {
                                scope.$apply(function () {

                                    imageSrc = imageSrc.replace(/^data:image\/(jpeg|png);base64,/, '');
                                    loadPassportData(imageSrc);
                                });
                            });
                        }
                    }
                }

                scope.modify = function (attachment) {

                    localStorage.setItem('personalImage', false);

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

                function create_blob(file, callback) {
                    var reader = new FileReader();
                    reader.onload = function () { callback(reader.result) };
                    reader.readAsDataURL(file);
                }

                function setCropParamters(blob_string) {

                    scope.options = {};
                    scope.options.viewSizeWidth = 800;      // canvas size default 480 or 30% 50% 80%...
                    scope.options.viewSizeHeight = 400;
                    scope.options.outputImageRatioFixed = true;
                    scope.imageOut = '';
                    scope.showCropImageTool = true;
                    scope.options.image = blob_string;
                    scope.options.viewShowCropTool = true;
                    scope.ShowPassportUploader = false;

                    scope.imageCropperInternal.uploadImage(blob_string);


                    scope.$apply();

                }

                //#endregion

                //#region crop

                scope.cancelCrop = function () {
                    if (scope.requestDraft.request.attachments) {
                        scope.attachments = scope.requestDraft.request.attachments;
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

                    scope.modifiedAttachment.token = undefined;
                    scope.getThumb(scope.modifiedAttachment);
                    scope.showCropImageTool = false;
                    scope.$apply();
                    scope.onFileSelect(scope.modifiedAttachment.attachmentFile, function (imageSrc) {
                        scope.$apply(function () {
                            imageSrc = imageSrc.replace(/^data:image\/(jpeg|png);base64,/, '');

                            loadPassportData(imageSrc);
                        });
                    });

                }

                scope.getThumb = function (attachment) {
                    if (attachment) {
                        if (fileService.isImage(attachment.attachmentFileMIMEType) || (attachment.attachmentFile && fileService.isImage(attachment.attachmentFile.type))) {
                            if (attachment.token) {
                                fileService.getBase64FromImageUrl("../images/jpg_thumb.png", function (dataURL) {

                                    attachment.attachmentThumbnail = fileService.dataURItoBlob(dataURL);
                                    scope.$apply();
                                });
                            }
                            else {

                                attachment.attachmentThumbnail = attachment.attachmentFile;

                            }


                            //jpg_thumb.png

                        }
                        else if (fileService.isPDF(attachment.attachmentFileMIMEType) || (attachment.attachmentFile && fileService.isPDF(attachment.attachmentFile.type))) {

                            fileService.getBase64FromImageUrl("../images/pdf-thumb.png", function (dataURL) {

                                attachment.attachmentThumbnail = fileService.dataURItoBlob(dataURL);
                                scope.$apply();
                            });
                        }
                    }
                }

                if (scope.invalidPersonalImageSizeAndResolution != true)
                    scope.invalidPersonalImageSizeAndResolution = false;

                //#endregion

                //#region Ocr functions

                function getOcrSetup() {
                    var options = {
                        success: function (result) {
                            if (result != null) {

                                if (result.isActive == true && result.enablePassportOcrSetupProcess == true) {
                                    scope.showUpleoadPassportSection = true;
                                    scope.showTahalufOcr = true;
                                    scope.defualPassportAttachmentTypeId = result.defualPassportAttachmentTypeId;
                                    scope.requestDraft.showTahalufOcr = true;
                                    if (!scope.requestDraft.requestNumber && scope.requestDraft.moduleTransactionId == lookups.transactionTypes.issueVisa)
                                        scope.requestDraft.request.hideAccordionsBasedOnOCRResult = true;
                                    scope.enableCropPassportImage = result.enableCropPassportImage;
                                    if (scope.requestDraft.requestNumber && scope.requestDraft.attachments != undefined) {
                                        scope.requestDraft.attachmentView = scope.requestDraft.attachments.filter(c => c.attachmentTypeId == scope.defualPassportAttachmentTypeId)
                                    }
                                    scope.enableRetrieveExtraData = result.enableRetrieveExtraData;
                                    scope.enableConfimationPopup = result.enableConfimationPopup;
                                    scope.attachmentMaxSize = result.attachmentMaxSize;
                                    scope.attachmentPassportAllowedTypesForOcr = result.attachmentPassportAllowedTypesForOcr;
                                }
                            }
                        },
                        error: function (result) {
                            //var errorOption = { type: "error", duration: 5000, isSticky: true, messageBody: result[0].message, titleBody: "" };
                            //notificationsService.showNotification(errorOption);
                        },
                    };

                    var input = {
                        serviceTransactionId: $stateParams.serviceTransactionId,
                        administrativeRegionId: scope.requestDraft?.administrativeRegionId ? scope.requestDraft?.administrativeRegionId : scope.administrativeRegionId
                    };
                    apiHelperService.post('ocr/getOcrSetup', input, options);
                };

                scope.deletePassportFile = function () {
                    
                    scope.requestDraft.attachments = scope.requestDraft.attachments.filter(function (item) {
                        return item.attachmentTypeId !== scope.defualPassportAttachmentTypeId;
                    });
                    scope.requestDraft.request.attachments = scope.requestDraft.request.attachments.filter(function (item) {
                        return item.attachmentTypeId !== scope.defualPassportAttachmentTypeId;
                    });

                    scope.requestDraft.attachmentView = scope.requestDraft.attachmentView.filter(function (item) {
                        return item.attachmentTypeId !== scope.defualPassportAttachmentTypeId;
                    });
                    scope.clearData(); 
                };

                function loadPassportData(imageSrc) {
                    var options = {
                        success: function (result) {
                            if (result != null) {
                                fillData(result);
                            }
                        },
                        error: function (result) {
                            scope.requestDraft.request.hideAccordionsBasedOnOCRResult = false;
                            scope.clearData();
                            var errorOption = { type: "error", duration: 5000, isSticky: true, messageBody: result[0].message, titleBody: "" };
                            notificationsService.showNotification(errorOption);
                        },
                    };
                    var input = {
                        mrtdDataPageImage: imageSrc,
                        serviceTransactionId: $stateParams.serviceTransactionId,
                        administrativeRegionId: scope.requestDraft?.administrativeRegionId ? scope.requestDraft?.administrativeRegionId : scope.administrativeRegionId
                    };
                    apiHelperService.post('ocr/getPassportDetailsByOcr', input, options);
                };

                scope.getPassportAttachmentTypeName = function () {
                    var passportAttachmentTypeById = undefined;
                    if (scope.attachmentTypes != null && scope.attachmentTypes > 0) {
                        for (index = 0; index < scope.attachmentTypes.length; index++) {
                            if (lookups.attachmentTypeId.indexOf(scope.attachmentTypes[index].id) > -1) {
                                passportAttachmentTypeById = scope.attachmentTypes[index].text;
                                break;
                            }
                        }
                    }
                    else {
                        passportAttachmentTypeById = $translate.instant('OCRDefaultAttachmentName');
                    }
                    return passportAttachmentTypeById;
                };

                scope.clearData = function () {

                    scope.requestDraft.request.isUsingOcr = false;
                    scope.showConfirmationPopup = false;
                    scope.requestDraft.request.hideAccordionsBasedOnOCRResult = false;
                    scope.requestDraft.request.disablePassportData = false;
                    if (!scope.requestDraft.isInCompleteDraftFlag) {
                        scope.attachments = [];
                        scope.requestDraft.attachments = scope.requestDraft.attachments?.filter(function (item) {
                            return item.attachmentTypeId !== scope.defualPassportAttachmentTypeId;
                        });
                        scope.requestDraft.request.attachments = scope.requestDraft.request.attachments?.filter(function (item) {
                            return item.attachmentTypeId !== scope.defualPassportAttachmentTypeId;
                        });

                        scope.requestDraft.attachmentView = scope.requestDraft.attachmentView?.filter(function (item) {
                            return item.attachmentTypeId !== scope.defualPassportAttachmentTypeId;
                        });
                         

                        scope.requestDraft.request.passportTypeId = null;
                        scope.requestDraft.request.passportNumber = null;
                        scope.requestDraft.request.passportIssueDate = null;
                        scope.requestDraft.request.passportExpiryDate = null;
                        scope.requestDraft.request.passportCountryId = null;

                        scope.ocrObj.passportTypeId = null;
                        scope.ocrObj.passportNumber = null;
                        scope.ocrObj.passportIssueDate = null;
                        scope.ocrObj.passportExpiryDate = null;
                        scope.ocrObj.passportCountryId = null;

                        if (!scope.passportOnly || scope.isNewBorn) {
                            scope.requestDraft.request.dateOfBirth = null;
                            scope.requestDraft.request.englishName = "";
                            scope.requestDraft.request.genderId = null;
                            scope.requestDraft.request.motherArabicName = null;
                            scope.requestDraft.request.motherEnglishName = null;
                            scope.requestDraft.request.arabicPlaceOfBirth = null;
                            scope.requestDraft.request.englishPlaceOfBirth = null;

                           
                            scope.ocrObj.dateOfBirth = null;
                            scope.ocrObj.englishName = "";
                            scope.ocrObj.genderId = null;
                            scope.ocrObj.motherArabicName = null;
                            scope.ocrObj.motherEnglishName = null;
                            scope.ocrObj.arabicPlaceOfBirth = null;
                            scope.ocrObj.englishPlaceOfBirth = null;
                        }
                    }
                };

                fillData = function (result) {
                    scope.requestDraft.request.isUsingOcr = true;

                    if (scope.enableConfimationPopup == 'true') {
                        scope.showConfirmationPopup = true;
                        scope.ocrObj.passportTypeId = Number(result.passportTypeId);
                        scope.ocrObj.passportNumber = result.passportNumber;
                        scope.ocrObj.passportExpiryDate = result.passportExpiryDate;
                        scope.ocrObj.passportCountryId = Number(result.passportCountryId);

                        scope.ocrObj.passportIssueDate = result.passportIssueDate;
                        scope.ocrObj.passportIssuePlace = result.passportIssuePlace;

                        scope.ocrObj.firstName = scope.ocrObj.firstName != null ?
                            scope.ocrObj.firstName : result.firstName;

                        scope.ocrObj.secondName = scope.ocrObj.secondName != null ?
                            scope.ocrObj.secondName : result.secondName;

                        scope.ocrObj.thirdName = scope.ocrObj.thirdName != null ?
                            scope.ocrObj.thirdName : result.thirdName;

                        scope.ocrObj.familyName = scope.ocrObj.familyName != null ?
                            scope.ocrObj.familyName : result.familyName;

                        if (!scope.passportOnly || scope.isNewBorn) {
                            if (result.currentNationalityId)
                                scope.ocrObj.currentNationalityId = Number(result.currentNationalityId);
                            scope.ocrObj.dateOfBirth = result.dateOfBirth;
                            scope.ocrObj.englishName = result.englishName;
                            scope.ocrObj.genderId = Number(result.genderId);

                            scope.ocrObj.motherNameAr = result.motherNameAr;
                            scope.ocrObj.motherNameEn = result.motherNameEn;

                            scope.ocrObj.placeOfBirthArabic = result.placeOfBirthArabic;
                            scope.ocrObj.placeOfBirthEnglish = result.placeOfBirthEnglish;

                        }
                    } else {
                        scope.showConfirmationPopup = false;
                        if (scope.requestDraft.attachments != undefined && scope.requestDraft.attachments.length > 0) {
                            scope.requestDraft.attachments = scope.requestDraft.attachments.map(att => {
                                if (att.attachmentTypeId == scope.defualPassportAttachmentTypeId) {
                                    return scope.attachments.find(newAtt => newAtt.attachmentTypeId == scope.defualPassportAttachmentTypeId) || att;
                                }
                                return att;
                            });
                        }
                        //If passport attachment doesn't exist, add it
                        else { 
                            const newPassportAttachment = scope.attachments.find(newAtt => newAtt.attachmentTypeId == scope.defualPassportAttachmentTypeId);
                            if (newPassportAttachment) {
                                scope.requestDraft.attachments = [];
                                scope.requestDraft.attachments.push(newPassportAttachment);
                            }
                        }
                        
                        scope.requestDraft.request.attachments = scope.requestDraft.attachments;
                        scope.requestDraft.attachmentView = scope.requestDraft.attachments.filter(c => c.attachmentTypeId == scope.defualPassportAttachmentTypeId);

                        scope.requestDraft.request.passportTypeId = Number(result.passportTypeId);
                        scope.requestDraft.request.passportNumber = result.passportNumber;
                        scope.requestDraft.request.passportExpiryDate = result.passportExpiryDate;
                        scope.requestDraft.request.passportCountryId = Number(result.passportCountryId);

                        scope.requestDraft.request.passportIssueDate = result.passportIssueDate;
                        scope.requestDraft.request.passportIssuePlace = result.passportIssuePlace;
                        scope.requestDraft.request.hideAccordionsBasedOnOCRResult = false;
                        scope.requestDraft.request.sponsoredFirstNameEnglish = scope.requestDraft.request.sponsoredFirstNameEnglish != null ?
                            scope.requestDraft.request.sponsoredFirstNameEnglish : result.firstName;

                        scope.requestDraft.request.sponsoredSecondNameEnglish = scope.requestDraft.request.sponsoredSecondNameEnglish != null ?
                            scope.requestDraft.request.sponsoredSecondNameEnglish : result.secondName;

                        scope.requestDraft.request.sponsoredThirdNameEnglish = scope.requestDraft.request.sponsoredThirdNameEnglish != null ?
                            scope.requestDraft.request.sponsoredThirdNameEnglish : result.thirdName;

                        scope.requestDraft.request.sponsoredFamilyNameEnglish = scope.requestDraft.request.sponsoredFamilyNameEnglish != null ?
                            scope.requestDraft.request.sponsoredFamilyNameEnglish : result.familyName;

                        if (!scope.passportOnly || scope.isNewBorn) {
                            if (result.currentNationalityId)
                                scope.requestDraft.request.currentNationalityId = Number(result.currentNationalityId);
                            scope.requestDraft.request.dateOfBirth = result.dateOfBirth;
                            scope.requestDraft.request.englishName = result.englishName;
                            scope.requestDraft.request.genderId = Number(result.genderId);

                            scope.requestDraft.request.motherArabicName = result.motherNameAr;
                            scope.requestDraft.request.motherEnglishName = result.motherNameEn;

                            scope.requestDraft.request.arabicPlaceOfBirth = result.placeOfBirthArabic;
                            scope.requestDraft.request.englishPlaceOfBirth = result.placeOfBirthEnglish;

                        }


                    }

                }

                scope.submitOcrForm = function () {
                    if ((scope.passportOnly != undefined && !scope.passportOnly) || (scope.isNewBorn != undefined && scope.isNewBorn)) {
                        let validEnglishName = scope.checkEnglishTextWithWhiteSpace(scope.ocrObj.englishName);
                        if (!validEnglishName.$$state.value.isValid || scope.ocrObj.englishName == undefined) {
                            return false;
                        }
                    }
                    let validPassportNumber = scope.checkOnPassportNumber(scope.ocrObj.passportNumber);
                    if (!validPassportNumber.$$state.value.isValid || scope.ocrObj.passportTypeId == undefined || scope.ocrObj.passportTypeId == 0
                        || scope.ocrObj.passportNumber == undefined || scope.ocrObj.passportNumber == null || scope.ocrObj.passportExpiryDate == undefined
                        || scope.ocrObj.passportExpiryDate == null || scope.ocrObj.passportCountryId == undefined || scope.ocrObj.passportCountryId == 0) {
                        return false;
                    }
                    if (scope.requestDraft.attachments != undefined && scope.requestDraft.attachments.length > 0) {
                        scope.requestDraft.attachments = scope.requestDraft.attachments.map(att => {
                            if (att.attachmentTypeId == scope.defualPassportAttachmentTypeId) {
                                return scope.attachments.find(newAtt => newAtt.attachmentTypeId == scope.defualPassportAttachmentTypeId) || att;
                            }
                            return att;
                        });
                    }
                    //If passport attachment doesn't exist, add it
                    else { 
                        const newPassportAttachment = scope.attachments.find(newAtt => newAtt.attachmentTypeId == scope.defualPassportAttachmentTypeId);
                        if (newPassportAttachment) {
                            scope.requestDraft.attachments = [];
                            scope.requestDraft.attachments.push(newPassportAttachment);
                        }
                    }
               
                    scope.requestDraft.request.attachments = scope.requestDraft.attachments;
                    scope.requestDraft.attachmentView = scope.requestDraft.attachments.filter(c => c.attachmentTypeId == scope.defualPassportAttachmentTypeId);

                    scope.requestDraft.request.passportTypeId = Number(scope.ocrObj.passportTypeId);
                    scope.requestDraft.request.passportNumber = scope.ocrObj.passportNumber;
                    scope.requestDraft.request.passportExpiryDate = scope.ocrObj.passportExpiryDate;
                    scope.requestDraft.request.passportCountryId = Number(scope.ocrObj.passportCountryId);
                    scope.requestDraft.request.disablePassportData = true;
                    scope.requestDraft.request.hideAccordionsBasedOnOCRResult = false;
                    //if (scope.ocrObj.passportNumber != scope.ocrActualResult.passportNumber)
                    //    scope.requestDraft.request.ocrPasportNumberChanged = true;
                    scope.requestDraft.request.passportIssueDate = scope.ocrObj.passportIssueDate;
                    scope.requestDraft.request.passportIssuePlace = scope.ocrObj.passportIssuePlace;

                    scope.requestDraft.request.sponsoredFirstNameEnglish = scope.requestDraft.request.sponsoredFirstNameEnglish != null ?
                        scope.requestDraft.request.sponsoredFirstNameEnglish : scope.ocrObj.firstName;
                  
                    scope.requestDraft.request.sponsoredSecondNameEnglish = scope.requestDraft.request.sponsoredSecondNameEnglish != null ?
                        scope.requestDraft.request.sponsoredSecondNameEnglish : scope.ocrObj.secondName;

                    scope.requestDraft.request.sponsoredThirdNameEnglish = scope.requestDraft.request.sponsoredThirdNameEnglish != null ?
                        scope.requestDraft.request.sponsoredThirdNameEnglish : scope.ocrObj.thirdName;

                    scope.requestDraft.request.sponsoredFamilyNameEnglish = scope.requestDraft.request.sponsoredFamilyNameEnglish != null ?
                        scope.requestDraft.request.sponsoredFamilyNameEnglish : scope.ocrObj.familyName;

                    if (!scope.passportOnly || scope.isNewBorn) {
                        if (scope.ocrObj.currentNationalityId)
                            scope.requestDraft.request.currentNationalityId = Number(scope.ocrObj.currentNationalityId);
                        scope.requestDraft.request.dateOfBirth = scope.ocrObj.dateOfBirth;
                        scope.requestDraft.request.englishName = scope.ocrObj.englishName;
                        scope.requestDraft.request.genderId = Number(scope.ocrObj.genderId);

                        scope.requestDraft.request.motherArabicName = scope.ocrObj.motherNameAr;
                        scope.requestDraft.request.motherEnglishName = scope.ocrObj.motherNameEn;

                        scope.requestDraft.request.arabicPlaceOfBirth = scope.ocrObj.placeOfBirthArabic;
                        scope.requestDraft.request.englishPlaceOfBirth = scope.ocrObj.placeOfBirthEnglish;

                    }
                    scope.showConfirmationPopup = false;
                }

                //#endregion

                //#region drag & drop file
                scope.file = null;
                scope.isDragging = false;

                scope.onFileDrop = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    scope.isDragging = false;
                    const files = event.dataTransfer.files;
                    if (files.length > 0) {
                        scope.file = files[0];
                    }
                    scope.$apply();
                };
                //#endregion

                //#region baseCrl
                scope.checkOnPassportNumber = function (passportNumber) {
                    if (passportNumber) {
                        var isValid = true;

                        for (var i = 0; i < passportNumber.length; i++) {
                            if (!(parseInt(passportNumber[i]) >= 0)) {
                                if (!passportNumber[i].match(/^[A-Za-z]+$/)) {
                                    isValid = false;
                                    break;
                                }
                            }
                        }
                        var deferred = $q.defer();
                        deferred.resolve({ isValid: isValid, message: $translate.instant('numberInValid') });

                        return deferred.promise;
                    }
                }

                scope.dateFormat = "dd/MM/yyyy";

                scope.validateDates = function (smallDate, biggerDate, errorMessageKey) {

                    var deferred = $q.defer();
                    var valid = false;
                    if (!smallDate || !biggerDate)
                        valid = false;
                    else if (smallDate <= biggerDate)
                        valid = true;
                    deferred.resolve({ isValid: valid, message: $translate.instant(errorMessageKey) });
                    return deferred.promise;
                };

                scope.passportExpireDatePopup = {
                    opened: false
                };
                scope.openPassportExpireDatePopup = function () {
                    scope.passportExpireDatePopup.opened = true;
                };
                scope.minPassportExpireDate = new Date();

                var date = new Date();
                date.setDate(date.getDate());

                scope.maxPassportIssueDate = date;

                scope.maxDateOfBirth = date;
                scope.dateOfBirthMaxDate = new Date();

                scope.openPassportIssueDatePopup = function () {
                    scope.passportIssueDatePopup.opened = true;
                };
                scope.passportIssueDatePopup = {
                    opened: false
                };

                scope.checkEnglishTextWithWhiteSpace = function (text) {
                    var errorMessage = '';
                    var deferred = $q.defer();
                    var pattern = new RegExp(/^[a-zA-Z0-9?><;,{}/[\]\-_+.()& |']*$/);
                    if (text) {
                        valid = pattern.test(text.trim());
                        errorMessage = $translate.instant('EnglishContentOnly');
                    }

                    if (valid) {
                        pattern = new RegExp(/^\S*$/);
                        valid = !pattern.test(text.trim());
                        errorMessage = $translate.instant('whiteSpace');
                    }
                    deferred.resolve({ isValid: valid, message: errorMessage });
                    return deferred.promise;

                };

                scope.checkArabicTextWithWhiteSpace = function (text) {
                    var errorMessage = '';
                    var deferred = $q.defer();
                    var pattern = new RegExp(/^[\u0621-\u064A\u0660-\u0669 , {}/[\]\-_+()&.'ءًٌٍَُُِّْ~-]+$/);
                    if (text) {
                        valid = pattern.test(text.trim());
                        errorMessage = $translate.instant('ArabicContentOnly');
                    }

                    if (valid) {
                        pattern = new RegExp(/^\S*$/);
                        valid = !pattern.test(text.trim());
                        errorMessage = $translate.instant('whiteSpace');
                    }
                    deferred.resolve({ isValid: valid, message: errorMessage });
                    return deferred.promise;

                };

                scope.checkEnglishText = function (text) {
                    var deferred = $q.defer();
                    var pattern = new RegExp(/^[a-zA-Z0-9?><;,{}/[\]\-_+.()& |']*$/);
                    if (text)
                        var valid = pattern.test(text.trim());
                    deferred.resolve({ isValid: valid, message: $translate.instant('EnglishContentOnly') });
                    return deferred.promise;
                };

                scope.checkArabicText = function (text) {
                    var deferred = $q.defer();
                    var pattern = new RegExp(/^[\u0621-\u064A\u0660-\u0669 ,?0-9, {}/[\]\-_+()&.'ءًٌٍَُُِّْ~-]+$/);
                    var valid = true;
                    if (text)
                        valid = pattern.test(text.trim());
                    deferred.resolve({ isValid: valid, message: $translate.instant('ArabicContentOnly') });
                    return deferred.promise;
                };

                scope.DateFormater = function (e) {


                    var value = e.srcElement.value;

                    if (e.key == '/') {
                        value = value.slice(0, value.length - 1);
                    }
                    if (value.indexOf('//') > -1) {
                        value = value.replace('//', '/');
                    }

                    if (value.length == 2)
                        value += '/'
                    if (value.length == 5)
                        value += '/'


                    e.srcElement.value = value;
                }

                scope.dateOfBirthMinDate = moment().subtract(125, 'years').format("YYYY/MM/DD");
                scope.dateOfBirthMaxDate = new Date();
                scope.openDateOfBirthPopup = function () { scope.dateOfBirthPopup.opened = true; };

                scope.dateOfBirthPopup = { opened: false };

                //#endregion

            }
        }
    }]);