/**
 * Created by HF Q on 2016/11/5.
 */
angular.module('mapModule',[])
.controller('MapCtrl',['$scope','$state',function($scope,$state){
    var map = new BMap.Map("myMap");          // 创建地图实例
    var point = new BMap.Point(121.48, 31.22);  // 创建点坐标
    map.centerAndZoom(point, 14);                 // 初始化地图，设置中心点坐标和地图级别
    map.setCurrentCity("上海"); // 设置地图显示的城市 此项是必须设置的
    var opts1 = {offset: new BMap.Size(10, 320)}
    var opts2 = {offset: new BMap.Size(10, 320)}
    var opts3 = {offset: new BMap.Size(5, 350), enableAutoLocation: true} //定位控件位置
    map.addControl(new BMap.NavigationControl(opts1));

    var scaleControl = new BMap.ScaleControl(opts2);
    map.addControl(scaleControl);


    // 设置定位控件 start
    var geolocationControl = new BMap.GeolocationControl(opts3);

    geolocationControl.addEventListener("locationSuccess", function (e) {
        // 定位成功事件
        console.log(e.addressComponent);
        locateMe(true);

    });

    var geolocation = new BMap.Geolocation();
    $scope.myPoint = new BMap.Point(121.48, 31.22);

    function locateMe(forceLocate) {
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var myMarker = new BMap.Marker(r.point);
                // map.clearOverlays();
                map.addOverlay(myMarker);

                map.panTo(r.point);

                $scope.myPoint  = r.point;
                console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
            }
        }, {enableHighAccuracy: true})
    }

    locateMe(false);

    map.addControl(geolocationControl);

    $scope.stars = [1,2,3,4,5];
    $scope.categories = ['智能排序','近距离优先','评分优先','价格从低到高','等候时间优先'];
    $scope.location = "浦东新区蔡伦路1433号";
    $scope.restaurants = [
        {
            'rid':1,
            'name':'快乐堡',
            'star':'95',
            'img':'https://fuss10.elemecdn.com/e/57/81f8dc8ef5dd1401626053024b805png.png?imageMogr2/thumbnail/70x70/format/webp/quality/85',
            'location':'蔡伦路1433号',
            'avg':'15',
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