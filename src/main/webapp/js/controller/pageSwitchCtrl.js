/**
 * Created by HF Q on 2016/4/22.
 */
angular.module('pageSwitchModule',[])
.controller('PageSwitchCtrl',['$scope','$state',function($scope,$state){
    $scope.switch = function(item){
        console.log(item);

        if (item == 0) {
            $state.go('main');
        }

        if (item == 1) {
            $state.go('map');
        }

        if (item == 2) {
            $state.go('history');
        }

        if (item == 3) {
            $state.go('join');
        }
    }
}]);