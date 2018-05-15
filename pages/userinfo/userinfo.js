const app = getApp();
Page({

  data: {
        gender:"",
        birthday:"",
        userInfo:[]
  },

  onShow: function (options) {
      this.checkLogin()
  },
  checkLogin: function () {
      var _this = this;
      var session_id = wx.getStorageSync('PHPSESSID');
      var header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'PHPSESSID=' + session_id }
      wx.request({
          url: 'http://localhost/GuDao/Index/checkLogin',
          method: 'POST',
          header: header,
          success: function (res) {
              app.globalData.user_id = res.data.data.user_id;
              _this.setData({
                  user_id: app.globalData.user_id,
                  login_flag: app.globalData.login_flag,
                  userInfo: res.data.data,
                  birthday:res.data.data.birthday
              })

          }
      })
  },
  genderChange:function(e){
    this.setData({
        gender:e.detail.value
    })
  },
  dateChange:function(e){
    this.setData({
        birthday:e.detail.value
    })
  },
  editInfo:function(e){
    console.log(e)
    let intro = e.detail.value.intro;
    let name = e.detail.value.name;
    let gender = this.data.gender;
    let birthday = this.data.birthday;
    let id = app.globalData.user_id;
    wx.request({
        url: 'http://localhost/GuDao/User/modifyUserInfo',
        method: 'POST',
        data:{
            "id": id,
            "username": name,
            "gender": gender,
            "birthday": birthday,
            "intro": intro
        },
        header: { 'content-type': 'application/x-www-form-urlencoded'},
        success: function (res) {
            wx.switchTab({
                url: '/pages/mine/mine'
            })
        }
    })
  }

})