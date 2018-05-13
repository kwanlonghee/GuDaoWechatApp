// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showBand: 1,//切换tab
        key: "",
        showList: [],
        bandList: [],
        showEmpty: false,
        bandEmpty: false
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
        console.log(options.key)
        var _this = this;
        // 获取band信息添加到band中
        wx.request({
            url: 'http://localhost/GuDao/Index/searchShow',
            data: {
                "key": options.key
            },
            method: 'GET',
            success: function (res) {
                if (res.data.code == 200){
                    _this.setData({
                        showList: res.data.data
                    })
                }
                else if (res.data.code == 201) {
                    _this.setData({
                        showEmpty: true
                    })
                }
            }
        });
        wx.request({
            url: 'http://localhost/GuDao/Index/searchBand',
            data: {
                "key": options.key
            },
            method: 'GET',
            success: function (res) {
                if (res.data.code == 200) {
                    _this.setData({
                        bandList: res.data.data
                    })
                }
                else if (res.data.code == 201) {
                    _this.setData({
                        bandEmpty: true
                    })
                }
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