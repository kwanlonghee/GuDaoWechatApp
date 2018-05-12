// components/search-bar/search-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      searchFocus: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
      onSearchFocus: function () {
          console.log("111")
          this.setData({ searchFocus: true });
      },
      onSearchBlur: function () {
          this.setData({ searchFocus: false });
      }
  }
})
