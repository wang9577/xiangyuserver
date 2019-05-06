// pages/register/index.js
var code = require('com.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,          //默认按钮1显示，按钮2不显示
    sec: "60",　　　　　　　　//设定倒计时的秒数
    phone: "",
    tjphone: "",
    code:"", 
    getcode:"1",
    url: getApp().globalData.servicePath,
  },
  codeInput:function(e){
    this.setData({
      code: e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  tjphoneInput: function (e) {
    this.setData({
      tjphone: e.detail.value
    })
  },
  /**
   * 验证码
   */
  getCode: function () {
    var _this = this;
    wx.request({
      url: getApp().globalData.servicePath + 'app/home/AppUserCode',
      data:{
        phone: _this.data.phone
      },
      success: function (res) {
        _this.setData({
          getcode: res.data
        })
      }
    })　
    var time = _this.data.sec　　//获取最初的秒数
    code.getCode(_this, time);　　//调用倒计时函数
  },
  register:function(){
    // if (this.data.getcode == this.data.code) {
      var that = this;
      wx.request({
        url: getApp().globalData.servicePath + 'app/home/AppRelationshipRegister',
        data: {
          phoneNumber: that.data.phone,
          openId: getApp().globalData.openid,
          tjphone: that.data.tjphone,
          userName: getApp().globalData.nickName,
          userUrl: getApp().globalData.avatarUrl,
          gender: getApp().globalData.userGender
        },
        success: function (res) {
          console.log(res.data)
          if (res.data == 0) {
            wx.showModal({
              title: "手机号已注册或推荐人手机号错误！",
              showCancel: false,
              confirmText: "确定"
            })
          } else {
            if (res.data.length != 0) {
              console.log("有用户信息！！！！！！！！！！")
              getApp().globalData.user = res.data[0].userId
              getApp().globalData.userType = res.data[0].type
              getApp().globalData.userName = res.data[0].userName
              getApp().globalData.userState = true
              getApp().globalData.userNumber = res.data[0].userNumber
                console.log(getApp().globalData.user)
                wx.request({
                  url: getApp().globalData.servicePath + '/app/member/AppMemberList',
                  data: {
                    'id': getApp().globalData.user
                  },
                  success: function (res) {  
                    if (res.data[0].user_type == 1) {//会员
                      var pages = getCurrentPages();
                      var prevPage = pages[pages.length - 2];
                      prevPage.setData({
                        status: 6
                      })
                      wx.navigateBack({
                        delta: 1
                      })  
                    }
                  }
                })
            } else {
              getApp().globalData.userState = false
            }
          }
        }
      })
    // } else {
    //   wx.showModal({
    //     title: "验证码错误！",
    //     showCancel: false,
    //     confirmText: "确定"
    //   })
    // }
  },
  
  /**
   * 生命周期函数--监听页面加载  
   * 1登录  2教练  3会员  4渠道商  5业务员   6注册
   */
  onLoad: function (options) {   //页面进入方法，具体怎么放数据可以参考教练
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示  1登录  2教练  3会员  4渠道商  5业务员   6注册
   */
  onShow: function () {
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})