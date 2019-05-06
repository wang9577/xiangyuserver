// pages/Return/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var id = options.id;
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppVisitList',
      data: {
        'coachId': id,
      },
      success: function (res) {
        _this.setData({
          visit: res.data,
          'id': id
        })
      }
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
    console.log(this.data.id)
    var _this = this;
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppVisitList',
      data: {
        'coachId': _this.data.id
      },
      success: function (res) {
        _this.setData({
          visit: res.data,
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
  submit: function (e) {
    this.setData({
      showModal: true,
      nr: this.data.visit[e.target.dataset.id].visit_content
    })
  },

  preventTouchMove: function () {

  },


  go: function () {
    this.setData({
      showModal: false
    })
  }
})