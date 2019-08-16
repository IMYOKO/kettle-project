<template>
  <view class="ota">
    <view class="bg" @click="setOtaType(false)"></view>
    <view class="ota-wrapper">
      <view class="ota-box">
        <h2>固件名称：<text>{{ota_name}}</text></h2>
        <h2>最新固件版本：<text>{{ota_version}}</text></h2>
        <h2>最新固件包时间：<text>{{ota_time}}</text></h2>
      </view>
      <view class="button-wrapper">
        <view class="button" @click="upOta">升级固件</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    have_newota: Number,
    ota_name: String,
    ota_version: String,
    ota_time: String,
    upOtaCallback: Function
  },
  computed: {
    ...mapState(['userid'])
  },
  methods: {
    ...mapMutations(['setOtaType']),
    async upOta () {
      const prams = {
        userid: this.userid,
        deviceid: this.deviceid
      }
      const data = await this.$server.upOta(prams)
      this.$server.resultCallback(
				data,
				(data) => {
          this.$CommonJs.showToast('升级成功！')
          this.upOtaCallback()
				}
			)
    }
  }
}
</script>

<style lang="less" scoped>
.ota {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  &-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 200;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: #fff;
    border-radius: 20px;
    .ota-box {
      width: 280px;
      background: #fff;
      h2 {
        font-size: 14px;
        line-height: 25px;
        margin-bottom: 2px;
        color: #999;
        text {
          color: #333;
        }
      }
    }
    .button-wrapper {
      display: flex;
      margin-top: 20px;
      justify-content: center;
      .button {
        width: 50%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        border-radius: 10px;
        background: #7993b7;
        color: #fff;
        font-size: 14px;
      }
    }
  }

  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    background: rgba(0, 0, 0, .6)
  }
}

</style>

