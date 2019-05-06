// pages/suggestions/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getProposalMotion: function (e) {
    this.data.proposalMotion = e.detail.value;
  },
  getProposalDiet: function (e) {
    this.data.proposalDiet = e.detail.value;
  },
  getProposalFood: function (e) {
    this.data.proposalFood = e.detail.value;
  },
  getProposalProductDirection: function (e) {
    this.data.proposalProductDirection = e.detail.value;
  },
  //保存
  save: function () {
    var that = this;
    console.log("that:" + JSON.stringify(that));
    if (getApp().globalData.user != null) {
      var id = getApp().globalData.user;
      wx.request({
        url: getApp().globalData.servicePath + 'app/member/jkdaSave.json',
        data: {
          name: id,
          proposalMotion: that.data.proposalMotion,
          proposalDiet: that.data.proposalDiet,
          proposalFood: that.data.proposalFood,
          proposalProductDirection: that.data.proposalProductDirection
        },
        method: "GET",
        success: function (e) {
          console.log(e)
          if (e.data.status == 0) {
            wx.showToast({
              title: '注册成功',
              duration: 1500,
              success: function () {
                setTimeout(function () {
                  //要延时执行的代码
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1500) //延迟时间 
              }
            })

          } else {
            wx.showToast({
              title: e.data.msg,
            })
          }
          console.log(getApp().globalData.user)
        },
        fail: function () {
        },
        complete: function () {
        }
      })
      this.setData({
        showTopTips: true,
      });

      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000);
    }
    else {
    
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var _this = this;
    var suggestions = 'suggestions';
    var id = getApp().globalData.user;
    console.log("suggestions:" + JSON.stringify(getApp().globalData));
    //会员列表
    wx.request({
      url: getApp().globalData.servicePath + 'app/member/PuKaBasic',
      data: {
        'id': id
      },
      success: function (res) {
        console.log("suggestions:" + JSON.stringify(res.data));
        _this.setData({
          suggestions: res.data,
        })
      }
    })
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