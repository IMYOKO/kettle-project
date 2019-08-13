<template>
  <view class="device-detail">

    <ul class="device-list">
      <li v-for="(item, index) in deviceInfoItem" :key="index" @click="goDevicePage(item)">
        <view class="device-item">
          <view class="item">
            <view class="img-box">
              <image :src='item.modellogo' />
            </view>
            <view class="name">{{item.modelname}}</view>
          </view>
        </view>
      </li>
      <!-- <li>
        <view class="device-item">
          <view class="item">
            <view class="img-box">
              <image src='../static/image/shuihu_01@2x.png' />
            </view>
            <view class="name">水壶一</view>
          </view>
        </view>
      </li> -->
    </ul>

    <!-- <view class="more-device">更多模式</view> -->
    <!-- <ul class="shebei-list">
      <li>
        <view class="item clearfix">
          <view class="icon icon-01"></view>
          <view class="text">功能1</view>
          <view class="next"></view>
        </view>
      </li>
      <li>
        <view class="item clearfix">
          <view class="icon icon-02"></view>
          <view class="text">功能1</view>
          <view class="next"></view>
        </view>
      </li>
      <li>
        <view class="item clearfix">
          <view class="icon icon-03"></view>
          <view class="text">功能1</view>
          <view class="next"></view>
        </view>
      </li>
    </ul> -->

    <view class="contact" @click="setCodeType(true)"></view>
    <Code v-if="showCodePop" :kf_img='kf_img' :kf_mobile='kf_mobile' />
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Code from '../component/code'
export default {
  data () {
    return {
      deviceInfoItem: [],
      kf_mobile: '',
      kf_img: '',
      deviceid: null
    }
  },
  onLoad(option) {
    this.deviceid = option.deviceid
    this.queryDeviceInfo({userid: this.userid, deviceid: option.deviceid})
  },
  computed: {
    ...mapState(['showCodePop', 'userid', 'setDeviceInfoItems'])
  },
  methods: {
    ...mapMutations(['setCodeType']),
    async queryDeviceInfo (prams) {
      const data = await this.$server.queryDeviceInfo(prams)
      this.$server.resultCallback(
				data,
				(data) => {
					this.deviceInfoItem = data.deviceInfoItem
					this.kf_img = data.kf_img
					this.kf_mobile = data.kf_mobile
				}
			)
    },
    goDevicePage (item) {
      this.$CommonJs.pathTo('/device/deviceInfor?modelid' + item.modelid)
      const payload = {
        deviceid: this.deviceid,
        modelid: item.modelid,
        peifang: item.deviceid,
      }
      this.setDeviceInfoItems(payload)
    }
  },
  components: {
    Code
  }
}
</script>

<style lang="less" scoped>
.device-detail {
  padding: 15px 20upx;

  .contact {
    width: 44px;
    height: 44px;
    position: fixed;
    right: 15px;
    bottom: 15px;
    z-index: 100;
    background: url('../static/image/help@2x.png') center center no-repeat;
    background-size: contain;
  }

  .device-list {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 50%;

      &:nth-of-type(1n) {
        .device-item {
          background: #ff709c;
        }
      }
      &:nth-of-type(2n) {
        .device-item {
          background: #ffb170;
        }
      }
      &:nth-of-type(3n) {
        .device-item {
          background: #70e7ab;
        }
      }
      &:nth-of-type(4n) {
        .device-item {
          background: #b9d36b;
        }
      }
      &:nth-of-type(5n) {
        .device-item {
          background: #5cbfed;
        }
      }
      &:nth-of-type(6n) {
        .device-item {
          background: #da75de;
        }
      }
      .device-item {
        margin: 0 5px 10px;
        border-radius: 20px;
        padding: 0 5px;
        height: 345upx;
        display: flex;
        align-items: center;
        justify-content: center;
        .img-box {
          height: 60px;
          text-align: center;
          image {
            display: inline-block;
            width: 50px;
            height: 60px;
          }
        }
        .name {
          margin-top: 5px;
          height: 24px;
          line-height: 24px;
          font-size: 16px;
          color: #fff;
          text-align: center;
        }
      }
    }
  }

  .more-device {
    margin-top: 10px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #333;
  }

  .shebei-list {
    border-top: 1px solid #ddd;
    li {
      border-bottom: 1px solid #ddd;
      .item {
        height: 68px;
        line-height: 68px;
        padding: 0 10px;
        .icon {
          float: left;
          width: 44px;
          height: 44px;
          margin-top: 12px;
          &-01 {
            background: url('../static/image/shebei@2x.png') center center no-repeat;
            background-size: contain;
          }
          &-02 {
            background: url('../static/image/yuyue@2x.png') center center no-repeat;
            background-size: contain;
          }
          &-03 {
            background: url('../static/image/help@2x.png') center center no-repeat;
            background-size: contain;
          }
        }
        .text {
          font-size: 18px;
          margin-left: 20px;
          float: left;
        }

        .next {
          width: 24px;
          height: 24px;
          float: right;
          margin-top: 23px;
          background: url('../static/image/zx_more@2x.png') center center no-repeat;
          background-size: contain;
        }
      }
    }
  }
}
</style>
