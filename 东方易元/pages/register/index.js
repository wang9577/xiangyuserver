// pages/register/index.js
var code = require('com.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,          //默认按钮1显示，按钮2不显示
    sec: "60",　　　　　　　　//设定倒计时的秒数
    phone: "",
    tjphone: "",
    code:"", 
    getcode:"1",
    url: getApp().globalData.servicePath,
    showTye: 0, //备注：  1登录  2教练  3会员  4渠道商  5业务员   6注册
  },
  codeInput:function(e){
    this.setData({
      code: e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  tjphoneInput: function (e) {
    this.setData({
      tjphone: e.detail.value
    })
  },
  /**
   * 验证码
   */
  getCode: function () {
    var _this = this;
    wx.request({
      url: getApp().globalData.servicePath + 'app/home/AppUserCode',
      data:{
        phone: _this.data.phone
      },
      success: function (res) {
        _this.setData({
          getcode: res.data
        })
      }
    })　
    var time = _this.data.sec　　//获取最初的秒数
    code.getCode(_this, time);　　//调用倒计时函数
  },
  register:function(){
    if (this.data.getcode == this.data.code) {
      var that = this;
      console.log(getApp().globalData.gender)
      wx.request({
        url: getApp().globalData.servicePath + 'app/home/AppRelationshipRegister',
        data: {
          phoneNumber: that.data.phone,
          openId: getApp().globalData.openid,
          tjphone: that.data.tjphone,
          userName: getApp().globalData.nickName,
          userUrl: getApp().globalData.avatarUrl,
          gender: getApp().globalData.userGender
        },
        success: function (res) {
          console.log(res.data)
          if (res.data == 0) {
            wx.showModal({
              title: "手机号已注册或推荐人手机号错误！",
              showCancel: false,
              confirmText: "确定"
            })
          } else {
            if (res.data.length != 0) {
              console.log("有用户信息！！！！！！！！！！")
              getApp().globalData.user = res.data[0].userId
              getApp().globalData.userType = res.data[0].type
              getApp().globalData.userName = res.data[0].userName
              getApp().globalData.userState = true
              getApp().globalData.userNumber = res.data[0].userNumber
                console.log(getApp().globalData.user)
                wx.request({
                  url: getApp().globalData.servicePath + '/app/member/AppMemberList',
                  data: {
                    'id': getApp().globalData.user
                  },
                  success: function (res) {  //1登录  2教练  3会员  4渠道商  5业务员   6注册
                    if (res.data[0].user_type == 1) {//会员
                      console.log("会员")
                      that.member(that); //查询教练数据
                      that.setData({ //显示会员页面
                        showTye: 3                 
                      })
                    } else if (res.data[0].user_type == 2) {//正常渠道商
                      console.log("正常渠道商")
                      that.business(that); //查询正常渠道商数据
                      that.setData({ //显示正常渠道商页面
                        showTye: 4
                      })
                    } else if (res.data[0].user_type == 3) {//特殊渠道商
                      console.log("特殊渠道商")
                      that.business(that); //查询正常渠道商数据
                      that.setData({ //显示正常渠道商页面
                        showTye: 4
                      })
                    }
                  }
                })
            } else {
              getApp().globalData.userState = false
              that.setData({ //显示注册页面
                showTye: 1
              })
            }
          }
        }
      })
    } else {
      wx.showModal({
        title: "验证码错误！",
        showCancel: false,
        confirmText: "确定"
      })
    }
  },
  /**
   * 登录  1登录  2教练  3会员  4渠道商  5业务员   6注册
   */
  save:function(){
    if (this.data.getcode == this.data.code){
      var that = this;
      wx.request({
        url: getApp().globalData.servicePath + 'app/home/AppRelationshipLongin',
        data: {
          phoneNumber: that.data.phone,
          openids: getApp().globalData.openid,
          userUrl: getApp().globalData.avatarUrl,
        },
        success: function (res) {
          console.log(res.data)
          if (res.data == 0) {
            wx.showModal({
              title: "账号不存在！",
              showCancel: false,
              confirmText: "确定"
            })
          } else {
            if (res.data.length != 0) {
              console.log("有用户信息！！！！！！！！！！")
              getApp().globalData.user = res.data[0].userId
              getApp().globalData.userType = res.data[0].type
              getApp().globalData.userName = res.data[0].userName
              getApp().globalData.userState = true
              getApp().globalData.userNumber = res.data[0].userNumber
              if (res.data[0].type == 1) {//会员 渠道商
                console.log(getApp().globalData.user)
                wx.request({
                  url: getApp().globalData.servicePath + '/app/member/AppMemberList',
                  data: {
                    'id': getApp().globalData.user
                  },
                  success: function (res) {  //1登录  2教练  3会员  4渠道商  5业务员   6注册
                    if (res.data[0].user_type == 1) {//会员
                      console.log("会员")
                      that.member(that); //查询会员数据
                      that.setData({ //显示会员页面
                        showTye: 3
                      })
                    } else if (res.data[0].user_type == 2) {//正常渠道商
                      console.log("正常渠道商")
                      that.business(that); //查询正常渠道商数据
                      that.setData({ //显示正常渠道商页面
                        showTye: 4
                      })
                    } else if (res.data[0].user_type == 3) {//特殊渠道商
                      console.log("特殊渠道商")
                      that.business(that); //查询特殊渠道商数据
                      that.setData({ //显示特殊渠道商页面
                        showTye: 4
                      })
                    }
                  }
                })
              }
              if (res.data[0].type == "2") {//教练
                that.coach(that); //查询教练数据
                that.setData({ //显示教练页面
                  showTye: 2
                })
              }
              if (res.data[0].type == "3") {//业务员
                console.log(res.data[0].type)
                that.salesman(that); //查询业务员数据
                that.setData({ //显示业务员页面
                  showTye: 5
                })
              }
            } else {
              that.setData({ //显示注册页面
                showTye: 1
              })
            }
          }
        }
      })
    }else{
      wx.showModal({
        title: "验证码错误！",
        showCancel: false,
        confirmText: "确定"
      }) 
    }
  },
  longins:function(){
    this.setData({
      showTye:1
    })
  },
  zhuce: function () {
    this.setData({
      showTye: 6
    })
  },
  /**
   * 生命周期函数--监听页面加载  
   * 1登录  2教练  3会员  4渠道商  5业务员   6注册
   */
  onLoad: function (options) {   //页面进入方法，具体怎么放数据可以参考教练
  },
  coach:function(that){ //教练数据
    var coach = 'coach';
    var coachId = getApp().globalData.user
    //教练列表
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppCoachList',
      data: {
        'coachId': coachId
      },
      success: function (res) {
        that.setData({
          [coach]: res.data,
          phone: res.data[0].phone.substring(0, 3) + '****' + res.data[0].phone.substring(7)
        })
        var img = that.data.coach[0].imageUrl; 
        if(img.indexOf("wx.qlogo.cn") != -1){
          that.setData({
            tp: img,
          })
        }else{
          console.log("没有微信图像！！！！！！！！！！！！！")
          that.setData({
            tp: getApp().globalData.servicePath + "/imgfile/" + img,
          })
        }
      }
    })
  },
  member: function (that) {//会员数据
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
        console.log("member:" + JSON.stringify(res.data));
        that.setData({
          [member]: res.data,
        })
      }
    })
  },

  business: function (that) {//渠道商数据（包括特殊渠道商）
    var business = 'business';
    var id = getApp().globalData.user;
    console.log("user:" + JSON.stringify(getApp().globalData));
    wx.request({
      url: getApp().globalData.servicePath + 'app/member/AppBusinessList',
      data: {
        'id': id
      },
      success: function (res) {
        console.log("business:" + JSON.stringify(res.data));
        that.setData({
          [business]: res.data,
        })
      }
    })

  },
  salesman: function (that) {//业务员数据
    var salesmanId = getApp().globalData.user;
    var salesman = 'salesman';
    //业务员列表
    wx.request({
      url: getApp().globalData.servicePath + '/app/salesman/AppSalesmanList',
      data: {
        salesmanId: salesmanId
      },
      success: function (res) {
        that.setData({
          [salesman]: res.data,
          phone: res.data.phone.substring(0, 3) + '****' + res.data.phone.substring(7)
        })
        var img = that.data.salesman.user_url;
        if (img.indexOf("wx.qlogo.cn") != -1) {
          that.setData({
            tp: img,
          })
        } else {
          console.log("没有微信图像！！！！！！！！！！！！！")
          that.setData({
            tp: getApp().globalData.servicePath + "/imgfile/" + img,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示  1登录  2教练  3会员  4渠道商  5业务员   6注册
   */
  onShow: function () {
    if (getApp().globalData.openid) {
      this.date(this);
    }else{
      getApp().getUserInfo(function (that) {
        this.date(this);
      })
    }
  },
  date: function (that){
    if (getApp().globalData.inviterPhone != '') {
      that.setData({
        tjphone: getApp().globalData.inviterPhone,
      })
    }
    wx.request({
      url: getApp().globalData.servicePath + '/app/home/AppRelationshipList',
      data: { openId: getApp().globalData.openid},
      success: function (res) {
        if (res.data.length != 0) {
          console.log("有用户信息！！！！！！！！！！")
          getApp().globalData.userName = res.data[0].userName;
          getApp().globalData.user = res.data[0].userId;
          getApp().globalData.userNumber = res.data[0].userNumber;
          getApp().globalData.userType = res.data[0].type;
          getApp().globalData.userState = true;
          var user = getApp().globalData  //用户登录信息
          if (user.userState) {//登录状态
            switch (user.userType) {  //账号登录类型
              case 1:  //会员渠道商  
                console.log(user)
                wx.request({
                  url: getApp().globalData.servicePath + '/app/member/AppMemberList',
                  data: {
                    'id': user.user
                  },
                  success: function (res) {
                    if (res.data[0].user_type == 1) {//会员
                      console.log("会员")
                      that.member(that); //查询教练数据
                      that.setData({ //显示会员页面
                        showTye: 3,
                      })
                    } else if (res.data[0].user_type == 2) {//正常渠道商
                      console.log("正常渠道商")
                      that.business(that); //查询教练数据
                      that.setData({ //显示会员页面
                        showTye: 4,
                      })
                    } else if (res.data[0].user_type == 3) {//特殊渠道商
                      console.log("特殊渠道商")
                      that.business(that); //查询教练数据
                      that.setData({ //显示会员页面
                        showTye: 4,
                      })
                    }
                  }
                })
                break;
              case 2:  //教练
                that.coach(that); //查询教练数据
                that.setData({ //显示教练页面
                  showTye: 2,
                })
                break;
              case 3://业务员
                that.salesman(that); //查询业务员数据
                that.setData({ //显示业务员页面
                  showTye: 5,
                })
                break;
              default:
                console.log("没有找到登录账号类型,查看账号是否登录！");
                that.setData({   //跳转到登录页面
                  showTye: 1,
                })
            }
          } else {
            that.setData({
              showTye: 6
            })
          }
        } else {
          that.setData({
            showTye: 6
          })
          getApp().globalData.userState = false;
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("进入了onHide方法！！！！！！！！！！！！！！！！！！！！！")
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