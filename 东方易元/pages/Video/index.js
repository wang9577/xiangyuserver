// pages/Video/index.js
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
    var val = e.detail.current;
    //视频列表
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppVideoListB',
      data: {
        classifyId: this.data.vio[val].classify_id,
      },
      success: function (res) {
        that.setData({
          video: res.data
        })
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
    var cur = e.target.dataset.current;
    var val = e.target.dataset.val;
    //视频列表
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppVideoListB',
      data:{
        classifyId:val,
      },
      success: function (res) {
        that.setData({
          video: res.data
        })
      }
    })
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
    var vio ="vio";
    var video = "video";
    //视频列表
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppVideoFlList',
      success: function (res) {
        var sper;
        if (res.data.length ==1){
          sper=[1];
        }else
        if (res.data.length == 2) {
          sper = [1,2];
        }else
        if (res.data.length == 3) {
          sper = [1,2,3];
        }else
        if (res.data.length == 4) {
          sper = [1,2,3,4];
        }else{
          sper = [1, 2, 3, 4];
        }
        console.log(res.data);
        that.setData({
          [vio]: res.data,
          'sper': sper,
        })
        wx.request({
          url: getApp().globalData.servicePath + '/app/home/AppVideoListB',
          data: {
            classifyId: res.data[0].classify_id,
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              [video]: res.data,
            })
          }
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