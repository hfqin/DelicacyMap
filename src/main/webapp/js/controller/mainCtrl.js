/**
 * Created by HF Q on 2016/11/5.
 */
var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
angular.module('mainModule',[])
    .controller('MainCtrl',['$scope','$state',function($scope,$state){
        $scope.stars = [1,2,3,4,5];
        $scope.categories = ['全部商家','本帮菜','日本菜','咖啡厅','自助餐','川湘菜','火锅','海鲜','烧烤','西餐','其他'];
        $scope.location = "浦东新区蔡伦路1433号";


        var geolocation = new BMap.Geolocation();
        var myPoint = new BMap.Point(121.48789949, 31.24916171);

        var located = false;

        setInterval(function () {
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    myPoint = r.point;
                    located = true;
                    //console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
                }
            }, {enableHighAccuracy: true})
        },1000);

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
