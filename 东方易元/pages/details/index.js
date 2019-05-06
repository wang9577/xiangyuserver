// pages/details/index.js
var WxParse = require('../wxParse/wxParse.js');
Page({

  data: {
    wishList: [
      { dzzs: '22', collected: 0, id: 1 },
      { dzzs: '777', collected: 0, id: 2 }
    ],
    // text:"这是一个页面"
  },
  pinlun: function (e) {
    this.setData({
      pinlun: e.detail.value
    })
  },
  pbtn: function (e) {
    var commentDetail = 'commentDetail';
    var counts = 'counts';
    var _this = this;
    console.log(this.data.pinlun)
    console.log(getApp().globalData.userNumber)
    console.log(this.data.video[0].video_number)
    //增加评论
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppCommentSave',
      data: {
        viewpointId: this.data.video[0].video_number,
        userNum: getApp().globalData.userNumber,
        content: this.data.pinlun,
      },
      success: function (res) {
        wx.request({
          url: getApp().globalData.servicePath + '/app/home/AppCommentList',
          data: {
            videoNumber: _this.data.video[0].video_number,
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
  // 更改点赞状态
  onCollectionTap: function(event) {
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
              if (res == 0) {
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
  videoErrorCallback: function (e) {
    console.log('视频错误信息:' + e.detail.errMsg);
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
    // 获取接收到的id值
    var _this = this;
    var getId = option.id;
    var video = 'video';
    var commentDetail = 'commentDetail';
    var size = 'size';
    //视频列表
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppVideoList',
      data: {
        videoNumber: getId
      },
      success: function (res) {
        var article = res.data[0].intro
        WxParse.wxParse('article', 'html', article, _this, 5);
        if (getApp().globalData.userState){
        if (getApp().globalData.userType == 1){
          wx.request({
            url: getApp().globalData.servicePath + '/app/home/AppInviter',
            data: {
              grade: res.data[0].grade,
              id: getApp().globalData.user
            },
            success: function (res) {
              console.log(res.data)
                if(res.data == 0){
                  wx.showModal({
                    title: '提示',
                    content: '没有观看权限！',
                    showCancel:false,
                    success:function(){
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  })
                }
            }
          })
        }
        } else {
          wx.showModal({
            title: '提示',
            content: '请先登录账号！',
            showCancel: false,
            success: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
        wx.request({
          url: getApp().globalData.servicePath + '/app/home/AppPlayrecordSave',
          data: {
            videoId: res.data[0].id,
            userId: getApp().globalData.user,
            status:0
          },
          success: function (res) {
           if(res.data == 1){
              console.log("添加播放记录成功！！")
           }else{
             console.log("添加播放记录失败！！")
           }
          }
        })
        _this.setData({
          [video]: res.data,
        })
        wx.request({
          url: getApp().globalData.servicePath + '/app/home/AppCommentList',
          data: {
            videoNumber: res.data[0].video_number,
            videoName: getApp().globalData.userNumber
          },
          success: function (res) {
            console.log(res.data)
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
              [commentDetail]:  messa,
              [size]: res.data.length,
            })
          }
        })
      }
    })
    // 让接收到的id值传递到data:{}里面

    this.setData({

      currentId: getId

    });

    // 读取所有的文章列表点赞缓存状态

    var cache = wx.getStorageSync('cache_key');

    // 如果缓存状态存在

    if (cache) {

      // 拿到所有缓存状态中的1个

      var currentCache = cache[getId];

      // 把拿到的缓存状态中的1个赋值给data中的collection，如果当前文章没有缓存状态，currentCache 的值就是 false，如果当前文章的缓存存在，那么 currentCache 就是有值的，有值的说明 currentCache 的值是 true

      this.setData({

        collection: currentCache

      })

    } else {

      // 如果所有的缓存状态都不存在 就让不存在的缓存存在

      var cache = {};

      // 既然所有的缓存都不存在，那么当前这个文章点赞的缓存也不存在，我们可以把当前这个文章点赞的缓存值设置为 false

      cache[getId] = false;

      // 把设置的当前文章点赞放在整体的缓存中

      wx.setStorageSync('cache_key', cache);

    }

  },

  // 点击图片的点赞事件 这里使用的是同步的方式

  toCollect: function (event) {

    // 获取所有的缓存

    var cache = wx.getStorageSync('cache_key');

    // 获取当前文章是否被点赞的缓存

    var currentCache = cache[this.data.currentId];

    // 取反，点赞的变成未点赞 未点赞的变成点赞

    currentCache = !currentCache;

    // 更新cache中的对应的1个的缓存值，使其等于当前取反的缓存值

    cache[this.data.currentId] = currentCache;

    // 重新设置缓存

    wx.setStorageSync('cache_key', cache);

    // 更新数据绑定,从而切换图片

    this.setData({

      // collection 默认的是 false

      collection: currentCache

    });

    // 交互反馈
  }

})