/**
 * Created by icley on 2016/3/28.
 */
angular.module('VPan20_Front')
  .controller('positionIndexController', function($scope, $rootScope, $ionicPopup, testService){

    $scope.my = { totalProfitOrLoss:0 };
    $scope.list = [];

    //获取 我的持仓 后台数据
    function getMyNotLiquidataPositionList(){

      var _q = testService.getMyNotLiquidataPositionList();
      _q.then(function(data){
        if(data.state!=200){

          return ;
        }
        $scope.my.totalProfitOrLoss = data.data.totalProfitLoss;
        $scope.list = data.data.list;
      },function(){
      });

      //var _q = testService.getMyPositionList();
      //_q.then(function(data){
      //  $scope.list = data.list;
      //},function(){
      //});

    }

    $scope.tradeType=function (type){
      switch(type){
        case 1 : return "多";
        case 2 : return "空";
      }
    }

    //一键平仓
    $scope.closeAll = function() {

      var _sum = $scope.list.length;

      //总数大于0才弹窗
      if( _sum > 0 ){
        $ionicPopup.show({
          template: '<div style="text-align: center; color: #ffffff; margin: 6% auto">' +
          '<p>目前共有订单数：' + _sum + '笔</p>' +
          '<p>是否确认对所有订单同时平仓？</p>' +
          '<br/></div>',
          scope: $scope,
          buttons: [
            {
              text: '<b>取消</b>',
              type: 'button-energized',
            },
            {
              text: '<b>确认</b>',
              type: 'button-energized',
              onTap: function(e) {
                var _q=testService.liquidateAllPosition();//更新后台数据
                _q.then(function(data){
                  if(data.state==200){
                    getMyNotLiquidataPositionList();//重新读取数据
                  }else{

                  }
                })

              }
            }
          ]
        });
      }

    };

    //平仓
    $scope.closeOne = function(d) {

      $ionicPopup.show({
        template: '<div style="text-align: center; color: #ffffff; margin: 6% auto">' +
        '<p>' +
        '<span style="margin-right: 1rem">'+ d.productName +'</span> ' +
        '<span>'+d.punitprice+'元/手</span> ' +
        '</p>' +
        '<p>' +
        '<span style="margin-right: 1rem">3912.23</span>' +
        '<span style="margin-right: 1rem">'+d.amount+'手</span>' +
        '<span>'+ $scope.tradeType(d.tradeType)+'</span>' +
        '</p>' +
        '<br/></div>',
        scope: $scope,
        buttons: [
          {
            text: '<b>取消</b>',
            type: 'button-energized',
          },
          {
            text: '<b>确认</b>',
            type: 'button-energized',
            onTap: function(e) {
              var _q=testService.liquidatePosition(d.id);
              _q.then(function(data){
                if(data.state==200){
                  getMyNotLiquidataPositionList();//重新读取数据
                }else{

                }
              })
            }
          }
        ]
      });
    };


    $scope.goBack = function(){
      $ionicHistory.goBack();
    }

    /***********初始化**********/
    $scope.$on('$ionicView.enter', function(e) {
      getMyNotLiquidataPositionList();
    })

  })
