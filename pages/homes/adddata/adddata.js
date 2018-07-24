// pages/homes/adddata/adddata.js
var dateTimePicker = require('../../../utils/dateTimePicker.js');
var AddDataUtil = require("./adddata_util.js");
var Util = require("../../../utils/util.js");
var BASE_URL = getApp().globalData.urls.baseUrl;

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		urls: {
			getUserQuota: BASE_URL + '/system/healthData/user/quota/list',  //获取用户已设置指标 cause
			getQuotaDataConfig: BASE_URL + '/system/healthData/user/quota/param/list',  //根据指标获取指标需要检测的参数,范围,单位 cause
			submitData: BASE_URL + '/system/healthData/user/quota/data/saveOrUpdate',  //用户保存或修改指标数据
			configDetail: BASE_URL + '/system/medcare/tc/config/detail',	//获取砖石        //account

		},
		userQuota: [],	//用户已设置指标
		addQuota: {
			"quotaId": "",	//(指标ID)
			"quotaName": "",	//(指标名字)
			quotaData: [],	//(指标参数,数组,前面接口取到参数的相关内容,value由用户手动输入的)
			status:'1',	//血糖状态值
			statusName:'空腹',	//血糖状态名
		},	//要添加的指标信息

		status:[
			{ value: 1, name: "空腹" },
			{ value: 2, name: "早餐前" },
			{ value: 3, name: "早餐后" },
			{ value: 4, name: "午餐前" },
			{ value: 5, name: "午餐后" },
			{ value: 6, name: "晚餐前" },
			{ value: 7, name: "晚餐后" },
			{ value: 8, name: "睡前" },
		],	//血糖状态可选值

		date: Util.formatTime(new Date(), 'yyyy-MM-dd'),
		time: Util.formatTime(new Date(), 'hh:mm'),
		dateTimeArray1: null,
		dateTime1: null,
		startYear: 2000,
		endYear: parseInt(Util.formatTime(new Date(), 'yyyy-MM-dd')),

		canSubmitData: true,
	},

	/**
	 * 选择测量时间
	*/
	changeTime: function(e) {
		console.log(e.detail.value);
		this.setData({ 
			dateTime1: e.detail.value,
		 });
	},

	/**
	 * 输入框获取焦点
	*/
	bindfocus: function (e) {
		console.log(e.detail.value);
		this.setData({
			dateTime1: e.detail.value,
		});
	},

	/**
	 * 选择指标
	 * */
	bindQuotaChange: function (e) {

		wx.showLoading({
			title: '加载中...',
			mask: true
		})
		var index = e.detail.value;
		this.setData({
			"addQuota.quotaName": this.data.userQuota[index].quotaName,
			"addQuota.quotaId": this.data.userQuota[index].quotaId,
		})
		//获取指标的检测数据
		AddDataUtil.getQuotaData(this, this.data.userQuota[index].quotaId)
	},

	/**
	 * 选择血糖测量状态
	*/
	bindStatusChange: function (e) {

		var index = e.detail.value;
		var item = this.data.status[index];
		this.setData({
			"addQuota.statusName": item.name,
			"addQuota.status": item.value,
		});
	},

	/**
	 * 输入框填写数据
	*/
	bindInput: function (e) {

		var _value = e.detail.value;
		var _dataset = e.currentTarget.dataset;
		var _item = this.data.addQuota.quotaData[_dataset.index];		
		var obj = "addQuota.quotaData[" + _dataset.index+"].value";
	

		_value = _value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
		if (_value.indexOf(".") < 0 && _value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
			_value = parseFloat(_value)+'';
		}
		//        如果输入框为血压对应的三个参数
		if (_item.name == '收缩压' || _item.name == '舒张压' || _item.name == '心率') {
			_value = _value.replace(/\./g, ""); //清除.
		} else {
			_value = _value.replace(/\.{2,}/g, "."); //只保留第一个.清除多余的
			_value = _value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
			_value = _value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
			//如果第一位为.则设置为0.
			if (_value.indexOf(".") == 0) {
				_value = '0' + _value;
			}
		}

		this.setData({
			[obj]: _value,
		});


		return _value;
	},

	/**
	 * 保存数据
	 * */
	save: function (e) {

		var dateTimeArray1 = this.data.dateTimeArray1;
		var dateTime1 = this.data.dateTime1;
		var _checkTime = dateTimeArray1[0][dateTime1[0]] + '-' + dateTimeArray1[1][dateTime1[1]] + '-' + dateTimeArray1[2][dateTime1[2]] + ' ' + dateTimeArray1[3][dateTime1[3]] + ':' + dateTimeArray1[4][dateTime1[4]] + ':00';
		var _quotaData = [];

		if (_checkTime > Util.formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss')){
			wx.showToast({
				title: '测量时间不能超过当前时间',
				icon: 'none'
			})
			return;
		}
		
		for (var i = 0; i < this.data.addQuota.quotaData.length; i++){
			var _dataItem = this.data.addQuota.quotaData[i];
			if (!_dataItem.value){
				wx.showToast({
					title: '请输入' + _dataItem.name,
					icon:'none'
				})
				return ;
			}
			_quotaData.push({
				id: _dataItem.id,
				name: _dataItem.name,
				value: _dataItem.value,
				unit: _dataItem.unit
			})
		}

		this.setData({
			canSubmitData:false
		})
		wx.showLoading({
			title: '加载中...',
		})
		var param = {
			id: '',
			checkTime: _checkTime,
			userId: wx.getStorageSync('userLoginInfo').userId,
			quotaId: this.data.addQuota.quotaId,
			quotaName: this.data.addQuota.quotaName,
			quotaData: _quotaData,

			createUserId: wx.getStorageSync('userLoginInfo').userId,
			createUserType: "type_user",
		}
		if (this.data.addQuota.quotaName == '血糖'){
			param.status = this.data.addQuota.status
		}

		var that = this;
		getApp().globalData.req({
			url: this.data.urls.submitData,
			data: param,
			server: getApp().globalData.servers.cause,
			success: function (data) {

				var resp = data.message;
				var recommendDocId = wx.getStorageSync('userLoginInfo').recommendDocId;	//推荐医生
				
				// resp.type = "type_today_first_insert" ;

				AddDataUtil.addedData(that, resp.type, recommendDocId);
				
			},
			fail:function(data){
				console.log('fail');
				that.setData({
					canSubmitData: true
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.showLoading({
			title: '加载中...',
			mask:true
		})
		var that = this;

		// that.setData({
		// 	pageFrom: options.page	//判断上一个页面
		// })
		//获取用户已设置指标
		getApp().globalData.req({
			url: that.data.urls.getUserQuota,
			data: {
				userId: wx.getStorageSync('userLoginInfo').userId
			},
			server: getApp().globalData.servers.cause,
			success: function (data) {
				var _list = [];
				//将已设置指标按单独指标和疾病类指标去重，
				for (var i = 0; i < data.message.length; i++) {

					var message = data.message[i];

					//通过页面间传递的quotaId，获得quotaName
					if (options.quotaId && options.quotaId == message.quotaId){
						options.quotaName = message.quotaName
					}

					if (_list.length <= 0) {

						_list.push({
							quotaId: message.quotaId,
							quotaName: message.quotaName
						});

						continue;
					}

					for (var j = 0; j < _list.length; j++) {

						if (message.quotaId == _list[j].quotaId) {	//push已有的疾病类的指标

							continue;

						} else if (message.quotaId != _list[j].quotaId && j == _list.length - 1) {	//push新的疾病类的指标

							_list.push({
								quotaId: message.quotaId,
								quotaName: message.quotaName
							});

						}

					}
				}

                // panxu进行修改
                // 2018/07/19
                if (_list.length > 0) {
                    if (options.quotaId) {
                        if (!options.quotaName){
                            wx.hideLoading()
                            wx.showModal({
                                title: '温馨提示',
                                content: '该指标已被取消，请重新设置',
                                confirmText: "去设置",
                                success: function (res) {
                                    if (res.confirm) {
                                        wx.redirectTo({
                                            url: '../setquota/setquota'
                                        })
                                    } else if (res.cancel) {
                                        wx.navigateBack({
                                            delta: 2
                                        })
                                    }
                                }
                            })
                        }else {
                            //显示页面传递的quotaId
                            that.setData({
                                userQuota: _list,
                                //设置默认选中第一个指标
                                "addQuota.quotaName": options.quotaName,
                                "addQuota.quotaId": options.quotaId,
                            });
                            //获取第一个指标的检测数据
                            AddDataUtil.getQuotaData(that, options.quotaId)
                        }
                    } else {

                        that.setData({
                            userQuota: _list,
                            //设置默认选中第一个指标
                            "addQuota.quotaName": _list[0].quotaName,
                            "addQuota.quotaId": _list[0].quotaId,
                        });
                        //获取第一个指标的检测数据
                        AddDataUtil.getQuotaData(that, _list[0].quotaId)
                    }
                } else {
                    wx.hideLoading()
                    wx.showModal({
                        title: '温馨提示',
                        content: '请您去设置需要记录的指标',
                        confirmText: "去设置",
                        success: function (res) {
                            if (res.confirm) {
                                wx.redirectTo({
                                    url: '../setquota/setquota'
                                })
                            } else if (res.cancel) {
                                wx.navigateBack({
                                    delta: 1
                                })
                            }
                        }
                    })
                }
			}
		})

		// 获取完整的年月日 时分秒，以及默认显示的数组
		var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
		// 精确到分的处理，将数组的秒去掉
		var lastArray = obj1.dateTimeArray.pop();
		var lastTime = obj1.dateTime.pop();

		this.setData({
			dateTimeArray1: obj1.dateTimeArray,
			dateTime1: obj1.dateTime
		});

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