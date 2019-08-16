<template>
  <view class="device-detail">
    <view class="ad-wrapper">
      <image src="http://zb.haopengit.com/fileUpload/20190814/07a96d16-672d-4bf6-b1b7-82a50fd964df.jpg" />
    </view>
    <ul class="device-list">
      <li v-for="(item, index) in deviceInfoItem" :key="index" @click="goDevicePage(item)" v-if='index <= 5'>
        <view class="device-item">
          <view class="item">
            <view class="img-box">
              <image :src='item.modellogo' />
            </view>
            <view class="name">{{item.modelname}}</view>
          </view>
        </view>
      </li>
    </ul>

    <view class="more-device" v-if='deviceInfoItem.length > 6'>更多模式</view>
    <ul class="shebei-list">
      <li v-for="(item, index) in deviceInfoItem" :key="index" @click="goDevicePage(item)" v-if='index > 5'>
        <view class="item clearfix">
          <view class="icon">
            <image :src='item.modellogo' />
          </view>
          <view class="text">{{item.modelname}}</view>
          <view class="next"></view>
        </view>
      </li>
      <!-- <li>
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
      </li> -->
    </ul>

    <!-- 客服 -->
    <view class="contact" @click="setCodeType(true)"></view>
    <!-- 固件 -->
    <view class="contact ota" v-if="have_newota === 1" @click="setOtaType(true)"></view>


    <Code v-if="showCodePop" :kf_img='kf_img' :kf_mobile='kf_mobile' />
    <Ota v-if="showOtaPop" :ota_name='ota_name' :ota_version='ota_version' :deviceid='deviceid' :ota_time='ota_time' :upOtaCallback='upOtaCallback' />
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Code from '../component/code'
import Ota from '../component/ota'
export default {
  data () {
    return {
      deviceInfoItem: [],
      kf_mobile: '',
      kf_img: '',
      have_newota: 1,
      ota_name: '',
      ota_version: '',
      ota_time: '',
      deviceid: null
    }
  },
  onLoad(option) {
    this.deviceid = option.deviceid
    this.queryDeviceInfo({userid: this.userid, deviceid: option.deviceid})
  },
  computed: {
    ...mapState(['showCodePop', 'showOtaPop', 'userid'])
  },
  methods: {
    ...mapMutations(['setCodeType', 'setOtaType', 'setDeviceInfoItems']),
    async queryDeviceInfo (prams) {
      const data = await this.$server.queryDeviceInfo(prams)
      this.$server.resultCallback(
				data,
				(data) => {
					this.deviceInfoItem = data.deviceInfoItem
					this.kf_img = data.kf_img
					this.kf_mobile = data.kf_mobile
					this.have_newota = data.have_newota
					this.ota_name = data.ota_name
					this.ota_version = data.ota_version
					this.ota_time = data.ota_time
				}
			)
    },
    goDevicePage (item) {
      this.$CommonJs.pathTo('/device/deviceInfor?modelid' + item.modelid)
      const payload = {
        deviceid: this.deviceid,
        modelid: item.modelid,
        peifang: item.peifang,
      }
      this.setDeviceInfoItems(payload)
    },
    upOtaCallback () {
      this.setOtaType(false)
      this.have_newota = 0
    }
  },
  components: {
    Code,
    Ota
  }
}
</script>

<style lang="less" scoped>
.device-detail {
  padding: 10px 20upx;

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

  .contact {
    width: 44px;
    height: 44px;
    position: fixed;
    right: 15px;
    bottom: 15px;
    z-index: 100;
    background: url('../static/image/help@2x.png') center center no-repeat;
    background-size: contain;

    &.ota {
      bottom: 80px;
    }
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
    padding-bottom: 50px;
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
          image {
            display: block;
            width: 44px;
            height: 44px;
          }
          // &-01 {
          //   background: url('../static/image/shebei@2x.png') center center no-repeat;
          //   background-size: contain;
          // }
          // &-02 {
          //   background: url('../static/image/yuyue@2x.png') center center no-repeat;
          //   background-size: contain;
          // }
          // &-03 {
          //   background: url('../static/image/help@2x.png') center center no-repeat;
          //   background-size: contain;
          // }
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
