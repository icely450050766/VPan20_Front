
var SysUtil = function(){
    /**
     * 系统配置
     * @returns {{h5serverUrl: string}}
     */
    this.config = function(){
        return {
            h5serverUrl:'http://csvpan.4001881788.com/h5server'
        }
    }
}
var sysUtil = new SysUtil();

/**
 * Created by island on 2015/8/17.
 */
var WxUtil = function(){
    var _config = {
        appId:'wx7634edb8a9492de0',
        timestamp: (new Date()).getTime(),
        nonceStr: '7176fb1bf44c0676c387c63bbfcee6c2',
        h5serverUrl:sysUtil.config().h5serverUrl
    }
    //微信授权认证地址
    _config.authLoginUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7634edb8a9492de0&redirect_uri='
        + _config.h5serverUrl
        + '/wxauth/login&response_type=code&scope=snsapi_userinfo&state=gh&connect_redirect=1#wechat_redirect';

    //当前通过授权的微信用户信息
    //{"sex":null,"province":null,"city":null,"country":null,"privilege":null,"openid":null,"nickname":null,"headimgurl":null,"unionid":null}
    var _currentUser = null;

    var _isShare = false;
    var _shareID = null;

    /**
     * 获取url参数值
     *
     * @param name
     * @returns
     */
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null){
            return unescape(r[2]);
        }
        return null;
    }

    /**
     * 初始化微信配置
     */
    this.initWx = function() {
        var _openId = this.getOpenID(),
            me = this;
        wx.config({
            debug: false,
            appId: _config.appId,
            timestamp: _config.timestamp,
            nonceStr: _config.nonceStr,
            signature: this.getWXSignature(),
            jsApiList: [ "onMenuShareTimeline", "onMenuShareAppMessage" ]
        });
        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: '玩金手指抢IPAD，我只挖了' + me.getCurrentWxUserScore() + '金币，快来帮我挖！', // 分享标题
                link: _config.h5serverUrl + '/gh/loading.html?shareID=' + _openId, // 分享链接
                imgUrl: _config.h5serverUrl + '/gh/resource/assets/title.png', // 分享图标
                success: function () {
                    me.updateSpreadStatistics('share');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareAppMessage({
                title: '金明金手指',
                desc: '玩金手指抢IPAD，我只挖了' + me.getCurrentWxUserScore() + '金币，快来帮TA挖！',
                link: _config.h5serverUrl + '/gh/loading.html?shareID=' + _openId, // 分享链接
                imgUrl: _config.h5serverUrl + '/gh/resource/assets/title.png', // 分享图标
                success: function () {
                    //用户确认分享后执行的回调函数
                    me.updateSpreadStatistics('share');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });

    }

    /**
     * 定向到微信的登陆页面
     */
    this.wxAhenthication = function(){
        window.location.href = _config.authLoginUrl;
    }
    /**
     * 返回微信的JS API的数字签名
     */
    this.getWXSignature = function(){
        var noncestr = _config.nonceStr;
        var timestamp = _config.timestamp
        var url = location.href;
        if (url.indexOf('#') != -1) {
            url = url.substring(0, url.indexOf('#'));
        }
        var signature;
        $.ajax({
            url : _config.h5serverUrl + "/wxapi/jsapisignature?r=" + (Math.random()*100),
            async : false,
            data : {
                "jsNoncert" : noncestr,
                "timestamp" : timestamp,
                "url" : url
            },
            type : "GET",
            dataType : 'json',
            success : function(data) {
                if (data.signature) {
                    signature = data.signature;
                }
            },
            error : function(data) {
                signature = null;
            }
        });
        return signature;
    }

    /**
     * 返回当前游戏的分享者的openID，如果当前游戏不是分享出来的，即shareId为空
     * @returns {*}
     */
    this.getSharedID = function(){
        return  window.localStorage.getItem('shareId');
    }

    /**
     * 判断当前游戏是否是由其他人分享出来的
     * @returns {boolean}
     */
    this.isShared = function(){
        var _sId =  window.localStorage.getItem('shareId');
        if(_sId == null || _sId == ''){
            return false;
        }
        else{
            return true;
        }
    }

    this.initIfShare = function(){
        var sId = getQueryString("shareID");
        if(sId != null && sId != ''){
            window.localStorage.removeItem('shareId');
            window.localStorage.setItem('shareId', sId);
        }
    }

    /**
     * 当分享成功进入游戏之后，更新统计数据
     */
    this.updateSpreadStatistics = function(type){
        var _openId = this.getCurrentWxUser().openid,
            _target = location.href,
            _code = '201508_QF',
            _orginalShareOpenId = '';
        var _url = '';
        if(type == 'share'){
            _url = _config.h5serverUrl + '/h5api/shareTarget';
        }
        else{
            _url = _config.h5serverUrl + '/h5api/clickTarget';
        }

        if(this.isShared()){
            _orginalShareOpenId = this.getSharedID();
        }
        $.ajax({
            url : _url,
            async : true,
            data : {
                openId:_openId,
                orginalShareOpenId:_orginalShareOpenId,
                target:_target,
                activityCode:_code
            },
            type : "POST",
            dataType : 'json',
            success : function(data) {
                if (data.success != 'true') {
                    //donothing
                }
            },
            error : function(data) {
                //donothing
            }
        });
    }


    /**
     * 检查微信的登陆状态。
     * false, 未登陆
     * true, 已登录
     */
    this.checkWxAuthLoginStatus = function(){
        var _status = false;
        var me = this;
        $.ajax({
            url : _config.h5serverUrl + '/wxapi/cwxusrinfo?r=' + (Math.random()*100),
            async : false,
            data : {},
            type : "GET",
            dataType : 'json',
            success : function(data) {
                var _user = data;
                if (_user.openid != null) {
                    _currentUser = _user;
                    _status = true;
                    var _my = me.getMyScore().my;
                    _currentUser.score = _my.score;
                    _currentUser.rankNo = _my.rankNo;
                }
            },
            error : function(data) {
                _status = false;
            }
        });
        return _status;
    };

    /**
     * 获取的分数
     * @return {*}
     */
    this.getMyScore = function(){
        var _url = sysUtil.config().h5serverUrl + '/h5api/partnerScoreList';
        var _rslt = null;
        $.ajax({
            url : _url,
            async : false,
            type : "POST",
            dataType:'json',
            data:{
                code:'201508_QF',
                openId:wxUtil.getCurrentWxUser().openid
            },
            success : function(data) {
                _rslt = data;
            },
            error : function(data) {
                _rslt = null;
            }
        });
        return _rslt;
    }

    /**
     * 返回当前已经授权的用户
     * @returns {*}
     */
    this.getCurrentWxUser = function(){
        return _currentUser;
    }

    /**
     * 设置当前用户的得分。在游戏结束后，_interface.js的submitMyGameScore方法会调用此方法。
     * @param score
     */
    this.setCurrentWxUserScore = function(score){
        _currentUser.score = score;
    }

    this.getCurrentWxUserScore = function(){
        return _currentUser.score;
    }
    /**
     * 获取当前登陆后的微信用户openId
     * @returns {*}
     */
    this.getOpenID = function() {
        var openID = null;
        $.ajax({
            url : _config.h5serverUrl + "/wxapi/cwxusrinfo?r=" + (Math.random()*100),
            async : false,
            type : "GET",
            dataType : 'json',
            success : function(data) {
                if (data.openid) {
                    openID = data.openid;
                }
            },
            error : function(data) {
                openID = null;
            }
        });
        return openID;
    }


};

var wxUtil = new WxUtil();

$(function(){
    wxUtil.initIfShare();//保存是否当帮别人玩的页面
    var _login = wxUtil.checkWxAuthLoginStatus();
    if(_login){
        wxUtil.updateSpreadStatistics('click');//增加一次点击数
        wxUtil.initWx();
    }
    else{
        wxUtil.wxAhenthication();
    }
});