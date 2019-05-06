// pages/Student/index.js
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    /**
        * 页面配置
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
  },
  onLoad: function (options) {
    var id = options.id;
    var coach = 'coach';
    var AppUser = 'AppUser';
    var record = 'record';
    var that = this;
    //学员统计
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppUserLook',
      data: {
        status: id
      },
      success: function (res) {
        that.setData({
          id: id,
          [coach]: res.data,
        })
      }
    })
    //课程统计
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppCurriculumLook',
      data: {
        id: id
      },
      success: function (res) {
        that.setData({
          [AppUser]: res.data,
        })
      }
    })

    //练功记录
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppPractiseRecord',
      data: {
        id: id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          [record]: res.data,
        })
      }
    })
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