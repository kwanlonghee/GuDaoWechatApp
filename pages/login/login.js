const md5 = require("../../utils/md5.js");
const app = getApp();
Page({

    data: {

    },
    onLoad: function (options) {

    },
    doLogin: function (e) {
        let reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
        let regRes = reg.test(e.detail.value.mail);
        console.log(regSes)
        //验证邮箱有效性通过
        if (regRes) {
            let email = e.detail.value.mail;
            let pwd = md5.md5(e.detail.value.pwd);
            wx.request({
                url: 'http://localhost/GuDao/Index/doLogin',
                method: 'POST',
                header: {
                    'content-type': "application/x-www-form-urlencoded"
                },
                data: {
                    "email": email,
                    "password": pwd
                },
                success: function (res) {
                    // 验证账号密码通过
                    if (res.data.code === 200) {
                        var wxSession = res.data.session_id;
                        wx.setStorageSync('PHPSESSID', wxSession);//保存session_id
                        app.globalData.login_flag = true;//登录状态为true
                        wx.switchTab({
                            url: '/pages/mine/mine'
                        })
                    }
                    else {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                }
            })
        }
        //验证邮箱有效性不通过
        else {
            wx.showToast({
                title: '请输入正确的邮箱',
                icon: 'none',
                duration: 2000
            })
        }
    }
})