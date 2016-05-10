/**
 * Created by Administrator on 2016/3/17.
 */
angular.module('VPan20_Front')
  .controller('accountBrokerClientController', function($scope, $ionicHistory, testService) {

    $scope.my = { phoneNum: null, remainUp: true };

    $scope.list = [];

    //获取后台对应数据
    function getAccountBrokerClientList( phoneNum ){
      var _q = testService.getAccountBrokerClientList( phoneNum );
      _q.then(function(data){
        $scope.list = data.data;
      },function(){
      });
    }

    //输入手机号，查询
    $scope.search = function(){
      $scope.list = [];//清空
      getAccountBrokerClientList( $scope.my.phoneNum );//重新查询
    }

    //余额排序
    $scope.remainSort = function(){
      $scope.my.remainUp = !$scope.my.remainUp;//取反
      if( $scope.my.remainUp ){//升序
        console.log("余额升序");
      }else{//降序
        console.log("余额降序");
      }
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    /*************初始化**************/
    getAccountBrokerClientList(null);

  })
