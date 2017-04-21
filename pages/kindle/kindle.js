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
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '排行'
    })
    console.log('onLoad')
    var that = this

    wx.request({
      url: 'https://weixin.myhomespace.cn/weixin/bookStatistics?rank=readTimes&size=10',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res.data)
        that.setData({
          list:res.data
        })
      }
    })
    wx.request({
      url: 'https://weixin.myhomespace.cn/weixin/bookStatistics?rank=sendTimes&size=10',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res.data)
        that.setData({
          send:res.data
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