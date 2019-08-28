<template>
  <view class="bluetooth">
    <view class="wifi-wrapper">
      <image src="../../static/image/WeChat.jpg" />
    </view>
    <view class="content">
      <h2>WIFI配网</h2>
    </view>
    <view class="wifi-button">
      <view class="button" v-if="connected">已连接：{{wifiSSID}}</view>
      <view class="button" @click="linkWifi" v-else>立即连接</view>
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

    <!-- <view class="wifi-wrapper qrcode">
      <cover-image v-if="wifi_qrcode" @click="previewImage(wifi_qrcode)" :src='wifi_qrcode'></cover-image>
    </view>
    <view class="content">
      <h2> 扫一扫关注公众号，然后进行配网</h2>
    </view> -->
    <!-- <view class="tips">
      <h3>操作步骤：</h3>
      <p>方法一： 1. 点击保存二维码到相册；2. 微信扫描图片二维码；3. 关注公众号进行配网</p>
      <p>方法二： 1. 微信搜索公众号“XXXXXX”，2. 关注公众号进行配网</p>
    </view> -->
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
      startLSD: false
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
    this.wifiSSID = ''
    this.BSSID = ''
    this.password = ''
    this.networkType = ''
    this.showConnect = false
    this.connected = false
    this.connectedAgain = false
    this.startWifi = false
    this.startLSD = false
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
    //#endif
  },
  computed: {
    ...mapState(['wifi_qrcode', 'userid'])
  },
  methods: {
    close () {
      this.showConnect = false
      this.password = ''
    },
    linkWifi () {
      if (this.networkType === 'wifi') {
        //#ifdef MP-WEIXIN
        wx.startWifi({
          success: (res) => {
            this.startWifi = true
            console.log('初始化wifi成功！');
            wx.getConnectedWifi({
              success: (WifiInfo) => {
                // console.log(WifiInfo)
                console.log('检测已连接的wifi成功！');
                this.wifiSSID = WifiInfo.wifi.SSID
                this.BSSID = WifiInfo.wifi.BSSID
                this.showConnect = true
              },
              fail: () => {
                console.log('检测已连接的wifi失败！');
                this.$CommonJs.showToast('检测连接Wi-Fi失败！')
              }
            })
          }
        })
        //#endif
      } else {
        this.$CommonJs.showToast('请先连接wifi！')
      }
    },
    connectWifi (type) {
      // if (this.password == '') {
      //   this.$CommonJs.showToast('请输入wifi密码！')
      // } else {
        //#ifdef MP-WEIXIN
        wx.connectWifi({
          SSID: this.wifiSSID,
          BSSID: this.BSSID,
          password: this.password,
          success: (res) => {
            console.log('连接wifi成功！');
            this.$CommonJs.showToast('连接wifi成功！')
            this.showConnect = false
            this.connected = true
            console.log('连接wifi成功返回值： ', res)

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
                // wx.showModal({
                //   title: '提示',
                //   content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                // })
                this.$CommonJs.showToast('当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。')
              }
            }
          },
          fail: () => {
            console.log('连接wifi失败！');
            this.$CommonJs.showToast('连接wifi失败！')
          }
        })
        //#endif
      // }
    },
    // 连接设备
    connectShebei () {
      //#ifdef MP-WEIXIN
      wx.connectWifi({
        SSID: this.$ConfigData.Ssid,
        password: this.$ConfigData.WpaPsk,
        success: (res) => {
          console.log('连接CMD成功！');
          this.$CommonJs.showToast('连接CMD成功！')
          // this.wifiConnect(this.$ConfigData.Ssid, this.$ConfigData.WpaPsk)
          this.wifiConnect(this.wifiSSID, this.password)
          console.log('连接CMD成功返回值： ', res)
        },
        fail: (err) => {
          console.log(err)
          console.log('连接CMD失败！');
          this.$CommonJs.showToast('连接CMD失败！')
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
        uni.showToast({
          title: '请求失败！',
          icon: 'none',
          duration: 2000
        });
        return false
      }
      let resultDdata = res.data;
      if (res.statusCode === 200) {
        console.log('请求CMD成功！');
        this.$CommonJs.showToast('请求CMD成功！')
        this.connectWifi(false)
        console.log('请求CMD成功返回值：', resultDdata)
      } else {
        uni.showToast({
          title: '请求失败了！',
          icon: 'none',
          duration: 2000
        });
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
          wx.onLocalServiceFound((res)=> {
            console.log('mDNS 服务发现的事件的回调: ', res)
            uni.hideLoading()
            if (res.serviceName && res.serviceName.length === 12) {
              this.$CommonJs.showToast('配网成功！')
              uni.showLoading({
                title: '开始绑定设备...'
              });
              this.addDevice(res.serviceName)
            } else {
              this.$CommonJs.showToast('配网失败！')
            }
          })
        },
        fail: () => {
          this.$CommonJs.showToast('startLocalServiceDiscovery失败！')
          console.log('startLocalServiceDiscovery失败: ')
          uni.hideLoading();
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
      })
    },
    previewImage (url) {
      uni.previewImage({
        urls: [url],
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function(data) {
            console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
          },
          fail: function(err) {
            console.log(err.errMsg);
          }
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.bluetooth {
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
