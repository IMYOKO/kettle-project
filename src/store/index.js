import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  shareType: false,
  showOtaPop: false,
  showCodePop: false,
  showCancelPop: false,
  userid: uni.getStorageSync('userid') || '', // 用户id
  username: uni.getStorageSync('username') || '', // 用户账号
  nickname: uni.getStorageSync('nickname') || '', // 昵称
  logo_path: uni.getStorageSync('logo_path') || '', // 头像
  mobile: uni.getStorageSync('mobile') || '', // 手机
  openid: uni.getStorageSync('openid') || '', // 用户openid
  wifi_qrcode: uni.getStorageSync('wifi_qrcode') || '', // wifi_qrcode
  deviceInfoItems: {
    modelid: null,
    deviceid: null,
    peifang: '',
    img_path: '',
    status: null
  },
  helpItems: {
    title: '',
    content: '',
  },
  newsItems: {
    newsid: null,
    title: '',
    content: '',
    addtime: '',
  },
  yuyueInfor: {
    yy_modelid: null,
    yy_modelname: "",
    yy_overtime: "",
    yy_status: ""
  }
}

const mutations = {
  setShareType (state, value) {
    state.shareType = value
  },
  setCodeType (state, value) {
    state.showCodePop = value
  },
  setOtaType (state, value) {
    state.showOtaPop = value
  },
  setCancelPopType (state, value) {
    state.showCancelPop = value
  },
  setMobile (state, mobile) {
    state.mobile = mobile
    uni.setStorageSync('mobile', mobile)
  },
  setUserInfor (state, payload) {
    state.userid = payload.userid
    state.username = payload.username
    state.nickname = payload.nickname
    state.logo_path = payload.logo_path
    state.mobile = payload.mobile
    state.openid = payload.openid
    state.wifi_qrcode = payload.wifi_qrcode
    uni.setStorageSync('userid', payload.userid)
    uni.setStorageSync('username', payload.username)
    uni.setStorageSync('nickname', payload.nickname)
    uni.setStorageSync('logo_path', payload.logo_path)
    uni.setStorageSync('mobile', payload.mobile)
    uni.setStorageSync('openid', payload.openid)
    uni.setStorageSync('wifi_qrcode', payload.wifi_qrcode)
  },
  setDeviceInfoItems (state, payload) {
    state.deviceInfoItems = Object.assign({}, state.deviceInfoItems, payload)
    console.log(state.deviceInfoItems)
  },
  setHelpItems (state, payload) {
    state.helpItems = Object.assign({}, payload)
  },
  setNewsItems (state, payload) {
    state.newsItems = Object.assign({}, payload)
  },
  setYuyueInfor (state, payload) {
    state.yuyueInfor = Object.assign({}, payload)
  }
}

export default new Vuex.Store({
  state,
  mutations
})
