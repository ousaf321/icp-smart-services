/// <reference path="angular.js" />

angular.module('mainApp').controller("sliderSiteContentCtrl", ['$q', '$scope', '$translate', '$rootScope', 'apiHelperService',
        'notificationsService', '$location', 'lookupService', 'userApplicantService', '$ocLazyLoad', '$state', '$stateParams',
function ($q, $scope, $translate, $rootScope, apiHelperService,
    notificationsService, $location, lookupService, userApplicantService, $ocLazyLoad, $state, $stateParams) {
    $scope.container = {};
    apiHelperService.get('content/client/get?categoryTypeId=' + lookups.siteContentCategoryType + '&categoryId=' + lookups.sliderCategory, {
        success: function (response) {
            $scope.contentStructure = response;
            for (var i = 0; i < $scope.contentStructure.length; i++) {
                if ($scope.contentStructure[i].level == 1) {
                    $scope.container = $scope.contentStructure[i];
                    $scope.setChilds();
                    break;
                }
            };
        }
    });

  
    $scope.setChilds = function () {
        $scope.container.slides = [];
        for (var i = 0; i < $scope.contentStructure.length; i++) {
            if ($scope.contentStructure[i].parentId == $scope.container.id) {
             
                apiHelperService.get('content/client/' + $scope.contentStructure[i].id, {
                    success: function (response) {
                        $scope.container.slides.push({ contentText: response.contentText });
                      
                    }
                })
            }
        }
    }
}]);

