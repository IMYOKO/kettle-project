<template>
  <view class="bluetooth">
    微信配网
    {{wifiSSID}}
  </view>
</template>

<script>
export default {
  data () {
    return {
      wifiSSID: ''
    }
  },
  onLoad() {
    var _this = this
    //#ifdef MP-WEIXIN
    wx.getConnectedWifi({
      success (WifiInfo) {
        console.log(WifiInfo)
        _this.wifiSSID = WifiInfo.wifi.SSID
      },
      complete (res) {
        console.log(res)
      }
    })
    //#endif
  }
}
</script>

<style lang="less" scoped>
.bluetooth {
  color: blue;
}
</style>
