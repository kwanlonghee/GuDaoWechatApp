const app = getApp();// pages/comments/comments.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coms: [],
        replyFlag: false,
        inputValue:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(app.globalData)
        var type = options.type;
        var id = options.id;
        this.setData({
            type : type,
            id : id
        });
        this.getComment(type,id);
    },

    getComment:function(type,id){
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
        console.log(e.detail);
        this.setData({
            replyFlag: true
        })
    },
    replyConfirm: function (e) {
        console.log(e.detail.value);

    },
    addConfirm:function(e){
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
    inputBlur:function(){
        this.setData({
            inputValue:""
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})