const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bandShow: 1
    },
    onLoad: function (options) {
        console.log(app.globalData.login_flag);
        this.setData({
            user_id: app.globalData.user_id,
            login_flag: app.globalData.login_flag
        })
    },
    bandShowSwitch: function (e) {
        console.log(e);
        if(e.currentTarget.id == "1"){
            this.setData({bandShow:1});
            
        }
        if(e.currentTarget.id == "2"){
            this.setData({bandShow:2})
        }
        console.log(this.data.bandShow)
    }
})