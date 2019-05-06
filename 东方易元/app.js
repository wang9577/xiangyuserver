App({
  //多张图片上传
uploadimg :function(data){
    var that = this,
    i=data.i ? data.i : 0,//当前上传的哪张图片
    success=data.success ? data.success : 0,//上传成功的个数
    fail=data.fail ? data.fail : 0;//上传失败的个数
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'files',//这里根据自己的实际情况改
      formData: { count: data.formData, timestamp: data.timestamp},//这里是上传图片时一起上传的数据
      success: (resp) => {
        var data = JSON.parse(resp.data);
        if (data.state == 1){
        success++;//图片上传成功，图片上传成功的变量+1
        }else{
          fail++;
        }
      },
      fail: (res) => {
         fail++;//图片上传失败，图片上传失败的变量+1
      },
      complete: (res) => {
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
          if(fail == 0){
            return JSON.parse(res.data).numbers;
          }else{
            wx.showModal({
              title: '上传失败！',
              showCancel: false,
            });
          }
        } else {//若图片还没有传完，则继续调用函数
          console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }

      }
    });
  },
  getUserInfo: function (cb) {
    var that = this
      wx.login({
        success: function (res_login) {
          if (res_login.code) {
            wx.getUserInfo({
              success: function (res) {
                console.log('用户信息', res.userInfo)
                that.globalData.userInfo = res.userInfo
                wx.request({
                  url: getApp().globalData.servicePath + '/app/home/decodeUserInfo',
                  data: {
                    code: res_login.code,
                    encryptedData: res.encryptedData,
                    iv: res.iv
                  },
                  success: res => {
                    that.globalData.openid = res.data.userInfo.openId;
                    that.globalData.nickName = res.data.userInfo.nickName;
                    that.globalData.avatarUrl = res.data.userInfo.avatarUrl;
                    that.globalData.userGender = res.data.userInfo.gender;
                    console.log(res.data.userInfo.openId)
                    wx.request({
                      url: getApp().globalData.servicePath + '/app/home/AppRelationshipList',
                      data: { openId: res.data.userInfo.openId },
                      success: function (res) {
                        if (res.data.length != 0) {
                          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
                          console.log("有用户信息！！！！！！！！！！")
                          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
                          that.globalData.userName = res.data[0].userName;
                          that.globalData.user = res.data[0].userId;
                          that.globalData.userNumber = res.data[0].userNumber;
                          that.globalData.userType = res.data[0].type;
                          that.globalData.userState = true;
                        } else {
                          that.globalData.userState = false;                    
                        }
                        typeof cb == "function" && cb(that)
                      }
                    })
                  }
                })
              },
              fail: function () {
                wx.navigateTo({
                  url: '../tologin/index',
                })
              }
            })
          }
        }
      })
  },
  globalData: {
    userName:'',
    user: '',
    openid:null,
    nickName:'',
    avatarUrl: '',
    userNumber:'',
    userGender:'',
    inviterPhone:'',//推荐人手机号
    userType:'',  //1会员2教练3业务员
    userState:false,  //false已登录  true未登录
    userInfo: null,
    avatarUrl: null,
     servicePath: 'http://192.168.1.12:8085/'
  // servicePath: 'https://dfyy.onhuo.cn/'

  }
})