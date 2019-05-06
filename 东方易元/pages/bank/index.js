// pages/bank/index.js
var code = require('com.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,          //默认按钮1显示，按钮2不显示
    userId:'',
    bank: '',
    accout: '',
    name: '',
    phone: '',
    xcode: '',
    code: '',
    getcode: "1",
    sec: "60",

  },
  getbank: function (e) {
    this.data.bank = e.detail.value;
  },
  getaccout: function (e) {
    this.data.accout = e.detail.value;
  },
  getname: function (e) {
    this.data.name = e.detail.value;
  },
  getphone: function (e) {
    this.data.phone = e.detail.value;
  },
  getXCode: function (e) {
    this.data.xcode = e.detail.value;
  },
  getCode: function () {
    var _this = this;
    if (_this.data.bank != null && _this.data.bank != '' && _this.data.accout != null && _this.data.accout != '' && _this.data.name != null && _this.data.name != '' && _this.data.phone != null && _this.data.phone != '' ){
      if (_this.data.accout.length < 16 || _this.data.accout.length > 19) {
        wx.showToast({
          title: '卡号长度有误',
          duration: 3000,
          success: function () {
          }
        })
        return false;
      }
      var num = /^\d*$/; //全数字
      if (!num.exec(_this.data.accout)) {
        wx.showToast({
          title: '卡号必须为数字',
          duration: 3000,
          success: function () {
          }
        })
        return false;
      }
      //开头6位
      var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
      if (strBin.indexOf(_this.data.accout.substring(0, 2)) == -1) {
        wx.showToast({
          title: '卡号开头6位有误',
          duration: 3000,
          success: function () {
          }
        })
        return false;
      }
      wx.showToast({
        title: '验证码已发送',
        duration: 3000,
        success: function () {
        }
      })
      wx.request({
        url: getApp().globalData.servicePath + 'app/home/AppUserCode',
        data: {
          phone: _this.data.phone
        },
        success: function (res) {
          _this.setData({
            code: res.data
          })
        }
      })
      var time = _this.data.sec　　//获取最初的秒数
      code.getCode(_this, time);　　//调用倒计时函数
    }else{
      wx.showToast({
        title: '请完善所有信息',
        duration: 3000,
        success: function () {
        }
      })
    }
    
  },

  save: function () {
    var _this = this;
    if (_this.data.bank != null && _this.data.bank != '' && _this.data.accout != null && _this.data.accout != '' && _this.data.name != null && _this.data.name != '' && _this.data.phone != null && _this.data.phone != '' && _this.data.xcode != null && _this.data.xcode != '') {
      if (_this.data.xcode != _this.data.code){
        wx.showToast({
          title: '验证码有误！！！',
          duration: 3000,
          success: function () {
            wx.navigateBack({
              delta: 2
            })
          }
        })
      }else{
        wx.request({
          url: getApp().globalData.servicePath + 'app/member/addBank',
          data: {
            uid: getApp().globalData.user,
            bank: _this.data.bank,
            accout: _this.data.accout,
            name: _this.data.name,
            phone: _this.data.phone,
          },
          success: function (res) {
            if (res.data.status == 0){
              wx.showToast({
                title: '添加成功',
                duration: 3000,
                success: function () {
                  wx.navigateBack({
                    delta: 2
                  })
                }
              })
          }
          }
        })
      }
    } else {
      wx.showToast({
        title: '请完善信息',
        duration: 3000,
        success: function () {
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: options.userId,
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