mainApp.directive('countryCode', ['$compile', function ($compile) {
    // var template = '<div class="btn-group" uib-dropdown>' +
    //  '<button id="single-button" type="button" class="btn btn-primary" uib-dropdown-toggle ng-disabled="disabled">' +
    //  '{{code}}<span class="caret"></span>' +
    //  '</button>' +
    //'</div>';

    var template = '<tahaluf-dropdownlist ng-disabled="disabled" show-clear="false" class="select-dropdown-control validation" label-attr="diallingText" value-attr="diallingCode" datasource="countries" ng-model="code">' +

                     '</tahaluf-dropdownlist>';

    return {
        restrict: 'E',
        scope: {
            code: '=',
            countries: '=',
            disabled: "=",
            selectedId: '=?'
        },
        template: template,
        link: function (scope, element, attributes) {
            var list = angular.element(element[0].querySelector('.btn-group'));

            if (!scope.selectedId) {
                scope.code = '00971';
            }

            scope.$watchGroup(['countries'], function (newValues, oldValues, scope) {
                if (scope.countries) {
                    angular.forEach(scope.countries, function (obj) {
                        obj.diallingText = obj.diallingCode + ' - ' + obj.text;
                    });
                }
            });
            scope.$watch('selectedId', function (val) {
                if (val) {
                    var selectedCountry = scope.countries.filter(x => x.id == val)[0];
                    if (selectedCountry) {
                        scope.code = selectedCountry.diallingCode;
                    } else {
                        scope.code = '00971';
                    }
                }
            })

            scope.$on('resetCode', function (event) {
                scope.code = '00971';
            });

            

        }
    };
}])

mainApp.directive('phone', function ($compile, $filter) {
    return {
        restrict: 'A',
        require: "ngModel",
        scope: {
            code: '=',
            countries: '=',
            model: '=ngModel',
            relatedCountry: "="
        },

        link: function (scope, element, attributes, ngModel) {
            
            var _element = element;

            scope.$watchGroup(['countries'], function (newValues, oldValues, scope) {
              
                var countriesSorted;
                value = scope.model;
                if (scope.countries && value && scope.code) {
                    if (value.length > scope.code.length) {
                        countriesSorted = $filter('orderBy')(scope.countries, function (country)

                        {
                            if (country && country.diallingCode)
                            return country.diallingCode.length;
                        }, true);
                        for (var i = 0; i < countriesSorted.length; i++) {
                            if (value.indexOf(countriesSorted[i].diallingCode) == 0) {
                                scope.code = countriesSorted[i].diallingCode;
                                break;
                            }
                        }
                        ngModel.$setViewValue(value.substring(value.indexOf(scope.code) + scope.code.length));
                        ngModel.$render();
                    }
                }

            });

            scope.$watch('relatedCountry', function (oldValue, newValue) {
            
                if (oldValue && !_element.val() && scope.countries) {
                    var country = ((scope.countries.filter(
                                                 function (country) {
                                                     if (country.id == oldValue)
                                                         return true;
                                                     return false;
                                                 }))[0]);
                    if (country)
                        scope.code = country.diallingCode;
                }
            });


            scope.$watch('code', function (oldValue, newValue) {
              
                if (oldValue && _element.val()) {
                    var code = "'" + oldValue + "'";

                    scope.model = (code + _element.val()).replace("'", "").replace("'", "");
                }
            });

            //from model to view
            ngModel.$formatters.push(function (value) {
                
                var countriesSorted;
                if (value && scope.code && scope.countries) {
                    if (value.length > scope.code.length) {
                        countriesSorted = $filter('orderBy')(scope.countries, function (country) {
                
                            if (country && country.diallingCode)
                                return country.diallingCode.length;
                        }, true);
                        for (var i = 0; i < countriesSorted.length; i++) {
                            if (value.indexOf(countriesSorted[i].diallingCode) == 0) {
                                scope.code = countriesSorted[i].diallingCode;
                                break;
                            }
                        }

                        return value.substring(value.indexOf(scope.code) + scope.code.length)
                    }
                }
            });
            //from view to model
            ngModel.$parsers.push(function (value) {
                if (value) {
                    // Remove all non-numeric characters
                    var transformedInput = value.replace(/[^0-9]/g, '');

                    // If invalid characters were found, reset the input
                    if (transformedInput !== value) {
                        ngModel.$setViewValue('');
                        ngModel.$render();
                        return '';
                    }

                    // Determine max length: 10 for UAE (00971), otherwise 11
                    var maxLength = (scope.code === '00971') ? 10 : 11;

                    // Remove leading zero if present
                    if (transformedInput.charAt(0) === '0') {
                        transformedInput = transformedInput.substring(1);
                    }

                    // Trim input to the maximum allowed length
                    if (transformedInput.length > maxLength) {
                        transformedInput = transformedInput.substring(0, maxLength);
                    }

                    // Update the input field with the transformed value
                    ngModel.$setViewValue(transformedInput);
                    ngModel.$render();

                    // Return the full phone number with country code
                    return scope.code + transformedInput;
                } else {
                    return '';
                }
            });
        }
    };
})