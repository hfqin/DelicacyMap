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
    
    var start = 0;
    var limit = 4;
    
    var url = server + 'store/get';
    var json = {};
    json.start = start;
    json.limit = limit;
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(json),
        contentType: "application/json",
        dataType: 'json',
        success: function (response) {
        	console.log(response);
        	$scope.$apply(function(){
        		$scope.restaurants = [];
        		 for (var i=0;i<response.data.length;i++) {
                     $scope.restaurants[i] = {};
                     $scope.restaurants[i].rid = response.data[i].id;
                     $scope.restaurants[i].name = response.data[i].name;
                     $scope.restaurants[i].img = response.data[i].img;
                     $scope.restaurants[i].location = {};
                     $scope.restaurants[i].location.text = response.data[i].text;
                     $scope.restaurants[i].location.lat = response.data[i].lat
                     $scope.restaurants[i].location.lng = response.data[i].lng;
                     $scope.restaurants[i].commentNum = response.data[i].commentNum;
                     $scope.restaurants[i].tel = response.data[i].tel;
                     $scope.restaurants[i].category = response.data[i].category;
                     $scope.restaurants[i].wait = response.data[i].wait;
                 }
        		 start += response.data.length;
        	});                      
        	console.log($scope.restaurants);
        }
    });
   

    $scope.enterRestaurant = function(rid){
        $state.go('restaurant',{'rid':rid});
    }
    
    $scope.getMore = function() {
   	 	var url = server + 'store/get';
        var json = {};
        json.start = start;
        json.limit = limit;
   	 	$.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(json),
            contentType: "application/json",
            dataType: 'json',
            success: function (response) {
            	console.log(response);
            	$scope.$apply(function(){             
            		 for (var i=0;i<response.data.length;i++) {
                         $scope.restaurants[start+i] = {};
                         $scope.restaurants[start+i].rid = response.data[i].id;
                         $scope.restaurants[start+i].name = response.data[i].name;
                         $scope.restaurants[start+i].img = response.data[i].img;
                         $scope.restaurants[start+i].location = {};
                         $scope.restaurants[start+i].location.text = response.data[i].text;
                         $scope.restaurants[start+i].location.lat = response.data[i].lat
                         $scope.restaurants[start+i].location.lng = response.data[i].lng;
                         $scope.restaurants[start+i].commentNum = response.data[i].commentNum;
                         $scope.restaurants[start+i].tel = response.data[i].tel;
                         $scope.restaurants[start+i].category = response.data[i].category;
                         $scope.restaurants[start+i].wait = response.data[i].wait;
                     }
            		 start += response.data.length;
            	});                      
            	console.log($scope.restaurants);
            }
        });

   }

}]);