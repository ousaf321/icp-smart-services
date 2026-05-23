angular.module('mainApp').controller('headerCtrl', ['$scope', '$translate', '$rootScope', 'apiHelperService',
    'notificationsService', '$location', "authManager", 'languageService', '$state', '$sce', '$stateParams',
    function ($scope, $translate, $rootScope, apiHelperService, notificationsService, $location, authManager, languageService, $state, $sce, $stateParams) {

        /*
        angular.element(document).ready(function () {
            if (window.config.enableStory && checkPreview()) {
                (getAnnouncements = () => {
                    var options = {
                        success: function (response) {
                            if (response && response.length > 0) {
                                //loop over text and convert it to images
                                arrImageUrl = convertTextToImage(response);
                                //why there is no arr.Map :(
                                for (var i = 0; i < response.length; i++) {
                                    response[i].imageUrl = arrImageUrl[i];
                                    //map title based on language
                                    response[i].title = response[i].languagesTitle;
                                }
                                //callback for integration api
                                var moiOptions = {
                                    success: function (moiResponse) {
                                        //start mapping
                                        for (var i = 0; i < moiResponse.length; i++) {
                                            let obj = {
                                                id: moiResponse[i].id,
                                                title: moiResponse[i].title,
                                                externalLink: moiResponse[i].externalLink,
                                                lastUpdated: moiResponse[i].modificationDate,
                                                announcementLanguage: moiResponse[i].announcementLanguage,
                                                imageUrl: moiResponse[i].imageUrl !== '' ? moiResponse[i].imageUrl : convertTextToImage([moiResponse[i]]),//if not exist convert txt to image
                                                modificationDate: moiResponse[i].modificationDate
                                            };
                                            response.push(obj);
                                        }
                                        //fill story
                                        loadStory(response);
                                    },
                                    showSpinner: false
                                };
                                //get moi announcment by integration
                                apiHelperService.get('announcement/moi/get', moiOptions);
                            }
                        },
                        showSpinner: false,
                        params: angular.extend({ announcementType: lookups.AnnouncementTypes.announcement })
                    };
                    //get echannels announcment
                    apiHelperService.get('announcement/getActive', options);
                })();
            }

            function checkPreview() {
            //the below applications is the only application we would show into
                var user = authManager.getCurrentUser();
                if (user === null) return false;

                if (user.applicationId === lookups.application.establishment ||
                    user.applicationId === lookups.application.resident ||
                    user.applicationId === lookups.application.citizen ||
                    user.applicationId === lookups.application.TypingCenter ||
                    user.applicationId === lookups.application.VisaHolder ||
                    user.applicationId === lookups.application.gcc ||
                    user.applicationId === lookups.application.gcc_citizen ||
                    user.applicationId === lookups.application.DubaiResident) {
                    return true;
                }
                return false;
            }

            convertTextToImage = function (arrAnnouncment) {
                //convert  text to image (svg image)
                var arrImages = [];
                for (var i = 0; i < arrAnnouncment.length; i++) {
                    //i should replace also the special character with it escape sequence
                    let txt = arrAnnouncment[i].announcementLanguage.announcementDescription.replace(/&nbsp;/g, " ");
                    //for your refererence use https://www.w3schools.com/charsets/ref_html_entities_r.asp
                    txt = txt.replace(/&eacute;/g, "é");
                    txt = txt.replace(/&rsquo;/g, "’");
                    txt = txt.replace(/&rdquo;/g, "”");
                    txt = txt.replace(/&ldquo;/g, "“");
                    var data = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
                        <foreignObject width='100%' height='100%'>
                        <div xmlns='http://www.w3.org/1999/xhtml' style='font-size:20px'>
                      ${txt}
                        </div>
                        </foreignObject>
                        </svg>`;
                    var DOMURL = self.URL || self.webkitURL || self;
                    var svg = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
                    var url = DOMURL.createObjectURL(svg);
                    arrImages.push(url);
                }
                return arrImages;
            }

            var timestamp = function (date) {
                //to return hour ago or slimier date
                var timeIndex = 0;
                var shifts = [35, 60, 60 * 3, 60 * 60 * 2, 60 * 60 * 25, 60 * 60 * 24 * 4, 60 * 60 * 24 * 10];
                var now = new Date(date);
                var shift = shifts[timeIndex++] || 0;
                var date = new Date(now - shift * 1000);
                return date.getTime() / 1000;
            };

            loadStory = function (arrAnnouncment) {
                let _storie = [];
                //based on current language 
                let buttonTxt = $translate.instant('ReadDetails');
                //set story interval
                interval = window.config.storyInterval;
                for (var i = 0; i < arrAnnouncment.length; i++) {
                    let obj = {
                        id: arrAnnouncment[i].id,
                        photo: arrAnnouncment[i].imageUrl,
                        name: arrAnnouncment[i].title,
                        link: arrAnnouncment[i].externalLink ? arrAnnouncment[i].externalLink : window.config.host + 'individual/index.html#/announcementsView?announcementId=' + arrAnnouncment[i].id,
                        lastUpdated: arrAnnouncment[i].modificationDate,
                        items: [
                            Zuck.buildItem(arrAnnouncment[i].id,
                                "photo",
                                interval,
                                arrAnnouncment[i].imageUrl,
                                arrAnnouncment[i].imageUrl,
                                arrAnnouncment[i].externalLink ? arrAnnouncment[i].externalLink : window.config.host + 'individual/index.html#/announcementsView?announcementId=' + arrAnnouncment[i].id,
                                buttonTxt,
                                false,
                                timestamp(arrAnnouncment[i].modificationDate)
                            )
                        ]
                    };
                    //finish filling story 
                    _storie.push(obj);
                }
                //to be called implicitly from library
                var stories = new Zuck(document.getElementById('stories'), {
                    backNative: false,
                    previousTap: true,
                    skin: 'Snapgram',//we could change the theme
                    avatars: false,
                    autoFullScreen: false,
                    openEffect: false,
                    cubeEffect: true,
                    localStorage: true,
                    rtl: true,
                    backButton: true,
                    stories: _storie
                })
            }
        });
        */

        (initialization = () => {
            $scope.cannotDeactivateAccountMSG = null;
            $scope.cannotDeactivateAccountPopUp = false;

        })();

        deactivate = () => {

            var options = {
                success: function (response) {
                    if (response) {
                        if (response.isSuccess) {
                            var options = {
                                duration: 15000, type: "success", isSticky: false,
                                messageBody: $translate.instant("deactivatedSuccessfully"),
                                titleKey: "",
                                localizationControllers: ['notification', 'validation']
                            };
                            notificationsService.showNotification(options);
                            setTimeout(() => {
                                $scope.isGust = true;
                                sessionStorage.clear();
                                authManager.logout();
                            }, 3000);
                        }
                    }
                },
            };

            apiHelperService.get('userProfile/deactivateAccount', options);

        }

        $scope.readNotification = function (notification) {
            $location.path('/notification');
        };

        $scope.isMofaGuest = function () {
            if (!authManager.userHasPermission(['EMBASSY_REQUEST_CREATOR']) &&
                !authManager.userHasPermission(['EMBASSY_REQUEST_SUBMITTER']) &&
                !authManager.userHasPermission(['EMBASSY_ADMIN']) &&
                !authManager.userHasPermission(['MOFA_ADMIN']) &&
                !authManager.userHasPermission(['MOFA_PROTOCOL_ADMIN'])) {
                return true;
            }
            else
                return false;
        };

        $scope.isMofaCreator = function () {
            if (!authManager.userHasPermission(['EMBASSY_REQUEST_SUBMITTER']) &&
                !authManager.userHasPermission(['EMBASSY_ADMIN']) &&
                !authManager.userHasPermission(['MOFA_ADMIN']) &&
                !authManager.userHasPermission(['MOFA_PROTOCOL_ADMIN'])) {
                return true;
            }
            else
                return false;
        };


        $scope.isMofaCreatorHasDiplomaticCardsPermission = function () {
            if (authManager.userHasPermission(['DIPLOMATIC_CARDS_SERVICES'])) {
                return true;
            }
            else
                return false;
        };

        $scope.isMofaRequestsWaitingForMOFAAuthorization = function () {
            if (authManager.userHasPermission(['ECH_MOFA_REQUESTS_WAITING_FOR_MOFA_AUTHORIZATION'])) {
                return true;
            }
            else
                return false;
        };

        //Not used
        $scope.isMofaSubmitter = function () {
            if (authManager.userHasPermission(['EMBASSY_REQUEST_SUBMITTER'])) {
                return true;
            }
            else
                return false;
        };

        $scope.isMofaOrEmbassyAdmin = function () {
            if (authManager.userHasPermission(['EMBASSY_ADMIN']) || authManager.userHasPermission(['MOFA_ADMIN']) || authManager.userHasPermission(['MOFA_PROTOCOL_ADMIN'])) {
                return true;
            }
            else
                return false;
        };


        function init() {

            $scope.isArabicLang = localStorage.currentLanguage == "ar";
            var user = authManager.getCurrentUser();
            if (user != null) {

                if (user.applicationId == lookups.application.establishment || user.applicationId == lookups.icaEstablishmentsApplicationId) {
                    $scope.showEstablishmentProfile = true;
                } else {

                    $scope.showEstablishmentProfile = false;
                }

                if (user.applicationId == lookups.application.establishment)
                {
                    $scope.showEstablishmentChangeUserName = true;
                }
                else
                {
                    $scope.showEstablishmentChangeUserName = false;
                }

                if (user.applicationId == lookups.application.resident || user.applicationId == lookups.application.citizen || user.applicationId == lookups.application.gcc || user.applicationId == lookups.application.gcc_citizen || user.applicationId == lookups.application.residencyCancelled || user.applicationId == lookups.application.gccNoIdentity || user.applicationId == lookups.application.visaHolder || user.applicationId == lookups.application.familyMemberResidencyHolder || user.applicationId == lookups.application.dubaiResident) {
                    if ((user.applicationId == lookups.application.gcc || user.applicationId == lookups.application.gcc_citizen)
                        && !user.identityNumber) {
                        $scope.showIndividualProfile = false;
                    }
                    else
                        $scope.showIndividualProfile = true;
                }
                else {
                    $scope.showIndividualProfile = false;
                }

                if (user.applicationId == lookups.application.resident || user.applicationId == lookups.application.citizen || user.applicationId == lookups.application.gcc || user.applicationId == lookups.application.gcc_citizen || user.applicationId == lookups.application.residencyCancelled || user.applicationId == lookups.application.gccNoIdentity || user.applicationId == lookups.application.visaHolder || user.applicationId == lookups.application.familyMemberResidencyHolder || user.applicationId == lookups.application.indianHoldAmericanGreenCard || user.applicationId == lookups.application.dubaiResident || user.applicationId == lookups.application.establishment || user.applicationId == lookups.application.TypingCenter) {
                    $scope.showUserPrefernces = true;
                } else {
                    $scope.showUserPrefernces = false;
                }



                if (user.applicationId == lookups.application.resident ||
                    user.applicationId == lookups.application.citizen ||
                    user.applicationId == lookups.application.gcc ||
                    user.applicationId == lookups.application.gcc_citizen ||
                    user.applicationId == lookups.application.visaHolder ||
                    user.applicationId == lookups.application.dubaiResident ||
                    user.applicationId == lookups.application.residencyCancelled ||
                    user.applicationId == lookups.application.establishment ||
                    user.applicationId == lookups.application.TypingCenter) {
                    $scope.showNotificationIcon = true;

                } else {
                    $scope.showNotificationIcon = false;
                }
                if (user.applicationId == lookups.application.resident ||
                    user.applicationId == lookups.application.citizen ||
                    user.applicationId == lookups.application.visaHolder ||
                    user.applicationId == lookups.application.dubaiResident ||
                    user.applicationId == lookups.application.residencyCancelled ||
                    user.applicationId == lookups.application.FamilyMemberResidencyHolder||
                    user.applicationId == lookups.application.gcc_citizen) {
                    $scope.showIndividualsFullName = true;

                } else {
                    $scope.showIndividualsFullName = false;
                }
                $scope.enableUserAddressesLink = window.config.enableUserAddressesLink;

                if (user.applicationId == lookups.application.establishment ||
                    user.applicationId == lookups.application.TypingCenter ||
                    user.applicationId == lookups.application.admin ||
                    user.applicationId == lookups.application.mofa ||
                    user.applicationId == lookups.application.mofaProtocol ||
                    user.applicationId == lookups.application.etihad) {
                    $scope.showUserAddresses = false;
                } else {

                    $scope.showUserAddresses = true;
                }

                if (languageService.getCurrent() == 'ar') {
                    var arabicFamilyName = '';
                    if (user.arabicFamilyName != null)
                        arabicFamilyName = user.arabicFamilyName;
                    if (user && user.userClaims && $scope.showIndividualsFullName)
                        var ArabicFullName = user.userClaims?.find(x => x.key == 'UdbArabicFullName')?.values[0];
                    if (ArabicFullName != null) {
                        $scope.UserName = ArabicFullName;
                    }
                    else {
                        $scope.UserName = user.arabicFirstName + ' ' + arabicFamilyName;
                    }
                }
                else {
                    var englishFamilyName = '';
                    if (user.englishFamilyName != null)
                        englishFamilyName = user.englishFamilyName;
                    if (user && user.userClaims && $scope.showIndividualsFullName)
                        var EnglishFullName = user.userClaims?.find(x => x.key == 'UdbEnglishFullName')?.values[0];
                    if (EnglishFullName != null) {
                        $scope.UserName = EnglishFullName;
                    }
                    else {
                        $scope.UserName = user.englishFirstName + ' ' + englishFamilyName;
                    }
                }

                //$scope.getShortName = function (fullName) {
                //    if (!fullName) return '';            
                //    var parts = ('' + fullName).trim().split(/\s+/).filter(Boolean);                
                //    if (parts.length <= 2) return parts.join(' ');           
                //    return parts.slice(0, 2).join(' ') + '...';
                //};
                $scope.getShortName = function (fullName) {
                    if (!fullName) return '';

                    // 1) normalize spaces
                    var raw = ('' + fullName).trim().replace(/\s+/g, ' ');
                    if (!raw) return '';

                    // 2) split into words
                    var words = raw.split(' ');

                    // 3) rules: words that should "stick" with the next/previous word
                    // - joinNext: if this word appears, join it with the NEXT word (e.g., عبد + الرحمن => "عبد الرحمن")
                    // - joinPrev: if this word appears, join it with the PREVIOUS token (e.g., آل + نهيان => "آل نهيان" as one token)
                    var joinNext = new Set([
                        'عبد', 'عبـد', 'ابو', 'أبو', 'ام', 'أم', // common Arabic compounds
                        'Al', 'AL', 'al' // common English "Al" when it's separate
                    ]);

                    var joinPrev = new Set([
                        'بن', 'ابن', 'بنت', // connectors
                        'آل', 'ال',        // family/article patterns (optional)
                        'b.', 'bin', 'ibn'  // latin variants
                    ]);

                    // 4) build tokens (logical "parts")
                    var tokens = [];
                    for (var i = 0; i < words.length; i++) {
                        var w = words[i];

                        // Case A: word should join with NEXT word as a single token
                        if (joinNext.has(w) && i + 1 < words.length) {
                            tokens.push(w + ' ' + words[i + 1]);
                            i++; // skip next
                            continue;
                        }

                        // Case B: word should join with PREVIOUS token
                        if (joinPrev.has(w)) {
                            // if there's a previous token and a next word, merge them: "<prev> بن <next>"
                            if (tokens.length > 0 && i + 1 < words.length) {
                                tokens[tokens.length - 1] = tokens[tokens.length - 1] + ' ' + w + ' ' + words[i + 1];
                                i++; // skip next
                                continue;
                            }
                            // if no previous token, just treat it normal
                        }

                        // Default: standalone token
                        tokens.push(w);
                    }

                    // 5) return first 2 tokens + ...
                    if (tokens.length <= 2) return tokens.join(' ');
                    return tokens.slice(0, 2).join(' ') + '...';
                };
                // Allow applications list which the two step verification and logged in history tab is appear.
                var allowApplications = [lookups.application.establishment, lookups.application.TypingCenter,
                lookups.application.resident, lookups.application.citizen, lookups.application.gcc,
                lookups.application.gcc_citizen, lookups.application.gccNoIdentity, lookups.application.visaHolder,
                lookups.application.dubaiResident, lookups.application.familyMemberResidencyHolder, lookups.application.residencyCancelled];

                /* Check if logged in user appliaction is one of (1,2,3,5,6,7,8,13,14,18,21)
                 * then show the two step verification and logged in histroy in profile user drop down list.
                 */
                $scope.showTwoStepVerificationAndLoggedInHistory = false;
                if (allowApplications.includes(user.applicationId)) {
                    $scope.showTwoStepVerificationAndLoggedInHistory = window.config.enableLoggedInHistory || window.config.enableSecondStepVerficationUsingAuthenticatorApp;
                }

                if (user.applicationId == lookups.application.resident || user.applicationId == lookups.application.citizen ||
                    user.applicationId == lookups.application.gcc || user.applicationId == lookups.application.gcc_citizen ||
                    user.applicationId == lookups.application.visaHolder || user.applicationId == lookups.application.dubaiResident ||
                    user.applicationId == lookups.application.residencyCancelled || user.applicationId == lookups.application.establishment ||
                    user.applicationId == lookups.application.gccNoIdentity || user.applicationId == lookups.application.familyMemberResidencyHolder) {
                    $scope.showYourAccount = true;

                } else {
                    $scope.showYourAccount = false;
                }
            }
        }

        $scope.logout = function () {
            $scope.isGust = true;
            sessionStorage.clear();
            authManager.logout();

        };

        $scope.goToProfile = function () {
            var user = authManager.getCurrentUser();
            $location.path('/profile');

        };

        $scope.goToDiplomaticCards = function () {
            $state.go("diplomaticCards");
        };

        $scope.goToEstablishmentProfile = function () {
            var user = authManager.getCurrentUser();
            $state.go("establishmentMainInformation", { "childEstablishmentId": null });

        };
        $scope.goToTarget = function (targetUri) {
            $state.go(targetUri);

        };


        $scope.deactivateAccount = () => {

            var options =
            {
                success: function (response) {

                    $scope.requestsCollection = response.collection.filter(r => r.action.id != lookups.requestActions.approved
                        && r.action.id != lookups.requestActions.REJECTED
                        && r.action.id != lookups.requestActions.REJECTED_TO_RECEIVE);

                    if ($scope.requestsCollection.length <= 0) {

                        window.showConfirm({
                            title: $translate.instant("confirmation"), body: $translate.instant("deactivateAccountMessage")
                        }, function (operation) {
                            if (operation) {
                                deactivate();
                            }
                        });
                    } else {
                        window.showWarningMessage({
                            title: $translate.instant("warning"), body: $translate.instant("cannotDeactivate")
                        }, function (operation) {
                            if (operation) {
                                $state.go('requests');
                            }
                        });
                    }

                },
                showSpinner: true
            };

            var searchCriteria = angular.extend({
                pageSize: 10,
                currentPage: 1,
                loadLookupDataFromCache: false

            });
            apiHelperService.post('individual/request/search', searchCriteria, options);
        };

        //$scope.getNotification = function getNotification() {

        //    var fromDate = new Date();
        //    var toDate = new Date();


        //    var start = 0;
        //    var pageSize = 1;
        //    var pageNumber = 1;


        //    var options = {
        //        success: function (response) {
        //            $scope.userNotificationCount = response.numberOfRecords;
        //        },
        //        showSpinner: true,
        //        params: angular.extend({ pageSize: pageSize, pageNumber: pageNumber, fromDate: fromDate, toDate: toDate })
        //    };
        //    apiHelperService.get('notification/user/search', options);
        //};

        $scope.notificationCollection = [];
        $scope.notificationCollectionTemp = [];
        $scope.showContent = false;
        $scope.notificationTypeId = 0;
        var pageSize = 5;
        $scope.goToSystemNotification = function (notificationTypeId, load) {
            $scope.notificationTypeId = notificationTypeId;
            pageSize = load ? pageSize + 5 : 5;
            var pageNumber = 1;

            var options = {
                success: function (response) {
                    if (response.collection.length > 0) {
                        $scope.notificationCollection = response.collection;
                    }
                    $scope.showLoadingBtn = $scope.notificationCollection.length > 0 ? true : false;
                },
                showSpinner: true,
                params: angular.extend({ fromDate: 1, toDate: 1, pageNumber: pageNumber, pageSize: pageSize })
            };
            apiHelperService.get('notification/user/search', options);
        };

        $scope.loadMoreNotification = function (e) {
            e?.stopImmediatePropagation();
            $scope.goToSystemNotification($scope.notificationTypeId, true);
        }
        $scope.checknotificationBtn = function (ele) {
            return ele.params.split('"informativeFlag":true')[1] != undefined || ele.params.split('informativeFlag:True')[1] != undefined;
        }
        $scope.showNotificationDetailsDialog = function (ele) {
            $scope.showContent = true;
            $scope.notificationBody = $sce.trustAsHtml(JSON.parse(ele.params).Content);
        }
        $scope.showNotificationDetails = function (ele) {
            $scope.request = JSON.parse(ele.params).refnum;
            $state.go('requests', { requestNumber: $scope.request });
        }
        $scope.closeModal = function () {
            $scope.showContent = false;
        }
        init();

        $scope.isMohreService = function () {
            if (lookups.mohreWorkPackageServiceIds.includes(parseInt($stateParams.serviceTransactionId)))
                return true;
            else return false;
        }
        if ($scope.isUAEPASSUser == true || authManager.isUAEPASSLogin()) {
            $scope.hideChangePassword = true;
        }
    }]);
angular.module('textSizeSlider', [])
    .directive('textSizeSlider', ['$document', function ($document) {
        return {
            restrict: 'E',
            template: '<div class="text-size-slider"><span class="small-letter" ng-style="{ fontSize: min + unit }">A</span> <input type="range" min="{{ min }}" max="{{ max }}" step="{{ step || 0 }}" ng-model="textSize" class="slider" value="{{ value }}" /> <span class="big-letter" ng-style="{ fontSize: max + unit }">A</span></div>',
            scope: {
                min: '@',
                max: '@',
                unit: '@',
                value: '@',
                step: '@'
            },
            link: function (scope, element, attr) {
                scope.textSize = scope.value;
                scope.$watch('textSize', function (size) {
                    $document[0].body.style.fontSize = size + scope.unit;
                });
            }
        }
    }]);