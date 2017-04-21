var app = getApp()
Page({
  data: {
    motto: '进入KindleMark',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function (option) {
    wx.setNavigationBarTitle({
          title: '用户中心'
    })
    var openId=getApp().globalData.openid;
    var that = this
    wx.request({
      url: 'https://weixin.myhomespace.cn/weixin/userInfo?openId='+openId,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res)
        var length = res.data.kindleEmail.length;
        var top=length*32+160;
        that.setData({
          kindleEmail:res.data.kindleEmail,
          read:res.data.read,
          send:res.data.send,
          top:top
        })
      }
    })

    
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})