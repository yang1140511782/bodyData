//app.js
var REQ = require("./utils/request.js");

App({
	onLaunch: function () {
		//获取ip
		/**
		 * 待修改
		 * */
		var that = this;
		// wx.request({
		//     url: that.globalData.urls.ipUrl,
		//     success: function (e) {
		//         console.log(e.data);
		//         if (e.data.status == 'success'){
		//             that.globalData.header.ip = e.data.query;
		//         }else{
		//             console.warn('没有获取到ip');
		//         }

		//     }
		// })

		//判断是否存在用户登录后的信息，不存在则跳转至登录页
		if (!this.globalData.userLoginInfo){
			wx.redirectTo({
				url: './pages/index/index',
			})
		}
		// 登录获取code
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				console.log('user success');
				console.log(res);
				that.globalData.loginCode = res.code;
			}
		})

		// 获取经纬度
		wx.getLocation({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				console.log('location success');
				console.log(res);
				that.globalData.header.lat = res.latitude;
				that.globalData.header.lng = res.longitude;
			}
		})

		// //获取用户信息
		// wx.getUserInfo({
		//     success: res => {
		//         // 可以将 res 发送给后台解码出 unionId
		//         this.globalData.userInfo = res.userInfo
		//         console.log('userInfo');
		//         console.log(res);

		//         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
		//         // 所以此处加入 callback 以防止这种情况
		//         if (this.userInfoReadyCallback) {
		//             this.userInfoReadyCallback(res)
		//         }
		//     },
		//     fail:res => {
		//         console.log('用户未授权');
		//     }
		// })
		// 获取用户信息
		// wx.getSetting({
		//   success: res => {
		//     if (res.authSetting['scope.userInfo']) {
		//       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
		//       wx.getUserInfo({
		//         success: res => {
		//           // 可以将 res 发送给后台解码出 unionId
		//           this.globalData.userInfo = res.userInfo
		//           console.log('userInfo');
		//           console.log(res);

		//           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
		//           // 所以此处加入 callback 以防止这种情况
		//           if (this.userInfoReadyCallback) {
		//             this.userInfoReadyCallback(res)
		//           }
		//         }
		//       })
		//     }else{
		//         console.log('userInfo33');
		//     }
		//   }
		// })
	},
	globalData: {
		loginCode: '',	//登录后微信返回的code
		userInfo: null, //微信端返回的用户信息
		userLoginInfo: wx.getStorageSync('userLoginInfo') || null, //后台返回的用户登录信息
		appId: 'wxe21d13d082e71cca',
		secret: 'ddec75ab0b368f17041d8f6b1ffe050f',
		servers: {
			core: 'core',
			appointment: 'appointment',
			medcare2: 'medcare2',
			cause: 'cause',
			image: "?server=image",
			sport: 'sport',
			proxy: 'proxy',
			account: 'account',
			info: "info",
			resource: 'resource'
		},
		header: {    //请求头相关内容
			ip: '0.0.0.0',
			lat: '',	//纬度
			lng: '',	//经度
		},
		req: REQ.post,
		getSessionKey: REQ.getSessionKey,
		decrypt: REQ.decrypt,
		uploadFile: REQ.uploadFile,
		urls: {
			baseUrl: 'https://cluster.cardiochina.net',
			// baseUrl: 'http://10.2.2.2',
			// ipUrl:'https://ip-api.com/json'

		}
	}
})

