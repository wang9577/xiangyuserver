// pages/Modify01/index.js
var code = require('../register/com.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,          //默认按钮1显示，按钮2不显示
    sec: "60",　　　　　　　　//设定倒计时的秒数
    getcode: '1',
    code: "",
  },
  xphoneInput: function (e) {
    this.setData({
      'xphone': e.detail.value
    })
  },
  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  /**
     * 验证码
     */
  getCode: function () {
    var _this = this;
    wx.request({
      url: getApp().globalData.servicePath + 'app/home/AppUserCode',
      data: {
        phone: _this.data.xphone
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
  save: function () {
    if (this.data.getcode == this.data.code) {
      console.log(this.data.yphone)
      console.log(this.data.xphone)
      wx.request({
        url: getApp().globalData.servicePath + 'app/salesman/AppSalesEdit',
        data: {
          yphone: this.data.yphone,
          xphone: this.data.xphone
        },
        success: function (res) {
          if(res.data ==1){
          wx.navigateBack({
            delta: 2
          })
          }else{
            wx.showModal({
              title: "手机号更换失败！！",
              showCancel: false,
              confirmText: "确定"
            })
            wx.navigateBack({
              delta: 2
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: "验证码错误！",
        showCancel: false,
        confirmText: "确定"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var yphone = options.phone
    this.setData({
      'yphone': yphone
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
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