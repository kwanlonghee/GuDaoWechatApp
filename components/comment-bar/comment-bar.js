// components/comment-bar/comment-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    "type":String,
    "_id": Number
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
      toComment:function(){
        console.log(this.data.id);
        wx.navigateTo({
            url: '/pages/comments/comments?type=' + this.data.type + "&id=" + this.data._id,
        })
      }
  }
})
