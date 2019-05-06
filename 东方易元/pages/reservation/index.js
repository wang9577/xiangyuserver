// pages/reservation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isState:true,
    upageNum:1,
    uPageSize:5,
    height: '',
  },
  lower() {
    var result = this.data.reservation;
    var num = this.data.upageNum + 1
    var _this = this;
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppReservationList',
      data: {
        coachId: getApp().globalData.user,
        upageNum: num,
        uPageSize: this.data.uPageSize
      },
      success: function (res) {
        console.log(res.data)
        var cont = result.concat(res.data);
        console.log(cont.length);
        if (_this.data.isState){
          if (res.data.length < _this.data.uPageSize) {
            _this.setData({
              isState: false,
            });
          }
        if (cont.length >= 100) {
          wx.showToast({ //如果全部加载完成了也弹一个框
            title: '我也是有底线的',
            icon: 'success',
            duration: 300
          });
          return false;
        } else {
          wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
            title: '加载中',
            icon: 'loading',
          });
          setTimeout(() => {
            _this.setData({
              upageNum:num,
              reservation: cont
            });
            wx.hideLoading();
          }, 1500)
        }
        }else{
          wx.showToast({ //如果全部加载完成了也弹一个框
            title: '没有数据了！',
            icon: 'success',
            duration: 300
          });
          return false;
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  phone:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      pageNum: 1,
      pageSize: 5,
      isState: true,
    })
    var _this = this;
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppReservationList',
          data: {
            coachId: getApp().globalData.user,
            upageNum: this.data.upageNum,
            uPageSize:this.data.uPageSize
          },
          success: function (res) {
            console.log(res.data)
            _this.setData({
              reservation: res.data,
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