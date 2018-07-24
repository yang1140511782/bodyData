// pages/homes/setquota/setquota.js
var SetQuotaUtil = require("./setquota_util.js");
var BASE_URL = getApp().globalData.urls.baseUrl;

Page({

    /**
     * 页面的初始数据
     */
	data: {
		urls: {
			getUserQuota: BASE_URL + '/system/healthData/user/quota/list',  //获取用户已设置指标 cause
			getAllQuota: BASE_URL + '/system/healthData/quota/getAll',	//获取全部指标 cause
			getAllSystem: BASE_URL + '/system/healthData/illnessType/getAll',	//获取全部系统 cause
			getTypeQuota: BASE_URL + '/system/healthData/illnessType/get/illness/quota',	//根据疾病类型ID获取类型下的疾病和疾病检测指标
			save: BASE_URL + '/system/healthData/user/qouta/save',	//用户保存指标设置
		},
		userQuota: [], //用户已设置指标
		allQuota: [],	//所有指标
		allQuotaShow: true,	//显示所有指标
		allSystem: [],	//所有系统
		userQuotaCtnHeight:40
	},

    /**
     * 保存已设置指标
    */
	setQuota: function (event) {

		wx.showLoading({
			title: '加载中...'
		})

		var _userQuota = [];
		for (var i = 0; i < this.data.userQuota.length; i++) {
			var _quotaItem = this.data.userQuota[i];

			if (_quotaItem.illnessId) {

				for (var j = 0; j < _quotaItem.quotaList.length; j++) {
					_userQuota.push({
						illnessId: _quotaItem.illnessId,
						quotaId: _quotaItem.quotaList[j]
					})
				}

			} else {
				_userQuota.push({
					illnessId: _quotaItem.illnessId,
					quotaId: _quotaItem.quotaId
				})
			}
		}

		getApp().globalData.req({
			url: this.data.urls.save,
			data: {
				userId: wx.getStorageSync('userLoginInfo').userId,
				quotaJson: _userQuota
			},
			server: getApp().globalData.servers.cause,
			success: function (data) {

				wx.hideLoading();
				wx.showToast({
					title: '保存成功',
					icon: 'none',
					complete: function () {
						setTimeout(function () {
							wx.switchTab({
								url: '../home/home'
							})
						}, 1500)

					}
				})
			}
		})

	},

	/**
	* 显示所有指标
   */
	showAllQuota: function (event) {

		if (this.data.allQuotaShow) {
			this.setData({
				allQuotaShow: false
			})
		} else {
			this.setData({
				allQuotaShow: true
			})
		}
	},

	/**
	* 删除已选择指标
   */
	delQuota: function (event) {

		var _dataset = event.currentTarget.dataset;
		var _userQuota = this.data.userQuota;

		var that = this;

		_userQuota.splice(_dataset.index, 1);


		if (_dataset.illid){

			//删除按疾病分类指标中已选择指标

			var _illObj = '';
			//1 循环所有已打开疾病，查找是否存在查看过的已开启疾病
			for (var i = 0; i < this.data.allSystem.length; i++) {

				var _sysItem = this.data.allSystem[i];
				for (var j = 0; _sysItem.illnessList && j < _sysItem.illnessList.length;j++){

					var _illItem = _sysItem.illnessList[j];
					if (_dataset.illid == _illItem.illnessId){

						_illObj = 'allSystem['+i+'].illnessList['+j+'].slt';
						break;

					}
				}

				if (_illObj){
					this.setData({
						[_illObj]: false
					})
				}
				break;

			}

		} else if (_dataset.quotaid){

			//删除全部指标中已选择指标
			for (var i = 0; i < this.data.allQuota.length;i++){

				var _item = this.data.allQuota[i];

				if (_item.id == _dataset.quotaid){
					
					var _allQuotaObj = "allQuota[" + i +"].userSlt";

					this.setData({
						[_allQuotaObj]: false
					})
				}		

			}
		}

		this.setData({
			userQuota: _userQuota
		},function(){
			that.getUserCtnHeight();
		})

	},

	/**
	* 开启、关闭单独指标
   */
	changeSingleQuota: function (event) {

		var _dataset = event.currentTarget.dataset;
		var _userQuota = this.data.userQuota;
		var _quotaItem = this.data.allQuota[_dataset.index];
		var _quotaItemObj = "allQuota[" + _dataset.index + "].userSlt";

		var that = this;

		if (_dataset.userslt) {	//去关闭指标

			for (var i = 0; i < _userQuota.length; i++) {
				if (_quotaItem.id == _userQuota[i].quotaId) {

					_userQuota.splice(i, 1);

					this.setData({
						userQuota: _userQuota,
						[_quotaItemObj]: false
					},function(){
						that.getUserCtnHeight();
					})
					break;
				}
			}

		} else {	//去开启指标

			_userQuota.push({
				quotaId: _quotaItem.id,
				showName: _quotaItem.name,
				illnessId: ""
			})

			this.setData({
				userQuota: _userQuota,
				[_quotaItemObj]: true
			},function(){
				that.getUserCtnHeight();
			})
		}
	},

	/**
     * 获取系统下的疾病及其指标
    */
	showSys: function (event) {

		var that = this;
		var _dataset = event.currentTarget.dataset;

		var _illIndex = "allSystem[" + _dataset.index + "].sysShow";
		//已获取过该系统的疾病，并且直接显示疾病
		if (this.data.allSystem[_dataset.index].illnessList && !this.data.allSystem[_dataset.index].sysShow) {

			that.setData({
				[_illIndex]: true
			});
			return;
		}

		//隐藏该系统下的疾病
		if (this.data.allSystem[_dataset.index].sysShow) {
			that.setData({
				[_illIndex]: false
			})
			return;
		}

		//未获取过改系统下的疾病，获取疾病并显示
		wx.showLoading({
			title: '加载中...'
		})
		getApp().globalData.req({
			url: this.data.urls.getTypeQuota,
			data: {
				typeId: _dataset.id
			},
			server: getApp().globalData.servers.cause,
			success: function (data) {
				var illIndex = "allSystem[" + _dataset.index + "].illnessList";
				var sysIndex = "allSystem[" + _dataset.index + "].sysShow";

				//判断是否开启改系统下的某个疾病
				for (var i = 0; i < that.data.userQuota.length; i++) {	//遍历用户已设置指标
					var _userQuotaItem = that.data.userQuota[i];

					if (!_userQuotaItem.illnessId) {
						//直接跳过没有疾病id,即为单独指标的指标
						continue;
					} else {

						//循环改系统下的疾病
						for (var j = 0; j < data.message.length; j++) {
							if (_userQuotaItem.illnessId == data.message[j].illnessId) {
								data.message[j].slt = true;
							}
						}
					}
				}

				that.setData({
					[illIndex]: data.message,
					[sysIndex]: true
				})

				wx.hideLoading();
			}
		})
	},

	/**
		* 开启、关闭疾病类的指标
	   */
	changeIllQuota: function (event) {

		var _dataset = event.currentTarget.dataset;
		var _userQuota = this.data.userQuota;

		var _allSysIllObj = 'allSystem[' + _dataset.sysindex + '].illnessList[' + _dataset.illindex+'].slt'

		var that = this;

		if (!event.detail.value) {	//关闭指标

			for (var i = 0; i < _userQuota.length; i++) {

				var _userQuotaItem = _userQuota[i];
				if (_dataset.illid == _userQuotaItem.illnessId) {

					_userQuota.splice(i, 1);	//从已设置指标中删除改疾病及其指标
					this.setData({
						userQuota: _userQuota,
						[_allSysIllObj]: false
					},function(){
						that.getUserCtnHeight();
					})
					break;
				}
			}

		} else {	//开启指标

			var _illItem = this.data.allSystem[_dataset.sysindex].illnessList[_dataset.illindex];
			var _quotaList = [];

			for (var i = 0; i < _illItem.quotaList.length; i++) {
				_quotaList.push(_illItem.quotaList[i].id);
			}

			_userQuota.push({
				illnessId: _illItem.illnessId,
				showName: _illItem.illnessName,
				quotaList: _quotaList
			})
			this.setData({
				userQuota: _userQuota,
				[_allSysIllObj]: true
			}, function () {
				that.getUserCtnHeight();
			});
		}

	},
    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		wx.showLoading({
			title: '加载中...'
		})
		var that = this;
		//获取用户已设置指标,然后获取全部指标
		SetQuotaUtil.getUserQuota(this, SetQuotaUtil.getAllQuota);

		//获取全部系统
		getApp().globalData.req({
			url: this.data.urls.getAllSystem,
			data: {
				userId: wx.getStorageSync('userLoginInfo').userId
			},
			server: getApp().globalData.servers.cause,
			success: function (data) {
				that.setData({
					allSystem: data.message
				})
			}
		})

	},

    /**
     * 获取用户已设置指标框高度
     */
	getUserCtnHeight: function () {
		var that = this;
		var query = wx.createSelectorQuery()
		query.select('#userQuotaCtn').boundingClientRect()
		// query.selectViewport().scrollOffset()
		query.exec(function (res) {

			that.setData({
				'userQuotaCtnHeight': res[0].height
			})
			// res[0].top       // #the-id节点的上边界坐标
			// res[1].scrollTop // 显示区域的竖直滚动位置
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