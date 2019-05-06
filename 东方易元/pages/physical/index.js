// pages/physical/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    inspectTime:'',
    inspectMechanism: '',
    inspectProject: '',
    inspectProject: '',
    inspectResult:''
  },
  getInspectTime: function (e) {
    console.log("inspectTime:" + e.detail.value)
    this.data.inspectTime = e.detail.value;
  },
  getInspectMechanism: function (e) {
    this.data.inspectMechanism = e.detail.value;
  },
  getInspectProject: function (e) {
    this.data.inspectProject = e.detail.value;
  },
  getInspectResult: function (e) {
    this.data.inspectResult = e.detail.value;
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
  
  save: function (){
    var files = this.data.files;
    var _that = this;
    var timestamp = "GWT" + parseInt(new Date().getTime() / 1000);
    var numbers = getApp().uploadimg({
      url: getApp().globalData.servicePath + '/app/home/upload',//这里是你图片上传的接口
      path: files,//这里是选取的图片的地址数组
      formData: null,
      'timestamp': timestamp
    });
    wx.request({
               url: getApp().globalData.servicePath + '/app/member/jkdaSave',
               data: {
                 'inspectMedicalImage': timestamp,
                 'name': getApp().globalData.user,
                 'inspectTime': this.data. inspectTime,
                 'inspectMechanism': this.data.inspectMechanism,
                 'inspectProject': this.data.inspectProject,
                 'inspectResult': this.data.inspectResult
               },
               success: function (e) {
                 if (e.data.status == 0) {
                   wx.showToast({
                     title: '成功',
                     duration: 1500,
                     success: function () {
                       setTimeout(function () {
                         //要延时执行的代码
                         wx.navigateBack({
                           delta: 1
                         })
                       }, 1500) //延迟时间 
                     }
                   })

                 } else {
                   wx.showToast({
                     title: e.data.msg,
                   })
                 }
                console.log(666)
               }
           })
  }, 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    var physical = 'physical';
    var id = getApp().globalData.user;
    console.log("physical:" + JSON.stringify(getApp().globalData));
    //会员列表
    wx.request({
      url: getApp().globalData.servicePath + 'app/member/PuKaBasic',
      data: {
        'id': id
      },
      success: function (res) {
        console.log("physical:" + JSON.stringify(res.data));
        _this.setData({
          physical: res.data,
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
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  }
})