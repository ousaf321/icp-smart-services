angular.module('mainApp').controller('annoucementCtrl', ['$scope', '$rootScope', 'apiHelperService', '$location', '$sce',
    function ($scope, $rootScope, apiHelperService, $location, $sce) {

        $rootScope.CurrentController(['annoucement']);

        $scope.announcementsCollection = [];
        $scope.showButton = false;
        $scope.showMessageContent = false;
        $scope.showNoRec = false;
        getAnnouncements();

        function getAnnouncements() {
            var options = {
                success: function (response) {
                    if (response && response.length > 0) {
                        $scope.announcementsCollection = response;
                        let index = 0;
                        for (var i = 0; i < $scope.announcementsCollection.length; i++) {
                            $scope.announcementsCollection[i].selected = false;

                            if ($scope.announcementsCollection[i].id == $location.search().announcementId)
                                index = i;
                        }

                        //Open first announcment
                        $scope.announcementsCollection[index].selected = true;
                        $scope.showMessageContent = true;
                        $scope.trustedHtml = $sce.trustAsHtml($scope.announcementsCollection[0].announcementLanguage.announcementDescription);
                    } else {
                        $scope.showNoRec = true;
                    }
                },
                params: angular.extend({
                    announcementType: lookups.AnnouncementTypes.announcement
                })
            };
            apiHelperService.get('announcement/getActive', options);
        };

        $scope.setDetailsForSelectedAnnouncement = function (announcement) {
            for (var i = 0; i < $scope.announcementsCollection.length; i++) {
                $scope.announcementsCollection[i].selected = false;
                if ($scope.announcementsCollection[i].id == announcement.id) {
                    $scope.announcementsCollection[i].selected = true;
                }
            }
            $scope.showButton = false;
            $scope.showMessageContent = true;
            $scope.trustedHtml = $sce.trustAsHtml(announcement.announcementLanguage.announcementDescription);
            announcement.showNotification = !announcement.showNotification;
        };

        $scope.hideMessageContent = function () {
            $scope.showButton = true;
            $scope.showMessageContent = false;
        };
    }]);