/// <reference path="angular.js" />

angular.module('mainApp').controller("landingServicesCtrl", ['$q', '$scope', '$translate', '$rootScope', 'apiHelperService',
        'notificationsService', '$location', 'lookupService', 'userApplicantService', '$ocLazyLoad', '$state', '$stateParams',
function ($q, $scope, $translate, $rootScope, apiHelperService,
    notificationsService, $location, lookupService, userApplicantService, $ocLazyLoad, $state, $stateParams) {
    $scope.container = {};
   

    apiHelperService.get('content/client/get?categoryTypeId=' + lookups.siteContentCategoryType + '&serviceTransactionIds=' + '' + '&categoryId=' + lookups.landingServiceCategory, {
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
        $scope.container.contents = [];
        for (var i = 0; i < $scope.contentStructure.length; i++) {
            if ($scope.contentStructure[i].parentId == $scope.container.id) {
                $scope.container.contents.push($scope.contentStructure[i]);
                      
                    }
            }
        }
    
    $scope.setContentText = function (content) {
        apiHelperService.get('content/client/' + content.id, {
            success: function (response) {
                content.contentText = response.contentText;
    }
        })
    };


   


}]);

