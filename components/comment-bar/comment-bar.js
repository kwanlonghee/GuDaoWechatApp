const app = getApp();
Component({
    properties: {
        "type": String,
        "_id": Number,
        "support": Boolean
    },
    data: {
        inputValue: ""

    },
    methods: {
        toComment: function () {
            wx.navigateTo({
                url: '/pages/comments/comments?type=' + this.data.type + "&id=" + this.data._id,
            })
        },
        inputBlur: function () {
            this.setData({
                inputValue: ""
            })
        },
        addConfirm: function (e) {
            if (app.globalData.login_flag) {
                var time = new Date();
                var content = e.detail.value;
                var target;
                if (this.data.type == "Show") { target = 1 }
                else { target = 2 }
                var _this = this;
                time = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
                wx.request({
                    url: 'http://localhost/GuDao/' + this.data.type + '/sendComment',
                    method: 'POST',
                    header: {
                        'content-type': "application/x-www-form-urlencoded"
                    },
                    data: {
                        "content": content,
                        "user_id": app.globalData.user_id,
                        "time": time,
                        "target": target,
                        "target_id": this.data._id
                    },
                    success: function (res) {
                        _this.setData({
                            inputValue: ""
                        })
                    }
                })
            }
            else {
                wx.showToast({
                    title: '请先登录再进行操作',
                    icon: 'none',
                    duration: 2000
                })
            }
        },
        cancel: function () {
            if (app.globalData.login_flag) {
                var myEventDetail = {}
                var myEventOption = {}
                this.triggerEvent('cancel', myEventDetail, myEventOption)
            }
            else {
                wx.showToast({
                    title: '请先登录再进行操作',
                    icon: 'none',
                    duration: 2000
                })
            }
        },
        like: function () {
            if (app.globalData.login_flag) {
                var myEventDetail = {}
                var myEventOption = {}
                this.triggerEvent('like', myEventDetail, myEventOption)
            }
            else {
                wx.showToast({
                    title: '请先登录再进行操作',
                    icon: 'none',
                    duration: 2000
                })
            }
        }
    }
})
