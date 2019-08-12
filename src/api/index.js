import configData from '../config/index'

class BasicApi {
  constructor() {}
  get (url, config) {
    return uni.request({
      url: configData.BasicUrl + url,
      header: {...config}
    })
  }
  post (url, data, config) {
    return uni.request({
      method: 'POST',
      url: configData.BasicUrl + url,
      data,
      header: {...config}
    })
  }
  resultCallback (data, sucssCallbak, errorCallbak) {
    var [error, res] = data;
    if (error) {
      console.log(error)
      // var title = "请求超时";
      // uni.showToast({
      //   title,
      //   icon: 'none',
      //   duration: 2000
      // });
    } else {
      console.log(data);
      var resultDdata = res.data;
      console.log("返回数据" + JSON.stringify(resultDdata));
      // if (resultDdata.status == 0) {
      //   sucssCallbak && sucssCallbak(resultDdata.status, resultDdata.data, res.header);
      // } else {
      //   var title = resultDdata.msg;
      //   uni.showToast({
      //     title,
      //     icon: 'none',
      //     duration: 2000
      //   });
      //   errorCallbak && errorCallbak(resultDdata.status, resultDdata.msg);
      // }
    }
  }
}

export default BasicApi