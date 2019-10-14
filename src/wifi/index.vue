<template>
  <view class="bluetooth">
    <view class="wifi-wrapper">
      <image src="../static/image/WeChat.jpg" />
    </view>
    <view class="content">
      <h2>WIFI配网</h2>
    </view>
    <view class="wifi-button">
      <view class="button" v-if="connected">已连接：{{wifiSSID}}</view>
      <view class="button" @click="linkWifi" v-else>立即连接</view>
    </view>

    <view class="process-wrapper">
      <ul class="process-list">
        <li>
          <view class="title" :class="{'green': step_01_status === true, 'red': step_01_status === false}">1. 手机连接设备</view>
          <image v-if="step_01_status === true" src="../static/image/isOk@2x.png" />
          <image v-else-if="step_01_status === false" src="../static/image/isNotOk@2x.png" />
        </li>
        <li>
          <view class="title" :class="{'green': step_02_status === true, 'red': step_02_status === false}">2. 发送配网信息</view>
          <image v-if="step_02_status === true" src="../static/image/isOk@2x.png" />
          <image v-else-if="step_02_status === false" src="../static/image/isNotOk@2x.png" />
        </li>
        <li>
          <view class="title" :class="{'green': step_03_status === true, 'red': step_03_status === false}">3. 设备联网</view>
          <image v-if="step_03_status === true" src="../static/image/isOk@2x.png" />
          <image v-else-if="step_03_status === false" src="../static/image/isNotOk@2x.png" />
        </li>
        <li>
          <view class="title" :class="{'green': step_04_status === true, 'red': step_04_status === false}">4. 设备绑定</view>
          <image v-if="step_04_status === true" src="../static/image/isOk@2x.png" />
          <image v-else-if="step_04_status === false" src="../static/image/isNotOk@2x.png" />
        </li>
      </ul>
    </view>

    <!-- <view class="wifi-button">
      <view class="button" @click="wifiConnect($ConfigData.Ssid, $ConfigData.WpaPsk)">接口测试</view>
    </view> -->
    <!-- <view class="wifi-button" v-if="connectedAgain"> -->
    <!-- <view class="wifi-button">
      <view class="button" @click="startLocalServiceDiscovery">测mDNS</view>
    </view> -->

    <view class="wifi-pop" v-if="showConnect">
      <view class="close" @click="close">取消</view>

      <view class="connect">当前连接Wi-Fi：{{wifiSSID}}</view>
      <view class="wifi-form">
        <view class="text">WIFI密码</view>
        <input type="password" class="password" v-model="password" placeholder="请输入Wi-Fi连接密码">
      </view>

      <view class="wifi-button sure">
        <view class="button" @click="connectWifi(true)">确定</view>
      </view>
    </view>

  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data () {
    return {
      wifiSSID: '',
      BSSID: '',
      networkType: '',
      password: '',
      showConnect: false,
      connected: false,
      connectedAgain: false,
      startWifi: false,
      startLSD: false,
      udpSocket: null,
      step_01_status: null,
      step_02_status: null,
      step_03_status: null,
      step_04_status: null,
      timer: null,
      LocalServiceDiscoveryTimer: null,
      count: 0,
      waitTimer: null,
      isWifiConnect: false,
      wifiConnectCount: 0,
    }
  },
  onShow() {
    uni.getNetworkType({
      success: (res) => {
        this.networkType = res.networkType
        console.log('网络类型： ', res.networkType);
      }
    });
    // this.startLocalServiceDiscovery()
    // this.wifiConnect(this.$ConfigData.Ssid, this.$ConfigData.WpaPsk)
  },
  onHide() {
    this.clears()
  },
  onUnload() {
    this.clears()
  },
  computed: {
    ...mapState(['wifi_qrcode', 'userid'])
  },
  methods: {
    clears () {
      this.wifiSSID = ''
      this.BSSID = ''
      this.password = ''
      this.networkType = ''
      this.showConnect = false
      this.connected = false
      this.connectedAgain = false
      this.startWifi = false
      this.startLSD = false
      this.udpSocket = null
      this.step_01_status = null
      this.step_02_status = null
      this.step_03_status = null
      this.step_04_status = null
      this.isWifiConnect = false
      this.wifiConnectCount = 0
      //#ifdef MP-WEIXIN
      if (this.startWifi) {
        wx.stopWifi({
          success: (res) => {
            console.log(res)
          },
          fail: (err) => {
            console.log(err)
          }
        })
      }
      if (this.startLSD) {
        wx.stopLocalServiceDiscovery({
          success: (res) => {
            console.log(res)
          },
          fail: (err) => {
            console.log(err)
          }
        })
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (this.waitTimer) {
        clearTimeout(this.waitTimer)
      }
      if (this.LocalServiceDiscoveryTimer) {
        clearTimeout(this.LocalServiceDiscoveryTimer)
      }
      //#endif
    },
    close () {
      this.showConnect = false
      this.password = ''
    },
    goBack() {
      this.timer = setTimeout(()=>{
        uni.navigateBack({})
      }, 2000)
    },
    linkWifi () {
      if (this.networkType === 'wifi') {
        //#ifdef MP-WEIXIN
        wx.startWifi({
          success: (res) => {
            this.startWifi = true
            console.log('初始化wifi成功！', res);
            wx.getConnectedWifi({
              success: (WifiInfo) => {
                console.log('检测已连接的wifi成功！', WifiInfo);
                this.wifiSSID = WifiInfo.wifi.SSID
                this.BSSID = WifiInfo.wifi.BSSID
                this.showConnect = true
              },
              fail: (err) => {
                console.log('step_01_status, 检测已连接的wifi失败！', err);
                this.$CommonJs.showToast('检测连接Wi-Fi失败！')
                this.step_01_status = false
                this.goBack()
              }
            })
          }
        })
        //#endif
      } else {
        this.$CommonJs.showToast('请先连接wifi！')
        this.goBack()
      }
    },
    connectWifi (type) {
      //#ifdef MP-WEIXIN
      if (this.password == '') {
        this.$CommonJs.showToast('请输入wifi密码！')
        return
      }
      wx.connectWifi({
        SSID: this.wifiSSID,
        BSSID: this.BSSID,
        password: this.password,
        success: (res) => {
          this.$CommonJs.showToast('连接wifi成功！')
          this.showConnect = false
          this.connected = true
          console.log('连接wifi成功！连接wifi成功返回值： ', res)

          // 连接设备
          if (type) {
            this.connectShebei()
          }
          // 搜索mdns
          if (!type) {
            this.connectedAgain = true
            if (wx.startLocalServiceDiscovery) {
              this.startLocalServiceDiscovery()
            } else {
              // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
              this.$CommonJs.showToast('当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。')
              this.step_03_status = false
              console.log('step_03_status, 当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。');
              this.goBack()
            }
          }
        },
        fail: (err) => {
          this.$CommonJs.showToast('连接wifi失败！')
          if (type) {
            console.log('step_01_status, 连接wifi失败！', err);
            this.step_01_status = false
          } else {
            this.step_03_status = false
            console.log('step_03_status, 连接wifi失败！', err);
          }
          this.goBack()
        }
      })
      //#endif
    },
    // 连接设备
    connectShebei () {
      //#ifdef MP-WEIXIN
      wx.connectWifi({
        SSID: this.$ConfigData.Ssid,
        password: this.$ConfigData.WpaPsk,
        success: (res) => {
          this.$CommonJs.showToast('连接CMD成功！')

          console.log('连接CMD成功！连接CMD成功返回值： ', res)
          // 第一步成功
          this.step_01_status = true

          // udp配网
          // wifi配网
          this.waitTimer = setInterval(()=>{
            this.wifiConnectCount ++
            if (this.isWifiConnect || this.wifiConnectCount > 10) {
              clearInterval(this.waitTimer)
            } else {
              this.wifiConnect(this.wifiSSID, this.password)
            }
          }, 2000)
        },
        fail: (err) => {
          console.log('step_01_status, 连接CMD失败！', err);
          this.$CommonJs.showToast('连接CMD失败！')
          this.step_01_status = false
          this.goBack()
        }
      })
      //#endif
    },
    // wifi配网
    async wifiConnect (Ssid, WpaPsk) {
      console.log('wifi接口参数: ', Ssid, WpaPsk)
      const data = await this.$server.wifiConnect(Ssid, WpaPsk)
      console.log('接口返回值：', data)
      const [error, res] = data;
      if (error) {
        if (this.wifiConnectCount > 10) {
          uni.showToast({
            title: '请求失败！',
            icon: 'none',
            duration: 2000
          });
          this.step_02_status = false
          console.log('step_02_status error, 请求失败', error)
          this.goBack()
        }
        return false
      }
      let resultDdata = res.data;
      if (res.statusCode === 200) {
        console.log('请求CMD成功！');
        this.$CommonJs.showToast('请求CMD成功！')

        // 第二步成功！
        this.isWifiConnect = true
        this.step_02_status = true
        this.connectWifi(false)
        console.log('请求CMD成功返回值：', resultDdata)
      } else {
        if (this.wifiConnectCount > 10) {
          uni.showToast({
            title: '请求失败了！',
            icon: 'none',
            duration: 2000
          });
          this.step_02_status = false
          console.log('step_02_status resultDdata, 请求失败', resultDdata)
          this.goBack()
        }
      }
    },
    // mDns 
    startLocalServiceDiscovery () {
      //#ifdef MP-WEIXIN
      uni.showLoading({
        title: '配网中，请等待...'
      });
      wx.startLocalServiceDiscovery({
        // 当前手机所连的局域网下有一个 _music._tcp 类型的服务
        // _kettle._tcp
        serviceType: '_kettle._tcp', // _music._tcp
        success: () => {
          this.startLSD = true
          console.log('startLocalServiceDiscovery success')
          this.LocalServiceDiscoveryTimer = setInterval(() => {
            this.count ++
            if (this.count >= 30) {
              clearInterval(this.LocalServiceDiscoveryTimer)
              this.$CommonJs.showToast('配网超时！')
              this.step_03_status = false
              console.log('step_03_status 配网超时！')
              this.goBack()
              uni.hideLoading();
            }
          }, 1000)
          wx.onLocalServiceFound((res)=> {
            console.log('mDNS 服务发现的事件的回调: ', res)
            clearInterval(this.LocalServiceDiscoveryTimer)
            uni.hideLoading()
            if (res.serviceName && res.serviceName.length === 12) {
              this.$CommonJs.showToast('配网成功！')
              uni.showLoading({
                title: '开始绑定设备...'
              });

              // 第三步成功
              this.step_03_status = true
              this.addDevice(res.serviceName)
            } else {
              this.$CommonJs.showToast('配网失败！')
              console.log('step_03_status, 配网失败！', res)
              this.step_03_status = false
              this.goBack()
            }
          })
        },
        fail: (err) => {
          this.$CommonJs.showToast('startLocalServiceDiscovery失败！')
          uni.hideLoading();
          console.log('step_03_status, startLocalServiceDiscovery失败！', err)
          this.step_03_status = false
          this.goBack()
        }
      })
      //#endif
    },
    // 绑定设备
    async addDevice (mac) {
      const data = await this.$server.addDevice({userid: this.userid, mac})
      uni.hideLoading()
      this.$server.resultCallback(data,
			(data) => {
        this.$CommonJs.showToast('绑定成功！')

        // 第四步成功！
        this.step_04_status = true
      },
      (data) => {
        console.log('step_04_status 绑定失败！', data)
        this.step_04_status = false
        this.goBack()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.bluetooth {
  .process-wrapper {
    padding-top: 30px;
    display: flex;
    justify-content: center;
    .process-list {
      li {
        display: flex;
        margin-bottom: 5px;
        image {
          margin-top: 3px;
          margin-left: 3px;
          width: 14px;
          height: 14px;
        }
        .title {
          color: #999;
          font-size: 14px;
          line-height: 20px;
          &.red {
            color: #ff5645;
          }
          &.green {
            color: #00ce0c;
          }
        }
      }
    }

  }
  .wifi-button {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    &.sure {
      margin-top: 60px;
    }
    .button {
      width: 60%;
      height: 44px;
      line-height: 44px;
      background: #20c500;
      font-size: 14px;
      color: #fff;
      border-radius: 10px;
      text-align: center;
    }
  }
  .wifi-wrapper {
    padding-top: 12%;
    display: flex;
    justify-content: center;

    cover-image,
    image {
      width: 140px;
      height: 140px;
      display: block;
    }

    &.qrcode {
      cover-image,
      image {
        width: 240px;
        height: 240px;
        display: block;
      }
    }
  }
  .content {
    margin-top: 10px;
    h2 {
      color: #333;
      text-align: center;
      font-size: 15px;
      line-height: 26px;
    }
  }
  .tips {
    color: #666;
    padding: 20px;
    font-size: 14px;
    line-height: 24px;
    p, h3 {
      margin-bottom: 5px;
    }
  }
  .wifi-pop {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #f1f2f8;
    z-index: 1000;

    .close {
      position: absolute;
      left: 15px;
      top: 10px;
      color: #999;
      z-index: 10;
      font-size: 15px;
    }

    .connect {
      margin-top: 80px;
      height: 44px;
      line-height: 44px;
      font-size: 15px;
      padding: 0 15px;
    }

    .wifi-form {
      padding-top: 30px;
      height: 44px;
      line-height: 44px;
      border-top: 1px solid #dedede;
      border-bottom: 1px solid #dedede;
      position: relative;
      padding: 0 15px 0 70px;

      .text {
        color: #666;
        width: 70px;
        font-size: 14px;
        position: absolute;
        left: 15px;
        top: 0;
        line-height: 44px;
      }
      .password {
        display: block;
        padding: 10px;
        font-size: 15px;
      }
    }
  }
}
</style>
