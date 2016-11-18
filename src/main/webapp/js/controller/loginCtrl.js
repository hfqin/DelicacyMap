/**
 * Created by HF Q on 2016/4/14.
 */
var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
angular.module('loginModule', [])
    .controller('LoginCtrl', ['$scope', '$state', '$rootScope', '$http', function ($scope, $state, $rootScope, $http) {
        console.log(server);

        $scope.signIn = function () {

            var phone = $scope.inputPhone;
            var password = $scope.inputPassword;
            if (phone == null || phone == "") {
                layer.msg("手机号不能为空");
                return;
            }
            if (password == null || password == "") {
                layer.msg("密码不能为空");
                return;
            }

            var url = server +'user/login';
            var json = {};
            json.phonenum = phone;
            json.password = password;
            $.post({
                url: url,
                data: JSON.stringify(json),
                contentType: "application/json",
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                    if (response.errcode == 0) {
                        $rootScope.isLogin = true;
                        $rootScope.username = response.data.username;
                        if (response.data.headImg != null && response.data.headImg != undefined && response.data.headImg != '') {
                            $rootScope.head = server + response.data.headImg;
                        } else {
                            $rootScope.head = './img/default_head.jpg';
                        }

                        if (window.localStorage) {
                            console.log("localStorage ", "login");
                            localStorage.setItem("isLogin", "login");
                            localStorage.setItem("username", response.data.username);
                            localStorage.setItem("head", $rootScope.head);
                        } else {
                            console.log("cookie");
                            Cookie.write("isLogin", "login");
                            Cookie.write("username", response.data.username);
                            Cookie.write("head", $rootScope.head);
                        }

                        $state.go('main');
                    } else {
                    	layer.msg('登录失败！');
                    }
                }
            });



        }

        $scope.signUp = function () {
            $state.go('register');
        }
    }]);