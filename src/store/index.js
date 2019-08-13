import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  showCodePop: false,
  userid: uni.getStorageSync('userid') || '', // 用户id
  username: uni.getStorageSync('username') || '', // 用户账号
  nickname: uni.getStorageSync('nickname') || '', // 昵称
  logo_path: uni.getStorageSync('logo_path') || '', // 头像
  mobile: uni.getStorageSync('mobile') || '', // 手机
  openid: uni.getStorageSync('openid') || '', // 用户openid
  deviceInfoItems: {
    modelid: null,
    peifang: '',
    deviceid: null
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
  }
}

const mutations = {
  setCodeType (state, value) {
    state.showCodePop = value
  },
  setUserInfor (state, payload) {
    state.userid = payload.userid
    state.username = payload.username
    state.nickname = payload.nickname
    state.logo_path = payload.logo_path
    state.mobile = payload.mobile
    state.openid = payload.openid
    uni.setStorageSync('userid', payload.userid);
    uni.setStorageSync('username', payload.username);
    uni.setStorageSync('nickname', payload.nickname);
    uni.setStorageSync('logo_path', payload.logo_path);
    uni.setStorageSync('mobile', payload.mobile);
    uni.setStorageSync('openid', payload.openid);
  },
  setDeviceInfoItems (state, payload) {
    state.deviceInfoItems = Object.assign({}, payload)
  },
  setHelpItems (state, payload) {
    state.helpItems = Object.assign({}, payload)
  },
  setNewsItems (state, payload) {
    state.newsItems = Object.assign({}, payload)
  }
}

export default new Vuex.Store({
  state,
  mutations
})
