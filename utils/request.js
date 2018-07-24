
//对请求的封装

// 签名文件
var doSign = require("./sign.js");

var _codeMsg = [
	{ code: 1001, describe: '正常' },
	{ code: 1002, describe: 'IO异常' },
	{ code: 1003, describe: '网络连接异常' },
	{ code: 1004, describe: '网络连接超时' },
	{ code: 1005, describe: '参数无效' },
	{ code: 1006, describe: '空指针异常' },
	{ code: 1007, describe: 'URL异常' },
	{ code: 1008, describe: '未知主机' },
	{ code: 1009, describe: '服务器连接失败' },
	{ code: 1010, describe: '协议解析失败' },
	//{code:1011,describe:'Access_Token鉴权失败'},
	{ code: 1011, describe: '您的账号已在其他地方登录,请重新登录' },
	{ code: 1012, describe: '验证码失效' },
	{ code: 1013, describe: '未知错误' },
	{ code: 1014, describe: '参数解析异常' },
	{ code: 1015, describe: '保存数据失败' },
	{ code: 1016, describe: '更新数据失败' },
	{ code: 1017, describe: '查询数据失败' },
	{ code: 1018, describe: '删除数据失败' },
	{ code: 1019, describe: '服务端异常' },

	{ code: 1020, describe: '登录失败' },
	{ code: 1021, describe: '注册失败' },
	{ code: 1022, describe: '账号已经被注册或者已经绑定了其他信息' },
	{ code: 1023, describe: '账号未注册' },
	{ code: 1024, describe: '数据验证失败' },
	{ code: 1025, describe: '数据解析失败' },
	{ code: 1026, describe: '权限不足' },
	{ code: 1027, describe: '签名错误' },
	{ code: 1028, describe: '密码错误' },

	{ code: 2001, describe: '医生设置门诊冲突' },
	{ code: 2002, describe: '修改门诊状态失败' },
	{ code: 2003, describe: '修改门诊信息失败' },
	{ code: 2004, describe: '当前挂号总数小于已挂号数量' },
	{ code: 2005, describe: '未获取到相关门诊设置信息' },
	{ code: 2006, describe: '门诊挂号已满' },
	{ code: 2007, describe: '当前就诊信息不可用' },
	{ code: 2008, describe: '预约失败' },
	{ code: 2009, describe: '图片上传失败' },

	{ code: 2010, describe: '保存病例失败' },
	{ code: 2011, describe: '更新病例失败' },
	{ code: 2012, describe: '服务端未接收到图片' },
	{ code: 2013, describe: '服务端未接收到数据' },
	{ code: 2014, describe: '当前就诊已上传过病例' },
	{ code: 2015, describe: '当前医生已添加到我的医生列表' },
	{ code: 2016, describe: '挂号时间不得早于当前时间' },
	{ code: 2017, describe: '用户已预约过此次门诊' },
	{ code: 2018, describe: '当前时间已超过挂号时间范围' },
	{ code: 2019, describe: '待审核或已审核的图片不能删除' },

	{ code: 2020, describe: '手机号码格式错误' },
	{ code: 2021, describe: '发送短信数量已超出上限' },
	{ code: 2022, describe: '此条订阅已添加' },
	{ code: 2023, describe: '密码格式错误' },
	{ code: 2024, describe: '验证码不匹配' },
	{ code: 2025, describe: '验证码获取操作过于频繁' },
	{ code: 2026, describe: '没有查到对应ID的医院' },
	{ code: 2027, describe: '没有查到对应ID的科室' },
	{ code: 2028, describe: '数据已存在' },
	// {code:2029,describe:'根据ID未查到对应数据'},
	{ code: 2029, describe: '暂无相关数据，请稍后再试' },

	{ code: 2030, describe: '请求关联亲人已经关联' },
	{ code: 2031, describe: '关联亲人是自己' },
	{ code: 2032, describe: '用户不是群管理员' },
	{ code: 2033, describe: '门诊就诊数量超出约束值' },
	{ code: 2034, describe: '门诊预约费用超出约束值' },
	{ code: 2035, describe: '请求支付平台下单失败' },
	{ code: 2036, describe: '支付金额小于等于0' },
	{ code: 2037, describe: '未获取到就诊信息' },
	{ code: 2038, describe: '就诊卡号重复' },
	{ code: 2039, describe: '没找到对应订单号的订单流水' },

	{ code: 2040, describe: '去支付系统查询订单失败' },
	{ code: 2041, describe: '问题已过期' },
	{ code: 2042, describe: '没找到对应的消息' },
	{ code: 2043, describe: '当前视频已是最新版本' },
	{ code: 2044, describe: '未找到视频资源' },
	{ code: 2045, describe: '视频类型不能为空' },
	{ code: 2046, describe: '视频id不能为空' },
	{ code: 2047, describe: '当前用户已绑定此银行卡' },
	{ code: 2048, describe: '您不能删除医嘱用药提醒' },
	{ code: 2049, describe: '未获取到账户类型信息' },

	{ code: 2050, describe: '未获取到用户的账户信息' },
	{ code: 2051, describe: '账户余额小于提款金额' },
	{ code: 2052, describe: '服务端未获取到相关的交易信息' },
	{ code: 2053, describe: '服务端未获取到相关的账户配置信息' },
	{ code: 2054, describe: '钻石兑换数量大于账户可兑换数量' },
	{ code: 2055, describe: '订单号不存在' },
	{ code: 2056, describe: '通用统一下单参数签名错误' },
	{ code: 2057, describe: '支付应用不可用' },
	{ code: 2058, describe: '提现金额必须大于0' },
	{ code: 2059, describe: '提现金额必须为100的整数倍' },

	{ code: 2060, describe: '当前日期不能提现' },
	{ code: 2061, describe: '当前用户账户钻石总数小于要赠送的钻石数量' },
	{ code: 2062, describe: '账户处理失败' },
	{ code: 2063, describe: '关心堂支付应用不存在' },
	{ code: 2064, describe: '订单已支付' },
	{ code: 2065, describe: '订单号不存在' },
	{ code: 2066, describe: '查询支付结果失败' },
	{ code: 2067, describe: '转诊状态未完成,不能进行相关补贴操作' },
	{ code: 2068, describe: '已经使用 过一键提醒功能' },
	{ code: 2069, describe: '没有找到管理员信息' },

	{ code: 2070, describe: '不支持此支付方式' },
	{ code: 2071, describe: '不可重复提交' },
	{ code: 2072, describe: '未查询到支付信息' },
	{ code: 2073, describe: '赠送的钻石数量必须大于0' },
	{ code: 2074, describe: '银行卡验证有误' },
	{ code: 2075, describe: '银行卡号错误' },
	{ code: 2076, describe: '此银行卡不是当前选中银行下的银行卡' },
	{ code: 2077, describe: '此接口维护升级中' },
	{ code: 2078, describe: '引导内容不可用' },
	{ code: 2079, describe: '未获取到计步设置信息' },

	{ code: 2080, describe: '发送短信失败' },
	{ code: 2081, describe: '该医生目前处于离线状态，暂不能收到提问消息，请选择其他医生进行提问' },
	{ code: 2082, describe: '随访已经发送,不能修改' },
	{ code: 2083, describe: '只可扫描该医生的二维码或分享链接添加' },
	{ code: 2084, describe: '您与该医生并未建立关联，暂不可向他问诊' },
	{ code: 2085, describe: '该用户与医生并未关联,不可预约' },
	{ code: 2086, describe: '24小时内只能提醒一次' },
	{ code: 2087, describe: '随访已经结束，不能修改' },
	{ code: 2088, describe: '存在未结束的维护信息' },
	{ code: 2089, describe: '作为某些团队组长,不能关闭家庭医生服务' },

	{ code: 2090, describe: '已经签约过该服务' },
	{ code: 2091, describe: '请求云信接口失败' },
	{ code: 2092, describe: '所开启的指标占比超过100%' },
	{ code: 2093, describe: '订单状态异常，操作失败' },
	{ code: 2094, describe: '组长没有绑定银行卡，无法创建订单' },
	{ code: 2095, describe: '此帐户已存在' },
	{ code: 2096, describe: '此帐户的账户信息已存在' },
	{ code: 2097, describe: '咨询问诊未结束' },

	{ code: 3001, describe: '当前任务类型已添加' },
	{ code: 3002, describe: '当前任务类型不存在' },
	{ code: 3003, describe: '任务类型数据为空' },
	{ code: 3004, describe: '当前任务已被其他人接受' },
	{ code: 3005, describe: '当前任务已完成' },
	{ code: 3006, describe: '服务端未获取到当前任务信息' },

	{ code: 4001, describe: '服务端未获取到订单类型' },
	{ code: 4002, describe: '航天医院接口返回数据为空' },
	{ code: 4003, describe: '航天医院接口返回数据异常' },
	{ code: 4004, describe: '订单不能重复提交' },
	{ code: 4005, describe: '缴费单据为空' },
	{ code: 4006, describe: '没有找到订单' },
	{ code: 4007, describe: '用户不是订单创建人' },
	{ code: 4008, describe: '该订单类型不能取消' },
	{ code: 4009, describe: '订单取消失败' },
]

/**
 *  url 请求地址
 * data 请求参数 obj
 * server 后台模块
 * method 请求方式 默认为get,可不传
 * success 成功的回调
 * fail 失败的回调
 * header 是否有请求头,
 * parameter boolean 是否将数据封装进parameter中 默认为false
*/

function _post(option) {

	//计算签名
	var signObjStr = doSign.doSign(option.data);
	option.url += "?" + signObjStr + "&server=" + option.server;

	var _data = option.data;
	if (option.server != 'medcare2' || option.parameter) {
		var _data = {
			parameter: JSON.stringify(option.data)
		}
	}

	var header = {
		'content-type': 'application/x-www-form-urlencoded',
		'role-type': '2001',
		'access-token': getApp().globalData.userLoginInfo && getApp().globalData.userLoginInfo.accessToken || '',
		'user-id': getApp().globalData.userLoginInfo && getApp().globalData.userLoginInfo.userId || '',

		'ip': getApp().globalData.header.ip,
		// 'ip': '10.2.2.51',
		'mac': 'mac_web',
		// 'mac': '7D8885B1-D44A-4686-A153-63296D9E9BD7',
		'client-type': 'type_user',
		'shop-type': 'type_medcare',
		// 'shop-type': 'AppStore',
		// 'system-type': 'type_h5',
		'system-type': 'type_sp',
		'system-version': 'system_version_web',
		// 'system-version': '11.2',
		'phone-model': 'phone_model_web',
		// 'phone-model': "iPhone Simulator",
		'app-version': 'app_version_web',
		// 'app-version': '2.2.7',
		'domain-name': 'cluster.cardiochina.net',
		'project': 'medcare',
		// "hosp-id": 'medcare_system',

		// 'lat': getApp().globalData.header.lat,
		// 'lng': getApp().globalData.header.lng,
	}

	if (!option.header) {

	}
	wx.request({
		url: option.url,
		header: header,
		method: option.method || 'POST',
		data: _data,
		success: function (response) {
			var res = response.data;
			if (res.code == 1023) {
				option.success(res);
				return;
			}

			if (res.code == 1011) {
				wx.showToast({
					title: '您的账号已在其他地方登录,请重新登录',
					icon: 'none',
					complete: function () {

						setTimeout(function () {

							try {
								wx.reLaunch({
									url: '../../index/index',
								})
							} catch (e) {
								wx.reLaunch({
									url: '../../../index/index',
								})
							}
						}, 1500)


					}
				})
				return;
			}

			if ((res.code == 1001 || (!res.code && res.success == true)) && typeof option.success == 'function') {

				option.success(res);

			} else if (res.code && res.code != 1001) {

				//特殊处理,不提示
				var array= [1025];
				if (array.indexOf(res.code) !=-1){
					if (typeof option.fail == 'function') {
						option.fail(res);
					}
					return;
				}

				for (var i = 0; i < _codeMsg.length; i++) {

					if (res.code == _codeMsg[i].code) {
						wx.showToast({
							title: _codeMsg[i].describe,
							icon: 'none',
						})

						if (typeof option.fail == 'function') {
							option.fail(res);
						}
						break;
					}
				}

			} else if (!res.success) {
				wx.showToast({
					title: res.message || '请求失败，请稍后再试',
					icon: 'none',
				})

				if (typeof option.fail == 'function') {
					option.fail(res);
				}
			}
		},
		fail: function (res) {
			console.log('请求失败');
			console.log(res);
			if (typeof option.fail == 'function') {
				option.fail(res);
			} else {
				wx.showToast({
					title: '请求失败，请稍后再试',
					icon: 'none',
				})
			}
		},
		complete: function (res) {

			if (res.statusCode != 200) {
				wx.showToast({
					title: '请求失败，请稍后再试',
					icon: 'none',
				})
			}
		}
	});
}


/**
 * 上传文件
*/
function uploadFile(option){

	//计算签名
	var signObjStr = doSign.doSign(option.data);
	option.url += "?" + signObjStr + "&server=" + option.server;

	wx.uploadFile({
		url:option.url,
		filePath: option.filePath,
		name: option.name,
		formData: option.formData,
		header:{
			"Content-Type": "multipart/form-data"
		},
		success: function (res) {
			console.log('上传文件');
			console.log(res)

			var res = res.data && JSON.parse(res.data);
			var resData = res.data && JSON.parse(res.data);
			console.log(resData);
			//resData 为一个数组，当前默认只能上传一张图，即只取数组第一个值；
			var res = resData[0];
			if (typeof option.success == 'function') {
				option.success(res);
			}
			
		},
		fail: function (res) {
			console.log('请求失败');
			console.log(res);
			if (typeof option.fail == 'function') {
				option.fail(res);
			} else {
				wx.showToast({
					title: '请求失败，请稍后再试',
					icon: 'none',
				})
			}
		},
		complete: function (res) {

			if (res.statusCode != 200) {
				wx.showToast({
					title: '请求失败，请稍后再试'+res.statusCode,
					icon: 'none',
				})
			}
		}
	})
}

/**
 * 检查登录态是否过期
*/
function checkSession(fn){
	wx.checkSession({
		success: function () {
			//session 未过期，并且在本生命周期一直有效
			console.log('session success');

			if(typeof fn == 'function'){
				fn();
			}
		},
		fail: function () {
			//登录态过期
			console.log('session fail');

			// 重新登录
			wx.login({
				success: res => {
					// 发送 res.code 到后台换取 openId, sessionKey, unionId
					console.log('user success');
					console.log(res);
					getApp().globalData.loginCode = res.code;

					if (typeof fn == 'function') {
						fn();
					}
				}
			})
		}
	})
}

/**
 * 获取sessionKey
*/
/**
 *  url 请求地址
 * data 请求参数 obj
 * server 后台模块
 * method 请求方式 默认为get,可不传
 * success 成功的回调
 * fail 失败的回调
 * header 是否有请求头,
 * parameter boolean 是否将数据封装进parameter中 默认为false
*/
function getSessionKey(option) {

	//先判断登录是否过期，获取code,再通过code获取sessionKey
	checkSession(function (){
		option.data.js_code = getApp().globalData.loginCode;
		_post(option);
		
	})
}

/**
 * 将获取的数据解密
 * option{
 * 	decryptUrl 解密url
 * 	getSessionUrl 获取session 的 Url,
 * 	data{
 * 		encryptedData
 * 		iv
 * 	}
 * 	success 成功函数,
 *  fail 失败函数
 * }
 * 
 * */
 //判断重复登录次数，不能超过5次
 var loopNum = 0;
function decrypt(option){

	//解密需要sessionkey,所以先获取sessionKey

	//获取sessionKey
	var sessionOption = {
		url: option.getSessionUrl,
		data: {
			appid: getApp().globalData.appId,
			secret: getApp().globalData.secret,
			js_code: getApp().globalData.loginCode,
			grant_type: 'authorization_code'
		},
		server: getApp().globalData.servers.proxy,
		success: function (sessionRes) {

			console.log('sessionRes');
			console.log(sessionRes);
			if (sessionRes.message.errcode){
				console.warn(sessionRes.message.errmsg);
				if (loopNum >= 5) {
					wx.showToast({
						title: '未获取到sessionKey',
						icon: 'none'
					})

					if (typeof option.fail == 'function') {
						option.fail()
					}
					return;
				}
				loopNum++;
				// 重新登录
				wx.login({
					success: res => {
						// 发送 res.code 到后台换取 openId, sessionKey, unionId
						console.log('user success');
						console.log(res);
						getApp().globalData.loginCode = res.code;

						decrypt(option);
					}
				})
			}

			//获取sessionKey之后再进行解密
			_post({
				url: option.decryptUrl,
				data: {
					appId: getApp().globalData.appId,
					encryptedData: option.data.encryptedData,
					sessionKey: sessionRes.message.session_key,
					iv: option.data.iv
				},
				server: getApp().globalData.servers.proxy,
				success: function (data) {

					
					if (typeof(option.success) == 'function') {
						
						option.success(data);
					}

				},fail: function(data){
					if (typeof (option.fail) == 'function') {

						option.fail(data);
					}
				}

			})
		},fail:function(failRes){
			console.log('未获取到sessionKey');
			console.log(failRes);
			if (loopNum>=5){
				wx.showToast({
					title: '未获取到sessionKey',
					icon:'none'
				})

				if(typeof option.fail == 'function'){
					option.fail ()
				}
				return;
			}
			loopNum++;
			// 重新登录
			wx.login({
				success: res => {
					// 发送 res.code 到后台换取 openId, sessionKey, unionId
					console.log('user success');
					console.log(res);
					getApp().globalData.loginCode = res.code;

					decrypt(option);
				}
			})
		}
	}

	getSessionKey(sessionOption);
}

module.exports = {
	post: _post,
	getSessionKey: getSessionKey,
	decrypt: decrypt,
	uploadFile: uploadFile	//上传文件
}