/**
 * Created by Administrator on 2016/3/17.
 */
angular.module('VPan20_Front')
  .controller('accountWinTicketDetailController',[ '$scope', '$ionicHistory', '$stateParams','testService',function($scope, $ionicHistory, $stateParams,testService) {
    $scope.my = { imgSrc: '' };
    $scope.data = { };//空对象

    function init(){
      var _p=testService.getSecuritiesDetails($stateParams.id);
      _p.then(function(data){
        $scope.data = data.securities[0];
        if($scope.data.fromWhere==2){
          $scope.data.fromWhere="活动途径";
        }else if($scope.data.fromWhere==1){
          $scope.data.fromWhere="用户分享";
        }else if($scope.data.fromWhere==3){
          $scope.data.fromWhere="系统派送";
        }
      },function(){

      });
    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    /*********初始化***********/
    $scope.my.imgSrc = 'img/' + $stateParams.type + '.png';
    init();

  }])
