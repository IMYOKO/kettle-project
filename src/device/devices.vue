<template>
  <view class="device">
    <DeviceList />
  </view>
</template>

<script>
import DeviceList from '../component/deviceList'
export default {
  mounted() {
    // this.getBanner()
  },
  methods: {
    // async getBanner() {
    //   const data = await this.$server.getBanner()
    //   this.$server.resultCallback(
    //     data,
    //     () => {}
    //   )
    // }
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
