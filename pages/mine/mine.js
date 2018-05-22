const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bandShow: 1,
        userInfo:[],
        bands:[],
        shows:[],
        age:""
    },
    onLoad: function (options) {
        console.log(app.globalData.login_flag);
        this.setData({
            user_id: app.globalData.user_id,
            login_flag: app.globalData.login_flag
        })
    },
    onShow: function () {
        if (app.globalData.login_flag) {
            this.checkLogin();

        }
    },
    checkLogin: function () {
        var _this = this;
        var session_id = wx.getStorageSync('PHPSESSID');
        var header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id }
        wx.request({
            url: 'http://localhost/GuDao/Index/checkLogin',
            method: 'POST',
            header: header,
            success: function (res) {
                console.log(res);
                app.globalData.user_id = res.data.data.user_id;
                let age = new Date().getFullYear() - res.data.data.birthday.split("-")[0];
                console.log(age);
                console.log(new Date().getFullYear());
                console.log(res.data.data.birthday.split("-")[0]);
                _this.setData({
                    user_id: app.globalData.user_id,
                    login_flag: app.globalData.login_flag,
                    userInfo: res.data.data,
                    age: age
                })
                _this.getUserActivity();
            }
        })
    },
    getUserActivity:function(){
        var _this = this;
        wx.request({
            url: 'http://localhost/GuDao/User/getUserActivity',
            data:{
                "id": app.globalData.user_id
            },
            success:function(res){
                console.log(res)
                var act = res.data.data.activity;
                console.log(act)
                var bands=[];
                var shows=[];
                for(let i = 0; i < act.length ;i++){
                    if (act[i]["type"] == "show") {
                        shows.push(act[i]["show"]);
                    } else {
                        bands.push(act[i]["band"]);
                    }
                }
                _this.setData({
                    bands:bands,
                    shows:shows
                })
            }
        })
    },
    toLogin: function () {
        wx.navigateTo({
            url: '/pages/login/login',
        })
    },
    toRegister:function(){
        wx.navigateTo({
            url: '/pages/register/register',
        })
    },
    editInfo:function(){
        wx.navigateTo({
            url: '/pages/userinfo/userinfo',
        })
    },
    resetPwd:function(){
        wx.navigateTo({
            url: '/pages/password/password',
        })
    },

    bandShowSwitch: function (e) {
        console.log(e);
        if (e.currentTarget.id == "1") {
            this.setData({ bandShow: 1 });

        }
        if (e.currentTarget.id == "2") {
            this.setData({ bandShow: 2 })
        }
        console.log(this.data.bandShow)
    }
})