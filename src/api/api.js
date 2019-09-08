import BasicApi from './index'

class Api extends BasicApi {
  constructor() {
    super()
  }

  /**
   * 登录
   * @param {String} code 
   */
  login (data) {
    return this.post('/api/login.htm', data, {})
  }

  /**
   * 添加设备
   * @param {Number} userid 
   * @param {String} mac 
   */
  addDevice (data) {
    return this.post('/api/addDevice.htm', data, {})
  }

  /**
   * 我的设备
   * @param {Number} userid 
   */
  queryDeviceInfo (data) {
    return this.post('/api/queryDeviceInfo.htm', data, {})
  }

  /**
   * 设备详情
   * @param {Number} userid 
   * @param {Number} deviceid 
   */
  queryDevice (data) {
    return this.post('/api/queryDevice.htm', data, {})
  }

  /**
   * 设备功能详情
   * @param {Number} type  0 预约  1 开始 
   * @param {Number} userid 
   * @param {Number} deviceid 
   * @param {Number} modelid 
   * @param {String} time  预约时间 2019-10-10 10:10:10 年月日时分秒格式 
   * @param {Number} shichang 
   * @param {Number} wendu 
   */
  saveJobTime (data) {
    return this.post('/api/saveJobTime.htm', data, {})
  }

  /**
   * 我的预约
   * @param {Number} userid 
   */
  queryAppointment (data) {
    return this.post('/api/queryAppointment.htm', data, {})
  }

  /**
   * 绑定手机
   * @param {Number} userid 
   * @param {String} mobile 
   * @param {String} code 
   */
  bindMobile (data) {
    return this.post('/api/bindMobile.htm', data, {})
  }

  /**
   * 获取验证码
   * @param {Number} userid 
   * @param {String} mobile 
   */
  getCode (data) {
    return this.post('/api/getCode.htm', data, {})
  }

  /**
   * 更多资讯
   * @param {Number} page 
   */
  queryNewsList (data) {
    return this.post('/api/queryNewsList.htm', data, {})
  }

  /**
   * 帮助中心
   */
  queryHelpList () {
    return this.post('/api/queryHelpList.htm', {}, {})
  }
  
  /**
   * 固件升级
   * @param {Number} userid
   * @param {Number} deviceid
   */
  upOta (data) {
    return this.post('/api/upOta.htm', data, {})
  }

  /**
   * 设备编辑
   * @param {Number} userid
   * @param {Number} deviceid
   * @param {Number} type  1、修改设备名称  2、删除设备  3、分享设备”
   * @param {String} devicename 设备名称  type为1时必填
   * @param {String} mobile 用户手机号, type为3时必填
   */
  updateDevice (data) {
    return this.post('/api/updateDevice.htm', data, {})
  }

  /**
   * 查询设备下子用户
   * @param {Number} userid
   * @param {Number} deviceid
   */
  queryDeviceUser (data) {
    return this.post('/api/queryDeviceUser.htm', data, {})
  }

  /**
   * 删除设备子用户
   * @param {Number} userid
   * @param {Number} deviceid
   * @param {Number} deluserid 被删除的用户id
   */
  delDeviceUser (data) {
    return this.post('/api/delDeviceUser.htm', data, {})
  }

  /**
   * wifi配网
   * @param {String} Ssid
   * @param {String} WpaPsk
   */
  wifiConnect (Ssid, WpaPsk) {
    const header = {
      'Authorization': `Basic YWRtaW46YWRtaW4=`,
      'Content-Type': 'text/html'
      // 'Content-Length': 0
    }
    return this.postWifi(`/?CMD=CMD1&Ssid=${Ssid}&WpaPsk=${WpaPsk}`, {}, header)
    // return this.postWifi(`/?CMD=CMD1&Ssid=${Ssid}&WpaPsk=${WpaPsk}`, {}, { Authorization: `Basic YWRtaW46YWRtaW4=` })
  }

  /**
   *  取消预约
   * @param {Number} userid
   * @param {Number} deviceid
   * @param {Number} modelid
   */
  overDeviceYy (data) {
    return this.post(`/api/overDeviceYy.htm`, data, {})
  }

}

export default new Api()