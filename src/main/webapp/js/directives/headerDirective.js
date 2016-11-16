/**
 * Created by HF Q on 2016/4/22.
 */

var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
angular.module('headerModule', ['registerModule', 'loginModule', 'pageSwitchModule'])
    .directive('appHeader', function () {
        return {
            restrict: 'EA',
            templateUrl: "template/directiveTpl/header.tpl.html"
        };
    })
    .controller('HeaderCtrl', ['$scope', '$state', '$rootScope', function ($scope, $state, $rootScope) {


        console.log(server);

        $scope.logout = function () {

            var url = server + 'user/logout';
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                    if (response.errcode == 0) {
                        console.log("logout");
                        $rootScope.isLogin = false;

                        if (window.localStorage) {
                            console.log("localStorage ", "login");
                            localStorage.setItem("isLogin", "offline");
                        } else {
                            console.log("cookie");
                            Cookie.write("isLogin", "offline");
                        }

                        if ($state.includes('profile')) {
                            $state.go('main');
                        }
                    }
                }
            });

        }
    }])