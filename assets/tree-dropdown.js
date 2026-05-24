angular.module('tree.dropdown', []).directive('treeDropdown', treeDropdown);

treeDropdown.$inject = ['$compile'];

function treeDropdown($compile) {
    var template = "<div class='select' ng-click='openTree()'><p>{{selected.name}}</p><input type='text' ng-model='selected.name' style='border:none;width:0px;height:0px' /></div>";
    template += "<div class='list' ng-show='isOpen'></div>";

    return {
        restrict: 'E',
        scope: {
            data: '=',
            selected: '=',
            isOpen: '@'
        },

        template: template,

        link: function (scope, element, attrs, ngModel) {
            var list = angular.element(element[0].querySelector('.list'));
            scope.isOpen = false;

            ctrl = scope;

            ctrl.childClick = function (obj) {
                setSelected(ctrl, obj);
                ctrl.isOpen = false;
                ctrl.$apply();
            }

            scope.$watchGroup(['data', 'selected'], function (newValues, oldValues, scope) {

                list.html('');

                if (!scope.selected) {
                    setSelected(scope, null);
                }
                var options = getOptions(scope, scope.data, 0);
                list.append($compile(options)(scope));
            });

            element.bind('click', function () {
                scope.isOpen = !(scope.isOpen);
                scope.$apply();
            });

            angular.element(document).bind('click', function (event) {
                if (element !== event.target && !element[0].contains(event.target)) {
                    scope.$apply(function () {

                        scope.isOpen = false;
                    })
                }
            });
            var setSelected = function (scope, obj) {

                if (obj) {
                    scope.selected = obj;
                } else {
                    scope.selected = null;
                }
            }

            var getOptions = function (scope, data, level) {

                var optionUL = angular.element("<ul></ul>");

                if (level == 0) {
                    
                    var optionLI = angular.element("<li></li>");
                    var optionA = angular.element("<p>&nbsp;</p>");
                    optionLI.append(optionA);

                    optionA.bind("click", function () {
                        scope.selected = null;
                        scope.isOpen = true;
                        scope.$apply();
                    })


                    optionUL.append(optionLI);
                }
                angular.forEach(data, function (obj) {
                    var optionLI = angular.element("<li></li>");
                    var optionA = angular.element("<p ng-class='{selected:selected.id==" + obj.id + "}' class='level-" + level + "'><i class='fa fa-type-tree'></i>" + obj.name + "</p>");
                    optionLI.append(optionA);

                    if (scope.selected == obj) {
                        setSelected(scope, obj);
                    }

                    optionA.bind("click", function () {

                        setSelected(scope, obj);
                        scope.isOpen = false;
                        scope.$apply();
                    })

                    if (obj.children) {
                        optionLI.append(getOptions(scope, obj.children, level + 1));
                    }
                    optionUL.append(optionLI);
                })

                return optionUL;
            }
        }
    };
}