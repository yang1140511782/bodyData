// pages/search/search.js
var Server = require("./search_server.js");

var APP = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      baseUrl: APP.globalData.urls.baseUrl,
      imgServer: APP.globalData.servers.image,
      inputShowed: false,
      inputVal: "",
      urls:{
          searchUrl: APP.globalData.urls.baseUrl + '/medcare/doctor/getDocInfoBydoctorInvitationCode',  //通过医生姓名或推荐码搜索医生 core
      },
      userInfo: {
          account:'',   //登录时获取的账号
          code:'',  //登录时获取的验证码
          selectDoc:"", //选择的推荐医生
      },  //注册用户信息
      resultData:{},    //搜索结果
      searchLoading:false,
      searchLoadingComplete:false
  },

  showInput: function () {
      this.setData({
          inputShowed: true
      });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  inputTyping: function (e) {
      this.setData({
          inputVal: e.detail.value,
          searchLoading:false,
          searchLoadingComplete:false
      });

      var param = {
          'invitationCodeOrHospitalUserName': this.data.inputVal,//邀请码或医生姓名
          pageSize: 10,
          page: 1
      }
      var that = this;      
      Server.searchDoc(param,function(res){

          that.setData({
              resultData: res
          })
      })
  },


  //图片发生错误
  imageError: function(e){

      var index = e.target.dataset.errorimg;
      var img = "resultData.list[" + index +"].headImgError";
      this.setData({
          [img]:true
      })
  },

  /**
   * 选择医生后返回上一页
  */
  toPrePage: function(e){
	  var _theDoc = e.currentTarget.dataset.item;

	  //获取页面栈
	  var pages = getCurrentPages();
	  if (pages.length > 1) {
		  //上一个页面实例对象
		  var prePage = pages[pages.length - 2];
		  //调用上一个页面的setDoc方法
		  prePage.setDoc(_theDoc);
		  wx.navigateBack({
			  delta: 1
		  })
	  }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //   console.log(options);
    //   this.setData({
    //       'userInfo.account': options.account,
    //       'userInfo.code': options.code,
    //   })
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
      
      var that = this;
      if (that.data.resultData.currentPage >= that.data.resultData.totalPage) {
          that.setData({
              searchLoadingComplete: true
          })
          return;
      }
      this.setData({
          searchLoading: true
      })

      var param = {
          'invitationCodeOrHospitalUserName': that.data.inputVal,//邀请码或医生姓名
          pageSize: that.data.resultData.pageSize,
          page: that.data.resultData.currentPage + 1
      }
      Server.searchDoc(param, function (res) {

          var _list = that.data.resultData.list;    //原数组
          console.log(_list)
          for(var i=0;i<res.list.length;i++){
              _list.push(res.list[i]);
          } 

          setTimeout(function(){
              that.setData({
                  resultData: res,
              })
              that.setData({
                  'resultData.list': _list,
                  searchLoading: false
              })
          },1000);
          
      })
  },  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})