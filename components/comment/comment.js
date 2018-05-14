// components/comment/comment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
        com : Object
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
    onReply:function(){
        var myEventDetail = {
            comment_id : this.data.com.comment_id
        } // detail对象，提供给事件监听函数
        var myEventOption = {} // 触发事件的选项
        this.triggerEvent('onReply', myEventDetail, myEventOption)
    }
  }
})
