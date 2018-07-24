

/**
 * 获取指标的监测参数
 * */
function getQuotaData(that, quotaId) {

	getApp().globalData.req({
		url: that.data.urls.getQuotaDataConfig,
		data: {
			quotaId: quotaId
		},
		server: getApp().globalData.servers.cause,
		success: function (data) {
			that.setData({
				"addQuota.quotaData": data.message
			},function(){
				wx.hideLoading();
			})
		}
	})
}


/**
 * 获取保存数据成功后的砖石数量
 * */
function getDiaNum(that, _type, fn) {

	getApp().globalData.req({
		url: that.data.urls.configDetail,
		data: {
			type: _type
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
 * 用户保存数据成功后，判断提示语
 * */
function addedData(that, _type, recommendDocId) {

	var msg = '保存成功';
	var diaNum = 0;	//添加成功后砖石数量

	if (_type == "type_first_insert") { //首次录入

		getDiaNum(that, 'type_first_heathy_data', function (diaResp) {

			diaNum = diaResp.message.voucherCount;

			if (recommendDocId) {
				// 有推荐医生
				msg = '恭喜您首次录入身体数据，系统将以您的名义赠送给你的推荐医生' + diaNum + '枚钻石';
			} else {
				//无推荐医生
				msg = '恭喜您首次录入身体数据，系统将赠送给你' + diaNum + '个钻石，钻石可以赠送给医生';
			}
			wx.hideLoading();
			wx.showModal({
				title: '首次录入身体数据',
				content: msg,
				success: function (res) {
					if (res.confirm) {
						wx.redirectTo({
							url: '../showdata/showdata?quotaId=' + that.data.addQuota.quotaId,
						})
					}
				}
			})
		})

	} else if (_type == 'type_today_first_insert') {

		getDiaNum(that, 'type_heathy_data', function (diaResp) {

			diaNum = diaResp.message.voucherCount;

			//当天首次录入
			if (recommendDocId) {
				// 有推荐医生
				msg = '您已完成今日身体数据的录入，为您的推荐医生赢得' + diaNum + '枚钻石';
			} else {
				//无推荐医生
				msg = '您已完成今日身体数据的录入，系统将赠送给你' + diaNum + '枚钻石，钻石可以赠送给医生';
			}
			wx.hideLoading();
			wx.showModal({
				title: '录入身体数据',
				content: msg,
				success: function (res) {
					if (res.confirm) {
						wx.redirectTo({
							url: '../showdata/showdata?quotaId=' + that.data.addQuota.quotaId,
						})
					}
				}
			})
		})

	} else {

		wx.hideLoading();
		wx.showToast({
			title: '保存成功',
			icon: 'none',
			complete: function () {

				setTimeout(function () {

					wx.redirectTo({
						url: '../showdata/showdata?quotaId=' + that.data.addQuota.quotaId,
					})

					// if(that.data.pageFrom == 'showData'){
					// 	wx.navigateTo({
					// 		url: '../showdata/showdata',
					// 	})
					// }else{
					// 	wx.switchTab({
					// 		url: '../home/home',
					// 	})
					// }
				}, 1500)
			}
		})
	}
}

module.exports = {
	getQuotaData: getQuotaData,
	addedData: addedData
}