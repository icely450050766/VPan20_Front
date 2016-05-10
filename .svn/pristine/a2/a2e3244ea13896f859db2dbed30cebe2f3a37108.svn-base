/**
 * Created by Administrator on 2016/3/17.
 */
angular.module('VPan20_Front')
  .controller('accountBrokerController', function($scope, $ionicHistory, testService) {

    $scope.my = { isFirstShowCode: true }//是否第一次弹窗显示二维码
    $scope.list = [];

    //显示二维码
    $scope.showCode = function(){

      $scope.openModal();//设置弹出窗口内容

      if( $scope.my.isFirstShowCode ){ //只有是第一次弹窗 才执行
        $("#code").qrcode({
          render: "canvas", //方式
          width: 170, //宽度
          height:170, //高度
          text: "http://www.baidu.com" //跳转内容
        });
        $scope.my.isFirstShowCode = false; //不再是第一次弹窗
      }

    }

    //获取后台对应数据
    function getAccountBrokerIndexList(){
      var _q = testService.getAccountBrokerIndexList();
      _q.then(function(data){
        $scope.list = data.data;
      },function(){
      });
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    /*************初始化**************/
    getAccountBrokerIndexList();

  })
