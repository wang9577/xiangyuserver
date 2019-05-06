// pages/Feedback01/index.js
Page({

  data: {
    wishList: [
      { dzzs: '22', collected: 0, id: 1 },
      { dzzs: '777', collected: 0, id: 2 }
    ],
    // text:"这是一个页面"
  },
  // 更改点赞状态
  onCollectionTap: function (event) {
    // 获取当前点击下标
    var index = event.currentTarget.dataset.index;
    // data中获取列表
    var message = this.data.wishList;
    for (let i in message) { //遍历列表数据
      if (i == index) { //根据下标找到目标
        var collectStatus = false
        if (message[i].collected == 0) { //如果是没点赞+1
          collectStatus = true
          message[i].collected = parseInt(message[i].collected) + 1
          message[i].dzzs = parseInt(message[i].dzzs) + 1
        } else {
          collectStatus = false
          message[i].collected = parseInt(message[i].collected) - 1
          message[i].dzzs = parseInt(message[i].dzzs) - 1
        }
        wx.showToast({
          title: collectStatus ? '收藏成功' : '取消收藏',
        })
      }
    }
    this.setData({
      wishList: message
    })
  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:' + e.detail.errMsg);
  },
  onLoad: function (option) {

    // 获取接收到的id值

    var getId = option.id;

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