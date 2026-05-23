mainApp.factory('draftHelperService', ['$http', '$q', 'apiHelperService', '$stateParams', 'authManager', function ($http, $q, apiHelperService, $stateParams, authManager) {
    var ResidencyServicetransIds = [679, 58, 662, 57, 59, 56, 690, 688, 681, 686, 687, 689, 69, 70, 71, 68, 680, 120, 367, 121, 122, 569, 1106, 1116, 1093, 1095,1097, 563, 1210, 568, 685]
    var ResidencyNewBornServicetransIds = [690, 688, 681, 686, 687, 689, 69, 70, 71, 68,1106,1116,1097, 568, 685]
    var unifiedFormIssuanceRenewServicetransIds = [506, 504, 502, 558, 496, 558, 557, 556, 555, 497,1094,1098,840, 879, 1212, 852]
    var eidaCitizenService = [559, 573, 561, 575, 572]
    var eidaResidentService = [570, 580, 571]
    var user = authManager.getCurrentUser()
    function calculateAge(birthday) { // birthday is a date
        birthday = new Date(birthday)
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);

    }
    return {
        checkIfValidToRemoveRelanshipSamePersonOrPartnerFamily: function (servicetransId) {
            if (ResidencyServicetransIds.includes(parseInt(servicetransId)) || ResidencyNewBornServicetransIds.includes(parseInt(servicetransId)) || unifiedFormIssuanceRenewServicetransIds.includes(parseInt(servicetransId)))
                return true
            else
                return false
        },
        calculateAge: function calculateAge(birthday) { // birthday is string 
            birthday = new Date(birthday)
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);

        },
        checkOtpVerificationToSkipFingerPrint: function (successCallback, errorCallback, params) {
            var options = {
                success: successCallback,
                error: errorCallback,
            };
            apiHelperService.post('icaRequest/checkOtpVerificationToSkipFingerPrint', params, options);
        },
        setDefaultValues: function (servicetransId, valueType, value, moduleId, transactionId) {
            if (moduleId && moduleId == window.lookups.module.visa && (transactionId == window.lookups.transactionTypes.issueVisa || transactionId == window.lookups.transactionTypes.issueVisaForFamilyGroup)) {
                if (valueType == "currentNationalityId") {
                    return {
                        passportCountryId: value, // must be spnsor nationality
                        // currentNationalityId : must be spnsor nationality
                    }
                }
                else if (valueType == "dateOfBirth") {
                    var age = calculateAge(value);
                    if (age <= 15) {
                        return {
                            maritalStatusId: lookups.maritalStatuses.Single,
                            educationLevelId: lookups.educationLevels.none,
                            professionId: lookups.professions.notEmployed
                        }
                    } else {
                        return {
                            maritalStatusId: null,
                            educationLevelId: null,
                            professionId: null
                        }
                    }
                }

            }
            if (ResidencyServicetransIds.includes(parseInt(servicetransId))) {

                if (valueType == "currentNationalityId") {
                    return {
                        passportCountryId: value,
                    }

                }
                else if (valueType == "dateOfBirth") {
                    var age = calculateAge(value);
                    if (age <= 15) {
                        return {
                            maritalStatusId: lookups.maritalStatuses.Single,
                            educationLevelId: lookups.educationLevels.none,
                            professionId: lookups.professions.notEmployed
                        }
                    }
                    else {
                        return {
                            maritalStatusId: null,
                            educationLevelId: null,
                            professionId: null
                        }
                    }
                }
            }
            if (eidaResidentService.includes(parseInt(servicetransId))) {
                if (user.applicationId != window.lookups.application.TypingCenter) {
                    return;
                }
                if (valueType == "currentNationalityId") {
                    return {
                        passportCountryId: value,
                    }

                }
                else if (valueType == "dateOfBirth") {
                    var age = calculateAge(value);
                    if (age <= 15) {
                        return {
                            maritalStatusId: lookups.maritalStatuses.Single,
                            //educationLevelId: lookups.educationLevels.none,
                            //professionId: lookups.professions.notEmployed
                        }
                    }
                    else {
                        return {
                            maritalStatusId: null,
                            //educationLevelId: null,
                            //professionId: null
                        }
                    }
                }
            }
            if (eidaCitizenService.includes(parseInt(servicetransId))) {
                if (user.applicationId != window.lookups.application.TypingCenter) {
                    return;
                }
                if (valueType == "currentNationalityId") {
                    return {
                        passportCountryId: value,
                    }

                }
                else if (valueType == "dateOfBirth") {
                    var age = calculateAge(value);
                    if (age <= 15) {
                        return {
                            maritalStatusId: lookups.maritalStatuses.Single,
                            //educationLevelId: lookups.educationLevels.none,
                            //professionId: lookups.professions.notEmployed
                        }
                    }
                    else {
                        return {
                            maritalStatusId: null,
                            //educationLevelId: null,
                            //professionId: null
                        }
                    }
                }
            }
            if (unifiedFormIssuanceRenewServicetransIds.includes(parseInt(servicetransId))) {
                if (user.applicationId != window.lookups.application.TypingCenter) {
                    return;
                }
                if (valueType == "currentNationalityId") {
                    return {
                        passportCountryId: value,
                    }

                }
                else if (valueType == "dateOfBirth") {
                    var age = calculateAge(value);
                    if (age <= 15) {
                        return {
                            maritalStatusId: lookups.maritalStatuses.Single,
                            educationLevelId: lookups.educationLevels.none,
                            professionId: lookups.professions.notEmployed
                        }
                    }
                    else {
                        return {
                            maritalStatusId: null,
                            educationLevelId: null,
                            professionId: null
                        }
                    }
                }
            }
            else if (ResidencyNewBornServicetransIds.includes(parseInt(servicetransId))) {
                if (valueType == "currentNationalityId") {

                    return {
                        passportCountryId: value, // must be spnsor nationality
                        // currentNationalityId : must be spnsor nationality
                    }
                    return objap
                }
                else if (valueType == "dateOfBirth") {
                    return {
                        maritalStatusId: lookups.maritalStatuses.Single,
                        educationLevelId: lookups.educationLevels.none,
                        professionId: lookups.professions.notEmployed
                    }
                }
            }
        },

        getNewTranslationCode: function (successCallback, errorCallback, params) {
            var options = {
                success: successCallback,
                error: errorCallback
            };
            apiHelperService.post('shared/sponsor/type/description', params, options)
        },
        getTranslationKey: function (trsnslationCode) {
            if (trsnslationCode == 'HOST_SPONSOR') {
                return {
                    GuarantorType: "category",
                    GuarantorDepartment: "hostDepartment",
                    sponsorDepartment: "hostDepartment",
                    sponsorNumber: "hostNumber",
                    GuarantorNumber: "hostNumber",
                    sponsorArabicName: "hostArabicName",
                    GuarantorAr: "hostArabicName",
                    sponsorEnglishName: "hostEnglishName",
                    GuarantorEn: "hostEnglishName",
                    sponsorType: "category",
                    sponsorIdentityNumber: "hostIdentityNumber",
                    sponsorName: "hostName",
                    sponsorDeathOfDate: "sponsorDeathOfDate",
                    sponsorInformation: "hostInformation",
                    GuarantorData: "hostInformation",
                    sponsorMaritalStatus: "hostMaritalStatus",
                    sponsoredNationality: "hostNationality",
                    sponsorGender: "hostGender",
                    sponsorPassportNumber: "hostPassportNumber",
                    newSponsorInformation: "hostNewSponsorInformation",
                    readCurrentsponsorInformation:"readCurrentHostInformation",
                    residentFileNumber: "hostResidentFileNumber",
                    readNewsponsorInformation: "readNewHostInformation",
                    department: "hostDepartment"
                }
            } else if (trsnslationCode == 'FAMILY_SPONSOR') {
                return {
                   
                    GuarantorDepartment: "familySponsorDepartment",
                    sponsorDepartment: "familySponsorDepartment",
                    sponsorNumber: "familySponsorNumber",
                    GuarantorNumber: "familySponsorNumber",
                    sponsorArabicName: "familySponsorArabicName",
                    GuarantorAr: "familySponsorArabicName",
                    sponsorEnglishName: "familySponsorEnglishName",
                    GuarantorEn: "familySponsorEnglishName",
                    sponsorName: "familySponsorName",
                    sponsorType: "categorySponsor",
                    sponsorIdentityNumber: "familySponsorIdentityNumber",
                    sponsorDeathOfDate: "sponsorDeathOfDate",
                    sponsorInformation: "familySponsorformation",
                    GuarantorData: "familySponsorformation",
                    sponsorMaritalStatus: "familySponsorMaritalStatus",
                    sponsoredNationality: "familySponsorNationality",
                    sponsorGender: "familySponsorGender",
                    sponsorPassportNumber: "familySponsorPassportNumber",
                    residentFileNumber: "familySponsorResidentFileNumber",
                    newSponsorInformation: "familySponsorNewSponsorInformation",
                    department: "familySponsorDepartment",
                    readNewsponsorInformation: "readNewFamilySponsorInformation",
                    readCurrentsponsorInformation: "readCurrentFamilySponsorInformation",
                    GuarantorType:"category"
                }
            } else if (trsnslationCode == 'EMPLOYER_SPONSOR') {
                return {
                   
                    GuarantorDepartment: "employerDepartment",
                    sponsorDepartment: "employerDepartment",
                    sponsorNumber: "employerNumber",
                    GuarantorNumber: "employerNumber",
                    sponsorArabicName: "employerArabicName",
                    GuarantorAr: "employerArabicName",
                    sponsorEnglishName: "employerEnglishName",
                    GuarantorEn: "employerEnglishName",
                    sponsorName: "employerNames",
                    sponsorType: "category",
                    sponsorIdentityNumber: "employerIdentityNumber",
                    sponsorDeathOfDate: "sponsorDeathOfDate",
                    sponsorInformation: "employerInformation",
                    GuarantorData: "employerInformation",
                    sponsorMaritalStatus: "employerMaritalStatus",
                    sponsoredNationality: "employerNationality",
                    sponsorGender: "employerGender",
                    sponsorPassportNumber: "employerPassportNumber",
                    residentFileNumber: "employerResidentFileNumber",
                    newSponsorInformation: "employerNewSponsorInformation",
                    department: "employerDepartment",
                    readNewsponsorInformation: "readNewEmployerInformation",
                    readCurrentsponsorInformation: "readCurrentEmployerInformation",
                    GuarantorType: "category"
                }
            } else if (trsnslationCode == "DEFAULT") {
                return {
                    GuarantorAr: "GuarantorAr",
                    GuarantorEn:"GuarantorEn",
                    GuarantorData: "GuarantorData",
                    sponsorDepartment: "sponsorDepartment",
                    sponsorNumber: "sponsorNumber",
                    GuarantorNumber: "sponsorNumber",
                    sponsorArabicName: "sponsorArabicName",
                    sponsorEnglishName: "sponsorEnglishName",
                    sponsorName: "sponsorName",
                    sponsorType: "sponsorType",
                    sponsorIdentityNumber: "sponsorIdentityNumber",
                    sponsorDeathOfDate: "sponsorDeathOfDate",
                    sponsorInformation: "sponsorInformation",
                    sponsorMaritalStatus: "sponsorMaritalStatus",
                    sponsoredNationality: "sponsoredNationality",
                    sponsorGender: "sponsorGender",
                    sponsorPassportNumber: "sponsorPassportNumber",
                    department: "department",
                    residentFileNumber: "residentFileNumber",
                    readNewsponsorInformation: "readNewsponsorInformation",
                    readCurrentsponsorInformation: "readCurrentsponsorInformation",
                    newSponsorInformation: "newSponsorInformation",
                    GuarantorDepartment: "GuarantorDepartment",
                    GuarantorType: "GuarantorType"
                }
            }
        }
    }
}]);