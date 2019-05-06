// pages/PukaBasic/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getName: function (e) {
    this.data.name = e.detail.value;
  },
  getSex: function (e) {
    this.data.sex = e.detail.value;
  },
  getBirthDate: function (e) {
    this.data.birthDate = e.detail.value;
  },
  getID: function (e) {
    this.data.ID = e.detail.value;
  },
  getRegion: function (e) {
    this.data.region = e.detail.value;
  },
  getAddress: function (e) {
    this.data.address = e.detail.value;
  },
  //保存
  register: function () {
    var that = this;
    console.log("that:" + JSON.stringify(that));
    if (getApp().globalData.user != null) {
      var id = getApp().globalData.user;
      wx.request({
        url: getApp().globalData.servicePath + 'app/member/basicSave.json',
        data: {
          id: id,
          name: that.data.name,
          sex: that.data.sex,
          birthDate: that.data.birthDate,
          ID: that.data.ID,
          region: that.data.region,
          address: that.data.address
        },
        method: "GET",
        success: function (e) {
          console.log(e)
          if (e.data.status == 0) {
            that.setData({
              disabledRegister: true
            })
            
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
      // wx.showToast({
      //   title: '请授权登录',
      //   duration: 1500,
      //   success: function () {
      //     setTimeout(function () {
      //       //要延时执行的代码
      //       wx.switchTab({
      //         url: '../Wholesaler/index'
      //       })
      //     }, 1500) //延迟时间 
      //   }
      // })
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
    var PuKaBasic = 'PuKaBasic';
    var id = getApp().globalData.user;
    console.log("PuKaBasic:" + JSON.stringify(getApp().globalData));
    //会员列表
    wx.request({
      url: getApp().globalData.servicePath + 'app/member/PuKaBasic',
      data: {
        'id': id
      },
      success: function (res) {
        console.log("PuKaBasic:" + JSON.stringify(res.data));
        _this.setData({
          PuKaBasic: res.data,
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