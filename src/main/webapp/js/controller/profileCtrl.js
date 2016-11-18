/**
 * Created by HF Q on 2016/11/13.
 */
var image_file;
angular.module('profileModule',[])
.controller('ProfileCtrl',['$scope', '$rootScope', '$state',function($scope,$rootScope,$state){
    var text = ['展开', '收起'];
    var showIndex = 0;
    $scope.showPasswordText = text[showIndex];
    $scope.showPasswordBtn = function() {
        $scope.showPassword = !$scope.showPassword;
        showIndex = (showIndex + 1) % 2;
        $scope.showPasswordText = text[showIndex];
    }

    var head_changed_flag = false;


    var url = server + 'user/status';
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function (response) {
            console.log(response);
            if (response.errcode == 0) {
                console.log("login");
                $rootScope.isLogin = true;
                $rootScope.username = response.data.username;
                if (response.data.headImg != null && response.data.headImg != undefined && response.data.headImg != '') {
                    $rootScope.head = server+response.data.headImg;
                } else {
                    $rootScope.head = './img/default_head.jpg';
                }
                          
                $scope.$apply(function() {
                	 $scope.profilePhone = response.data.phonenum;
                     $scope.profileUsername = response.data.username;
                     if (response.data.headImg != null && response.data.headImg != undefined && response.data.headImg != '') {               
                         $scope.profileHead = server+response.data.headImg;
                     } else {
                         $scope.profileHead = './img/default_head.jpg';
                     }
                });
                
            } else {
                $rootScope.isLogin = false;
                $state.go('login');
            }
        }
    });


    $scope.saveModify = function () {
        var url = server + 'user/update';

        var json = {};
        json.phonenum = $scope.profilePhone;
        json.username = $scope.profileUsername;
        json.oldPassword = $scope.oldProfilePassword;
        json.newPassword = $scope.newProfilePassword;
        console.log(json);

        if (!((json.oldPassword == undefined && json.newPassword == undefined) || (json.oldPassword != undefined && json.newPassword != undefined))) {
        	layer.msg('修改密码请填写完整！');
        	return;
        }
        
        $.post({
            url: url,
            data: JSON.stringify(json),
            contentType: "application/json",
            dataType: 'json',
            success: function (response) {
                console.log(response);
                if (response.errcode == 0) {
                	$rootScope.$apply(function(){
                		 $rootScope.isLogin = true;
                         $rootScope.username = response.data.username;
                	});
                	
                	if (window.localStorage) {
                         console.log("localStorage ", "login");
                         localStorage.setItem("isLogin", "login");
                         localStorage.setItem("username", response.data.username);                  
                    } else {
                    	console.log("cookie");
                    	Cookie.write("isLogin", "login");
                    	Cookie.write("username", response.data.username);
                    }
                    console.log("loading head img ...");
                    if (image_file != undefined) {
                        var fd = new FormData(); //初始化一个FormData实例
                        fd.append('file', image_file);

                        $.ajax({
                            url: server + 'user/uploadImg',
                            type: 'POST',
                            data: fd,
                            async: false,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (response) {
                            	console.log(response);
                                if (response.errcode == 0) {
                                    layer.msg('保存成功');
                                    $rootScope.$apply(function(){
                                    	$rootScope.head = server + response.data;
                                    });
                                    
                                    if (window.localStorage) {
                                        console.log("localStorage ", "login");
                                        localStorage.setItem("isLogin", "login");
                                        localStorage.setItem("head", $rootScope.head);
                                    } else {
                                        console.log("cookie");
                                        Cookie.write("isLogin", "login");
                                        Cookie.write("head", $rootScope.head);
                                    }
                                } else {
                                    layer.msg('基本信息保存成功！网络迟缓，请稍后重新设置头像~');
                                }
                            }
                        });
                    } else {
                        layer.msg('保存成功');
                    }
                } else {
                    layer.msg(response.errmsg);
                }
            }

        });
    }

}]);

function profile_preview_head() {
    var file = document.getElementById("profile-upload-file-hidden").files[0];
    if (file) {
        if (file.type.substring(0, 5) == "image") {
            head_changed_flag = true;
            image_file = file;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                var urlData = this.result;
                document.getElementById("profile-avatar-img").setAttribute("src", urlData);
            }
        }
        else {
            alert("只能上传图片...年轻人不要调皮！");
        }
    }
}
function profile_uploadImg() {
    $('#profile-upload-file-hidden').trigger('click');
}
