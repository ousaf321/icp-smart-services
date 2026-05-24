mainApp.directive('dynamic', function ($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, ele, attrs) {
            scope.$watch(attrs.dynamic, function (html) {
                if (html) {
                    ele.html(html);
                }
                $compile(ele.contents())(scope);
            });
        }
    };
});