
// 通过医生姓名或推荐
function searchDoc(param,successFn){

    var url = getApp().globalData.urls.baseUrl + '/medcare/doctor/getDocInfoBydoctorInvitationCode';  //通过医生姓名或推荐码搜索医生 core
    getApp().globalData.req({
        url: url,
        data: param,
        server: getApp().globalData.servers.core,
        success: function (data) {
            
            if (typeof successFn == 'function'){
                successFn(data.message);
            }
        }
    })
}

module.exports = {
    searchDoc: searchDoc
}