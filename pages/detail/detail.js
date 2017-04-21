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
  },sendKindle:function(){
    var openid=getApp().globalData.openid;
    var bookName=this.data.bookName;
      var that = this
      that.setData({
        disabled:true
      })
    
    //订阅kindle
    wx.request({
      url: 'https://weixin.myhomespace.cn/weixin/kindleSend',
      data: {
        openId:openid,
        bookName:bookName
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res.data)
        
        if(res.data.sendStatus=="true"){
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
          that.setData({
            disabled:false
          })
        
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
           that.setData({
            disabled:false
          })
        
        }
      }
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
    wx.request({
      url: 'https://weixin.myhomespace.cn/weixin/bookCount', //仅为示例，并非真实的接口地址
      data: {
        id: option.id,
        openId:getApp().globalData.openid,
        readTimes:"1" 
      },
      header: {
      'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
      }
    })
    console.log("globalOpenId:"+getApp().globalData.openid)

    var that = this
    that.setData({
      bookName:option.bookName 
    });
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})