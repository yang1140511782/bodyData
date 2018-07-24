// pages/homes/usercode/usercode.js
// 用户二维码

var QR = require("../../../utils/qrcode.js");

var UserLoginInfo = wx.getStorageSync('userLoginInfo');

const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      canvasHidden: false,
      maskHidden: true,
	  baseUrl: App.globalData.urls.baseUrl,
	  headImg: UserLoginInfo && UserLoginInfo.headImageUrl || '',
	  headImgError: false,
	  imgServer: App.globalData.servers.image,
	  userInfo: wx.getStorageSync('userLoginInfo'),
	  codeUrl: 'http://cluster.cardiochina.net/qrcode?server=' + App.globalData.servers.appointment //默认二维码生成文本
  },

  /**
 * 头像图片加载错误
 */
  imageError: function (options) {
	  this.setData({
		  headImgError: true
	  })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 页面初始化 options为页面跳转所带来的参数
    //   var size = this.setCanvasSize();//动态设置画布大小
	  var initUrl = this.data.codeUrl + '&userId=' + this.data.userInfo.userId +'&userType=type_user';

      this.createQrCode(initUrl, "mycanvas", 250, 250);

      wx.showShareMenu({
          withShareTicket: true
      })

	  this.setData({
		  'headImg': wx.getStorageSync('userLoginInfo') && wx.getStorageSync('userLoginInfo').headImageUrl
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
  
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
      //调用插件中的draw方法，绘制二维码图片
      QR.api.draw(url, canvasId, cavW, cavH);

  },
})