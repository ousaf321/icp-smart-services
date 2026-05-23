mainApp.factory('lookupService', ['$http', '$q', 'apiHelperService', '$stateParams', function ($http, $q, apiHelperService, $stateParams) {
    return {

        loadShipTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/shipTypes', options);
        },

        loadCountries: function (successCallback, errorCallback, serviceTrans, currentUser, externalSystemID, languageId) {
            var currentServiceTransactionId = $stateParams.serviceTransactionId;
            var successCallbackFun = successCallback;
            function excludeCountries(response) {
                if (response) {
                    if (!((serviceTrans == 10 || serviceTrans == 2 || serviceTrans == 9 || serviceTrans == 1) &&
                        currentUser && (currentUser.userName == 'travelone002@gmail.com' || currentUser.userName == 'r_uae@eim.ae')))
                        if (!serviceTrans || (serviceTrans && serviceTrans != '414' && serviceTrans != '367' && serviceTrans != '121' &&
                            serviceTrans != '120' && serviceTrans != '122' && serviceTrans != '429' && serviceTrans != '129' && serviceTrans != '130' &&
                            serviceTrans != '123' && serviceTrans != '124' && serviceTrans != '438' && serviceTrans != '402' && serviceTrans != '125' &&
                            serviceTrans != '404' && serviceTrans != '127' && serviceTrans != '405' && serviceTrans != '128' && serviceTrans != '403' &&
                            serviceTrans != '126' && serviceTrans != '428' && serviceTrans != '368' && serviceTrans != '406' && serviceTrans != '212' &&
                            serviceTrans != '418' && serviceTrans != '477' && serviceTrans != '459' && serviceTrans != '187' && serviceTrans != '1095')) {
                            var i;
                            var found = false;
                            for (i = 0; i < response.length; i++) {
                                if (response[i].id == 21) {
                                    //found = true;
                                    break;
                                }
                            }
                            if (found) {
                                response.splice(i, 1);
                            }
                        }

                    if (!serviceTrans || (serviceTrans && serviceTrans != '1' && serviceTrans != '2' && serviceTrans != '5' &&
                        serviceTrans != '6' && serviceTrans != '10' && serviceTrans != '16' && serviceTrans != '17' && serviceTrans != '378' &&
                        serviceTrans != '380' && serviceTrans != '448' && serviceTrans != '449' && serviceTrans != '450' && serviceTrans != '452' &&
                        serviceTrans != '454' && serviceTrans != '455' && serviceTrans != '466' && serviceTrans != '468' && serviceTrans != '471')) {
                        var i;
                        var found = false;
                        for (i = 0; i < response.length; i++) {
                            if (response[i].id == 36) {
                                found = true;
                                break;
                            }
                        }
                        if (found) {
                            response.splice(i, 1);
                        }
                    }
                    if (successCallbackFun) {

                        successCallbackFun(response);
                    }
                }
            }
            var options = {
                success: excludeCountries,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/countries?externalSystemID=' + externalSystemID + '&languageId=' + languageId + '&serviceTransactionId=' + currentServiceTransactionId, options);
        },

        loadNonAutoVisaCountries: function (successCallback, errorCallback, serviceTrans, currentUser) {
            var currentServiceTransactionId = $stateParams.serviceTransactionId;
            var successCallbackFun = successCallback;
            function excludeCountries(response) {
                if (response) {
                    if (!((serviceTrans == 10 || serviceTrans == 2 || serviceTrans == 9 || serviceTrans == 1) && currentUser && (currentUser.userName == 'travelone002@gmail.com' || currentUser.userName == 'r_uae@eim.ae')))
                        if (!serviceTrans || (serviceTrans && serviceTrans != '414' && serviceTrans != '367' && serviceTrans != '121' && serviceTrans != '120' && serviceTrans != '122' && serviceTrans != '429' && serviceTrans != '129' && serviceTrans != '130' && serviceTrans != '123' && serviceTrans != '124' && serviceTrans != '438' && serviceTrans != '402' && serviceTrans != '125' && serviceTrans != '404' && serviceTrans != '127' && serviceTrans != '405' && serviceTrans != '128' && serviceTrans != '403' && serviceTrans != '126' && serviceTrans != '428' && serviceTrans != '368' && serviceTrans != '406' && serviceTrans != '212' && serviceTrans != '418' && serviceTrans != '477' && serviceTrans != '459' && serviceTrans != '187')) {
                            var i;
                            var found = false;
                            for (i = 0; i < response.length; i++) {
                                if (response[i].id == 21) {
                                    //found = true;
                                    break;
                                }
                            }
                            if (found) {
                                response.splice(i, 1);
                            }
                        }

                    if (!serviceTrans || (serviceTrans && serviceTrans != '1' && serviceTrans != '2' && serviceTrans != '5' &&
                        serviceTrans != '6' && serviceTrans != '10' && serviceTrans != '16' && serviceTrans != '17' && serviceTrans != '378' &&
                        serviceTrans != '380' && serviceTrans != '448' && serviceTrans != '449' && serviceTrans != '450' && serviceTrans != '452' &&
                        serviceTrans != '454' && serviceTrans != '455' && serviceTrans != '466' && serviceTrans != '468' && serviceTrans != '471')) {
                        var i;
                        var found = false;
                        for (i = 0; i < response.length; i++) {
                            if (response[i].id == 36) {
                                found = true;
                                break;
                            }
                        }
                        if (found) {
                            response.splice(i, 1);
                        }
                    }

                    if (successCallbackFun)
                        successCallbackFun(response);
                }
            }
            var options = {
                success: excludeCountries,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/countries/nonAutoVisa' + '?serviceTransactionId=' + currentServiceTransactionId, options);
        },

        loadAutoVisaCountries: function (successCallback, errorCallback, serviceTrans, currentUser) {
            var successCallbackFun = successCallback;
            function excludeCountries(response) {
                if (response) {
                    if (!((serviceTrans == 10 || serviceTrans == 2 || serviceTrans == 9 || serviceTrans == 1) && currentUser && (currentUser.userName == 'travelone002@gmail.com' || currentUser.userName == 'r_uae@eim.ae')))
                        if (!serviceTrans || (serviceTrans && serviceTrans != '414' && serviceTrans != '367' && serviceTrans != '121' && serviceTrans != '120' && serviceTrans != '122' && serviceTrans != '429' && serviceTrans != '129' && serviceTrans != '130' && serviceTrans != '123' && serviceTrans != '124' && serviceTrans != '438' && serviceTrans != '402' && serviceTrans != '125' && serviceTrans != '404' && serviceTrans != '127' && serviceTrans != '405' && serviceTrans != '128' && serviceTrans != '403' && serviceTrans != '126' && serviceTrans != '428' && serviceTrans != '368' && serviceTrans != '406' && serviceTrans != '212' && serviceTrans != '418' && serviceTrans != '477' && serviceTrans != '459' && serviceTrans != '187')) {
                            var i;
                            var found = false;
                            for (i = 0; i < response.length; i++) {
                                if (response[i].id == 21) {
                                    //found = true;
                                    break;
                                }
                            }
                            if (found) {
                                response.splice(i, 1);
                            }
                        }

                    if (!serviceTrans || (serviceTrans && serviceTrans != '1' && serviceTrans != '2' && serviceTrans != '5' &&
                        serviceTrans != '6' && serviceTrans != '10' && serviceTrans != '16' && serviceTrans != '17' && serviceTrans != '378' &&
                        serviceTrans != '380' && serviceTrans != '448' && serviceTrans != '449' && serviceTrans != '450' && serviceTrans != '452' &&
                        serviceTrans != '454' && serviceTrans != '455' && serviceTrans != '466' && serviceTrans != '468' && serviceTrans != '471')) {
                        var i;
                        var found = false;
                        for (i = 0; i < response.length; i++) {
                            if (response[i].id == 36) {
                                found = true;
                                break;
                            }
                        }
                        if (found) {
                            response.splice(i, 1);
                        }
                    }


                    if (successCallbackFun)
                        successCallbackFun(response);
                }
            }
            var options = {
                success: excludeCountries,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/countries/autoVisa', options);
        },

        loadCountriesWithoutUae: function (successCallback, errorCallback, serviceTrans, currentUser, externalSystemID) {
            var currentServiceTransactionId = $stateParams.serviceTransactionId;
            var successCallbackFun = successCallback;
            function excludeCountries(response) {
                if (response) {
                    if (!((serviceTrans == 10 || serviceTrans == 2 || serviceTrans == 9 || serviceTrans == 1) && currentUser && (currentUser.userName == 'travelone002@gmail.com' || currentUser.userName == 'r_uae@eim.ae')))
                        if (!serviceTrans || (serviceTrans && serviceTrans != '414' && serviceTrans != '367' && serviceTrans != '121' && serviceTrans != '120' && serviceTrans != '122' && serviceTrans != '429' && serviceTrans != '129' && serviceTrans != '130' && serviceTrans != '123' && serviceTrans != '124' && serviceTrans != '438' && serviceTrans != '402' && serviceTrans != '125' && serviceTrans != '404' && serviceTrans != '127' && serviceTrans != '405' && serviceTrans != '128' && serviceTrans != '403' && serviceTrans != '126' && serviceTrans != '428' && serviceTrans != '368' && serviceTrans != '406' && serviceTrans != '212' && serviceTrans != '418' && serviceTrans != '477' && serviceTrans != '459' && serviceTrans != '187')) {
                            var i;
                            var found = false;
                            for (i = 0; i < response.length; i++) {
                                if (response[i].id == 21) {
                                    //found = true;
                                    break;
                                }
                            }
                            if (found) {
                                response.splice(i, 1);
                            }
                        }

                    if (!serviceTrans || (serviceTrans && serviceTrans != '1' && serviceTrans != '2' && serviceTrans != '5' &&
                        serviceTrans != '6' && serviceTrans != '10' && serviceTrans != '16' && serviceTrans != '17' && serviceTrans != '378' &&
                        serviceTrans != '380' && serviceTrans != '448' && serviceTrans != '449' && serviceTrans != '450' && serviceTrans != '452' &&
                        serviceTrans != '454' && serviceTrans != '455' && serviceTrans != '466' && serviceTrans != '468' && serviceTrans != '471')) {
                        var i;
                        var found = false;
                        for (i = 0; i < response.length; i++) {
                            if (response[i].id == 36) {
                                found = true;
                                break;
                            }
                        }
                        if (found) {
                            response.splice(i, 1);
                        }
                    }


                    if (successCallbackFun)
                        successCallbackFun(response);
                }
            }
            var options = {
                success: excludeCountries,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/countries/exceptUae?externalSystemID=' + externalSystemID + '&serviceTransactionId=' + currentServiceTransactionId, options);
        },

        loadCountriesWithoutGcc: function (externalSystemID, successCallback, errorCallback) {
            var currentServiceTransactionId = $stateParams.serviceTransactionId;
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/countries/exceptGccForEida?externalSystemID=' + externalSystemID + '&serviceTransactionId=' + currentServiceTransactionId, options);
        },

        loadGccCountries: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/country/gcc', options);
        },

        loadTravelTransactionTypes: function (successCallback, errorCallback, serviceTrans) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/travelTransactionTypes', options);
        },

        loadReligions: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/religions?externalSystemID=' + externalSystemID, options);
        },

        loadEidaAreas: function (cityId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/eidaAreas/' + cityId, options);
        },

        loadAllEidaAreas: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/allEidaAreas/', options);
        },

        loadMappingExternalSystemId: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getMappingExternalSystemId/', options);
        },

        loadEidaTawzeaAreas: function (cityId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/eidaTawzeaAreas/' + cityId, options);
        },
        loadGenders: function (successCallback, errorCallback, externalSystemID, languageId) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/genders?externalSystemID=' + externalSystemID + '&languageId=' + languageId, options);
        },

        loadMofaEventTypes: function (successCallback, errorCallback, externalSystemID, languageId) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/mofaEventTypes?externalSystemID=' + externalSystemID + '&languageId=' + languageId, options);
        },

        loadPersonRoles: function (successCallback, errorCallback, externalSystemID, languageId) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/person-roles?externalSystemID=' + externalSystemID + '&languageId=' + languageId, options);
        },

        loadServiceShortDesc: function (successCallback, errorCallback, externalSystemID, languageId) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/serviceShortDesc?externalSystemID=' + externalSystemID + '&languageId=' + languageId, options);
        },

        loadEnvironments: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: false
            };
            return apiHelperService.get('lookup/environments', options);
        },

        loadProsecutions: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/prosecutions', options);
        },

        loadCourts: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/courts', options);
        },

        loadTimeZones: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/timeZones', options);
        },

        loadMaritalStatuses: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/maritalStatuses?externalSystemID=' + externalSystemID, options);
        },

        loadUsedLanguages: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetUsedLanguages?externalSystemID=' + externalSystemID, options);
        },

        loadTaregetAudiences: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetTaregetAudiences', options);
        },

        loadCategoryTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetCategoryTypes', options);
        },

        loadEmirates: function (successCallback, errorCallback, externalSystemID, languagId) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/emirates?externalSystemID=' + externalSystemID, options);
        },

        loadAppointmentStatus: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/appointmentStatus', options);
        },

        loadCitiesEida: function (emirateId, successCallback, errorCallback, externalSystemId) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/citiesEida/' + emirateId + '?externalSystemId=' + externalSystemId, options);
        },

        loadIcaServiceCenter: function (emirateId, successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getIcaServiceCenter/' + emirateId, options);
        },

        loadIcaServiceCenterById: function (serviceCenterId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getIcaServiceCenterById/' + serviceCenterId, options);
        },

        loadTawzeaCities: function (emirateId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/tawzeaCities/' + emirateId, options);
        },

        loadCityZones: function (cityId, successCallback, errorCallback) { // rename to loadCityZones
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/cityZones/' + cityId, options);
        },

        loadPortTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/portTypes', options);
        },

        loadSponsorTypes: function (serviceId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            if (serviceId)
                return apiHelperService.get('lookup/sponsorTypes/' + serviceId, options);
            else
                return apiHelperService.get('lookup/sponsorTypes', options);
        },

        loadFaiths: function (religionId, successCallback, externalSystemID, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/religion/' + religionId + '/faith?externalSystemID=' + externalSystemID, options);
        },

        loadLocalCities: function (emirateId, successCallback, externalSystemID, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/emirate/' + emirateId + '/city?externalSystemID=' + externalSystemID, options);
        },

        loadCityRoads: function (cityId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/city/' + cityId + '/roads', options);
        },

        loadProfessionsAutoCompelete: function (professionListTypeId, text, code, successCallback, errorCallback, externalSystemID, serviceTransactionId, isQuotaProfessionFlag, transactionReasonId, serviceId) {
            var options = {
                success: successCallback,
                error: errorCallback,
                showSpinner: false
            };
            var query = '?';
            if (text != null)
                query += 'text=' + text + '&';

            if (professionListTypeId != null)
                query += 'professionListTypeId=' + professionListTypeId + '&';

            if (code != null)
                query += 'code=' + code;

            var prof = { 'text': text, 'professionListTypeId': professionListTypeId, 'code': code, 'externalSystemID': externalSystemID, 'serviceTransactionId': serviceTransactionId, 'isQuotaProfessionFlag': isQuotaProfessionFlag, transactionReasonId, serviceId };


            return apiHelperService.post('lookup/professionsAutoCompleteWithStandardList', prof, options);
        },

        loadPassportTypes: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/passportTypes?externalSystemID=' + externalSystemID, options);
        },

        loadPassportTypesByServiceTransactionId: function (serviceTransactionId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/passportTypesByServiceTransactionId/' + serviceTransactionId, options);
        },

        loadCountryPorts: function (countryId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/country/' + countryId + '/ports', options);
        },

        loadSitaCountryPorts: function (countryId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/sitaCountry/' + countryId + '/ports', options);
        },

        loadEmiratePorts: function (emirateId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/emirate/' + emirateId + '/port', options);
        },

        loadEmiratePortsWithType: function (emirateId, portTypeId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/emirate/' + emirateId + '/portType/' + portTypeId, options);
        },

        loadLookupTables: function (successCallback, errorCallback) {
            var options = {
                success: successCallback, error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getLookupTables', options);
        },

        loadAttachmentTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getAttachmentTypes', options);
        },

        loadAttachmentTypesByServiceId: function (serviceId, adminRegionId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/service/' + serviceId + '/adminRegion/' + adminRegionId + '/attachmentTypes', options);
        },

        loadAttachmentTypesByServiceIdAndApplicationId: function (serviceId, adminRegionId, applicationId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/service/' + serviceId + '/adminRegion/' + adminRegionId + '/applicationId/' + applicationId + '/getAttachmentTypes', options);
        },

        loadAttachmentTypesByServiceIds: function (serviceIds, adminRegionId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/service/' + serviceIds + '/adminRegion/' + adminRegionId + '/attachmentTypesWithRelatedDrafts', options);
        },

        loadActionUrls: function (successCallback, errorCallback) {
            var options = {
                success: successCallback, error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getActionUrls', options);
        },

        loadRatingModules: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetRatingModules', options);
        },

        loadRelations: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetFamilyRelations?externalSystemID=' + externalSystemID, options);
        },

        loadRelationsBasedOnServiceId: function (serviceTransId, sponsorTypeId, externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetFamilyRelations?externalSystemID=' + externalSystemID + '&serviceTransId=' + serviceTransId + '&sponsorTypeId=' + sponsorTypeId, options);
        },

        loadSponsorStudyStatuses: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetSponsorStudyStatuses', options);
        },

        loadExemptionReasons: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetExemptionReasons', options);
        },

        loadEidaServicePoints: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetEidaServicePoints', options);
        },

        loadEidaServicePointsByEmirate: function (emirateId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetEidaServicePoints/emirate/' + emirateId + '/city', options);
        },

        loadFamilyAndDomesticHelperRelations: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetFamilyAndDomesticHelperRelations', options);
        },

        loadRatingTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetRatingTypes', options);
        },

        loadPaymentMethods: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetPaymentMethods', options);
        },

        loadAmwalPaymentMethods: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetAmwalPaymentMethods', options);
        },

        loadmodules: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/modules', options);
        },

        loadindividualModules: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/individualModules', options);
        },

        loadservices: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/services', options);
        },

        loadFileType: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/fileType', options);
        },

        loadservicesByServiceId: function (serviceId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/servicesByServiceId/' + serviceId, options);
        },

        loadVisaTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/services/2', options);
        },

        loadEntryDateTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/entryDateTypes', options);
        },

        loadtransactions: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/transactions', options);
        },

        loadYearsOfResidency: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/yearsOfResidency', options);
        },
        loadyearsOfResidencyForfixingResiStamp: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/yearsOfResidencyForfixingResiStamp', options);
        },
        loadEducationLevels: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/educationLevels?externalSystemID=' + externalSystemID, options);
        },

        loadEidaEducationLevels: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/eidaEducationLevels?externalSystemID=' + externalSystemID, options);
        },

        loadDepartments: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/departments', options);
        },
        loadDepartmentsWithoutDubai: function (successCallback, errorCallback) {


            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/departmentsWithoutDubai', options);
        },
        loadAllDepartments: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/allDepartments', options);
        },

        loadEconomicActivity: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/economicActivities', options);
        },

        loadWorkSectors: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/workSectors', options);
        },

        loadLicenseTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/licenseTypes', options);
        },

        loadPassportUpdateTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/passportUpdateTypes', options);
        },

        loadEstablishmentClasses: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/establishmentClasses', options);
        },

        loadEstablishmentEmployeeTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/establishmentEmployeeTypes', options);
        },

        loadEstablishmentTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/establishmentTypes', options);
        },

        loadLicensePlaces: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/licensePlaces', options);
        },

        loadDelegationReasons: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/delegationReason', options);
        },

        loadEstablishmentRequestTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/establishmentRequestTypes', options);
        },

        loadEstablishmentRequestTypesPurpose: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/establishmentRequestTypesPurpose', options);
        },

        loadAdministrativeRegions: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/administrativeRegions', options);
        },

        loadTravelTransactionType: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/travelTransactionTypes', options);
        },

        loadProfession: function (id, professionListTypeId, successCallback, errorCallback, externalSystemID, serviceTransactionId) {
            var options = {
                success: successCallback,
                error: errorCallback
            };
            return apiHelperService.get('lookup/profession/?id=' + id + "&professionListTypeId=" + professionListTypeId + "&externalSystemID=" + externalSystemID + "&serviceTransactionId=" + serviceTransactionId, options);
        },

        loadReverseProfession: function (id, professionListTypeId, successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback
            };
            return apiHelperService.get('lookup/profession/?id=' + id + "&professionListTypeId=" + professionListTypeId + "&reverseFlag=" + true + "&externalSystemID=" + externalSystemID, options);
        },

        loadProfessions: function (professionListTypeId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback
            };
            return apiHelperService.get('lookup/professions/' + professionListTypeId, options);
        },
        loadQuotaProfessions: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback
            };
            return apiHelperService.get('lookup/qoutaProfessions', options);
        },
        loadTransactionReason: function (serviceTransactionId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback
            };

            var query = '?';

            if (serviceTransactionId != null)
                query += 'serviceTransactionId=' + serviceTransactionId;

            return apiHelperService.get('lookup/transactionReason/' + query, options);
        },
        loadTransactionReasonBasedOnApplicationId: function (serviceTransactionId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback
            };

            var query = '?';

            if (serviceTransactionId != null)
                query += 'serviceTransactionId=' + serviceTransactionId;

            return apiHelperService.get('lookup/getTransactionReasonBasedOnApplicationId/' + query, options);
        },
        loadEconomicActivityAutoComplete: function (id, text, code, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback
            };

            var query = '?';

            if (id != null)
                query += 'id=' + id + '&';
            if (text != null)
                query += 'text=' + text + '&';
            if (code != null)
                query += 'code=' + code;



            return apiHelperService.get('lookup/economicActivityAutoComplete/' + query, options);
        },

        loadViolationCorrectionDepatments: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/violationCorrectionDepatments', options);
        },

        loadDepositStatuses: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/depositStatuses', options);
        },

        loadInsurancePolicyType: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/insurancePolicyType', options);
        },

        loadModules: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/modules', options);
        },

        loadPaymentStatuses: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/paymentStatuses', options);
        },

        loadFeeTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/feeTypes', options);
        },

        loadReportsFeeTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/reportsFeeTypes', options);
        },

        loadNotificationType: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getnotificationtype', options);
        },

        loadNotificationTemplateType: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getnotificationtemplatetype', options);
        },

        loadrequestActions: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/requestActions', options);
        },

        loadFileStatus: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/fileStatus', options);
        },

        refundRequestStatuses: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/refundRequestStatuses', options);
        },

        loadApplications: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/applications', options);
        },

        loadDraftStatuses: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/draftStatuses', options);
        },
        loadDraftStatusesFiltered: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/draftStatusesFiltered', options);
        },

        loadDraftStatusesFiltered: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/draftStatusesFiltered', options);
        },

        loadExceptionStatus: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/exceptionStatus', options);
        },

        loadBeneficiaryAccounts: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/beneficiaryAccounts', options);
        },

        loadHumanExceptionRequestType: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/humanExceptionRequestType', options);
        },

        loadCountryEmbassies: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/countryEmbassies', options);
        },

        loadCountryEmbassiesByCountryId: function (countryId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/countryEmbassies/' + countryId, options);
        },

        loadCountryEstablishmentEmbassies: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/countryEstablishmentEmbassies', options);
        },

        loadYearsOfEstablishmentCard: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/yearsOfEstablishmentCard', options);
        },

        loadFreeDepositeCases: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/freeDepositeCases', options);
        },

        loadSpecialVisaType: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/specialVisaType', options);
        },

        LoadEstablishmentPartyStatus: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/establishmentPartyStatus', options);
        },

        loadTransactionTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/transactionTypes', options);
        },

        loadAllTransactionTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/allTransactionTypes', options);
        },

        loadEstablishmentAccountTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/establishmentAccountTypes', options);
        },

        loadEmbassies: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetEmbassies', options);
        },

        loadHumanExceptionStatuses: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetHumanExceptionStatuses', options);
        },

        loadTripClass: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/tripClass', options);
        },

        loadShipTravellerType: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/shipTravellerType', options);
        },

        loadPartyAttachmentsSetup: function (serviceId, partyCode, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/attachment/' + serviceId + '/partyCode/' + partyCode + '/attachmentTypes', options);
        },

        loadEmiratesWithoutDubai: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/emiratesWithoutDubai', options);
        },

        loadGetExternalSyncFlags: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/get-external-sync-flags', options);
        },

        loadEtihadEventStatuses: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getEtihadEventStatuses', options);
        },

        loadExceptionSponsorTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getExceptionSponsorTypes', options);
        },

        loadYearsOfBusinessResidency: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/YearsOfBusinessResidency', options);
        },

        loadApplicantClasses: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getApplicantClasses?externalSystemID=' + externalSystemID, options);
        },

        loadApplicantClassDetails: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getApplicantClassDetails?externalSystemID=' + externalSystemID, options);
        },

        loadOldEmiratesIds: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getOldEmiratesIds', options);
        },

        loadTribesNames: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getSponsoredTribesNames?externalSystemID=' + externalSystemID, options);
        },

        loadPassportRelations: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getPassportRelations?externalSystemID=' + externalSystemID, options);
        },

        loadPostalBranches: function (deliveryEmirateId, successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getPostalBranches/' + deliveryEmirateId + "?externalSystemID=" + externalSystemID, options);
        },

        loadPostalBranchesAll: function (deliveryEmirateId, successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getPostalBranchesAll/' + deliveryEmirateId + "?externalSystemID=" + externalSystemID, options);
        },

        loadPostalBranchesWithDefaultValue: function (deliveryEmirateId, successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getPostalBranchesWithDefaultValue/' + deliveryEmirateId + "?externalSystemID=" + externalSystemID, options);
        },

        loadEidaApplicantType: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/eidaApplicantType?externalSystemID=' + externalSystemID, options);
        },

        loadApplicantDisabilities: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getApplicantDisabilities?externalSystemID=' + externalSystemID, options);
        },

        loadDeliveryEmirates: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getDeliveryEmirates?externalSystemID=' + externalSystemID, options);
        },

        loadWorkTypes: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getWorkTypes?externalSystemID=' + externalSystemID, options);
        },

        loadPersonTitles: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getPersonTitles', options);
        },

        loadGovernmentalDepartments: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getGovernmentalDepartments?externalSystemID=' + externalSystemID, options);
        },

        loadCountriesByRegion: function (regionId, successCallback, errorCallback) {
            var currentServiceTransactionId = $stateParams.serviceTransactionId;
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/country/region/' + regionId + '?serviceTransactionId=' + currentServiceTransactionId, options);
        },

        loadEstablishmentPartnershipTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getEstablishmentPartnershipTypes', options);
        },

        loadEstablishmentAgentTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getEstablishmentAgentTypes', options);
        },

        loadYearsOfICA: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/yearsOfICA', options);
        },

        loadQualificationLevels: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getQualificationLevels', options);
        },

        loadHealthInsuranceFeeTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/healthInsuranceFeeTypes', options);
        },

        loadhealthInsuranceExternalSystems: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/healthInsuranceExternalSystems', options);
        },

        loadBatchTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/batchTypes', options);
        },

        loadBatchStatuses: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/batchStatuses', options);
        },

        loadExternalSystems: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/externalSystems', options);
        },

        loadSettlementStatuses: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/settlementStatuses', options);
        },

        loadLookupDivorcedNewFBTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/lookupDivorcedNewFBTypes', options);
        },

        getDeliveryAddressDetails: function (emirateId, poBoxNo, postalBranchCode, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('IcaEspIntegeration/getDeliveryAddressDetails/' + emirateId + '/' + poBoxNo + '/' + postalBranchCode, options);
        },

        loadEidaCitizenOrGccYears: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/EidaCitizenOrGccYears', options);
        },

        loadEidaReplacementTypes: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/replacementTypes?externalSystemID=' + externalSystemID, options);
        },

        loadPMDCenterTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/pmdCenterTypes', options);
        },

        loadMarriageIssuePlaces: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/marriageIssuePlaces', options);
        },

        loadLanguageLevels: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/languageLevels', options);
        },

        loadShariaCourts: function (successCallback, errorCallback, serviceTrans) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/shariaCourts', options);
        },

        loadFirstMarriIssuePlaces: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/firstMarriIssuePlaces', options);
        },

        loadAddChildIssuePlaces: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/addChildIssuePlaces', options);
        },

        loadDeathIssuePlaces: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/deathIssuePlaces', options);
        },

        loadDivorcingIssuePlaces: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/divorcingIssuePlaces', options);
        },

        loadModuleParentService: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/moduleParentService', options);
        },

        loadEstablishmentRequestActionTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/establishmentRequestActionTypes', options);
        },

        loadDiplomaticCardTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getDiplomaticCardTypes', options);
        },

        loadDiplomaticCardClassification: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getDiplomaticCardClassification', options);
        },

        loadDiplomaticCardStatus: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getDiplomaticCardStatus', options);
        },

        loadDiplomaticCardActions: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getDiplomaticCardActions', options);
        },

        loadDiplomaticPersonClasses: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getDiplomaticPersonClasses', options);
        },

        loadDiplomaticProffesions: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getDiplomaticProffesions', options);
        },

        getDiplomaticCardTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/loadDiplomaticCardTypes', options);
        },

        getDiplomaticFamilyRelations: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/loadDiplomaticFamilyRelations', options);
        },

        loadEidaPersonTitles: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getEidaPersonTitles', options);
        },

        loadEidaPersonTitlesByGenderId: function (genderId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getEidaPersonTitlesByGenderId/' + genderId, options);
        },

        loadPersonTitlesByGenderId: function (successCallback, errorCallback, genderId, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getPersonTitlesByGenderId?genderId=' + genderId + '&externalSystemID=' + externalSystemID, options);
        },

        loadTypingCenterCategories: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/typingCenterCategories', options);
        },

        getCountriesWithoutGCC: function (successCallback, errorCallback, externalSystemID) {
            var currentServiceTransactionId = $stateParams.serviceTransactionId;
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/countries/exceptGCC' + '?serviceTransactionId=' + currentServiceTransactionId + '&externalSystemID=' + externalSystemID, options);
        },

        loadEidaCardDurations: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetEidaCardDurations?externalSystemID=' + externalSystemID, options);
        },

        loadReasonCategories: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetReasonCategories', options);
        },

        loadReasons: function (reasonId, errorCallback, successCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/reason/' + reasonId + '/reasons', options);
        },

        loadBanksNames: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetBanksNames', options);
        },

        loadRefundReasons: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetRefundReasons', options);
        },

        loadPaymentTransReasons: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/PaymentTransReasons', options);
        },

        loadPaymentTransTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/PaymentTransTypes', options);
        },

        loadPaymentTransStatuses: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/PaymentTransStatuses', options);
        },

        loadDepositType: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/DepositType', options);
        },

        loadFinancialDepositType: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/FinancialDepositType', options);
        },

        //#region - GCC Eida Request :: START
        loadTransactionReasonsByModuleParentReasonId: function (serviceTransactionId, moduleParentReasonId, existInSetupFlag = 0, successCallback = null, errorCallback = null) {
            var options = {
                success: successCallback,
                error: errorCallback,
                params: { serviceTransactionId: serviceTransactionId, moduleParentReasonId: moduleParentReasonId, existInSetupFlag: existInSetupFlag }
            };
            return apiHelperService.get('lookup/GetTransactionReasonsByModuleParentReasonId', options);
        },

        loadAttachmentTypesByTransactionReasonId: function (transactionReasonId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/service/' + transactionReasonId + '/attachmentTypes', options);
        },

        loadBankAccountTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/bankAccountTypes', options);
        },
        //#endregion - GCC Eida Request :: End

        loadAdditionalDepositType: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/loadAdditionalDepositType', options);
        },

        loadCountryEmbassiesNotRelatedToEstablishment: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/countryEmbassiesNotRelatedToEstablishment', options);
        },

        loadEidaDeliveryCompaniesForNearestCenter: function (emirateId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getEidaDeliveryCompaniesForNearestCenter/' + emirateId, options);
        },
        loadEidaDeliveryCompaniesForSpecificAddress: function (emirateId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getEidaDeliveryCompaniesForSpecificAddress/' + emirateId, options);
        },
        loadDeliveryCompanies: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/DeliveryCompanies', options);
        },

        loadDeliveryMethods: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/DeliveryMethods', options);
        },

        loadLandMarks: function (areaId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/LandMarks/' + areaId, options);
        },
        loadLandMarksForViewPage: function (areaId, mappingExternalSystemId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/LandMarksForViewPage/' + areaId + '?mappingExternalSystemId=' + mappingExternalSystemId, options);
        },
        loadModuleServiceById: function (moduleServiceId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/moduleService/' + moduleServiceId, options);
        },

        loadShipmentStatus: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetAwbRequestsActions', options);
        },

        loadTypingCenterCategory: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/typingCenterCategory', options);
        },

        loadEstablishmentWhiteListType: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/EstablishmentWhiteListType', options);
        },

        loadAllLanguages: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/GetDataLanguages?externalSystemID=' + externalSystemID, options);
        },

        loadTypingCenterWarningReason: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: false
            };
            return apiHelperService.get('lookup/getWarningReason', options);
        },

        loadTypingCenterWarningStatus: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: false
            };
            return apiHelperService.get('lookup/getWarningStatus', options);
        },

        loadOperationSystems: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: false
            };
            return apiHelperService.get('lookup/operatingSystems', options);
        },

        loadPersonCategories: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: false
            };
            return apiHelperService.get('lookup/PersonCategories', options);
        },

        loadServiceStatuses: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: false
            };
            return apiHelperService.get('lookup/ServiceStatus', options);
        },

        loadSurveyRating: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: false
            };
            return apiHelperService.get('lookup/surveyRating', options);
        },

        loadExitPermitCountries: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: false
            };
            return apiHelperService.get('lookup/exitPermitCountries', options);
        },

        loadExceptionalTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: false
            };
            return apiHelperService.get('lookup/exceptionalTypes', options);
        },

        loadValidGetwayServices: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: false
            };
            return apiHelperService.get('lookup/ValidGetwayServices', options);
        },

        loadHomeTypes: function (successCallback, errorCallback, externalSystemID, languageId) {
            var successCallbackFun = successCallback;

            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/homeTypes?externalSystemID=' + externalSystemID + '&languageId=' + languageId, options);
        },

        loadWorkingStatus: function (successCallback, errorCallback, externalSystemID, languageId) {
            var successCallbackFun = successCallback;

            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/workingStatus?externalSystemID=' + externalSystemID + '&languageId=' + languageId, options);
        },

        loadUDBCities: function (emirateId, successCallback, externalSystemID, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/emirate/' + emirateId + '/UDBCity', options);
        },

        loadAreaSectors: function (areaId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };

            return apiHelperService.get('lookup/area/' + areaId + '/sectors', options);
        },

        loadCityOnly: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };

            return apiHelperService.get('lookup/cityOnly', options);
        },

        loadExternalRequestActions: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/externalRequestActions', options);
        },

        loadApplicationBundles: function (successCallback, errorCallback) {

            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };

            return apiHelperService.get('lookup/bundles', options);
        },

        loadMappedUDBcity: function (emirateId, successCallback, externalSystemID, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/emirate/' + emirateId + '/mappedUDBcity?externalSystemID=' + externalSystemID, options);
        },

        loadContentStatuses: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/ContentStatuses', options);
        },

        loadHealthStatus: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/healthStatus', options);
        },

        loadDisabilitieType: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/disabilitieType', options);
        },

        loadInvestmentTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/investmentTypes', options);
        },

        loadPropertyTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/propertyTypes', options);
        },

        loadLegalForms: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/legalForms', options);
        },

        loadPlatformOperationSystems: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: false
            };
            return apiHelperService.get('lookup/platformOperatingSystems', options);
        },
        loadValidationRules: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: false
            };
            return apiHelperService.get('lookup/GetValidationRules', options);
        },
        loadValidationRuleTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: false
            };
            return apiHelperService.get('lookup/GetValidationRuleTypes', options);
        },
        loadValidationRuleLevels: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: false
            };
            return apiHelperService.get('lookup/GetValidationRuleLevels', options);
        },
        loadAllCityZones: function (successCallback, errorCallback, externalSystemId) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getAllCityZones?externalSystemId=' + externalSystemId, options);
        },

        loadRequestApplicationTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getRequestApplicationTypes', options);
        },
        loadModules: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getModules', options);
        },

        loadRejectReasons: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getRejectReasons', options);
        },

        loadUniversities: function (serviceTransactionId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true,
                params: {
                    serviceTransactionId: serviceTransactionId
                }
            };
            return apiHelperService.get('lookup/getUniversities', options);
        },

        loadGradeTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getGradeTypes', options);
        },

        loadCityStreets: function (cityId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/cityStreets/' + cityId, options);
        },
        loadRoad: function (cityId, roadId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/city/' + cityId + '/road/' + roadId, options);
        },
        loadCityRoadsAutoCompelete: function (cityId, roadName, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };

            return apiHelperService.get('lookup/searchRoads/city/' + cityId + '/term/' + roadName, options);
        },
        loadResidencyJourneyStatus: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };

            return apiHelperService.get('lookup/getResidencyJourneyStatus', options);
        },
        loadServiceChannels: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };

            return apiHelperService.get('lookup/service-channels', options);
        },
        loadServiceChannelIds: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };

            return apiHelperService.get('lookup/service-channel-id', options);
        },
        loadSpecialities: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };

            return apiHelperService.get('lookup/getSpecialities', options);
        },
        loadGpaScales: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };

            return apiHelperService.get('lookup/getGpaScales', options);
        },

        loadGraduationYears: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };

            return apiHelperService.get('lookup/getGraduationYears', options);
        },

        loadUdbGovEstabDepartmentAutoComplete: function (immegrationDepartmentId, text, govEstabDepartmentCode, successCallback, errorCallback) {

            var options = {
                success: successCallback,
                error: errorCallback
            };

            var query = '?';

            if (immegrationDepartmentId != null)
                query += 'immegrationDepartmentId=' + immegrationDepartmentId + '&';

            if (text != null)
                query += 'text=' + text;

            if (govEstabDepartmentCode != null)
                query += 'govEstabDepartmentCode=' + govEstabDepartmentCode;

            return apiHelperService.get('lookup/udbGovEstabDepartmentAutoComplete/' + query, options);
        },
        loadContractTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };

            return apiHelperService.get('lookup/getContractTypes', options);
        },
        loadTermTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getTermTypes', options);
        },
        loadServiceCenters: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getServiceCenters', options);
        },
        loadAppointmentEmirateByAdminRegionId: function (successCallback, errorCallback, adminRegionId, requestNumber) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/appointmentEmirateByAdminRegionId/' + adminRegionId + "?requestNumber=" + requestNumber, options);
        },
        loadTawzeePostalBranches: function (deliveryEmirateId, successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getPostalBranchesForTawzee/' + deliveryEmirateId + "?externalSystemID=" + externalSystemID, options);
        },
        loadShipTravellerTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getShipTravellerTypes', options);
        },
        loadShipTransTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getShipTransTypes', options);
        },
        loadPassengerStatuses: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getPassengerStatuses', options);
        },
        loadRequestLogCategories: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getRequestLogCategories', options);
        },
        loadRequestLogStatuses: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getRequestLogStatuses', options);
        },
        loadRequestLogTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getRequestLogTypes', options);
        },
        loadValidationSource: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getValidationSource', options);
        },
        loadUserProfileCategories: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getUserProfileCategories', options);
        },
        loadUserProfileSettings: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getUserProfileSettings', options);
        },
        loadPeriodType: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getPeriodType', options);
        },
        getRequestLogHandlerTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getRequestLogHandlerTypes', options);
        },
        loadInterviewReasonTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getInterviewReasonTypes', options);
        },
        loadExceptionRequestTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getExceptionRequestTypes', options);
        },
        loadZajelCities: function (emirateId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/zajelCities/' + emirateId, options);
        },
        loadZajelCityZones: function (cityId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/zajelCityZones/' + cityId, options);
        },

        loadPassportDeliveryCompanies: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/passportDeliveryCompanies', options);
        },
        loadAlertTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getAlertTypes', options);
        },
        loadAlertModificationTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getAlertModificationTypes', options);
        },
        loadEexemptedCategories: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getEexemptedCategories', options);
        },
        loadEmiratesDeleveryCompanies: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getEmiratesDeleveryCompanies', options);
        },
        loadDubaiDeleveryCompanies: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getDubaiDeleveryCompanies', options);
        },
        loadAmerPostalBranches: function (deliveryEmirateId, successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getAmerPostalBranches/' + deliveryEmirateId + "?externalSystemID=" + externalSystemID, options);
        },
        loadAmerCities: function (emirateId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getAmerCities/' + emirateId, options);
        },
        loadAmerAreas: function (cityId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getAmerAreas/' + cityId, options);
        },
        loadEmirateSchoolCities: function (successCallback, errorCallback, emirateId) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getEmirateSchoolCities/' + emirateId, options);
        },
        loadEmirateSchools: function (successCallback, errorCallback, emirateId, cityId) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getEmirateSchools/' + cityId + '/' + emirateId, options);
        },
        loadModificationReasons: function (successCallback, errorCallback) {

            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getModificationReasons', options);
        },
        loadFilteredRefundTransactionReasons: function (serviceTransactionId, moduleParentReasonId, existInSetupFlag = 0, successCallback = null, errorCallback = null) {
            var options = {
                success: successCallback,
                error: errorCallback,
                params: { serviceTransactionId: serviceTransactionId, moduleParentReasonId: moduleParentReasonId, existInSetupFlag: existInSetupFlag }
            };
            return apiHelperService.get('lookup/GetFilteredRefundTransactionReasons', options);
        },
        loadTransactionReasonsByModuleParentReasonId: function (serviceTransactionId, moduleParentReasonId, existInSetupFlag = 0, successCallback = null, errorCallback = null) {
            var options = {
                success: successCallback,
                error: errorCallback,
                params: { serviceTransactionId: serviceTransactionId, moduleParentReasonId: moduleParentReasonId, existInSetupFlag: existInSetupFlag }
            };
            return apiHelperService.get('lookup/GetTransactionReasonsByModuleParentReasonId', options);
        },
        loadWorkPermitTypes: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getWorkPermitTypes?externalSystemID=' + externalSystemID, options);
        },
        loadWeekOffDays: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getWeekOffDays?externalSystemID=' + externalSystemID, options);
        },
        loadWageTypes: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getWageTypes?externalSystemID=' + externalSystemID, options);
        },
        loadNoticePeriod: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getNoticePeriod?externalSystemID=' + externalSystemID, options);
        },
        loadProbationPeriodTypes: function (languageId, externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getProbationPeriodTypes?languageId=' + languageId + '&externalSystemID =' + externalSystemID, options);
        },
        loadEducationTypes: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getEducationTypes?externalSystemID=' + externalSystemID, options);
        },
        loadCurrencies: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getCurrencies?externalSystemID=' + externalSystemID, options);
        },
        loadAnnualLeavsDays: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getAnnualLeavsDays?externalSystemID=' + externalSystemID, options);
        },
        loadWorkPermitAllowances: function (languageId, externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getWorkPermitAllowances?languageId=' + languageId + '&externalSystemID =' + externalSystemID, options);
        },
        loadLegalConditions: function (languageId, externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getLegalConditions?languageId=' + languageId + '&externalSystemID =' + externalSystemID, options);
        },
        loadSalaryCycle: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getSalaryCycle?externalSystemID=' + externalSystemID, options);
        },
        loadWeekDays: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getWeekDays?externalSystemID=' + externalSystemID, options);
        },
        loadWorkContractTypes: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getWorkContractTypes?externalSystemID=' + externalSystemID, options);

        },
        loadAttachmentTypesForMohreByServiceId: function (serviceId, adminRegionId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/service/' + serviceId + '/adminRegion/' + adminRegionId + '/attachmentTypesForMohre', options);
        },
        loadEnglishEmirate: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getEnglishEmirates?externalSystemID=' + externalSystemID, options);

        },
        loadArabicEmirates: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getArabicEmirates?externalSystemID=' + externalSystemID, options);

        },
        loadDurationArabicDescForLegalCondtions: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getDurationArabicDescForLegalCondtions?externalSystemID=' + externalSystemID, options);

        },
        loadDurationEnglishDescForLegalCondtions: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getDurationEnglishDescForLegalCondtions?externalSystemID=' + externalSystemID, options);

        },
        loadLoginTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getLoginTypes', options);
        },
        loadSessionStatus: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getSessionStatus', options);
        },
        loadGuaranteeTypes: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getGuaranteeTypes?externalSystemID=' + externalSystemID, options);
        },

        loadVerificationReasons: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/verificationReasons?externalSystemID=' + externalSystemID, options);
        },
        loadDeliveryDetails: function (deliveryMethodId, deliveryCompanyId, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getDeliveryDetails?deliveryMethodId=' + deliveryMethodId + '&deliveryCompanyId=' + deliveryCompanyId, options);
        },
        loadErrorBankFailCategories: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getErrorBankFailCategories', options);
        },
        loadReCaptchaSetup: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('content/getReCaptchaSetup', options);
        },
        loadAllPortTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/allPortTypes', options);
        },
        loadSortableColumns: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/sortableColumns', options);
        },
        loadAttachmentCategories: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getAttachmentCategory', options);
        },
        loadRevokeTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getRevokeTypes', options);
        },
        loadRevokeLevels: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getRevokeLevels', options);
        },
        getPostalBranchDetails: function (emirateId, postalBranchId, poBoxNumber, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };

            var input = { 'emirateId': emirateId, 'postalBranchId': postalBranchId, 'poBoxNumber': poBoxNumber };

            return apiHelperService.post('lookup/getPostalBranchDetails', input, options);
        },
        loadInsurancePolicyStatus: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/insurancePolicyStatus', options);
        },
        loadRefundBanks: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/refund-banks', options);
        },
        loadEidaRefundBanks: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getEidaRefundBanks', options);
        },
        loadImmgRefundBanks: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getImmgRefundBanks', options);
        },
        getRequestSLATypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getRequestSLATypes', options);
        },
        loadMedicalServiceTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/medicalServiceTypes', options);
        },
        loadAcceptedInsuranceCompanies: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
            };
            return apiHelperService.get('lookup/acceptedInsuranceCompanies', options);
        },
        loadMohreProfessionsAutoCompelete: function (professionListTypeId, text, code, successCallback, errorCallback, externalSystemID, serviceTransactionId, isQuotaProfessionFlag, transactionReasonId, serviceId) {
            var options = {
                success: successCallback,
                error: errorCallback,
                showSpinner: false
            };
            var query = '?';
            if (text != null)
                query += 'text=' + text + '&';

            if (professionListTypeId != null)
                query += 'professionListTypeId=' + professionListTypeId + '&';

            if (code != null)
                query += 'code=' + code;

            var prof = { 'text': text, 'professionListTypeId': professionListTypeId, 'code': code, 'externalSystemID': externalSystemID, 'serviceTransactionId': serviceTransactionId, 'isQuotaProfessionFlag': isQuotaProfessionFlag, transactionReasonId, serviceId };


            return apiHelperService.post('lookup/mohreProfessionsAutoComplete', prof, options);
        },
        mohreProfession: function (id, professionListTypeId, successCallback, errorCallback, externalSystemID, serviceTransactionId) {
            var options = {
                success: successCallback,
                error: errorCallback
            };
            return apiHelperService.get('lookup/mohreProfession/?id=' + id + "&professionListTypeId=" + professionListTypeId + "&externalSystemID=" + externalSystemID + "&serviceTransactionId=" + serviceTransactionId, options);
        },
        loadScreeningAreas: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/screeningAreas', options);
        },
        loadMedicalServiceCategories: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/medicalServiceCategories', options);
        },
        loadMedicalCompanies: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/medicalCompanies', options);
        },
        loadrefundMethods: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/refundMethods', options);
        },
        loadMohreHireTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/mohreHireTypes', options);
        },
        loadDWProfessions: function (externalSystemID, successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/dwProfessions?externalSystemID=' + externalSystemID, options);
        },
        loadDWPackageServices: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/dwPackageServices', options);
        },
        loadShoryResiPolicyTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getShoryResiPolicyTypes', options);
        },
        loadShoryResiSalaryRanges: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getShoryResiSalaryRanges', options);
        },
        loadShoryResiCoPaymentTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/getShoryResiCoPaymentTypes', options);
        },

        loadAbroadPorts: function (countryId,successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/abroadPorts/' + countryId, options);
        },
        loadServicePrivileges: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/servicePrivileges', options);
        },
         loadClosureTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/closure-type', options);
        },
        loadDocumentAttestationTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/documentAttestationTypes', options);
        },
        loadAttestationEducationLevels: function (successCallback, errorCallback, externalSystemID) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/attestationEducationLevels?externalSystemID=' + externalSystemID, options);
        },
        loadTransTypes: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/visaType', options);
        },
        loadFastActionLabels: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/fast-action-labels', options);
        },
        loadFastActionRules: function (successCallback, errorCallback) {
            var options = {
                success: successCallback,
                error: errorCallback,
                enableCache: true
            };
            return apiHelperService.get('lookup/fast-action-rules', options);
        }
    }
}]);