// pages/income/index.js
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
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    var userDetails = 'userDetails';
    var userCurriculum = 'userCurriculum';
    var userIncome = 'userIncome';
    //业务员下的会员的详情
    wx.request({
      url: getApp().globalData.servicePath + '/app/salesman/AppUserDetails',
      data: {
        id: id
      },
      success: function (res) {
        that.setData({
          id: id,
          [userDetails]: res.data,
        })
      }
    })

    //会员课程进度详情
    wx.request({
      url: getApp().globalData.servicePath + '/app/salesman/AppUserCurriculumDetailsList',
      data: {
        id: id
      },
      success: function (res) {
        that.setData({
          [userCurriculum]: res.data,
        })
      }
    })

    //会员收益明细
    wx.request({
      url: getApp().globalData.servicePath + '/app/salesman/AppUserIncomeDetailsList',
      data: {
        id: id
      },
      success: function (res) {
        var numbers = 0;
        var money = res.data
        console.log(money)
        for (let i in money) {
          numbers += money[i].extract_money
        }
        that.setData({
          [userIncome]: res.data,
          'numbers': numbers
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