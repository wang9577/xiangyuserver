// pages/Branchdet/index.js
// 引入SDK核心类
var QQMapWX = require('qqmap-wx-jssdk.js');
var WxParse = require('../wxParse/wxParse.js');
// 实例划API核心类
var demo = new QQMapWX({
  key: 'KQDBZ-S2K3Q-7AR5W-GWRO5-4N2D5-CUFT6' // 必填
});
Page({
  /**
   * 页面的初始数据
   */
  data: {
    xsjzb: "",
    ysjzb: "",
    xfg: "",
    yfg: "",
    yfgs: "",
    flagaa: true,
    url: getApp().globalData.servicePath,
    //swiper相关

    indicatorDots: true,

    autoplay: true,

    interval: 3000,

    duration: 1000,
    circular: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  sumber:function(e){
    console.log("地图横坐标是："+Number(this.data.xfg))
    console.log("地图纵坐标是：" + Number(this.data.xfg))
    wx.openLocation({
      longitude: Number(this.data.xfg),
      latitude: Number(this.data.yfg)
    })
  },
  phone: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.branch[0].phone,
    })
  },
  onLoad: function (options) {
    var id = options.id;
    var _this = this;
    var branch = 'branch';
    //分馆动态
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppBranchList',
      data:{
        'id': id,
      },
      success: function (res) {
        _this.setData({
          [branch]: res.data,
        })
        var article = res.data[0].intro;
        WxParse.wxParse('article', 'html', article, _this, 5);
        wx.getLocation({
          type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
          success: function (res) {
            _this.setData({
              xsjzb: Number(res.longitude),
              ysjzb: Number(res.latitude),
            })
            console.log(_this.data.branch[0].city + _this.data.branch[0].address)
            // 调用接口
            demo.geocoder({
              address: _this.data.branch[0].city+_this.data.branch[0].address,
              success: function (res) {
                _this.setData({
                  xfg: Number(res.result.location.lng),
                  yfg: Number(res.result.location.lat),
                })
                console.log(_this.data.xsjzb + "=======" + _this.data.ysjzb + "=======" + _this.data.xfg + "=======" + _this.data.yfg + "=======")
                var long = (_this.getDistance(_this.data.ysjzb, _this.data.xsjzb, _this.data.yfg, _this.data.xfg)) / 1000
                _this.setData({
                  yfgs: long,
                })
                console.log("距离多少米=================" + long)
              },
              fail: function (res) {

              },
              complete: function (res) {

              }
            });
          },
          fail:function(){
            wx.getSetting({
              success: function (res) {
                var statu = res.authSetting;
                if (!statu['scope.userLocation']) {
                  wx.showModal({
                    title: '是否授权当前位置',
                    content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                    success: function (tip) {
                      if (tip.confirm) {
                        wx.openSetting({
                          success: function (data) {
                            if (data.authSetting["scope.userLocation"] === true) {
                              wx.showToast({
                                title: '授权成功',
                                icon: 'success',
                                duration: 1000
                              })
                              //授权成功之后，再调用chooseLocation选择地方
                              wx.getLocation({
                                type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
                                success: function (res) {
                                  console.log(res.longitude)
                                  _this.setData({
                                    xsjzb: Number(res.longitude),
                                    ysjzb: Number(res.latitude),
                                  })
                                  // 调用接口
                                  console.log(_this.data.branch[0].city + _this.data.branch[0].address)
                                  demo.geocoder({
                                    address: _this.data.branch[0].city + _this.data.branch[0].address,
                                    success: function (res) {
                                      _this.setData({
                                        xfg: Number(res.result.location.lng),
                                        yfg: Number(res.result.location.lat),
                                      })
                                      var long = (_this.getDistance(_this.data.ysjzb, _this.data.xsjzb, _this.data.yfg, _this.data.xfg)) / 1000
                                      _this.setData({
                                        yfgs: long,
                                      })
                                      console.log("距离多少米=================" + long / 1000)
                                    },
                                    fail: function (res) {

                                    },
                                    complete: function (res) {

                                    }
                                  });
                                },
                              })
                            } else {
                              wx.showToast({
                                title: '授权失败',
                                icon: 'success',
                                duration: 1000
                              })
                            }
                          }
                        })
                      }
                    }
                  })
                }
              },
              fail: function (res) {
                wx.showToast({
                  title: '调用授权窗口失败',
                  icon: 'success',
                  duration: 1000
                })
              }
            })
          }
        })

      }
    })
    
  },
  //计算两坐标点之间的距离
  getDistance: function (lat1, lng1, lat2, lng2) {

    lat1 = lat1 || 0;

    lng1 = lng1 || 0;

    lat2 = lat2 || 0;

    lng2 = lng2 || 0;

    var rad1 = lat1 * Math.PI / 180.0;

    var rad2 = lat2 * Math.PI / 180.0;

    var a = rad1 - rad2;

    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

    var r = 6378137;

    return (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0)

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