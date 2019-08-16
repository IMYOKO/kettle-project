<template>
  <view class="device">
    <view class="ad-wrapper">
      <image src="http://zb.haopengit.com/fileUpload/20190814/07a96d16-672d-4bf6-b1b7-82a50fd964df.jpg" />
    </view>
    <DeviceList :deviceItem='deviceItem' />
  </view>
</template>

<script>
import { mapState } from 'vuex'
import DeviceList from '../component/deviceList'
export default {
  data() {
    return {
      deviceItem: []
    }
  },
  onShow() {
    this.queryDevice()
  },
  computed: {
    ...mapState(['userid'])
  },
  methods: {
    async queryDevice() {
      const data = await this.$server.queryDevice({userid: this.userid})
      this.$server.resultCallback(
        data,
        (data) => {
          this.deviceItem = data.deviceItem
        }
      )
    }
  },
  components: {
    DeviceList
  }
}
</script>

<style lang="less" scoped>
.device {
  padding: 10px 10px;
  .ad-wrapper {
    height: 240upx;
    border-radius: 20px;
    overflow: hidden;
    margin: 0 5px 10px;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
