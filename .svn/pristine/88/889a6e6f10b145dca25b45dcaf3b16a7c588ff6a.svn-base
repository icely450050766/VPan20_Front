/**
 * Created by huochai on 2016/3/17.
 */
angular.module('VPan20_Front')
  .controller('accountIndexController',['$scope', '$ionicPopup', '$location' ,function($scope, $ionicPopup, $location) {

    // 反馈弹框（成功 / 失败）
    function feedBackPopUp( _result ){
      var myPopup = $ionicPopup.show({
        template: '<div style="text-align: center; margin-bottom: 13%; font-size: 1.6rem">' +
        _result + '</div>',
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

    //经纪人跳转
    $scope.brokerHref = function(){
      //判断是否已注册
      if( 1 ){//已经注册
        $location.path('/tab/account-broker');
      }else{
        $location.path('/tab/account-broker-register');
      }
    }

    //交割订单
    $scope.showPop = function(){
      _result = '<div style="color: #ffffff; padding: 0% 15%;">您目前没有交割订单</div>';
      feedBackPopUp( _result );
    }

    /************初始化**************/

    var _isRegister = sessionStorage.getItem('registerSuccess');
    if( !_isRegister ){//判断是否已注册
      //$location.path('/register/register');
    }

  }])
