Component({
  properties: {
        com : Object
  },
  data: {

  },
  methods: {
    onReply:function(){
        var myEventDetail = {
            comment_id : this.data.com.comment_id
        } 
        var myEventOption = {} 
        this.triggerEvent('onReply', myEventDetail, myEventOption)
    }
  }
})
