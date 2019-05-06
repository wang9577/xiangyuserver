// pages/Recharge/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0, 
  },
  choseTxtColor: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值
    this.setData({
      id: id
    })
  },
  save:function(e){
    var formid = e.detail.formId;
    console.log("form_id是" + formid);
    var that = this;
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/wxPay',
      data:{
        openid: getApp().globalData.openid,
        money: this.data.rechargeSetting[this.data.id].rechargeMoney*100
      },
      success: function (res) {
        console.log(res.data);
        wx.requestPayment({
          timeStamp: res.data.timeStamp,//记住，这边的timeStamp一定要是字符串类型的，不然会报错，我这边在java后端包装成了字符串类型了
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: 'MD5',
          paySign: res.data.paySign,
          success: function (event) {
            console.log("支付成功！！！！！")
            wx.showLoading({
              title: '跳转中...',
              icon: 'loading',
            });
            wx.request({
              url: getApp().globalData.servicePath + '/app/home/wxPaySuccess',
              data: {
                openid: getApp().globalData.openid,
                actualMoney: that.data.rechargeSetting[that.data.id].actualMoney,
                rechargeMoney: that.data.rechargeSetting[that.data.id].rechargeMoney,
                numbers: res.data.number,
                formId: formid
              },
              success: function (res) {
                    wx.navigateBack({
                      delta: 1
                    })  
              }
            })
          },
          fail: function (error) {
            console.log("支付失败")
            console.log(error)
          },
          complete: function () {
            console.log("pay complete")
          }
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var grade = options.grade;
    var name = "@";
    if (grade == 1){
      name = "pk";
    } if (grade > 1){
      name = "jk";
    }
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppRechargeSettingList',
      data: {
        "name":name,
      },
      success: function (res) {
        that.setData({
          rechargeSetting: res.data
        })
      }
    })
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