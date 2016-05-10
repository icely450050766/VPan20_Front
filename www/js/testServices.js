angular.module('VPan20_Front.testService', [])

  .service('testService', function( $http, $q, $timeout){

    //根据传入的id获取数据
    this.getDataById = function( list, id ){
      for( var i=0; i < list.length; i++ ){
        if( list[i].id == id ){
          return list[i];
        }
      }
    }

    //验证 手机正则表达式
    this.checkPhoneNum = function( phoneNum ){
      var phone = phoneNum.toString();
      var telReg = !!phone.match(/^1[0-9]{10}$/);
      if(telReg == false) { //如果手机号码不能通过验证
        return false;
      }
      return true;
    }

    //注册、绑定等页面 显示输入错误 提示信息 （淡入淡出效果）
    this.showErrorTip = function( id ){
      $("#" + id).fadeIn(500);
      $timeout( function(){
        $("#" + id).fadeOut(500);
      }, 2000);
    }


    this.getEChartsData = function( product, index ){ //ECharts Tabs
      return jsonpRequest(batch_server+'price/kliner?type=' + index + '&product=' + product + '&callback=JSON_CALLBACK');
    }

    this.getCurrentPriceData = function(){
      return jsonpRequest(batch_server+'price/quote?&callback=JSON_CALLBACK');

      //var d = $q.defer();
      //$http({
      //  method: "GET",
      //  url: 'http://58.63.244.200:18808/batch-server/price/quote?'
      //}).then(function (data) {
      //  d.resolve(data);
      //});
      //return d.promise;
    }
    this.getCurrentProfitOrLoss = function(type){
      return jsonpRequest(vpan_server+'order/getNotLiquidateOrder/'+type+'?callback=JSON_CALLBACK');
    }

    this.getUserinfo=function(){
      return jsonpRequest(vpan_server+'vpanuser/findUser?callback=JSON_CALLBACK');
    }

    this.getUserblance=function(){
      return jsonpRequest(vpan_server+'vpanuser/findUserBalance?callback=JSON_CALLBACK');
    }
    this.getDetailBeforBuildPosition = function(productid){
      return jsonpRequest(vpan_server+'order/getDetailBeforBuildPosition/'+productid+"?callback=JSON_CALLBACK");
    }
    this.getProductsByNo = function(productNo){
      return jsonpRequest(vpan_server+'order/getProductList/'+productNo+'?callback=JSON_CALLBACK');
    }
    this.buildPosition=function(productid,type,amount,targetProfit,stopLoss){
      if(!targetProfit&&!stopLoss){
        return jsonpRequest(vpan_server+'order/create/'+productid+'/'+type+'/'+amount+'/?callback=JSON_CALLBACK');
      }
      if(!stopLoss&&targetProfit){
        return jsonpRequest(vpan_server+'order/create/'+productid+'/'+type+'/'+amount+'/?callback=JSON_CALLBACK&targetProfit='+targetProfit);
      }
      if(stopLoss&&!targetProfit){
        return jsonpRequest(vpan_server+'order/create/'+productid+'/'+type+'/'+amount+'/?callback=JSON_CALLBACK&stopLoss='+stopLoss);
      }
      if(stopLoss&&targetProfit){
        return jsonpRequest(vpan_server+'order/create/'+productid+'/'+type+'/'+amount+'/?callback=JSON_CALLBACK&targetProfit='+targetProfit+'&stopLoss='+stopLoss);
      }
    }
    this.liquidatePosition=function(id){
      return jsonpRequest(vpan_server+'order/liquidate/'+id+'/?callback=JSON_CALLBACK');
    }
    this.liquidateAllPosition=function(id){
      return jsonpRequest(vpan_server+'order/liquidateall?callback=JSON_CALLBACK');
    }
    this.buildRechargeData=function(txnAmount){
      return jsonpRequest(vpan_server+"recharge/create/"+txnAmount+"?callback=JSON_CALLBACK");
    }

    this.getAccountHistoryList = function(){
      // return jsonpRequest(batch_server+'price/historyOrder?&callback=JSON_CALLBACK');
      return jsonpRequest(vpan_server+'trade/record/historyOrder?callback=JSON_CALLBACK');
      //return request('GET','testData/account-history-list.json');
    }

    this.getTradeIndexNoticeList = function(){
      return request('GET', 'testData/tradeIndex-notice-list.json');
    }

    this.getAccountIncomeAndExpensesList = function(){
      return jsonpRequest(vpan_server+'trade/record/findAcctMoneyLog?callback=JSON_CALLBACK');
    }

    this.getAccountBrokerIncomeList = function( month, column, desc ){
      return jsonpRequest(vpan_server+ '/vbroker/findImmedtateHistoryOrder?time=' + month + '&column=' + column + '&desc=' + desc + '&callback=JSON_CALLBACK');
    }


    this.getAccountBrokerClientList = function() {
      //return request('GET', 'testData/account-broker-client-list.json');
      //return jsonpRequest(vpan_server+'vbroker/findImmediateCustomer?mobile=13416460566=JSON_CALLBACK');
      return jsonpRequest(vpan_server + 'vbroker/findImmediateCustomer?mobile=&callback=JSON_CALLBACK');
    }

    this.getAccountBrokerIndexList = function(){
      return jsonpRequest(vpan_server+ 'vbroker/findDetail?callback=JSON_CALLBACK');

    }

    this.getAccountBrokerIncomeTotalIncomeDataList = function(){
      return jsonpRequest(vpan_server+ 'vbroker/findFycInComeDetail?callback=JSON_CALLBACK');
    }

    this.getAccountBrokerClientList = function( phoneNum ){
      if( phoneNum == null ){
        return jsonpRequest(vpan_server+ 'vbroker/findImmediateCustomer?mobile&callback=JSON_CALLBACK');
      }
      return jsonpRequest(vpan_server+ 'vbroker/findImmediateCustomer?mobile='+ phoneNum + '&callback=JSON_CALLBACK');
    }

    this.getAccountBrokerCloseList = function( month, column, desc ){
      return jsonpRequest(vpan_server+'/vbroker/findImmedtateCustomerOrder?time=' + month + '&column=' + column + '&desc=' + desc + '&callback=JSON_CALLBACK');
    }

    this.getMyNotLiquidataPositionList = function(){
      return jsonpRequest(vpan_server+'order/getNotLiquidateOrder/list?callback=JSON_CALLBACK');
    }

    //icely test 我的持仓
    this.getMyPositionList = function(){
      return request('GET', 'testData/tradeIndex-myPosition-list.json');
    }

//////////////////////////////////////////////////////////////////////
    function request(method, url, params){
      var deferred = $q.defer();
      $http({method: method, url:url, params:params}).
        success(function(data, status, headers, config) {
          deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data);
        });
      return deferred.promise;
    }

    function jsonpRequest(url, params){
      var deferred = $q.defer();
      $http.jsonp(url, params).
        success(function(data, status, headers, config) {
          deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
          deferred.reject(data);
        });
      return deferred.promise;
    }


    //资讯模块
    this.getColumn = function(){/*Vpan20_Column*/
      return jsonpRequest(vpan_server+'fpub/publist?navCode=Vpan20_Column&pageno=1&pagesize=3&callback=JSON_CALLBACK');
    }

    this.getTodayInformation = function(){/*Vpan20_Information*/
      return jsonpRequest(vpan_server+'fpub/publist?navCode=Vpan20_Information&pageno=1&pagesize=4&callback=JSON_CALLBACK');
    }

    this.getOperation = function(){/*Vpan20_Operation*/
      return jsonpRequest(vpan_server+'fpub/publist?navCode=Vpan20_Operation&pageno=1&pagesize=3&callback=JSON_CALLBACK');
    }

    this.getBygoneInformation = function(pageno,pagesize){
      return jsonpRequest(vpan_server+'fpub/publistBygone?navCode=Vpan20_Information&pageno='+pageno+'&pagesize='+pagesize+'&callback=JSON_CALLBACK');
    }

    this.updatePublicationReadTime = function(id) {
      return jsonpRequest(vpan_server+'fpub/updatePublicationReadTime/' + id + '?callback=JSON_CALLBACK');
    }

    this.updatePraiseTime = function(id){
      return jsonpRequest(vpan_server+'fpub/updatePublicationPraiseTime/'+ id + '?callback=JSON_CALLBACK');
    }

    //////////////////////还没使用接口//////////////////
    this.getDetails = function(pubId){
      return jsonpRequest(vpan_server+'fpub/'+pubId+'?callback=JSON_CALLBACK');
    }

    //赢家卷模块
    this.getSecuritiesList = function(userId,selectType){
      return jsonpRequest(vpan_server+'Securities/selectDetailUser/'+userId+'/'+selectType +'?callback=JSON_CALLBACK');
    }

    this.getSecuritiesDetails = function(Id){
      return jsonpRequest(vpan_server+'Securities/selectDetailForId/'+Id+'?callback=JSON_CALLBACK');
    }
    //交易密码接口
    this.password=function(openid,pass){
      return request('POST',vpan_server+'vpan_login_check',{j_username:openid,j_password:pass});
    }
    //发送验证码到手机
    this.Verificationcode =function(number){
      return request('GET',vpan_server+'checkUserMobileExisting/'+number);
    }
     //用户注册
    this.registered=function(mobile,pwd,client,Verification,brokerId){
      return request('GET',vpan_server+'user/registerVpan20/'+mobile+'/'+pwd+'/'+client+'/'+Verification+'/'+brokerId);
    }
    //查询用户是否注册
     this.check_login=function(openid){
       return request('GET',vpan_server+'vpanuser/checkOpenIdExisting?opendId='+openid);
     }

    })
