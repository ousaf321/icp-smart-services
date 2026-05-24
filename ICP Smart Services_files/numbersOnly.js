mainApp.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {

            // 🔹 Clean function (centralised)
            function cleanNumber(value) {
                if (!value) return '';

                return value
                    // remove RTL/LTR invisible marks
                    .replace(/[\u200E\u200F\u202A-\u202E]/g, '')
                    // remove anything that is not a digit
                    .replace(/[^0-9]/g, '');
            }

            // ✅ Handle typing (your original logic improved)
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';

                var transformedInput = cleanNumber(inputValue);

                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });

            // ✅ ✅ Handle paste (MAIN FIX for your issue)
            element.on('paste', function (event) {
                event.preventDefault();

                let pasted = (event.clipboardData || window.clipboardData).getData('text');

                pasted = cleanNumber(pasted);

                scope.$apply(function () {
                    modelCtrl.$setViewValue(pasted);
                    modelCtrl.$render();
                });
            });
        }
    };
});


mainApp.directive('englishWithSpecialCharacters', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
             modelCtrl.$parsers.push(function (value) {
                 if (value) {
                    var validStr = '';
                    var pattern = new RegExp(/^[a-zA-Z-,.'-]+(\s{0,1}[a-zA-Z-, .'-])*$/);
                    var validCharacter = false;
                    for (var i = 0; i < value.length; i++) {
                        validCharacter = pattern.test(value[i]);
                        if (validCharacter) {
                            validStr += value[i];
                        }
                        else if ('@(-,\\_ &.)/'.indexOf(value[i]) != -1 || !isNaN(value[i])) {
                            validStr += value[i];
                        }
                    }
                    modelCtrl.$setViewValue(validStr);
                    modelCtrl.$render();
                    return validStr;
                }

            });
        }
    };
});

mainApp.directive('arabicWithSpecialCharacters', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
             modelCtrl.$parsers.push(function (value) {
                 if (value) {
                    var validStr = '';
                    var pattern = new RegExp(/^[\u0621-\u064A\u0660-\u0669-\u0640* , .'ءًٌٍَُُِّْ~-]+$/);
                    var validCharacter = false;
                    for (var i = 0; i < value.length; i++) {
                        validCharacter = pattern.test(value[i]);
                        if (validCharacter) {
                            validStr += value[i];
                        }
                        else if ('@(-,\\_ &.)/'.indexOf(value[i]) != -1 || !isNaN(value[i])) {
                            validStr += value[i];
                        }
                    }
                    modelCtrl.$setViewValue(validStr);
                    modelCtrl.$render();
                    return validStr;
                }

            });
        }
    };
});

mainApp.directive('format', ['numberFilter',
  function (numberFilter) {
      return {
          restrict: 'A',
          require: 'ngModel',
          link: function (scope, elm, attr, ngModel) {
              var decPlaces = attr.format || 2;

              function formatter(value) {
                  if (value) {
                      return numberFilter(value, decPlaces);
                  }
              }

              ngModel.$formatters.push(formatter);

          }
      }
  }
]);

mainApp.directive('decimalNumber', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }

                var clean = val.replace(/[^-0-9\.]/g, '');
                var negativeCheck = clean.split('-');
                var decimalCheck = clean.split('.');
                if (!angular.isUndefined(negativeCheck[1])) {
                    negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                    clean = negativeCheck[0] + '-' + negativeCheck[1];
                    if (negativeCheck[0].length > 0) {
                        clean = negativeCheck[0];
                    }

                }

                if (!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[1] = decimalCheck[1].slice(0, 2);
                    clean = decimalCheck[0] + '.' + decimalCheck[1];
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
    };
});

mainApp.directive('numbersOnlyWithSpecialCharacters', function () {
    return {
        require: 'ngModel',
        scope: {
            allowedChars: '@'   // take allowed characters from HTML
        },
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue === undefined) return '';

                // Build regex dynamically based on allowed special characters
                var allowed = scope.allowedChars ? scope.allowedChars.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&") : "";
                var regex = new RegExp("[^0-9" + allowed + "]", "g");

                var transformedInput = inputValue.replace(regex, '');

                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});
