<template>
  <view class="device">
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
}
</style>
