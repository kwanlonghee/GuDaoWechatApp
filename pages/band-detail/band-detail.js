// pages/band-detail/band-detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showPhoto: 1,
        band: [],
        showList: [],
        pictures:[]
    },
    showPhotoSwitch: function (e) {
        console.log(e);
        if (e.currentTarget.id == "1") {
            this.setData({ showPhoto: 1 });

        }
        if (e.currentTarget.id == "2") {
            this.setData({ showPhoto: 2 })
        }
        console.log(this.data.showPhoto);

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.id)
        var _this = this;
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
        wx.request({
            url: 'http://localhost/GuDao/Band/getExperience',
            data: {
                "id": options.id
            },
            method: 'GET',
            success: function (res) {
                console.log(res.data.data);
                _this.setData({
                    showList: res.data.data
                })
            }
        });
        wx.request({
            url: 'http://localhost/GuDao/Band/getPictureByBand',
            data: {
                "id": options.id
            },
            method: 'GET',
            success: function (res) {
                console.log(res.data.data);
                _this.setData({
                    pictures: res.data.data
                })
            }
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