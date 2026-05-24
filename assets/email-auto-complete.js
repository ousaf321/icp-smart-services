mainApp.directive('emailAutoComplete', function ($document) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            //const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
            const domains =window.config.emailDomains;
            scope.selectedIndex = -1;

            scope.$watch(attrs.ngModel, function (value) {
                if (!value) {
                    scope.emailSuggestions = [];
                    scope.selectedIndex = -1;
                    return;
                }

                const atIndex = value.indexOf('@');
                if (atIndex > -1) {
                    const localPart = value.substring(0, atIndex);
                    const domainPart = value.substring(atIndex + 1);

                    scope.emailSuggestions = domains
                        .filter(domain => domain.startsWith(domainPart))
                        .map(domain => localPart + '@' + domain);

                    scope.selectedIndex = -1; // reset on new input
                } else {
                    scope.emailSuggestions = [];
                    scope.selectedIndex = -1;
                }
            });

            // Handle keyboard navigation
            element.on('keydown', function (event) {
                scope.$apply(function () {
                    const key = event.which || event.keyCode;

                    if (scope.emailSuggestions.length > 0) {
                        if (key === 40) {
                            // Arrow Down
                            scope.selectedIndex = (scope.selectedIndex + 1) % scope.emailSuggestions.length;
                            event.preventDefault();
                        } else if (key === 38) {
                            // Arrow Up
                            scope.selectedIndex =
                                (scope.selectedIndex > 0) ? scope.selectedIndex - 1 : scope.emailSuggestions.length - 1;
                            event.preventDefault();
                        } else if (key === 13 && scope.selectedIndex >= 0) {
                            // Enter
                            scope.selectSuggestion(scope.emailSuggestions[scope.selectedIndex]);
                            event.preventDefault();
                        }
                    }
                });
            });

            // On blur, hide the menu
            element.on('blur', function () {
                setTimeout(() => {
                    scope.$apply(() => {
                        scope.emailSuggestions = [];
                        scope.selectedIndex = -1;
                    });
                }, 200);
            });
        }
    };
});