/**
 * Created by icley on 2016/3/28.
 */
angular.module('VPan20_Front')
  .controller('positionDetailsController', function($scope, $ionicHistory, $stateParams , $ionicPopup, testService){

    $scope.my = { profit: 0, loss: 0 }

    $scope.list = [];
    $scope.detailData = {};

    //获取后台数据
    function getMyNotLiquidataPositionList(){
      var _q = testService.getMyPositionList();
      _q.then(function(data){
        $scope.list = data.list;
        $scope.detailData = testService.getDataById( $scope.list, $stateParams.id );
      },function(){});
    }

    //设置止盈、止损
    $scope.decrease = function( type ){
      if( type == 'profit' ){
        if( $scope.my.profit > 0 ){ $scope.my.profit -= 10; }
      }else if( type == 'loss' ){
        if( $scope.my.loss > 0 ){ $scope.my.loss -= 10; }
      }
    }

    $scope.add = function( type ){
      if( type == 'profit' ){
        if( $scope.my.profit < 50 ){ $scope.my.profit += 10; }
      }else if( type == 'loss' ){
        if( $scope.my.loss < 50 ){ $scope.my.loss += 10; }
      }
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    /***********初始化**********/
    getMyNotLiquidataPositionList();

  })
