<template>
  <view class="Wifi">
    <view class="tips-wrapper">
      <h3 class="title">配置设备上网前请确认已完成以下准备：</h3>
      <ul class="zhunbei-list">
        <li>1：手机连接WIFI, 不支持5G WIFI和隐藏的WIFI</li>
        <li>2：打开机器，同时长按“功能”“时间”按键</li>
        <li>3：按下一步，配置设备上网</li>
      </ul>
    </view>

    <view class="wifi-button">
      <view class="button" @click="goWifi">配置设备上网</view>
    </view>
    <view class="wifi-button">
      <view class="button" @click="goWechat">微信公众号配网</view>
    </view>
    <view class="wifi-button">
      <view class="is-connect" @click="goAdd">设备已联网，跳过此步</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    goAdd() {
      this.$CommonJs.pathTo('/device/add')
    },
    goWifi() {
      this.$CommonJs.pathTo('/wifi/index')
    },
    goWechat() {
      this.$CommonJs.pathTo('/wifi/wechat')
    }
  }
}
</script>

<style lang="less" scoped>
.Wifi {
  padding-bottom: 20px;

  .tips-wrapper {
    // background: #fff;
    padding: 20px;
    margin-bottom: 30px;
    .title {
      font-size: 13px;
      line-height: 15px;
      color: #999;
      margin-bottom: 15px;
    }
  
    .zhunbei-list {
      li {
        font-size: 15px;
        line-height: 18px;
        color: #000;
        margin-bottom: 10px;
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

    .is-connect {
      font-size: 15px;
      line-height: 20px;
      color: #20c500;
      margin-top: 10px;
    }
  }
}
</style>
