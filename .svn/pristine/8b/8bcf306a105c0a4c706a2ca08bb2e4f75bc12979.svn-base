/**
 * Created by Administrator on 2016/3/17.
 */
angular.module('VPan20_Front')
  .controller('accountHistoryController', ['$scope', '$ionicHistory', 'testService',function($scope, $ionicHistory, testService) {

    $scope.my = { popModalData: {} }
    $scope.list = [];

    //获取后台对应数据
    function getAccountHistoryList(){
      var _q = testService.getAccountHistoryList();
      _q.then(function(data){
        $scope.vo = data.data;
        console.log(data);
        $scope.list = data.data;
      },function(){
      });
    }

    $scope.showDetail = function(order){
      $scope.o=order;
      $scope.openModal();//设置弹出窗口内容
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    /**********初始化************/
    getAccountHistoryList();

  }])

