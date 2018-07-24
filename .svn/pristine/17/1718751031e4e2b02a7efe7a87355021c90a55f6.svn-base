// pages/reg/reg.js
var Util = require("../../utils/util.js");

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		urls: {
			regUrl: getApp().globalData.urls.baseUrl + '/client/register/get/validate/codeandinfo',   //medcare2模块
		},
		today: Util.formatTime(new Date(), 'yyyy-MM-dd'),
		sexArray: ['男', '女'],
		userInfo: {
			sex: '',
			birthday: '',
			docName: "",   //选择的推荐医生姓名
			pwd: '',
			name: '',
			account: '',
			code: ''
		}
	},

	/**
	 * 输入登录密码
	 * */
	bindPwdInput: function (e) {
		this.setData({
			'userInfo.pwd': e.detail.value
		})
	},

	/**
	 * 输入真实姓名
	 * */
	bindNameInput: function (e) {
		this.setData({
			'userInfo.name': e.detail.value
		})
	},

	/**
	 * 选择性别
	*/
	changeSex: function (event) {
		var sex = this.data.sexArray[event.detail.value];
		this.setData({
			'userInfo.sex': sex
		})
	},

	/**
	 * 选择出生日期
	*/
	changeBirthday: function (event) {
		var date = event.detail.value;
		this.setData({
			'userInfo.birthday': date
		})

	},

	/**
	 * 选择推荐医生
	*/
	selectDoc: function (event) {
		wx.navigateTo({
			url: '../search/search?account=' + this.data.userInfo.account + "&code=" + this.data.userInfo.code
		})
	},

	/**
	 * 完成注册
	*/
	setRegInfo: function (event) {

		if (!this.data.userInfo.account){
			wx.showToast({
				title: '没有账号信息',
			})
			return;
		}
		var param = {
			tel: this.data.userInfo.account,
			code: this.data.userInfo.code || '170418',
			password: this.data.userInfo.pwd,
			sex: this.data.userInfo.sex,
			birthday: this.data.userInfo.birthday,
			realName: this.data.userInfo.name,
			selectDoc: this.data.userInfo.selectDoc || ''
		}
		console.log(param);
		getApp().globalData.req({
			url: this.data.urls.regUrl,
			data: param,
			server: getApp().globalData.servers.medcare2,
			success: function (data) {
				console.log('请求成功');
				console.log(data);


				getApp().globalData.userLoginInfo = data.message;

				wx.hideLoading();

				wx.switchTab({
					url: '../homes/home/home'
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

		this.setData({
			'userInfo.account': options.account,
			'userInfo.code': options.code,
			// 'userInfo.docName': options.docName,
			// 'userInfo.selectDoc': options.docId && JSON.stringify({
			// 	docId: options.docId,
			// 	seq: options.seq,
			// 	sectionId: options.sectionId,
			// 	content: options.content
			// }),
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

		//
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
		console.log('隐藏');
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
		console.log('卸载');
	},

	/**
		 * 修改推荐医生
		*/
	setDoc: function (docInfo) {

		this.setData({
			'userInfo.docName': docInfo.name,
			'userInfo.selectDoc': docInfo.userId && JSON.stringify({
				docId: docInfo.userId,
				seq: docInfo.weight,
				sectionId: docInfo.sectionId,
				content: docInfo.section
			}),
		})
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