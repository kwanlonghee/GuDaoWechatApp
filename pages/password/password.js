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
                url: 'http://localhost/GuDao/User/sendCode',
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
        console.log(e.detail)
        var email = e.detail.value.mail;
        var code = e.detail.value.code;
        var password = e.detail.value.pwd;
        var pwdVerify = e.detail.value.pwdVerify;
        if (email && code && password && pwdVerify) {
            if (password === pwdVerify) {
                wx.request({
                    url: 'http://localhost/GuDao/User/checkCode',
                    data: {
                        email: email,
                        code: code
                    },
                    header: { 'content-type': 'application/x-www-form-urlencoded' },
                    method: 'POST',
                    success: function (res) {
                        if (res.data.code === 200) {
                            wx.request({
                                url: 'http://localhost/GuDao/User/resetPassword',
                                data: {
                                    email: email,
                                    code: code,
                                    password: password
                                },
                                header: { 'content-type': 'application/x-www-form-urlencoded' },
                                method: 'POST',
                                success: function (res) {
                                    if (res.data.code === 200) {
                                        wx.showToast({
                                            title: '修改成功',
                                            icon: 'none',
                                            duration: 2000
                                        })
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
            else {
                wx.showToast({
                    title: '两次输入密码不一致',
                    icon: 'none',
                    duration: 2000
                })
            }
        }
    },
    mailInput: function (e) {
        this.setData({
            email: e.detail.value
        })
    }

})