// components/comment-bar/comment-bar.js
const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        "type": String,
        "_id": Number,
        "support":Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
        inputValue: ""

    },

    /**
     * 组件的方法列表
     */
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
        },
        cancel:function(){
            var myEventDetail = {} // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('cancel', myEventDetail, myEventOption)
        },
        like:function(){
            var myEventDetail = {} // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('like', myEventDetail, myEventOption)
        }
    }
})
