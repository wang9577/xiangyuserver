// pages/Mybank/index.js
var app = getApp()
Page({
  data: {
    items: [],
    startX: 0, //开始坐标
    startY: 0,
    showModal: false,
    userId:''
  },
  onLoad: function (options) {
    var userId = options.userId;

    for (var i = 0; i < 5; i++) {
      this.data.items.push({
        content:" 向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦,向左滑动删除哦",
        isTouchMove: false //默认全隐藏删除
      })
    }
    this.setData({
      items: this.data.items,
      userId:userId,
    })
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var _this = this;
    var myBank = 'myBank';
    var id = getApp().globalData.user;
    console.log("myBank:" + JSON.stringify(getApp().globalData));
    //会员列表
    wx.request({
      url: getApp().globalData.servicePath + 'app/member/myBank',
      data: {
        'uid': id
      },
      success: function (res) {
        console.log("myBank1:" + JSON.stringify(res.data));
        _this.setData({
          items: res.data

        })
      }
    })
  },

  //手指触摸动作开始 记录起点X坐标
  touchstart: function (e) {
    //开始触摸时 重置所有删除
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove)//只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  //滑动事件处理
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,//当前索引
      startX = that.data.startX,//开始X坐标
      startY = that.data.startY,//开始Y坐标
      touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
      //获取滑动角度
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.items.forEach(function (v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      items: that.data.items
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  del: function (e) {
    this.data.items.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      items: this.data.items
    })
  },
  submit: function (e) {
    wx.showModal({ title: '解绑银行卡', content: '确定要解绑该银行卡？', showCancel: true,//是否显示取消按钮 
    cancelText:"否",//默认是“取消” 
    //cancelColor:'skyblue',//取消文字的颜色 
    confirmText:"是",//默认是“确定” 
    //confirmColor: 'skyblue',//确定文字的颜色 
    success: function (res) {
       if (res.cancel) { //点击取消,默认隐藏弹框 
         console.log(e.currentTarget.dataset.index)
      } else { //点击确定 
         wx.request({
           url: getApp().globalData.servicePath + 'app/member/updateMyBank',
           data: {
             'id': e.currentTarget.dataset.index
           },
           success: function (res) {
             if (res.data.status == 0) {
               wx.showToast({
                 title: '成功',
                 duration: 1500,
                 success: function () {
                   setTimeout(function () {
                     //要延时执行的代码
                     wx.switchTab({
                       url: '../Mybank/index'
                     })
                   }, 1500) //延迟时间 
                 }
               })
             }
           }
         })
      // temp.splice(index, 1),
      // that.setData({ tempFilePaths: temp, })
       }},
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
      })
  
  },

  preventTouchMove: function () {

  },


  go: function () {
    this.setData({
      showModal: false
    })
  }
})