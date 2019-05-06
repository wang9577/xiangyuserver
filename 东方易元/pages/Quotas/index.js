// pages/Quotas/index.js
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
    var _this = this;
    var kyMoney = options.kyMoney;
    var zMoney = options.zMoney;
    console.log("kyMoney:" + kyMoney + "zMoney:" + zMoney);
    _this.setData({
      kyMoney: kyMoney,
      zMoney: zMoney,
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
    var quotas = 'quotas';
    var id = getApp().globalData.user;
    console.log("user:" + JSON.stringify(getApp().globalData));

    wx.request({
      url: getApp().globalData.servicePath + 'app/member/quotas',
      data: {
        'id': id
      },
      success: function (res) {
        console.log("quotas:" + JSON.stringify(res.data));
        _this.setData({
          [quotas]: res.data,
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