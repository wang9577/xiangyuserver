// pages/Message/index.js
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
  getDayName: function (d) {
    var t1 = new Date(d.replace(/-/g, '/'))
    var t2 = new Date()
    var t = new Date(t2 - t1 + 16 * 3600 * 1000)
    var d = parseInt(t.getTime() / 1000 / 3600 / 24)  //天
    var h = t.getHours()     //时
    var m = t.getMinutes()   //分
    var s = t.getSeconds()   //秒
    if (d == 0) {
      if (h > 0) {
        return h + "小时前"
      } else {
        if (m > 0) {
          return m + "分钟前"
        } else {
          return "刚刚"
        }
      }
    } else if (d == 1) {
      return "1天前"
    } else if (d == 2) {
      return "2天前"
    } else if (d == 3) {
      return "3天前"
    } else {
      var min;
      if (t1.getMinutes() > 9) {
        min = t1.getMinutes()
      } else {
        min = "0" + t1.getMinutes()
      }
      return t1.getMonth() + 1 + "月" + t1.getDate() + "日 " + t1.getHours() + ":" + min
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    var viewpoint = 'viewpoint'
    //消息
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppViewpointXx',
      data:{
        userNum: getApp().globalData.userNumber
      },
      success: function (res) {
        console.log(res.data)
        var messa = res.data;
        for (let i in messa) {
          messa[i].creation_time = _this.getDayName(messa[i].creation_time)
          if (messa[i].user_url == null) {
            console.log("没有图像！！！！！！！！！！！！！")
          } else {
            if (messa[i].user_url.indexOf("wx.qlogo.cn") != -1) { } else {
              console.log("没有微信图像！！！！！！！！！！！！！")
              messa[i].user_url = getApp().globalData.servicePath + "/imgfile/" + messa[i].user_url
            }
          }
        }
        _this.setData({
          [viewpoint]: messa,
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