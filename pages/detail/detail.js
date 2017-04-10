var app = getApp()
Page({
  data: {
    motto: '进入KindleMark',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (option) {
    console.log('onLoad')
    wx.request({
      url: 'https://weixin.myhomespace.cn/weixin/bookDetail', //仅为示例，并非真实的接口地址
      data: {
        bookName: option.bookName 
      },
      header: {
      'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          list:res.data
        });
      }
    })

    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})