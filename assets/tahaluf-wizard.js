
mainApp.directive('tahalufWizard', ['$state', 'languageService', 'notificationsService', '$translate', function ($state, languageService, notificationsService, $translate) {
    return {
        restrict: 'E',
        template:
            '<div class="row" ng-hide="hideAboveWizard">' +
            '     <ul  class="stepNav threeWide">' +
                    '<li id="firstSteptext" ng-class="{selected:activeFirstStep}"><a href="" title="">{{step1Text}}</a></li>' +
                    '<li id="secondSteptext" ng-class="{selected:activeSecondStep}"><a href="" title="">{{step2Text}}</a></li>' +
                    '<li id="thirdSteptext" ng-class="{selected:activeThirdStep}"><a href="" title="">{{step3Text}}</a></li>' +
               ' </ul>' +
               '</div>' +
            '<div id="status-buttons" ng-hide="hideDefaultWizard" class="text-center">' +
          '  <a  ng-repeat="step in visibleSteps" ng-class="{active: step.active, currentStep : step.current , previous : step.previous}" class="wizard-step{{$index}} {{step.stepClass}}">' +
          '<span></span>' +
          '{{step.title}}' +
          '</a>' +
          '</div>',
        scope: {
            steps: '=',
            control: '=',
            stepPercentage: '=',
            hideMessageOnNext: '='
            //step1Text: '=',
            //step2Text: '=',
            //step3Text: '='
        },
        link: function (scope, element, attributes) {
            scope.step1Text = 'First Step';
            scope.step2Text = 'Second Step';
            scope.step3Text = 'Third Step';
            if (languageService.getCurrent() != 'en') {
                scope.step1Text = 'الخطوة الأولى';
                scope.step2Text = 'الخطوة الثانية';
                scope.step3Text = 'الخطوة الثالثة';
            }

            scope.activeFirstStep = true;
            scope.activeSecondStep = false;
            scope.activeThirdStep = false;
            scope.stepPercentage = 0;
            scope.lastActiveStep = 1; 

            if (!scope.control)
                scope.control = {};
            function updateAboveWizard() {
                if (scope.visibleSteps.length > 2) {
                    switch (scope.visibleSteps.length) {
                        case 3:
                            scope.activeFirstStep = (scope.currentStep == 1); scope.activeSecondStep = (scope.currentStep == 2); scope.activeThirdStep = (scope.currentStep == 3);
                            break;
                        case 4:
                            scope.activeFirstStep = (scope.currentStep == 1); scope.activeSecondStep = (scope.currentStep == 2 || scope.currentStep == 3); scope.activeThirdStep = (scope.currentStep == 4);
                            break;
                        case 5:
                            scope.activeFirstStep = (scope.currentStep == 1 || scope.currentStep == 2); scope.activeSecondStep = (scope.currentStep == 3 || scope.currentStep == 4); scope.activeThirdStep = (scope.currentStep == 5);
                            break;
                        case 6:
                            scope.activeFirstStep = (scope.currentStep == 1 || scope.currentStep == 2); scope.activeSecondStep = (scope.currentStep == 3 || scope.currentStep == 4); scope.activeThirdStep = (scope.currentStep == 5 || scope.currentStep == 6);
                            break;
                        default:
                            scope.activeFirstStep = (scope.currentStep == 1 || scope.currentStep == 2); scope.activeSecondStep = (scope.currentStep == 3 || scope.currentStep == 4); scope.activeThirdStep = (scope.currentStep == 5 || scope.currentStep == 6 || scope.currentStep == 7);
                            break;
                    }
                }
                else if (scope.visibleSteps.length < 2)  
                        scope.hideDefaultWizard = true;
                 else  
                    scope.hideAboveWizard = true;
                 
            }
            function updateStepsDesign() {
                if (scope.visibleSteps) {
                    for (var i = 1; i <= scope.visibleSteps.length; i++) {
                        scope.visibleSteps[i - 1].current = false;
                        scope.visibleSteps[i - 1].previous = false;
                        if (i < scope.currentStep) {
                           
                            scope.visibleSteps[i - 1].active = true;
                        }
                        if (i == scope.currentStep) {
                            scope.visibleSteps[i - 1].current = true;
                            if (i >= 2) {
                                scope.visibleSteps[i - 2].previous = true;
                            }
                        }
                    }
                    updateAboveWizard();
                }
            };

            scope.next = function () {
                if (scope.currentStep < scope.visibleSteps.length) {

                    scope.currentStep = (scope.currentStep + 1);
                    if (scope.lastActiveStep < scope.currentStep) {
                        scope.lastActiveStep = (scope.lastActiveStep + 1);
                    }
                    updateStepsDesign();

                    $state.go(scope.visibleSteps[scope.currentStep - 1].url);
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0
                    if (!scope.hideMessageOnNext) {
                        var options = {
                            type: "success", duration: 1, messageBody: $translate.instant('addedDraftSuccessfully'), titleBody: ''
                        };
                        notificationsService.showNotification(options);
                    }
                }
            };

            scope.back = function () {
                if (scope.control.validate()) {
                    if (scope.currentStep != 1) {
                        scope.currentStep = (scope.currentStep - 1);

                        updateStepsDesign();

                        $state.go(scope.visibleSteps[scope.currentStep - 1].url);
                        document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0
                    }
                }
            };
            scope.populateVisibleSteps = function () {
                if (scope.steps) {
                    scope.visibleSteps = [];
                    for (var i = 0; i < scope.steps.length; i++) {
                        if (!scope.steps[i].hidden) {
                            scope.visibleSteps.push(scope.steps[i]);
                        }
                    }
                }
            }
            scope.$watch('steps', function (oldValue, newValue) {
                scope.populateVisibleSteps();
                if (scope.visibleSteps && scope.visibleSteps.length > 0) {
                    for (var i = 0; i < scope.visibleSteps.length; i++) {
                        if (scope.visibleSteps[i].url.toLowerCase() == $state.current.name.toLowerCase()) {
                            scope.currentStep = (i + 1);
                            break;
                        }
                    }

                    updateStepsDesign();

                    if (scope.stepUrl) {
                        if (scope.stepUrl == 'undefined') {
                            scope.control.goToStep(scope.visibleSteps[0].url);
                        }
                        scope.control.goToStep(scope.stepUrl);
                        scope.stepUrl = '';
                    }
                }
            });
            scope.$watch('currentStep', function (oldValue, newValue) {
                if (oldValue && scope.visibleSteps) {
                    scope.currentStep = oldValue;

                    updateStepsDesign();



                }
            });

            scope.$watch('lastActiveStep', function (oldValue, newValue) {
                if (scope.visibleSteps) {
                    for (var i = 1; i <= scope.visibleSteps.length; i++) {
                        if (i > scope.lastActiveStep) {
                            scope.visibleSteps[i - 1].active = false;
                        }
                    }

                    if (scope.visibleSteps.length > 0 && scope.currentStep)
                        scope.stepPercentage = Math.round(100 / scope.visibleSteps.length * (scope.currentStep - 1));
                    else {
                        scope.stepPercentage = 0;
                    }
                }

            });

            scope.$on('nextStep', function () {

                scope.next();
            });
            scope.$on('backStep', function () {

                scope.back();
            });

            scope.control.validate = function () {
                var _currentIndex = 1;
                for (var i = 0; i < scope.visibleSteps.length; i++) {
                    if (scope.visibleSteps[i].url.toLowerCase() == $state.current.name.toLowerCase()) {
                        _currentIndex = (i + 1);
                    }
                }
                if (_currentIndex > scope.lastActiveStep) {
                    scope.currentStep = scope.lastActiveStep;
                    $state.go(scope.visibleSteps[scope.lastActiveStep - 1].url);
                    for (var i = scope.lastActiveStep + 1; i <= scope.visibleSteps.length; i++) {
                        scope.visibleSteps[i - 1].current = false;
                        scope.visibleSteps[i - 1].active = false;
                    }
                    return false;
                }
                return true;
            }
            scope.control.updateCurrentStep = function () {

                var found = false;//in case request page not exsist in steps
                if (scope.visibleSteps && scope.visibleSteps.length > 0) {
                    for (var i = 0; i < scope.visibleSteps.length; i++) {
                        if (scope.visibleSteps[i].url.toLowerCase() == $state.current.name.toLowerCase()) {
                            found = true;
                            if (!(scope.currentStep = (i + 1)))
                                scope.currentStep = (i + 1);
                            break;
                        }
                    }
                    if (!found) {
                        $state.go(scope.visibleSteps[scope.currentStep - 1].url);
                    }
                }
            }

            scope.control.getNextStep = function () {
                if (scope.visibleSteps) {
                    for (var i = 0; i < scope.visibleSteps.length; i++) {
                        if (scope.visibleSteps[i].url.toLowerCase() == $state.current.name.toLowerCase()) {
                            return scope.visibleSteps[i + 1].url;
                        }
                    }
                }
                return '';
            }
            scope.control.getPreviousStep = function () {
                if (scope.visibleSteps) {
                    for (var i = 0; i < scope.visibleSteps.length; i++) {
                        if (scope.visibleSteps[i].url.toLowerCase() == $state.current.name.toLowerCase()) {
                            return scope.visibleSteps[i - 1].url;
                        }
                    }
                }
                return '';
            }
            scope.control.viewStep = function (url) { if (scope.visibleSteps) { $state.go(url); } }
            scope.control.goToStep = function (url) {
                if (scope.visibleSteps) {
                    var user = JSON.parse(localStorage.user);
                    if (user.flatMode) {
                        scope.lastActiveStep = 1;
                        scope.currentStep = 1;
                    }
                    else {
                        if (!url) url = scope.visibleSteps[0].url;
                        for (var i = 0; i < scope.visibleSteps.length; i++) {
                            if (scope.visibleSteps[i].url.toLowerCase() == url.toLowerCase()) {
                                scope.currentStep = scope.lastActiveStep = i + 1;
                                break;
                            }
                        }

                    }
                    var index = 1;
                    var notFound = true;
                    for (var i = 0; i < scope.visibleSteps.length; i++) {
                        if (scope.visibleSteps[i].url.toLowerCase() == $state.current.name.toLowerCase()) {
                            index = (i + 1);
                            notFound = false;
                            break;
                        }
                    }
                    if (!scope.currentStep) {
                        scope.currentStep = scope.lastActiveStep = 1;
                    }
                    if (index != scope.currentStep) {
                        $state.go(scope.visibleSteps[scope.currentStep - 1].url);
                    }
                    else if (index == 1 && notFound) {
                        $state.go(scope.visibleSteps[scope.currentStep - 1].url);
                    }
                    else {
                        updateStepsDesign();
                    }
                }
                else {
                    if (url)
                        scope.stepUrl = url;//in case of calling goToStep method before execute scope.$watch('steps')
                    else
                        scope.stepUrl = 'undefined';
                }
            }
        }
    };
}])