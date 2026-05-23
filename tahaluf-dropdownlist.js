mainApp.directive('tahalufDropdownlist', ['$timeout', '$q', '$compile', function ($timeout, $q, $compile) {

    return {
        restrict: 'EA',
        scope: {
            selectedOption: '=?',
            ngModel: '=',
            ngDisabled: '=?',
            labelAttr: '@',
            valueAttr: '@',
            placeholder: '@?',
            name: '@?',
            title: '@?',
            datasource: '=',
            onSelect: '&',
            showClear: '=?',
            refresh: '&',
            multi: '=?',

        },
        transclude: true,
        template:
            '<div ng-if="!multi" >' +
            '<ui-select   name="{{name}}" ng-disabled="ngDisabled"  ng-model="option.selected" theme="select2" title="{{title}}" on-select="onSelected($item)">' +
            '<ui-select-match placeholder="{{placeholder}}">{{get($select.selected, labelAttr)}}' +
            ' <button  tabindex="-1" type="button" ng-if="showClear" ng-hide="ngDisabled"   ng-click="clear($event)"><i class="fa fa-times" aria-hidden="true"></i></button>' +
            '</ui-select-match>' +
            '<ui-select-choices refresh="doRefresh($select.search, $select)" repeat="option in datasource | filter: $select.search">' +
            ' <span ng-bind-html="get(option, labelAttr) | highlight: $select.search"></span>' +
            '  </ui-select-choices>' +
            '    </ui-select> ' +
            '</div>' +
            //'<div ng-if="isAutocompleteTheme">' +
            //    '<ui-select  autofocus="true" name="{{name}}" ng-disabled="ngDisabled"  ng-model="option.selected" theme="selectize" title="{{title}}" on-select="onSelected($item)">' +
            //             '<ui-select-match placeholder="{{placeholder}}">{{get($select.selected, labelAttr)}}' +
            //            ' <button  tabindex="-1" type="button" ng-if="showClear" ng-hide="ngDisabled"   ng-click="clear($event)"><i class="fa fa-times" aria-hidden="true"></i></button>' +
            //            '</ui-select-match>' +
            //        '<ui-select-choices refresh="doRefresh($select.search, $select)"  repeat="option in datasource | filter: $select.search">' +
            //            ' <span ng-bind-html="get(option, labelAttr) | highlight: $select.search"></span>' +
            //        '  </ui-select-choices>' +
            //'    </ui-select> ' +
            //'</div>' +

            '<div ng-if="multi">' +
            '<ui-select  multiple   name="{{name}}" ng-disabled="ngDisabled"  ng-model="option.selected" theme="select2" title="{{title}}" on-select="onSelected($item)">' +
            '<ui-select-match placeholder="{{placeholder}}">' + '{{getForMulti($select.selected, labelAttr,null,$item)}}' +
            ' <button  tabindex="-1" type="button" ng-if="showClear" ng-hide="ngDisabled"   ng-click="clearForMulti($item)"><i class="fa fa-times" aria-hidden="true"></i></button>' +
            '</ui-select-match>' +
            '<ui-select-choices refresh="doRefresh($select.search, $select)" repeat="option in datasource | filter: $select.search">' +
            ' <span ng-bind-html="getForMulti(option, labelAttr ,null ,option) | highlight: $select.search"></span>' +
            '  </ui-select-choices>' +
            '    </ui-select> ' +
            '</div>' +
            '<div ng-transclude class="hide-input"></div>'
        ,
        link: function (scope, element, attributes, form, $transclude) {
            //moayad 13/12/2016
            //fix tab index on tab click
            //'<span><input type="checkbox" name="select" ng-click="onSelected($item)" /> </span>'+
            if (element[0].querySelector('.hide-input input'))
                element[0].querySelector('.hide-input input').setAttribute('tabindex', '-1');

            scope.option = { selected: null };

            scope.showClear = angular.isDefined(scope.showClear) ? scope.showClear : true;

            scope.onSelected = function (selectedItem) {

                scope.onSelect({ item: selectedItem });
            }

            scope.doRefresh = function (text, select) {

                var defer = scope.refresh({ text: text });
                if (defer) {
                    select.activate();
                }

            }


            //set selected option and selected value if user change option in ddl
            scope.$watch('option.selected', function (newValue) {


                if (scope.multi) {
                    if (scope.option.selected?.length > 0) {
                        if (scope.selectedOption?.length != scope.option.selected?.length) {


                            if (scope.selectedOption) {
                                // var result = scope.option.selected.filter(o => o[scope.valueAttr] == scope.selectedOption.filter(e => e[scope.valueAttr] == o[scope.valueAttr]))

                                var result = scope.option.selected.filter(function (o1) {
                                    // filter out (!) items in result2
                                    return !scope.selectedOption.some(function (o2) {
                                        return o1[scope.valueAttr] === o2[scope.valueAttr];
                                    });
                                })

                            }
                            if (!scope.ngModel || scope.ngModel === "null") {
                                scope.ngModel = []
                            }
                            let itemValue = scope.getForMulti(scope.option.selected, scope.valueAttr, null, newValue.length > 1 ? result[0] : newValue[0])
                            scope.ngModel.push(itemValue);
                            scope.ngModel = scope.ngModel.map(Number)
                            scope.selectedOption = scope.option.selected;

                        }
                    }
                } else {
                    if (scope.option.selected) {
                        scope.ngModel = scope.get(scope.option.selected, scope.valueAttr);
                        scope.selectedOption = scope.option.selected;
                    }


                }

            });

            scope.$watch('datasource', function (newValue) {

                if (scope.multi) {
                    if (scope.ngModel && scope.ngModel?.length >= 1 && scope.option && scope.datasource) {


                        if (scope.selectedOption?.length == 1 && scope.option.selected?.length >= 1) {
                            scope.option.selected = scope.selectedOption
                        }
                        if (scope.ngModel && !scope.selectedOption && scope.datasource) {
                            for (var i = 0; i < scope.ngModel?.length; i++) {
                                if (!scope.selectedOption) {
                                    scope.selectedOption = []
                                }
                                scope.selectedOption.push(scope.datasource.filter(c => c[scope.valueAttr] == scope.ngModel[i])[0])
                                scope.option.selected = scope.selectedOption
                            }
                        }
                    } else if (!scope.ngModel && scope.option.selected?.length > 0) {
                        scope.option.selected = []
                        scope.selectedOption = []
                    } else if (scope.datasource && scope.datasource.length == 0) {
                        scope.option.selected = []
                        scope.selectedOption = []
                    }
                } else {
                    if (scope.ngModel && scope.option && scope.datasource) {

                        scope.selectedOption = ((scope.datasource.filter(
                            function (item) {

                                if (scope.get(item, scope.valueAttr) == scope.ngModel)
                                    return true;
                                return false;
                            }))[0]);
                        scope.option.selected = scope.selectedOption;
                    }
                }

            });


            //set selected option by selected value if changed
            scope.$watch('ngModel', function (newValue) {
                if (scope.multi) {
                    if (scope.ngModel && scope.ngModel?.length >= 1 && scope.option && scope.datasource) {


                        if (scope.selectedOption?.length == 1 && scope.option.selected?.length >= 1) {
                            scope.option.selected = scope.selectedOption
                        }
                        if (scope.ngModel && !scope.selectedOption && scope.datasource) {
                            for (var i = 0; i < scope.ngModel?.length; i++) {
                                if (!scope.selectedOption) {
                                    scope.selectedOption = []
                                }
                                scope.selectedOption.push(scope.datasource.filter(c => c[scope.valueAttr] == scope.ngModel[i])[0])
                                scope.option.selected = scope.selectedOption
                            }
                        }
                        //else {
                        //    scope.option.selected = scope.option.selected.filter(o => o[scope.valueAttr] == scope.selectedOption[scope.valueAttr])
                        //}
                    } else if (!scope.ngModel && scope.option.selected?.length > 0) {
                        scope.option.selected = []
                        scope.selectedOption = []
                    } else if (scope.datasource && scope.datasource.length == 0) {
                        scope.option.selected = []
                        scope.selectedOption = []
                    }
                } else {
                    if (scope.ngModel && scope.option && scope.datasource) {

                        scope.selectedOption = (scope.datasource.filter(
                            function (item) {
                                if (scope.get(item, scope.valueAttr) == scope.ngModel)
                                    return true;
                                return false;
                            }));
                        if (scope.selectedOption && scope.selectedOption.length == 1)
                            scope.option.selected = scope.selectedOption[0]
                        else if (scope.selectedOption && scope.selectedOption.length > 1) {
                            if (scope.option.selected && scope.option.selected.id)
                                scope.option.selected = scope.selectedOption.find(x => x.id == scope.option.selected.id)
                            else scope.option.selected = scope.selectedOption[0];
                        }
                    }
                    else {
                        scope.option = { selected: undefined };
                        scope.selectedOption = undefined;
                    }
                }
            });

            scope.clear = function ($event) {

                scope.ngModel = undefined;
                scope.selectedOption = undefined;
            }

            scope.clearForMulti = function (item) {

                scope.selectedOption = scope.selectedOption.filter(x => x[scope.valueAttr] != item[scope.valueAttr]);
                scope.option.selected = scope.selectedOption
                scope.ngModel = scope.ngModel.filter(x => x != item[scope.valueAttr])
            }

            scope.get = function (model, path, def) {
                path = path || '';
                model = model || {};
                def = typeof def === 'undefined' ? '' : def;
                var parts = path.split('.');
                if (parts.length > 1 && typeof model[parts[0]] === 'object') {
                    return scope.get(model[parts[0]], parts.splice(1).join('.'), def);
                } else {
                    return model[parts[0]] || def;
                }
            }
            scope.getForMulti = function (model, path, def, item) {
                var result;
                path = path || '';
                model = model || {};
                def = typeof def === 'undefined' ? '' : def;
                var parts = path.split('.');
                if (parts.length > 1 && typeof model[parts[0]] === 'object') {
                    result = scope.get(model[parts[0]], parts.splice(1).join('.'), def);
                } else {
                    result = item[parts[0]] || def;
                }
                //if (model && model?.length > 3) {
                //    result = "you select 3 or more options"
                //}
                return result;
            }
        }
    }
}]);