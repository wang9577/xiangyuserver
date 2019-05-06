// pages/introd/index.js
var WxParse = require('../wxParse/wxParse.js');
var app = getApp();
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    url: getApp().globalData.servicePath,
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    var that = this;
    //东方易元
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppPracticeintroList',
      data: {
        sort: e.detail.current
      },
      success: function (res) {
        var article = res.data[0].content;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var that = this;
    //东方易元
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppPracticeintroList',
      data: {
        sort: e.target.dataset.current
      },
      success: function (res) {
        var article = res.data[0].content;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    var that = this;
    var practiceintro = 'practiceintro';
    //东方易元
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppPracticeintroList',
      success: function (res) {
        var article = res.data[0].content;
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
          [practiceintro]: res.data
        })
      }
    })
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 80;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  footerTap: app.footerTap
})