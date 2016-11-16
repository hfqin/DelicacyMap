/**
 * Created by HF Q on 2016/11/5.
 */
var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
angular.module('mainModule',[])
    .controller('MainCtrl',['$scope','$state',function($scope,$state){
        $scope.stars = [1,2,3,4,5];
        $scope.categories = ['全部商家','本帮菜','日本菜','咖啡厅','自助餐','川湘菜','火锅','海鲜','烧烤','西餐','其他'];
        $scope.location = "浦东新区蔡伦路1433号";


        var url = server + 'store/get';
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function (response) {
            	console.log(response);
                $scope.restaurants = [];
                for (var i=0;i<response.length;i++) {
                    $scope.restaurants[i] = {};
                    $scope.restaurants[i].rid = response[i].rid;
                }
            }
        });


        $scope.restaurants = [
            {
                'rid':1,
                'name':'快乐堡',
                'star':'95',
                'img':'https://fuss10.elemecdn.com/e/57/81f8dc8ef5dd1401626053024b805png.png?imageMogr2/thumbnail/70x70/format/webp/quality/85',
                'location':{'text':'蔡伦路1433号','lat':123.1,'lng':34.2},
                'avg':'15',
                'commentCounts':4,
                'tel':'15221871781',
                'wait':'15分钟'},
            {
                'rid':2,
                'name':'快乐堡',
                'star':'55',
                'img':'https://fuss10.elemecdn.com/e/57/81f8dc8ef5dd1401626053024b805png.png?imageMogr2/thumbnail/70x70/format/webp/quality/85',
                'location':'紫薇路高斯路',
                'avg':'15',
                'wait':'15分钟'},
            {
                'rid':3,
                'name':'快乐堡',
                'star':'78',
                'img':'https://fuss10.elemecdn.com/e/57/81f8dc8ef5dd1401626053024b805png.png?imageMogr2/thumbnail/70x70/format/webp/quality/85',
                'location':'申江路',
                'avg':'15',
                'wait':'15分钟'},
            {
                'rid':4,
                'name':'快乐堡',
                'star':'78',
                'img':'https://fuss10.elemecdn.com/e/57/81f8dc8ef5dd1401626053024b805png.png?imageMogr2/thumbnail/70x70/format/webp/quality/85',
                'location':'华佗路333号',
                'avg':'15',
                'wait':'15分钟'},
            {
                'rid':5,
                'name':'快乐堡',
                'star':'78',
                'img':'https://fuss10.elemecdn.com/e/57/81f8dc8ef5dd1401626053024b805png.png?imageMogr2/thumbnail/70x70/format/webp/quality/85',
                'location':'11',
                'avg':'15',
                'wait':'15分钟'},
            {
                'rid':6,
                'name':'快乐堡',
                'star':'78',
                'img':'https://fuss10.elemecdn.com/e/57/81f8dc8ef5dd1401626053024b805png.png?imageMogr2/thumbnail/70x70/format/webp/quality/85',
                'location':'11',
                'avg':'15',
                'wait':'15分钟'}];


        $scope.enterRestaurant = function(rid){
            $state.go('restaurant',{'rid':rid});
        }
    }]);
