// pages/Release/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: []
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
  count: function (e) {
    this.setData({
      'count': e.detail.value
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  uploadimg: function () {//这里触发图片上传的方法
    var files = this.data.files;
    var _that = this;
    var timestamp = "GWT" + parseInt(new Date().getTime() / 1000);
    if (files.length == 0 && (_that.data.count == "" || _that.data.count == null)){
      wx.showModal({
        title: "请输入内容",
        showCancel: false,
        confirmText: "确定"
      })
      return false
    }
    if (_that.data.count == "" || _that.data.count == null){
      _that.data.count = " "
    }
    if (files.length == 0){
      //保存感悟
      wx.request({
        url: getApp().globalData.servicePath + '/app/home/AppViewpointSave',
        data: {
          pictureNum: timestamp,
          content: _that.data.count,
          userNum: getApp().globalData.userNumber,
        },
        success: function (res) {
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          prevPage.setData({
            statusf:1
          })
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }else{
      getApp().uploadimg({
        url: getApp().globalData.servicePath + '/app/home/upload',//这里是你图片上传的接口
        path: files,//这里是选取的图片的地址数组
        formData: _that.data.count,
        'timestamp': timestamp
      });
    }
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  }
})