const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showPhoto: 1,//切换tab
        band: [],//通过ajax获取band信息
        showList: [],//band参与过的演出
        pictures: [],//band的图片
        support: false
    },
    // tab的切换事件
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
        console.log(options.id);
        this.setData({
            id: options.id
        })
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
        // 获取演出经历添加到showList中
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
        // 获取图片添加到pictures中
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
        });
        // 获取是否支持
        wx.request({
            url: 'http://localhost/GuDao/Band/checkSupport',
            data: {
                "user_id": app.globalData.user_id,
                "id": options.id
            },
            method: 'GET',
            success: function (res) {
                console.log(res)
                if (res.data.code == 200) {
                    _this.setData({
                        support: true
                    })
                }
            }
        });
    },
    cancel: function () {
        var _this = this;
        wx.request({
            url: 'http://localhost/GuDao/Band/deleteSupport',
            data: {
                "user_id": app.globalData.user_id,
                "band_id": this.data.band.band_id,
            },
            header: {
                'content-type': "application/x-www-form-urlencoded"
            },
            method: 'POST',
            success: function (res) {
                _this.setData({
                    support: false
                })
            }
        });
    },
    like: function () {
        var _this = this;
        var time = new Date();
        time = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();
        wx.request({
            url: 'http://localhost/GuDao/Band/addSupport',
            data: {
                "user_id": app.globalData.user_id,
                "band_id": this.data.band.band_id,
                "time": time
            },
            header: {
                'content-type': "application/x-www-form-urlencoded"
            },
            method: 'POST',
            success: function (res) {
                _this.setData({
                    support: true
                })
            }
        });
    }

})