<template>
  <view class="bluetooth">
    <!-- <view class="wifi-wrapper">
      <image src="../../static/image/WeChat.jpg" />
    </view>
    <view class="content">
      <h2>WIFI配网</h2>
    </view>
    <view class="wifi-button">
      <view class="button" v-if="connected">已连接：{{wifiSSID}}</view>
      <view class="button" @click="linkWifi" v-else>立即连接</view>
    </view>

    <view class="wifi-pop" v-if="showConnect">
      <view class="close" @click="close">取消</view>

      <view class="connect">当前连接Wi-Fi：{{wifiSSID}}</view>
      <view class="wifi-form">
        <view class="text">WIFI密码</view>
        <input type="password" class="password" v-model="password" placeholder="请输入Wi-Fi连接密码">
      </view>

      <view class="wifi-button sure">
        <view class="button" @click="connectWifi">确定</view>
      </view>
    </view> -->

    <view class="wifi-wrapper qrcode">
      <cover-image v-if="wifi_qrcode" @click="previewImage(wifi_qrcode)" :src='wifi_qrcode'></cover-image>
    </view>
    <view class="content">
      <h2> 扫一扫关注公众号，然后进行配网</h2>
    </view>
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
      connected: false
    }
  },
  onLoad() {
    uni.getNetworkType({
      success: (res) => {
        this.networkType = res.networkType
        console.log(res.networkType);
      }
    });
  },
  computed: {
    ...mapState(['wifi_qrcode'])
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
            console.log(res)
            wx.getConnectedWifi({
              success: (WifiInfo) => {
                console.log(WifiInfo)
                this.wifiSSID = WifiInfo.wifi.SSID
                this.BSSID = WifiInfo.wifi.BSSID
                this.showConnect = true
              },
              fail: () => {
                this.$CommonJs.showToast('检测连接Wi-Fi失败！')
              },
              complete: (res) => {
                console.log(res)
              }
            })
          }
        })
        //#endif
      } else {
        this.$CommonJs.showToast('请先连接wifi！')
      }
    },
    connectWifi () {
      if (this.password == '') {
        this.$CommonJs.showToast('请输入wifi密码！')
      } else {
        //#ifdef MP-WEIXIN
        wx.connectWifi({
          SSID: this.wifiSSID,
          BSSID: this.BSSID,
          password: this.password,
          success: (res) => {
            this.$CommonJs.showToast('连接成功！')
            this.showConnect = false
            this.connected = true
            console.log(res.errMsg)
          },
          fail: () => {
            this.$CommonJs.showToast('连接失败！')
          },
          complete: (res) => {
            console.log(res)
          }
        })
        //#endif
      }
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
