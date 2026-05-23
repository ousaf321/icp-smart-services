//mainApp.service('cookieStorage', function () {
//    this.set = function (key, value) {
//        document.cookie = key + "=" + value + "; path=/"
//    };

//    this.get = function (key) {
//        var nameEQ = key + "=";
//        var ca = document.cookie.split(';');
//        for(var i= 0; i < ca.length; i++) {
//            var c = ca[i];
//            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//        }
//        return null;
//    };

//    this.remove = function (key) {
//        document.cookie = key + '=; Max-Age=-99999999; path=/';
//    }
//})

mainApp.controller('baseCtrl', ['$q', '$scope', '$translate', '$http', '$locale', 'languageService', 'apiHelperService', 'notificationsService', '$timeout', '$rootScope', '$state', '$stateParams', 'googleAnalyticsService', '$interval', 'authManager', '$sce', 'lookupService', 'serviceTransactionService', '$location',
    function ($q, $scope, $translate, $http, $locale, languageService, apiHelperService, notificationsService, $timeout, $rootScope, $state, $stateParams, googleAnalyticsService, $interval, authManager, $sce, lookupService, serviceTransactionService, $location, cookieStorage) {
        // change the translation language & reload the page to make sure all errors were rendered properly
        $scope.enableServiceDelegation = window.config.enableServiceDelegation;
        $scope.hideControllsForServiceDeledation = false;
        $scope.enableNewRelic = window.config.enableNewRelic;
        $scope.enableDelegationFamilyMemberOfResidents = window.config.enableDelegationFamilyMemberOfResidents;
        $scope.allowIndividualsToSeeTheirDocumentsFromTheirAccounts = window.config.allowIndividualsToSeeTheirDocumentsFromTheirAccounts;
        $scope.showMyFilesPageToResidencyAndVisaHolderAccounts = window.config.showMyFilesPageToResidencyAndVisaHolderAccounts;
        $scope.baseCtrlClientConfig = window.config;
        $scope.enableRegisterNewTypingCenterWithIcpButton = window.config.enableRegisterNewTypingCenterWithIcpButton;
        //For Enable an easily navigation and access to the blue residency services in public services
        $scope.enableBlueResidencyServicesFlag = window.config.enableBlueResidencyServicesFlag;
        // To display Visas For Visiting Relatives And Friends.
        $scope.showVisaRequestPage = window.config.showVisasForVisitingRelativesAndFriendsPage;        

        // To display In/Out Transactions Page.
        $scope.showInOutTransactionsPage = window.config.showInOutTransactionsPage;

        $scope.switchOnDigitalAuthentication = false;
        $scope.enableFastTrackRequiredActions = false;

        //hide  'flashing-yellow' & 'flashing' class - domestic workers bundle
        $scope.hideFlashingClassForDWForms = window.config.hideFlashingClassForDWForms;

        // To display Team Performance Tabs  -- start

        $scope.showMyTeamPerformanceForMainUser = false;
        $scope.enableTeamPerformanceForEstablishment = window.config.enableTeamPerformanceForEstablishment;
        $scope.enableTeamPerformanceForTypingCenter = window.config.enableTeamPerformanceForTypingCenter;
        $scope.enableTeamPerformanceForServiceCenter = window.config.enableTeamPerformanceForServiceCenter;
        let applicationId = authManager.getCurrentUser()?.applicationId;
        $scope.isMenuExpanded = false;

        // Hide sidebar for COP
        if (applicationId == lookups.application.guest && $stateParams.serviceTransactionId == lookups.ServiceTransactions.VisaParentForDomesticHelper)
        {
            $rootScope.hideSidebar = true;
        }
        if ($scope.enableTeamPerformanceForEstablishment == true
            || $scope.enableTeamPerformanceForTypingCenter == true
            || $scope.enableTeamPerformanceForServiceCenter == true) {
            if (applicationId == lookups.application.establishment
                || applicationId == lookups.application.TypingCenter
                || applicationId == lookups.application.serviceCenters) {
                if (authManager.getCurrentUser()?.isEstablishmentAdmin == true) {
                    $scope.showMyTeamPerformanceForMainUser = true;
                }
            }
        }

        //var tour = new Tour({
        //    Storage: cookieStorage,
        //    orphan: true,
        //    steps: [
        //        {
        //            element: "#loginElement",
        //            title: $translate.instant('login'),
        //            content: "Content of my step",
        //            onNext: function (tour) {
        //                $timeout(function checkEl() {
        //                    let element = document.getElementById('loginElement');
        //                    if (element) {
        //                        element.click();
        //                    } else {
        //                        $timeout(checkEl, 1000);
        //                    }
        //                }, 1000);
        //            }
        //        }
        //    ]
        //});

        //tour.init();

        //$timeout(function () {
        //    tour.restart();
        //}, 1000);

        //tour.onEnd = function () {
        //    cookieStorage.remove(tour._options.name || 'default');
        //}

        // To display Team Performance Tabs  -- end

        function getActiveCenterPercentageDBPreference() {
            var options = {
                success: function (result) {
                    $scope.enableAppointmentAvailableSlotsPercentage = result == 1;
                }
            };
            return apiHelperService.get('shared/appointments-db-preference/' + 'ACTIVATE_CENTER_PERCENTAGE', options)
        }
        getActiveCenterPercentageDBPreference();

        $scope.enableNewSharedUserAddreses = window.config.enableNewSharedUserAddreses;
        $scope.addressesBookPreferences = [];

        $scope.goldenServicesDashboardLink = window.config.goldenServicesDashboardLink;

        (servicesDelegationCheck = () => {
            if ($scope.enableServiceDelegation) {
                var userStringify = localStorage.getItem('user');
                if (userStringify) {
                    var user = JSON.parse(userStringify);
                    var typingCenterDelegationId = user.userClaims?.find(x => x.key == 'TypingCenterDelegationId')?.values[0];
                    var serviceTransactionURL = localStorage.getItem('serviceTransactionURL');
                    var currentUrl = $location.absUrl();
                    if (typingCenterDelegationId != null) {
                        $scope.hideControllsForServiceDeledation = true;
                        var found = false;
                        var sdWhitelists = window.config.servicesDelegationWhitelists;
                        for (var i = 0; i < sdWhitelists.length; i++) {
                            if (currentUrl.includes(sdWhitelists[i])) {
                                found = true;
                                break;
                            }
                        }
                        if (!currentUrl.includes(serviceTransactionURL) && !found) {
                            // logout from citizen user
                            authManager.logout();
                        }
                    }
                }
            }
        })();

        $scope.hostURL = window.config.host;
        $scope.showTypingCentersWarnings = window.config.showTypingCentersWarnings;
        $scope.pullRequestServiceAvailable = window.config.pullRequestServiceAvailable;
        $scope.showEstabSponsored = true;
        $scope.showServiceCardVideo = window.config.showServiceCardVideo
        if (window.location.href.indexOf("langar") > -1) {
            if (localStorage.getItem('currentLanguage') != 'ar') {
                localStorage.setItem('currentLanguage', 'ar');
                window.location.reload();
            }
        }
        else {
            if (window.location.href.indexOf("langen") > -1) {
                if (localStorage.getItem('currentLanguage') != 'en') {
                    localStorage.setItem('currentLanguage', 'en');
                    window.location.reload();
                }
            }
        }

        if (localStorage.getItem('smartpasssso'))
            $scope.isSmartPassUser = true;
        else
            $scope.isSmartPassUser = false;

        if (localStorage.uaepassuser == "true")
            $scope.isUAEPASSUser = true;
        else
            $scope.isUAEPASSUser = false;



        $scope.isUaePassLogin = false;
        if (authManager.isUAEPASSLogin()) {
            $scope.isUaePassLogin = true;
        }

        $scope.showAppointmentsBooking = window.config.showAppointmentsBooking;
        $scope.showFAQ = window.config.enableFAQ;

        $scope.enableIndividualChangeUsername = window.config.enableIndividualChangeUsername;
        $scope.enableChatbot = window.config.enableChatbot;
        // $scope.BaseUrl = 'Tahaluf.eChannels.Site/client';
        $scope.landingRatingInstanceId = 1;

        if (window.location.href.indexOf("test.echannels.tahaluf.ae") > -1 || window.location.href.indexOf("beta.echannels.moi.gov.ae") > -1) {
            $scope.ADTheme = false;
        }
        if (localStorage.getItem('themeColor') == '' || localStorage.getItem('themeColor') == null) {
            localStorage.setItem('themeColor', 'brown');
        }
        $scope.isNavCollapsedMobilevar = false;

        $scope.isNavCollapsedMobile = function () {
            $scope.isNavCollapsedMobilevar = !$scope.isNavCollapsedMobilevar;
        }

        $scope.$watch(function () {
            $scope.pathname = location.hash;

            return location.hash
        }, function (value) {
            if (location.hash == '#/tamm-login') {

                localStorage.removeItem('CURRENT_PORTAL');
                localStorage.setItem('CURRENT_PORTAL', 'TAMM');

            }
            else if (location.hash == '#/public-golden-login' ||
                window.location.href.indexOf("/golden-portal.html#/") > -1 ||
                window.location.href.indexOf("portal=golden-portal") > -1) {
                localStorage.removeItem('CURRENT_PORTAL');
                localStorage.setItem('CURRENT_PORTAL', 'GOLDEN_RESIDENCY');

            }
            else if (!localStorage.getItem('CURRENT_PORTAL')) {
                localStorage.removeItem('CURRENT_PORTAL');
                localStorage.setItem('CURRENT_PORTAL', 'ICA');

            }

            if (localStorage.getItem('CURRENT_PORTAL')) {
                $scope.currentPortal = localStorage.getItem('CURRENT_PORTAL');
            } else {
                $scope.currentPortal = "ICA";
            }

            $scope.isLogin = value && value.toLowerCase().indexOf('#/login') != -1;

            //if (authManager.getCurrentUser() && authManager.getCurrentUser().applicationId == lookups.application.TypingCenter && !authManager.getCurrentUser().isImpersonateLogin && authManager.getCurrentUser().accountTypeId == 8) {
            //    getExternalUsers();
            //}

        });

        $rootScope.$watch('noResponseOnExtendTime', function (value) {
            if (value == true) {

                authManager.logout();
            }

        });

        //custom code for etihad portal
        $scope.isGust = false;

        if (!authManager.userHasPermission(['ETIHAD_ADMIN_USER'])) {
            $scope.isGust = true;
        }

        //end of custom code
        $scope.showEscapedReportAvailable = false;
        $scope.isCitizen = false;
        $scope.isGccCitizen = false;
        $scope.isResident = false;
        $scope.isDubaiResident = false;
        $scope.showResidencyCancelledTools = true;
        $scope.showSponsoredTab = true;
        $scope.showFinancialDeposits = false;
        $scope.isVisaHolder = false;
        $scope.isFamilyMemberResidencyHolder = false;
        $scope.isFreezoneAccount = authManager.getCurrentUser()?.accountTypeId == lookups.establishmentAccountTypes.freeZone
            || authManager.getCurrentUser()?.accountTypeId == lookups.establishmentAccountTypes.childFreeZone;
        $scope.isHoldingEstabAccount = Object.values(window.lookups.establishmentAccountTypes).includes(authManager.getCurrentUser()?.accountTypeId);

        // this flag to show/hide guardianship history section.
        $scope.hasGuardianshipFile = false;

        if (authManager.getCurrentUser()) {

            //// load Addresses Book Preferences
            getAdressesBookPreferencesSettings();

            //#region [Check Establishment Eligibility For Visa Deposits]
            //PBI 672059: Apply the new changes for the Establishments Visa Deposits
            if (authManager.getCurrentUser().applicationId == lookups.application.establishment) {
                manageVisaDepositsWalletPages();
            }
            //#endregion

            if (authManager.getCurrentUser().applicationId == lookups.application.establishment) {
                getDigitalAuthenticationPreferencesControl();
            }

            var user = authManager.getCurrentUser();
            if (user && (user.applicationId == lookups.application.citizen ||
                user.applicationId == lookups.application.resident || user.applicationId == lookups.application.gcc_citizen || user.applicationId == lookups.application.dubaiResident)) {
                getFastTrackRequiredActionsPreferencesControl();
            }

            if (authManager.getCurrentUser().applicationId == lookups.application.citizen) {
                $scope.isCitizen = true;
                if (window.config.showEscapedReportAvailable)
                    $scope.showEscapedReportAvailable = true;

                // get logged in unified number
                let personUnifiedNumber = authManager.getCurrentUser().unifiedNumber;

                var options = {
                    success: function (response) {
                        /* if the member is citizen who were or are currently under guardianship 
                         * then show the guardianship history section.
                         */
                        $scope.hasGuardianshipFile = response > 0;
                    }
                };
                apiHelperService.get('citizenServices/draft/checkMemberHasGurdianshipFile/' + personUnifiedNumber, options)
            }

            if (authManager.getCurrentUser().applicationId == lookups.application.gcc_citizen) {
                $scope.isGccCitizen = true;
                if (window.config.showEscapedReportAvailable)
                    $scope.showEscapedReportAvailable = true;
            }

            if (authManager.getCurrentUser().applicationId == lookups.application.resident) {
                $scope.isResident = true;
            }

            if (authManager.getCurrentUser().applicationId == lookups.application.dubaiResident) {
                $scope.isDubaiResident = true;
            }

            if (authManager.getCurrentUser().applicationId == lookups.application.residencyCancelled) {
                $scope.showResidencyCancelledTools = false;
            }
            if (authManager.getCurrentUser().applicationId == lookups.application.residencyCancelled) {
                $scope.showSponsoredTab = false;
            }

            if (authManager.getCurrentUser().applicationId && authManager.getCurrentUser().applicationId != lookups.application.establishment && authManager.getCurrentUser().applicationId != lookups.application.TypingCenter && authManager.getCurrentUser().applicationId != lookups.application.dubaiResident) {
                $scope.showFinancialDeposits = true;
            }
            if (authManager.getCurrentUser().applicationId == lookups.application.visaHolder) {
                $scope.isVisaHolder = true;
            }
            if (authManager.getCurrentUser().applicationId == lookups.application.residencyCancelled) {
                $scope.isResidencyCancelled = true;
            }
            if (authManager.getCurrentUser().applicationId == lookups.application.familyMemberResidencyHolder) {
                $scope.isFamilyMemberResidencyHolder = true;
            }
            else if (authManager.getCurrentUser().applicationId && authManager.getCurrentUser().applicationId == lookups.application.establishment && authManager.getCurrentUser().establishmentAdminRegionId && authManager.getCurrentUser().establishmentAdminRegionId != lookups.adminRegions.dubai) {
                $scope.showFinancialDeposits = true;
            }
        }

        $scope.dateTime = new Date();
        $scope.copyRightyear = new Date().getFullYear();
        $scope.dateFormat = "dd/MM/yyyy";
        $scope.dateWithTimeFormat = "dd/MM/yyyy h:mm:ss a";
        $scope.dateWithTimeFormatWithoutSS = "dd/MM/yyyy h:mm a";
        $scope.findAllCharIndex = function (str, char) {

            var indices = [];
            for (var i = 0; i < str.length; i++) {
                if (str[i] === char) indices.push(i);
            }
            return indices;
        };
        $scope.DateFormater = function (e) {


            var value = e.srcElement.value;

            if (e.key == '/') {
                value = value.slice(0, value.length - 1);
            }
            if (value.indexOf('//') > -1) {
                value = value.replace('//', '/');
            }
            //var arrIndexes = $scope.findAllCharIndex(value, '/');
            //for (var i = 0; i < arrIndexes.length; i++) {
            //    if (arrIndexes[i] != 2 && arrIndexes[i] != 5) {
            //        value = value.slice(arrIndexes[i]-1, arrIndexes[i] );
            //    }
            //}

            //if (speratorIndex != 2 && speratorIndex != 5) {

            //}

            if (value.length == 2)
                value += '/'
            if (value.length == 5)
                value += '/'


            e.srcElement.value = value;
        }


        $scope.issueGCCVisaServiceTransactionId = window.config.issueGCCVisaServiceTransactionId;
        $scope.defaultAdministrativeRegionId = window.config.defaultAdministrativeRegionId;
        $scope.userManagmentUrl = window.config.userManagmentUrl;
        $scope.amwalPortalUrl = window.config.amwalPortalUrl;
        $scope.amwalPortalImpersonateLoginUrl = window.config.amwalPortalImpersonateLoginUrl;
        //Setup for the card reader to be optional or required
        $scope.isCardReaderRequired = window.config.isCardReaderRequired;
        $scope.showCardReaderButton = window.config.showCardReaderButton;
        $scope.showUsingSponsorEIDAButton = window.config.showUsingSponsorEIDAButton;
        $scope.showLeavePermit = window.config.showLeavePermit;
        if (localStorage.user) { // this for gcc and gcc no identity
            var user;
            try {
                user = JSON.parse(localStorage.user);
                if (user && user.applicationId) {
                    $scope.userApplication = user.applicationId;
                }

                if (user && user.applicationId == lookups.application.gcc) {
                    $scope.serviceTransactionId = window.config.issueGCCVisaServiceTransactionId;
                }
                else if (user && user.applicationId == lookups.application.gccNoIdentity) {
                    $scope.serviceTransactionId = window.config.issueGCCNOIdentityVisaServiceTransactionId;
                }
            }
            catch (e) {
                this.setCurrentUser(null);
            }

        }

        var emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/);

        $rootScope.ShowGeneralError = function (result) {
            errorOption = { type: "error", duration: 5000, isSticky: true, messageBody: $translate.instant('GeneralError'), titleBody: "" };
            console.error(result);
            notificationsService.showNotification(errorOption);
        }

        $scope.getEnumTransalation = function (enumList) {
            var translatedEnum = [];
            angular.forEach(enumList, function (val) {
                translatedEnum.push({ value: val.value, name: $translate.instant(val.name) })
            })

            return translatedEnum;
        }

        $scope._base64ToArrayBuffer = function (base64) {
            var binary_string = window.atob(base64);
            var len = binary_string.length;
            var bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }

        $scope.translateCalendar = function () {
            if ($locale.DATETIME_FORMATS) {
                if (languageService.getCurrent() == 'ar') {
                    $locale.clearText = 'مسح';
                    $locale.closeText = 'إغلاق';
                    $locale.todayText = 'اليوم';
                    $locale.DATETIME_FORMATS.DAY = $locale.DATETIME_FORMATS.SHORTDAY = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
                    $locale.DATETIME_FORMATS.MONTH = $locale.DATETIME_FORMATS.SHORTMONTH = $locale.DATETIME_FORMATS.STANDALONEMONTH = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
                }
                else {
                    $locale.clearText = 'Clear';
                    $locale.closeText = 'Close';
                    $locale.todayText = 'Today';
                    $locale.DATETIME_FORMATS.DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                    $locale.DATETIME_FORMATS.MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    $locale.DATETIME_FORMATS.SHORTDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                    $locale.DATETIME_FORMATS.SHORTMONTH = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    $locale.DATETIME_FORMATS.STANDALONEMONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                }
            }
        }
        $scope.color = '';
        $scope.color2 = '';
        onloadBase();

        $scope.changetoADTheme = true;
        $scope.changetoBlackTheme = true;
        $scope.parentobj = {};
        $scope.parentobj.parentproperty = false;
        function onloadBase() {

            $scope.siteLang = languageService.getCurrent();
            $scope.loadArabicCss = false;
            $scope.loadArabiclang = 'en';
            if (languageService.getCurrent() == 'ar') {
                $scope.loadArabicCss = true;
                $scope.loadArabiclang = 'arab';
                $scope.sliderPath = "AR"; // for slider images in home page
            } else if (languageService.getCurrent() == 'en') {
                $scope.sliderPath = "En";// for slider images in home page
            } else if (languageService.getCurrent() == 'it') {
                $scope.sliderPath = "it";// for slider images in home page
            } else if (languageService.getCurrent() == 'bd') {
                $scope.sliderPath = "bd";// for slider images in home page
            } else if (languageService.getCurrent() == 'cn') {
                $scope.sliderPath = "cn";// for slider images in home page
            } else if (languageService.getCurrent() == 'fr') {
                $scope.sliderPath = "fr";// for slider images in home page
            } else if (languageService.getCurrent() == 'de') {
                $scope.sliderPath = "de";// for slider images in home page
            } else if (languageService.getCurrent() == 'in') {
                $scope.sliderPath = "in";// for slider images in home page
            } else if (languageService.getCurrent() == 'pt') {
                $scope.sliderPath = "pt";// for slider images in home page
            } else if (languageService.getCurrent() == 'ru') {
                $scope.sliderPath = "ru";// for slider images in home page
            } else if (languageService.getCurrent() == 'jp') {
                $scope.sliderPath = "jp";// for slider images in home page
            } else if (languageService.getCurrent() == 'es') {
                $scope.sliderPath = "es";// for slider images in home page
            }

            $scope.translateCalendar();


            //get total visitors for echannels
            //googleAnalyticsService.getTotalVisitors(function (totalVisitors) {

            //    $scope.totalVisitors = totalVisitors;
            //});

            $scope.themeColorClass = localStorage.getItem('themeColorClass');
            $scope.color = localStorage.getItem('themeColor');
            getEnvironmentDetails();



        }
        $scope.switchLanguage = function (lang) {

            languageService.setCurrent(lang);
            let version = localStorage.cacheVersion;
            version = version + 1;
            localStorage.setItem('cacheVersion', version);
            window.location.reload(true);
        };

        $scope.checkLanguage = function (lang) {
            if (localStorage.currentLanguage == undefined) {
                languageService.setCurrent('en');
            }
            if (lang === localStorage.currentLanguage) {
                return false
            } else {
                return true
            }
        };

        $scope.scrollToDiv = function (div) {
            document.getElementById(div).scrollIntoView({ block: 'end', behavior: 'smooth' });
        }

        $scope.collapseMenu = function () {
            $scope.collapse = !$scope.collapse;
        };

        $scope.collapseDropDown = function () {

        };


        $scope.extendTimeOut = function () {
            var extendTimeOutOptions = {
                success: function (response) {
                },
                error: function (error) {


                }
            };
            apiHelperService.get('user/extendTimeOut', extendTimeOutOptions);
        };

        var accentReplacer = function (character) {
            var h = charToAccentedCharClassMap[character] || character;
            return h;
        };

        $scope.validateDates = function (smallDate, biggerDate, errorMessageKey) {

            var deferred = $q.defer();
            var valid = false;
            if (!smallDate || !biggerDate)
                valid = false;
            else if (smallDate <= biggerDate)
                valid = true;
            deferred.resolve({ isValid: valid, message: $translate.instant(errorMessageKey) });
            return deferred.promise;
        };

        $scope.validateTwoRequiredDates = function (smallDate, biggerDate, errorMessageKey) {
            var deferred = $q.defer();
            if (!smallDate || !biggerDate) {
                deferred.resolve({ isValid: true, message: $translate.instant(errorMessageKey) });
            }
            else {
                var valid = false;
                if (smallDate <= biggerDate)
                    valid = true;
                deferred.resolve({ isValid: valid, message: $translate.instant(errorMessageKey) });
            }
            return deferred.promise;
        };

        $scope.validateTwoDate = function (smallDate, biggerDate, errorMessageKey) {
            var deferred = $q.defer();
            if (!smallDate || !biggerDate) {
                deferred.resolve({ isValid: true, message: $translate.instant(errorMessageKey) });
            }
            else {
                var valid = true;
                if (smallDate <= biggerDate)
                    valid = false;
                deferred.resolve({ isValid: valid, message: $translate.instant(errorMessageKey) });
            }
            return deferred.promise;
        };

        $scope.validateFirstDateMoreThanSecondDate = function (smallDate, biggerDate, errorMessageKey) {
            var deferred = $q.defer();
            if (!smallDate || !biggerDate) {
                deferred.resolve({ isValid: true, message: $translate.instant(errorMessageKey) });
            }
            else {
                var valid = false;
                if (smallDate < biggerDate)
                    valid = true;
                deferred.resolve({ isValid: valid, message: $translate.instant(errorMessageKey) });
            }
            return deferred.promise;
        };
        $scope.validateBetweenTwoDateMaxSixMonthAndMinOneMonth = function (smallDate, biggerDate) {
            var deferred = $q.defer();
            if (smallDate && biggerDate) {

                var startDate = new Date(smallDate);
                var endDate = new Date(biggerDate);

                if (smallDate > biggerDate) {
                    deferred.resolve({ isValid: false, message: $translate.instant('dateToMessage') });
                    return deferred.promise;
                }

                var divideOrAdd = 0;

                for (var i = startDate.getMonth() + 1; i < endDate.getMonth() + 1; i++) {
                    if (i == 1 || i == 3 || i == 5 || i == 7 || i == 8 || i == 10 || i == 12) {
                        divideOrAdd = divideOrAdd - 1; // number of month that have 31  days
                    }
                    if (i == 2) {
                        var x = startDate.getFullYear() / 4
                        if (x % 1 === 0) // isInt  ==> "Leap Day" feb have 29 days
                        {
                            divideOrAdd = divideOrAdd + 1
                        } else {
                            divideOrAdd = divideOrAdd + 2
                        }
                    }
                }

                var totalDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
                totalDays = totalDays + divideOrAdd;

                var totalMonths = Math.ceil(totalDays / 30);

                if (totalMonths % 1 !== 0) { // 1 month, 1 day  = 2 month
                    totalMonths = totalMonths + 1;
                }

                if (totalMonths > 6) {
                    deferred.resolve({ isValid: false, message: $translate.instant('MaximumSixMonth') });
                }
                else if (totalMonths < 1) {
                    deferred.resolve({ isValid: false, message: $translate.instant('MinimumOneMonth') });
                }

            }
            return deferred.promise;
        };
        $scope.validateDatesDifferenceMoreThanSixMonthes = function (value, message) {
            var deferred = $q.defer();
            if (value) {
                var momentCurrDate = moment(new Date()).startOf('day');
                var momentAfterAddSaven = momentCurrDate.month() + 7;
                var yearAfterAddSeven = momentCurrDate.year();
                if (momentAfterAddSaven > 12) {
                    momentAfterAddSaven = momentAfterAddSaven - 12;
                    yearAfterAddSeven = yearAfterAddSeven + 1;
                }
                else {
                    momentAfterAddSaven = momentCurrDate.month() + 7;
                }
                var currentDate = new Date(yearAfterAddSeven + '/' + momentAfterAddSaven + '/' + momentCurrDate.date());
                var momentVisaExpiryDate = moment(value).startOf('day');
                var visaExpiryDate = new Date(momentVisaExpiryDate.year() + '/' + (momentVisaExpiryDate.month() + 1) + '/' + momentVisaExpiryDate.date());
                if (visaExpiryDate < currentDate) {
                    if (value) {
                        deferred.resolve({ isValid: false, message: $translate.instant(message) });
                    }
                }
                else {
                    deferred.resolve({ isValid: true, message: "" });
                }
            }
            else {
                deferred.resolve({ isValid: true, message: "" });
            }
            return deferred.promise;
        };
        $scope.validateDatesDifferenceMoreThanOneMonthe = function (smallDate, biggerDate) {
            var deferred = $q.defer();
            if (smallDate && biggerDate) {

                var startDate = new Date(smallDate);
                var endDate = new Date(biggerDate);

                if (smallDate > biggerDate) {
                    deferred.resolve({ isValid: false, message: $translate.instant('dateToMessage') });
                    return deferred.promise;
                }

                var divideOrAdd = 0;

                for (var i = startDate.getMonth() + 1; i < endDate.getMonth() + 1; i++) {
                    if (i == 1 || i == 3 || i == 5 || i == 7 || i == 8 || i == 10 || i == 12) {
                        divideOrAdd = divideOrAdd - 1; // number of month that have 31  days
                    }
                    if (i == 2) {
                        var x = startDate.getFullYear() / 4
                        if (x % 1 === 0) // isInt  ==> "Leap Day" feb have 29 days
                        {
                            divideOrAdd = divideOrAdd + 1
                        } else {
                            divideOrAdd = divideOrAdd + 2
                        }
                    }
                }

                var totalDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
                totalDays = totalDays + divideOrAdd;

                var totalMonths = Math.ceil(totalDays / 30);

                if (totalMonths % 1 !== 0) { // 1 month, 1 day  = 2 month
                    totalMonths = totalMonths + 1;
                }

                if (totalMonths > 1) {
                    deferred.resolve({ isValid: false, message: $translate.instant('maximumOneMonth') });
                }
            }
            return deferred.promise;
        };

        $scope.checkText = function (text) {
            var deferred = $q.defer();
            var pattern = new RegExp(/^[a-zA-Z-,.'-]+(\s{0,1}[a-zA-Z-, .'-])*$/);
            var valid = true;
            if (text)
                valid = pattern.test(text.trim());
            return valid;
        };

        $scope.checkArabicEnglishText = function (text) {
            var deferred = $q.defer();
            var englishPattern = new RegExp(/^[a-zA-Z0-9?><;,{}/[\]\-_+.()& |']*$/);
            var arabicPattern = new RegExp(/^[\u0621-\u064A\u0660-\u0669 ,?0-9, {}/[\]\-_+()&.'ءًٌٍَُُِّْ~-]+$/);
            var valid = true;
            if (text)
                valid = englishPattern.test(text.trim()) || arabicPattern.test(text.trim());
            deferred.resolve({ isValid: valid, message: $translate.instant('ArabicEnglishContentOnly') });
            return deferred.promise;
        };

        $scope.checkEnglishText = function (text) {
            var deferred = $q.defer();
            var pattern = new RegExp(/^[a-zA-Z0-9?><;,{}/[\]\-_+.()& |']*$/);
            if (text)
                var valid = pattern.test(text.trim());
            deferred.resolve({ isValid: valid, message: $translate.instant('EnglishContentOnly') });
            return deferred.promise;
        };

        $scope.checkArabicText = function (text) {
            var deferred = $q.defer();
            var pattern = new RegExp(/^[\u0621-\u064A\u0660-\u0669 ,?0-9, {}/[\]\-_+()&.'ءًٌٍَُُِّْ~-]+$/);
            var valid = true;
            if (text)
                valid = pattern.test(text.trim());
            deferred.resolve({ isValid: valid, message: $translate.instant('ArabicContentOnly') });
            return deferred.promise;
        };

        $scope.checkAddressText = function (text, preferedLanguage) {
            var deferred = $q.defer();

            if (preferedLanguage) {

                if (preferedLanguage == 1) {
                    var pattern = new RegExp(/^[\u0621-\u064A\u0660-\u0669 ,?0-9, {}/[\]\-_+()&.'ءًٌٍَُُِّْ~-]+$/);
                    var valid = true;
                    if (text)
                        valid = pattern.test(text.trim());
                    deferred.resolve({ isValid: valid, message: $translate.instant('ArabicContentOnly') });
                    return deferred.promise;
                }
                else {
                    var pattern = new RegExp(/^[a-zA-Z0-9?><;,{}/[\]\-_+.()& |']*$/);
                    if (text)
                        valid = pattern.test(text.trim());
                    deferred.resolve({ isValid: valid, message: $translate.instant('EnglishContentOnly') });
                    return deferred.promise;
                }
            }
            else {
                deferred.resolve({ isValid: true });
                return deferred.promise;
            }

        };

        $scope.checkWhiteSpace = function (text) {
            var deferred = $q.defer();
            var pattern = new RegExp(/^\S*$/);
            var valid = pattern.test(text.trim());
            deferred.resolve({ isValid: !valid, message: $translate.instant('whiteSpace') });
            return deferred.promise;

        };

        $scope.checkEnglishTextWithWhiteSpace = function (text) {
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
        $scope.checkEnglishTextOnlyWithWhiteSpace = function (text) {
            var errorMessage = '';
            var deferred = $q.defer();
            var pattern = new RegExp(/^[a-zA-Z?><;,{}/[\]\-_+.()& |']*$/);
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

        $scope.checkArabicTextWithWhiteSpace = function (text) {
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

        $scope.checkArabicTextWithWhiteSpaceAndOptionalNumbers = function (text) {
            var errorMessage = '';
            var deferred = $q.defer();
            var pattern = new RegExp(/^[\u0621-\u064A\u0660-\u0669 ,?0-9, {}/[\]\-_+()&.'ءًٌٍَُُِّْ~-]+$/);
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

        $scope.checkEnglishTextWithoutSpace = function (text) {
            var deferred = $q.defer();
            var pattern = new RegExp(/^[a-zA-Z]*$/);
            if (text) {
                valid = pattern.test(text.trim());
            };
            deferred.resolve({ isValid: valid, message: $translate.instant('englishContentWithoutSpace') });
            return deferred.promise;
        };


        $scope.validateEmail = function (text) {
            var deferred = $q.defer();

            var valid = emailPattern.test(text.trim());
            deferred.resolve({ isValid: valid, message: $translate.instant('INVALID_EMAIL') });
            return deferred.promise;
        };

        var identityNumberPattern = new RegExp(/^(784)(19|20|13|14){1,3}[0-9][0-9]{1,9}$/);

        $scope.validateIdentityNumber = function (text) {
            var deferred = $q.defer();

            var valid = true;
            deferred.resolve({ isValid: valid, message: $translate.instant('InvalidIdentityNumber') });
            return deferred.promise;
        };

        $scope.validateIban = function (text) {
            var deferred = $q.defer();
            var valid = (text) ? true : false;
            deferred.resolve({ isValid: valid, message: $translate.instant('WRONG_IBAN') });
            return deferred.promise;
        };

        $scope.changeThemeColor = function (color, themeColorClass) {
            $scope.color = color;
            localStorage.setItem('themeColor', color);
            localStorage.setItem('themeColorClass', themeColorClass)
            $scope.themeColorClass = themeColorClass;
        };

        $scope.changeThemeColor2 = function (color2) {

            $scope.color2 = color2;
        };

        $scope.changeTheme = function (color) {

            if ($scope.changetoADTheme) {
                $scope.changeThemeColor2('abudhabi-theme');
                $scope.color = color;
                $scope.changetoADTheme = false;
            }
            else {
                $scope.changeThemeColor2('');
                $scope.color = '';
                $scope.changetoADTheme = true;
            }
            localStorage.setItem('themeColor', color);
        };

        $scope.changeThemeBlack = function (color) {

            if ($scope.changetoBlackTheme) {
                $scope.color = color;
                $scope.changetoBlackTheme = false;
            }
            else {
                $scope.color = '';
                $scope.changetoBlackTheme = true;
            }
            localStorage.setItem('themeColor', $scope.color);
        };

        $scope.formatDate = function (date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('/');
        }

        $scope.translate = function (value, isCountry, callback) {
            var options = {
                success: function (response) {
                    var translatedValue = '';
                    if (value)
                        translatedValue = response[value.toLowerCase()];
                    if (callback)
                        callback(translatedValue);
                },
            };

            if (isCountry)
                apiHelperService.get('translation/countryAndCity/' + value, options);
            else {
                if ($scope.checkText(value)) {
                    apiHelperService.get('translation/' + value, options);
                }
            }
        }

        $scope.checkValueGreaterThanZero = function (value) {
            var isValid = true;
            var deferred = $q.defer();
            if (value && parseInt(value) == 0) {
                isValid = false;
            }
            deferred.resolve({ isValid: isValid, message: $translate.instant('numberInValid') });

            return deferred.promise;
        }

        $scope.checkIdentityNumber = function (identityNumber) {

            var isValid = true;
            var isNotValid = false;
            var firstThreeValuesFromidentityNumber = "784";
            var deferred = $q.defer();
            var firstThreeValues = identityNumber.substring(0, 3);

            if (firstThreeValues != firstThreeValuesFromidentityNumber) {
                var isValid = false;
            }

            deferred.resolve({ isValid: isValid, message: $translate.instant('numberInValidMustStartedwith748') });
            return deferred.promise;
        }

        $scope.checkOnPassportNumber = function (passportNumber) {
            if (passportNumber) {
                var isValid = true;
                //var numbers = '';
                //if (passportNumber[0].match(/^[A-Za-z]+$/)) {
                for (var i = 0; i < passportNumber.length; i++) {
                    if (!(parseInt(passportNumber[i]) >= 0)) {
                        if (!passportNumber[i].match(/^[A-Za-z]+$/)) {
                            isValid = false;
                            break;
                        }
                    }
                    //else {
                    //    numbers += passportNumber[i];
                    //}
                }
                //if (!numbers) {
                //    isValid = false;
                //}
                //}
                //else {
                //    isValid = false;
                //}
                var deferred = $q.defer();
                deferred.resolve({ isValid: isValid, message: $translate.instant('numberInValid') });

                return deferred.promise;
            }
        }

        $scope.checkSpecialCharacter = function (model, message) {

            var deferred = $q.defer();
            var regex = new RegExp(/^[0-9a-zA-Z\_]|[\u0621-\u064A\u0660-\u0669, {}/[\]\.'ءًٌٍَُُِّْ~-]+$/);
            //var pattern = new RegExp(/^+$/);
            var valid = true;
            if (model)
                valid = regex.test(model);
            deferred.resolve({ isValid: valid, message: $translate.instant(message) });
            return deferred.promise;
        }

        $scope.getBrowser = function () {


            var userAgent = window.navigator.userAgent;

            var browsers = { chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i };

            for (var key in browsers) {
                if (browsers[key].test(userAgent)) {
                    return key;
                }
            };

            return 'unknown';

        };

        $scope.downloadReceipt = function (requestNumber, email) {

            var options = {
                success: function (response) {
                    var data = $scope._base64ToArrayBuffer(response.byteArrayBase64String);
                    var blob = new Blob([data], {
                        type: 'application/octet-stream'
                    });


                    var link = document.createElement('a');
                    link.setAttribute("type", "hidden"); // make it hidden if needed
                    // append to body
                    document.body.appendChild(link);

                    link.href = window.URL.createObjectURL(blob);

                    var fileName = $translate.instant("applicationPayment") + '.pdf';
                    link.download = fileName;
                    // click it (download)
                    //

                    var browser = $scope.getBrowser();
                    if (browser == 'unknown')// For IE
                        window.navigator.msSaveOrOpenBlob(blob, fileName);
                    else
                        link.click();
                },



                showSpinner: true,
                params: { requestNumber: requestNumber, applicantEmail: email }
            };



            apiHelperService.get('printReport/GetApplicationPayment', options, 'blob');

        };

        $scope.GetLandingPayment = function (requestNumber) {
            var options = {
                success: function (response) {
                    var data = $scope._base64ToArrayBuffer(response.byteArrayBase64String);
                    var blob = new Blob([data], {
                        type: 'application/octet-stream'
                    });
                    var link = document.createElement('a');
                    link.setAttribute("type", "hidden"); // make it hidden if needed
                    // append to body
                    document.body.appendChild(link);
                    link.href = window.URL.createObjectURL(blob);
                    var fileName = $translate.instant("applicationPayment") + '.pdf';
                    link.download = fileName;
                    // click it (download)
                    //
                    var browser = $scope.getBrowser();
                    if (browser == 'unknown')// For IE
                        window.navigator.msSaveOrOpenBlob(blob, fileName);
                    else
                        link.click();
                },
                showSpinner: true,
                params: { requestNumber: requestNumber }
            };
            apiHelperService.get('notification/report/GetLandingPayment', options, 'blob');
        };

        $scope.printEstablishmentCard = function (request) {
            var serviceName = localStorage.currentLanguage == 'ar' ? "بطاقة_المنشأة" : "Establishment_Card";
            var params = { requestNumber: request.requestNumber };
            $scope.downloadReportWithParams('notification/report/printEstablishmentCard', serviceName + " _ " + request.requestNumber, params);
        };

        $scope.downloadEtihadReceipt = function (requestNumber) {

            var options = {
                success: function (response) {
                    var data = $scope._base64ToArrayBuffer(response.byteArrayBase64String);
                    var blob = new Blob([data], {
                        type: 'application/octet-stream'
                    });


                    var link = document.createElement('a');
                    link.setAttribute("type", "hidden"); // make it hidden if needed
                    // append to body
                    document.body.appendChild(link);

                    link.href = window.URL.createObjectURL(blob);

                    var fileName = $translate.instant("applicationPayment") + '.pdf';
                    link.download = fileName;
                    // click it (download)
                    //

                    var browser = $scope.getBrowser();
                    if (browser == 'unknown')// For IE
                        window.navigator.msSaveOrOpenBlob(blob, fileName);
                    else
                        link.click();
                },



                showSpinner: true,
                params: { requestNumber: requestNumber }
            };


            apiHelperService.get('printReport/getEtihadApplicationPayment', options, 'blob');
        };

        $scope.checkLocalAddress = function (location, emirateId, cityId) {
            var deferred = $q.defer();
            var isValid = true;


            if (emirateId && cityId && !location.place) {
                isValid = true;
            } else if (!location) {
                isValid = false;
            }
            else if (location.countryCode != 'AE' || (!location.emirate) || (!location.city)) {
                isValid = false;
            }

            deferred.resolve({ isValid: isValid, message: $translate.instant('invalidLocalAddress') });
            return deferred.promise;
        };

        $scope.downloadReport = function (reportApi, name, email) {

            var options = {
                success: function (response) {
                    var data = $scope._base64ToArrayBuffer(response.byteArrayBase64String);
                    var blob = new Blob([data], {
                        type: 'application/octet-stream'
                    });

                    var link = document.createElement('a');
                    link.setAttribute("type", "hidden"); // make it hidden if needed
                    // append to body
                    document.body.appendChild(link);
                    link.href = window.URL.createObjectURL(blob);
                    var fileName = name + '.pdf';
                    link.download = fileName;
                    // click it (download)
                    var browser = $scope.getBrowser();
                    if (browser == 'unknown')
                        window.navigator.msSaveOrOpenBlob(blob, fileName);
                    else
                        link.click();
                    // remove link from body
                    document.body.removeChild(link);
                },

                showSpinner: true
            };

            if (email) {
                options.params = { applicantEmail: email }
            }

            apiHelperService.get(reportApi, options, 'blob');
        };

        $scope.downloadReportWithParams = function (reportApi, name, paramters) {
            var options = {
                success: function (response) {
                    if (!response.noDataFound) {
                        var data = $scope._base64ToArrayBuffer(response.byteArrayBase64String);
                        var blob = new Blob([data], {
                            type: 'application/octet-stream'
                        });

                        var link = document.createElement('a');
                        link.setAttribute("type", "hidden"); // make it hidden if needed
                        // append to body
                        document.body.appendChild(link);
                        link.href = window.URL.createObjectURL(blob);
                        var fileName = name + '.pdf';
                        link.download = fileName;
                        // click it (download)
                        var browser = $scope.getBrowser();
                        if (browser == 'unknown')
                            window.navigator.msSaveOrOpenBlob(blob, fileName);
                        else
                            link.click();
                        // remove link from body
                        document.body.removeChild(link);
                    } else {
                        var options = { type: "warning", duration: 5000, messageBody: $translate.instant('noDataFoundMessage'), titleBody: $translate.instant('') };
                        notificationsService.showNotification(options);
                    }

                },
                showSpinner: true,
                params: paramters
            };
            apiHelperService.get(reportApi, options, 'blob');
        };



        $scope.validateUserName = function (username) {
            var deferred = $q.defer();

            if (username.length < 8)
                deferred.resolve({ isValid: valid, message: $translate.instant('MinEmail') });

            var valid = emailPattern.test(username.trim());
            if (!valid) {
                deferred.resolve({ isValid: valid, message: $translate.instant('INVALID_EMAIL') });
                return deferred.promise;
            }

            apiHelperService.get('user/username/' + username + '/isExist').then(function (res) {
                if (res.data == 1) {
                    deferred.resolve({ isValid: false, message: $translate.instant('EMAIL_ALREADY_USED') });
                } else if (res.data == 4) {
                    deferred.resolve({ isValid: false, message: $translate.instant('inactiveAccount') });
                }

                if (deferred.promise.$$state.status == 0 && valid) { deferred.resolve({ isValid: valid, message: $translate.instant('') }); }
                return deferred.promise;
            });

            return deferred.promise;
        };

        $scope.validateUserNameAndEmail = function (username) {
            var deferred = $q.defer();
            var emailPattern = new RegExp(/^(?!.*\.web$)^(?!.*-@)[a-zA-Z0-9._%+-]+@(?!-)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

            if (username.length < 8) {
                deferred.resolve({ isValid: valid, message: $translate.instant('MinEmail') });
            }

            var valid = emailPattern.test(username.trim());
            if (!valid) {
                deferred.resolve({ isValid: valid, message: $translate.instant('INVALID_EMAIL') });
                return deferred.promise;
            }
            apiHelperService.get('user/username/' + username + '/isExist').then(function (res) {
                if (res.data == 1) {
                    deferred.resolve({ isValid: false, message: $translate.instant('EMAIL_ALREADY_USED') });
                } else if (res.data == 4) {
                    deferred.resolve({ isValid: false, message: $translate.instant('inactiveAccount') });
                }

                if (deferred.promise.$$state.status == 0 && valid) { deferred.resolve({ isValid: valid, message: $translate.instant('') }); }
                return deferred.promise;
            });
            return deferred.promise;
        };

        $scope.checkForgetPasswordUserEmail = function (username) {
            var deferred = $q.defer();

            if (username.length < 8)
                deferred.resolve({ isValid: valid, message: $translate.instant('MinEmail') });

            var valid = emailPattern.test(username.trim());
            if (!valid) {
                deferred.resolve({ isValid: valid, message: $translate.instant('INVALID_EMAIL') });
                return deferred.promise;
            }

            apiHelperService.get('user/username/' + username + '/isExist').then(function (res) {

                if (res.data == null) {
                    deferred.resolve({ isValid: false, message: $translate.instant('EMAIL_IS_NOT_EXIST') });
                }
                else if (res.data != null && res.data == 4) {
                    deferred.resolve({ isValid: false, message: $translate.instant('inactiveAccount') });
                }

            });

            return deferred.promise;
        };

        $scope.checkUserEmailIsExist = function (username) {
            var deferred = $q.defer();

            if (username.length < 8)
                deferred.resolve({ isValid: valid, message: $translate.instant('MinEmail') });

            var valid = emailPattern.test(username.trim());
            if (!valid) {
                deferred.resolve({ isValid: valid, message: $translate.instant('INVALID_EMAIL') });
                return deferred.promise;
            }

            apiHelperService.get('user/username/' + username + '/isExist').then(function (res) {

                deferred.resolve({ isValid: !res.data, message: $translate.instant('EMAIL_IS_EXIST') });

            });

            return deferred.promise;
        };

        function getEnvironmentDetails() {
            if (!$scope.environmentName) {
                var options = {
                    success: function (response) {
                        $scope.viewEnvironmentDetails = response.viewEnvironmentDetails;
                        $scope.environmentName = response.environmentName;
                        $scope.version = response.version;
                        $scope.versionDate = response.versionDate;
                        $scope.isDevelopmentMode = response.isDevelopmentMode;
                    },
                    showSpinner: true
                };

                apiHelperService.get('content/environment', options);
            }
        }

        //website rate
        $scope.openrate = function () {
            $scope.ratemodal = 'fade in animated fadeInDownBig';
        }

        $scope.closeRateDialog = function () {
            $scope.ratemodal = '';
        };

        //website rate
        $scope.icamodal = function () {
            $scope.icamodal = 'fade in animated fadeInDownBig';
        };

        $scope.closeicamodal = function () {
            $scope.icamodal = '';
        };

        $scope.changeSelectedItem = function (itemId) {
            $scope.selectedItem = itemId;

            if (itemId == 1 && $scope.isFreezoneAccount)
                checkURL();
        };

        $scope.expandHeaderMenu = function () {

            $scope.isMenuExpanded = !$scope.isMenuExpanded
        };

        $scope.showUploadedFilesErrors = function (errFiles) {
            if (errFiles && errFiles.length > 0) {
                angular.forEach(errFiles, function (errFile) {

                    if (errFile.$error == 'maxSize') {

                        var message = $translate.instant("InvalidFileUploaded").replace("{MAX_SIZE}", $translate.instant(config.attachmentMaxSize));

                        var options = { duration: 5000, type: "warning", isSticky: false, messageKey: message, titleKey: "" };
                        notificationsService.showNotification(options);
                    }
                });
            }
        };

        $scope.value = 13;
        $scope.unit = 'px';
        $scope.changeFontSize = function (x) {

            $scope.textSize = $scope.value + x;
            if ($scope.textSize < 12) {
                $scope.textSize = 12;
                $scope.value = 12;
            }
            else if ($scope.textSize > 15) {
                $scope.textSize = 15;
                $scope.value = 15;
            }
            else {
                $scope.textSize = $scope.value + x;
                $scope.value = $scope.textSize;
                document.body.style.fontSize = $scope.textSize + $scope.unit;
            }



        };

        $scope.backToRequests = function () {
            if ($stateParams.moduleId) {
                $state.go('requests', { moduleId: $stateParams.moduleId });
            } else {
                $state.go('requests');
            }
        };

        $scope.checkLocalMobile = function (mobile, code) {
            // List of mobile numbers that are explicitly disallowed
            var disallowedMobileNumbers = window.config.disallowedMobileNumbers;

            var isValid = true;
            var pattern = "";
            var deferred = $q.defer();

            // Define regex pattern based on country code
            if (code == "00971") { // UAE
                pattern = new RegExp("^(?:\\+971|971|00971)?(?:50|51|52|53|54|55|56|58)\\d{7}$");
            }
            else {
                // Generic pattern for other countries: minimum 12 characters
                pattern = new RegExp("^(.|[\\r\\n]){12,}$");
            }

            if (mobile) {
                // Validate mobile number format and check if it's not in the disallowed list
                var isValid = pattern.test(mobile) && !disallowedMobileNumbers.includes(mobile);
            }

            // Return result as a promise
            deferred.resolve({
                isValid: isValid,
                message: $translate.instant('inValidLocalMobile')
            });


            return deferred.promise;
        };

        $scope.checkHomePhone = function (mobile, code) {
            var isValid = true;
            var pattern = "";
            var deferred = $q.defer();

            if (code == "00971") { // UAE
                pattern = new RegExp("^(?:\\+971|971|00971)?(?:2|3|4|6|7|9)\\d{7}$");
            }
            else {
                pattern = new RegExp("^(.|[\\r\\n]){14,}$");
            }

            if (mobile) {
                var isValid = pattern.test(mobile);
            }
            deferred.resolve({ isValid: isValid, message: $translate.instant('inValidHomePhone') });

            return deferred.promise;
        };

        $scope.toggleMobileNav = function () {

            $timeout(function () {
                if (window.screen.width <= 768) {
                    document.getElementById('clicknavv').click();
                }
            });
        };

        $scope.downloadCardReader = function () {
            var links = [
                window.config.host + '/tools/cardReader/cardReader.rar'
            ];
            var link = document.createElement('a');
            link.setAttribute('download', 'TahalufCardReader.rar');
            link.style.display = 'none';
            document.body.appendChild(link);
            for (var i = 0; i < links.length; i++) {
                link.setAttribute('href', links[i]);
                link.click();
            }
            document.body.removeChild(link);
        };

        $scope.downloadAll = function (language, type) {

            var links = [
                window.config.host + '/manual/new/' + type + '/' + language + '/echannels.pdf'/*,
            window.config.host + '/manual/' + "amwal" + '/' + language + '/Amwal.pdf'*/

            ];
            var link = document.createElement('a');
            link.setAttribute('download', 'manual_' + language + '_' + type);
            link.style.display = 'none';
            document.body.appendChild(link);
            for (var i = 0; i < links.length; i++) {
                link.setAttribute('href', links[i]);
                link.click();
            }
            document.body.removeChild(link);
        };

        $scope.getRequestAttachmentTypeText = function (attachment) {

            if (attachment.attachmentTypeId) {
                var attachmentName = undefined;
                angular.forEach(lookups.extraOptionalAttachments, function (extraAttachment) {
                    if (extraAttachment == attachment.attachmentTypeId) {
                        attachmentName = attachment.name;
                    }
                });
                if (!attachmentName) {
                    attachmentName = attachment.attachmentType.text;
                }
                return attachmentName;
            }
        };

        $scope.guestRedirect = function (routePath) {
            localStorage.removeItem('guestUser');
            localStorage.removeItem('user');
            window.location.href = window.config.host + "default.html#/" + routePath;
        };

        $scope.goldenPortalGuestRedirect = function (routePath) {
            localStorage.removeItem('guestUser');
            localStorage.removeItem('user');
            window.location.href = window.config.host + "golden-portal.html#/" + routePath;
        };

        $scope.checkTime = function (time) {
            if (time) {
                time = time.trim()
            }
            var deferred = $q.defer();
            var pattern = new RegExp(/^([01]\d|2[0-3]):([0-5]\d)$/);
            var valid = true;
            if (time)
                valid = pattern.test(time);
            deferred.resolve({ isValid: valid, message: $translate.instant('notvalidTime') });
            return deferred.promise;
        };

        $scope.activateTicketingIntegration = function () {
            var isEnabled = false;

            if (window.config.enableTicketingSystem)
                isEnabled = true;

            return isEnabled;
        };

        $scope.activateEventManagement = function () {
            var isEnabled = false;

            if (window.config.enableEventManagement)
                isEnabled = true;

            return isEnabled;
        };

        $scope.checkAgeGreaterThan18 = function (dateString) {
            var today = new Date();
            var isValid = false;

            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age >= 18) {
                isValid = true;
            }
            else {
                isValid = false;
            }

            var deferred = $q.defer();
            deferred.resolve({ isValid: isValid, message: $translate.instant('checkAgeGreaterThan18') });

            return deferred.promise;

        };

        $scope.showErrorPopup = function (errorMessage) {
            options = {
                type: 'error',
                isSticky: true,
                messageKey: $translate.instant(errorMessage),
                titleKey: ''
            };
            notificationsService.showNotification(options);
        };

        $scope.showWarningPopup = function (errorMessage) {
            var options = {
                type: "warning",
                duration: 5000,
                messageBody: errorMessage,
                titleBody: $translate.instant('warningTitle')
            };
            notificationsService.showNotification(options);
        };

        $scope.checkIfValueIsUndefinedOrEmpty = function (fieldValue) {
            if (fieldValue == undefined || fieldValue == '') return true;
            else return false;
        };

        $scope.enableMohlePeriod = function (hasAccessOnMohle) {
            var isActive = true;
            var date = moment("2018-12-31 23:59:59");
            if (hasAccessOnMohle)
                date = moment("2019-12-31 23:59:59");
            var now = moment();
            isActive = moment(date).isAfter(moment(now));
            return isActive;
        };

        $scope.getLookupText = function (entity, id) {

            if (id) {
                if (entity) {
                    var record = ((entity.filter(
                        function (record) {
                            if (record.id == id)
                                return true;
                            return false;
                        }))[0]);

                    if (record)
                        return record.text;
                }
            }
        };

        $scope.getLookupTextByNameId = function (entity, nameId) {

            if (nameId) {
                if (entity) {
                    var record = ((entity.filter(
                        function (record) {
                            if (record.nameId == nameId)
                                return true;
                            return false;
                        }))[0]);

                    if (record)
                        return record.text;
                }
            }
        };

        $scope.exceptionListOfProfessionForTawtheeq = function (professionId) {
            //15540 and 15262   ID for إمام مسجد
            var skipValidate = false;
            if (professionId) {
                if (professionId == 15540 ||
                    professionId == 15262)

                    skipValidate = true;
            }
            return skipValidate;
        };

        //To check if the age is greater than 18.
        $scope.checkIfAgeIsGreaterThan18 = function (dateOfBirthValue) {
            $scope.currentDate = new Date();
            if (!dateOfBirthValue) {
                return false;
            }
            else {
                var birthDate = moment(dateOfBirthValue).startOf('day');
                var current = moment($scope.currentDate).startOf('day');
                var value = current.diff(birthDate, 'years')
                if (value > 18)
                    return true;
                else
                    return false;
            }
        };

        //To check if the age is greater than 25.
        $scope.checkIfAgeIsGreaterThan25 = function (dateOfBirthValue) {
            $scope.currentDate = new Date();
            if (!dateOfBirthValue) {
                return false;
            }
            else {
                var birthDate = moment(dateOfBirthValue).startOf('day');
                var current = moment($scope.currentDate).startOf('day');
                var value = current.diff(birthDate, 'years')
                if (value >= 25)
                    return true;
                else
                    return false;
            }
        };

        //ETIHAD Function
        $scope.showEtihadPage = function (pageName) {

            var isAllowed = true;
            if (authManager.isUserLoggedIn) {


                if (authManager.userHasSinglePermission('HIDE_ETIHAD_REQUEST_PAGE') && pageName == "REQUESTS")
                    isAllowed = false;

                if (authManager.userHasSinglePermission("HIDE_ETIHAD_DAILY_OVERSTAY_REPORTS_PAGE") && pageName == "DAILY_OVERSTAY_REPORTS")
                    isAllowed = false;

                if (authManager.userHasSinglePermission("HIDE_ETIHAD_DRAFTS_PAGE") && pageName == "DRAFTS")
                    isAllowed = false;
            }
            return isAllowed;

        };
        //END Etihad Function

        $scope.activateVisaOnArrivalTab = function () {
            return true;
        };

        //#region FAQ And Faviorit from trquest Html
        $scope.getFAQQuestion = function (firstTime) {

            if (!firstTime) {
                $scope.firstTime = true

                var options = {
                    success: function (response) {

                        $scope.contentStructrue = response;


                    },
                    params: {
                        serviceTransactionIds: $stateParams.serviceTransactionId
                    }
                }
                if ($stateParams.serviceTransactionId) {
                    apiHelperService.get('content/client/getFAQ', options);
                }
            }

        };

        $scope.getClearText = function (text) {
            return $sce.trustAsHtml(text);
        };

        $scope.validateFavorit = function () {
            var currentUser = authManager.getCurrentUser();
            if (currentUser.applicationId == window.lookups.application.TypingCenter ||
                currentUser.applicationId == window.lookups.application.etihad ||
                currentUser.applicationId == window.lookups.application.mofa ||
                currentUser.applicationId == window.lookups.application.mofaProtocol ||
                currentUser.applicationId == window.lookups.application.guest) {
                return false;
            } else if (authManager.getCurrentUser().applicationId == window.lookups.application.establishment &&
                $stateParams.serviceTransactionId) {
                return true;
            } else if ($stateParams.serviceTransactionId && $stateParams.administrativeRegionId) {
                return true
            }

        };

        $scope.checkClassName = function (firstTime) {
            if (!firstTime) {
                $scope.checkCalssFirstTime = true
                var option = {
                    success: function (data) {
                        if (data.length > 0) {

                            if (data.find(e => e.serviceTransId == $stateParams.serviceTransactionId)) {
                                $scope.faFaActive = "fa-star"
                            } else {
                                $scope.faFaActive = ""
                            }
                        }
                        return true
                    }
                }
                apiHelperService.post("dashboard/getUserFavoriteServices", $scope.lastUpdate, option)
            }
        };

        $scope.processFavorit = function () {
            var userFavoriteService = {
                serviceTransId: $stateParams.serviceTransactionId,
                lookupAdminRegionId: $stateParams.administrativeRegionId,
                immigrationDepartmentId: $stateParams.immigrationDepartmentId
            };
            if ($scope.faFaActive) {
                apiHelperService.post('dashboard/deleteUserFavoriteService', userFavoriteService, {
                    success: function (response) {

                        $scope.faFaActive = ""
                        var options = {
                            type: "success", duration: 5000, messageBody: $translate.instant('favoritSuccessMessageDelete'), titleBody: ""
                        };
                        notificationsService.showNotification(options);
                    }
                });
            } else {
                apiHelperService.post('dashboard/addUserFavoriteService', userFavoriteService, {

                    success: function (response) {
                        $scope.faFaActive = "fa-star"

                        notificationsService.showNotification({
                            type: "success", duration: 5000, messageBody: $translate.instant('favoritSuccessMessageAdd'), titleBody: ""
                        });
                    }
                });
            }
        };

        //#endRegion

        $scope.enableParentAndRelativeInfo = window.config.enableParentInfoRelativeInfoAndQualificationLevel;
        $scope.enableQualificationLevel = window.config.enableQualificationLevel;

        $scope.isValidTransactionId = function (transactionId) {
            if (window.config.enableParentInfoRelativeInfoAndQualificationLevel && transactionId && window.config.allowedTransactionIdsToAddParentAndRelatives.includes(parseInt(transactionId))) {
                return true;
            } else {
                return false;
            }
        };

        $scope.getMoreServiceInformation = function () {
            window.open(
                `${window.location.origin}/${window.location.pathname}#/serviceInformation?serviceTransactionId=${$stateParams.serviceTransactionId}`,
                '_blank'
            );
        };

        $scope.getMoreServiceInformationByApplicationId = function () {
            window.open(
                `${window.location.origin}/${window.location.pathname}#/serviceInformation?applicationId=${$scope.applicationId}`,
                '_blank'
            );
        };

        function getExternalUsers() {
            var options = {
                success: function (response) {
                    $scope.externalUsers = response;

                    if ($scope.externalUsers.length > 0) {
                        // check if the logged in user is the main user for the typing center :: if yes then check if the ICA typing centre standard info are exist
                        if (!authManager.userHasCustomPermission(['ESTAB_ADMIN_USER'])) {
                            getUserProfile();
                        }
                    }

                    if (authManager.userHasCustomPermission(['ESTAB_ADMIN_USER'])) {
                        getEstabInfo();
                    }
                },
                showSpinner: true,
            };

            apiHelperService.get('user/getEstablishmentExternalUsers', options);
        }

        function getEstabInfo() {
            var options = {
                success: function (response) {
                    if (!response) {
                        $state.go('icaTypingCentreInfo');
                    }
                },
                showSpinner: true,
            };
            apiHelperService.get('establishment/CheckTypingCenterUpdatedInfo', options);
        }

        function getUserProfile() {

            var options = {
                success: function (response) {
                    if (response && (!response.identityNumber || !response.currentNationalityID)) { // || response.isSponsoredByTheTypingCenterFlag == undefined
                        $state.go('icaSubUserProfileInfo');
                    }
                },
                showSpinner: true
            };

            // update typing center sub user details :: without set the (isSponsoredByTheTypingCenterFlag) 
            apiHelperService.get('userProfile/current', options);
        }


        $scope.checkGuidanceContentService = function () {
            if (window.config.enableGuidanceContent && $stateParams.serviceTransactionId > 0) {
                var guidanceContent = angular.extend({
                    arabicContentName: null,
                    englishContentName: null,
                    arabicContentDescription: null,
                    englishContentDescription: null,
                    contentType: null,
                    PublishFromDate: new Date(),
                    PublishToDate: new Date(),
                    ApplicationId: null,
                    ServiceTransactionId: $stateParams.serviceTransactionId,
                    ContentStatusId: 2,
                    EnvironmentId: null,
                    currentPage: 1,
                    pageSize: 100,
                });
                var options = {
                    success: function (response) {
                        $scope.guidanceContentCollection = response.collection;
                        if ($scope.guidanceContentCollection.length > 0)
                            $scope.showGuidanceContentService = true;
                        else
                            $scope.showGuidanceContentService = false;

                    }, showSpinner: false
                };
                apiHelperService.post('guidanceContent/search', guidanceContent, options);
            }
        };

        $scope.checkGuidanceContentApplication = function () {
            if (window.config.enableGuidanceContent && window.location.href.indexOf("dashboard") > -1 && authManager && authManager.getCurrentUser() && authManager.getCurrentUser().applicationId > 0 && $scope.showGuidanceContentApplication == undefined) {
                var guidanceContent = angular.extend({
                    arabicContentName: null,
                    englishContentName: null,
                    arabicContentDescription: null,
                    englishContentDescription: null,
                    contentType: null,
                    PublishFromDate: new Date(),
                    PublishToDate: new Date(),
                    ApplicationId: authManager.getCurrentUser().applicationId,
                    ServiceTransactionId: null,
                    ContentStatusId: 2,
                    EnvironmentId: null,
                    currentPage: 1,
                    pageSize: 100,
                });
                var options = {
                    success: function (response) {
                        $scope.applicationId = authManager.getCurrentUser().applicationId;
                        $scope.guidanceContentCollection = response.collection;
                        if ($scope.guidanceContentCollection.length > 0)
                            $scope.showGuidanceContentApplication = true;
                        else
                            $scope.showGuidanceContentApplication = false;

                    }, showSpinner: false
                };
                apiHelperService.post('guidanceContent/search', guidanceContent, options);
            }
        };

        $scope.checkGuidanceContentService();

        $scope.checkGuidanceContentApplication();


        $scope.getCurrentUserApplication = function () {
            return authManager.getCurrentUser().applicationId;
        };

        $scope.showRequestDepartment = false;

        if (authManager.getCurrentUser() && authManager.getCurrentUser().applicationId == lookups.application.TypingCenter) {
            $scope.showRequestDepartment = true;
            $q.all([lookupService.loadDepartments()]).then(function (result) {
                $scope.departments = result[0].data;
            });
        }

        $scope.getDepartmentText = function (administrativeRegionId) {

            if (administrativeRegionId && $scope.departments) {
                var department = $scope.departments.find(department => department.administrativeRegionId == administrativeRegionId)
                if (department)
                    return department.text;
            }
        };

        $scope.showheaderLoginButton = function () {
            if (location.hash == '#/public-golden-login')
                return true;
            else
                return false;
        };

        $scope.useGoogleTranslate = function () {
            var el = document.querySelector('.goog-te-gadget-simple');
            if (el) el.click();
        };

        function getGoogleTranslateSelect() {
            var sel = document.querySelector('.goog-te-combo');
            if (sel) return sel;
            var container = document.getElementById('google_translate_element');
            return container ? container.querySelector('select') : null;
        }

        $scope.headerTranslateLanguageOptions = [
            { code: 'es', nameAr: 'الإسبانية', nameEn: 'Spanish', flag: 'images/flags/ESP.png' },
            { code: 'de', nameAr: 'الألمانية', nameEn: 'German', flag: 'images/flags/DEU.png' },
            { code: 'pt', nameAr: 'البرتغالية', nameEn: 'Portuguese', flag: 'images/flags/PRT.png' },
            { code: 'fr', nameAr: 'الفرنسية', nameEn: 'French', flag: 'images/flags/FRA.png' },
            { code: 'ru', nameAr: 'الروسية', nameEn: 'Russian', flag: 'images/flags/RUS.png' },
            { code: 'zh-CN', nameAr: 'الصينية', nameEn: 'Chinese', flag: 'images/flags/CHN.png' },
            { code: 'ur', nameAr: 'الأردية', nameEn: 'Urdu', flag: 'images/flags/PAK.png' }
        ];

        $scope.selectTranslateLanguage = function (langCode) {
            if (typeof langCode !== 'string') return;
            $scope.headerLanguageModalVisible = false;
            var sourceLang = (localStorage.currentLanguage === 'ar') ? 'ar' : 'en';

            var select = getGoogleTranslateSelect();
            var hasOption = false;
            if (select && select.options) {
                for (var i = 0; i < select.options.length; i++) {
                    if (select.options[i].value === langCode) { hasOption = true; break; }
                }
            }
            if (select && hasOption) {
                select.value = langCode;
                select.dispatchEvent(new Event('change', { bubbles: true }));
                return;
            }

            document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            if (langCode !== sourceLang) {
                document.cookie = 'googtrans=/' + sourceLang + '/' + langCode + '; path=/; max-age=86400';
            }
            window.location.reload();
        };

        $scope.openCustomerPulseGeneralSurvey = function () {
            var linkValue = null;
            if (window.config.customerPulseGeneralSurveyV2) {
                linkValue = window.config.customerPulseGeneralSurveyEntityLinkingIdV2;
            }
            else {
                linkValue = window.config.customerPulseGeneralSurveyEntityLinkingId;
            }
            window.CustomerPulse.render(document.getElementById('customer-pulse-general'), {
                link: linkValue,
                //lang: $scope.language,
                lang: localStorage.currentLanguage,
                modal: true
            });

            window.CustomerPulse.openModal();
        };

        $scope.validateNameNumber = function (name) {
            var deferred = $q.defer();
            var values = name.split(' ').filter(function (v) { return v !== '' });
            valid = false

            if (values.length > 1) {
                //two or more words
                valid = true
            }
            else {
                //not enough words
                valid = false
            }

            deferred.resolve({ isValid: valid, message: $translate.instant('nameShallContainTwoWordsAtLeast') });
            return deferred.promise;
        };

        $scope.administrativeRegion = function (request) {
            if (window.config.showAppointmentsBooking && window.config.allowedAdministrativeRegionsForAppointment.includes(parseInt(request.administrativeRegionId))) {
                return true;
            } else
                return false;

        };

        Date.prototype.addDays = function (days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };

        $scope.IsIndividualAccount = function () {
            if (authManager.getCurrentUser().applicationId == lookups.application.gcc ||
                authManager.getCurrentUser().applicationId == lookups.application.resident ||
                authManager.getCurrentUser().applicationId == lookups.application.citizen ||
                authManager.getCurrentUser().applicationId == lookups.application.gcc_citizen ||
                authManager.getCurrentUser().applicationId == lookups.application.gccNoIdentity ||
                authManager.getCurrentUser().applicationId == lookups.application.indianHoldAmericanGreenCard ||
                authManager.getCurrentUser().applicationId == lookups.application.visaHolder ||
                authManager.getCurrentUser().applicationId == lookups.application.dubaiResident ||
                authManager.getCurrentUser().applicationId == lookups.application.residencyCancelled
            )
                return true;
            else return false;
        };

        ////Quick Search -- start
        //Get all allowed services for the public/guest user
        $scope.getServiceTransactions = function (serviceDetails) {
            var options = {
                success: function (modules) {
                    $scope.modules = modules;
                    allServices($scope.modules, serviceDetails);
                }
            };
            apiHelperService.get('quick-search/service-transactions', options);
        };

        function allServices(services, serviceDetails) {
            $scope.searchBoxCurrentPage = 1;
            angular.forEach(services, function (module) {
                angular.forEach(module.moduleServices, function (parentService) {
                    angular.forEach(parentService.childs, function (subService) {
                        angular.forEach(subService.serviceTransactions, function (transaction) {
                            var fullserviceDescription = serviceDetails.filter(c => c.serviceTransId == transaction.id);
                            var serviceName = fullserviceDescription[0].childTransactionDescription;//module.localizedName + '-' + parentService.localizedName + '-' + subService.localizedName + '-' + transaction.localizedName;
                            var service = {
                                localizedServiceName: serviceName,
                                moduleId: module.id,
                                transactionId: transaction.id,
                                beneficiaryApplicationIds: transaction.beneficiaryApplicationIds,
                                serviceDescription: fullserviceDescription[0].serviceDescription,
                                serviceFullDescription: fullserviceDescription[0].serviceFullDescription
                            };
                            $scope.selectedServiceTransaction.push(service);
                        });
                    });
                });
            });
        }

        $scope.getAllServiceTranasctionsByGroups = function () {
            $scope.newServicesList = [];
            var options = {
                success: function (response) {
                    $scope.quickSearchServicesLoaded = true
                    $scope.getServiceTransactions(response);
                },
            };
            apiHelperService.get('quick-search/service-name-details', options);
        };

        $scope.prepareQuickSearchMode = function () {
            $scope.quickSearch = true;
            $scope.searchBoxCurrentPage = 1;
            if (!$scope.quickSearchServicesLoaded) {
                $scope.selectedServiceTransaction = [];
                $scope.getAllServiceTranasctionsByGroups();

            }

        };
        $scope.myFunction = function () {
            window.location.href = "#/login";
        };

        $scope.serviceCard = function (serviceTransactionId) {
            var options = {
                success: function (response) {
                    if (response) {
                        $scope.closeQuickSearch();
                        $state.go('serviceCards', { serviceTransactionId: serviceTransactionId, applicationId: response.applicationId });
                    }
                },
                params: { serviceTransactionId: serviceTransactionId }
            };
            apiHelperService.get('quick-search/service-transactions-config', options);
        };

        $scope.closeQuickSearch = function () {
            $scope.quickSearch = false;
        };
        ////Quick Search -- end

        $scope.checkShowEstabSponsored = function () {
            var dateToday = new Date();
            var dateBeforeMonth = new Date();
            dateBeforeMonth.setDate(dateBeforeMonth.getDate() - 30);
            var options = {
                success: function (data) {
                    if (data == 0) {
                        // This mean establishment card is cancelled
                        $scope.showEstabSponsored = false;
                    }

                },
                showSpinner: true
            };
            apiHelperService.get('dashboard/getEstablishment?establishmentId=' + authManager.getCurrentUser().establishmentId, options);
        }

        //if (authManager.getCurrentUser() && authManager.getCurrentUser().establishmentId && authManager.getCurrentUser().applicationId == lookups.application.establishment) {
        //    $scope.checkShowEstabSponsored();
        //}

        $scope.isAllowedAdministrativeRegionsForAppointment = function (adminRegionId) {
            if (adminRegionId) {
                if (window.config.showAppointmentsBooking && window.config.allowedAdministrativeRegionsForAppointment.includes(parseInt(adminRegionId))) {
                    return true;
                } else
                    return false;
            } else
                return false;

        };

        $timeout(function () {
            $scope.$watch('baseCtrl', function (inputs) {//I change here
                var inputs = document.querySelectorAll("input[type=text]");
                var inp = inputs || null;
                if (inp) {
                    for (var i = 0; i < inp.length; i++) {
                        if (!inp[i].hasAttribute('autocomplete')) {
                            inp[i].setAttribute("autocomplete", "none");
                        }
                    }
                }
            });
        }, 1000);


        $scope.enableServiceDelegationByTypingCenterWhiteList = false;

        function isTypingCenterInWhiteList() {
            if (localStorage.getItem('serviceDelegation') == null) {
                if (authManager.getCurrentUser() && $scope.enableServiceDelegation) {

                    if (authManager.getCurrentUser().applicationId == lookups.application.TypingCenter) {

                        var params = { whiteListType: lookups.whiteListType.servicesDelegation };
                        var options = {
                            success: function (response) {
                                $scope.enableServiceDelegationByTypingCenterWhiteList = response;
                                localStorage.setItem('serviceDelegation', response);
                            },
                            error: function (error) {

                            }
                        };
                        apiHelperService.get('typingCenterActions/isTypingCenterInWhiteList/' + lookups.whiteListType.servicesDelegation, options);
                    }
                }
            } else {
                $scope.enableServiceDelegationByTypingCenterWhiteList = localStorage.getItem('serviceDelegation');
            }


        };

        isTypingCenterInWhiteList();

        function checkIfHasInvestorOrEntrepreneur() {
            $scope.seniorWorkersListFlag = false;
            $scope.executiveManagersListFlag = false;
            if (window.config.enableNewGoldenSponsoredPage) {
                if (authManager.getCurrentUser() &&
                    (authManager.getCurrentUser().applicationId == lookups.application.resident ||
                        authManager.getCurrentUser().applicationId == lookups.application.dubaiResident)) {
                    var options = {
                        success: function (result) {
                            if (result == 825)
                                $scope.seniorWorkersListFlag = true;
                            else if (result == 824)
                                $scope.executiveManagersListFlag = true;
                        }
                    };
                    apiHelperService.get('individual/info/userServiceTypeId/', options);
                }
            }
        }

        checkIfHasInvestorOrEntrepreneur()

        function reactivationMessage() {
            var userStringify = localStorage.getItem('user');
            if (userStringify) {
                var user = JSON.parse(userStringify);
                if (user?.reactivatedFlag) {
                    user.reactivatedFlag = false;
                    var options = {
                        type: "success", isSticky: true, messageBody: $translate.instant('accountHasBeenActivated'), titleBody: ""
                    };
                    notificationsService.showNotification(options);
                    setTimeout(() => { localStorage.setItem('user', JSON.stringify(user)) }, 1000)
                }
            }
        };

        reactivationMessage();
        var userName = authManager.getCurrentUser()?.userName;
        function checkURL() {
            var _establishmentId = Number($location.search()?.search?.split("establishmentId=")[1]?.split("&")[0]) > 0
                ? Number($location.search()?.search?.split("establishmentId=")[1]?.split("&")[0])
                : Number($location.search()?.search?.split("establishmentId=")[1]);

            if (_establishmentId && $location.search()?.search?.includes("establishmentId")) {
                $scope.searchForMainfreeZoneRequests = true;

                let requestUrl = `establishment/index.html#/requests`;

                window.location.href = window.config.host + requestUrl;
                window.location.reload();
            }
        }

        $scope.isServiceInList = function (serviceTransactionIds) {
            var isServiceInList = false;
            for (var i = 0; i < serviceTransactionIds.length; i++) {
                if (serviceTransactionIds[i] == $stateParams.serviceTransactionId) {
                    isServiceInList = true;
                    break;
                }
            }
            return isServiceInList;
        }

        $scope.skipLoadLookupsByListOfServices = function (listOfServices) {
            var result = false;
            switch (listOfServices) {
                case lookups.skipTransactionReasonLookupServiceList:
                    result = $scope.isServiceInList(lookups.skipTransactionReasonLookupServiceList);
                    break;
                case lookups.skipTransactionReasonsByModuleParentReasonIdLookupServiceList:
                    result = $scope.isServiceInList(lookups.skipTransactionReasonLookupServiceList);
                    break;


            }
            return !result;
        }

        //PBI#: 469576 => Display a confirmation message for the entered data and attachments while applying for visa services
        $scope.loadConfirmationMessageForVisaServices = function (callback) {
            var result = false;
            window.showConfirmationMessageForVisaServices({
                title: $translate.instant('confirmation'),
                titleBody: $translate.instant('confirmationMsgFoVisaServiceDetailsMSG1'),
                messageBody: $translate.instant('confirmationMsgFoVisaServiceDetailsMSG2'),
            }, function (operation) {
                if (operation)
                    result = true;
                else
                    result = false;
                if (callback)
                    callback(result);
            });
        }

        //PBI#: 576340 => Display an informative message regarding the fingerprint process for the Citizens Emirates ID Renewal service (559)
        $scope.loadInformativeMessageForEIDRenewalService = function (callback) {
            var result = false;
            window.showConfirmationMessageForVisaServices({
                title: $translate.instant('informativeMessage'),
                titleBody: $translate.instant('informativeMsgForEIDRenewalServiceDetailsMSG1'),
                messageBody: $translate.instant('informativeMsgForEIDRenewalServiceDetailsMSG2'),
            }, function (operation) {
                if (operation)
                    result = true;
                else
                    result = false;
                if (callback)
                    callback(result);
            });
        }

        var currentUser = authManager.getCurrentUser();

        function checkIfDubaiVisaHolder() {
            $scope.dubaiVisaHolder = false;
            var options = {
                success: function (response) {
                    if (response.adminRegionId == lookups.adminRegions.dubai) {
                        $scope.dubaiVisaHolder = true;
                    }
                },

            };
            apiHelperService.get('individual/info', options);
        }
        if (currentUser != null && currentUser.applicationId == lookups.application.visaHolder) {
            checkIfDubaiVisaHolder()
        }

        function onInit() {
            $scope.enableMyCompanies = window.config.enableMyCompaniesIcon ?? false;
        }
        onInit();

        $scope.goToMyCompanies = function () {

            window.location.href = window.config.host + 'individual/index.html#/myRelatedEstablishment';
        }
        $scope.personalize_settings = !$scope.personalize_settings;
        $scope.favorite_services = false; $scope.personal_information = false; $scope.my_notofications = false;

        $scope.checkContractDuration = function (duration) {

            var isValid = false;

            if (duration >= 2 && duration <= 15) {
                isValid = true;
            }

            var deferred = $q.defer();
            deferred.resolve({ isValid: isValid, message: $translate.instant('Contract Duration must be between 2 and 15 years') });

            return deferred.promise;

        };
        $scope.checkIsDevelopmentMode = function () {
            var result = window.config.isDevelopmentMode;
            if (result == undefined || result == null || result == false) {
                return false;
            }
            return true;
        };



        $scope.checkDateValidityInDays = function (date, numOfDays) {
            //this method to check if the provided date is greater than or equal (current date + provided number of days)

            var valid = false;
            var currentDate = new Date();

            //make the time at mid night
            currentDate.setHours(0, 0, 0, 0);

            var minValidDate = new Date(currentDate);
            minValidDate.setDate(currentDate.getDate() + numOfDays);

            if (new Date(date) >= minValidDate)
                valid = true;

            return valid;
        };

        //#region [Check Establishment Eligibility For Visa Deposits]
        //PBI 672059: Apply the new changes for the Establishments Visa Deposits

        $rootScope.visaDepositWalletTypeIdTourism = lookups.walletTypesEnum.tourismEstablishmentsDepositWallet;
        $rootScope.showVisaDepositAddWalletPageTourism = false;
        $rootScope.showVisaDepositWalletDetailsPageTourism = false;

        $rootScope.visaDepositWalletTypeIdMedical = lookups.walletTypesEnum.medicalEstablishmentsDepositWallet;
        $rootScope.showVisaDepositAddWalletPageMedical = false;
        $rootScope.showVisaDepositWalletDetailsPageMedical = false;

        $rootScope.visaDepositWalletTypeIdStudy = lookups.walletTypesEnum.studyEstablishmentsDepositWallet;
        $rootScope.showVisaDepositAddWalletPageStudy = false;
        $rootScope.showVisaDepositWalletDetailsPageStudy = false;

        function manageVisaDepositsWalletPages() {
            var options = {
                success: function (response) {
                    if (response) {

                        if (response.tourismVisaDeposits != null) {
                            var tourismVisaDeposits = response.tourismVisaDeposits;
                            if (tourismVisaDeposits.isEligible && tourismVisaDeposits.hasDefaultWallet) {
                                $rootScope.showVisaDepositWalletDetailsPageTourism = true;
                            }
                            else if (tourismVisaDeposits.isEligible && !tourismVisaDeposits.hasDefaultWallet) {
                                $rootScope.showVisaDepositAddWalletPageTourism = true;
                            }
                        }

                        if (response.medicalVisaDeposits != null) {
                            var medicalVisaDeposits = response.medicalVisaDeposits;
                            if (medicalVisaDeposits.isEligible && medicalVisaDeposits.hasDefaultWallet) {
                                $rootScope.showVisaDepositWalletDetailsPageMedical = true;
                            }
                            else if (medicalVisaDeposits.isEligible && !medicalVisaDeposits.hasDefaultWallet) {
                                $rootScope.showVisaDepositAddWalletPageMedical = true;
                            }
                        }

                        if (response.studyVisaDeposits != null) {
                            var studyVisaDeposits = response.studyVisaDeposits;
                            if (studyVisaDeposits.isEligible && studyVisaDeposits.hasDefaultWallet) {
                                $rootScope.showVisaDepositWalletDetailsPageStudy = true;
                            }
                            else if (studyVisaDeposits.isEligible && !studyVisaDeposits.hasDefaultWallet) {
                                $rootScope.showVisaDepositAddWalletPageStudy = true;
                            }
                        }

                    }
                },

            };
            apiHelperService.get('establishment/establishmentVisaDeposits/checkEstablishmentEligibilityForVisaDeposits', options);
        }

        //#endregion

        $scope.checkIfDateIs30DaysOrMore = function (date) {
            return $scope.checkDateValidityInDays(date, 30);
        };

        $scope.validateDates = function (smallDate, biggerDate, errorMessageKey, passValidityOneMonthOrMoreMsg, serviceTransId, serviceTransIdList) {
            var deferred = $q.defer();
            var valid = false;
            if (serviceTransIdList && serviceTransId && serviceTransIdList.includes(parseInt(serviceTransId))) {
                valid = $scope.checkIfDateIs30DaysOrMore(biggerDate);
                if (!valid) {
                    deferred.resolve({ isValid: false, message: $translate.instant(passValidityOneMonthOrMoreMsg) });
                    return deferred.promise;
                }
                if (!smallDate || !biggerDate) {
                    deferred.resolve({ isValid: false, message: $translate.instant(errorMessageKey) });
                    return deferred.promise;
                }
                else if (smallDate <= biggerDate) {
                    deferred.resolve({ isValid: true, message: $translate.instant(errorMessageKey) });
                    return deferred.promise;
                }
            }
            else if (!smallDate || !biggerDate)
                valid = false;
            else if (smallDate <= biggerDate)
                valid = true;
            deferred.resolve({ isValid: valid, message: $translate.instant(errorMessageKey) });
            return deferred.promise;
        };

        $scope.checkMohreRequestNumberChanged = function (requestNumber) {
            if ($stateParams.requestNumber != requestNumber) {
                let currentUrl = window.location.href;
                var strArr = currentUrl.split("?requestNumber=");
                window.location.href = strArr[0] + "?requestNumber=" + requestNumber;
            }
        }

        $scope.asterisksEmail = function (email) {
            if (!email) return '';
            var atIndex = email.indexOf('@');
            if (atIndex <= 1) {
                // Not enough characters to hide
                return email;
            }
            var hiddenPart = email.substring(1, atIndex).replace(/./g, '*');
            return email.charAt(0) + hiddenPart + email.substring(atIndex);
        }

        function getAdressesBookPreferencesSettings() {
            var options = {
                success: function (response) {
                    $scope.addressesBookPreferences = response;
                },

            };
            apiHelperService.get('addressesBook/management/getAdressesBookPreferencesSettings', options);
        }

        function getDigitalAuthenticationPreferencesControl() {
            apiHelperService.get('shared/db-pref-control-status/' + 'SWITCH_ON_DIG_AUTH_VALIDATION', {
                success: function (response) {
                    if (response) {
                        $scope.switchOnDigitalAuthentication = response.turnOnFlag;
                    }
                }
            });
        }

        $scope.fastActionId = 0;
        $scope.requiredActionFlag = 0;
        $scope.checkFastTrack = function () {
            var options = {
                success: function (response) {
                    if (response && response.item1 == 1 && response.item2 != null) {
                        $scope.fastActionId = response.item2;
                        $scope.requiredActionFlag = response.item1;
                        if (!localStorage.fastActionId && !localStorage.requiredActionFlag) {
                            localStorage.setItem("fastActionId", JSON.stringify($scope.fastActionId));
                            localStorage.setItem("requiredActionFlag", JSON.stringify($scope.requiredActionFlag));
                        }
                    }
                }
            };
            apiHelperService.get('individual/check-fast-action', options);
        };

       
        function getFastTrackRequiredActionsPreferencesControl() {
            apiHelperService.get('shared/db-pref-control-status/' + 'ENABLE_FAST_TRACK_REQUIRED_ACTIONS', {
                success: function (response) {
                    if (response) {
                        $scope.enableFastTrackRequiredActions = response.turnOnFlag;
                        if (response.turnOnFlag) {
                            $scope.checkFastTrack();
                        }
                    }
                }
            });
        }



        function GetUaePassSetup() {
            var options = {
                success: function (response) {
                    if (response) {
                        $scope.uaePassSetup = response;
                        if ($scope.uaePassSetup) {
                            if ($scope.uaePassSetup.changeUserNameApplicationIds && $scope.uaePassSetup.changeUserNameApplicationIds.split(',').map(Number).includes(authManager.getCurrentUser()?.applicationId)) {
                                $scope.showChangeUserNameFeature = true;
                            }
                            else {
                                $scope.showChangeUserNameFeature = false;
                            }
                        }
                    }
                },
            };
            apiHelperService.get('uaepass/setup', options);
        }
        GetUaePassSetup();
        $scope.goToAmwalPortal = function () {
            var options = {
                success: function (response) {
                    if (response) {
                        $scope.amwalSSOLink = $scope.amwalPortalImpersonateLoginUrl + "?token=" + response.token + "&email=" + response.emailAddress;
                        return window.open($scope.amwalSSOLink, '_blank');
                    }
                },

            };
            apiHelperService.get('user/amwal/impersonateLogin/token', options);
        }

        $scope.enforceEnglishTextOnly = function (event) {
            var char = String.fromCharCode(event.which);
            var regex = /^[A-Za-z0-9\s.,!?]*$/;

            if (!regex.test(char)) {
                event.preventDefault();
            }
        };

        $scope.goToSecurityPortal = function () {
            var options = {
                success: function (response) {
                    if (response) {
                        var url = $scope.userManagmentUrl + "&idToken=" + response.token;
                        return window.open(url, '_blank');
                    }
                },

            };
            apiHelperService.get('user/security/impersonateLogin/token', options);
        }

        $scope.checkIsExemptedNationality = function (nationalityId, callback) {
            var options = {
                success: function (response) {
                    callback(response);
                },
                error: function (err) {
                    callback(false);
                }
            };

            apiHelperService.get('draft/checkIsExemptedNationality/' + nationalityId, options);
        };

        $scope.prepareDWActions = function (request, callback) {
            lookupService.loadDWPackageServices(function (result) {
                if (result) {
                    var serviceTransId = request.serviceTransactionId ? request.serviceTransactionId : request.serviceTransId
                    if (result.filter(s => s.serviceType == 'Echannels').map(m => m.parentServicesId).includes(serviceTransId)) {
                        var options = {
                            success: function (response) {
                                if (response) {
                                    request.targetServicTransId = response.actionServiceTransactionId;

                                    var currentLang = localStorage.getItem("currentLanguage");

                                    if (currentLang == "ar") {
                                        request.actionDescription = response.actionArDescription;
                                    }
                                    else {
                                        request.actionDescription = response.actionEnDescription;
                                    }
                                }

                                if (callback) {
                                    callback(response);
                                }
                            }
                        };

                        if (authManager.getCurrentUser()?.applicationId == window.lookups.application.guest) {
                            apiHelperService.get(`domesticWorker/getDWBundleNextServiceTransId/${request.id}`, options);
                        }
                        else {
                            apiHelperService.get(`domesticWorker/request/getDWBundleNextServiceTransId/${request.id}`, options);
                        }
                    }
                }
            });
        }        
      
       
        $scope.generateGUID = (callback) => {

            var options = {
                success: function (response) {
                    if (response.key) {
                        return callback(response.key)
                    }
                }
            };
            apiHelperService.get("establishment/mohreWorkPackage/draft/genrateGUID", options);
        }

        $rootScope.setupConfigration = function (withDetails, serviceId, requestNumber) {
            (function (appdynamicConfig) {

                if (currentStateName.includes('mohreworkpackage'))
                    appdynamicConfig.appKey = window.config.appDynamicsConfig.appKeyWorkPackage;
                else
                    appdynamicConfig.appKey = window.config.appDynamicsConfig.appKeyDomesticWorker;

                appdynamicConfig.adrumExtUrlHttp = 'http://cdn.appdynamics.com';
                appdynamicConfig.adrumExtUrlHttps = 'https://cdn.appdynamics.com';
                appdynamicConfig.beaconUrlHttp = window.config.appDynamicsConfig.beaconUrlHttp;
                appdynamicConfig.beaconUrlHttps = window.config.appDynamicsConfig.beaconUrlHttps;
                appdynamicConfig.xd = { enable: true };
                appdynamicConfig.spa = { "spa2": true };
                if (withDetails) {
                    (function (info) {
                        window.AppDyn_UserInfo = window.AppDyn_UserInfo || {};

                        info.PageView = {
                            userData: {
                                requestNumber: requestNumber,
                                journeyUniqueId: localStorage.mohreJourneyUniqueId
                            },
                            userDataLong: {
                                serviceId: serviceId,
                            }
                        };

                        info.VPageView = {
                            userData: {
                                requestNumber: requestNumber,
                                journeyUniqueId: localStorage.mohreJourneyUniqueId
                            },
                            userDataLong: {
                                serviceId: serviceId,
                            }
                        };

                        //info.Ajax = {
                        //    userData: {
                        //        requestNumber: requestNumber,
                        //    },
                        //    userDataLong: {
                        //        serviceId: serviceId,
                        //    }
                        //};

                        info.Error = {
                            userData: {
                                requestNumber: requestNumber,
                                journeyUniqueId: localStorage.mohreJourneyUniqueId
                            },
                            userDataLong: {
                                serviceId: serviceId,
                            }
                        };

                    })(appdynamicConfig.userEventInfo || (appdynamicConfig.userEventInfo = {}));
                }
            })(window['adrum-config'] || (window['adrum-config'] = {}));
        }

        $scope.authorizationCallback = {
            callbackFn: null,
            requestData: null
        };

        $scope.setAuthorizationCallback = function (callbackFn, requestData) {
            $scope.authorizationCallback.callbackFn = callbackFn;
            $scope.authorizationCallback.requestData = requestData;
        };

        $scope.executeAuthorizationCallback = function () {
            const { callbackFn, requestData } = $scope.authorizationCallback;

            if (typeof callbackFn === 'function') {
                callbackFn(requestData);
            }

            $scope.authorizationCallback = {
                callbackFn: null,
                requestData: null
            };
        };
        $scope.goTocreateNewTicket = () => {
            window.location.hash = '/create-new-ticket';

        }

        $scope.scrollToFirstInvalid = function () {
            $timeout(function() {
                var firstInvalid = document.querySelector(
                    '.form group .ng-invalid'
                );

                if(firstInvalid) {
                    var formGroup = firstInvalid.closest('.form-group');

                    if(formGroup) {
                        formGroup.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        })
                    }
                }
            })
        }

        $scope.downloadPdfByBase64 = function (base64, fileName) {
            const byteCharacters = atob(base64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName + '.pdf';
            link.click();

            URL.revokeObjectURL(link.href);
        }
    }]);

mainApp.run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (!toState || !toState.name)
            return

        var appdynamicsConfig = window.config.appDynamicsConfig;

        window.currentStateName = toState.name.toLowerCase();

        //#region add & remove script from body
        function addScript(src) {
            var isAlreadyExist = false;
            var scripts = document.getElementsByTagName('script');

            Object.entries(scripts).filter(([key, value]) => {
                if (value['src'] == appdynamicsConfig.scriptUrl) {
                    isAlreadyExist = true;
                }
            });
            if (!isAlreadyExist) {
                var script = document.createElement('script');
                script.src = src;
                script.async = true;
                document.head.appendChild(script);
            }
        }

        function removeScript(withClearCache) {

            var scripts = document.getElementsByTagName('script');
            var isNeedClearCache = false

            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].src.toLowerCase().includes('adrum') || scripts[i].src.toLowerCase().includes('appdynamics')) {
                    document.head.removeChild(scripts[i]);
                    isNeedClearCache = true;
                }
            }

            if (isNeedClearCache && withClearCache) {
                window.location.reload(true);
            }
        }
        //#endregion

        // || toState.name.toLowerCase().includes('cancellationreceipt')
        if (appdynamicsConfig.appDynamicsEnabledStates.some(state =>
            toState.name.toLowerCase().includes(state.toLowerCase()))) {
            if (appdynamicsConfig.enableAppDynamic) {
                //#region APP DYNAMIC CONFIG 
                window['adrum-start-time'] = new Date().getTime();
                $rootScope.setupConfigration();
                //#endregion

                addScript(appdynamicsConfig.scriptUrl);
            }

        } else {
            var withClearCache = !toState.name.toLowerCase().includes('proxy') && !toState.name.toLowerCase().includes('payment')
            removeScript(withClearCache)
        }
    });
}]);