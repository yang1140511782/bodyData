// pages/homes/illness/illness.js

var base_url = getApp().globalData.urls.baseUrl;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		urls: {
			getIllList: base_url + '/base/chronic/illness/getAllChronicIllness',  //获取常见疾病和慢性疾病组 medcare2模块
			searchIll: base_url + '/system/chronic/illness/search',  //获取常见疾病和慢性疾病组 medcare2模块
		},
		userIllness: [],
		illnessList: [],	//数据库中的疾病类型及列表
		illCtnHeight:97	//已选择疾病框高度
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

		wx.showLoading({
			title: '加载中...',
		})

		//获取从上个页面传过来的用户的疾病
		try {
			var _userIllness = JSON.parse(options.userIllness);
		} catch (e) {
			console.warn('未获取到用户疾病');
			var _userIllness = [];
		}

		var that = this;
		this.setData({
			'userIllness': _userIllness,
		},function(){
			that.getNodeHeight();
		})

		var that = this;
		//获取疾病类型及列表
		this.getIllList(function (illList) {

			//判断用户是否选中其中的某个疾病,并返回已处理后的用户已选择疾病和疾病列表
			var checkObj = that.checkUserIll(illList);
			that.setData({
				illnessList: checkObj.illList,
				userIllness: checkObj.userIllness
			},function(){
				wx.hideLoading();
			})
		})

	},

	/**
	 * 删除疾病
	 */
	delIllness: function (e) {

		var _dataset = e.currentTarget.dataset;
		var _userIllness = this.data.userIllness;
		_userIllness.splice(_dataset.index, 1);

		var illObj = 'illnessList[' + _dataset.item.typeIndex + '].data[' + _dataset.item.illIndex + '].slt';
		var that = this;
		this.setData({
			'userIllness': _userIllness,
			[illObj]: false
		}, function () {
			that.getNodeHeight();
		})
		// this.getNodeHeight();
	},

	/**
	 * 添加疾病
	//  */
	// addIllness: function (e) {

	// 	var _dataset = e.currentTarget.dataset;
	// 	var _userIllness = this.data.userIllness;
	// 	_userIllness.push({
	// 		illnessId: _dataset.illid,
	// 		illnessName: _dataset.illname,
	// 		illnessTypeId: _dataset.illtypeid,
	// 		illnessTypeName: _dataset.illtypename,
	// 	});

	// 	this.setData({
	// 		'userIllness': _userIllness
	// 	})
	// 	// this.getNodeHeight();
	// },

	/**
	 * 获取已选择疾病节点框高度
	 */
	getNodeHeight: function (e) {

		var that = this;
		var query = wx.createSelectorQuery()
		query.select('#illCtn').boundingClientRect()
		// query.selectViewport().scrollOffset()
		query.exec(function (res) {

			that.setData({
				'illCtnHeight': res[0].height
			})
			// res[0].top       // #the-id节点的上边界坐标
			// res[1].scrollTop // 显示区域的竖直滚动位置
		})

	},


	/**
	 * 从服务端获取疾病类型及列表
	 */
	getIllList: function (fn) {
		var that = this;
		getApp().globalData.req({
			url: this.data.urls.getIllList,
			data: {},
			method: 'GET',
			server: getApp().globalData.servers.medcare2,
			success: function (data) {

				if (typeof fn == 'function') {
					fn(data.message.list);
				}
			}
		})
	},


	/**
	 * 选择/取消 疾病列表中的疾病
	*/
	checkItem: function (e) {

		var _dataset = e.currentTarget.dataset;
		var obj = 'illnessList[' + _dataset.typeindex + '].data[' + _dataset.illindex + '].slt';

		var _userIllness = this.data.userIllness;
		if (_dataset.slt) {

			//已患疾病数不能大于6
			if (this.data.userIllness.length >= 6) {
				wx.showToast({
					title: '选择不能超过6个',
					icon: 'none'
				})
				return;
			}

			//添加疾病
			_userIllness.push({
				illnessId: _dataset.illitem.id,
				illnessName: _dataset.illitem.name,
				illnessTypeId: _dataset.typeitem.type,
				illnessTypeName: _dataset.typeitem.name,
				typeIndex: _dataset.typeindex,
				illIndex: _dataset.illindex
			})
		} else {
			//删除已选择疾病
			for (var i = 0; i < _userIllness.length; i++) {
				if (_userIllness[i].illnessId == _dataset.illitem.id && _userIllness[i].illnessTypeId == _dataset.typeitem.type) {
					_userIllness.splice(i, 1);
					break;

				}
			}
		}

		var that = this;

		//删除用户已选择疾病中的疾病
		this.setData({
			[obj]: _dataset.slt,
			"userIllness": _userIllness
		}, function () {
			that.getNodeHeight();
		})
		// this.getNodeHeight();

	},

	/**
	 * 搜索相关--start
	*/

	showInput: function () {
		this.setData({
			inputShowed: true
		});
	},
	//取消搜索
	hideInput: function () {
		this.setData({
			inputVal: "",
			inputShowed: false
		});

		var that = this;
		//获取疾病类型及列表
		this.getIllList(function (illList) {

			//判断用户是否选中其中的某个疾病,并返回已处理后的用户已选择疾病和疾病列表
			var checkObj = that.checkUserIll(illList);
			that.setData({
				illnessList: checkObj.illList,
				userIllness: checkObj.userIllness
			})
		})
	},
	clearInput: function () {
		this.setData({
			inputVal: ""
		});
	},

	/**
	 * 搜索疾病
	*/
	inputTyping: function (e) {

		var that = this;
		getApp().globalData.req({
			url: this.data.urls.searchIll,
			data: {
				name: e.detail.value
			},
			method: 'post',
			server: getApp().globalData.servers.cause,
			success: function (data) {

				console.log(data.message);
				var _illList = [{
					type: '',
					name: '',
					data: data.message
				}]
				//判断用户是否选中其中的某个疾病,并返回已处理后的用户已选择疾病和疾病列表
				var checkObj = that.checkUserIll(_illList);

				that.setData({
					illnessList: checkObj.illList,
					userIllness: checkObj.userIllness
				})
			}
		})
	},
	
	//搜索相关--end

	/**
	 * 判断用户是否选中疾病列表中的某个疾病
	*/
	checkUserIll: function (illList){
		//循环疾病列表，判断用户是否已添加该疾病

		var _userIllness = this.data.userIllness;
		//1 循环用户疾病列表
		for (var i = 0; i < _userIllness.length; i++) {

			var _userItem = _userIllness[i];
			//2 循环疾病类型
			for (var j = 0; j < illList.length; j++) {

				var _typeItem = illList[j];
				if (_typeItem.type && _userItem.illnessTypeId != _typeItem.type) {
					continue;
				}

				var isFind = false;	//找到该疾病类型下对应的疾病
				//3 循环类型下的疾病
				for (var k = 0; k < _typeItem.data.length; k++) {
					var _illItem = _typeItem.data[k];

					if (_userItem.illnessId == _illItem.id) {
						isFind = true;
						_illItem.slt = true;	//用户已选择该疾病

						_userItem.typeIndex = j;
						_userItem.illIndex = k;
						break;
					}
				}

				if (isFind) {
					break;
				}
			}
		}

		return {
			userIllness: _userIllness,
			illList: illList
		}

	},

	/**
	 * 保存疾病
	*/
	save: function (e) {

		var _userIllness = this.data.userIllness;
		var newArray = [];
		for (var i = 0; i < _userIllness.length;i++){
			newArray[i] = {
				illnessId: _userIllness[i].illnessId,
				illnessName: _userIllness[i].illnessName,
				illnessTypeId: _userIllness[i].illnessTypeId,
				illnessTypeName: _userIllness[i].illnessTypeName,
			}
		}

		//获取页面栈
		var pages = getCurrentPages();
		if (pages.length > 1) {
			//上一个页面实例对象
			var prePage = pages[pages.length - 2];
			//调用上一个页面的setIllness方法
			prePage.setIllness(newArray);
			wx.navigateBack({
				delta: 1
			})
		}
	},

})