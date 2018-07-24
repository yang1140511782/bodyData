

// 获取用户已开启指标
function getUserQuota(that,fn) {
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

					if (message.illnessId){	//开启了疾病类的指标

						_list.push({
							illnessId: message.illnessId,
							quotaList: [message.quotaId],
							showName: message.illnessName
						});

					}else{

						_list.push({
							quotaId: message.quotaId,
							illnessId: message.illnessId,
							showName: message.quotaName
						});
					}
					
					continue;
				}

				for (var j = 0; j < _list.length; j++) {

					if (message.illnessId && message.illnessId == _list[j].illnessId) {	//push已有的疾病类的指标

						_list[j].quotaList.push(message.quotaId);
						break;

					} else if (message.illnessId && j == _list.length - 1) {	//push新的疾病类的指标

						_list.push({
							illnessId: message.illnessId,
							quotaList: [message.quotaId],
							showName: message.illnessName
						});
						break;

					} else if ( j == _list.length - 1) {	//push新的单独指标
						
						_list.push({
							quotaId: message.quotaId,
							illnessId: message.illnessId,
							showName: message.quotaName
						});
						break;

					}


				}
			}

			that.setData({
				userQuota: _list
			},function(res){
				that.getUserCtnHeight(that);
			});

			if(typeof fn == 'function'){
				fn(that);
			}
		}
	})
}

//获取全部指标
function getAllQuota(that){
	getApp().globalData.req({
		url: that.data.urls.getAllQuota,
		data: {},
		server: getApp().globalData.servers.cause,
		success: function (data) {

			var _msg = data.message; //获取的全部指标
			var _userQuota = that.data.userQuota;	//用户设置的指标

			//判断是否已开启
			for (var i = 0; i < _msg.length; i++) {
				for (var j = 0; j < _userQuota.length; j++) {

					if (!_userQuota[j].illnessId && _msg[i].id == _userQuota[j].quotaId) {

						_msg[i].userSlt = true;
					}

				}
			}

			that.setData({
				allQuota: _msg
			})
			wx.hideLoading();
		}
	})

}

module.exports = {
	getUserQuota: getUserQuota,
	getAllQuota: getAllQuota
}