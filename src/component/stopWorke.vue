<template>
  <view class="cancels">
    <view class="bg"></view>
    <view class="form-wrapper">
      <view class="input-box">
        <text>{{device_status === 1 ? '停止工作？' : device_status === 3 || device_status === 4 ? '停止保温？' : ''}}</text>
      </view>
      <view class="button-wrapper">
        <text @click="setStopWorkeType(false)">取消</text>
        <text @click="overDeviceYy">确定</text>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    deviceid: Number,
    device_status: Number,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['showStopWorke', 'userid'])
  },
  methods: {
    ...mapMutations(['setStopWorkeType']),
    async overDeviceYy () {
      const prams = {
        userid: this.userid,
        deviceid: this.deviceid,
        modelid: 0
      }
      const data = await this.$server.overDeviceYy(prams)
      this.$server.resultCallback(
				data,
				(data) => {
          this.$CommonJs.showToast('操作成功！')
          this.setStopWorkeType(false)
          this.$emit('queryDeviceInfo', {userid: this.userid, deviceid: this.deviceid})
          if (this.where === 'deviceItem') {
            this.$emit('cancelCallback')
          } else {
            uni.navigateBack({})
          }
				}
			)
    }
  }
}
</script>

<style lang="less" scoped>
.cancels {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(0, 0, 0, .6);
  }

  .form-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 101;
    width: 80%;
    padding: 20px 20px 0;
    background: #fff;
    border-radius: 10px;
    transform: translate(-50%, -50%);

    .input-box {
      text-align: center;
      margin-bottom: 5px;
      border-bottom: 1px solid #dedede;
      input {
        font-size: 14px;
        padding: 5px 0;
      }
      text {
        font-size: 15px;
        display: block;
        line-height: 25px;
        padding-bottom: 10px;
      }
    }

    .button-wrapper {
      display: flex;

      text {
        width: 50%;
        font-size: 14px;
        line-height: 54px;
        text-align: center;
        &:nth-of-type(1) {
          color: red;
        }
      }
    }
  }
}
</style>