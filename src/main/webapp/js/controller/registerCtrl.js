/**
 * Created by HF Q on 2016/4/25.
 */
var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
var image_file;
angular.module('registerModule', [])
    .controller('RegisterCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {

        $scope.register_uploadImg = function () {
            $('#register-upload-file-hidden').trigger('click');
        }

        var head_changed_flag = false;


        $scope.signUp = function () {
            var url = server + 'user/register';

            var json = {};
            json.phonenum = $scope.registerProfilePhone;
            json.username = $scope.registerProfileUsername;
            json.password = $scope.registerProfilePassword;
            console.log(json);
            $.post({
                url: url,
                data: JSON.stringify(json),
                contentType: "application/json",
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                    if (response.errcode == 0) {
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
                                    if (response.errcode == 0) {
                                        layer.msg('注册成功');
                                        $state.go('login');
                                    } else {
                                        layer.msg('注册成功！网络迟缓，请稍后重新设置头像~');
                                    }
                                }
                            });
                        } else {
                            layer.msg('注册成功');
                            $state.go('login');
                        }
                    } else {
                        layer.msg(response.errmsg);
                    }
                }

            });
        }

    }])

function register_preview_head() {
    var file = document.getElementById("register-upload-file-hidden").files[0];
    if (file) {
        if (file.type.substring(0, 5) == "image") {
            head_changed_flag = true;
            image_file = file;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                var urlData = this.result;
                document.getElementById("register-avatar-img").setAttribute("src", urlData);
            }
        }
        else {
            alert("只能上传图片...年轻人不要调皮！");
        }
    }
}
function register_uploadImg() {
    $('#register-upload-file-hidden').trigger('click');
}
