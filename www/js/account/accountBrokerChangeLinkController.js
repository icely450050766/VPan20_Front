/**
 * Created by icley on 2016/3/31.
 */
angular.module('VPan20_Front')
  .controller('accountBrokerChangeLinkController', function($scope, $ionicHistory, testService) {

    $scope.my = { name: null, phoneNum: null, code: null}

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    /*************初始化***************/
    $scope.my.name = 'icely';
    $scope.my.phoneNum = '15625000000';

  })
