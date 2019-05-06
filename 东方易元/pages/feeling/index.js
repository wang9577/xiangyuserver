// pages/feeling/index.js
Page({
  data: {
    count: '',
    // text:"这是一个页面"
    showModal: false,
    height: '',
    url: getApp().globalData.servicePath
  },

  // 更改点赞状态
  onCollectionTap: function (event) {
    // 获取当前点击下标
    var index = event.currentTarget.dataset.index;
    // data中获取列表
    var message = this.data.viewpoint;
    console.log(message)
    for (let i in message) { //遍历列表数据
      if (i == index) { //根据下标找到目标
        var collectStatus = false
        if (message[i].collected == 0) { //如果是没点赞+1
          collectStatus = true
          message[i].collected = parseInt(message[i].collected) + 1
          message[i].likes = parseInt(message[i].likes) + 1
          wx.request({
            url: getApp().globalData.servicePath + '/app/home/AppLikeSave',
            data: {
              userNum: getApp().globalData.userNumber,
              viewpoint: message[i].viewpointNumber,
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
          message[i].likes = parseInt(message[i].likes) - 1
          wx.request({
            url: getApp().globalData.servicePath + '/app/home/AppLikeRemove',
            data: {
              userNum: getApp().globalData.userNumber,
              viewpoint: message[i].viewpointNumber,
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
      viewpoint: message
    })
  },
  
  videoErrorCallback: function (e) {
    console.log('视频错误信息:' + e.detail.errMsg);
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var _this = this;
    console.log("num:" + getApp().globalData.userNumber)
    //感悟
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppViewpointList',
      data: {
        userNum: getApp().globalData.userNumber
      },
      success: function (res) {
        console.log(res.data)
        _this.setData({
          viewpoint: res.data,
        })
        console.log(_this.data.viewpoint)
      }
    })
    wx.getSystemInfo({
      success: (viewpoint) => {
        this.setData({
          height: viewpoint.windowHeight
        })
      }
    })
  },
  
  onLoad: function (option) {
    var _this = this;
    var viewpoint = 'viewpoint';
    // 获取接收到的id值
    var getId = option.id;
    //感悟
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppViewpointList',
      data: {
        userNum: getApp().globalData.userNumber
      },
      success: function (res) {
        console.log("66:"+JSON.stringify(res.data))
        _this.setData({
          viewpoint: res.data,
          avatarUrl: option.avatarUrl,
        })
        console.log(_this.data.viewpoint)
      }
    })
    wx.getSystemInfo({
      success: (viewpoint) => {
        this.setData({
          height: viewpoint.windowHeight
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
  },

  submit: function (event) {
    this.setData({
      showModal: true,
      ids: event.currentTarget.dataset.id,

    })
  },
  preventTouchMove: function () {

  },

  count: function (e) {
    this.setData({
      count: e.detail.value
    })
  },
  go: function () {
    var _this = this;
    console.log(this.data.ids)
    console.log(this.data.count)
    console.log(getApp().globalData.userNumber)
    //增加评论
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppCommentSave',
      data: {
        viewpointId: this.data.ids,
        userNum: getApp().globalData.userNumber,
        content: this.data.count,
      },
      success: function (res) {
        var viewpoint = 'viewpoint';
        //感悟
        wx.request({
          url: getApp().globalData.servicePath + '/app/home/AppViewpointList',
          data: {
            'userNum': getApp().globalData.userNumber,
          },
          success: function (res) {
            console.log(res.data)
            _this.setData({
              viewpoint: res.data,
              count: ''
            })
          }
        })
      }
    })
    this.setData({
      showModal: false
    })
  },
  go01: function () {
    this.setData({
      showModal: false
    })
  },
  lower() {
    var result = this.data.viewpoint;

    var viewpointArr = [];
    for (let i = 0; i < 4; i++) {
      viewpointArr.push(i);
    };
    var cont = result.concat(viewpointArr);
    console.log(viewpointArr.length);
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
        this.setData({
          viewpoint: cont
        });
        wx.hideLoading();
      }, 1500)
    }
  },
    imgYu: function (event) {

    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    var url = [];
    for (var i = 0; i < imgList.length; i++) {
      url.push(getApp().globalData.servicePath + "/imgfile/" + [imgList[i].url]);
    }
    console.log('视频集合:' + url);
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: url // 需要预览的图片http链接列表
    })
  }

})