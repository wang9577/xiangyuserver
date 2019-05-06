// pages/Understanding/index.js
Page({
 
  data: {
    isState:true,
    count:'',
    XxCount:0,
    // text:"这是一个页面"
    showModal: false,
    height: '',
    url: getApp().globalData.servicePath,
    pageNum:1,
    pageSize:5
  },
  // 更改点赞状态
  onCollectionTap: function (event) {
    if (!getApp().globalData.userState) {
      wx.showModal({
        title: '提示',
        content: '请先登录账号！',
        showCancel: false,
        success: function () {
          return false
        }
      })
    }else{
    var _this = this
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
              viewpointId: message[i].viewpointNumber,
              userNum: getApp().globalData.userNumber,
              username: getApp().globalData.userName,
              viewpoint: message[i].viewpointNumber,
            },
            success: function (res) {
              if (res == 0) {
                wx.showToast({
                  title: '操作失败',
                })
              }else{
                wx.request({
                  url: getApp().globalData.servicePath + '/app/home/AppViewpointXxCount',
                  data: {
                    userNum: getApp().globalData.userNumber,
                  },
                  success: function (res) {
                    var url;
                    if (res.data.url == null) {
                      console.log("没有图像！！！！！！！！！！！！！")
                    } else {
                      if (res.data.url.indexOf("wx.qlogo.cn") != -1) { } else {
                        console.log("没有微信图像！！！！！！！！！！！！！")
                        res.data.url = getApp().globalData.servicePath + "/imgfile/" + res.data.url
                      }
                    }
                    _this.setData({
                      XxCount: res.data.count,
                      Xxurl: res.data.url
                    })
                  }
                })
                wx.request({
                  url: getApp().globalData.servicePath + '/app/home/AppViewpointList',
                  data: {
                    pictureNum: getApp().globalData.userNumber,
                    upageNum: 1,
                    uPageSize: 10
                  },
                  success: function (res) {
                    var messa = res.data;
                    for (let i in messa) {
                      messa[i].publish_time = _this.getDayName(messa[i].publish_time)
                      if (messa[i].user_url == null) {
                        console.log("没有图像！！！！！！！！！！！！！")
                      } else {
                        if (messa[i].user_url.indexOf("wx.qlogo.cn") != -1) { } else {
                          console.log("没有微信图像！！！！！！！！！！！！！")
                          messa[i].user_url = getApp().globalData.servicePath + "/imgfile/" + messa[i].user_url
                        }
                      }
                    }
                    _this.setData({
                      viewpoint: messa,
                    })
                  }
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
              }else{
                wx.request({
                  url: getApp().globalData.servicePath + '/app/home/AppViewpointList',
                  data: {
                    pictureNum: getApp().globalData.userNumber,
                    upageNum: 1,
                    uPageSize: 10
                  },
                  success: function (res) {
                    var messa = res.data;
                    for (let i in messa) {
                      messa[i].publish_time = _this.getDayName(messa[i].publish_time)
                      if (messa[i].user_url == null) {
                        console.log("没有图像！！！！！！！！！！！！！")
                      } else {
                        if (messa[i].user_url.indexOf("wx.qlogo.cn") != -1) { } else {
                          console.log("没有微信图像！！！！！！！！！！！！！")
                          messa[i].user_url = getApp().globalData.servicePath + "/imgfile/" + messa[i].user_url
                        }
                      }
                    }
                    _this.setData({
                      viewpoint: messa,
                    })
                  }
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
    }
  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:' + e.detail.errMsg);
  },
  sj:function(){
    this.setData({
      pageNum: 1,
      pageSize: 5,
      isState: true,
    })
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppRelationshipList',
      data: { openId: getApp().globalData.openid },
      success: function (res) {
        if (res.data.length != 0) {
          console.log("有用户信息！！！！！！！！！！")
          getApp().globalData.userName = res.data[0].userName;
          getApp().globalData.user = res.data[0].userId;
          getApp().globalData.userNumber = res.data[0].userNumber;
          getApp().globalData.userType = res.data[0].type;
          getApp().globalData.userState = true;
        } else {
          getApp().globalData.userState = false;
        }
      }
    })
    var _this = this;
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppViewpointXxCount',
      data: {
        userNum: getApp().globalData.userNumber,
      },
      success: function (res) {
        var url;
        if (res.data.url == null) {
          console.log("没有图像！！！！！！！！！！！！！")
        } else {
          if (res.data.url.indexOf("wx.qlogo.cn") != -1) { } else {
            console.log("没有微信图像！！！！！！！！！！！！！")
            res.data.url = getApp().globalData.servicePath + "/imgfile/" + res.data.url
          }
        }
        _this.setData({
          XxCount: res.data.count,
          Xxurl: res.data.url
        })
      }
    })
    //感悟
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppViewpointList',
      data: {
        pictureNum: getApp().globalData.userNumber,
        upageNum: this.data.pageNum,
        uPageSize: this.data.pageSize
      },
      success: function (res) {
        var messa = res.data;
        for (let i in messa) {
          messa[i].publish_time = _this.getDayName(messa[i].publish_time)
          if (messa[i].user_url == null) {
            console.log("没有图像！！！！！！！！！！！！！")
          } else {
            if (messa[i].user_url.indexOf("wx.qlogo.cn") != -1) { } else {
              console.log("没有微信图像！！！！！！！！！！！！！")
              messa[i].user_url = getApp().globalData.servicePath + "/imgfile/" + messa[i].user_url
            }
          }
        }
        _this.setData({
          viewpoint: messa,
        })
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.statusf == 1) {
      wx.showToast({
        title: '感悟发表成功！',
      })
      this.data.statusf = 0;
    }
    if (getApp().globalData.openid) {
        this.sj();
    }else{
      getApp().getUserInfo(function (that) {
        this.sj();
      })
    }
  },
  getDayName: function (d){
    var t1 = new Date(d.replace(/-/g, '/'))
      var t2 = new Date()
    var t = new Date(t2 - t1 + 16 * 3600 * 1000)
      var d = parseInt(t.getTime() / 1000 / 3600 / 24)  //天
      var h = t.getHours()     //时
      var m = t.getMinutes()   //分
      var s = t.getSeconds()   //秒
      if(d==0){
       if(h>0){
         return h+"小时前"
       }else{
         if(m>0){
           return m + "分钟前"
         }else{
           return "刚刚"
         }
       }
      } else if (d == 1){
          return "1天前"
      } else if (d == 2) {
          return "2天前"
      } else if (d == 3) {
          return "3天前"
      }else{
        var min;
        if (t1.getMinutes() > 9 ){
          min = t1.getMinutes()
        }else{
          min = "0"+t1.getMinutes()
        }
        return t1.getMonth() + 1 + "月" + t1.getDate() + "日 " + t1.getHours() + ":" + min
      }
  },
  onLoad: function (option) {
  },
  submit: function (event) {

    if (!getApp().globalData.userState) {
      wx.showModal({
        title: '提示',
        content: '请先登录账号！',
        showCancel: false,
        success: function () {
          return false
        }
      })
    }else{
    this.setData({
      showModal: true,
      ids: event.currentTarget.dataset.id,

    })
    }
  },

  preventTouchMove: function () {

  },

  count: function (e) {
    this.setData({
      count: e.detail.value
    })
  },
  tz:function(){
    if (!getApp().globalData.userState) {
      wx.showModal({
        title: '提示',
        content: '请先登录账号！',
        showCancel: false,
        success: function () {
          return false
        }
      })
    }else{
    wx.navigateTo({
      url: '../Release/index',
    })
    }
  },
  go: function () {
    var _this = this;
    //增加评论
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppCommentSave',
      data: {
        viewpointId: this.data.ids,
        userNum: getApp().globalData.userNumber,
        content: this.data.count,
      },
      success: function (res) {
        wx.showToast({
          title: '评论成功',
        })
        var viewpoint = 'viewpoint';
        wx.request({
          url: getApp().globalData.servicePath + '/app/home/AppViewpointXxCount',
          data: {
            userNum: getApp().globalData.userNumber,
          },
          success: function (res) {
            var url;
            if (res.data.url == null) {
              console.log("没有图像！！！！！！！！！！！！！")
            } else {
              if (res.data.url.indexOf("wx.qlogo.cn") != -1) { } else {
                console.log("没有微信图像！！！！！！！！！！！！！")
                res.data.url = getApp().globalData.servicePath + "/imgfile/" + res.data.url
              }
            }
            _this.setData({
              XxCount: res.data.count,
              Xxurl: res.data.url
            })
          }
        })
        //感悟
        wx.request({
          url: getApp().globalData.servicePath + '/app/home/AppViewpointList',
          data: {
            'pictureNum': getApp().globalData.userNumber,
            upageNum: 1,
            uPageSize: _this.data.viewpoint.length
          },
          success: function (res) {
            var messa = res.data;
            for (let i in messa) {
              messa[i].publish_time = _this.getDayName(messa[i].publish_time)
              if (messa[i].user_url == null) {
                console.log("没有图像！！！！！！！！！！！！！")
              } else {
                if (messa[i].user_url.indexOf("wx.qlogo.cn") != -1) { } else {
                  console.log("没有微信图像！！！！！！！！！！！！！")
                  messa[i].user_url = getApp().globalData.servicePath + "/imgfile/" + messa[i].user_url
                }
              }
            }
            _this.setData({
              viewpoint: messa,
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
    var _this = this;
    var num = this.data.pageNum + 1
    //感悟
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppViewpointList',
      data: {
        pictureNum: getApp().globalData.userNumber,
        upageNum: num,
        uPageSize: this.data.pageSize
      },
      success: function (res) {
        var messa = res.data;
        for (let i in messa) {
          messa[i].publish_time = _this.getDayName(messa[i].publish_time)
          if (messa[i].user_url == null) {
            console.log("没有图像！！！！！！！！！！！！！")
          } else {
            if (messa[i].user_url.indexOf("wx.qlogo.cn") != -1) { } else {
              console.log("没有微信图像！！！！！！！！！！！！！")
              messa[i].user_url = getApp().globalData.servicePath + "/imgfile/" + messa[i].user_url
            }
          }
        }
        var cont = result.concat(messa);
        if (_this.data.isState) {
          if (res.data.length < _this.data.pageSize) {
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
              viewpoint: cont,
              pageNum: num,
            })
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
  imgYu: function (event) {

    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    var url = [];
    for (var i = 0; i < imgList.length; i++) {
      url.push(getApp().globalData.servicePath+"/imgfile/"+[imgList[i].url]);
    }
    console.log('视频集合:' + url);
       //图片预览
       wx.previewImage({
          current: src, // 当前显示图片的http链接
          urls: url // 需要预览的图片http链接列表
    })
  }

})