
'use strict';
//'ngAnimate', 'toaster'
var mainApp = angular.module('mainApp', ['sotos.crop-image', 'ui.router', 'ngSanitize', 'ghiscoding.validation',
    'pascalprecht.translate', , 'ngLocalize', 'smart-table', 'ivh.treeview', 'selector', 'ngAnimate', 'ngAutocomplete',
    'toaster', 'ui.bootstrap', 'ui.tinymce', 'oc.lazyLoad', 'ngFileUpload', 'ngMap', 'selector',
    'tree.dropdown', 'vsGoogleAutocomplete', 'mgo-angular-wizard', 'angular-loading-bar',
    'ui.mask', 'ngStorage', 'textSizeSlider', 'ui.select', 'vcRecaptcha', 'bm.uiTour', 'angulartics', 'angulartics.google.analytics', 'angularUtils.directives.dirPagination', 'ngSanitize', 'ngCookies']);
// -- Main page Run for Global variables
// ---------------------------------------------------
mainApp.run(['$rootScope', '$translate', '$translatePartialLoader', 'apiHelperService', '$http', '$q', '$cookies', 'signalR',
    function ($rootScope, $translate, $translatePartialLoader, apiHelperService, $http, $q, $cookies, signalR) {


        signalR.url(window.config.signalrUrl);

        $rootScope.getVistorInfo = function (result) {
            $http.get(window.config.vistorIpAnalysis)
                .then(function (response) {
                    result(response.data);
                });
        }
        $rootScope.CurrentController = function (ContollerNames) {

            var loaded = $translatePartialLoader.getRegisteredParts();
            angular.forEach(loaded, function (value) {
                if (value != 'home') {

                    $translatePartialLoader.deletePart(value);
                }
            });
            angular.forEach(ContollerNames, function (value) {

                $translatePartialLoader.addPart(value);



            });
            $translate.refresh();
        };

        $rootScope.getCurrentController = function () {
            var loaded = $translatePartialLoader.getRegisteredParts();
            return loaded;
        };
        $rootScope.showPaymentLoader = function () {
            $rootScope.processPaymentLoader = true;
        };
        $rootScope.hidePaymentLoader = function () {
            $rootScope.processPaymentLoader = false;
        };
    }]);


// -- Main page Config
// ---------------------------------------------------
mainApp.config(['$translateProvider', '$translatePartialLoaderProvider', '$animateProvider', 'uibDatepickerConfig', 'vcRecaptchaServiceProvider', '$qProvider', '$locationProvider', '$cookiesProvider',
    function ($translateProvider, $translatePartialLoaderProvider, $animateProvider, uibDatepickerConfig, vcRecaptchaServiceProvider, $qProvider, $locationProvider, $cookiesProvider) {
        $qProvider.errorOnUnhandledRejections(false);
        $locationProvider.hashPrefix('');

        var language = localStorage.currentLanguage ? localStorage.currentLanguage : 'en';

        /*Don't Remove this line , it fixess the conflict issue between ng animate and the validation */
        /*$animateProvider.classNameFilter(/ng-animate-enabled/);*/
        /*Commented By Rami Abdel Hadi to fix the slider on 20160720*/
        /*End*/
        $translatePartialLoaderProvider.addPart('home');
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: window.config.host + '/languages/{part}/{lang}.json'
        });
        $translateProvider.preferredLanguage(language).fallbackLanguage(language);
        $translateProvider.useSanitizeValueStrategy('escapeParameters');

        uibDatepickerConfig.startingDay = 6;
        uibDatepickerConfig.showWeeks = false;
        uibDatepickerConfig.datepickerMode = 'year';


        vcRecaptchaServiceProvider.setSiteKey(config.recaptchaSiteKey);


    }]);



var chatScript = 'framework/';
var lang = 'en';

if (localStorage.currentLanguage) {

    if (localStorage.currentLanguage == 'ar')
        lang = 'ar';
}
chatScript += lang + 'Chat.js';
//document.write('<script type="text/javascript" src="' + chatScript + '" ></script>');

//register google map script based on language

//var script = 'https://maps.google.ae/maps/api/js?v=3.exp&key=AIzaSyCqTToSdXIq76wpJOxYVRVnqpn4arzqDbk&libraries=places';
//script += '&language=' + (localStorage.currentLanguage ? localStorage.currentLanguage : 'en');
//document.write('<script type="text/javascript" src="' + script + '"></script>');


var recaptchaScript = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=vcRecaptchaApiLoaded';
recaptchaScript += '&hl=' + lang;
document.write('<script type="text/javascript" src="' + recaptchaScript + '" async defer></script>');


//var chatScript = 'framework/';
//chatScript +=  (localStorage.currentLanguage ? localStorage.currentLanguage : 'en') + 'Chat.js';
//document.write('<script type="text/javascript" src="' + chatScript + '" ></script>');





document.write('<script id="purecloud-webchat-js" type="text/javascript" src="https://apps.mypurecloud.ie/webchat/jsapi-v1.js" region="eu-west-1" org-guid="cd9f86c5-947d-4f4b-bdf3-d7e4219e5b9c" deployment-key="df75dbbd-af86-4c2e-9a2b-4749c64c625f"></script>');
