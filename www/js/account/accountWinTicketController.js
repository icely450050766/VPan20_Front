/**
 * Created by Administrator on 2016/3/17.
 */
angular.module('VPan20_Front')
  .controller('accountWinTicketController',['$scope', '$ionicHistory', '$ionicSlideBoxDelegate', '$ionicScrollDelegate','testService', function($scope, $ionicHistory, $ionicSlideBoxDelegate, $ionicScrollDelegate,testService) {

    $scope.my = { unUsed10:[], unUsed200:[], used10:[], used200:[], overdue10:[], overdue200:[],
      showUnUsedBox: true, showUsedBox: false, showOverdueBox: false,
    }

    $scope.Securities=[];

    //选择tabs : 未使用、已使用、已过期
    $scope.select = function( index , isTrue){

      //修改样式
      $('#winTicketTabs').children().filter('.active').removeClass('active');
      $('#winTicketTabs div:nth-child(' + index + ')').addClass('active');

      if( isTrue ){
        $ionicSlideBoxDelegate.$getByHandle('accountWinTicketTab').slide(index-1);
      }

      //防止下滑大片空白
      $scope.my.showUnUsedBox = false;
      $scope.my.showUsedBox = false;
      $scope.my.showOverdueBox = false;

      switch( index ){
        case 1: $scope.my.showUnUsedBox = true; break;
        case 2: $scope.my.showUsedBox = true; break;
        case 3: $scope.my.showOverdueBox = true; break;
      }

    }

    //切换slideBox
    $scope.slideHasChanged = function( index ){
      $scope.select( index+1, false );
      $ionicScrollDelegate.scrollTo(0, 0, true);//上滚
    }

    //根据数字num设置数组array的长度
    function initArrayLengthByNum( array, num ){
      for( var i=0; i < num; i++ ){
        array.push({});//压入空对象
      }
    }

    $scope.goBack = function(){
        $ionicHistory.goBack();
    }

    /*************初始化*************/

    //获取后台数据

    function unUsed(){
        var _p=testService.getSecuritiesList(1,1);
        var _k=0;
        var _j=0;
        _p.then(function(data){
            $scope.Securities=data.securities;
            for( var i=0; i < $scope.Securities.length; i++ ){
                if($scope.Securities[i].sum==10){
                    $scope.my.unUsed10[_k]=$scope.Securities[i];
                    _k++;
                }else if($scope.Securities[i].sum==200){
                    $scope.my.unUsed200[_j]=$scope.Securities[i];
                    _j++;
                }
            }
        },function(){

        });
    }

    function used(){
        var _p=testService.getSecuritiesList(1,2);
        var _k=0;
        var _j=0;
        _p.then(function(data){
            $scope.Securities=data.securities;
            for( var i=0; i < $scope.Securities.length; i++ ){
                if($scope.Securities[i].sum==10){
                    $scope.my.used10[_k]=$scope.Securities[i];
                    _k++;
                }else if($scope.Securities[i].sum==200){
                    $scope.my.used200[_j]=$scope.Securities[i];
                    _j++;
                }
            }
        },function(){

        });
    }

    function overdue(){
        var _p=testService.getSecuritiesList(1,3);
        var _k=0;
        var _j=0;
        _p.then(function(data){
            $scope.Securities=data.securities;
            for( var i=0; i < $scope.Securities.length; i++ ){
                if($scope.Securities[i].sum==10){
                    $scope.my.overdue10[_k]=$scope.Securities[i];
                    _k++;
                }else if($scope.Securities[i].sum==200){
                    $scope.my.overdue200[_j]=$scope.Securities[i];
                    _j++;
                }
            }
        },function(){

        });
    }


    $scope.goDetails = function(Id){
        $location.path('/tab/information-details/' + formType + '/' + pubId );
    }

    $scope.conversionDate = function(Time){
        return new Date(Time).toLocaleDateString();
    }

    /***************初始化****************/
    unUsed();
    used();
    overdue();

  }])
