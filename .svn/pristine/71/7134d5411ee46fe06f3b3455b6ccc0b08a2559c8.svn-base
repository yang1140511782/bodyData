
/**
 * date:date类型的时间
 * fmt: string 'yyyy-MM-dd hh:mm:ss'
*/
const formatTime = (date, fmt) => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')

    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 验证手机号码是否正确
 * */ 
const formatPhone = phone => {

    if(!phone){
        wx.showToast({
            title: '请输入手机号',
            icon: 'none'
        })
        return ;
    }
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|(19[0-9]{1})|(11[0-9]{1})|(12[0-9]{1})|(10[0-9]{1})|(16[0-9]{1}))+\d{8})$/;

    if (!reg.test(phone)){
        wx.showToast({
            title: '手机号码格式不正确',
            icon: 'none'
        })
        return false;
    }
    return true;
}

module.exports = {
  formatTime: formatTime,
  formatPhone: formatPhone
}
