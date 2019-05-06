// pages/Pukafeedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getContent: function (e) {
    console.log("content:" + e.detail.value)
    this.data.content = e.detail.value;
  },

  register: function () {
    var that = this;
    var id = getApp().globalData.user;
    console.log("that:" + that.data.content)
    wx.request({
      
      url: getApp().globalData.servicePath + 'app/member/feedbackSave.json',
      data: {
        'content': that.data.content,
        'userId': id
      },
      method: "GET",
      success: function (e) {
        console.log(e)
        if (e.data.status == 0) {
          wx.showToast({
            title: '保存成功',
            duration: 1500,
            success: function () {
              setTimeout(function () {
                //要延时执行的代码
                wx.switchTab({
                  url: '../register/index'
                })
              }, 1500) //延迟时间 
            }
          })

        } else {
          wx.showToast({
            title: e.data.msg,
          })
        }
        console.log(getApp().globalData.user)
      },
      fail: function () {
      },
      complete: function () {
      }
    })
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