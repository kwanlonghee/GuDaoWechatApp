const app = getApp();
Page({


    data: {
        countDown: "获取验证码",
        codeBtnFlag: true
    },

    onLoad: function (options) {

    },
    onCode: function () {
        let reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
        let regRes = reg.test(this.data.email);
        if (regRes) {
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
                        countDown: _this.data.countDown - 1
                    })
                }
            }, 1000);
            let email = _this.data.email;
            wx.request({
                url: 'http://localhost/GuDao/Index/sendCode',
                data: {
                    email: email
                },
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                method: 'POST',
                success: function (res) {
                    if (res.data.code === 200) {
                        wx.showToast({
                            title: '验证码已经发送',
                            icon: 'success',
                            duration: 1000
                        })
                    }
                    else {
                        clearInterval(int);
                        _this.setData({
                            countDown: "获取验证码",
                            codeBtnFlag: true
                        })
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                }
            })
        }
        else {
            wx.showToast({
                title: '请输入正确的邮箱',
                icon: 'none',
                duration: 2000
            })
        }
    },
    doRegister: function (e) {
        let email = e.detail.value.mail;
        let code = e.detail.value.code;
        let password = e.detail.value.password;
        if (email && code && password) {
            wx.request({
                url: 'http://localhost/GuDao/Index/doRegister',
                data: {
                    email: email,
                    code: code,
                    password: password
                },
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                method: 'POST',
                success: function (res) {
                    if (res.data.code === 200) {
                        var wxSession = res.data.session_id;
                        wx.setStorageSync('PHPSESSID', wxSession);
                        app.globalData.login_flag = true;
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
    },
    mailInput: function (e) {
        this.setData({
            email: e.detail.value
        })
    }

})