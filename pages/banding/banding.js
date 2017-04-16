var app = getApp()
var KindleEmail1="";
var code="";
var isCode="";
var openid="";
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
  },emailInput:function(e){
    KindleEmail1=e.detail.value;
    this.setData({
        KindleEmail: e.detail.value
    });
  },codeInput:function(e){
    code=e.detail.value;
    this.setData({
        code: e.detail.value
    });
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var codeClass="";
    if(e.detail.value=="yes"){
        codeClass="codeShow";
        isCode=e.detail.value;
        this.setData({
            isCode: e.detail.value
        });
    }else{
        isCode=e.detail.value;
        codeClass="codeHidden";
        this.setData({
            isCode: e.detail.value
        });
    }
    this.setData({
        codeClass: codeClass
    });
  },bandingKindleEmail:function(){
    var KindleEmail = KindleEmail1;
    if(KindleEmail==""||KindleEmail==null){
      wx.showToast({
        title: 'KindleEmail不能为空',
        icon: 'loading',
        duration: 2000
      })
    }else{
      var url="https://weixin.myhomespace.cn/weixin/bandingKindleEmail?kindleEmail="+KindleEmail+"&openId="+openid;
      if(isCode=="yes"){
        url=url+"&code="+code;
      }
       wx.request({
              url: url, //仅为示例，并非真实的接口地址
              header: {
                'content-type': 'application/json'
              },
              success: function(res) {
                console.log(res.data)
                if(res.data.bandingStatus=="true"){
                  wx.showToast({
                    title: res.data.message,
                    icon: 'success',
                    duration: 3000
                  })
                  setTimeout(function(){
                    wx.switchTab({
                      url: '../dashboard/dashboard'
                    },3000)
                  });
                }else{
                  wx.showModal({
                    title: '警告',
                    content: res.data.message,
                    showCancel:false,
                    success: function(res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                }
              }
          })
    }
    
  },
  onLoad: function (option) {
    wx.setNavigationBarTitle({
      title: '绑定KindleEmail'
    })
    openid = option.openid;
    this.setData({
        openid: openid
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