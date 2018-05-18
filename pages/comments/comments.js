const app = getApp();
Page({

    data: {
        coms: [],
        replyFlag: false,
        inputValue: ""
    },
    onLoad: function (options) {
        console.log(app.globalData)
        var type = options.type;
        var id = options.id;
        this.setData({
            type: type,
            id: id
        });
        this.getComment(type, id);
    },
    getComment: function (type, id) {
        var _this = this;
        var target;
        if (type == "Show") { target = 1 }
        else { target = 2 }
        wx.request({
            url: 'http://localhost/GuDao/' + type + '/getCommentNReply',
            method: 'GET',
            data: {
                target: target,
                id: id
            },
            success: function (res) {
                console.log(res.data.data);
                _this.setData({
                    coms: res.data.data
                })
            }
        })
    },
    onReply: function (e) {
        console.log(e);
        this.setData({
            replyFlag: true,
            comment_id: e.detail.comment_id
        })
    },
    replyConfirm: function (e) {
        if (app.globalData.login_flag) {
            var time = new Date();
            var content = e.detail.value;
            var target;
            if (this.data.type == "Show") { target = 1 }
            else { target = 2 }
            var _this = this;
            time = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
            wx.request({
                url: 'http://localhost/GuDao/' + this.data.type + '/replyComment',
                method: 'POST',
                header: {
                    'content-type': "application/x-www-form-urlencoded"
                },
                data: {
                    "comment_id": this.data.comment_id,
                    "content": content,
                    "time": time,
                    "user_id": app.globalData.user_id,
                    "target_id": this.data.id
                },
                success: function (res) {
                    _this.getComment(_this.data.type, _this.data.id);
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
    addConfirm: function (e) {
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
                "target_id": this.data.id
            },
            success: function (res) {
                _this.getComment(_this.data.type, _this.data.id);
                _this.setData({
                    inputValue: ""
                })
            }
        })
    },
    inputBlur: function () {
        this.setData({
            inputValue: ""
        })
    }
})