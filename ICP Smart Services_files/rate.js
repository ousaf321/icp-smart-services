mainApp.directive('starRating', ['apiHelperService', '$translate', 'languageService', function (apiHelperService, $translate, languageService) {
    return {
        restrict: 'EA',
        template:
          '<div>{{message}}</div><div ng-hide="hideRating"><h3 dynamic="description"></h3><ul class="star-rating rating-sec" ng-class="{readonly: readonly}">' +
          '  <li ng-repeat="star in stars"  ng-class="star.classes" ng-click="toggle($index)">' +
          '    <i class="fa fa-star"></i>' +
          '  </li>' +
          '</ul><div class="form-group" ng-show="showRateButton"><textarea maxlength="500" class="form-control" rows="4" cols="50" ng-model="comment"></textarea></div><div class="form-group" ng-show="showRateButton"><a   ng-click="rate();" class="btn btn-danger btn-addon btn-sm pull-right bg-gd-dk" /><i class="fa fa-save"></i>{{saveText}}</div></div>',
        scope: {
            instanceId: '@',
            moduleId: '='
        },
        link: function (scope, element, attributes) {
            scope.saveText = 'Save';
            if (languageService.getCurrent() != 'en')
                scope.saveText = 'حفظ';


            var setDataSource = function () {
                scope.stars = [];
                for (var i = 0; i < scope.max; i++) {
                    scope.stars.push({
                        classes: getClasses(i < scope.ratingValue, i)
                    });
                    /*scope.setClass(scope.stars[i], i);*/
                }
            };

            function getClasses(filled, index) {
                var classes;

                if (scope.ratingType == 2)//star rating type 
                {

                    if (filled) {
                        classes = { 'star': true, 'starfilled': true, 'active': false };
                    }
                    else {
                        classes = { 'star': true, 'starfilled': false, 'active': false };
                    }
                    return classes;
                }
                else {

                    if (index == 0) {
                        classes = { 'face1': true, 'active': false };
                        return classes;

                    }
                    else if (index == 1) {
                        classes = { 'face2': true, 'active': false };
                        return classes;
                    }
                    else if (index == 2) {
                        classes = { 'face3': true, 'active': false };
                        return classes;
                    }
                }
            };

            var setActive = function (index) {
                for (var i = 0 ; i < scope.stars.length ; i++) {
                    if (i == index) {
                        scope.stars[i].classes.active = true;
                        scope.stars[i].classes.starfilled = i < scope.ratingValue && scope.ratingType == 2;
                    } else {
                        scope.stars[i].classes.active = false;
                        scope.stars[i].classes.starfilled = i < scope.ratingValue && scope.ratingType == 2;
                    }
                }
            };

            scope.toggle = function (index) {
                if (scope.readonly == undefined || scope.readonly === false) {
                    scope.ratingValue = index + 1;
                    //if (rating.typeId == 2)//star rating type 
                    //{
                    scope.showRateButton = true;
                    //}
                    //else {
                    //    scope.rate();
                    //}

                    /*for (var i = 0; i < scope.max; i++) {
                        scope.setClass(scope.stars[i], i, index);
                    }*/
                    setActive(index);
                }
            };

            scope.rate = function () {
                apiHelperService.post('rating/' + scope.ratingId + '/result/add', { ratingId: scope.ratingId, value: scope.ratingValue, comment: scope.comment, visitorIP: 'Client IP' }, {
                    success: function (response) {
                        scope.hideRating = true;
                        scope.message = $translate.instant('ratingMessage');
                        if (scope.moduleId == 25) {
                            //this cutomized for register arrivals service in guest 
                            window.location.href ="#/dashboard"
                        }
                    }
                });
            };

            scope.$watch('instanceId', function (oldValue, newValue) {
                if (oldValue) {
                    scope.ratingValue = undefined;
                    scope.hideRating = true;


                    var options = {
                        success: function (response) {//check if used by ip

                            rating = response;
                            if (rating && rating.id) {
                                if (!rating.description) {
                                    scope.hideRating = true;
                                }
                                else {
                                    scope.hideRating = false;
                                    scope.ratingId = rating.id;
                                    scope.ratingType = rating.typeId;
                                    scope.description = rating.description;

                                    if (rating.typeId == 2)//star rating type 
                                    {
                                        scope.max = 5;
                                        //scope.hideComment = false;
                                    }
                                    else //face rating type 
                                    {
                                        scope.max = 3;
                                    }
                                    setDataSource();
                                }
                            }
                        },
                        showSpinner: false,
                        params: { moduleId: scope.moduleId, instanceId: scope.instanceId }
                    };
                    if (scope.moduleId) {
                        apiHelperService.get('rating/get', options);
                    }

                    scope.readonly = false;
                }
            });
        }
    };
}])