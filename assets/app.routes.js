/// <reference path="establishment/pages/addEstablishmentChild/addEstablishmentChildCtrl.js" />
/// <reference path="establishment/pages/addEstablishmentChild/addEstablishmentChild.html" />
/// <reference path="pages/serviceCenter/serviceCenterManagementCtrl.js" />
/// <reference path="pages/example/tree/TreeViewer.html" />
/// <reference path="pages/eligibility/eligibilityCondition/eligibilityCondition.html" />
// -- Main page Config for routing
// ---------------------------------------------------
mainApp.config(['$compileProvider', '$ocLazyLoadProvider', '$stateProvider', '$urlRouterProvider',
    function ($compileProvider, $ocLazyLoadProvider, $stateProvider, $urlRouterProvider) {
        $ocLazyLoadProvider.config({
            modules: [
                {
                    name: 'kioskPaymentProxy',
                    files: ['shared/pages/payment/kioskPaymentProxyCtrl.js']
                },
                {
                    name: 'registrationVerify',
                    files: ['shared/pages/registration/registrationVerifyCtrl.js']
                },
                {
                    name: 'individualRegistration',
                    files: ['framework/directives/checkStrength.js',
                        'framework/directives/ConfirmPassword.js',
                        'shared/pages/registration/individual/individualRegistrationCtrl.js']
                },
                {
                    name: 'typingCenterType',
                    files: ['framework/directives/checkStrength.js',
                        'framework/directives/ConfirmPassword.js',
                        'shared/pages/registration/establishment/typingCenterType/typingCenterTypeCtrl.js',
                        'framework/baseCtrl.js']
                },
                {
                    name: 'establishmentRegistration',
                    files: ['framework/directives/checkStrength.js',
                        'framework/directives/ConfirmPassword.js',
                        'shared/pages/registration/establishment/establishmentReg.registrationCtrl.js',
                        'shared/pages/registration/establishment/step1/establishmentReg.step1Ctrl.js',
                        'shared/pages/registration/establishment/step2/establishmentReg.step2Ctrl.js',
                        'shared/pages/registration/establishment/typingCenterInfoStep/typingCenterInfoStepCtrl.js',
                        'shared/pages/registration/controls/typingCenterInfo/typingCenterInfoCtrl.js',
                        'framework/baseCtrl.js']
                },
                {
                    name: 'GCCOrVisaHolder',
                    files: ['framework/directives/checkStrength.js',
                        'framework/directives/ConfirmPassword.js',
                        'shared/pages/registration/individual/GCCOrVisaHolderCtrl.js']
                },
                {
                    name: 'GCCRegistration',
                    files: ['framework/directives/checkStrength.js',
                        'framework/directives/ConfirmPassword.js',
                        'shared/pages/registration/individual/GCCRegistrationCtrl.js']
                },
                {
                    name: 'visaHolderRegistration',
                    files: ['framework/directives/checkStrength.js',
                        'framework/directives/ConfirmPassword.js',
                        'shared/pages/registration/individual/visaHolder/visaHolderRegistrationCtrl.js',
                        'shared/pages/registration/individual/visaHolder/step1/visaHolderRegistration.step1Ctrl.js',
                        'shared/pages/registration/individual/visaHolder/step2/visaHolderRegistration.step2Ctrl.js',
                        'shared/pages/registration/individual/visaHolder/step3/visaHolderRegistration.step3Ctrl.js']
                },
                {
                    name: 'residentsRegistration',
                    files: ['framework/directives/checkStrength.js',
                        'framework/directives/ConfirmPassword.js',
                        'shared/pages/registration/individual/residents/residentsReg.registrationCtrl.js',
                        'shared/pages/registration/individual/residents/step1/residentsReg.step1Ctrl.js',
                        'shared/pages/registration/individual/residents/step2/residentsReg.step2Ctrl.js',
                        'shared/pages/registration/individual/residents/step3/residentsReg.step3Ctrl.js']
                },
                {
                    name: 'login',
                    files: ['shared/pages/Login/loginCtrl.js']
                },
                {
                    name: 'paymentTermsAndConditions',
                    files: ['shared/pages/content/paymentTermsAndConditionsCtrl.js']
                },
                {
                    name: 'videos',
                    files: ['shared/pages/tourVideos/videosCtrl.js']
                },
                {
                    name: 'activate',
                    files: ['shared/pages/activation/activationCtrl.js']
                },
                {
                    name: 'establishmentActivation',
                    files: ['framework/directives/checkStrength.js', 'framework/directives/ConfirmPassword.js', 'shared/pages/registration/establishmentActivationCtrl.js']
                },
                {
                    name: 'addTestEstUser',
                    files: ['shared/pages/registration/addTestEstUserCtrl.js']
                },
                {
                    name: 'serviceCenter',
                    files: ['shared/pages/serviceCenter/serviceCenterCtrl.js']
                },

                {
                    name: 'fileValidity',
                    files: ['shared/pages/fileValidity/fileValidityCtrl.js']
                },
                {
                    name: 'forgotPassword',
                    files: ['shared/pages/login/forgotCtrl.js']
                },
                {
                    name: 'changePassword',
                    files: ['shared/pages/login/resetPasswordCtrl.js']
                },
                {
                    name: 'resetPassword',
                    files: ['framework/directives/checkStrength.js', 'framework/directives/ConfirmPassword.js', 'shared/pages/login/resetPasswordCtrl.js']
                },
                {
                    name: 'questionairViewer',
                    files: ['shared/pages/questionair/questionairViewerCtrl.js']
                },
                {
                    name: 'faqViewer',
                    files: ['shared/pages/content/FAQViewerCtrl.js']
                },
                {
                    name: 'termsAndConditions',
                    files: ['shared/pages/content/termsAndConditionsCtrl.js']
                },
                {
                    name: 'contactUs',
                    files: ['shared/pages/content/ContactUsCtrl.js']
                },
                {
                    name: 'smartServices',
                    files: ['shared/pages/content/viewerCtrl.js']
                },
                {
                    name: 'applicationTracking',
                    files: ['shared/pages/applicationTracking/applicationTrackingCtrl.js']
                },
                {
                    name: 'outerSmartServices',
                    files: ['shared/pages/outerSmartServices/outerSmartServicesCtrl.js']
                },
                {
                    name: 'newlogin',
                    files: ['shared/pages/outerSmartServices/outerLoginCtrl.js']
                },
                {

                    name: 'serviceCards',
                    files: ['shared/pages/content/serviceCardsCtrl.js']
                },
                //this page occurs the error of E-Visa If no data found
                {
                    name: 'reportResult',
                    files: ['shared/pages/reportResult/reportResultCtrl.js']
                },
                {
                    name: 'tammlogin',
                    files: ['shared/pages/Login/tammloginCtrl.js']
                },
                {
                    name: 'smartpasslogin',
                    files: ['shared/pages/Login/smartPassLoginCtrl.js']
                },
                {
                    name: 'uaePassVerfication',
                    files: ['shared/pages/Login/uaePassVerficationCtrl.js']
                },
                {
                    name: 'uaePassCorporateAccountHandler',
                    files: ['shared/pages/Login/uaePass/uaePassCorporateAccountHandlerCtrl.js',
                        'shared/pages/login/uaePass/verifyEmailCtrl.js']
                },
                {
                    name: 'uaePassRegistrationstep2',
                    files: ['shared/pages/Login/uaePass/uaePassRegistration.step2Ctrl.js',
                        'shared/pages/login/uaePass/verifyEmailCtrl.js']
                },
                {
                    name: 'uaePassRegistrationstep3',
                    files: ['shared/pages/Login/uaePass/uaePassRegistration.step3Ctrl.js',
                        'shared/pages/login/uaePass/verifyEmailCtrl.js']
                },
                {
                    name: 'uaePassRegistrationstep1',
                    files: ['shared/pages/Login/uaePass/uaePassRegistration.step1Ctrl.js',
                        'shared/pages/login/uaePass/verifyEmailCtrl.js']
                },
                {
                    name: 'changeUsernameVerify',
                    files: ['shared/pages/username/changeUsernameVerifyCtrl.js']
                },
                {
                    name: 'completePaymentResult',
                    files: ['shared/pages/payment/completePaymentResultCtrl.js']
                },
                {
                    name: 'changeUsername',
                    files: [
                        'shared/pages/username/changeUsernameCtrl.js',
                        'shared/pages/username/step1/changeUsername.step1Ctrl.js',
                        'shared/pages/payment/paymentStepCtrl.js',
                        'framework/directives/checkStrength.js',
                        'framework/directives/ConfirmPassword.js',
                        'framework/baseCtrl.js'
                    ]
                },
                {
                    name: 'chatpluginURL',
                    files: [
                        'templates/chatPluginURLCtrl.js'
                    ]
                },
                {
                    name: 'smartPassMessages',
                    files: ['shared/pages/smartPass/smartPassMessagesCtrl.js']
                },
                {
                    name: 'UAEPassMessages',
                    files: ['shared/pages/UAEPass/UAEPassMessagesCtrl.js']
                },
                {
                    name: 'forgotUserName',
                    files: ['framework/directives/checkStrength.js',
                        'framework/directives/ConfirmPassword.js', 'shared/pages/login/forgotUserNameCtrl.js']
                },

                {
                    name: 'resultMessages',
                    files: ['shared/pages/resultMessages/changeUserNameMessageCtrl.js']
                },
                {
                    name: 'fromNeweChannelsLogin',
                    files: ['shared/pages/fromNeweChannelsLogin/fromNeweChannelsLoginCtrl.js']
                },
                {
                    name: 'proactiveServicesLogin',
                    files: ['guest/pages/proactiveServices/proactiveLogin/proactiveLoginCtrl.js']
                },
                {
                    name: 'verifyTransferFamilybook',
                    files: ['shared/pages/verifyTransferFamilybook/verifyTransferFamilybookCtrl.js']
                },
                {
                    name: 'verifyProActiveServices',
                    files: ['shared/pages/verifyProActiveServices/verifyProActiveServicesCtrl.js']
                },
                {
                    name: 'updatePersonDetails',
                    files: [
                        'guest/pages/updatePersonDetails/updatePersonDetailsRequestCtrl.js',
                        'guest/pages/updatePersonDetails/step1/updatePersonDetailsRequest.step1Ctrl.js',
                        'guest/pages/updatePersonDetails/step2/updatePersonDetailsRequest.step2Ctrl.js',
                        'shared/pages/payment/paymentStepCtrl.js',
                        'shared/pages/content/viewerCtrl.js',
                        'shared/pages/payment/paymentStepCtrl.js',
                        'shared/pages/content/termsAndConditionsCtrl.js',
                        '../shared/attachmentAuditingResult/attachmentAuditingResultCtrl.js'
                    ]
                },
                {
                    name: 'deployment',
                    files: ['shared/pages/deployment/deploymentCtrl.js']
                },
                {
                    name: 'buildAnnouncement',
                    files: ['shared/pages/deployment/notifyUserAfterBuildCtrl.js']
                },
                {
                    name: 'public-golden-login',
                    files: ['shared/pages/goldenResidencyPortal/goldenPortalloginCtrl.js']
                },
                {
                    name: 'public-golden-registration',
                    files: ['framework/directives/checkStrength.js',
                        'framework/directives/ConfirmPassword.js',
                        'shared/pages/registration/individual/goldenPortalRegistrationCtrl.js']
                },
                {
                    name: 'public-golden-faq',
                    files: ['shared/pages/goldenResidencyPortal/public/gvfaqCtrl.js']
                },
                {
                    name: 'public-golden-news',
                    files: ['shared/pages/goldenResidencyPortal/public/gvNewsCtrl.js']
                },
                {
                    name: 'public-golden-targeted',
                    files: ['shared/pages/goldenResidencyPortal/public/gvTargetedPersonCtrl.js']
                }, {
                    name: 'public-golden-service-cards',
                    files: ['shared/pages/goldenResidencyPortal/serviceCards/serviceCardsCtrl.js']
                },
                {
                    name: 'public-golden-hc',
                    files: ['shared/pages/goldenResidencyPortal/public/gvHappinessCentersCtrl.js']
                },
                {
                    name: 'serviceQrCodeHandler',
                    files: ['shared/pages/serviceQrCodeHandler/serviceQrCodeHandlerCtrl.js']
                },
                {
                    name: 'requestQrCodeHandler',
                    files: ['shared/pages/requestQrCodeHandler/requestQrCodeHandlerCtrl.js']
                },
                {
                    name: 'uaePassPersonRelatedEstabsLogin',
                    files: ['shared/pages/login/uaePassPersonRelatedEstablishmentsLogin/uaePassPersonRelatedEstabsLoginCtrl.js',
                        'shared/pages/login/uaePassPersonRelatedEstablishmentsLogin/sendEmailPopup/emailOtpPopupCtrl.js']
                },
                {
                    name: 'visaEligibility',
                    files: ['shared/pages/visaEligibility/visaEligibilityCtrl.js', 'shared/pages/content/FAQViewerCtrl.js']
                },
                {
                    name: 'yaiBOT',
                    files: ['shared/pages/yai-chatbot/botMainScreenCtrl.js']
                },
                {
                    name: 'externalAccessVerfication',
                    files: ['shared/pages/Login/externalAccessCtrl.js']
                },
                {
                    name: 'requestQrCodeForVisaPrintOut',
                    files: ['shared/pages/requestQrCodeForVisaPrintOut/requestQrCodeForVisaPrintOutCtrl.js']
                },
                {
                    name: 'stopRemind',
                    files: ['shared/pages/stopRemind/stopRemindCtrl.js']
                },
                {
                    name: 'accountActivitiesNotifications',
                    files: ['shared/pages/accountActivitiesNotifications/accountActivitiesNotificationsCtrl.js']
                },
                {
                    name: 'termsAndConditionsPage',
                    files: ['shared/pages/termsAndConditionsPage/termsAndConditionsPageCtrl.js']
                },
                {
                    name: 'mohreLogin',
                    files: ['shared/pages/mohreLogin/mohreLoginCtrl.js']
                },
                {
                    name: 'secondaryLogin',
                    files: ['shared/pages/secondaryLogin/LoginCtrl.js']
                },
                {
                    name: 'secondaryLoginForgetPassword',
                    files: ['shared/pages/secondaryLogin/forgotCtrl.js']
                },
                {
                    name: 'establishmentInquiry',
                    files: ['shared/pages/establishmentInquiry/establishmentInquiryCtrl.js']
                },
                {
                    name: 'certifiedInsuranceCompanies',
                    files: ['shared/pages/certifiedInsuranceCompanies/certifiedInsuranceCompaniesCtrl.js']
                },
                {
                    name: 'healthInsurance',
                    files: ['shared/pages/healthInsurance/healthInsuranceCtrl.js']
                },
                {
                    name: 'payByLink',
                    files: ['shared/pages/payment/payByLink/payByLinkCtrl.js']
                },
                {
                    name: 'amwalPaymentProxy',
                    files: ['shared/pages/payment/amwalPaymentProxyCtrl.js']
                },
                {
                    name: 'exernalePaymentResult',
                    files: ['shared/pages/payment/exernalePaymentResultCtrl.js']
                },
                {
                    name: 'updateMainEstabUserInfo',
                    files: ['shared/pages/updateMainEstabUserInfo/updateMainEstabUserInfoCtrl.js']
                },
                {
                    name: 'userManual',
                    files: ['shared/pages/content/UserManualCtrl.js']
                },
                {
                    name: 'establishmentCardQRCodeResult',
                    files: ['shared/pages/establishmentCardQRCodeResult/establishmentCardQRCodeResultCtrl.js']
                }
            ]
        });

        // For any unmatched url, send to 404
        //$urlRouterProvider.otherwise('/404');
        //$compileProvider.debugInfoEnabled(false);
        $stateProvider

            .state('chatpluginURL',
                {
                    url: '/chatpluginURL',
                    templateUrl: 'templates/chatPluginURL.html',
                    controller: 'chatPluginURLCtrl'

                })
            .state('kioskPaymentProxy', {
                url: '/payment/kioskPaymentProxy?encryptedMessage',
                templateUrl: 'shared/pages/payment/kioskPaymentProxy.html',
                controller: 'kioskPaymentProxyCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('kioskPaymentProxy');
                    }]
                }
            })
            //this page occurs the error of e-Visa If no data found
            .state('reportResult', {
                url: '/reportResult',
                templateUrl: 'shared/pages/reportResult/reportResult.html',
                controller: 'reportResultCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('reportResult');
                    }]
                }
            })

            .state('registrationVerify', {
                url: '/registration/type/{registrationType}/verify',
                templateUrl: 'shared/pages/registration/registrationVerify.html',
                controller: 'registrationVerifyCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('registrationVerify');
                    }]
                }
            })

            .state('individualRegistration', {
                url: '/individual/registration?token&userEmail',
                templateUrl: 'shared/pages/registration/individual/individualRegistration.html',
                controller: 'individualRegistrationCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('individualRegistration');
                    }]
                }
            })

            .state('GCCOrVisaHolder', {
                url: '/individual/GCCOrVisaHolder?token&userEmail',
                templateUrl: 'shared/pages/registration/individual/GCCOrVisaHolder.html',
                controller: 'GCCOrVisaHolderCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('GCCOrVisaHolder');
                    }]
                }
            })

            .state('GCCRegistration', {
                url: '/gcc/registration?token',
                templateUrl: 'shared/pages/registration/individual/GCCRegistration.html',
                controller: 'GCCRegistrationCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('GCCRegistration');
                    }]
                }
            })

            .state('visaHolderRegistration', {
                url: '/visaHolder/registration?token&userEmail',
                templateUrl: 'shared/pages/registration/individual/visaHolder/visaHolderRegistration.html',
                controller: 'visaHolderRegistrationCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('visaHolderRegistration');
                    }]
                }
            })
            .state('visaHolderRegistration.step1', {
                url: '/step1',
                templateUrl: 'shared/pages/registration/individual/visaHolder/step1/visaHolderRegistration.step1.html',
                controller: 'visaHolderRegistration.step1Ctrl'
            })
            .state('visaHolderRegistration.step2', {
                url: '/step2',
                templateUrl: 'shared/pages/registration/individual/visaHolder/step2/visaHolderRegistration.step2.html',
                controller: 'visaHolderRegistration.step2Ctrl'
            })
            .state('visaHolderRegistration.step3', {
                url: '/step3',
                templateUrl: 'shared/pages/registration/individual/visaHolder/step3/visaHolderRegistration.step3.html',
                controller: 'visaHolderRegistration.step3Ctrl'
            })

            .state('residentsRegistration', {
                url: '/residents/registration?token',
                templateUrl: 'shared/pages/registration/individual/residents/residentsReg.registration.html',
                controller: 'residentsReg.registrationCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('residentsRegistration');
                    }]
                }
            })
            .state('residentsRegistration.step1', {
                url: '/step1',
                templateUrl: 'shared/pages/registration/individual/residents/step1/residentsReg.step1.html',
                controller: 'residentsReg.step1Ctrl'
            })
            .state('residentsRegistration.step2', {
                url: '/step2',
                templateUrl: 'shared/pages/registration/individual/residents/step2/residentsReg.step2.html',
                controller: 'residentsReg.step2Ctrl'
            })
            .state('residentsRegistration.step3', {
                url: '/step3',
                templateUrl: 'shared/pages/registration/individual/residents/step3/residentsReg.step3.html',
                controller: 'residentsReg.step3Ctrl'
            })

            .state('videos', {
                url: '/videos',
                templateUrl: 'shared/pages/tourVideos/videos.html',
                controller: 'videosCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('videos');
                    }]
                }
            })

            .state('typingCenterType', {
                url: '/establishment/typingCenterType?token&isExternalTokenRequired',
                templateUrl: 'shared/pages/registration/establishment/typingCenterType/typingCenterType.html',
                controller: 'typingCenterTypeCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('typingCenterType');
                    }]
                }
            })

            .state('establishmentRegistration', {
                url: '/establishment/registration?isTypingCenter&token&isExternalTokenRequired',
                templateUrl: 'shared/pages/registration/establishment/establishmentReg.registration.html',
                controller: 'establishmentReg.registrationCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('establishmentRegistration');
                    }]
                }
            })
            .state('establishmentRegistration.step1', {
                url: '/step1',
                templateUrl: 'shared/pages/registration/establishment/step1/establishmentReg.step1.html',
                controller: 'establishmentReg.step1Ctrl'
            })
            .state('establishmentRegistration.typingCenterInfo', {
                url: '/moreInfo',
                templateUrl: 'shared/pages/registration/establishment/typingCenterInfoStep/typingCenterInfoStep.html',
                controller: 'typingCenterInfoStepCtrl'
            })
            .state('establishmentRegistration.step2', {
                url: '/step2',
                templateUrl: 'shared/pages/registration/establishment/step2/establishmentReg.step2.html',
                controller: 'establishmentReg.step2Ctrl'
            })
            .state('authentication', {
                url: '/authentication?system',
                templateUrl: 'shared/pages/login/authentication.html',
                controller: 'loginCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('login');
                    }]
                }
            })
            .state('login', {
                url: '/login?system',
                templateUrl: 'shared/pages/login/login.html',
                controller: 'loginCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('login');
                    }]
                }
            })
            .state('secondaryLogin', {
                url: '/access',
                templateUrl: 'shared/pages/secondaryLogin/Login.html',
                controller: 'secondaryLoginCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('secondaryLogin');
                    }]
                }
            })
            .state('secondaryLoginForgetPassword', {
                url: '/forget',
                templateUrl: 'shared/pages/secondaryLogin/forgot.html',
                controller: 'secondaryLoginforgotCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('secondaryLoginForgetPassword');
                    }]
                }
            })
            .state('paymentTermsAndConditions', {
                url: '/paymentTermsAndConditions',
                templateUrl: 'shared/pages/content/paymentTermsAndConditions.html',
                controller: 'paymentTermsAndConditionsCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('paymentTermsAndConditions');
                    }]
                }
            })

            .state('newlogin', {
                url: '/newlogin/:serviceTransactionId/:administrativeRegionId',
                templateUrl: 'shared/pages/outerSmartServices/outerLogin.html',
                controller: 'outerLoginCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('newlogin');
                    }]
                }
            })

            .state('activateUser', {
                url: '/activate/:userActivationGuid',
                templateUrl: 'shared/pages/activation/activation.html',
                controller: 'activationCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('activate');
                    }]
                }
            })

            .state('establishmentActivation', {
                url: '/establishmentActivation/:Guid',
                templateUrl: 'shared/pages/registration/establishmentActivation.html',
                controller: 'establishmentActivationCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('establishmentActivation');
                    }]
                }
            })

            .state('addTestEstUser', {
                url: '/addTestEstUser',
                templateUrl: 'shared/pages/registration/addTestEstUser.html',
                controller: 'addTestEstUserCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('addTestEstUser');
                    }]
                }
            })


            .state('serviceCenter', {
                url: '/serviceCenters',
                templateUrl: 'shared/pages/serviceCenter/serviceCenter.html',
                controller: 'serviceCenterCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('serviceCenter');
                    }]
                }
            })

            .state('fileValidity', {
                url: '/fileValidity?fileModuleId&unifiedNumber&nationalityId&dateOfBirth',
                templateUrl: 'shared/pages/fileValidity/fileValidity.html',
                controller: 'fileValidityCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('fileValidity');
                    }]
                }
            })

            .state('forgotPassword', {
                url: '/forgotPassword',
                templateUrl: 'shared/pages/login/forgot.html',
                controller: 'forgotCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('forgotPassword');
                    }]
                }
            })

            .state('errorPage', {
                url: '/errorPage',
                templateUrl: '../shared/errorPage/errorPage.html'
            })

            .state('resetPassword', {
                url: '/resetPassword/:resetPasswordToken?userEmail',
                templateUrl: 'shared/pages/login/resetPassword.html',
                controller: 'resetPasswordCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('resetPassword');
                    }]
                }
            })

            .state('questionairViewer', {
                url: '/questionairViewer',
                templateUrl: 'shared/pages/questionair/questionairViewer.html',
                controller: 'questionairViewerCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('questionairViewer');
                    }]
                }
            })

            .state('faqViewer', {
                url: '/faqViewer',
                templateUrl: 'shared/pages/content/FAQViewer.html',
                controller: 'FAQViewerCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('faqViewer');
                    }]
                }
            })

            .state('termsAndConditions', {
                url: '/termsAndConditions',
                templateUrl: 'shared/pages/content/termsAndConditions.html',
                controller: 'termsAndConditionsCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('termsAndConditions');
                    }]
                }
            })

            .state('contactUs', {
                url: '/contactUs',
                templateUrl: 'shared/pages/content/ContactUs.html',
                controller: 'ContactUsCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('contactUs');
                    }]
                }
            })

            .state('smartServices', {
                url: '/smartServices?categoryTypeId&contentCode&categoryCode',
                templateUrl: 'shared/pages/content/smartServices.html',
                controller: 'viewerCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('smartServices');
                    }]
                }
            })

            .state('applicationTracking', {
                url: '/applicationTracking?requestNumber',
                templateUrl: 'shared/pages/applicationTracking/applicationTracking.html',
                controller: 'applicationTrackingCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('applicationTracking');
                    }]
                }
            })

            .state('registeredTypingCenter', {
                url: '/registeredTypingCenter?categoryTypeId&contentCode&categoryCode',
                templateUrl: 'shared/pages/content/registeredTypingCenter.html',
                controller: 'viewerCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('smartServices');
                    }]
                }
            })

            .state('instructions', {
                url: '/instructions?categoryTypeId&contentCode&categoryCode',
                templateUrl: 'shared/pages/content/instructions.html',
                controller: 'viewerCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('smartServices');
                    }]
                }
            })

            .state('outerSmartServices', {
                url: '/outerSmartServices',
                templateUrl: 'shared/pages/outerSmartServices/outerSmartServices.html',
                controller: 'outerSmartServicesCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('outerSmartServices');
                    }]
                }
            })

            .state('serviceCards', {
                url: '/serviceCards/:serviceTransactionId?administrativeRegionId?applicationId',
                templateUrl: 'shared/pages/content/serviceCards.html',
                controller: 'serviceCardsCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('serviceCards');
                    }]
                }
            })

            .state('tamm-login', {
                url: '/tamm-login',
                templateUrl: 'shared/pages/login/tammlogin.html',
                controller: 'tammloginCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('tammlogin');
                    }]
                }
            })

            .state('smartpasslogin', {
                url: '/smartpasslogin',
                templateUrl: 'shared/pages/login/smartPassLogin.html',
                controller: 'smartPassLoginCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('smartpasslogin');
                    }]
                }
            })

            .state('uaePassVerfication', {
                url: '/uaePassVerfication?code&error&redirectUrl&userId',
                templateUrl: 'shared/pages/login/uaePassVerfication.html',
                controller: 'uaePassVerficationCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('uaePassVerfication');
                    }]
                }
            })
            .state('uaePassCorporateAccountHandler', {
                url: '/user/registration/corporates?token&redirectUrl&userId',
                templateUrl: 'shared/pages/login/uaePass/uaePassCorporateAccountHandler.html',
                controller: 'uaePassCorporateAccountHandlerCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('uaePassCorporateAccountHandler');
                    }]
                }
            })
            .state('uaePassRegistrationstep3', {
                url: '/user/registration/step3?token&mode',
                templateUrl: 'shared/pages/login/uaePass/uaePassRegistration.step3.html',
                controller: 'uaePassRegistration.step3Ctrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('uaePassRegistrationstep3');
                    }]
                }
            })
            .state('uaePassRegistrationstep2', {
                url: '/user/registration/step2?token&mode',
                templateUrl: 'shared/pages/login/uaePass/uaePassRegistration.step2.html',
                controller: 'uaePassRegistration.step2Ctrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('uaePassRegistrationstep2');
                    }]
                }
            }).state('uaePassRegistrationstep1', {
                url: '/user/registration/step1?token',
                templateUrl: 'shared/pages/login/uaePass/uaePassRegistration.step1.html',
                controller: 'uaePassRegistration.step1Ctrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('uaePassRegistrationstep1');
                    }]
                }
            })
            .state('completePaymentResult', {
                url: '/completePaymentResult/:paymentIds',
                templateUrl: 'shared/pages/payment/completePaymentResult.html',
                controller: 'completePaymentResultCtrl',
                params: {
                    paymentIds: "",
                    fakePayment: false,
                    paymentResults: null
                },
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('completePaymentResult');
                    }]
                }
            })

            .state('changeUsernameVerify', {
                url: '/username/type/{registrationType}/verify',
                templateUrl: 'shared/pages/username/changeUsernameVerify.html',
                controller: 'changeUsernameVerifyCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('changeUsernameVerify');
                    }]
                }
            })

            .state('changeUsername', {
                url: '/username/:serviceTransactionId?isTypingCenter&token',
                templateUrl: 'shared/pages/username/changeUsername.html',
                controller: 'changeUsernameCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('changeUsername');
                    }]
                }
            })
            .state('changeUsername.step1', {
                url: '/step1',
                templateUrl: 'shared/pages/username/step1/changeUsername.step1.html',
                controller: 'changeUsername.step1Ctrl'
            })
            .state('changeUsername.step2', {
                url: '/step2',
                templateUrl: 'shared/pages/payment/paymentStep.html',
                controller: 'paymentStepCtrl'
            })

            .state('smartPassNotification', {
                url: '/smartPassNotification?key',
                templateUrl: 'shared/pages/smartPass/smartPassMessages.html',
                controller: 'smartPassMessagesCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('smartPassMessages');
                    }]
                }
            })

            .state('UAEPassNotification', {
                url: '/UAEPassMessages?key',
                templateUrl: 'shared/pages/UAEPass/UAEPassMessages.html',
                controller: 'UAEPassMessagesCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('UAEPassMessages');
                    }]
                }
            })

            .state('forgotUserName', {
                url: '/forgotUserName',
                templateUrl: 'shared/pages/login/forgotUserName.html',
                controller: 'forgotUserNameCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('forgotUserName');
                    }]
                }
            })

            .state('changeUsernameResultMessages', {
                url: '/changeUsernameResultMessages?code',
                templateUrl: 'shared/pages/resultMessages/changeUserNameMessage.html',
                controller: 'changeUserNameMessageCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('resultMessages');
                    }]
                }
            })

            .state('fromNeweChannelsLogin', {
                url: '/fromNeweChannelsLogin',
                templateUrl: 'shared/pages/fromNeweChannelsLogin/fromNeweChannelsLogin.html',
                controller: 'fromNeweChannelsLoginCtrl'
            })

            .state('proactiveServicesLogin', {
                url: '/proactiveServicesLogin/:applicationToken',
                templateUrl: 'guest/pages/proactiveServices/proactiveLogin/proactiveLogin.html',
                controller: 'proactiveLoginCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('proactiveServicesLogin');
                    }]
                }
            }).state('verifyTransferFamilybook',
                {
                    url: '/verifyTransferFamilybook?applicationRef',
                    templateUrl: 'shared/pages/verifyTransferFamilybook/verifyTransferFamilybook.html',
                    controller: 'verifyTransferFamilybookCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('verifyTransferFamilybook');
                        }]
                    }
                }).state('verifyProActiveServices',
                    {
                        url: '/verifyProActiveServices?applicationRef&serviceType&login',
                        templateUrl: 'shared/pages/verifyProActiveServices/verifyProActiveServices.html',
                        controller: 'verifyProActiveServicesCtrl',
                        resolve: {
                            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('verifyProActiveServices');
                            }]
                        }
                    })
            .state('updatePersonDetails', {
                url: '/updateMobileNumber/:serviceTransactionId/request?requestNumber&administrativeRegionId&withException&idNo',
                templateUrl: 'guest/pages/updatePersonDetails/request.html',
                controller: 'updatePersonDetailsRequestCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('updatePersonDetails');
                    }]
                }
            })
            .state('updatePersonDetails.step1', {
                url: '/step1',
                templateUrl: 'guest/pages/updatePersonDetails/step1/step1.html',
                controller: 'updatePersonDetailsRequest.step1Ctrl'

            })
            .state('updatePersonDetails.step2', {
                url: '/step2',
                templateUrl: 'guest/pages/updatePersonDetails/step2/step2.html',
                controller: 'updatePersonDetailsRequest.step2Ctrl'

            })
            .state('updatePersonDetails.step3', {
                url: '/step3',
                templateUrl: 'shared/pages/payment/paymentStep.html',
                controller: 'paymentStepCtrl'
            })
            .state('deployment', {
                url: '/deployment',
                templateUrl: 'shared/pages/deployment/deployment.html',
                controller: 'deploymentCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('deployment');
                    }]
                }
            })
            .state('buildAnnouncement', {
                url: '/buildAnnouncement?source',
                templateUrl: 'shared/pages/deployment/notifyUserAfterBuild.html',
                controller: 'notifyUserAfterBuildCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('buildAnnouncement');
                    }]
                }
            }).state('public-golden-login', {
                url: '/public-golden-login',
                templateUrl: 'shared/pages/goldenResidencyPortal/goldenPortallogin.html',
                controller: 'goldenPortalloginCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('public-golden-login');
                    }]
                }
            }).state('public-golden-registration', {
                url: '/public-golden-registration/registration?token&userEmail',
                templateUrl: 'shared/pages/registration/individual/goldenPortalRegistration.html',
                controller: 'goldenPortalRegistrationCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('public-golden-registration');
                    }]
                }
            }).state('public-golden-faq', {
                url: '/public-golden-faq',
                templateUrl: 'shared/pages/goldenResidencyPortal/public/gvfaq.html',
                controller: 'gvfaqCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('public-golden-faq');
                    }]
                }
            }).state('public-golden-news', {
                url: '/public-golden-news',
                templateUrl: 'shared/pages/goldenResidencyPortal/public/gvNews.html',
                controller: 'gvNewsCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('public-golden-news');
                    }]
                }
            }).state('public-golden-targeted', {
                url: '/public-golden-targeted',
                templateUrl: 'shared/pages/goldenResidencyPortal/public/gvTargetedPerson.html',
                controller: 'gvTargetedPersonCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('public-golden-targeted');
                    }]
                }
            }).state('public-golden-service-cards', {
                url: '/public-golden-service-cards/:serviceTransactionId?administrativeRegionId&applicationId',
                templateUrl: 'shared/pages/goldenResidencyPortal/serviceCards/serviceCards.html',
                controller: 'serviceCardsCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('public-golden-service-cards');
                    }]
                }
            }).state('public-golden-hc', {
                url: '/public-golden-hc',
                templateUrl: 'shared/pages/goldenResidencyPortal/public/gvHappinessCenters.html',
                controller: 'gvHappinessCentersCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('public-golden-hc');
                    }]
                }
            }).state('serviceQrCodeHandler', {
                url: '/serviceQrCodeHandler',
                templateUrl: 'shared/pages/serviceQrCodeHandler/serviceQrCodeHandler.html',
                controller: 'serviceQrCodeHandlerCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('serviceQrCodeHandler');
                    }]
                }
            }).state('requestQrCodeHandler', {
                url: '/requestQrCodeHandler',
                templateUrl: 'shared/pages/requestQrCodeHandler/requestQrCodeHandler.html',
                controller: 'requestQrCodeHandlerCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('requestQrCodeHandler');
                    }]
                }
            }).state('uaePassPersonRelatedEstabsLogin', {
                url: '/uaePassPersonRelatedEstablishments',
                templateUrl: 'shared/pages/login/uaePassPersonRelatedEstablishmentsLogin/uaePassPersonRelatedEstabsLogin.html',
                controller: 'uaePassPersonRelatedEstabsLoginCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('uaePassPersonRelatedEstabsLogin');
                    }]
                }
            }).state('visaEligibility', {
                url: '/visaEligibility',
                templateUrl: 'shared/pages/visaEligibility/visaEligibility.html',
                controller: 'visaEligibilityCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('visaEligibility');
                    }]
                }
            }).state('yaiBOT', {
                url: '/yaiBOT',
                templateUrl: 'shared/pages/yai-chatbot/botMainScreen.html',
                controller: 'botMainScreenCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('yaiBOT');
                    }]
                }
            }).state('externalAccessVerfication', {
                url: '/externalAccessVerfication?code',
                templateUrl: 'shared/pages/login/externalAccess.html',
                controller: 'externalAccessCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('externalAccessVerfication');
                    }]
                }
            }).state('requestQrCodeForVisaPrintOut', {
                url: '/requestQrCodeForVisaPrintOut/:requestNumber',
                templateUrl: 'shared/pages/requestQrCodeForVisaPrintOut/requestQrCodeForVisaPrintOut.html',
                controller: 'requestQrCodeForVisaPrintOutCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('requestQrCodeForVisaPrintOut');
                    }]
                }
            }).state('stopRemind', {
                url: '/stopRemind?remindType&remindId',
                templateUrl: 'shared/pages/stopRemind/stopRemind.html',
                controller: 'stopRemindCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('stopRemind');
                    }]
                }
            }).state('accountActivitiesNotifications', {
                url: '/accountActivitiesNotifications?token',
                templateUrl: 'shared/pages/accountActivitiesNotifications/accountActivitiesNotifications.html',
                controller: 'accountActivitiesNotificationsCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('accountActivitiesNotifications');
                    }]
                }
            }).state('termsAndConditionsPage', {
                url: '/termsAndConditionsPage',
                templateUrl: 'shared/pages/termsAndConditionsPage/termsAndConditionsPage.html',
                controller: 'termsAndConditionsPageCtrl',
                resolve: {
                    lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('termsAndConditionsPage');
                    }]
                }
            }).state('mohreLogin',
                {
                    url: '/mohreLogin?token',
                    templateUrl: 'shared/pages/mohreLogin/mohreLogin.html',
                    controller: 'mohreLoginCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('mohreLogin');
                        }]
                    }
                }).state('establishmentInquiry', {
                    url: '/establishmentInquiry',
                    templateUrl: 'shared/pages/establishmentInquiry/establishmentInquiry.html',
                    controller: 'establishmentInquiryCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('establishmentInquiry');
                        }]
                    }
                }).state('certifiedInsuranceCompanies', {
                    url: '/certifiedInsuranceCompanies',
                    templateUrl: 'shared/pages/certifiedInsuranceCompanies/certifiedInsuranceCompanies.html',
                    controller: 'certifiedInsuranceCompaniesCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('certifiedInsuranceCompanies');
                        }]
                    }
                }).state('healthInsurance', {
                    url: '/healthInsurance',
                    templateUrl: 'shared/pages/healthInsurance/healthInsurance.html',
                    controller: 'healthInsuranceCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('healthInsurance');
                        }]
                    }
                }).state('payByLink',
                    {
                        url: '/payByLink?token',
                        templateUrl: 'shared/pages/payment/payByLink/payByLink.html',
                        controller: 'payByLinkCtrl',
                        resolve: {
                            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('payByLink');
                            }]
                        }
                    }).state('amwalPaymentProxy', {
                        url: '/payment/amwalPaymentProxy',
                        templateUrl: 'shared/pages/payment/amwalPaymentProxy.html',
                        controller: 'amwalPaymentProxyCtrl',
                        resolve: {
                            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('amwalPaymentProxy');
                            }]
                        }
                    }).state('exernalePaymentResult', {
                        url: '/exernalePaymentResult?draftNumber&trxRef&errorCode&paymentMethod&bli&mli&mainServiceTransId&eligibleForSecondPayment&skipDrafts&inCompleteReason',
                        templateUrl: 'shared/pages/payment/exernalePaymentResult.html',
                        controller: 'exernalePaymentResultCtrl',
                        resolve: {
                            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('exernalePaymentResult');
                            }]
                        }
                    }).state('updateMainEstabUserInfo', {
                        url: '/establishment/mainuser/update/info',
                        templateUrl: 'shared/pages/updateMainEstabUserInfo/updateMainEstabUserInfo.html',
                        controller: 'updateMainEstabUserInfoCtrl',
                        resolve: {
                            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('updateMainEstabUserInfo');
                            }]
                        }
                    }).state('userManual', {
                        url: '/userManual',
                        templateUrl: 'shared/pages/content/UserManual.html',
                        controller: 'UserManualCtrl',
                        resolve: {
                            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('userManual');
                            }]
                        }
                    }).state('establishmentCardQRCodeResult', { 
                        url: '/estabCardQR?token',
                        templateUrl: 'shared/pages/establishmentCardQRCodeResult/establishmentCardQRCodeResult.html',
                        controller: 'establishmentCardQRCodeResultCtrl',
                        resolve: {
                            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                                return $ocLazyLoad.load('establishmentCardQRCodeResult');
                            }]
                        }
                    });



    }])