// pages/activities/index.js
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    isShow: true,
    currentTab: 0,
    url: getApp().globalData.servicePath,
    showTye: 0,
  },

  names: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  save: function (e) {
    wx.showLoading({ 
      title: '提交中...',
      icon: 'loading',
    });
    var formid = e.detail.formId;
    console.log("form_id是" + formid);
    var _this=this;
    wx.request({
      url: getApp().globalData.servicePath + '/app/activity/AppActivityEnrollSave',
      data: {
        openid: getApp().globalData.openid,
        activityId: this.data.id,
        userId: getApp().globalData.user,
        recomName: this.data.name,//推荐人姓名
        formId: formid
      },
      success: function (res) {
        if(res.data ==1){
              _this.setData({
                showModal: false,
                isShow: true,
                currentTab: 0,
              });
              _this.svaeF(_this.data.ids);
              wx.showToast({
                title: '报名成功',
              });
        }
      }
    })
  },

  svaeF: function (id){
    // 获取接收到的id值
    var _this = this;
    var getId = id;
    _this.setData({
      ids: getId
    });
    var activityDetail = 'activityDetail';
    var activityEnroll = 'activityEnroll';
    var userDetail = 'userDetail';
    //活动详情
    wx.request({
      url: getApp().globalData.servicePath + '/app/activity/appLookActivityDetail',
      data: {
        id: getId
      },
      success: function (res) {
        var article = res.data.activityIntroduce;
        WxParse.wxParse('article', 'html', article, _this, 5);
        _this.setData({
          [activityDetail]: res.data,
          id: getId,
          userType: getApp().globalData.userType,
        })
      }
    })

    //根据用户id查是否已报名
    wx.request({
      url: getApp().globalData.servicePath + '/app/activity/appLookActivityEnroll',
      data: {
        activityId: getId,
        userId: getApp().globalData.user
      },
      success: function (res) {
        console.log(res.data);
        _this.setData({
          [activityEnroll]: res.data,
        })
      }
    })

    //该用户信息
    wx.request({
      url: getApp().globalData.servicePath + '/app/activity/appLookUserDetail',
      data: {
        userId: getApp().globalData.user,
        'type': getApp().globalData.userType
      },
      success: function (res) {
        console.log(res.data);
        _this.setData({
          [userDetail]: res.data,
          phone: res.data.phone_number.substring(0, 3) + '****' + res.data.phone_number.substring(7),
        })
      }
    })


    // 让接收到的id值传递到data:{}里面
    this.setData({

      currentId: getId

    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this; 
    var link = decodeURIComponent(options.q);
    var getId;
    if (link != "undefined"){
      var paramArr = link.split('=');
      getId = paramArr[1];
      _that.setData({
        ids: getId
      })
      if (getApp().globalData.openid) {
        if (getApp().globalData.userType == '') {
          wx.showLoading({
            title: '前往注册页...',
            icon: 'loading',
          });
          wx.navigateTo({
            url: '../register2/index',
          })
        } else {
          _that.svaeF(getId);
        }
      } else {
        getApp().getUserInfo();
      }
    }else{
    // 获取接收到的id值
    getId = options.id;
    }
    this.setData({
      ids: getId,
    })
    if (getApp().globalData.openid) {
      _that.svaeF(getId);
    } else {
      getApp().getUserInfo(function (that) {
        _that.svaeF(getId);
      })
    }
   
  },
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
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
    if (getApp().globalData.activtitiesState == 5){
      getApp().globalData.activtitiesState = ''
      if (getApp().globalData.userType == '') {
          wx.showLoading({
            title: '前往注册页...',
            icon: 'loading',
          });
          wx.navigateTo({
            url: '../register2/index',
          })
      } else {
      this.svaeF(this.data.ids);
      }
    } else if (this.data.status == 6){
      wx.hideLoading();
      this.svaeF(this.data.ids);
    }
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
  }
})