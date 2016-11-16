/**
 * Created by HF Q on 2016/11/6.
 */
angular.module('restaurantModule', [])
    .controller('RestaurantCtrl', ['$scope','$http', function ($scope,$http) {
        $scope.stars = [1, 2, 3, 4, 5];
        $scope.restaurant = {
            'rid': 1,
            'name': '快乐堡',
            'star': '65',
            'img': 'https://fuss10.elemecdn.com/e/57/81f8dc8ef5dd1401626053024b805png.png?imageMogr2/thumbnail/70x70/format/webp/quality/85',
            'location': '蔡伦路1433号',
            'avg': '15',
            'wait': '15分钟',
            'tel': '15221871781'
        };

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
            $http.get(server + "/commentListGet")
                .success(function (response) {
                    console.log(response);
                    if (response.error_type == 0) {
                        var commentList = response.commentList;
                        total = response.total;
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
                })
                .error(function (error) {

                })
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


        $scope.openReply = function (item) {
            console.log("click more " + item.index);

            $('#reply-panel' + item.index).toggle();
            if ($('#reply-panel' + item.index)[0].style.display == 'block') {
                $('#more' + item.index).html('收起');
            } else {
                $('#more' + item.index).html('展开');
            }

            var replys;
            $http.get(server + "/commentListGet").success(function (response) {
                replys = response.commentList;

                for (var i = 0; i < replys.length; i++) {
                    replys[i].time = replys[i].time.toString().split('T')[0] + " " + replys[i].time.toString().split('T')[0];
                }


                $scope.items[item.index].replys = replys;
                console.log(response);
                console.log(replys);
            }).error(function () {

            });

        }

        $scope.reply = function (item, index) {
            var commentedID = item.cid;
            var text = item.myReply;
            console.log(commentedID + " " + text);

            $http.get(server + "/commentSave")
                .success(function (response) {
                    console.log(response);
                    if (response.error_type == 0) {
                        layer.msg('回复成功');
                        item.myReply = "";
                        var newIndex = $scope.items[item.index].replys.length;
                        var newReply = response.comment;
                        newReply.time = newReply.time.toString().split('T')[0] + " " + newReply.time.toString().split('T')[1];
                        $scope.items[item.index].replys[newIndex] = newReply;
                    }
                })
                .error(function (error) {

                })
            console.log(text);


        }
        $scope.comment = function () {
            var text = $scope.commentContent;
            $http.get(server + "/commentSave")
                .success(function (response) {
                    console.log(response);
                    if (response.error_type == 0) {
                        layer.msg('评论成功');
                        $scope.commentContent = "";

                        var newIndex = $scope.items.length;
                        var newComment = response.comment;
                        $scope.items[newIndex] = {
                            index: newIndex,
                            cid: newComment.cid,
                            commentedId: 0,
                            headImg: newComment.headImg,
                            message: newComment.message,
                            time: newComment.time.toString().split('T')[0] + " " + newComment.time.toString().split('T')[1],
                            uid: newComment.uid,
                            username: newComment.username,
                            vid: newComment.vid,
                            replys: []
                        }
                    }
                })
                .error(function (error) {

                })
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