// pages/Tutorship/index.js
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
    var id = options.id;
    var _this = this;
    var accountRakeback = 'accountRakeback';
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppAccountRakebackList',
      data:{
        userId:id,
        userType:1
      },
      success: function (res) {
        var numbers = 0;
        var money = res.data
        console.log(money)
        for (let i in money){
          numbers += money[i].money
          if (money[i].avatarUrl == null) {
            console.log("没有用户图像！！！！！！！！！！！！！")
          } else {
            if (money[i].avatarUrl.indexOf("wx.qlogo.cn") != -1) { } else {
              console.log("没有微信图像！！！！！！！！！！！！！")
              money[i].avatarUrl = getApp().globalData.servicePath + "/imgfile/" + money[i].avatarUrl
            }
          }
        }
        _this.setData({
          [accountRakeback]: res.data,
          'numbers': numbers
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