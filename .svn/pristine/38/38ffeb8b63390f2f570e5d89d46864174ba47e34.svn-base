/**
 * Created by Administrator on 2016/3/17.
 */
angular.module('VPan20_Front')
  .controller('accountWithdrawController',function($scope, $ionicHistory, $ionicPopup, $location, $state, toolServices) {

    $scope.my = { tradePwd: null, selectModalTitle: '', //关闭Modal的时候读取该数据，获取用户的选择
      bank: '请选择银行', province:'请选择省份', city:'请选择城市',
      tradePwd: null, isTradePwdSuccess: false //交易密码是否输入成功（正确）
    }

    $scope.list = [];
    var myPopup;//输入交易密码 弹出框

    //输入交易密码弹出框
    $scope.inputTradePwd = function() {
      _tradePwd = '123456';//后台读取 交易密码
      myPopup = toolServices.showInputTradePwdPopUp( $scope, _tradePwd, true );
    }
    //忘记交易密码
    $scope.forgetPwd = function(){
      toolServices.closeInputTradePwd_toForgetPwd( myPopup );
    }
    //监听 交易密码是否输入正确
    $scope.$on('tradePwdSuccess', function(){
      $scope.my.isTradePwdSuccess = true;
    })
    $scope.goBack = function(){
      //$ionicHistory.goBack();
      $state.go('tab.account',{}, {reload: true});
    }
    /*********初始化************/
   //省份改变时，城市改变
    //$scope.aValue="请选择省份";


//页面加载方法
      //设置省份数据
      setProvince();
      $scope.index_prov=1;//设置省名初始值
      $scope.index_city=1;//设置省名初始值
      if($scope.index_prov){//若后台记录了用户省名，则枚举城市名
        setCity($scope.province_Arr[$scope.index_prov].province_Name);
      }
      $scope.provinceChange=function(num){

        setCity($scope.province_Arr[num].province_Name);
      }

//设置省份数据
      function setProvince(){
        //给省份下拉列表赋值
        var modelVal;
        //获取对应省份城市
        $scope.province_Arr=[];
        for (var i = 0, len = province.length; i < len; i++) {
          modelVal = province[i];
          $scope.province_Arr.push({province_Name:modelVal,id:i});
        }
      }

//根据选中的省份获取对应的城市

      function setCity(provinec){
        var proCity,modelVal;

        //通过省份名称，获取省份对应城市的数组名
        switch (provinec) {
          case "北京":
            proCity = beijing;
            break;
          case "上海":
            proCity = shanghai;
            break;
          case "天津":
            proCity = tianjing;
            break;
          case "重庆":
            proCity = chongqing;
            break;
          case "浙江":
            proCity = zhejiang;
            break;
          case "江苏":
            proCity = jiangsu;
            break;
          case "广东":
            proCity = guangdong;
            break;
          case "福建":
            proCity = fujiang;
            break;
          case "湖南":
            proCity = hunan;
            break;
          case "湖北":
            proCity = hubei;
            break;
          case "辽宁":
            proCity = liaoning;
            break;
          case "吉林":
            proCity = jilin;
            break;
          case "黑龙江":
            proCity = heilongjiang;
            break;
          case "河北":
            proCity = hebei;
            break;
          case "河南":
            proCity = henan;
            break;
          case "山东":
            proCity = shandong;
            break;
          case "陕西":
            proCity = shangxi;
            break;
          case "甘肃":
            proCity = gansu;
            break;
          case "新疆":
            proCity = xinjiang;
            break;
          case "青海":
            proCity = qinghai;
            break;
          case "山西":
            proCity = shanxi;
            break;
          case "四川":
            proCity = sichuan;
            break;
          case "贵州":
            proCity = guizhou;
            break;
          case "安徽":
            proCity = anhui;
            break;
          case "江西":
            proCity = jiangxi;
            break;
          case "云南":
            proCity = yunnan;
            break;
          case "内蒙古":
            proCity = neimenggu;
            break;
          case "西藏":
            proCity = xizang;
            break;
          case "广西":
            proCity = guangxi;
            break;
          case "":
            proCity = xizang;
            break;
          case "宁夏":
            proCity = ningxia;
            break;
          case "海南":
            proCity = hainan;
            break;
          case "香港":
            proCity = xianggang;
            break;
          case "澳门":
            proCity = aomeng;
            break;
          case "台湾":
            proCity = taiwan;
            break;
        }
        $scope.city_Name=[];
        //设置对应省份的城市
        for (var i = 0, len = proCity.length; i < len; i++) {
          modelVal = proCity[i];

          $scope.city_Name.push({city_Name:modelVal,id:i});
        }


      }





    $scope.my.tradePwd = '123456';

  })
