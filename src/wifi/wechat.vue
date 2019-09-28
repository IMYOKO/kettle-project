<template>
  <view class="Wifi">
    <view class="tips-wrapper">
      <h3 class="title">微信公众号配网说明：</h3>
      <ul class="zhunbei-list">
        <li>1：关注并进入公众号”小诺智能电器” </li>
        <li>2：选择WIFI 配网</li>
        <li>3：打开机器，设置机器进入微信公众号配网模式</li>
      </ul>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
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
