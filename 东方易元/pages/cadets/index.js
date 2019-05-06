// pages/cadets/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var id = options.id;
    var type = options.type;
    var coach = 'coach';
    var coach1 = 'coach1';
    var coach2 = 'coach2';
    var coach3 = 'coach3';
    _this.setData({
      'type': type,
    })
    //学员统计
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppCoachList',
      data: {
        coachId: id
      },
      success: function (res) {
        _this.setData({
          [coach]: res.data,
        })
      }
    })
    if (type == 2){

    //进行中学员信息
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppUserInfoList',
      data: {
        coachId: id,
        type:2
      },
      success: function (res) {
        var messa = res.data;
        for (let i in messa) {
          if (messa[i].user_url == null) {
            console.log("没有图像！！！！！！！！！！！！！")
          } else {
            if (messa[i].user_url.indexOf("wx.qlogo.cn") != -1) { } else {
              console.log("没有微信图像！！！！！！！！！！！！！")
              messa[i].user_url = getApp().globalData.servicePath + "/imgfile/" + messa[i].user_url
            }
          }
        }
        _this.setData({
          [coach1]:messa,
        })
      }
    })
      //未开始学员信息
      wx.request({
        url: getApp().globalData.servicePath + '/app/home/AppUserInfoList',
        data: {
          coachId: id,
          type: 1
        },
        success: function (res) {
          var messa = res.data;
          for (let i in messa) {
            if (messa[i].user_url == null) {
              console.log("没有图像！！！！！！！！！！！！！")
            } else {
              if (messa[i].user_url.indexOf("wx.qlogo.cn") != -1) { } else {
                console.log("没有微信图像！！！！！！！！！！！！！")
                messa[i].user_url = getApp().globalData.servicePath + "/imgfile/" + messa[i].user_url
              }
            }
          }
          _this.setData({
            [coach3]: messa,
          })
        }
      })
    //已完成学员信息
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppUserInfoList',
      data: {
        coachId: id,
        type: 3
      },
      success: function (res) {
        var messa = res.data;
        for (let i in messa) {
          if (messa[i].user_url == null) {
            console.log("没有图像！！！！！！！！！！！！！")
          } else {
            if (messa[i].user_url.indexOf("wx.qlogo.cn") != -1) { } else {
              console.log("没有微信图像！！！！！！！！！！！！！")
              messa[i].user_url = getApp().globalData.servicePath + "/imgfile/" + messa[i].user_url
            }
          }
        }
        _this.setData({
          [coach2]: messa,
        })
      }
    })
    } else if (type == 1) {
      //进行中学员信息
      wx.request({
        url: getApp().globalData.servicePath + '/app/home/AppUserInfoList',
        data: {
          coachId: id,
          type: ""
        },
        success: function (res) {
          var messa = res.data;
          for (let i in messa) {
            if (messa[i].user_url == null) {
              console.log("没有图像！！！！！！！！！！！！！")
            } else {
              if (messa[i].user_url.indexOf("wx.qlogo.cn") != -1) { } else {
                console.log("没有微信图像！！！！！！！！！！！！！")
                messa[i].user_url = getApp().globalData.servicePath + "/imgfile/" + messa[i].user_url
              }
            }
          }
          _this.setData({
            [coach1]: messa,
          })
        }
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
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
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