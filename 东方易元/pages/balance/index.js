// pages/balance/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.servicePath,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var grade = options.grade;
    this.setData({
      grade: grade,
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
    var _this = this;
    var balance = 'balance';
    var id = getApp().globalData.user;
    console.log("user:" + JSON.stringify(getApp().globalData));

    wx.request({
      url: getApp().globalData.servicePath + 'app/member/balance',
      data: {
        'id': id
      },
      success: function (res) {
        console.log("balance:" + JSON.stringify(res.data));
        _this.setData({
          balance: res.data,
        })
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