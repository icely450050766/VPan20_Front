/**
 * Created by icley on 2016/3/31.
 */
angular.module('VPan20_Front')
  .controller('accountBrokerRegisterController',['$scope', '$interval', '$ionicHistory', '$ionicPopup', 'testService' ,function($scope, $interval, $ionicHistory, $ionicPopup, testService) {

    $scope.my = { name: '', phoneNum: '', organizationCode: '', code: '',
      getCodeBtn: '获取验证码', checkbox: true, errorTip: null };

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

    //提交
    $scope.registerBtn = function(){

      //验证 手机号码 格式
      if( !testService.checkPhoneNum( $scope.my.phoneNum ) ){
        $scope.my.errorTip = '号码格式有误';
        testService.showErrorTip('broker_errorTipId');
        return;
      }

      //验证码输入有误
      var _code = '123456';
      if( $scope.my.code != _code ){
        $scope.my.errorTip = '验证码输入有误';
        testService.showErrorTip('broker_errorTipId');
        console.log('a')
        return;
      }

      //等待审核 弹框
      $ionicPopup.show({
        template: '<div style="color: #ffffff; text-align: center; margin-top: 8%; font-size: 1.6rem">' +
        '<p>等待审核</p>' +
        '<p>审核通过后将会微信通知你</p><br/><br/>' +
        '</div>',
        scope: $scope,
        buttons: [
          {
            text: '<b>确认</b>',
            type: 'button-energized',
            onTap: function (e) {
              $ionicHistory.goBack();
            }
          }
        ]
      })

    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    /************初始化*************/
    $scope.my.organizationCode = '80';
    $scope.my.phoneNum = '15625042002';
    $scope.my.code = '123456';

  }])
