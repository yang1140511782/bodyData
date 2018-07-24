// pages/homes/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      urls:{
          lastData: getApp().globalData.urls.baseUrl+'/system/healthData/user/lastData',  //获取用户最新的三条数据 cause
      },
      lastDatas:[]
  },

  /**
   * 查看全部健康记录
  */
  toShowData:function(event){
      wx.navigateTo({
          url: '../showdata/showdata'
      })
  },

  /**
   * 设置需记录的指标
  */
  toSetQuota: function (event) {
      wx.navigateTo({
          url: '../setquota/setquota'
      })
  },

/**
 * 下载app
*/
  toDownload: function (event) {
    //   wx.navigateTo({
    //       url: '../../download/download'
    //   })
  },

  /**
   * 获取最新动态
   */
  getLastData: function (that) {

	  //获取用户最新的三条健康动态
	  getApp().globalData.req({
		  url: that.data.urls.lastData,
		  data: {
			  userId: getApp().globalData.userLoginInfo.userId,
		  },
		  server: getApp().globalData.servers.cause,
		  success: function (data) {

			  var _healthData = [];
			  for (var i = 0; i < data.message.length && i <= 2; i++) {
				  _healthData.push(data.message[i]);
			  }
			  _healthData = that.formateHealthData(_healthData);

			  that.setData({
				  lastDatas: _healthData
			  })
		  }
	  })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
	  this.getLastData(this);
  },

  /**
	   * 对获取的健康动态数据进行封装
	  */
  formateHealthData: function(data) {
	  var _formateData = [];
	  for (var i = 0; i < data.length; i++) {

		  var units = ''; //检测数据的单位
		  var values = '';    //检测数据的值
		  var names = ''; //检测数据的名字
		  //遍历指标中的检测数据
		  var dataList = JSON.parse(data[i].data);
		  for (var j = 0; j < dataList.length; j++) {
			  if (j == 0) { //第一次遍历检测数据前面不加‘/’
				  units += dataList[j].unit;
				  values += dataList[j].value;
				  names += dataList[j].name;
			  } else {
				  units += '/' + dataList[j].unit;
				  values += '/' + dataList[j].value;
				  names += '/' + dataList[j].name;
			  }
		  }

		  _formateData.push({
			  quotaName: data[i].quotaName,
			  id: data[i].id,
			  quotaId: data[i].quotaId,
			  checkTime: data[i].checkTime,   //测量时间
			  units: units,
			  names: names,
			  values: values
		  })
	  }

	  return _formateData;
  }
})