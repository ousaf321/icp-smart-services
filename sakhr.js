mainApp.directive('sakhr', ['apiHelperService', function (apiHelperService) {
    return {
        restrict: 'A',
        require: "ngModel",
        scope: {
            translatedModel: '=',
            model: '=ngModel',
            isCountry: '=',
        },
        link: function (scope, element, attributes) {
            scope.preText = undefined;
            element.bind('blur', function () {
                if (scope.model) {
                    var options = {
                        success: function (response) {
                            var browserName = navigator.appName;
                            if (browserName == 'Microsoft Internet Explorer') {
                                response = JSON.parse(response);
                            }

                            if (scope.model && response[scope.model.toLowerCase()]) {
                                scope.translatedModel = response[scope.model.toLowerCase()];
                            }
                            scope.preText = scope.model;
                        },
                        showSpinner: false
                    };
                    if (!scope.translatedModel || (scope.model != scope.preText)) {
                        if (scope.isCountry && typeof (scope.isCountry) === "boolean" && scope.isCountry == true) {
                            apiHelperService.get('translation/countryAndCity/' + scope.model, options);
                        }
                        else {
                            apiHelperService.get('translation/' + scope.model, options);
                        }
                    }
                }
            })


        }
    };
}])