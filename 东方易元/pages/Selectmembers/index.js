// pages/Selectmembers/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countries: ["河南", "河北", "湖南"],
    countryIndex: 0,
    select_all: false,
    listData: [{ code: "111", text: "text1", typ: "type1", },

    { code: "021", text: "text2", typ: "type2", },

    { code: "111", text: "text1", typ: "type3", }]
  },
  selectall: function () {//全选与反全选

    var that = this;

    for (let i = 0; i < that.data.listData.length; i++) {

      that.data.listData[i].checked = (!that.data.select_all)
    }

    that.setData({

      listData: that.data.listData,

      select_all: (!that.data.select_all)

    })
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