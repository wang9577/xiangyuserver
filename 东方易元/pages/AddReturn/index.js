// pages/AddReturn/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    count:'',
  },
  names :function(e){
    this.setData({
      name: e.detail.value
    })
  },
  count: function (e) {
    this.setData({
      count: e.detail.value
    })
  },
  save:function(){
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppVisitSave',
      data: {
        coachId: getApp().globalData.user,
        username:this.data.name,
        visitContent:this.data.count
      },
      success: function (res) {
        if(res.data ==1 ){
          wx.navigateBack({
            delta: 1
          })
        }else{

        }
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