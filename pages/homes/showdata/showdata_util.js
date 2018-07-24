
var Util = require("../../../utils/util.js");

/**
 * 返回可使用窗口宽度,默认为320
*/
function getWindowWidth(){
	var windowWidth = 320;
	try {
		var sysInfo = wx.getSystemInfoSync();
		windowWidth = sysInfo.windowWidth;
	} catch (e) {
		console.error('getSystemInfoSync failed!');
	}

	return windowWidth;
}

/**
 * 返回可使用窗口高度
*/
function getWindowHeight() {
	var windowHeight = 320;
	try {
		var sysInfo = wx.getSystemInfoSync();
		windowHeight = sysInfo.windowHeight;		
	} catch (e) {
		console.error('getSystemInfoSync failed!');
	}

	return windowHeight;
}

/**
 * 返回已选择指标的检测参数
*/
function getQuotaConfig(that,fn){

	getApp().globalData.req({
		url: that.data.urls.getQuotaDataConfig,
		data:{
			quotaId: that.data.showQuotaId
		},
		server: getApp().globalData.servers.cause,
		success:function(data){
		
			that.setData({
				quotaConfig: data.message
			})
			//总共有多少列数据
			for (var i = 0; i < data.message.length; i++) {

				var _item = data.message[i];
				that.data.series.push({
					name: _item.name,	//数据列名
					unit: _item.unit,
					data: [],	//详细数据
					format: function (val, name) {
						return val + _item.unit;
					}
				})

			}

			if (typeof fn == 'function'){
				fn();
			}
		}
	})
}

/**
 * 
 * 返回指标的数据记录
*/
function getQuotaData(that,fn){

	getApp().globalData.req({
		url: that.data.urls.getQuotaData,
		data: {
			quotaId: that.data.showQuotaId,
			userId:wx.getStorageSync('userLoginInfo').userId,
			qtype:'all',
			page:that.data.page,
			pageSize: that.data.pageSize
		},
		server: getApp().globalData.servers.cause,
		success: function (res) {

			// that.data.hasNextPage = res.message.hasNextPage;
			//若没有数据
			if (res.message.list.length<=0){
				that.setData({
					noData:true
				})
				wx.hideLoading();
				return;
			}

			that.setData({
				noData: false
			})

			var series = [];
			var _tableData = [];
			var _tableTime = [];

			for(var i=0; i<res.message.list.length; i++){
				var item = res.message.list[i];
				var time = item.checkTime.substr(5, 5) + '\t' + item.checkTime.substr(11, 5)
				that.data.categories.push(time);

				//将数据点进行转换
				var _resData = JSON.parse(item.data);

				_tableTime.push({
					day: item.checkTime.substr(5, 5),
					time: item.checkTime.substr(11, 5)
				});	//传时间
				_tableData.push({
					day: item.checkTime.substr(5, 5),
					time: item.checkTime.substr(11, 5),
					createType: item.createType,
					data: _resData
				});
				for (var j = 0; j < _resData.length;j++){
					that.data.series[j].data.push(_resData[j].value);
				}
			}
			console.log(_tableData);
			that.setData({
				tableData: _tableData,
				tableTime: _tableTime,
				categories: that.data.categories
			})

			if (typeof fn == 'function') {
				fn(res.message);
			}
		}
	})
}


/**
 * 
 * 获取用户设置的目标步数
*/
function getSportSet(that,fn){
	//获取用户设置的目标步数
	getApp().globalData.req({
		url: that.data.urls.getTargetStep,
		data: {
			executeUserId: wx.getStorageSync('userLoginInfo').userId,
			executeUserType: 'type_user',
		},
		server: getApp().globalData.servers.sport,
		success: function (data) {

			that.setData({
				sportSet: data.message.targetStepCount,
			})

			if(typeof fn == 'function'){
				fn();
			}
		}
	})
}


/**
 * 获取数据库中的步数信息
*/
function getStepData(that,fn){
	var date = Util.formatTime(new Date(), 'yyyy-MM-dd');
	//获取数据库中的步数信息
	getApp().globalData.req({
		url: that.data.urls.getOneDayStep,
		data: {
			executeUserId: wx.getStorageSync('userLoginInfo').userId,
			executeUserType: 'type_user',
			sharding: date,	//日期
			month: date.substr(0, 4) + date.substr(5, 2)	//月份
		},
		server: getApp().globalData.servers.sport,
		success: function (data) {

			that.setData({
				currentStepCount: data && data.message && data.message.currentStepCount || 0,
				cariello: data && data.message && data.message.cariello || 0,
				distance: data && data.message && data.message.distance || 0
			})

			if (typeof fn == 'function') {
				fn();
			}

		}
	})
}


/**
 * 获取用户当天步数
 */
function getUserSport(that,fn){

	//获取运动步数授权
	wx.getWeRunData({
		success(res) {
			//授权成功
			// 对运动步数进行解密
			getApp().globalData.decrypt({
				decryptUrl: that.data.urls.proxy,	//解密url
				getSessionUrl: that.data.urls.getSessionKey,	//获取sessionKeyUrl
				data:{
					encryptedData: res.encryptedData,
					iv: res.iv
				},
				success: function (data) {
					
					var wxLastStepInfo = data.message.stepInfoList[data.message.stepInfoList.length - 1];
					var wxLastStepTimeStamp = wxLastStepInfo.timestamp * 1000;
					var wxLastStepTime = Util.formatTime(new Date(wxLastStepTimeStamp), 'yyyy-MM-dd');
					var now = Util.formatTime(new Date(), 'yyyy-MM-dd');

					var currentStepCount = 0;
					//若最新一次记录是今天
					if (wxLastStepTime == now){
						currentStepCount = wxLastStepInfo.step;
					}

					//保存用户当前步数信息
					getApp().globalData.req({
						url: that.data.urls.saveTodayStep,
						data: {
							executeUserId: wx.getStorageSync('userLoginInfo').userId,
							executeUserType: 'type_user',
							currentStepCount: currentStepCount,	//当前步数
							weight:0,
							executeUserName: wx.getStorageSync('userLoginInfo').realName,
						},
						server: getApp().globalData.servers.sport,
						success: function (data) {

							//获取用户步数信息
							getStepData(that,fn);

						}

					})

				},fail:function(data){
					//数据解析失败
					console.log('数据解析失败');
					console.log(data);
					//获取用户步数信息
					getStepData(that, fn);
				}
				
			})
		},
		fail(res) {
			// wx.showModal({
			// 	title: '提示',
			// 	content: '您未授权微信运动记步功能，不能获取正确的步数信息',
			// 	showCancel: false,
			// 	success: function (res) {

					
			// 	}
			// })
			getStepData(that,fn);
			
		}
	})
}

/**
 * 画出今日运动完成情况
*/
function showSportComplete(that){
	//计算步数完成度
	var complete = 0;

	if (that.data.sportSet <= 0) {	//运动目标步数为0

		complete = 1;

	} else if (that.data.currentStepCount <= 0) {	//运动步数为0

		complete = 0;

	} else {	//已获取到目标步数

		complete = that.data.currentStepCount / that.data.sportSet;
		complete = complete > 1 ? 1 : complete;
	}

	// 页面渲染完成 
	var cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。 
	cxt_arc.setLineWidth(3);
	cxt_arc.setStrokeStyle('#f6f6f6');
	cxt_arc.setLineCap('round');	//设置线条端点样式
	cxt_arc.beginPath();//开始一个新的路径 
	/**
	 * arc(x坐标，y坐标，半径，起始弧度，终止弧度，弧度方向-默认为false即顺时针)
	*/
	cxt_arc.arc(90, 90, 80, 0, 2 * Math.PI, false);//设置一个原点(106,106)，半径为100的圆的路径到当前路径 
	cxt_arc.stroke();//对当前路径进行描边 

	cxt_arc.setLineWidth(9);
	var grd = cxt_arc.createLinearGradient(30, 10, 120);	//x坐标，y坐标，半径
	grd.addColorStop(0, '#ECFD2D')
	grd.addColorStop(1, '#25A9E3')
	cxt_arc.setStrokeStyle(grd);
	cxt_arc.setLineCap('round')
	cxt_arc.beginPath();//开始一个新的路径 
	cxt_arc.arc(90, 90, 80, 0, Math.PI * 2 * complete, false);
	cxt_arc.stroke();//对当前路径进行描边 

	cxt_arc.draw(); 
}

/**
 * 展示运动目标及今日步数
*/
function showSports(that){

	//获取运动目标步数
	getSportSet(that, function (){

		//获取用户当天步数
		getUserSport(that, function (){

			showSportComplete(that);

		})
	})

}

/**
 * 获取用户步数记录
*/
function getSportData(that,fn){
	//获取用户步数记录
	getApp().globalData.req({
		url: that.data.urls.getAllStep,
		data: {
			executeUserId: wx.getStorageSync('userLoginInfo').userId,
			executeUserType: 'type_user',
			month: 'time_all',	//月份
			pageSize: that.data.pageSize,
			page: that.data.page
		},
		server: getApp().globalData.servers.sport,
		success: function (data) {

			var _categories = [];
			var _series = [];

			for(var i=0;i<data.message.list.length;i++){
				
				var _item = data.message.list[i];
				_categories.push(_item.sharding.substr(5, 2) + '-' + _item.sharding.substr(8));
				_series.push(_item.currentStepCount);
			}
			var sportChartConfig = {
				categories: _categories,
				series:[{
					name: '步数',
					data: _series
				}]
			};

			that.setData({
				sportChartConfig: sportChartConfig
			})

			
			if(typeof fn == 'function'){
				fn();
			}

		}
	})
}



module.exports={
	getQuotaData: getQuotaData,
	getQuotaConfig: getQuotaConfig,
	showSportComplete: showSportComplete,
	showSports: showSports,
	windowWidth: getWindowWidth(),
	getSportData: getSportData,
	getWindowHeight: getWindowHeight()
}