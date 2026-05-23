angular.module('mainApp').directive('tahalufTreeViewer', ['apiHelperService', 'ivhTreeviewMgr', function (apiHelperService, ivhTreeviewMgr) {
    return {
        restrict: 'EA',
        scope: {
            treeDatasource: '=',
            expanddepth: '=',
            selectedLeav: '=',
            selectedItems: '=',
            selectedIds: '=',
            selectedLeavesIds: '=',
            treeIdprefix: '='
        },
        template: ' <input type="text" ng-model="myQuery" class="form-control" placeholder="{{ \'Search\' | translate }}"><div class="mt15 clearfix"></div><div ivh-treeview=\'treeDatasource\' ivh-treeview-expand-to-depth=\'expanddepth\' ivh-treeview-on-cb-change=\'callOnChange(ivhNode, ivhIsSelected, ivhTree)\' ivh-treeview-filter="myQuery"></div>',
        link: function (scope, elm, attrs) {

            scope.$watch('treeDatasource', function () {
                var arrserviceTransactionsIds = [];
                if (scope.selectedIds != undefined && scope.selectedIds.length > 0) {
                    for (var i = 0; i < scope.selectedIds.length; i++) {
                        arrserviceTransactionsIds.push(scope.treeIdprefix + scope.selectedIds[i]);
                    }
                }
                ivhTreeviewMgr.selectEach(scope.treeDatasource, arrserviceTransactionsIds);
                scope.callOnChange(null, null, scope.treeDatasource);
            });
            scope.callOnChange = function (ivhNode, ivhIsSelected, ivhTree) {
                var checkedNodes = [];
                var checkedallNodes = [];

                scope.selectedLeav = null;
                scope.selectedLeavesIds = null;
                scope.selectedItems = null;

                if (!scope.selectedLeav)
                    scope.selectedLeav = [];
                if (!scope.selectedLeavesIds)
                    scope.selectedLeavesIds = [];
                if (!scope.selectedItems)
                    scope.selectedItems = [];

                var nodes = ivhTree;
                checkedLeavNodeIds(nodes, checkedNodes);
                checkedItemsIds(nodes, checkedallNodes);

                if (checkedNodes.length > 0) {
                    scope.selectedLeav.push(checkedNodes);
                    for (var x = 0; x < checkedNodes.length; x++)
                        scope.selectedLeavesIds.push(checkedNodes[x].id.substring(2));
                } else {
                    message = "No nodes checked.";
                    scope.selectedLeav.push([]);
                    scope.selectedLeavesIds.push([]);
                }


                if (checkedallNodes.length > 0) {
                    scope.selectedItems.push(checkedallNodes);
                } else {
                    message = "No nodes checked.";
                    scope.selectedItems.push([]);
                }
            }

            function checkedLeavNodeIds(nodes, checkedNodes) {
                if (nodes != undefined) {


                    for (var i = 0; i < nodes.length; i++) {
                        if (nodes[i].children != null && nodes[i].children.length > 0) {
                            checkedLeavNodeIds(nodes[i].children, checkedNodes);
                        }
                        if (nodes[i].selected && !(nodes[i].children != null && nodes[i].children.length > 0)) {
                            checkedNodes.push(nodes[i]);
                        }
                    }
                }
            }

            function checkedItemsIds(nodes, checkedallNodes) {
                if (nodes != undefined) {
                    for (var i = 0; i < nodes.length; i++) {
                        if (nodes[i].selected) {
                            checkedallNodes.push(nodes[i]);
                        }
                        if (nodes[i].children != null && nodes[i].children.length > 0) {
                            checkedItemsIds(nodes[i].children, checkedallNodes);
                        }
                    }
                }
            }

        }
    }

}]);

mainApp.config(function (ivhTreeviewOptionsProvider) {
    ivhTreeviewOptionsProvider.set({
        defaultSelectedState: false,
        validate: true
    });
});