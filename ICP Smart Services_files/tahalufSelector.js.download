mainApp.directive('tahalufSelect', ['$timeout', '$q', function ($timeout, $q) {

    return {
        restrict: 'E',
        scope: {
            selectDatasource: '=',
            ngModelSelector: '=',
            ngModelText: '=',
            labelAttr: '@',
            valueAttr: '@',
            codeAttr: '@',
            ngDisabled: '=?',
            refresh: '&?',
            isAutocompleteTheme: "=?",
            placeHolder: '@',
            onSelect: '&',
        },
        transclude: true,
        template: "<div class='input-group tahalufselectdrop'><span class='input-group-addon tahalufselect'><input ng-disabled='ngDisabled' ng-blur='codeChanged($select)' ng-model='ngModelText' class='' type='text' /></span>" +

            '<div ng-if="!isAutocompleteTheme">' +
          '<ui-select  ng-disabled="ngDisabled" ng-model="option.selected" theme="select2" title="{{title}}" on-select="selectChange($item)">' +

                     '<ui-select-match placeholder="{{placeHolder|translate}}">{{$select.selected[labelAttr]}}' +
                    ' <button tabindex="-1" type="button" ng-hide="ngDisabled" ng-click="clear($event)"><i class="fa fa-times" aria-hidden="true"></i></button></ui-select-match>' +
                '<ui-select-choices  refresh="doRefresh($select.search,code,$select,callback)" repeat="option in selectDatasource | filter: $select.search">' +
                    ' <span ng-bind-html="option[labelAttr] | highlight: $select.search"></span>' +
                '  </ui-select-choices>' +
         '</ui-select>' +
          '</div>' +
           '<div ng-if="isAutocompleteTheme">' +
          '<ui-select autofocus="false"  ng-disabled="ngDisabled" ng-model="option.selected" theme="selectize" title="{{title}}" on-select="selectChange($item)">' +

                     '<ui-select-match placeholder="{{\'pleaseSelect\'|translate}}">{{$select.selected[labelAttr]}}' +
                    ' <button  tabindex="-1" type="button" ng-hide="ngDisabled" ng-click="clear($event)"><i class="fa fa-times" aria-hidden="true"></i></button></ui-select-match>' +
                '<ui-select-choices  refresh="doRefresh($select.search,code,$select,callback)" repeat="option in selectDatasource | filter: $select.search">' +
                    ' <span ng-bind-html="option[labelAttr] | highlight: $select.search"></span>' +
                '  </ui-select-choices>' +
         '</ui-select>' +
          '</div>' +
         '<div ng-transclude class="hide-input"></div></div>',
        link: function (scope, element, attributes) {

            if (attributes.placeHolder == undefined)
                attributes.$set("placeHolder", "pleaseSelect");

            scope.option = { selected: null };

            //moayad 13/12/2016
            //fix tab index on tab click
            if (element[0].querySelector('.hide-input input'))
                element[0].querySelector('.hide-input input').setAttribute('tabindex', '-1');

            if (attributes.labelAttr == undefined) {
                attributes.$set("labelAttr", "text");
            }
            if (attributes.valueAttr == undefined) {
                attributes.$set("valueAttr", "id");
            }
            if (attributes.codeAttr == undefined) {
                attributes.$set("codeAttr", "code");
            }



            //set selected option and selected value if user change option in ddl
            scope.$watch('option.selected', function (newValue) {


                if (scope.option.selected) {
                    scope.ngModelSelector = scope.option.selected[scope.valueAttr];
                    scope.onSelect({ item: scope.option.selected[scope.valueAttr] });
                }

            });

            scope.doRefresh = function (text, code, select, callback) {
                if (scope.refresh)
                    var defer = scope.refresh({ text: text, code: code, callback: callback });

                if (defer) {
                    defer.then(function (result) {
                        if (select) {
                            select.activate();
                        }
                    });
                }
            }

            scope.selectChange = function () {

                if (scope.selectDatasource) {
                    if (scope.selectDatasource.length != undefined) {
                        var selectedOpt = ((scope.selectDatasource.filter(
                                           function (item) {

                                               if (item[scope.valueAttr] === scope.ngModelSelector)
                                                   return true;
                                               return false;
                                           }))[0]);
                        if (selectedOpt != undefined) {
                            scope.ngModelSelector = scope.ngModelSelector;
                            scope.ngModelText = selectedOpt[scope.codeAttr];

                            scope.option.selected = selectedOpt;
                        }
                        else {
                            scope.ngModelText = null;
                        }                   
                    }
                }
            }

            scope.codeChanged = function (select) {
                if (!scope.ngModelText || scope.ngModelText.length == 0) {

                    scope.clear();
                }


                if (scope.refresh) {
                    scope.doRefresh(null, scope.ngModelText, select, function (result) {
                        scope.selectDatasource = result;
                        if (scope.selectDatasource != null) {
                            var selectedOpt = ((scope.selectDatasource.filter(
                                               function (item) {
                                                   if (scope.ngModelText && item[scope.codeAttr] == scope.ngModelText.toUpperCase())
                                                       return true;
                                                   return false;
                                               }))[0]);
                            if (selectedOpt != undefined) {
                                scope.ngModelSelector = selectedOpt[scope.valueAttr];

                                scope.option.selected = selectedOpt;
                            }
                            else {
                                scope.clear();
                            }
                        }
                    });
                } else {
                    if (scope.selectDatasource != null) {
                        var selectedOpt = ((scope.selectDatasource.filter(
                                           function (item) {
                                               if (scope.ngModelText && item[scope.codeAttr] == scope.ngModelText.toUpperCase())
                                                   return true;
                                               return false;
                                           }))[0]);
                        if (selectedOpt != undefined) {
                            scope.ngModelSelector = selectedOpt[scope.valueAttr];

                            scope.option.selected = selectedOpt;
                        }
                        else {
                            scope.clear();
                        }
                    }
                }

            }

            scope.$watchGroup(['selectDatasource'], function (newValues, oldValues, scope) {
                if (scope.ngModelSelector) {
                    if (scope.selectDatasource) {
                        if (scope.selectDatasource.length != undefined) {
                            var selectedOpt = ((scope.selectDatasource.filter(
                                               function (item) {

                                                   if (item[scope.valueAttr] === scope.ngModelSelector)
                                                       return true;
                                                   return false;
                                               }))[0]);
                            if (selectedOpt != undefined) {
                                scope.ngModelSelector = scope.ngModelSelector;
                                scope.ngModelText = selectedOpt[scope.codeAttr];

                                scope.option.selected = selectedOpt;
                            }
                            else {
                                scope.clear();
                            }
                        }
                    }
                }
                else {
                    scope.clear();
                }
            });


            //set selected option by selected value if changed
            scope.$watch('ngModelSelector', function (newValue) {

                if (scope.ngModelSelector) {
                    if (scope.selectDatasource) {
                        if (scope.selectDatasource.length != undefined) {
                            var selectedOpt = ((scope.selectDatasource.filter(
                                               function (item) {

                                                   if (item[scope.valueAttr] === scope.ngModelSelector)
                                                       return true;
                                                   return false;
                                               }))[0]);
                            if (selectedOpt != undefined) {
                                scope.ngModelSelector = scope.ngModelSelector;
                                scope.ngModelText = selectedOpt[scope.codeAttr];

                                scope.option.selected = selectedOpt;
                            }
                            //commented By : Adel Suleiman
                            //Reason : in case ngModelSelector has value but the datasource not yet filled we should not clear the ngModelSelector since we will lose the data once the datasource filled in later stage.
                            //else {
                            //    scope.clear();
                            //}
                        }
                    }
                }
                else {
                    scope.clear();
                }

            });


            scope.clear = function ($event) {

                scope.ngModelSelector = undefined;
                scope.ngModelText = undefined;
                scope.option = { selected: undefined };
            }
        }

    }
}]);