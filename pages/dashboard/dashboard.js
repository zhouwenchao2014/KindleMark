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
  },bindblur:function(e){

  },
  onLoad: function (option) {
    wx.setNavigationBarTitle({
      title: '主页'
    })
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
              url: 'https://weixin.myhomespace.cn/weixin/user?code='+res.code, //仅为示例，并非真实的接口地址
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                console.log(res.data)
                 var openid=res.data.openid
                if(res.data.isContain=="false"){
                    wx.showModal({
                      title: '未绑定',
                      content: '未绑定Kindle邮箱',
                      cancelText:'先看看',
                      confirmText:'去绑定',
                      success: function(res) {
                        if (res.confirm) {
                          wx.navigateTo({
                            url: '../banding/banding?openid='+openid
                          })
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                }
              }
          })
          
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

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