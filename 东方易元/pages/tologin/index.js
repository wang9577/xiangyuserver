//index.js

Page({
  data: {
   
  },
  
  bindGetUserInfo: function(){
    wx.showLoading({
      title: '授权中...',
      icon: 'loading',
    });
    var that = this
    wx.login({
      success: function (res_login) {
        if (res_login.code) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              wx.request({
                url: getApp().globalData.servicePath + '/app/home/decodeUserInfo',
                data: {
                  code: res_login.code,
                  encryptedData: res.encryptedData,
                  iv: res.iv
                },
                success: res => {
                  getApp().globalData.openid = res.data.userInfo.openId;
                  getApp().globalData.nickName = res.data.userInfo.nickName;
                  getApp().globalData.avatarUrl = res.data.userInfo.avatarUrl;
                  getApp().globalData.userGender = res.data.userInfo.gender;
                  console.log(res.data.userInfo.openId)
                  wx.request({
                    url: getApp().globalData.servicePath + '/app/home/AppRelationshipList',
                    data: { openId: res.data.userInfo.openId },
                    success: function (res) {         
                      if (res.data.length != 0) {
                        console.log("有用户信息！！！！！！！！！！")
                        getApp().globalData.userName = res.data[0].userName;
                        getApp().globalData.user = res.data[0].userId;
                        getApp().globalData.userNumber = res.data[0].userNumber;
                        getApp().globalData.userType = res.data[0].type;
                        getApp().globalData.userState = true;
                      } else {
                        getApp().globalData.userState = false;
                      }
                      getApp().globalData.activtitiesState = 5
                      wx.navigateBack({
                        delta: 2
                      })
                    }
                  })
                }
              })
            },
          })

        }
      }
    })

  },
  onLoad: function () {
   
  },
  
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  

  onShow: function(){
  }

})

