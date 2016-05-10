/**
 * Created by Administrator on 2016/3/17.
 */
angular.module('VPan20_Front')
  .controller('accountPersonalInfoChangePwdController', ['$scope', '$ionicHistory', '$ionicPopup', 'testService', function($scope, $ionicHistory, $ionicPopup, testService) {

    $scope.my = { oldPwd: null, newPwd: null, reNewPwd: null, errorTip: null };

    //点击 确定 按钮
    $scope.changePwd = function(){

      //没有输入新密码
      if( $scope.my.newPwd == '' || $scope.my.newPwd == null ) return;

      var _oldPwd = '123456';
      if( $scope.my.oldPwd != _oldPwd ) {
        $scope.my.errorTip = '原密码输入错误';
        testService.showErrorTip('changePwd_errorTipId');

      }else{
        if( $scope.my.newPwd != $scope.my.reNewPwd ) {
          $scope.my.errorTip = '新密码两次输入不一致';
          testService.showErrorTip('changePwd_errorTipId');

        }else if( $scope.my.newPwd == $scope.my.reNewPwd ){
          $ionicHistory.goBack();//成功修改

        }
      }

    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    /************初始化*************/
    $scope.my.oldPwd = '123456';
    $scope.my.newPwd = '123456';
    $scope.my.reNewPwd = '123456';

  }])

