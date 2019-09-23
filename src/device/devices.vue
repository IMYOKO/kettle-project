<template>
  <view class="device">
    <view class="ad-wrapper" v-if="img_path" @click="goWebView(img_url)">
      <image :src="img_path" />
    </view>
    <DeviceList :deviceItem='deviceItem' where='device' />
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import DeviceList from '../component/deviceList'
export default {
  data() {
    return {
      img_path: '',
      img_url: '',
      deviceItem: []
    }
  },
  onShow() {
    console.log('=====> 我的设备页面刷新')
    this.setUpDateFn(this.queryDevice)
    this.queryDevice()
  },
  onHide() {
    this.setUpDateFn(null)
  },
  computed: {
    ...mapState(['userid'])
  },
  methods: {
    ...mapMutations(['setUpDateFn']),
    goWebView (url) {
      if (url != '') {
        this.$CommonJs.pathTo('/infor/webView?url=' + url)
      }
		},
    async queryDevice() {
      uni.showLoading({
        title: '请求中...'
      });
      const data = await this.$server.queryDevice({userid: this.userid})
      uni.hideLoading();
      this.$server.resultCallback(
        data,
        (data) => {
          console.log('=====> 我的设备数据请求成功！')
					console.log(data)
          this.deviceItem = data.deviceItem
          this.img_path = data.img_path
          this.img_url = data.img_url
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
