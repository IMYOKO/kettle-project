<template>
  <view class="add-device">
    <ul class="from">
      <li>
        <input type="text" class="code" v-model="code" placeholder="请输入设备码">
        <view class="get-code" @click="getScanCode">扫码获取</view>
      </li>
    </ul>
    <view class="button-wrapper">
     <view class="button">确定</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      code: ''
    }
  },
  methods: {
    getScanCode () {
      const _this = this
      uni.scanCode({
        onlyFromCamera: true,
        success: function (res) {
          // console.log('条码类型：' + res.scanType);
          // console.log('条码内容：' + res.result);
          _this.code = res.result
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.add-device {
  padding: 15px 20px;

  .button-wrapper {
    padding-top: 30%;
    display: flex;
    justify-content: center;
    .button {
      width: 60%;
      height: 44px;
      line-height: 44px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      border-radius: 22px;
      background: #7993b7;
    }
  }

  .from {
    li {
      height: 50px;
      position: relative;
      border-bottom: 1px solid #b3b3b3;

      input {
        position: absolute;
        left: 0;
        bottom: 0px;
        width: 100%;
        padding: 6px 0;
        font-size: 16px;
        color: #333;

        &.code {
          width: 60%;
        }
      }

      .get-code {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 10;
        width: 35%;
        height: 40px;
        font-size: 16px;
        font-weight: bold;
        color: #f9b073;
        line-height: 40px;
        text-align: center;
      }
    }
  }
}
</style>
