//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    flagaa: true,
    url: getApp().globalData.servicePath,
    //swiper相关
    indicatorDots: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    autoplay: true,
    interval: 3000,

    duration: 1000,
    circular: true,
    grids: [0, 1, 2, 3],
    showModal: false,
    certificate : '',
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (query) {
    var _this = this;
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    const scene = decodeURIComponent(query.scene);//推荐人手机号
    console.log("scene:" + scene);
    if (scene != null && scene != '' && scene != 'undefined'){
      getApp().globalData.inviterPhone = scene;
    }
  },
  
  date: function (_this){
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/getCertificate',
      data: { userId: getApp().globalData.user },
      success: function (res) {
        if (res.data.type == 0) {
          _this.setData({
            showModal: true,
            certificate: res.data,
          })
        }
      }
    })      
    var picture = 'picture';
    var companynews = 'companynews';
    var activity = 'activity';
    var video = 'video';
    var hotList = 'hotList';
    var coach = 'coach';
    //轮播图片
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppCarouselList',
      success: function (res) {
        var message = res.data;
        for (let i in message) {
          if (message[i].url_type === 1) {
            message[i].url_type = "../activities/index?id=" + message[i].url_id  //活动
          } else if (message[i].url_type === 2) {
            var dates;
            //课程
            wx.request({
              url: getApp().globalData.servicePath + '/app/home/AppCurriculumList',
              data: {
                curriculumId: message[i].url_id
              },
              success: function (res) {
                _this.setData({
                  pd: "../Small/index?url=" + getApp().globalData.servicePath + "/imgfile/" + res.data[0].url + "&&id=" + message[i].url_id  //课程
                })
              }
            })
            message[i].url_type = _this.data.pd;
          } else if (message[i].url_type === 3) {
            message[i].url_type = "../Branchdet/index?id=" + message[i].url_id  //分馆
          } else if (message[i].url_type === 4) {
            message[i].url_type = "../Dynamic/index?id=" + message[i].url_id  //公司动态
          }
        }
        _this.setData({
          [picture]: message,
        })
      }
    })
    //公司动态
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppCompanynewsList',
      data: {
        pageNum: 1,
        pageSize: 3
      },
      success: function (res) {
        _this.setData({
          [companynews]: res.data,
        })
      }
    })

    //活动列表
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppActivitylist',
      success: function (res) {
        _this.setData({
          [activity]: res.data,
        })
      }
    })
    //视频列表
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppVideoList',
      data: {
        classifyId: 1,
        pageNum: 1,
        pageSize: 4
      },
      success: function (res) {
        _this.setData({
          [video]: res.data,
        })
      }
    })

    //髓友反馈
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppVideoList',
      data: {
        classifyId: 12,
        pageNum: 1,
        pageSize: 6
      },
      success: function (res) {
        _this.setData({
          [hotList]: res.data,
        })
      }
    })
    //教练列表
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppCoachList',
      success: function (res) {
        _this.setData({
          [coach]: res.data,
        })
      }
    })
  },
  onShow: function(){
    var _this = this;
    if (getApp().globalData.openid) {
      _this.date(_this)
    } else {
      getApp().getUserInfo(function (that) {
        _this.date(_this)
      })
    }
    
  },
  submit: function () {
    this.setData({
      showModal: true
    })
  },

  preventTouchMove: function () {

  },


  go: function () {
    this.setData({
      showModal: false
    })
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/setCertificate',
      data: { id: this.data.certificate.id},
      success: function (res) {
      }
    })


  }

})

