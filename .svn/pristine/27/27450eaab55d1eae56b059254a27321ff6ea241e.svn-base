// pages/index/index.js

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		urls: {
			loginUrl: getApp().globalData.urls.baseUrl + '/system/validcode/volidLogin',   //core模块
			// loginUrl: getApp().globalData.urls.baseUrl + '/system/validcode/volidLogin',   //core模块
			proxy: getApp().globalData.urls.baseUrl + '/proxy/wx',	//微信小程序加解密server-proxy
			getSessionKey: getApp().globalData.urls.baseUrl + '/proxy/session/key',	//微信小程序获取sessionkey server-proxy
		}
	},

	// sessionKey: Op0+BGO1ZKQ9vwXPEimYEA==
	// code: 021GnT1S0hvQ392WTZ1S0Bu22S0GnT1v

	/**
	 * 微信手机号快速登录
	 */
	fastLogin: function (event) {

		//   console.log(WXBizDataCrypt);

		//   console.log(data);

		if (!event.detail.encryptedData || !event.detail.iv) {
			//拒绝
			return;
		}

		wx.showLoading({
			title: '登录中...',
		})

		//获取sessionKey
		var that = this;

		//获取电话号码
		getApp().globalData.decrypt({
			decryptUrl: that.data.urls.proxy,
			getSessionUrl: that.data.urls.getSessionKey,
			data:{
				encryptedData: event.detail.encryptedData,
				iv: event.detail.iv
			},
			success: function (phoneRes){
				console.log('电话号码');
				console.log(phoneRes);
				that.login(phoneRes.message.phoneNumber);
			},fail: function(){
				wx.hideLoading();
				wx.showModal({
					title: '提示',
					content: '未获取到微信手机号，请重新点击获取',
				})
			}
		})
		// getApp().globalData.getSessionKey({
		// 	url:this.data.urls.getSessionKey,
		// 	data: {
		// 		appid: getApp().globalData.appId,
		// 		secret: getApp().globalData.secret,
		// 		js_code: getApp().globalData.loginCode,
		// 		grant_type: 'authorization_code'
		// 	},
		// 	server: getApp().globalData.servers.proxy,
		// 	success: function (sessionRes) {

		// 		//获取解密后的电话号码
		// 		getApp().globalData.req({
		// 			url: that.data.urls.proxy,
		// 			data: {
		// 				appId: getApp().globalData.appId,
		// 				encryptedData: event.detail.encryptedData,
		// 				sessionKey: sessionRes.message.session_key,
		// 				iv: event.detail.iv
		// 			},
		// 			server: getApp().globalData.servers.proxy,
		// 			success: function (phoneRes) {

		// 				console.log('电话');
		// 				console.log(phoneRes);

		// 				//无验证码登录
		// 				getApp().globalData.req({
		// 					url: that.data.urls.loginUrl,
		// 					data: {
		// 						account: phoneRes.message.phoneNumber,
		// 					},
		// 					server: getApp().globalData.servers.core,
		// 					success: function (data) {

		// 						wx.setStorage({
		// 							key: 'userLoginInfo',
		// 							data: data.message
		// 						});
		// 						getApp().globalData.userLoginInfo = data.message;
		// 						wx.hideLoading();

		// 						if (data.code == 1001) {
		// 							wx.switchTab({
		// 								url: '../homes/home/home'
		// 							})
		// 						} else if (data.code == 1023) {

		// 							wx.showToast({
		// 								title: '您还未注册关心堂',
		// 								icon: 'none',
		// 								complete: function () {
		// 									setTimeout(function () {
		// 										wx.navigateTo({
		// 											url: '../reg/reg?code=' + (that.data.code || '417418') + '&account=' + that.data.account
		// 										})
		// 									}, 1500)

		// 								}
		// 							})

		// 						}
		// 					}
		// 				})
		// 			}
		// 		})
		// 	},
		// 	fail:function(failRes){

		// 		//未获取到sessionKey
		// 		// 重新登录
		// 		wx.login({
		// 			success: res => {
		// 				// 发送 res.code 到后台换取 openId, sessionKey, unionId
		// 				console.log('user success');
		// 				console.log(res);
		// 				getApp().globalData.loginCode = res.code;

		// 				if (typeof fn == 'function') {
		// 					fn();
		// 				}
		// 			}
		// 		})
		// 	}
		// })
		

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 无验证码登录
	 */
	login: function (_account) {
		var that = this;
		//无验证码登录
		getApp().globalData.req({
			url: that.data.urls.loginUrl,
			data: {
				account: _account,
			},
			server: getApp().globalData.servers.core,
			success: function (data) {

				wx.setStorage({
					key: 'userLoginInfo',
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
						title: '您还未注册关心堂',
						icon: 'none',
						complete: function () {
							setTimeout(function () {
								wx.navigateTo({
									url: '../reg/reg?code=' + (that.data.code || '417418') + '&account=' + that.data.account
								})
							}, 1500)

						}
					})

				}
			}
		})
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