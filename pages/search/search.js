// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showBand: 1,//切换tab
    },
    showBandSwitch: function (e) {
        console.log(e);
        if (e.currentTarget.id == "1") {
            this.setData({ showBand: 1 });

        }
        if (e.currentTarget.id == "2") {
            this.setData({ showBand: 2 })
        }
        console.log(this.data.showBand);

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.id)
        var _this = this;
        // 获取band信息添加到band中
        wx.request({
            url: 'http://localhost/GuDao/Band/getBandById',
            data: {
                "id": options.id
            },
            method: 'GET',
            success: function (res) {
                console.log(res.data.data);
                _this.setData({
                    band: res.data.data
                })
            }
        });
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