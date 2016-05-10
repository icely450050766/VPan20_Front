/**
 * Created by icley on 2016/4/5.
 */
/**
 * Created by icley on 2016/3/28.
 */
angular.module('VPan20_Front')
  .controller('registerController', function($scope, $ionicHistory, $interval, $timeout, $ionicPopup, testService,TipService) {
    $scope.my = { tradePwd: '', reTradePwd: '', phoneNum: '',
      code: '', getCodeBtn: '获取验证码', checkbox: true,
      errorTipz: null };
    //获取验证码
    $scope.getCode = function(){
      //倒计时秒数
      $scope.desc='';//初始描述为空
      $scope.authcode=testService.Verificationcode($scope.my.phoneNum);//-------发送验证码到手机
      $scope.authcode.then(function(data){
        //如果验证码已经发送过
        if(data.desc=="code_already_gen"){
            $scope.desc="该验证码已经发送，请稍等..";
        }else if(data.desc=="user_already_exist"){
          $scope.desc="该手机号码已经注册过";
        }else if(data.desc=="mobile_invalid"){
          $scope.desc="手机不能为空";
        }else{
          //执行倒计时
          var _count = 120;
          $scope.my.getCodeBtn = _count + ' 秒';
          //开始倒计时
          var _t = $interval(function(){
            _count --;
            $scope.my.getCodeBtn = _count + ' 秒';

            if( _count < 0 ){
              $interval.cancel(_t);
              $scope.my.getCodeBtn = '获取验证码';
            }
          }, 1000);
        }

      });
    }

    //完成注册
    $scope.registerBtn = function(){

      //验证 手机号码 格式
      if( !testService.checkPhoneNum( $scope.my.phoneNum ) ){
        $scope.my.errorTip = '号码格式有误';
        testService.showErrorTip('register_errorTipId');
        return;
      }

      //手机号已绑定
      //var _phoneNum = '15625042002';
      //if( $scope.my.phoneNum == _phoneNum ){
      //  $scope.my.errorTip = '该手机号已绑定';
      //  testService.showErrorTip('register_errorTipId');
      //  return;
      //}

      //验证码输入有误
      //var _code = '123456';
      //if( $scope.my.code != _code ){
      //  $scope.my.errorTip = '验证码输入有误';
      //  testService.showErrorTip('register_errorTipId');
      //  return;
      //}

      //两次密码输入不一致
      if( $scope.my.tradePwd != $scope.my.reTradePwd ){
        $scope.my.errorTip = '两次密码输入不一致';
        testService.showErrorTip('register_errorTipId');
        return;
      }

      //发送注册请求
      testService.registered($scope.my.phoneNum,$scope.my.tradePwd,'vpn20',$scope.my.code,48).then(function(data){

         if(data.desc=="verifycode_expired"){
           $scope.desc="验证码错误";
         }else if(data.desc=="user_already_exist"){
           $scope.desc="该微信用户已经注册过";
         }else if(data.data.user.mobile){//注册成功
           $scope.tipService = TipService;
           TipService.setMessage('注册成功', 'success');
           $timeout(function(){
             $scope.goBack();
           },1500);
         }
      });




    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    /************初始化*************/
    $scope.my.phoneNum = '';
    $scope.my.code = '';
    $scope.my.tradePwd = '';
    $scope.my.reTradePwd = '';

  })
