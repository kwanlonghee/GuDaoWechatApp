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
    },
    doRegister:function(e){
        console.log(e)
        // wx.request({
        //     url: 'http://localhost/GuDao/Index/doRegister',
        //     data: '',
        //     header: {},
        //     method: 'GET',
        //     dataType: 'json',
        //     responseType: 'text',
        //     success: function(res) {},
        //     fail: function(res) {},
        //     complete: function(res) {},
        // })
    }

})