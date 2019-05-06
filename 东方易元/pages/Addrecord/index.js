// pages/Addrecord/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weight:'',
    lgxd:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var practiceId = options.practiceId;
    console.log("add:" + practiceId)
    that.setData({
       practiceId: practiceId,
         })
  
  },
  getWeight: function (e) {
    this.data.weight = e.detail.value;
  },
  getLgxd: function (e) {
    this.data.lgxd = e.detail.value;
  },
save: function(){
  var that = this;
  var weight = that.data.weight;
  var content = that.data.lgxd;
  if (weight != null && weight != '' && content != null && content != '' ){
    wx.request({
      url: getApp().globalData.servicePath + '/app/member/addPractice',
      data: {
        'practiceId': that.data.practiceId,
        'weight': that.data.weight,
        'content': that.data.lgxd,
      },
      success: function (res) {
        if (res.data.status == 0){}
        console.log("myPractice:" + JSON.stringify(res.data));
        wx.showToast({
          title: '成功',
          duration: 3000,
          success: function () {
            wx.navigateBack({
              delta: 2
            })
          }
        })
       

      }
    })
  }else{
    wx.showToast({
      title: '请输入完整信息',
      icon: 'loading',
      duration: 1000,
      mask: true
    })
  }

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