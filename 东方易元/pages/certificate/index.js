// pages/certificate/index.js
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
    var certificate = 'certificate';
    var id = getApp().globalData.user;
    console.log("user:" + JSON.stringify(getApp().globalData));

    wx.request({
      url: getApp().globalData.servicePath + 'app/member/MyCertificate',
      data: {
        'id': id
      },
      success: function (res) {
        console.log("certificate:" + JSON.stringify(res.data));
        _this.setData({
          [certificate]: res.data,
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

  },
      imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src]
    })
  }
})