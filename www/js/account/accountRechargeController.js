/**
 * Created by Administrator on 2016/3/17.
 */
angular.module('VPan20_Front')
  .controller('accountRechargeController', function($scope, $ionicHistory, testService,$ionicPopup,testService) {

     $scope.serverUrl="http://dev.vpan20.zfu188.com/kimeng-server/rechargeRedirect/create";

    $scope.my = { isDefaultBankInfoBtn: true };//是否选择默认信息

    //账户余额
    testService.getUserblance().then(function(data){
      $scope.userblance=data.data;

    });
    $scope.my = { toggle: true, price: null, SmallAmmountPrice: '100元 以下', //小额充值
    };
    $scope.formdata={
      actionurl:'',
      txnType:'',
      frontUrl:'',
      channelType:'',
      currencyCode:'',
      txnSubType:'',
      version:'',
      txnAmt:0,
      signMethod:'',
      backUrl:'',
      certId:'',
      encoding:'',
      bizType:'',
      signature:'',
      orderId:'',
      merId:'',
      txnTime:'',
      accessType:0,
      accNo:'',
      isDisabled:true
    }

    //小额充值 下拉列表
    $scope.toggle = function(){
      $('#list-con').toggle(100);// 显示/隐藏交互事件。参数是下拉速度
      $scope.my.toggle = !$scope.my.toggle;
    }

    //选择“常用金额”
    $scope.selectBox = function( index ){

      //修改样式
      $('#priceBox').find(".box").filter('.active').removeClass('active');
      $('#priceBox').find('.icon').removeClass('ion-checkmark');

      $('#priceBox .box:nth-child(' + index + ')').addClass('active');
      $('#priceBox .box:nth-child(' + index + ') .icon').addClass('ion-checkmark');

      //修改“小额充值”显示的数据
      $scope.my.SmallAmmountPrice =  '100元 以下';

      switch( index ){
        case 1: $scope.my.price = 300; break;
        case 2: $scope.my.price = 500; break;
        case 4: $scope.my.price = 1000; break;
        case 5: $scope.my.price = 2000; break;
        case 6: $scope.my.price = 5000; break;
      }
    }

    //选择“小额充值”
    $scope.selectSmallAmmount = function( price ){

      $scope.my.SmallAmmountPrice = price;
      $scope.my.price = price;

      //移除“常用金额”box 的样式
      $('#priceBox').find(".box").filter('.active').removeClass('active');
      $('#priceBox').find('.icon').removeClass('ion-checkmark');

      $scope.toggle();// 关闭 下拉列表
    }

    //银行卡信息
    $scope.selectBankInfoBtn = function(){
      $scope.my.isDefaultBankInfoBtn = !$scope.my.isDefaultBankInfoBtn;//取反
    }

    //充值
    $scope.recharge = function(){
      if( $scope.my.price == null ) return;
      // console.log($scope.my.price);
      //var _q=testService.buildRechargeData($scope.my.price);
      //_q.then(function(data){
      //  if(data.state!='200'){alert(data.desc);return ;}
      //  $scope.formdata.actionurl=data.data.actionurl;
      //  $scope.formdata.txnType=data.data.txnType;
      //  $scope.formdata.frontUrl=data.data.frontUrl;
      //  $scope.formdata.channelType=data.data.channelType;
      //  $scope.formdata.currencyCode=data.data.currencyCode;
      //  $scope.formdata.txnSubType=data.data.txnSubType;
      //  $scope.formdata.version=data.data.version;
      //  $scope.formdata.txnAmt=data.data.txnAmt;
      //  $scope.formdata.signMethod=data.data.signMethod;
      //  $scope.formdata.backUrl=data.data.backUrl;
      //  $scope.formdata.certId=data.data.certId;
      //  $scope.formdata.merId=data.data.merId;
      //  $scope.formdata.encoding=data.data.encoding;
      //  $scope.formdata.bizType=data.data.bizType;
      //  $scope.formdata.signature=data.data.signature;
      //  $scope.formdata.orderId=data.data.orderId;
      //  $scope.formdata.txnTime=data.data.txnTime;
      //  $scope.formdata.accessType=data.data.accessType;
      //
      //  if(!$scope.formdata.isDisabled){
      //    $scope.formdata.accNo=data.data.accNo;
      //  }
      //  $scope.formdata.isDisabled=data.data.isDisabled;
        //testService.unionpay($scope.formdata,' ?');
        // alert(data.data.certId);
        //document.payform.submit();


      // 反馈：充值成功 / 失败
      var _result;
      _result = '<p style="color: #ffffff;">充值成功</p>';
      //_result = '<p style="color: #ff0000;">充值失败</p>';

      // 反馈弹框
      var myPopup = $ionicPopup.show({
        template: '<div style="text-align: center; margin-bottom: 13%; font-size: 1.6rem">' + _result + '</div>',
        scope: $scope,
        buttons: [
          {
            text: '<b>确认</b>',
            type: 'button-popUpShow',
            onTap: function (e) {
            }
          }
        ]

      });

    }

    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    /*********初始化************/
    $scope.selectBox(1);//常用金额
    $scope.my.isDefaultBankInfoBtn = true;//选择默认信息

  })

