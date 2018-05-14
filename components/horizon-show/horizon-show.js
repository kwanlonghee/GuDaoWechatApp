// components/horizon-show/horizon-show.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      toShowDetail:function(e){
          wx.navigateTo({
              url: '/pages/show-detail/show-detail?id=' + e.currentTarget.id
          })
      },

  }
})
