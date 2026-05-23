mainApp.directive('capitalizeFirst', function ($parse) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function (inputValue) {

                if (inputValue === undefined || inputValue == null) { inputValue = ''; }//Sadder Added Null condtion to avoid any console error 
                var capitalized = inputValue.toUpperCase() ; // Nazzal: All UpperCase
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
        }
    };
});
