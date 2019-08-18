<template>
  <view class="device">
    <view class="ad-wrapper" v-if="img_url">
      <image :src="img_url" />
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
      img_path: '',
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
          this.img_path = data.img_path
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
    height: 350upx;
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
