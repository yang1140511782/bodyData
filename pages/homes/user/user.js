// pages/homes/user/user.js

const App = getApp();

var UserLoginInfo = wx.getStorageSync('userLoginInfo');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		urls: {
			logout: App.globalData.urls.baseUrl + '/client/logout2',  //获取用户已设置指标 core
		},
		userInfo: UserLoginInfo || {},
		BASE_URL: App.globalData.urls.baseUrl,
		imgServer: App.globalData.servers.image,
		headImg: UserLoginInfo && UserLoginInfo.headImageUrl || '',
		headImgError: false,
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
  * 退出登录
  */
	logout: function (options) {
		
		var that = this;
		wx.showModal({
			title:'提示',
			content:'确认退出？',
			success:function(res){

				if (res.confirm) {	//用户确认退出

					App.globalData.req({
						url: that.data.urls.logout,
						parameter: true,
						data: {
							role_type: 2001,
							user_id: that.data.userInfo.userId
						},
						server: App.globalData.servers.medcare2,
						success: function (data) {
							try {
								wx.clearStorageSync();
							} catch (e) {
								// Do something when catch error
								console.error('清除缓存失败')
							}
							wx.redirectTo({
								url: '../../index/index',
							})

						}
					})

				}
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

		var _userLoginInfo = wx.getStorageSync('userLoginInfo');
		if (_userLoginInfo){
			this.setData({
				'userInfo': _userLoginInfo,
				'headImg': _userLoginInfo.headImageUrl
			})
		}
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