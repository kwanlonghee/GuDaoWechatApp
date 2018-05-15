const app = getApp();
Page({


    data: {
        countDown: "获取验证码",
        codeBtnFlag: true
    },

    onLoad: function (options) {

    },
    onCode: function () {
        this.setData({
            countDown: 20,
            codeBtnFlag: false
        })
        var _this = this;
        var int = setInterval(function () {
            if (_this.data.countDown == 1) {
                clearInterval(int);
                _this.setData({
                    countDown: "获取验证码",
                    codeBtnFlag: true
                })
            }
            else {
                _this.setData({
                    countDown: _this.data.countDown-1
                })
            }
        }, 1000);
        wx.request({
            url: 'http://localhost/GuDao/Index/sendCode',
            data: {
                email:_this.data.email
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            success: function (res) {
                console.log("sendCode seccess")
            }
        })
    },
    doRegister:function(e){
        console.log(e);
        let email = e.detail.value.mail;
        let code = e.detail.value.code;
        let password= e.detail.value.password;
        wx.request({
            url: 'http://localhost/GuDao/Index/doRegister',
            data: {
                email:email,
                code:code,
                password:password
            },
            header: {'content-type': 'application/x-www-form-urlencoded'},
            method: 'POST',
            success: function(res) {
                var wxSession = res.data.session_id;
                wx.setStorageSync('PHPSESSID', wxSession);
                app.globalData.login_flag = true;
                wx.switchTab({
                    url: '/pages/mine/mine'
                })
            }
        })
    },
    mailInput:function(e){
        this.setData({
            email : e.detail.value
        })
    }

})