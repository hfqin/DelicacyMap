/**
 * Created by HF Q on 2016/11/6.
 */
var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
angular.module('restaurantModule', [])
    .controller('RestaurantCtrl', ['$scope','$http', '$stateParams','$state','$rootScope',function ($scope,$http,$stateParams,$state,$rootScope) {
        $scope.stars = [1, 2, 3, 4, 5];

        var url = server + 'store/get/'+$stateParams.rid;
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: function (response) {
                console.log(response);
                if (response.errcode == 0) {
                	$scope.$apply(function(){
                		 $scope.restaurant = {};
                         $scope.restaurant.rid = response.data.id;
                         $scope.restaurant.category = response.data.category;
                         $scope.restaurant.name = response.data.name;
                         $scope.restaurant.star = response.data.star;
                         $scope.restaurant.img = response.data.img;
                         $scope.restaurant.lat = response.data.lat;
                         $scope.restaurant.lng = response.data.lng;
                         $scope.restaurant.location = response.data.location;
                         $scope.restaurant.avg = response.data.avg;
                         $scope.restaurant.wait = response.data.wait;
                         $scope.restaurant.tel = response.data.tel;
                         $scope.restaurant.commentNum = response.data.commentNum;
                	});               
                }
            }
        });


        $scope.galleryItems = [{'img':'img/head-square.jpg','name':'辣子鸡','price':'25元'},{'img':'img/head-square.jpg','name':'辣子鸡','price':'25元'},{'img':'img/head-square.jpg','name':'辣子鸡','price':'25元'},{'img':'img/head-square.jpg','name':'辣子鸡','price':'25元'},{'img':'img/head-square.jpg','name':'辣子鸡','price':'25元'},{'img':'img/head-square.jpg','name':'辣子鸡','price':'25元'},{'img':'img/head-square.jpg','name':'辣子鸡','price':'25元'},{'img':'img/head-square.jpg','name':'辣子鸡','price':'25元'}];

        var start = 0;
        var limit = 8;
        var total = 0;
        $scope.items = [
            {   'head':'img/head-square.jpg',
                'username':'ms_152211',
                'message':'好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好好吃好吃好吃好好吃好吃好吃好好吃好吃好吃好好吃好吃好吃好好吃好吃好吃好好吃好吃好吃好好吃好吃好吃好好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃',
                'time':'2016-11-7 13:40'},
            {   'head':'img/head-square.jpg',
                'username':'ms_152211',
                'message':'好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃',
                'time':'2016-11-7 13:40'},
            {   'head':'img/head-square.jpg',
                'username':'ms_152211',
                'message':'好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃',
                'time':'2016-11-7 13:40'},
            {   'head':'img/head-square.jpg',
                'username':'ms_152211',
                'message':'好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃好吃',
                'time':'2016-11-7 13:40'}];

        getMoreComments(start, limit);

        function getMoreComments(start, limit) {
            console.log(localStorage.getItem("serverAddress"));

            var url = server + 'comment/get';
            var json = {"id": $stateParams.rid};
            $.ajax({
                type: 'POST',
                data: JSON.stringify(json),
                contentType: "application/json",
                url: url,
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                    if (response.errcode == 0) {
                        var commentList = response.data.commentList;
                        total = response.data.total;
                        for (var i = 0; i < commentList.length; i++) {
                            $scope.items[start + i] = {
                                index: i,
                                cid: commentList[i].cid,
                                commentedId: commentList[i].commentedId,
                                headImg: commentList[i].headImg,
                                message: commentList[i].message,
                                time: commentList[i].time.toString().split('T')[0] + " " + commentList[i].time.toString().split('T')[1],
                                uid: commentList[i].uid,
                                username: commentList[i].username,
                                vid: commentList[i].vid,
                                replys: []
                            }
                        }
                    }
                }
            });
        }


        $scope.commentGetMore = function () {
            start = $scope.items.length;
            if (start >= total) {
                layer.msg("到底了！");
                return;
            } else {
                getMoreComments(start, limit);
            }
        }



        $scope.comment = function () {
            var text = $scope.commentContent;

            var url = server + 'comment/add';
            var json = {};
            json.content = text;
            json.storeId = $stateParams.rid;
            json.score = 78;
            
            $.ajax({
                type: 'POST',
                url: url,
                data: JSON.stringify(json),
                contentType: "application/json",
                dataType: 'json',
                success: function (response) {
                    console.log(response);         
                    if (response.errcode == 0) {
                    	$scope.$apply(function(){
                    		$scope.commentContent = "";

                             var newIndex = $scope.items.length;
                              var newComment = response.data;
                              $scope.items[newIndex] = {
                                  index: newIndex,
                                  cid: newComment.cid,
                                  commentedId: 0,
                                  headImg: $rootScope.head,
                                  message: newComment.content,
                                  time: newComment.createTime,
                                  score: newComment.score,
                                  uid: newComment.uid,
                                  username: newComment.username,
                                  vid: newComment.vid,
                                  replys: []
                              }
                          });
                        layer.msg('评论成功');
                        
                    } else if (response.errcode == 304) {
                    	layer.msg('未登录！');
                    	$rootScope.isLogin = false;

                        if (window.localStorage) {
                            console.log("localStorage ", "login");
                            localStorage.setItem("isLogin", "offline");
                        } else {
                            console.log("cookie");
                            Cookie.write("isLogin", "offline");
                        }
                    	$state.go('login');
                    }
                }
            });

            console.log(text);
        }


        // 地图模块开始---------------------------------------------------------------------------------------

        var map = new BMap.Map("restaurantMap");          // 创建地图实例
        var point = new BMap.Point(121.48, 31.22);  // 创建点坐标
        map.centerAndZoom(point, 14);                 // 初始化地图，设置中心点坐标和地图级别
        map.setCurrentCity("上海"); // 设置地图显示的城市 此项是必须设置的

        // 缩放控件
        var opts1 = {offset: new BMap.Size(10, 10)};
        map.addControl(new BMap.NavigationControl(opts1));

        // 比例尺控件
        var opts2 = {offset: new BMap.Size(50, 40)};
        map.addControl(new BMap.ScaleControl(opts2));

        // 餐馆位置标记
        var myMarker = new BMap.Marker(point);
        map.addOverlay(myMarker);
        map.panTo(point);


        // 地图模块结束---------------------------------------------------------------------------------------

    }]);