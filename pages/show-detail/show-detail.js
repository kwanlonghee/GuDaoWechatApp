// pages/show-detail/show-detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailBand: 1,
        show:[],
        BandList:[]
    },
    //   tab切换
    detailBandSwitch: function (e) {
        console.log(e);
        if (e.currentTarget.id == "1") {
            this.setData({ detailBand: 1 });

        }
        if (e.currentTarget.id == "2") {
            this.setData({ detailBand: 2 })
        }
        console.log(this.data.detailBand);

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.id)
        this.setData({
            id : options.id
        })
        var _this = this;
        // 获取show信息添加到show中
        wx.request({
            url: 'http://localhost/GuDao/Show/getShowByID',
            data: {
                "id": options.id
            },
            method: 'GET',
            success: function (res) {
                console.log(res.data.data);
                _this.setData({
                    show: res.data.data
                })
            }
        });
        // 获取show的演出乐队信息添加到bandList中
        wx.request({
            url: 'http://localhost/GuDao/Show/getBandByShow',
            data: {
                "id": options.id
            },
            method: 'GET',
            success: function (res) {
                console.log(res.data.data);
                _this.setData({
                    bandList: res.data.data
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