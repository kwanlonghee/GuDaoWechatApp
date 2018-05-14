Page({

    data: {
        showList: [],
        noticeList:[]
    },

    onLoad: function (options) {
        var _this = this;
        wx.request({
            url: 'http://localhost/GuDao/Show/getShowByPage',
            method: 'GET',
            success: function (res) {
                console.log(res.data.data);
                _this.setData({
                    showList: res.data.data
                })
            }
        });
        wx.request({
            url: 'http://localhost/GuDao/Index/getNotice',
            method: 'GET',
            success: function (res) {
                console.log(res.data.data);
                _this.setData({
                    noticeList: res.data.data
                })
            }
        })
    }

})