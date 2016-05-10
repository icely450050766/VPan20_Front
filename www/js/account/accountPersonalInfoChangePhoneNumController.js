/**
 * Created by icley on 2016/3/28.
 */
angular.module('VPan20_Front')
  .controller('accountPersonalInfoChangePhoneNumController', function($scope, $ionicHistory, $interval, $ionicPopup, $location, testService ) {

    $scope.my = { oldPhoneNum: '', tradePwd: '', phoneNum: '', code: '', getCodeBtn: '获取验证码', errorTip: null };

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

    }

    //下一步
    $scope.next = function(){

      _oldPhoneNum = '15625042002';
      if( $scope.my.oldPhoneNum != _oldPhoneNum ) {
        $scope.my.errorTip = '原号码有误';
        testService.showErrorTip('errorTipId1');
        return;
      }

      _tradePwd = '123456';
      if( $scope.my.tradePwd != _tradePwd ) {
        $scope.my.errorTip = '交易密码有误';
        testService.showErrorTip('changePhoneNum_errorTipId1');
        return;
      }

      //跳转至下一页
      $location.path('/tab/account-personalInfo-changePhoneNum2');

    }

    //提交
    $scope.changePhoneNum = function(){

      var _result;

      //验证 手机号码 格式
      if( !testService.checkPhoneNum( $scope.my.phoneNum ) ){
        $scope.my.errorTip = '号码格式有误';
        testService.showErrorTip('changePhoneNum_errorTipId2');
        return;
      }

      //验证码输入有误
      var _code = '123456';
      if( $scope.my.code != _code ){
        $scope.my.errorTip = '验证码输入有误，请重新输入';
        testService.showErrorTip('changePhoneNum_errorTipId2');
        return;
      }

      //修改成功
      $ionicHistory.goBack(-2);

    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    /************初始化*************/
    $scope.my.phoneNum = '15625042003';
    $scope.my.oldPhoneNum = '15625042002';
    $scope.my.tradePwd = '123456';
    $scope.my.code = '123456';

  })
