// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showBand: 1,//切换tab
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
        var _this = this;
        // 获取band信息添加到band中
        wx.request({
            url: 'http://localhost/GuDao/Index/searchShow',
            data: {
                "key[]": options.key
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
                "key[]": options.key
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
    }
})