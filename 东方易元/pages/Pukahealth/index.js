// pages/Pukahealth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bloodFat: ["未设置","高", "正常"],
    bloodFatIndex: 0,
    fattyLiver: ["未设置","正常", "异常"],
    fattyLiverIndex: 0,
    alcoholicLiver: ["未设置","正常", "异常"],
    alcoholicLiverIndex: 0,
    bloodVessel: ["未设置","正常", "异常"],
    bloodVesselIndex: 0,
    chestTightness: ["未设置","有", "无"],
    chestTightnessIndex: 0,
    obesity: ["未设置","重度", "中度", "正常"],
    obesityIndex: 0,
    osteoporosis: ["未设置","重度", "中度", "正常"],
    osteoporosisIndex: 0,
    degreeofexercise: ["未设置","高强度运动", "正常运动", "基本不运动"],
    degreeofexerciseIndex: 0,
    bloodPressure:'',
    bloodSugar:'',
    heartRate:''
  },

  bloodFatChange: function (e) {
    this.setData({
      bloodFatIndex: e.detail.value
    })
  },
  fattyLiverChange: function (e) {
    this.setData({
      fattyLiverIndex: e.detail.value
    })
  },
  alcoholicLiverChange: function (e) {
    this.setData({
      alcoholicLiverIndex: e.detail.value
    })
  },
 
  bloodVesselChange: function (e) {
    this.setData({
      bloodVesselIndex: e.detail.value
    })
  },
  chestTightnessChange: function (e) {
    this.setData({
      chestTightnessIndex: e.detail.value
    })
  },
  obesityChange: function (e) {
    this.setData({
      obesityIndex: e.detail.value
    })
  },
  osteoporosisChange: function (e) {
    this.setData({
      osteoporosisIndex: e.detail.value
    })
  },
  degreeofexerciseChange: function (e) {
    this.setData({
      degreeofexerciseIndex: e.detail.value
    })
  },

  getBloodPressure: function (e) {
    this.setData({
      bloodPressure: e.detail.value
    })
  },
  getBloodSugar: function (e) {
    this.setData({
      bloodSugar: e.detail.value
    })
  },
  getHeartRate: function (e) {
    this.setData({
    heartRate: e.detail.value
    })
  },

  //保存
  save: function () {
    var that = this;
    if (getApp().globalData.user != null) {
      var id = getApp().globalData.user;
      wx.request({
        url: getApp().globalData.servicePath + 'app/member/jkdaSave.json',
        data: {
          name: id,
          bloodFat: that.data.bloodFatIndex,
          fattyLiver: that.data.fattyLiverIndex,
          alcoholicLiver: that.data.alcoholicLiverIndex,
          bloodVessel: that.data.bloodVesselIndex,
          chestTightness: that.data.chestTightnessIndex,
          obesity: that.data.obesityIndex,
          osteoporosis: that.data.osteoporosisIndex,
          degreeofexercise: that.data.degreeofexerciseIndex,
          bloodPressure: that.data.bloodPressure,
          bloodSugar: that.data.bloodSugar,
          heartRate: that.data.heartRate
        },
        method: "GET",
        success: function (e) {
          console.log(e)
          if (e.data.status == 0) {
            wx.showToast({
              title: '成功',
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
    var PuKahealth = 'PuKahealth';
    var id = getApp().globalData.user;
    console.log("PuKahealth:" + JSON.stringify(getApp().globalData));
    //会员列表
    wx.request({
      url: getApp().globalData.servicePath + 'app/member/PuKaBasic',
      data: {
        'id': id
      },
      success: function (res) {
        console.log("PuKahealth:" + JSON.stringify(res.data));
        _this.setData({
          PuKahealth: res.data,
          bloodFatIndex: res.data.healthy.bloodFat == null ? 0 : res.data.healthy.bloodFa,
          fattyLiverIndex: res.data.healthy.fattyLiver == null ? 0 : res.data.healthy.fattyLiver,
          alcoholicLiverIndex: res.data.healthy.alcoholicLiver == null ? 0 : res.data.healthy.alcoholicLiver,
          bloodVesselIndex: res.data.healthy.bloodVessel == null ? 0 : res.data.healthy.bloodVessel,
          chestTightnessIndex: res.data.healthy.chestTightness == null ? 0 : res.data.healthy.chestTightness,
          obesityIndex: res.data.healthy.obesity == null ? 0 : res.data.healthy.obesity,
          osteoporosisIndex: res.data.healthy.osteoporosis == null ? 0 : res.data.healthy.osteoporosis,
          degreeofexerciseIndex: res.data.healthy.degreeofexercise == null ? 0 : res.data.healthy.degreeofexercise,

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