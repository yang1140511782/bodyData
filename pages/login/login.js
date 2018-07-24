// pages/login/login.js

//引用util中的formatphone
var util = require("../../utils/util.js");

// 数据请求文件

Page({

  /**
   * 页面的初始数据
   */
  data: {
      urls:{
		  loginUrl: getApp().globalData.urls.baseUrl + '/system/validcode/volidLogin',   //core模块
          loginUrl2: getApp().globalData.urls.baseUrl + '/client/login',   //medcare2模块
        //   getCodeUrl: 'http://10.2.2.93:8088/medcare-core' + '/validcode/get',   //medcare2模块
          getCodeUrl: getApp().globalData.urls.baseUrl + '/validcode/get',   //core模块
      },
      account:'',   //用户账号即手机号
      code:'',  //输入的二维码
      getCode:'',   //获取的二维码
 
      codeTime:0,  //获取验证码时间，小于等于0表示可以获取
      codeMsg:'获取验证码',   //获取验证码提示信息
  },

  /**
   * 输入手机号
   * */   
  bindAccountInput: function (e) {
      this.setData({
          account: e.detail.value
      })
  },

  /**
   * 输入二维码
   * */
  bindCodeInput: function (e) {
      this.setData({
          code: e.detail.value
      })
  },

  /**
   * 获取验证码
   */
  toGetCode: function (event) {

      //codeTime>0 不可获取验证码
      if(this.data.codeTime>0){
          return;
      }

      if (!util.formatPhone(this.data.account)) {
          return;
      }

      wx.showLoading({
          title: '获取中...',
      })

      var param = {
          tel:this.data.account,
      }
      var that = this;
      getApp().globalData.req({
          url: this.data.urls.getCodeUrl,
          data: param,
          server: getApp().globalData.servers.core,
          success: function (data) {
              wx.hideLoading();

              //设置60s后重新获取
              that.setData({
                  getCode: data.message.validCode,
                  codeTime : 60,
                  codeMsg: '重新发送60s'
              })
              var _codeTime = that.data.codeTime;
              var timeItv = setInterval(function(){
                  
                  _codeTime--;
                  that.setData({
                      codeTime: _codeTime,
                      codeMsg: '重新发送' + _codeTime + 's'
                  })
                  if (_codeTime<=0){
                      clearInterval(timeItv);
                      that.setData({
                          codeTime: 0,
                          codeMsg: '获取验证码'
                      })
                  }
              },1000)
          }
      })
  },

  /**
   * 登录
   */
  setLoginInfo:function(event){

	//   getApp().globalData.req({
	// 	  url: this.data.urls.loginUrl2,
	// 	  data: {
	// 		  account: this.data.account,
	// 		  password: this.data.code
	// 	  },
	// 	  server: getApp().globalData.servers.medcare2,
	// 	  success: function (data) {

	// 		  wx.setStorage({
	// 			  key: 'userLoginInfo',
	// 			  data: data.message
	// 		  });
	// 		  getApp().globalData.userLoginInfo = data.message;
	// 		  wx.hideLoading();

	// 		  wx.switchTab({
	// 			  url: '../homes/home/home'
	// 		  })
	// 	  }
	//   })

	//   return;
      
      var param = {
          account: this.data.account,
          validCode: this.data.code,
      }
      
      if (!this.data.account){
          wx.showToast({
              title: '请输入用户名',
              icon:'none'
          })
          return;
      }
      if (!this.data.code) {
          wx.showToast({
              title: '请输入验证码',
              icon: 'none'
          })
          return;
      }

    //   if (this.data.code != this.data.getCode ) {
    //       wx.showToast({
    //           title: '验证码错误',
    //           icon: 'none'
    //       })
    //       return;
    //   }
      wx.showLoading({
          title:'登录中...',
      })
      var that = this;
      getApp().globalData.req({
          url: this.data.urls.loginUrl,
          data: param,
          server: getApp().globalData.servers.core,
          success: function (data) {

              wx.setStorage({
                  key:'userLoginInfo',
                  data: data.message
              });
              getApp().globalData.userLoginInfo = data.message;
              wx.hideLoading();

              if (data.code == 1001) {
                  wx.switchTab({
                      url: '../homes/home/home'
                  })
              } else if (data.code == 1023) {

                  wx.showToast({
                      title:'您还未注册关心堂',
                      icon:'none',
                      complete: function(){
                          setTimeout(function(){
                              wx.navigateTo({
                                  url: '../reg/reg?code=' + that.data.code + '&account=' + that.data.account
                              })
                          },1500)
                
                      }
                  })
                  
              }
          }
      })
      
  },

  /**
   * 去注册
   */
  toReg: function (event) {
      wx.navigateTo({
          url: '../reg/reg'
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