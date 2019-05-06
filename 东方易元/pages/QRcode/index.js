// pages/QRcode/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '',
    url: getApp().globalData.servicePath,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var memberId = getApp().globalData.user;
    wx.request({
      url: getApp().globalData.servicePath + 'weixin/getAccessToken.json',
      success: function (res) {
        console.log("1:"+JSON.stringify(res.data.map.access_token))
        var access_token1 = res.data.map;
        wx.request({
          url: getApp().globalData.servicePath + 'weixin/createwxaqrcode.json',
          method: 'POST',
          data: 'access_token=' + access_token1 + '&path=../index/index&width=430&id=' + memberId + '&scene=' + memberId,    //参数为键值对字符串

          header: {
            //设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
            console.log("res"+JSON.stringify(res))
            that.setData({
              //img: getApp().globalData.servicePath + res.data
             // img: res.data
              img: "erweima/" + memberId+".jpg"
            })
            console.log("1:" +that.data.img)
          }

        })

      }

    })

    var member = 'member';
    var id = getApp().globalData.user;
    console.log("user:" + JSON.stringify(getApp().globalData));
    //会员列表
    wx.request({
      url: getApp().globalData.servicePath + 'app/member/AppMemberList',
      data: {
        'id': id
      },
      success: function (res) {
        console.log("member2:" + JSON.stringify(res.data));
        that.setData({
          [member]: res.data,
        })
      }
    })
  },


  /**
     * 用户点击右上角分享
     */
  //右上角分享功能
  onShareAppMessage: function (res) {
    if(res.from === 'button'){

    }
    return {
      title: '',
      path: '/pages/QRcode/index' ,
      success: function (res) {
        // 转发成功

        that.shareClick();
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  imageLoad: function () {
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    })
  },
  longTap: function (e) {
    var that = this
    wx.showActionSheet({
      itemList: ['保存到相册'],
      success: function (res) {
        console.log(res.tapIndex)
        that.saveImgToPhotosAlbumTap()
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  saveImgToPhotosAlbumTap: function () {
    wx.downloadFile({
      url: this.data.img,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res)
            console.log('fail')
          }
        })
      },
      fail: function () {
        console.log('fail')
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