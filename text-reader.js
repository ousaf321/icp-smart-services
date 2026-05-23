mainApp.directive('textReader', ['$location', 'languageService', function ($location, languageService) {
    return {
        restrict: 'EA',
        controller: ["$scope", function ($scope) {
            $scope.currentLanguageID = languageService.getCurrentID();
        }],
        link: function (scope, element, attr, ctrl) {
            var contentId = "read_this";
            scope.enableTextReader = config.enableTextReader == true ? 'display:block' : 'display:none';
            if (attr.contentId && attr.contentId != "") {
                contentId = attr.contentId;
            }

            var encodedUrl = window.encodeURIComponent($location.$$absUrl);
            var currentVoice = 'Kate';
            var currentLanguage = 'en_uk';
            var title = "Listen to this page";
            var buttonText = "Listen";

            if (scope.currentLanguageID && scope.currentLanguageID == 1) {
                currentVoice = 'Faris';
                currentLanguage = 'ar_ar';
                title = "اَستمعُ إلى هذه الصفحةِ";
                buttonText = "استمع";
            }
            else if (scope.currentLanguageID && scope.currentLanguageID == 2) {
                currentVoice = 'Kate';
                currentLanguage = 'en_uk';
                title = "Listen to this page";
                buttonText = "Listen";
            }
            else {
                currentVoice = 'Urdu_female';
                currentLanguage = 'ur_pk';
                title = "رِیڈسپیکر استعمال کرتے ہوئے اس صفحے کو سنیں";
                buttonText = "سنیں";
            }
            
            angular.element(element)[0].outerHTML =
                '<div id="readspeaker_button1" style="' + scope.enableTextReader + '" class="rs_skip rsbtn rs_preserve">' +
                    '<a rel="nofollow" class="rsbtn_play" accesskey="L" title="' + title + '" ' +
                    'href="' + config.textReaderUrl + '&amp;lang=' + currentLanguage + '&amp;voice=' + currentVoice + '&amp;readclass=' + contentId + '&amp;url=' + encodedUrl + '">' +
                        '<span class="rsbtn_left rsimg rspart"><span class="rsbtn_text"><span>' + buttonText + '</span></span></span>' +
                        '<span class="rsbtn_right rsimg rsplay rspart"></span>' +
                    '</a>' +
                '</div>' +
                '<script type="text/javascript">' +
                    'rspkr.ui.addClickEvents();' +
                '</script>';

            if (rspkr && rspkr.ui) {
                rspkr.ui.addClickEvents();
            }
        }
    };
}]);