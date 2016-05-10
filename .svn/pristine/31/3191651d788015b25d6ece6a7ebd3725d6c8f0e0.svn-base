/**
 * Created by icley on 2016/4/5.
 */
angular.module('VPan20_Front')
  .controller('forgetPwdController', function($scope, $ionicHistory, $interval, $timeout, $location, testService) {

    $scope.my = { phoneNum: null, code: null, getCodeBtn: '获取验证码',
      newPwd: null, reNewPwd: null, errorTip: null };

    //获取验证码
    $scope.getCode = function(){

      //倒计时秒数
      var _count = 120;
      $scope.my.getCodeBtn = _count + ' 秒';
      //开始倒计时
      var _t = $interval( function(){
        _count --;
        $scope.my.getCodeBtn = _count + ' 秒';

        if( _count < 0 ){
          $interval.cancel(_t);
          $scope.my.getCodeBtn = '获取验证码';
        }
      }, 1000);

      //验证码已发送
      testService.showErrorTip('codeHadSendTipId');

    }

    //下一步
    $scope.next = function(){

      var _code = '123456';
      if( $scope.my.code != _code ){
        $scope.my.errorTip = '验证码输入有误，请重新输入';
        testService.showErrorTip('forgetPwd_errorTipId1');

      }else{
        $location.path('/forgetPwd/forgetPwd2');
      }

    }

    //提交
    $scope.submit = function(){

      //新密码格式错误
      if( $scope.my.newPwd.length != 6 ){
        $scope.my.errorTip = '新密码输入有误';
        testService.showErrorTip('forgetPwd_errorTipId2');
        return;
      }

      //两次密码输入不一致
      if( $scope.my.newPwd != $scope.my.reNewPwd ){
        $scope.my.errorTip = '两次密码输入不一致';
        testService.showErrorTip('forgetPwd_errorTipId2');
        return;
      }

      //更新后台数据
      $ionicHistory.goBack(-2);//后退

    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    /*********初始化************/
    $scope.my.phoneNum = '15625042002';
    $scope.my.code = '123456';
    $scope.my.newPwd = '123456';
    $scope.my.reNewPwd = '123456';

  })
