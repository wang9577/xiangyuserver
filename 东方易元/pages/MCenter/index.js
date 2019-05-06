// pages/MCenter/index.js
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var _this = this;
    var myCenter = 'myCenter';
    var id = getApp().globalData.user;
    console.log("myCenter:" + JSON.stringify(getApp().globalData));
    //会员列表
    wx.request({
      url: getApp().globalData.servicePath + 'app/member/myCenter',
      data: {
        'id': id
      },
      success: function (res) {
        console.log("myCenter:" + JSON.stringify(res.data));
        _this.setData({
          myCenter: res.data

        })
        var quanYi = res.data.benefit.content;
        WxParse.wxParse('quanYi', 'html', quanYi, _this, 5);
      }
    })
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