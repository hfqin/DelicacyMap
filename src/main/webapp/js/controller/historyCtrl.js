/**
 * Created by HF Q on 2016/11/17.
 */
angular.module('historyModule',[])
.controller('HistoryCtrl',['$scope',function($scope){
    $scope.useSelection = ['未使用', '已使用'];
    $scope.history = [
        {
            'use':0,
            'name':'快乐堡',
            'price':'25',
            'img':'img/ff.png',
            'time':'2016-11-17 14:21:34',
            'group':'6',
            'num':'A2015',
            'wait':'4'
        },
        {
            'use':1,
            'name':'渝利火锅',
            'price':'25',
            'img':'img/ff.png',
            'time':'2016-11-16 15:45:06',
            'group':'6',
            'num':'C1008',
            'wait':'4'
        },
    ];
}]);