// pages/Dynamic/index.js
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: getApp().globalData.servicePath,
    counts:""
  },
  // 更改点赞状态
  onCollectionTap: function (event) {
    // 获取当前点击下标
    var index = event.currentTarget.dataset.index;
    // data中获取列表
    var message = this.data.commentDetail;
    for (let i in message) { //遍历列表数据
      if (i == index) { //根据下标找到目标
        var collectStatus = false
        if (message[i].collected == 0) { //如果是没点赞+1
          collectStatus = true
          message[i].collected = parseInt(message[i].collected) + 1
          message[i].thumbs = parseInt(message[i].thumbs) + 1
          console.log(message[i].user_number + "点赞成功")
          console.log(message[i].comment_id + "点赞成功")
          wx.request({
            url: getApp().globalData.servicePath + '/app/home/AppLikeSave',
            data: {
              userNum: getApp().globalData.userNumber,
              viewpoint: message[i].comment_id,
            },
            success: function (res) {
              if(res == 0){
                wx.showToast({
                  title: '操作失败',
                })
              }
            }
          }) 
        } else {
          collectStatus = false
          message[i].collected = parseInt(message[i].collected) - 1
          message[i].thumbs = parseInt(message[i].thumbs) - 1
          console.log(message[i].user_number + "取消点赞")
          console.log(message[i].comment_id + "取消点赞")
          wx.request({
            url: getApp().globalData.servicePath + '/app/home/AppLikeRemove',
            data: {
              userNum: getApp().globalData.userNumber,  
              viewpoint: message[i].comment_id,
            },
            success: function (res) {
              if (res == 0) {
                wx.showToast({
                  title: '操作失败',
                })
              }
            }
          })  
        }
        wx.showToast({
          title: collectStatus ? '点赞成功' : '取消点赞',
        })
      }
    }
    this.setData({
      commentDetail: message
    })
  },
  pinlun: function (e) {
  this.setData({
    pinlun:e.detail.value
  })
  },
  pbtn: function (e) {
    var commentDetail = 'commentDetail';
    var counts = 'counts';
    var _this = this;
    console.log(this.data.pinlun)
    console.log(getApp().globalData.userNumber)
    console.log(this.data.companynews[0].companynewsNum)
    //增加评论
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppCommentSave',
      data: {
        viewpointId: this.data.companynews[0].companynewsNum,
        userNum: getApp().globalData.userNumber,
        content: this.data.pinlun,
      },
      success: function (res) {
        wx.request({
          url: getApp().globalData.servicePath + '/app/home/AppCommentList',
          data: {
            videoNumber: _this.data.companynews[0].companynewsNum,
            videoName: getApp().globalData.userNumber
          },
          success: function (res) {
            var messa = res.data;
            for (let i in messa) {
              messa[i].creation_time = _this.getDayName(messa[i].creation_time)
              if (messa[i].user_url == null) {
                console.log("没有用户图像！！！！！！！！！！！！！")
              } else {
                if (messa[i].user_url.indexOf("wx.qlogo.cn") != -1) { } else {
                  console.log("没有微信图像！！！！！！！！！！！！！")
                  messa[i].user_url = getApp().globalData.servicePath + "/imgfile/" + messa[i].user_url
                }
              }
            }
            _this.setData({
              [commentDetail]: messa,
              [counts]: "",
            })
            wx.createSelectorQuery().select('#test').boundingClientRect(function (rect) {
              // 使页面滚动到底部
              wx.pageScrollTo({
                scrollTop: rect.bottom
              })
            }).exec()
          }
        })
      }
    })
  },
  getDayName: function (d) {
    var t1 = new Date(d.replace(/-/g, '/'))
    var t2 = new Date()
    var t = new Date(t2 - t1 + 16 * 3600 * 1000)
    var d = parseInt(t.getTime() / 1000 / 3600 / 24)  //天
    var h = t.getHours()     //时
    var m = t.getMinutes()   //分
    var s = t.getSeconds()   //秒
    if (d == 0) {
      if (h > 0) {
        return h + "小时前"
      } else {
        if (m > 0) {
          return m + "分钟前"
        } else {
          return "刚刚"
        }
      }
    } else if (d == 1) {
      return "1天前"
    } else if (d == 2) {
      return "2天前"
    } else if (d == 3) {
      return "3天前"
    } else {
      var min;
      if (t1.getMinutes() > 9) {
        min = t1.getMinutes()
      } else {
        min = "0" + t1.getMinutes()
      }
      return t1.getMonth() + 1 + "月" + t1.getDate() + "日 " + t1.getHours() + ":" + min
    }
  },
  onLoad: function (option) {
  },
  submit: function (event) {
    this.setData({
      showModal: true,
      ids: event.currentTarget.dataset.id,

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var id = options.id;
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppPlayrecordSave',
      data: {
        videoId: id,
        status: 0
      },
      success: function (res) {
        if (res.data == 1) {
          console.log("添加播放记录成功！！")
        } else {
          console.log("添加播放记录失败！！")
        }
      }
    })
    this.setData({
      ids:id,
    })
    var companynews = 'companynews';
    var commentDetail = 'commentDetail';
    var size = 'size';
    //公司动态
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppCompanynewsList',
      data:{
        'id':id
      },
      success: function (res) {
        var article = res.data[0].content
        WxParse.wxParse('article', 'html', article, _this, 5);
        _this.setData({
          [companynews]: res.data,
        })
        wx.request({
          url: getApp().globalData.servicePath + '/app/home/AppCommentList',
          data: {
            videoNumber: res.data[0].companynewsNum,
            videoName: getApp().globalData.userNumber
          },
          success: function (res) {
            var messa = res.data;
            for (let i in messa) {
              messa[i].creation_time = _this.getDayName(messa[i].creation_time)
              if (messa[i].user_url == null) {
                console.log("没有用户图像！！！！！！！！！！！！！")
              } else {
                if (messa[i].user_url.indexOf("wx.qlogo.cn") != -1) { } else {
                  console.log("没有微信图像！！！！！！！！！！！！！")
                  messa[i].user_url = getApp().globalData.servicePath + "/imgfile/" + messa[i].user_url
                }
              }
            }
            _this.setData({
              [commentDetail]: messa,
              [size]: res.data.length,
            })
          }
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