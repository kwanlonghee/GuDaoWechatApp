// pages/login/login.js
const md5 = require("../../utils/md5.js");
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    doLogin: function (e) {
        wx.request({
            url: 'http://localhost/GuDao/Index/doLogin',
            method: 'POST',
            header: {
                'content-type': "application/x-www-form-urlencoded"
            },
            data: {
                "email": e.detail.value.mail,
                "password": md5.md5(e.detail.value.pwd)
            },
            success: function (res) {
                console.log(res);
                var wxSession = res.data.session_id;
                wx.setStorageSync('PHPSESSID', wxSession);
                app.globalData.login_flag = true;
                wx.switchTab({
                    url: '/pages/mine/mine'
                })
            }
        })
    }
})