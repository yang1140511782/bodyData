// pages/homes/showdata/showdata.js

var Charts = require('../../../utils/wxcharts-min.js');
var ShowDataUtil = require('./showdata_util.js');
var App = getApp();
var BASE_URL = getApp().globalData.urls.baseUrl;

var lineChart = null;	//图表对象
// var scrollIndexS = 0;	//开始滑动图表时的数据下标
// var scrollIndexE = 0;	//结束滑动图表时的数据下标


var sportChart = null;	//运动图表对象

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// windowHeight: 0,
		urls: {
			getUserQuota: BASE_URL + '/system/healthData/user/quota/list',  //获取用户已设置指标 cause
			getQuotaDataConfig: BASE_URL + '/system/healthData/user/quota/param/list',  //根据指标获取指标需要检测的参数,范围,单位
			getQuotaData: BASE_URL + '/system/healthData/user/quota/data/list',  //根据选择的tab指标获取指标检测数据
			saveStep: BASE_URL + '/system/client/step/setting/save',//sport设置用户目标步数
			getTargetStep: BASE_URL + '/system/client/step/setting/detail',//sport获取用户目标步数
			getOneDayStep: BASE_URL + '/system/client/step/count/detail',//sport获取用户某一天的步数信息
			getAllStep: BASE_URL + '/system/client/step/count/page',//sport用户端分页获取用户计步信息
			saveTodayStep: BASE_URL + '/system/client/step/count/save',//sport用户端上传步数信息

			proxy: BASE_URL + '/proxy/wx',	//微信小程序加解密server-proxy
			getSessionKey: BASE_URL + '/proxy/session/key',	//微信小程序获取sessionkey server-proxy
		},
		userQuota: [],	//用户已设置指标
		showQuotaId: '',	//用户正在查看的指标id
		quotaConfig:[],	//指标配置相关
		backgroundColor: ['bc-high', 'bc-low', 'bc-abnormal', 'bc-normal'],	//已选择数据是否正常
		dataStatus:['高于正常水平','低于正常水平','异常','正常'],
		page: 1,	//第几页数据
		pageSize: 10,	//每页数据多少条
		// hasNextPage: false,	//是否还有下一页
		categories:[],	//数据横坐标
		series:[],	//数据内容
		sltIndex: 0,	//选中的数据的下标
		sltData: {},	//选中的数据信息
		tableData:[],	//表格相关数据
		tableTime:[],	//数据时间
		noData:false,	//选中的指标是否有数据
		dataChartHeight: ShowDataUtil.getWindowHeight - 40 - 66 - 134,	//身体数据图高度

		sportArray:[200,2000],	//运动步数可选
		currentStepCount: 0,	//当天的运动步数
		sportSet:0,	//用户设置的目标步数
		sportChartConfig:{},	//运动图表相关配置,
		distance:0,	//运动距离
		cariello:0,	//卡路里
		sportChartHeight: ShowDataUtil.getWindowHeight - 40 - 208 - 68-10,	//运动步数图高度
	},

	/**
	 * 点击tab,选择要查看的指标
	*/
	changeShowQuota: function (e) {

		wx.showLoading({
			title: '加载中...',
		})
		var _dataset  = {};

		if (e && e.currentTarget){
			_dataset = e.currentTarget.dataset;

			this.setData({
				showQuotaId: _dataset.quotaid,
				page: 1,	//第几页数据
				pageSize: 10,	//每页数据多少条
				// hasNextPage: false,	//是否还有下一页
				categories: [],	//数据横坐标
				series: [],	//数据内容
				sltIndex: 0,	//选中的数据的下标
				sltData: {},	//选中的数据信息

			})
		}else{

			_dataset = {
				quotaid: e
			}
		}

		if (_dataset.quotaid == 0) {

			this.showSport();
			return;
		}

		var that = this;

		//获取检测参数
		ShowDataUtil.getQuotaConfig(that,function(){

			//获取指标的详细数据,并画图
			ShowDataUtil.getQuotaData(that, function (data) {

				//画图
				lineChart = new Charts({
					canvasId: 'dataCanvas',
					type: 'line',
					categories: that.data.categories,
					animation: false,
					// background: '#f5f5f5',
					series: that.data.series,
					xAxis: {
						type: 'calibration'
					},
					yAxis: {	//y轴相关配置
						// format: function (val) {
						// 	console.log(val);
						// 	return val;
						// },
						min: that.data.quotaConfig[0].yBegin,	//无效,待修改
						max: that.data.quotaConfig[0].yEnd //无效,待修改
					},
					width: ShowDataUtil.windowWidth,
					// height: 339,
					height: that.data.dataChartHeight,
					dataLabel: false,	//是否在数据表中显示数据内容值
					enableScroll: true,	//是否可滑动
					extra: {
						lineStyle: 'curve'
					}
				});

				var _time = that.data.categories[0];	//获取当前点的时间
				var _names = '';
				var _value = '';
				var hasHighValue = false;	//数据是否过高;
				var hasLowValue = false;	//数据是否过低;
				var _normal = 3;	//数据是否正常 默认为正常
				for (var i = 0; i < that.data.quotaConfig.length; i++) {	//循环数据列

					//获取列的配置项
					var columnConfig = that.data.quotaConfig[i];
					//获取数据点
					var point = that.data.series[i].data[0];

					//组合所有列名
					_names += '/' + columnConfig.name;
					//组合所有值
					_value += '/' + point;
					//判断数据是否正常
					if (columnConfig.refLineMax && columnConfig.refLineMax < point) {
						hasHighValue = true;	//数据过高
					}
					if (columnConfig.refLineMin && columnConfig.refLineMin > point) {
						hasLowValue = true;	//数据过低
					}

				};

				if (hasHighValue) {//过高
					if (hasLowValue) {	//过低
						_normal = 2
					} else {
						_normal = 0;
					}

				} else {
					if (hasLowValue) {	//过低
						_normal = 1
					} else {
						_normal = 3;
					}
				}

				that.setData({
					sltData: {
						checktime: _time,
						names: _names.substr(1),	//数据列名
						value: _value.substr(1),	//该点数据
						normal: _normal,	//数据是否正常 0：高 1：低 2：异常 3：正常
					}
				})

				wx.hideLoading();
			});
			//获取指标的详细数据---end
		});
		

	},

	/**
	 * 跳转至下载页面
	 * */
	toDownLoad: function (e) {
		// wx.navigateTo({
		// 	url: '../../download/download',
		// })
	},

	/**
	 * 去添加数据
	 * */
	toAddData: function (e) {
		wx.redirectTo({
			url: '../adddata/adddata?quotaId=' + this.data.showQuotaId,
		})
	},

	//滑动身体数据图表相关
	touchHandler: function (e) {

		lineChart.scrollStart(e);

		// scrollIndexS = lineChart.getCurrentDataIndex(e);

	},
	moveHandler: function (e) {
		lineChart.scroll(e);
	},
	touchEndHandler: function (e) {

		lineChart.scrollEnd(e);
		// scrollIndexE = lineChart.getCurrentDataIndex(e);
		// if (scrollIndexE < scrollIndexS && this.data.hasNextPage){//表示已经滑到最后一页,并且还有未加载的数据

		// 	this.data.page += 1;
		// 	var that = this;
		// 	//继续请求下一页数据
		// 	ShowDataUtil.getQuotaData(this,function(res){
		// 		//更新数据
		// 		lineChart.updateData({
		// 			series: that.data.series,
		// 			categories: that.data.categories
		// 		})
		// 	})
		// }
		lineChart.showToolTip(e, {
			format: function (item, category) {
				return item.name + ':' + item.data
			}
		});

		this.data.sltIndex = lineChart.getCurrentDataIndex(e);	//获取数据下标
		if (this.data.sltIndex<0){
			return;
		}
		var _time = this.data.categories[this.data.sltIndex];	//获取当前点的时间
		var _names = '';
		var _value = '';
		var hasHighValue = false;	//数据是否过高;
		var hasLowValue = false;	//数据是否过低;
		var _normal = 3;	//数据是否正常 默认为正常
		for (var i = 0; i < this.data.quotaConfig.length;i++){	//循环数据列
			
			//获取列的配置项
			var columnConfig = this.data.quotaConfig[i];	
			//获取数据点
			var point = this.data.series[i].data[this.data.sltIndex];

			//组合所有列名
			_names += '/' + columnConfig.name;
			//组合所有值
			_value += '/' + point;
			//判断数据是否正常
			if (columnConfig.refLineMax && columnConfig.refLineMax < point){
				hasHighValue = true;	//数据过高
			}
			if (columnConfig.refLineMin && columnConfig.refLineMin > point) {
				hasLowValue = true;	//数据过低
			}
			
		};

		if (hasHighValue){//过高
			if (hasLowValue){	//过低
				_normal = 2
			}else{
				_normal = 0;
			}

		}else{
			if (hasLowValue) {	//过低
				_normal = 1
			} else {
				_normal = 3;
			}
		}

		this.setData({
			sltData:{
				checktime: _time,
				names: _names.substr(1),	//数据列名
				value: _value.substr(1),	//该点数据
				normal: _normal,	//数据是否正常 0：高 1：低 2：异常 3：正常
			}
		})
	},

	//滑动运动记步图表相关
	sportTouchHandler: function (e) {
		sportChart.scrollStart(e);
		// scrollIndexS = lineChart.getCurrentDataIndex(e);
	},
	sportMoveHandler: function (e) {
		sportChart.scroll(e);
	},
	sportTouchEndHandler: function(e){
		sportChart.scrollEnd(e);
		
		sportChart.showToolTip(e, {
			format: function (item, category) {
				return category + ' ' + item.name + ':' + item.data
			}
		});
	},
	

	//显示运动相关内容
	showSport: function(){

		var that = this;
		
		//显示运动相关
		ShowDataUtil.showSports(this);
		ShowDataUtil.getSportData(this, function () {

			// 画步数图
			sportChart = new Charts({
				canvasId: 'sportCanvas',
				type: 'line',
				categories: that.data.sportChartConfig.categories,
				xAxis:{
					type: 'calibration'
				},
				yAxis:{
					format: function (val){
						var _val = (parseInt(val) / 10000).toFixed(1)
						return _val + 'W';
					}
				},
				animation: false,
				legend:false,
				// background: '#f5f5f5',
				series: that.data.sportChartConfig.series,
				width: ShowDataUtil.windowWidth,
				height: that.data.sportChartHeight,
				dataLabel: false,	//是否在数据表中显示数据内容值
				enableScroll: true,	//是否可滑动
				extra: {
					lineStyle: 'curve'
				}
			});

			wx.hideLoading();

		});
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

		console.log('wx.getSystemInfoSync().windowHeight');
		console.log(wx.getSystemInfoSync().windowHeight);
		console.log(this.data.sportChartHeight);
		console.log(ShowDataUtil.getWindowHeight);

		wx.showLoading({
			title: '加载中',
		})

		var that = this;

		//设置运动步数可选项
		var _sportStart = 2000;
		var _sportArray = [_sportStart];
		for(var i=0; i<18 ;i++){
			_sportStart += 1000;
			_sportArray.push(_sportStart)
		}
		this.setData({
			sportArray: _sportArray,
			//身体数据图最高为340
			sportChartHeight: wx.getSystemInfoSync().windowHeight - 40 - 208 - 68 - 10,
			dataChartHeight: this.data.dataChartHeight > 340 ? 340 : this.data.dataChartHeight
		})

		this.showSport();


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

				that.setData({
					userQuota: _list,
					showQuotaId: options.quotaId || 0
				});
				
				//完成数据添加时，跳转到的指标
				if (options.quotaId && options.quotaId!=0){
					that.changeShowQuota(options.quotaId);
				}

			}
		})
	},

	/**
	 * 设置目标步数
	*/
	setTarget: function (e) {

		var that = this;
		getApp().globalData.req({
			url: that.data.urls.saveStep,
			data: {
				executeUserId: wx.getStorageSync('userLoginInfo').userId,
				executeUserType:'type_user',
				executeUserName: wx.getStorageSync('userLoginInfo').realName,
				targetStepCount: this.data.sportArray[e.detail.value]
			},
			server: getApp().globalData.servers.sport,
			success: function (data) {

				that.setData({
					sportSet: data.message.targetStepCount
				})
				//显示运动相关
				ShowDataUtil.showSportComplete(that);

			}
		})
	},

})