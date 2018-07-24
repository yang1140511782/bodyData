//if报错，有可能是逗号和分号的区别
// 通过医生姓名或推荐
function personalData(param, successFn) {
  var url = getApp().globalData.urls.baseUrl + '/system/client/user/info/get';  //medcare2模块
  getApp().globalData.req({
    url: url,
    data: param,
    server: getApp().globalData.servers.info,
    success: function (data) {
    // console.log(data)
      if (typeof successFn == 'function') {
        successFn(data.message);
      }
    }
  })
}

/**
 * 获取录入完整个人资料获得的钻石
 * */
function getDiaNum(that, fn) {

	getApp().globalData.req({
		url: that.data.urls.configDetail,
		data: {
			type: 'type_insert_info'
		},
		server: getApp().globalData.servers.account,
		success: function (data) {

			if (typeof fn == 'function') {
				fn(data)
			}
		}
	})
}

/**
 * 判断资料是否完整，是否是第一次完成任务
*/
function checkInfo(that,_message){
	if (_message && _message.isCompleteTask){
		getDiaNum(that,function(res){
			var _diaNum = res.message.voucherCount;
			if (_message.recommendDocId){
				//有推荐医生
				wx.showModal({
					title: '录入完整的个人资料',
					content: '恭喜您完成个人资料的录入,系统将以您的名义赠送给你的推荐医生' + _diaNum + '枚钻石',
				})
			}else{
				//无推荐医生
				wx.showModal({
					title: '录入完整的个人资料',
					content: '恭喜您完成个人资料的录入，系统将赠送给你' + _diaNum + '个钻石，钻石可以赠送给医生',
				})
			}
			
		})
		
	}
}

/**
 * 保存数据
*/
function saveInfo(that,_param,fn){

	getApp().globalData.req({
		url: that.data.urls.upload,
		data: _param,
		server: getApp().globalData.servers.info,
		success: function (data) {
			that.setUserInfo(data.message);

			//判断资料是否完善
			checkInfo(that, data.message);

			if(typeof fn == 'function'){
				fn();
			}

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

}


module.exports = {
  personalData: personalData,
  saveInfo: saveInfo
}




// var param = {
//   "userId": getApp().globalData.userLoginInfo.userId,
//   "phone": getApp().globalData.userLoginInfo.account,
// }
// getApp().globalData.req({
//   url: this.data.urls.obtain,
//   data: param,
//   server: getApp().globalData.servers.info,
//   success: function (data) {
//     console.log('请求成功');
//     console.log(data);
//     // obtainName:,
//     getApp().globalData.userLoginInfo = data.message;
//     console.log(getApp().globalData.userLoginInfo)
//     // wx.hideLoading();
//   }
// })