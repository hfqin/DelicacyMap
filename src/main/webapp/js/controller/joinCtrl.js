/**
 * Created by HF Q on 2016/11/17.
 */
var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
var image_file;
angular.module('joinModule',[])
.controller('JoinCtrl',['$scope',function($scope){
	
	$scope.categories = [{'index':1,'text':'本帮菜'},{'index':2,'text':'日本菜'},{'index':3,'text':'咖啡厅'},{'index':4,'text':'自助餐'},{'index':5,'text':'川湘菜'},{'index':6,'text':'火锅'},{'index':7,'text':'海鲜'},{'index':8,'text':'烧烤'},{'index':9,'text':'西餐'},{'index':10,'text':'其他'}];
	$scope.categoryText = "未选择";
	$scope.join = function() {
		var url = server + 'store/add';
		var json = {};
		json.name = $scope.name;
		json.text = $scope.location;
		json.lat = $scope.lat;
		json.lng = $scope.lng;
		json.avg = $scope.avg;
		json.tel = $scope.tel;
		json.category = $scope.category;
		json.desricption = $scope.description;
		json.validCode = $scope.validCode;
		$.ajax({
			 type: 'POST',
             data: JSON.stringify(json),
             contentType: "application/json",
             url: url,
             dataType: 'json',
             success: function(response){
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
                                     layer.msg('审核成功');                            
                                 } else {
                                     layer.msg('审核成功！网络迟缓，请稍后重新设置餐馆图片~');                                
                                 }
                             }
                         });
                     }
            	 } else {
            		 layer.msg('审核失败！');
            	 }
             }
		});
	}
	
	
	$scope.selectCategory = function(index) {
		console.log(index);
		$scope.category = index;
		$scope.categoryText = $scope.categories[index-1].text;
	}
	
	
	 // 地图模块开始---------------------------------------------------------------------------------------

    var map = new BMap.Map("joinMap");          // 创建地图实例
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
    map.addEventListener("click",function(e){
    	$scope.$apply(function(){
    		$scope.lng = e.point.lng;
        	$scope.lat = e.point.lat;
    	});   	
    	map.clearOverlays();    
    	var myMarker = new BMap.Marker(e.point);
        map.addOverlay(myMarker);
        map.panTo(point);
		console.log(e.point.lng + "," + e.point.lat);
	});

    // 地图模块结束---------------------------------------------------------------------------------------
	
}]);
function restaurant_post_change() {
    var file = document.getElementById("restaurant_post_input_hidden").files[0];
    if (file) {
        if (file.type.substring(0, 5) == "image") {
            head_changed_flag = true;
            image_file = file;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                var urlData = this.result;
                document.getElementById("restaurant-post-img").setAttribute("src", urlData);
            }
        }
        else {
            alert("只能上传图片...年轻人不要调皮！");
        }
    }
}
function restaurant_post_uploadImg() {
    $('#restaurant_post_input_hidden').trigger('click');
}
