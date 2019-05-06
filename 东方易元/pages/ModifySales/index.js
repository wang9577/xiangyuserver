// pages/Modify/index.js
var code = require('../register/com.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,          //默认按钮1显示，按钮2不显示
    sec: "60",　　　　　　　　//设定倒计时的秒数
    getcode:'1',
    code: "",
  },
  codeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var phone = options.phone;
    this.setData({
      'ph': phone,
      'phone': phone.substring(0, 3) + '****' + phone.substring(7),
    })
  },
  save:function(){
    if (this.data.getcode == this.data.code) {
    wx.navigateTo({
      url:"../Modify2/index?phone="+this.data.ph
    })
    }else{
      wx.showModal({
        title: "验证码错误！",
        showCancel: false,
        confirmText: "确定"
      })
    }
  },
  /**
     * 验证码
     */
  getCode: function () {
    var _this = this;
    wx.request({
      url: getApp().globalData.servicePath + 'app/home/AppUserCode',
      data: {
        phone: _this.data.ph
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