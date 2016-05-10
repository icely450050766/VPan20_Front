/**
 * Created by Administrator on 2016/3/17.
 */
angular.module('VPan20_Front')
  .controller('informationDetailsControllers', ['$scope', '$ionicHistory','$stateParams', 'testService', '$location', '$state', 'toolServices', function($scope, $ionicHistory, $stateParams,testService, $location, $state, toolServices) {

    $scope.my = { tradePwd: null };

    //点击 去交易
    $scope.goTrade = function(){

        //！！！判断是否已注册！！！
        var _isRegister = sessionStorage.getItem('registerSuccess');
        if( !_isRegister ) {//未注册
          $location.path('/register/register');//页面跳转

        }else{//已注册

          //！！！判断是否已登录！！！
          if( 1 ){ //未登录
            _tradePwd = '123456';//后台读取 交易密码
            myPopup = toolServices.showInputTradePwdPopUp( $scope, _tradePwd, false );

          }else{//已登录
            $state.go('tab.trade-build',{}, {reload: true});
          }
        }

    }

    //忘记交易密码
    $scope.forgetPwd = function(){
      toolServices.closeInputTradePwd_toForgetPwd( myPopup );//关闭 输入交易密码弹框，并跳转到忘记密码页面
    }

    //监听 交易密码是否输入正确
    $scope.$on('tradePwdSuccess', function(){
      $state.go('tab.trade-build',{}, {reload: true});
    })


    //////////////////////////////////////////////////////////////////////////////////

    $scope.formType=$stateParams.formType;
        $scope.publishtime;
        var _pubId=$stateParams.pubId;
        //进入页面判断是否点赞start
        if($.cookie(_pubId)){
          $('.click_pic').attr('src','img/praiseTime.jpg');
        }else{
          //不作处理
        }
    //进入页面判断是否点赞end
        var _praiseStatus=0;
        $scope.details=[];
 /*       $scope.list[1]={"coverImg":"img/temp/adam.jpg"}*/

        function init(){
            var _p=testService.updatePublicationReadTime(_pubId);

            _p.then(function(data){
                console.log(data);
                $scope.details=data;
                $scope.publishtime=new Date(data.publishDate).toLocaleDateString();
            },function(){

            });
        }

        $scope.updatePraiseTime = function(pubId){


/*            if (_praiseStatus==0){
                var _pp=testService.updatePraiseTime(pubId);
                console.log(_pp);
                _pp.then(function(data){
                    $scope.details=data;
                    $scope.publishtime=new Date(data.publishDate).toLocaleDateString();
                },function(){*/


         /* $scope.my.disabled = true;*/




          //如果没有记录文章id
          var pubId=pubId+'';

          if(!$.cookie(pubId)){

            var _pp=testService.updatePraiseTime(pubId);
            $.cookie(pubId,pubId);

          }else{
              //不作处理
          }


        }

        $scope.goBack = function(){
            $ionicHistory.goBack();
        }

    /*****************初始化***********************/
    init();
    var _tradePwd = '123456';
    $scope.my.tradePwd = '123456';

}])
