// components/band/band.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    band:Array
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
      toBandDetail:function(e){
          wx.navigateTo({
              url: '/pages/band-detail/band-detail?id=' + e.currentTarget.id
          })
      }
  }
})
