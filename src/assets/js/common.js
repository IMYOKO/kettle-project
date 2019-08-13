import configData from '../../config/index'

// 路由跳转
const pathTo = url => {
  console.log(url)
  uni.navigateTo({url});
}

// 公共提示
const showToast = title => {
  uni.showToast({
    title,
    icon: 'none',
    duration: 2000
  });
}

const getUserInfor = () => {
  console.log(!uni.getStorageSync('openid'))
  if (!uni.getStorageSync('openid')) {
    // sessionStorageSync.setItem("openid",uuida());
    uni.login({
      provider: 'weixin',
      success(loginRes) {
        console.log(loginRes)
        const url = configData.BasicUrl + "/app/activity/getH5Openid?code=" + loginRes.code;
        // uni.request({
        //   method: 'GET',
        //   url: url,
        //   data: {},
        //   success(res) {
        //     console.log("返回了登录信息");
        //     console.log(res);
        //     if (res.statusCode === 200) {
        //       uni.setStorageSync('openid', JSON.parse(res.data.data.result).openid);
        //     }
        //   }
        // });
        // 获取用户信息
        // uni.getUserInfo({
        //   provider: 'weixin',
        //   success(infoRes) {
        //     console.log(infoRes)
        //     uni.setStorageSync('userInfo', infoRes.userInfo)
        //   }
        // });
      }
    });
  }
}

export default {
  pathTo,
  showToast,
  getUserInfor
}