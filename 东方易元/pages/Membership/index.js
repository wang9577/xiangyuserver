// pages/Membership/index.js
var WxParse = require('../wxParse/wxParse.js');
var app = getApp()
Page({
  data: {
    /**
        * 页面配置
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 1,
  },
  onLoad: function () {
    var that = this;

    /**
     * 获取系统信息
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var _this = this;
    var myCenter = 'myCenter';
    var id = getApp().globalData.user;
    console.log("myCenter:" + JSON.stringify(getApp().globalData));
    //会员列表
    wx.request({
      url: getApp().globalData.servicePath + 'app/member/myCenter',
      data: {
        'id': id
      },
      success: function (res) {
        console.log("myCenter:" + JSON.stringify(res.data));
        _this.setData({
          myCenter: res.data
        })
        var quanYi = res.data.benefit.content;
        WxParse.wxParse('quanYi', 'html', quanYi, _this, 5);
      }
    })
  },
  /**
     * 滑动切换tab
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})