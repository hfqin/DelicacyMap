/**
 * Created by HF Q on 2016/4/22.
 */
var server = window.localStorage? localStorage.getItem("serverAddress"): Cookie.read("serverAddress");
angular.module('commentModule',[])
    .directive('appComment',function() {
        return{
            restrict:'EA',
            templateUrl:"template/directiveTpl/comment.tpl.html",
            controller:['$scope','$http','$routeParams',function($scope,$http,$routeParams){

                var start = 0;
                var limit = 8;
                var total=0;
                $scope.items=[];

                getMoreComments(start,limit);

                function getMoreComments(start,limit){
                    console.log(localStorage.getItem("serverAddress"));
                    console.log(server+"/commentListGet?vid="+$routeParams.vid+"&commentedId=0&start="+start+"&limit="+limit);
                    $http.get(server+"/commentListGet?vid="+$routeParams.vid+"&commentedId=0&start="+start+"&limit="+limit)
                        .success(function(response){
                            console.log(response);
                            if (response.error_type == 0) {
                                var commentList = response.commentList;
                                total = response.total;
                                for (var i=0;i<commentList.length;i++) {
                                    $scope.items[start+i]={
                                        index: i,
                                        cid: commentList[i].cid,
                                        commentedId:commentList[i].commentedId,
                                        headImg:commentList[i].headImg,
                                        message: commentList[i].message,
                                        time: commentList[i].time.toString().split('T')[0]+" "+commentList[i].time.toString().split('T')[1],
                                        uid:commentList[i].uid,
                                        username: commentList[i].username,
                                        vid:commentList[i].vid,
                                        replys: []}
                                }
                            }
                        })
                        .error(function(error){

                        })
                }


                $scope.commentGetMore = function(){
                    start = $scope.items.length;
                    if (start>=total) {
                        layer.msg("到底了！");
                        return;
                    } else {
                        getMoreComments(start,limit);
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
                    console.log(server+"/commentListGet?vid="+$routeParams.vid+"&commentedId="+item.cid);
                    $http.get(server+"/commentListGet?vid="+$routeParams.vid+"&commentedId="+item.cid).success(function(response){
                        replys = response.commentList;

                        for (var i=0;i<replys.length;i++) {
                            replys[i].time = replys[i].time.toString().split('T')[0]+" "+replys[i].time.toString().split('T')[0];
                        }


                        $scope.items[item.index].replys = replys;
                        console.log(response);
                        console.log(replys);
                    }).error(function(){

                    });

                }

                $scope.reply = function (item, index) {
                    var commentedID = item.cid;
                    var text = item.myReply;
                    console.log(commentedID +  " " + text);

                    $http.get(server+"/commentSave?vid="+$routeParams.vid+"&commentedId="+commentedID+"&message="+text)
                        .success(function(response){
                            console.log(response);
                            if (response.error_type == 0) {
                                layer.msg('回复成功');
                                item.myReply="";
                                var newIndex = $scope.items[item.index].replys.length;
                                var newReply = response.comment;
                                newReply.time = newReply.time.toString().split('T')[0]+" "+newReply.time.toString().split('T')[1];
                                $scope.items[item.index].replys[newIndex]=newReply;
                            }
                        })
                        .error(function(error){

                        })
                    console.log(text);



                }
                $scope.comment = function () {
                    var text = $scope.commentContent;
                    $http.get(server+"/commentSave?vid="+$routeParams.vid+"&commentedId=0&message="+text)
                        .success(function(response){
                            console.log(response);
                            if (response.error_type == 0) {
                                layer.msg('评论成功');
                                $scope.commentContent = "";

                                var newIndex = $scope.items.length;
                                var newComment = response.comment;
                                $scope.items[newIndex] = {
                                    index: newIndex,
                                    cid: newComment.cid,
                                    commentedId:0,
                                    headImg:newComment.headImg,
                                    message: newComment.message,
                                    time: newComment.time.toString().split('T')[0]+" "+newComment.time.toString().split('T')[1],
                                    uid:newComment.uid,
                                    username: newComment.username,
                                    vid:newComment.vid,
                                    replys: []}
                            }
                        })
                        .error(function(error) {

                        })
                    console.log(text);
                }
            }]
        };
    })
