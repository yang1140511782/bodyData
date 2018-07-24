var ServerData = require("./personalData_server.js");

var Util = require("../../../utils/util.js");
var UserLoginInfo = wx.getStorageSync('userLoginInfo');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		baseUrl: getApp().globalData.urls.baseUrl,
		imgServer: getApp().globalData.servers.image,
		userInfo: {
			sex: UserLoginInfo && UserLoginInfo.sex || '男',
			birthday: UserLoginInfo && UserLoginInfo.birthday,
			docName: "",
			pwd: '',
			realName: '',//名字
			idCard: '',//身份证
			recommendDoc: '',//推荐医生
			haveIllness: '',//已患疾病
			account: '',//电话
			code: '',
			area: '',//地区
			address: '',//详细地址
			height: '',//身高
			waistline: '',//腰围
			weight: '',//重量
			guardian: '',//紧急联系人
			guardianLinkphone: '',//紧急联系人电话
			surgeryHistory: '',//手术史
			allergyHistory: '',//过敏
			smoke: '',//吸烟
			acohol: '',//饮酒
			area1: '',//地区
			address1: '',//详细地址
			headImageUrl: UserLoginInfo && UserLoginInfo.headImageUrl

		},
		//推荐医生id  
		recommendDocId: '',

		//从后台获取名字并赋值
		// obtainName: getApp().globalData.userLoginInfo.realName,
		//从后台获取身份证赋值
		// obtainIdcard: getApp().globalData.userLoginInfo.idCard,
		//从后台获取街道并赋值
		// region: [getApp().globalData.userLoginInfo.area],
		//详细地址
		// address:"",
		// imgUrl: getApp().globalData.urls.baseUrl + getApp().globalData.userLoginInfo.headImageUrl + getApp().globalData.servers.image,
		urls: {
			upload: getApp().globalData.urls.baseUrl + '/system/client/user/info/update',
			obtain: getApp().globalData.urls.baseUrl + '/system/client/user/info/get',  //medcare2模块
			recommendID: getApp().globalData.urls.baseUrl + '/system/hospital/user/detail',
			configDetail: getApp().globalData.urls.baseUrl + '/system/medcare/tc/config/detail',	//获取砖石        //account
		},
		// imgUrl:'../../../images/userNoSex.png',
		height: "",
		/**
		 * 性别弹出选项
		*/
		pickerRange: ['男', '女'],
		/**
		 * 吸烟弹出选项
		*/
		smoke: ['不抽烟', '已抽烟', '一天10支', '一天10-19支', '一天20支以上'],
		/**
		* 饮酒弹出选项
	   */
		acohol: ['不喝酒', '偶尔喝', '经常喝'],
		/**
		* 地区弹出选项
	   */
		region: [],
		/**
		* 体重弹出选项
	   */
		index: 0,
		multiArray: [["20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174", "175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "192", "193", "194", "195", "196", "197", "198", "199", "200", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "215", "216", "217", "218", "219", "220", "221", "222", "223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "233", "234", "235", "236", "237", "238", "239", "240"], ['.0', '.1', '.2', '.3', '.4', '.5', '.6', '.7', '.8', '.9']],
		multiIndex: [],
		/**
		  * 体重弹出选项
		 */
		multiArray1: [["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174", "175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "192", "193", "194", "195", "196", "197", "198", "199", "200", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "215", "216", "217", "218", "219", "220", "221", "222", "223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "233", "234", "235", "236", "237", "238", "239", "240", "241", "242", "243", "244", "245", "246", "247", "248", "249", "250", "251", "252", "253", "254", "255", "256", "257", "258", "259", "260", "261", "262", "263", "264", "265", "266", "267", "268", "269", "270"], ['.0', '.1', '.2', '.3', '.4', '.5', '.6', '.7', '.8', '.9']],
		multiIndex1: [],
		/**
		 * 腰围弹出选项
		*/
		multiArray2: [["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174", "175", "176", "177", "178", "179", "180"], ['.0', '.1', '.2', '.3', '.4', '.5', '.6', '.7', '.8', '.9']],
		multiIndex2: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

		var that = this;
		//限制出生日期时间段
		var date = new Date();
		var seperator1 = "-";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = year + seperator1 + month + seperator1 + strDate;

		this.setData({
			dateValueEnd: currentdate,
		})


		/**
	   * 从后台获取各个数据并渲染到界面
	   */
		// console.log(getApp().globalData.userLoginInfo.account)
		var param = {
			"userId": wx.getStorageSync('userLoginInfo').userId,
			"phone": wx.getStorageSync('userLoginInfo').account,
		}

		var that = this;

		/**
		 * 获取个人基本信息
		*/
		getApp().globalData.req({
			url: this.data.urls.obtain,
			data: param,
			server: getApp().globalData.servers.info,
			success: function (data) {

				//转换个人信息
				var _userInfo = data.message;

				//转换地区格式
				// var _areaNew = data.message.area;
				// var _area = JSON.parse(data.message.area);
				// var _areaNew = _area.join(',');

				//转换已患疾病
				var JSONhaveIllness = data.message.haveIllness && JSON.parse(data.message.haveIllness) || [];
				var haveIllnessArr = [];
				for (var i = 0; i < JSONhaveIllness.length; i++) {
					// console.log(i);
					haveIllnessArr.push(JSONhaveIllness[i].illnessName)
				}
				_userInfo.haveIllnessName = haveIllnessArr;
				_userInfo.acohol = that.data.acohol[_userInfo.drinking - 1];
				_userInfo.smoke = that.data.smoke[_userInfo.smoking - 1];

				that.setData({
					'userInfo': _userInfo,
					'headImgError': false
				})

				//获取推荐医生信息
				that.getDocInfo();

			}
		})


	},



	/**
	 * 获取推荐医生信息
	*/
	getDocInfo: function () {

		var param = {
			"userId": this.data.userInfo.recommendDocId || wx.getStorageSync('userLoginInfo').recommendDocId,
		}

		var that = this;
		getApp().globalData.req({
			url: this.data.urls.recommendID,
			data: param,
			server: getApp().globalData.servers.info,
			success: function (data) {

				var _recommendDoc = data.message.name;
				that.setData({
					'userInfo.recommendDoc': _recommendDoc,
				})
			}
		})
	},

	/**
	 * 获取本地图片
	*/
	setPhotoInfo: function () {
		var that = this;
		wx.chooseImage({
			count: 1,//默认9
			sizeType: ['original', 'comressed'],//指定原图还是压缩
			sourceType: ['album', 'camera'],//指定来源是相册还是相机
			success: function (res) {
				
				wx.navigateTo({
					url: 'cropper/cropper?imageSrc=' + res.tempFilePaths[0]
				})
				//返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				// that.setData({ imgUrl: tempFilePaths })
			}
		})
	},
	/**
	 * 弹出选项框
	 */
	pickerRangePickerBindchange: function (e) {//性别
		var sex = this.data.pickerRange[e.detail.value];

		var that = this;
		this.setData({
			'userInfo.gender': sex
		})

		//保存选中数据
		var param = {
			"userId": getApp().globalData.userLoginInfo.userId,
			"gender": sex,

		}
		ServerData.saveInfo(that, param);
	},
	smokePickerBindchange: function (e) {//选择吸烟史
		var _smoke = this.data.smoke[e.detail.value];
		this.setData({
			'userInfo.smoke': _smoke
		})

		var that = this;
		//保存选中数据
		var param = {
			"userId": getApp().globalData.userLoginInfo.userId,
			"smoking": parseInt(e.detail.value) + 1,

		}

		ServerData.saveInfo(that, param);
		
	},

	acoholPickerBindchange: function (e) {//饮酒
		var _acohol = this.data.acohol[e.detail.value];

		this.setData({
			'userInfo.acohol': _acohol
		})
		var that = this;
		//保存选中数据
		var param = {
			"userId": getApp().globalData.userLoginInfo.userId,
			"drinking": parseInt(e.detail.value) + 1,

		}

		ServerData.saveInfo(that, param);
		
	},


	datePickerBindchange: function (e) {//选择出生日期
		var date = e.detail.value;
		this.setData({
			'userInfo.birthday': date
		})
		var that = this;
		//保存选中数据
		var param = {
			"userId": getApp().globalData.userLoginInfo.userId,
			"birthday": e.detail.value,
		}

		ServerData.saveInfo(that, param);

	},
	dateValueEnd: function (e) {

	},

	bindRegionChange: function (e) {//地区弹出框

		var that = this;
		this.setData({
			'userInfo.area': e.detail.value.join('')
		})
		//保存选中数据
		var param = {
			"userId": this.data.userInfo.userId,
			"address": this.data.userInfo.address,
			"area": e.detail.value.join('')
		}

		ServerData.saveInfo(that, param);
	},

	/**
	* 体重弹出选项框
	*/
	bindMultiPickerChange: function (e) {

		var data = {
			multiArray: this.data.multiArray,
			multiIndex: this.data.multiIndex
		};
		var _weight = data.multiArray[0][data.multiIndex[0]] + data.multiArray[1][data.multiIndex[1]];
		this.setData({
			'userInfo.weight': _weight,
		});
		var that = this;
		//保存选中数据
		var param = {
			"userId": this.data.userInfo.userId,
			"weight": _weight,
			"waistline": this.data.userInfo.waistline,
			"height": this.data.userInfo.height,

		}

		ServerData.saveInfo(that, param);

	},
	bindMultiPickerColumnChange: function (e) {
		var data = {
			multiArray: this.data.multiArray,
			multiIndex: this.data.multiIndex
		};
		data.multiIndex[e.detail.column] = e.detail.value;
		this.setData(data);
	},
	/**
	* 身高弹出选项框
	*/
	bindMultiPickerChange1: function (e) {

		var data = {
			multiArray1: this.data.multiArray,
			multiIndex1: this.data.multiIndex
		};
		var _height = data.multiArray1[0][data.multiIndex1[0]] + data.multiArray1[1][data.multiIndex1[1]];
		this.setData({
			'userInfo.height': _height,
		});
		var that = this;
		//保存选中
		var param = {
			"userId": this.data.userInfo.userId,
			"weight": this.data.userInfo.weight,
			"waistline": this.data.userInfo.waistline,
			"height": _height,

		}

		ServerData.saveInfo(that, param);
	},
	bindMultiPickerColumnChange1: function (e) {
		var data = {
			multiArray1: this.data.multiArray,
			multiIndex1: this.data.multiIndex
		};
		// console.log(data)
		data.multiIndex1[e.detail.column] = e.detail.value;
		this.setData(data);
	},
	/**
	 * 腰围弹出选项框
	 */
	bindMultiPickerChange2: function (e) {

		var data = {
			multiArray2: this.data.multiArray,
			multiIndex2: this.data.multiIndex
		};
		var _waistline = data.multiArray2[0][data.multiIndex2[0]] + data.multiArray2[1][data.multiIndex2[1]];
		this.setData({
			'userInfo.waistline': _waistline,
		});
		var that = this;
		//保存选中
		var param = {
			"userId": this.data.userInfo.userId,
			"weight": this.data.userInfo.weight,
			"waistline": _waistline,
			"height": this.data.userInfo.height,

		}

		ServerData.saveInfo(that, param);

	},
	bindMultiPickerColumnChange2: function (e) {
		var data = {
			multiArray2: this.data.multiArray,
			multiIndex2: this.data.multiIndex
		};
		// console.log(data)
		data.multiIndex2[e.detail.column] = e.detail.value;
		this.setData(data);
	},
	/**
	 * 推荐医生跳转
	 */
	jumpDoc: function (options) {
		wx.navigateTo({
			url: '../../search/search'
		})
	},
	/**
	 * 修改推荐医生
	*/
	setDoc: function (docInfo) {


		this.setData({
			'userInfo.recommendDoc': docInfo,
		})
		//保存推荐医生
		var param = {
			"register": docInfo.userId,
			"registerType": 'type_doc',
			"recommendDocId": docInfo.userId,
			"userId": this.data.userInfo.userId,
		}
		getApp().globalData.req({
			url: this.data.urls.upload,
			data: param,
			server: getApp().globalData.servers.info,
			success: function (data) {

				if (data.code == 1001) {
					wx.showToast({
						title: '保存成功',
						icon: 'succes',
						duration: 1000,
						mask: true
					})
				}
			}
		})
	},
	/**
	 * 疾病跳转
	 */
	jumpIllness: function (options) {
		// wx.redirectTo({
		//   url: '../personalData/Disease/Disease'
		// })
		wx.navigateTo({
			url: '../../search/search'
		})
	},

	/**
	 * 身份验证
	 */
	verification: function (e) {
		if (!e.detail.value){
			wx.showToast({
				title: '请输入身份证号',
				icon: 'none',
			})
			return;
		}
		var that = this;
		var param = {
			"userId": getApp().globalData.userLoginInfo.userId,
			"idCard": e.detail.value,
		}
		var regLowerCase = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;//判断用户输入的是否为小写字母
		if (e.detail.value != getApp().globalData.userLoginInfo.idCard) {
			if (regLowerCase.test(e.detail.value) === true) {

				ServerData.saveInfo(that, param);

			} else {
				wx.showToast({
					title: '身份证格式有误，请重新输入',
					icon: 'none',
					duration: 2000,
					mask: true
				})
			}
		}

		// var param = {
		//   "userId": getApp().globalData.userLoginInfo.userId,
		//   "idCard": e.detail.value,

		// }
		// if (regLowerCase.test(e.detail.value) === true){         
		//   getApp().globalData.req({
		//     url: this.data.urls.upload,
		//     data: param,
		//     server: getApp().globalData.servers.info,
		//     success: function (data) {
		//       console.log('请求成功');
		//       console.log(data);
		//       if (data.code == 1001) {
		//         wx.showToast({
		//           title: '保存成功',
		//           icon: 'succes',
		//           duration: 1000,
		//           mask: true
		//         })
		//       }
		//     }
		//   })
		// }  
	},

	/**
	 * 保存姓名
	 * */
	bindName: function (e) {

		if (!e.detail.value){
			wx.showToast({
				title: '请输入姓名',
				icon:'none'
			})
			return;
		}
		if (this.data.userInfo.realName != e.detail.value) {
			var param = {
				"userId": getApp().globalData.userLoginInfo.userId,
				"realName": e.detail.value,

			}
			var that = this;

			ServerData.saveInfo(that, param);
		}
	},


	/**
   * 输入详细地址
   * */
	bindAddress: function (e) {

		if (getApp().globalData.userLoginInfo.address != e.detail.value) {
			var param = {
				"userId": getApp().globalData.userLoginInfo.userId,
				"address": e.detail.value,
				"area": getApp().globalData.userLoginInfo.area,


			}
			var that = this;
			ServerData.saveInfo(that, param);
			
		}


	},

	/**
   * 输入紧急联系人
   * */
	bindContact: function (e) {

		if (e.detail.value && this.data.userInfo.guardian != e.detail.value) {

			this.setData({
				'userInfo.guardian': e.detail.value
			})

			//已输入联系人但未输入联系人电话
			if (e.detail.value && !this.data.userInfo.guardianLinkphone) {

				wx.showToast({
					title: '请输入联系人电话',
					icon: 'none'
				})
				return;
			}
			var that = this;
			var param = {
				"userId": getApp().globalData.userLoginInfo.userId,
				"guardian": e.detail.value,
				"guardianLinkphone": this.data.userInfo.guardianLinkphone

			}

			ServerData.saveInfo(that, param);
			
		}
	},


	/**
   * 输入联系人电话
   * */
	bindContactPhone: function (e) {

		if (e.detail.value && this.data.userInfo.guardianLinkphone != e.detail.value) {

			this.setData({
				'userInfo.guardianLinkphone': e.detail.value
			})

			if (!Util.formatPhone(e.detail.value)) {
				wx.showToast({
					title: '请输入正确的电话号码',
					icon: 'none'
				})
				return;
			}

			//已输入联系人电话但未输入联系人姓名
			if (e.detail.value && !this.data.userInfo.guardian) {
				wx.showToast({
					title: '请输入联系人姓名',
					icon: 'none'
				})
				return;
			}
			var that = this;
			var param = {
				"userId": getApp().globalData.userLoginInfo.userId,
				"guardianLinkphone": e.detail.value,
				"guardian": this.data.userInfo.guardian

			}

			ServerData.saveInfo(that, param);
			
		}


	},


	/**
   * 输入过敏史
   * */
	bindAllergyHistory: function (e) {

		if (this.data.userInfo.allergyHistory != e.detail.value) {
			var param = {
				"userId": getApp().globalData.userLoginInfo.userId,
				"allergyHistory": e.detail.value,
			}
			var that = this;

			ServerData.saveInfo(that, param);
			
		}
	},
	/**
   * 输入手术史
   * */
	bindSurgeryHistory: function (e) {

		if (this.data.userInfo.surgeryHistory != e.detail.value) {
			var param = {
				"userId": getApp().globalData.userLoginInfo.userId,
				"surgeryHistory": e.detail.value,
			}
			var that = this;

			ServerData.saveInfo(that, param);
			
		}
	},

	/**
	 * 跳转至搜索疾病页面
   */
	toIllness: function (e) {

		wx.navigateTo({
			url: '../illness/illness?userIllness=' + this.data.userInfo.haveIllness,
		})
	},

	/**
	 * 修改已患疾病
	*/
	setIllness: function (illInfo) {

		// this.setData({
		// 	'userInfo.recommendDoc': docInfo,
		// })
		// //保存推荐医生
		var param = {
			haveIllness: JSON.stringify(illInfo),
			"userId": this.data.userInfo.userId,
		}
		var that = this;

		ServerData.saveInfo(that, param,function(){
			//转换已患疾病
			var haveIllnessArr = [];
			for (var i = 0; i < illInfo.length; i++) {

				haveIllnessArr.push(illInfo[i].illnessName)
			}
			that.setData({
				'userInfo.haveIllnessName': haveIllnessArr.toString(),
				'userInfo.haveIllness': JSON.stringify(illInfo)
			})

		});
		
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
	 * 将用户信息添加至缓存
	*/
	setUserInfo:function(_userInfo){
		wx.setStorage({
			key: 'userLoginInfo',
			data: _userInfo
		});
		getApp().globalData.userLoginInfo = _userInfo
	},

	/**
	 * 修改头像
	*/
	setHeadImg: function (imgInfo) {

		var param = {
			headImageUrl: imgInfo.imgUrl,
			"userId": this.data.userInfo.userId,
		}
		var that = this;

		ServerData.saveInfo(that, param,function(){
			that.setData({
				// 'imgUrl': imgInfo.imgUrl,
				'imgUrl': getApp().globalData.urls.baseUrl + imgInfo.imgUrl + getApp().globalData.servers.image,
				'userInfo.headImageUrl': imgInfo.imgUrl,
				'headImgError': false
			})
		});
	},



})