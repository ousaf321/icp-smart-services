angular.module('mainApp').service('cookieStorage', function () {
    this.set = function (key, value) {
        document.cookie = key + "=" + value + "; path=/"
    };

    this.get = function (key) {
        var nameEQ = key + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    this.remove = function (key) {
        document.cookie = key + '=; Max-Age=-99999999; path=/';
    }
})

angular.module('mainApp').controller('loginCtrl', ["$scope", "$rootScope", "apiHelperService", "authManager", "$location", "$translate", "vcRecaptchaService", "notificationsService", '$cookies', 'signalR', '$interval', '$sce', '$q', 'lookupService', '$stateParams', 'ValidationService',
    function ($scope, $rootScope, apiHelperService, authManager, $location, $translate, vcRecaptchaService, notificationsService, $cookies, signalR, $interval, $sce, $q, lookupService, $stateParams, ValidationService, cookieStorage) {
        localStorage.removeItem('CURRENT_PORTAL');
        localStorage.setItem('CURRENT_PORTAL', 'ICA');
        var dismiss = 'dismiss_' + localStorage.getItem('userName');
        localStorage.removeItem(dismiss);
        $scope.user = {};
        $scope.uaePassLoginUri = window.config.uaePassLoginURL;
        $scope.enableEncryptedLogin = window.config.enableEncryptedLogin;
        $scope.isNewLoginVisible = true;
        $scope.showloginForm = true;
        $scope.forgetPasswordModalVisible = false;
        $scope.user.userName = '';
        $scope.emailSuggestions = [];
        $scope.enableEmailAutoComplete = window.config.enableEmailAutoComplete;
        $scope.changePassword = { userName: '', recaptchaResponse: '' };
        $scope.showModernSignInForm = false;
        $scope.ShowBrowser = true;
        $scope.showDateOfbirthEidaNumber = false;
        //Omar: in case there is a need for login tour
        // var tour = new Tour({
        //     Storage: cookieStorage,
        //     steps: [
        //         {
        //             element: "#myElement",
        //             title: "Title of my step",
        //             content: "Content of my step",
        //             onNext: function (tour) {
        //                 document.getElementById('myElement').click();
        //             }
        //         },
        //         {
        //             element: "#my-other-element",
        //             title: "Title of my step",
        //             content: "Content of my step"
        //         }
        //     ]
        // });

        // tour.init();

        // $scope.startTour = function () {
        //     tour.restart();
        // }

        // tour.onEnd = function () {
        //     cookieStorage.remove(tour._options.name || 'default');
        // }

        $scope.openDateOfBirthPopup = function () {
            $scope.dateOfBirthPopup.opened = true;
        };
        $scope.dateOfBirthPopup = {
            opened: false
        };
        $scope.openDateOfBirthPopup = function () { $scope.dateOfBirth.opened = true; };
        $scope.dateOfBirth = { opened: false };

        var date = new Date();
        date.setDate(date.getDate());
        $scope.maxDateOfBirth = date;

        $scope.openForgotPasswordModal = function () {
            $scope.forgetPasswordModalVisible = true
        }

        $scope.selectSuggestion = function (suggestion) {
            $scope.user.userName = suggestion;
            $scope.emailSuggestions = [];
        };
        if ($stateParams.system && $stateParams.system == "workBundle") {
            $scope.isFromWorkInUAE = true
            $scope.enableIndividualRegistration = false;
            $scope.enableTcRegistration = false;
            $scope.enableEstablishmentRegistration = false;
        }
        //#region accepAllCookies Banner
        (accepAllCookies = () => {
            $scope.cookieAccepted = $cookies.get('cookieAccepted') != undefined ? $cookies.get('cookieAccepted') : localStorage.getItem('cookieAccepted');
            console.log($scope.cookieAccepted);
        })();

        (generate = () => {
            if (!$cookies.get('fp')) {
                const fpPromise = FingerprintJS.load();
                // Get the visitor identifier when you need it.
                fpPromise
                    .then(fp => fp.get())
                    .then(result => {
                        // This is the visitor identifier:
                        let visitorId = result?.visitorId
                        if (!visitorId) {
                            visitorId = longGuid();
                        }

                        var now = new Date();
                        var exp = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
                        $cookies.put('fp', visitorId, { 'expires': exp, 'path': '/' });
                    });
            }
        })();

        $scope.acceptAll = function () {
            var now = new Date();
            // this will set the expiration to 12 months
            var exp = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
            $cookies.put('cookieAccepted', true, { 'expires': exp, 'path': '/' });
            localStorage.setItem('cookieAccepted', true);
            $scope.cookieAccepted = true;
            $scope.ShowBrowser = false;
        };
        //#endregion accepAllCookies Banner
        
        //#region Browser Compatibility Banner
        (function checkBrowserCompatibility()
        {
            var ua = navigator.userAgent;
            function isChrome()
            {
               return ua.includes("Chrome/") && !ua.includes("Edg/") && !ua.includes("OPR/");
            }
            function isEdge()
            {
               return ua.includes("Edg/");
            }
            function isBrave()
            {
               return !!navigator.brave;
            }
            var bannerClosed = $cookies.get('browserBannerClosed') || localStorage.getItem('browserBannerClosed');
            $scope.browserCompatible = ((isChrome() || isEdge()) && !isBrave())|| !!bannerClosed;
        })();
        $scope.dismissBrowserBanner = function () {
            var now = new Date();
            var exp = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
            $cookies.put('browserBannerClosed', true, { 'expires': exp, 'path': '/' });
            localStorage.setItem('browserBannerClosed', true);
            $scope.browserCompatible = true;
        };
        //#endregion



        //#region personalizedExperience
        $scope.enablePersonalizedExperience = window.config.enablePersonalizedExperience;
        $scope.showpersonalizedExperiencePopup = false;
        $scope.showPersonalizedExperienceFloatingBtn = false;

        $scope.toggleLoginForm = function () {
            $scope.showloginForm = !$scope.showloginForm;
        }

        function getUserCountryByGeolocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    let lat = position.coords.latitude;
                    let lng = position.coords.longitude;

                    let url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            if (data) {
                                if (data.address) {
                                    if (data.address.country_code) {
                                        //if we have a value we will save the user Country in local Storage and check country
                                        let countryShortName = data.address.country_code;
                                        setUserCountryInLocalStorage(countryShortName);
                                        checkCountry(countryShortName);
                                    }
                                }
                            }
                        });
                });
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        }

        function setUserCountryInLocalStorage(countryShortName) {
            let userCountryObj = {
                countryShortName: countryShortName,
                setDate: new Date()
            }
            localStorage.setItem('userCountry', JSON.stringify(userCountryObj));
        }

        function getUserCountry() {
            //if we have the user country in local storage
            //we will check the date if less than twenty four hours from set date we will get the same value
            //else we will get the user country By Geolocation
            let userCountryObj = JSON.parse(localStorage.getItem('userCountry'));
            if (userCountryObj) {
                // if the user country last value in UAE we will not check it again
                if (userCountryObj.countryShortName.toLowerCase() != 'ae') {
                    let setDate = new Date(userCountryObj.setDate);
                    let twentyFourHoursFromSetDate = new Date(setDate.setHours(setDate.getHours() + 24));
                    let currentDate = new Date();

                    if (twentyFourHoursFromSetDate > currentDate) {
                        checkCountry(userCountryObj.countryShortName);
                    } else {
                        getUserCountryByGeolocation();
                    }
                }
            } else {
                getUserCountryByGeolocation();
            }
        }

        function checkCountry(value) {
            // if the user out side the UAE we will check if the user select value before and show popup if not
            //else just make sure the popup will not show 
            if (value && value.toLowerCase() != 'ae') {
                if ($scope.enablePersonalizedExperience == true) {
                    let personalizedExperience = localStorage.getItem('personalizedExperience');
                    if (personalizedExperience == null || personalizedExperience == undefined) {
                        $scope.showpersonalizedExperiencePopup = true;
                    } else {
                        if (JSON.parse(personalizedExperience) == true) {
                            window.location.href = window.config.host + 'guest/index.html#/personalizedExperience'
                        } else {
                            $scope.showPersonalizedExperienceFloatingBtn = true;
                        }
                    }
                }
            } else if (value && value.toLowerCase() == 'ae') {
                $scope.showPersonalizedExperienceFloatingBtn = false;
                $scope.showpersonalizedExperiencePopup = false;
            }
        };

        if ($scope.enablePersonalizedExperience == true) {
            getUserCountry();
        } else {
            $scope.showPersonalizedExperienceFloatingBtn = false;
            $scope.showpersonalizedExperiencePopup = false;
        }

        $scope.personalizedExperience = (selectedValue) => {
            $scope.showpersonalizedExperiencePopup = false;
            localStorage.setItem('personalizedExperience', selectedValue);
            if (selectedValue == true) {
                window.location.href = window.config.host + 'guest/index.html#/personalizedExperience'
            } else {
                $scope.showPersonalizedExperienceFloatingBtn = true;
            }
        }

        //#endRegion personalizedExperience 

        $scope.icaTypingCenterRegistrationFlag = true;
        $scope.showRSATokenBox = false;
        function showsImportantInstructions() {
            window.LoginShowAlert({ title: $translate.instant("warning"), body: $translate.instant("systemMessage_login_warning") }, function () {
            });
        }

        if (window.config.enableWarningLoginMessage)
            showsImportantInstructions();

        $scope.enableSmartPassLogin = window.config.enableSmartPassLogin;
        $scope.enableUAEPassLogin = window.config.enableUAEPassLogin;
        $scope.uaePassLoginURL = window.config.uaePassLoginURL;
        $scope.enableIndividualForgetUsername = window.config.enableIndividualForgetUsername;
        $scope.enableSecondStepVerfication = window.config.enableSecondStepVerfication;
        $scope.enableCrossLogin = window.config.enableCrossLogin;
        $rootScope.CurrentController(['login']);
        $scope.portalLanguage = localStorage.getItem('currentLanguage');

        if (window.location.href.indexOf("IDPSmartPassLogout") > -1) {
            localStorage.removeItem("user");
            localStorage.removeItem("smartPassstatus");
            localStorage.removeItem("smartpasssso");
            localStorage.removeItem("smartpassslo");
            localStorage.removeItem("smartPasssErroCode");
            localStorage.removeItem("smartPasssLanguage");
            window.location.replace(window.config.smartPasslogout);
        };

        if (localStorage.getItem('smartpasssso')) {
            if (localStorage.getItem('smartPassstatus') &&
                (localStorage.getItem('smartPassstatus') == "002" ||
                    localStorage.getItem('smartPassstatus') == "003" ||
                    localStorage.getItem('smartPassstatus') == "004")
            ) {

                var errorKey = localStorage.getItem('smartPassstatus');


                localStorage.removeItem('smartpasssso');
                localStorage.removeItem('smartPassstatus');
                localStorage.removeItem('smartPasssErroCode');


                window.location.hash = "/smartPassNotification?key=" + errorKey;


            }
        }
        $scope.getActionCommentText = function (text) {
            return $sce.trustAsHtml(text);
        }
        //$scope.rememberMeClick = function (event) {
        //    $scope.rememberMe = false;
        //    if (event.target.checked) {
        //        $scope.rememberMe = true;
        //    }
        //}

        $scope.showEstablishmentChangeUsernameService = window.config.showEstablishmentChangeUsernameService;
        $scope.showTypingcenterChangeUsernameService = window.config.showTypingcenterChangeUsernameService;
        $scope.showTypingCenterRegistration = window.config.showTypingCenterRegistration;

        // Recaptcha config #start
        $scope.showCaptcha = window.config.enableRecaptchaOnLogin;
        $scope.enableRecaptcha = window.config.enableRecaptchaOnLogin;
        $scope.cloudFlareRecaptchaSitetKey = window.config.cloudFlareRecaptchaSitetKey;
        $scope.enableRSA = window.config.enableRSA;
        $scope.enableQuickSearch = window.config.enableQuickSearch;
        if (!localStorage.getItem('homepagetour')) {
            window.setTimeout(function () {
                $scope.tour.start();
                localStorage.setItem('homepagetour', false);
            }, 800);
        }

        if ($scope.currentPortal == "ICA") {
            if (localStorage.getItem('currentLanguage') == 'ar') {
                $scope.lang_path = 'ar';
            } else {
                $scope.lang_path = 'en';
            }
            window.setTimeout(function () {


                particlesJS('particles-js',

                    {
                        "particles": {
                            "number": {
                                "value": 80,
                                "density": {
                                    "enable": true,
                                    "value_area": 800
                                }
                            },
                            "color": {
                                "value": "#e0e2e4"
                            },
                            "shape": {
                                "type": "circle",
                                "stroke": {
                                    "width": 0,
                                    "color": "#000000"
                                },
                                "polygon": {
                                    "nb_sides": 5
                                },
                                "image": {
                                    "src": "img/github.svg",
                                    "width": 100,
                                    "height": 100
                                }
                            },
                            "opacity": {
                                "value": 0.5,
                                "random": false,
                                "anim": {
                                    "enable": false,
                                    "speed": 1,
                                    "opacity_min": 0.1,
                                    "sync": false
                                }
                            },
                            "size": {
                                "value": 5,
                                "random": true,
                                "anim": {
                                    "enable": false,
                                    "speed": 40,
                                    "size_min": 0.1,
                                    "sync": false
                                }
                            },
                            "line_linked": {
                                "enable": true,
                                "distance": 150,
                                "color": "#e0e2e4",
                                "opacity": 0.4,
                                "width": 1
                            },
                            "move": {
                                "enable": true,
                                "speed": 6,
                                "direction": "none",
                                "random": false,
                                "straight": false,
                                "out_mode": "out",
                                "attract": {
                                    "enable": false,
                                    "rotateX": 600,
                                    "rotateY": 1200
                                }
                            }
                        },
                        "interactivity": {
                            "detect_on": "canvas",
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "repulse"
                                },
                                "onclick": {
                                    "enable": true,
                                    "mode": "push"
                                },
                                "resize": true
                            },
                            "modes": {
                                "grab": {
                                    "distance": 400,
                                    "line_linked": {
                                        "opacity": 1
                                    }
                                },
                                "bubble": {
                                    "distance": 400,
                                    "size": 40,
                                    "duration": 2,
                                    "opacity": 8,
                                    "speed": 3
                                },
                                "repulse": {
                                    "distance": 200
                                },
                                "push": {
                                    "particles_nb": 4
                                },
                                "remove": {
                                    "particles_nb": 2
                                }
                            }
                        },
                        "retina_detect": true,
                        "config_demo": {
                            "hide_card": false,
                            "background_color": "#b61924",
                            "background_image": "",
                            "background_position": "50% 50%",
                            "background_repeat": "no-repeat",
                            "background_size": "cover"
                        }
                    }

                );



            }, 1500);
        }

        $scope.init = function () {
            setTimeout(function () {
                document.getElementById("landingServices").scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            }, 2000);
        };

        $scope.initialization = function () {

            lookupService.loadReCaptchaSetup(function (res) {
                $scope.enabledCloudFlareRecaptchaOnLogin = res.enabledCloudFlareRecaptchaOnLogin;

                //#region recaptcha

                if ($scope.enabledCloudFlareRecaptchaOnLogin) {

                    $scope.initializeTurnstileLogin = function () {
                        const intervalLogin = setInterval(function () {
                            if (typeof turnstile !== "undefined") {
                                clearInterval(intervalLogin);
                                turnstile.render('.cf-turnstile-login', {
                                    sitekey: $scope.cloudFlareRecaptchaSitetKey,
                                    theme: 'light',
                                    callback: function (token) {
                                        $scope.$apply(function () {
                                            $scope.user.recaptchaResponse = token;
                                        });
                                    }
                                });
                            }
                        }, 200); // check every 200ms until turnstile is ready
                    };

                    $scope.initializeTurnstileQuick = function () {
                        const interval = setInterval(function () {
                            if (typeof turnstile !== "undefined") {
                                clearInterval(interval);
                                turnstile.render('.cf-turnstile-quick', {
                                    sitekey: $scope.cloudFlareRecaptchaSitetKey,
                                    theme: 'light',
                                    callback: function (token) {
                                        $scope.$apply(function () {
                                            $scope.searchCriteria.recaptchaResponseQuick = token;
                                        });
                                    }
                                });
                            }
                        }, 200); // check every 200ms until turnstile is ready
                    };

                    $scope.initializeTurnstileLogin();
                    $scope.initializeTurnstileQuick();

                }

                if (!$scope.enabledCloudFlareRecaptchaOnLogin) {
                    $scope.setResponse = function (response) {
                        $scope.user.recaptchaResponse = response;
                    };

                    $scope.setWidgetId = function (widgetId) {
                        $scope.widgetId = widgetId;
                    };

                    $scope.cbExpiration = function () {
                        vcRecaptchaService.reload($scope.widgetId);
                        $scope.user.recaptchaResponse = null;
                    };

                    $scope.setResponseQuick = function (response) {
                        $scope.searchCriteria.recaptchaResponseQuick = response;
                    };

                    $scope.setWidgetIdQuick = function (widgetIdQuick) {
                        $scope.widgetIdQuick = widgetIdQuick;
                    };

                    $scope.cbExpirationQuick = function () {
                        vcRecaptchaService.reload($scope.widgetIdQuick);
                        $scope.searchCriteria.recaptchaResponseQuick = null;
                    };
                }

                //#endregion recaptcha
            });

            localStorage.removeItem('outerAdminRegion');
            localStorage.removeItem('outerServiceTransactionId');
            localStorage.removeItem('outerModuleId');

            checkIfFromIca();

            $scope.loginByEmail = true;
            $scope.loginByQrCode = false;
            $scope.distance = 0;

            $scope.searchCriteria = [];
            $scope.searchCriteria.recaptchaResponse = null;

            $scope.init();

        }
        $scope.initialization();

        $scope.loadLookup = function () {
            $q.all([
                lookupService.loadDeliveryCompanies(),
                lookupService.loadmodules()]).then(function (result) {
                    $scope.deliveryCompanies = result[0].data;
                });
        };
        $scope.loadLookup();

        $scope.getTotalNumberOfVisitors = function () {
            var options = {
                success: function (response) {
                    $rootScope.totalNumberOfVisitors = response;
                },
            };
            apiHelperService.get('landing/numberOfVisitors', options);
        }
        $scope.getTotalNumberOfVisitors();

        //#endregion

        $scope.establishmentErrorMessage = function () {
            var options = {
                type: "info", duration: 5000, messageBody: $translate.instant('establishmentErrorMessage'), titleBody: ""
            };
            notificationsService.showNotification(options);
        };


        $scope.login = function () {

            if ($cookies.get('fp') == undefined)
                return;

            if ($scope.user.password && $scope.user.userName) {
                // ckeck if Recaptcha Version 2 is enabled and check if the user check the box and call login method
                //else just call login method
                if ($scope.enableRecaptcha && !$scope.user.recaptchaResponse) {
                    var options = {
                        type: "error", duration: 5000, messageBody: $translate.instant('captchaNotProcessed'), titleBody: "", localizationControllers: ['notification', 'registration']
                    };
                    notificationsService.showNotification(options);
                    return;
                }

                $scope.loginCallBack();
            }
            else {
                if ($scope.showCaptcha) {
                    $scope.user.recaptchaResponse = null;
                    if (!$scope.enabledCloudFlareRecaptchaOnLogin) {
                        vcRecaptchaService.reload($scope.widgetId);
                    }
                    else
                        turnstile.reset('.cf-turnstile-login');
                }
            }
        };

        $scope.loginCallBack = () => {
            validateRememberMe();

            $scope.user.sendResetAuthenticatorApp = undefined;
            $scope.user.authenticatorAppCode = undefined;
            $scope.user.resetAuthenticatorAppCode = undefined;
            $scope.user.resendResetAuthenticatorApp = undefined;

            // check if encrypted login is enalbe else we will use normal login 
            if ($scope.enableEncryptedLogin) {
                $scope.encryptDataAndLogin();
            } else {
                $scope.loginByAuthManager();
            }
        }

        $scope.loginByAuthManager = (fromGetAccess) => {
            authManager.login($scope.user, function (error) {
                if (fromGetAccess) {
                    $scope.handleGetAccessFailure(error);
                } else {
                    $scope.handleLoginFailure(error);
                }
            });
        }

        $scope.handleLoginFailure = (error) => {

            if (error[0] != null &&
                error[0].data != null &&
                error[0].data.requireCaptcha == true) {
                $scope.showCaptcha = true;
            }
            if (error[0] && error[0].messageCode == "SECOND_STEP_VERIFICATION") {
                notificationsService.clear();
                CheckIfUserRequiedSecondStepVerefication(false);
            }
            else if (error[0] && error[0].messageCode == "AUTH_APP"
                && error[0].data && error[0].data.requireAuthApp == true) {
                notificationsService.clear();
                ShowAuthenticatorAppVereficationPopup();
            }
            else if (error[0] && error[0].messageCode != "BV_USER_NAME_OR_PASSWORD_IS_NOT_CORRECT"
                && error[0] && error[0].messageCode != "BV_USER_NAME_IS_NOT_REGISTERED"
                && error[0].messageCode != "ACCOUNT_LOGIN_FAILED"
                && error[0].messageCode != "ACCOUNT_LOCKED"
                && error[0].messageCode != "INVALID_USER_CREDENTIALS") {
                notificationsService.clear();
                checkIfUserRequiredRsaToken($scope.user.userName, function (requiredToken) {
                    if (requiredToken) {
                        window.showRSAAuthenticationForm({ title: $translate.instant('RSAAuthenticationTitle'), body: $translate.instant('rsaLoginNote') }, function (operation) {
                            if (operation) {
                                $scope.user.rsaPersonalPIN = operation.reasonTxt.pin;
                                $scope.user.rsaVerificationCode = operation.reasonTxt.code;
                                getAccess();
                            } else {
                                $scope.user = undefined;
                            }
                        });

                    }
                    else {
                        getAccess();
                    }
                });
            }

            $scope.user.recaptchaResponse = null;
            if (!$scope.enabledCloudFlareRecaptchaOnLogin)
                vcRecaptchaService.reload($scope.widgetId);
            else
                turnstile.reset('.cf-turnstile-login');
        }


        $scope.Register = function () {
            $location.path('/registration');
        }
        $scope.service1 = false;
        $scope.service2 = true;
        $scope.service3 = true;
        $scope.serversClick = function (index) {
            if (index == 1) {
                $scope.service1 = false;
                $scope.service2 = true;
                $scope.service3 = true;
            }
            else if (index == 2) {
                $scope.service2 = false;
                $scope.service1 = true;
                $scope.service3 = true;
            }
            else if (index == 3) {
                $scope.service3 = false;
                $scope.service2 = true;
                $scope.service1 = true;
            }
        }

        //#endregion
        function CheckIfUserRequiedSecondStepVerefication(showTimer) {
            $scope.CheckIfRequiredAuthAppCode(function (callBack) {
                //Check if the second step verfication is enabled in the config
                if ($scope.enableSecondStepVerfication || callBack) {
                    window.showSecondStepVerificationPopup({ title: $translate.instant('SecondStepVerificationTitle'), body: $translate.instant('EnterOTPLabel'), showTimer: showTimer }, function (operation) {
                        if (operation) {
                            if (operation.reasonTxt.resendOTP) {
                                $scope.user.ResendSecondStepVerificationOTP = operation.reasonTxt.resendOTP;
                                $scope.user.SecondStepVerificationOTP = undefined;
                            }
                            else {
                                $scope.user.SecondStepVerificationOTP = operation.reasonTxt.pin;
                                $scope.user.ResendSecondStepVerificationOTP = operation.reasonTxt.resendOTP;
                            }
                            getAccess();
                        } else {
                            $scope.user = {};
                        }
                    });
                }
            });
        }

        // Authenticator App Verefication
        function ShowAuthenticatorAppVereficationPopup() {
            $scope.CheckIfRequiredAuthAppCode(function (callBack) {
                //Check if the second step verfication is enabled in the config
                if ($scope.enableSecondStepVerfication || callBack) {
                    window.showSecondStepVerificationUsingAuthAppPopup({ title: $translate.instant('SecondStepVerificationTitle'), body: $translate.instant('enterAuthAppTOTPLabel') }, function (operation) {
                        if (operation) {
                            if (operation.reasonTxt.sendResetAuthenticatorApp) {
                                $scope.user.sendResetAuthenticatorApp = operation.reasonTxt.sendResetAuthenticatorApp;
                                $scope.user.authenticatorAppCode = undefined;
                                $scope.user.resetAuthenticatorAppCode = undefined;
                                $scope.user.resendResetAuthenticatorApp = undefined;
                            }
                            else {
                                $scope.user.authenticatorAppCode = operation.reasonTxt.authenticatorAppCode;
                                $scope.user.sendResetAuthenticatorApp = undefined;
                                $scope.user.resetAuthenticatorAppCode = undefined;
                                $scope.user.resendResetAuthenticatorApp = undefined;
                            }
                            getAccess();
                        } else {
                            $scope.user = {};
                        }
                    });
                }
            });
        }
        // Reset Authenticator App
        function showResetAuthenticatorAppPopup(mobileNumber) {
            //Check if the second step verfication is enabled in the config
            if ($scope.enableSecondStepVerfication) {
                window.resetAppAuthPopup({ title: $translate.instant('SecondStepVerificationTitle'), body: $translate.instant('EnterOTPLabel'), showTimer: true, mobileNumber: mobileNumber }, function (operation) {
                    if (operation) {
                        if (operation.reasonTxt.resendResetAuthenticatorApp) {
                            $scope.user.resendResetAuthenticatorApp = operation.reasonTxt.resendResetAuthenticatorApp;
                            $scope.user.resetAuthenticatorAppCode = undefined;
                            $scope.user.sendResetAuthenticatorApp = undefined;
                            $scope.user.authenticatorAppCode = undefined;
                        }
                        else {
                            $scope.user.resetAuthenticatorAppCode = operation.reasonTxt.resetAuthenticatorAppCode;
                            $scope.user.sendResetAuthenticatorApp = undefined;
                            $scope.user.authenticatorAppCode = undefined;
                            $scope.user.resendResetAuthenticatorApp = undefined;
                        }
                        getAccess();
                    } else {
                        $scope.user = {};
                    }
                });
            }
        }

        $scope.CheckIfRequiredAuthAppCode = function (callBack) {

            var options = {
                success: function (result) {
                    callBack(result);

                }, error: function () {
                    callBack(false);
                }
            };
            angular.extend(options, { params: { userName: $scope.user.userName } })
            apiHelperService.get('user/checkIfRequiredAuthAppCode', options);

        };

        function checkIfUserRequiredRsaToken(email, calback) {
            if ($scope.user.rsaPersonalPIN && $scope.user.rsaVerificationCode) {
                if (calback)
                    calback(false);
            } else {

                var options = {
                    success: function (response) {
                        if (calback)
                            calback(response);
                    }, error() {
                        if (calback)
                            calback(false);
                    },
                    showSpinner: true,
                    params: angular.extend({ email: email })
                };
                apiHelperService.get('user/RSAServices/requiredTokenForLogin', options);
            }
        };

        function getAccess() {
            if ($scope.enableEncryptedLogin) {
                $scope.encryptDataAndLogin(true);
            } else {
                $scope.loginByAuthManager(true);
            }
        }

        $scope.handleGetAccessFailure = (error) => {
            if (error[0] != null &&
                error[0].data != null &&
                error[0].data.requireCaptcha == true) {
                $scope.showCaptcha = true;
            }
            else if (error[0] && error[0].messageCode == "INVAILD_OTP") {
                $scope.user.SecondStepVerificationOTP = undefined;
                $scope.user.ResendSecondStepVerificationOTP = undefined;
                CheckIfUserRequiedSecondStepVerefication(false);
            }
            else if (error[0] && error[0].messageCode == "RESEND_SECOND_STEP_VERIFICATION") {
                $scope.user.SecondStepVerificationOTP = undefined;
                $scope.user.ResendSecondStepVerificationOTP = undefined;
                notificationsService.clear();
                var options = {
                    type: "success", duration: 5000, messageBody: $translate.instant('OTPSentBody'), titleBody: "", localizationControllers: ['notification', 'registration']
                };
                notificationsService.showNotification(options);
                CheckIfUserRequiedSecondStepVerefication(true);
            } else if (error[0] && error[0].messageCode == "AUTH_APP") {
                notificationsService.clear();
                $scope.user.sendResetAuthenticatorApp = undefined;
                $scope.user.authenticatorAppCode = undefined;
                $scope.user.resetAuthenticatorAppCode = undefined;
                $scope.user.resendResetAuthenticatorApp = undefined;
                if (error[0].data) {
                    //invalidAuthAppCode
                    if (error[0].data.invalidAuthAppCode == true) {
                        ShowAuthenticatorAppVereficationPopup();
                        var options = {
                            type: "warning", duration: 5000, messageBody: $translate.instant('invalidAuthAppCode'), titleBody: ""
                        };
                        notificationsService.showNotification(options);
                    }
                    //sendResetAuthenticatorApp
                    if (error[0].data.sendResetAuthenticatorApp == true) {
                        showResetAuthenticatorAppPopup(error[0].data.mobileNumber);
                        var options = {
                            type: "success", duration: 5000, messageBody: $translate.instant('otpSentSuccessfully'), titleBody: ""
                        };
                        notificationsService.showNotification(options);
                    }
                    //invalidResetCode
                    if (error[0].data.invalidResetCode == true) {
                        showResetAuthenticatorAppPopup(error[0].data.mobileNumber);
                        var options = {
                            type: "success", duration: 5000, messageBody: $translate.instant('invalidAuthAppCode'), titleBody: ""
                        };
                        notificationsService.showNotification(options);
                    }
                    //resendResetAuthenticatorApp
                    if (error[0].data.resendResetAuthenticatorApp == true) {
                        showResetAuthenticatorAppPopup(error[0].data.mobileNumber);
                        var options = {
                            type: "success", duration: 5000, messageBody: $translate.instant('resendOtpSentSuccessfully'), titleBody: ""
                        };
                        notificationsService.showNotification(options);
                    }
                }

            }

            $scope.user.recaptchaResponse = null;
            if (!$scope.enabledCloudFlareRecaptchaOnLogin)
                vcRecaptchaService.reload($scope.widgetId);
            else
                turnstile.reset('.cf-turnstile-login');
        }

        //Show/hide password
        $scope.showPassword = false;
        $scope.toggleShowPassword = function () {
            $scope.showPassword = !$scope.showPassword;
        };


        function checkIfFromIca() {
            if ($location.search().token) {
                let token = $location.search().token;
                authManager.logout();
                localStorage.removeItem('guestUser');
                localStorage.removeItem('user');
                var options = {
                    success: function (response) {
                        if (response != null)
                            authManager.successLogin(response);
                        else
                            window.history.pushState({}, document.title, removeURLParameter());
                    },
                    showSpinner: true
                };
                apiHelperService.post('user/loginByToken', token, options);
            }
        }

        function removeURLParameter() {
            let url = window.location.href;
            var urlparts = url.split('?');
            url = urlparts[0];
            return url;
        }

        function validateRememberMe() {

            //to retrieve it back in authManager on success login then clear it
            if ($scope.rememberMe == true) {
                localStorage.setItem('rememberMe', true);
                localStorage.setItem('userName', $scope.user.userName);
                localStorage.setItem('password', $scope.user.password);
            }
            else
                $cookies.put('rememberMeData', null);

        }
        function checkRememberMe() {
            //let _usr = {}
            //$scope.rememberMe = false;
            //let obj = $cookies.get('rememberMeData');
            //if (obj)
            //    _usr = JSON.parse(obj)
            //if (_usr?.userName != 'null' && _usr?.password != 'null') {
            //    $scope.user.userName = _usr?.userName;
            //    $scope.user.password = _usr?.password;
            //    $scope.rememberMe = true;
            //}
        }
        checkRememberMe();

        $scope.createQrCodeForLogin = (latitude, longitude) => {

            if ($scope.enableCrossLogin) {
                latitude = latitude ?? $scope.latitude;
                longitude = longitude ?? $scope.longitude;
                apiHelperService.get(`anonymous/generateCrossLoginQRCode?latitude=${latitude}&longitude=${longitude}`, {
                    success: function (response) {
                        $scope.image = response.base64QRCode;
                        let startDate = new Date();
                        let endDate = new Date(response.validUntil);
                        $scope.timer = (endDate.getTime() - startDate.getTime()) / 1000;
                        $scope.token = response.token;
                        console.log(endDate, "endDate");
                        showTimer(endDate);
                        _connect(response.token);
                        console.log(response.token);
                    },
                    error: function (error) { }
                });
            }
        };



        getTimeLeft = (timeout) => {
            if (timeout == 0)
                return 0;

            return (timeout - 1);
        }

        showTimer = (countDownDate) => {
            $scope.timer = $interval(function () {

                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                $scope.distance = countDownDate - now;
                $scope.distance = Math.floor(($scope.distance % (1000 * 60)) / 1000);
                // Time calculations for days, hours, minutes and seconds

                if ($scope.distance == undefined || $scope.distance < 0) {
                    $scope.showOverlay = true;
                    $interval.cancel($scope.timer);
                }
                else {
                    $scope.showOverlay = false;
                    $scope.distance = (getTimeLeft($scope.distance));
                }
            }, 1000);
        }

        _connect = (token) => {
            //to clear any data exist
            authManager.logout();

            signalR.setHubName("crossLoginHub");

            signalR.client(token).broadcastUser = function (user) {
                let usr = toCamel(user)
                //redirect to the user page
                authManager.successLogin(usr);
            };
            //send the request 
            signalR.start(function () {
                (onConnected = function () {
                    signalR.server().onConnected(token).then(() => {
                        //   callTestFunc(token);
                    });
                })();
            });
        }

        function toCamel(o) {
            var newO, origKey, newKey, value
            if (o instanceof Array) {
                return o.map(function (value) {
                    if (typeof value === "object") {
                        value = toCamel(value)
                    }
                    return value
                })
            } else {
                newO = {}
                for (origKey in o) {
                    if (o.hasOwnProperty(origKey)) {
                        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
                        value = o[origKey]
                        if (value instanceof Array || (value !== null && value.constructor === Object)) {
                            value = toCamel(value)
                        }
                        newO[newKey] = value
                    }
                }
            }
            return newO
        }

        $scope.setLoginType = (id) => {
            if (id) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        $scope.createQrCodeForLogin(position.coords.latitude, position.coords.longitude);
                        $scope.latitude = position.coords.latitude;
                        $scope.longitude = position.coords.latitude;
                        $scope.loginByEmail = false;
                        $scope.loginByQrCode = true;
                    }, (err) => {
                        $scope.createQrCodeForLogin("", "");
                        $scope.loginByEmail = false;
                        $scope.loginByQrCode = true;
                    });
                }
                else {
                    $scope.createQrCodeForLogin("", "");
                    $scope.loginByEmail = false;
                    $scope.loginByQrCode = true;
                }

            } else {
                $scope.loginByEmail = true;
                $scope.loginByQrCode = false;
            }
        };


        clearResult = () => {
            $scope.showHeaderResult = false;
            $scope.showNoDataFound = false;
            $scope.requestEntity = {};
            $scope.applicationHistory = [];
            $scope.showNoRec = false;
            $scope.RelatedRequests = null;
        };


        $scope.getCurrentRequest = () => {
            $scope.requestEntity = {};
            if ($scope.searchCriteria?.requestNumber?.length < 15) return;

            // ckeck if Recaptcha Version 2 is enabled and check if the user check the box and call login method
            //else just call login method
            if ($scope.enableRecaptcha && !$scope.searchCriteria.recaptchaResponseQuick) {
                var options = {
                    type: "error", duration: 5000, messageBody: $translate.instant('captchaNotProcessed'), titleBody: "", localizationControllers: ['notification', 'registration']
                };
                notificationsService.showNotification(options);
                return;
            }
            if ($scope.searchCriteria?.requestNumber.startsWith("784") && !$scope.searchCriteria.dateOfBirth) {
                var options = {
                    type: "error", duration: 5000, messageBody: $translate.instant('pleaseEnterDateOfBirth'), titleBody: ""
                };
                notificationsService.showNotification(options);
                return;
            }
            $scope.getCurrentRequestCallback();

        }

        $scope.getCurrentRequestCallback = () => {
            if ($scope.searchCriteria?.requestNumber.startsWith("800") ||
                $scope.searchCriteria?.requestNumber.startsWith("784") ||
                $scope.searchCriteria?.requestNumber.startsWith("01")) {
                var searchCriteria = angular.extend({
                    requestDraftNumber: $scope.searchCriteria.requestNumber,
                    requestType: 1,
                    dateOfbirth: $scope.searchCriteria?.requestNumber.startsWith("784") ? $scope.searchCriteria.dateOfBirth : null,
                    isValidCaptcha: true,
                    recaptchaResponse: $scope.searchCriteria.recaptchaResponseQuick
                });

                apiHelperService.postWithHeaderKey('landing/getRequestInfoQuickSearch', searchCriteria, {

                    success: function (response) {

                        $scope.showSearchResult = true;

                        if (response && response.requestDratftDto && (response.requestDratftDto.serviceTransId == 476 ||
                            response.requestDratftDto.serviceTransId == 478 ||
                            response.requestDratftDto.serviceTransId == 545 ||
                            response.requestDratftDto.serviceTransId == 479))
                            return;
                        $scope.requestEntity = response.requestDratftDto;

                        if (response && response.requestDratftDto?.requestNumber) {
                            $scope.showHeaderResult = true;
                            $scope.showNoDataFound = false;
                            $scope.applicationHistory = response.requestActions;
                            $scope.isApprove = $scope.applicationHistory.find(x => x.actionId == lookups.requestActions.approved);

                            if (response.appointmentsOutput.data && response.appointmentsOutput.data.items.length > 0) {
                                $scope.appointmentCollection = response.appointmentsOutput.data.items;
                                $scope.appointment = $scope.appointmentCollection[0];
                                $scope.hasAppointment = true;

                                $q.all([
                                    lookupService.loadAppointmentEmirateByAdminRegionId(null, null, $scope.appointment.administrativeRegionId),
                                    lookupService.loadServiceCenters(),
                                    lookupService.loadEmirates(),
                                    lookupService.loadAppointmentStatus(),
                                ]).then(function (result) {
                                    $rootScope.appointmentsEmirates = result[0].data;
                                    $scope.enrollmentCenters = result[1].data;
                                    $scope.emirates = result[2].data;
                                    $scope.appointmentsStatus = result[3].data;
                                });
                            }

                            /*vcRecaptchaService.reload($scope.widgetId);*/
                        }
                        else {
                            $scope.showHeaderResult = false;
                            $scope.showNoDataFound = true;
                        }

                        if (response && response.requestDratftDto?.serviceTransId == 162) {
                            var options = {
                                success: function (result) {
                                    if (!result) {
                                        $scope.showOption = false;
                                    }
                                    else
                                        $scope.showOption = true;
                                },
                                params: { userName: response.requestDratftDto.userName }
                            };
                            apiHelperService.get('user/checkIfNotFreeZone', options);
                        }

                        $scope.searchCriteria.recaptchaResponseQuick = null;
                        if (!$scope.enabledCloudFlareRecaptchaOnLogin)
                            vcRecaptchaService.reload($scope.widgetIdQuick);
                        else
                            turnstile.reset('.cf-turnstile-quick');

                    },
                    error: function (err) {
                        $scope.searchCriteria.recaptchaResponseQuick = null;
                        if (!$scope.enabledCloudFlareRecaptchaOnLogin)
                            vcRecaptchaService.reload($scope.widgetIdQuick);
                        else
                            turnstile.reset('.cf-turnstile-quick');
                    }

                }, { 'skipCaptcha': true });

            } else {
                notificationsService.showNotification({
                    type: "info", duration: 5000, messageBody: $translate.instant('checkNumber'), titleBody: ""
                });
            }
        }

        $scope.getAppointmentStatusText = function (appointmentStatusId) {
            if (appointmentStatusId) {
                if ($scope.appointmentsStatus) {
                    var appointmentStatus = ($scope.appointmentsStatus.filter(
                        function (appointmentStatus) {
                            if (appointmentStatus.id == appointmentStatusId)
                                return true;
                            return false;
                        }))[0];

                    if (appointmentStatus)
                        return appointmentStatus.text;
                }
            }
        };

        $scope.getEmirateText = function (emirateId) {
            if (emirateId) {
                if ($scope.emirates) {
                    var emirate = ($scope.emirates.filter(
                        function (emirate) {
                            if (emirate.id == emirateId)
                                return true;
                            return false;
                        }))[0];

                    if (emirate)
                        return emirate.text;
                }
            }
        };

        $scope.getServiceCenterText = function (serviceCenterId) {
            if (serviceCenterId) {
                if ($scope.enrollmentCenters) {
                    var serviceCenter = ($scope.enrollmentCenters.filter(
                        function (serviceCenter) {
                            if (serviceCenter.id == serviceCenterId)
                                return true;
                            return false;
                        }))[0];

                    if (serviceCenter)
                        return serviceCenter.text;
                }
            }
        };


        $scope.encryptDataAndLogin = (fromGetAccess) => {
            let options = {
                success: function (response) {

                    // if the response or publicKey is empty we will login without encryption
                    if (!response || !response.publicKey) {
                        $scope.loginByAuthManager(fromGetAccess);
                        return;
                    }

                    // deep clone $scope.user to $scope.encryptUser
                    $scope.encryptUser = angular.copy($scope.user);

                    //add encrption id to the request body
                    $scope.encryptUser.enc = response.id;

                    // impot the pulick key 
                    importPublicKey(response.publicKey).then((value) => {
                        let key = value;
                        // encrypt user name
                        encryptData($scope.encryptUser.userName, key).then((value) => {
                            // remove username value   
                            $scope.encryptUser.userName = undefined;

                            //set the encrypted username value to $scope.encryptUser.encUserName
                            let encryptedData = value;
                            let encodedData = arrayBufferToBase64(encryptedData);
                            $scope.encryptUser.encUserName = encodedData;

                            // encrypt password
                            encryptData($scope.encryptUser.password, key).then((value) => {
                                // remove password value 
                                $scope.encryptUser.password = undefined;

                                // set the encrypted password value to $scope.encryptUser.encPassword
                                let encryptedData = value;
                                let encodedData = arrayBufferToBase64(encryptedData);
                                $scope.encryptUser.encPassword = encodedData;

                                // call login
                                authManager.login($scope.encryptUser, function (error) {
                                    if (fromGetAccess) {
                                        $scope.handleGetAccessFailure(error);
                                    } else {
                                        $scope.handleLoginFailure(error);
                                    }
                                });
                            });
                        });
                    });
                },
            };
            apiHelperService.get('user/login/getPublicKey', options);
        }

        function base64ToArrayBuffer(base64) {
            var binary_string = window.atob(base64);
            var len = binary_string.length;
            var bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }

        function arrayBufferToBase64(buffer) {
            var binary = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        }

        function importPublicKey(spki) {
            const binaryDer = base64ToArrayBuffer(spki);
            var cryptoKey = crypto.subtle
                .importKey(
                    "spki",
                    binaryDer,
                    {
                        name: 'RSA-OAEP',
                        modulusLength: 256,
                        hash: { name: 'sha-256' }
                    },
                    false,
                    ["encrypt"]
                );
            return cryptoKey;
        }

        $scope.getDeliveryCompanyText = function (deliveryCompanyId) {
            if (deliveryCompanyId) {
                if ($scope.deliveryCompanies) {
                    var DeliveryCompany = ($scope.deliveryCompanies.filter(
                        function (DeliveryCompany) {
                            if (DeliveryCompany.id == deliveryCompanyId)
                                return true;
                            return false;
                        }))[0];
                    if (DeliveryCompany)
                        return DeliveryCompany.text;
                }
            }
        }
        function encryptData(message, cryptoKey) {
            let enc = new TextEncoder();
            let encodedMessage = enc.encode(message);
            var encryptedData = crypto.subtle.encrypt(
                {
                    name: "RSA-OAEP"
                },
                cryptoKey,
                encodedMessage
            );
            return encryptedData;
        }

        $scope.registrationHanlder = function (applicationId) {
            if ($scope.uaepassSingleSignOn) {
                let value = false;
                if ($scope.pilotSetup) {
                    if ($scope.pilotSetup.applicationsIds?.split(',').map(Number).indexOf(applicationId) > -1) {
                        value = true;
                    }
                }
                return value;
            }
            else {
                return true;
            }
        }
        $scope.individualRegistrationHanlder = function () {
            var individualApplication = [lookups.application.gcc, lookups.application.dubaiResident, lookups.application.resident, lookups.application.visaHolder, lookups.application.residencyCancelled,
                , lookups.application.citizen, lookups.application.gcc_citizen, lookups.application.familyMemberResidencyHolder];
            if ($scope.uaepassSingleSignOn) {
                let value = false;
                if ($scope.pilotSetup) {
                    var containsCommonValue = $scope.pilotSetup.applicationsIds?.split(',').map(Number).some(item => individualApplication.includes(item));
                    if (containsCommonValue) {
                        value = true;
                    }
                }
                return value;
            }
            else {
                return true;
            }
        }
        $scope.enableIndividualRegistration = false;
        $scope.enableTcRegistration = false;
        $scope.enableEstablishmentRegistration = false;
        function GetUaePassSetup() {
            var options = {
                success: function (response) {
                    if (response) {
                        handleUaepassSetup(response);
                    }
                    else {
                        $scope.uaepassSingleSignOn = false;
                    }
                },
            };
            apiHelperService.get('uaepass/setup', options);
        }
        $scope.validateEidaNumber = function () {
            if ($scope.searchCriteria?.requestNumber.startsWith("784") && $scope.searchCriteria?.requestNumber.length == 15) {
                $scope.showDateOfbirthEidaNumber = true;
            } else {
                $scope.showDateOfbirthEidaNumber = false;
                $scope.searchCriteria.dateOfBirth = undefined;
            }
        };
        function handleUaepassSetup(uaePassSetup) {
            if (uaePassSetup) {
                if (!uaePassSetup.enableUaePassSingleSignOn && !$scope.showModernSignInForm) {
                    $scope.uaepassSingleSignOn = false;
                    $scope.enableIndividualRegistration = true;
                    $scope.enableTcRegistration = true;
                    $scope.enableEstablishmentRegistration = true;
                }
                else if (uaePassSetup.enableUaePassSingleSignOn || $scope.showModernSignInForm) {
                    $scope.uaepassSingleSignOn = true;
                    if (uaePassSetup.isPilotMode) {
                        $scope.isPilotMode = true;
                        $scope.pilotSetup = uaePassSetup.pilotSetup;
                        if (!$scope.pilotSetup?.applicationsIds && !$scope.pilotSetup?.applicationsIds?.length > 0) {
                            $scope.hypredMode = true
                        }
                        $scope.enableIndividualRegistration = $scope.individualRegistrationHanlder();
                        $scope.enableTcRegistration = $scope.registrationHanlder(2);
                        $scope.enableEstablishmentRegistration = $scope.registrationHanlder(3);
                    }
                }
                $scope.enableLoginOptionLink = uaePassSetup.enableLoginOptionLink;
                if (uaePassSetup.enableLoginOptionLink) {
                    $scope.showloginForm = false;
                }
                else {
                    $scope.showloginForm = true;
                }
            }
            else {
                $scope.uaepassSingleSignOn = false;
            }
        }

        GetUaePassSetup();

        $scope.goToUaePass = function () {
            localStorage.removeItem('guestUser');
            localStorage.removeItem('user');
            location.href = $scope.uaePassLoginUri + $scope.portalLanguage
        }

        $scope.send = function () {
            $scope.changePassword.userName = $scope.user.userName;
            $scope.changePassword.recaptchaResponse = $scope.recaptchaResponse;
            if (new ValidationService().checkFormValidity($scope.forgotForm)) {
                authManager.forgotPassword($scope.changePassword, success);
            }
        }

        function success() {
            $scope.successFlag = true;
        }

    }]).directive('scroll', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
                //if (elem[0].scrollLeft >= 0) {
                //    document.querySelector('.right-scroll').classList.add('opacity-md');
                //}
            }
        }

        const longGuid = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

    });