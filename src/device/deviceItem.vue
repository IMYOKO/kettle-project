<template>
  <view class="device">
    <!-- 预约时间 start -->
    <view class="has-yuyue" v-if="yy_modelid">
      <view @click="goYuyueDevicepage(yy_modelid)">
        <h3>已预约</h3>
        <h4>{{yy_overtime}} {{yy_status === '0' ? '进行' : yy_status === '1' ? '完成' : ''}}烹饪</h4>
      </view>
      <button @click="setCancelPopType(true)">取消</button>

      <CancelPop v-if="showCancelPop" where='deviceItem' :modelid='yy_modelid' :deviceid='deviceid' @queryDeviceInfo='queryDeviceInfo' @cancelCallback='cancelCallback' />
    </view>
    <!-- 预约时间 end -->

    <!-- 工作中 start -->
    <view class="has-yuyue" v-if="device_status === 1 || device_status === 3 || device_status === 4">
    <!-- <view class="has-yuyue"> -->
      <view @click="goStop">
        <h3 v-if="device_status === 1">工作中</h3>
        <h3 v-if="device_status === 3 || device_status === 4">保温中</h3>

        <h4 v-if="device_status === 1">{{over_time}} 分钟完成</h4>
        <h4 v-if="device_status === 3">{{wendu}} ℃ | {{over_time}}分钟</h4>
        <h4 v-if="ddevice_status === 4">暂停中</h4>
      </view>
      <button @click="setStopWorkeType(true)">停止</button>

      <StopWorke v-if="showStopWorke" where='deviceItem' :deviceid='deviceid' :device_status="device_status"  @queryDeviceInfo='queryDeviceInfo' @cancelCallback='cancelCallback' />
    </view>
    <!-- 工作中 end -->

    <view class="device-detail">
      <ul class="device-list">
        <li v-for="(item, index) in deviceInfoItem" :key="index" @click="goDevicePage(item)" v-show='index <= 5'>
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
        <li v-for="(item, index) in deviceInfoItem" :key="index" @click="goDevicePage(item)" v-show='index > 5'>
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
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Code from '../component/code'
import Ota from '../component/ota'
import CancelPop from '../component/cancel'
import StopWorke from '../component/stopWorke'
export default {
  data () {
    return {
      deviceInfoItem: [],
      kf_mobile: '',
      kf_img: '',
      have_newota: 0,
      ota_name: '',
      ota_version: '',
      ota_time: '',
      wendu: null,
      over_time: '',
      device_status: -1, // 设备状态  0空闲  1工作中  2离线 3保温中 4保温暂停
      deviceid: null,
      yy_modelid: null,
      yy_modelname: "",
      yy_overtime: "",
      yy_status: "" // 预约工作状态:0待进行，1进行中（进行中要计算进行了多久，待进行要计算还要多长时间才开始工作
    }
  },
  onLoad(option) {
    this.deviceid = option.deviceid
    uni.setNavigationBarTitle({
    　title: option.title
    })
    // this.queryDeviceInfo({userid: this.userid, deviceid: option.deviceid})
  },
  onShow() {
    if (this.deviceid) {
      console.log('=====> 模式列表页刷新')
      this.queryDeviceInfo({userid: this.userid, deviceid: this.deviceid})
    }
  },
  computed: {
    ...mapState(['showCodePop', 'showOtaPop', 'userid', 'deviceInfoItems', 'showCancelPop', 'showStopWorke'])
  },
  methods: {
    ...mapMutations(['setCodeType', 'setOtaType', 'setDeviceInfoItems', 'setCancelPopType', 'setYuyueInfor', 'setStopWorkeType']),
    async queryDeviceInfo (prams) {
      uni.showLoading({
        title: '请求中...'
      });
      const data = await this.$server.queryDeviceInfo(prams)
      uni.hideLoading();
      this.$server.resultCallback(
				data,
				(data) => {
          console.log('=====> 模式列表数据请求成功！')
					console.log(data)
					this.deviceInfoItem = data.deviceInfoItem
					this.kf_img = data.kf_img
					this.kf_mobile = data.kf_mobile
					this.have_newota = data.have_newota
					this.ota_name = data.ota_name
					this.ota_version = data.ota_version
          this.ota_time = data.ota_time
          this.yy_modelid = data.yy_modelid
          this.yy_modelname = data.yy_modelname
          this.yy_overtime = data.yy_overtime
          this.yy_status = data.yy_status
          this.wendu = data.wendu
          this.over_time = data.over_time
          this.device_status = data.device_status
          if (this.yy_modelid) {
            const yuyueData = {
              yy_modelid: data.yy_modelid,
              yy_modelname: data.yy_modelname,
              yy_overtime: data.yy_overtime,
              yy_status: data.yy_status
            }
            this.setYuyueInfor(yuyueData)
            console.log('===> 预约数据', yuyueData)
          }
				}
			)
    },
    goStop () {
      this.$CommonJs.pathTo('/device/stop?status=' + this.device_status + '&deviceid=' + this.deviceid + '&wendu=' + this.wendu + '&over_time=' + this.over_time)
    },
    goYuyueDevicepage (modelid) {
      let item
      this.deviceInfoItem.map(value => {
        if (modelid === value.modelid) {
          item = value
        }
      })
      this.goDevicePage(item)
    },
    goDevicePage (item) {
      if (this.yy_modelid && this.yy_modelid !== item.modelid) {
        this.$CommonJs.showToast('当前设备已有预约！')
        return
      }
      if (this.device_status === 1 || this.device_status === 3 || this.device_status === 4) {
        this.$CommonJs.showToast('当前设备工作中！')
        return
      }
      if (this.device_status === 2) {
        this.$CommonJs.showToast('当前设备已离线！')
        return
      }
      this.$CommonJs.pathTo('/device/deviceInfor?modelid=' + item.modelid + '&title=' + item.modelname)
      const payload = {
        deviceid: this.deviceid,
        modelid: item.modelid,
        peifang: item.peifang,
        img_path: item.img_path,
        status: this.device_status
      }
      this.setDeviceInfoItems(payload)
    },
    upOtaCallback () {
      this.setOtaType(false)
      this.have_newota = 0
    },
    // 取消预约后
    cancelCallback () {
      this.yy_modelid = null
      this.yy_modelname = ""
      this.yy_overtime = ""
      this.yy_status = ""
      this.setYuyueInfor({
        yy_modelid: null,
        yy_modelname: "",
        yy_overtime: "",
        yy_status: ""
      })
    }
  },
  components: {
    Code,
    Ota,
    CancelPop,
    StopWorke
  }
}
</script>

<style lang="less" scoped>
.has-yuyue {
  background: #fff;
  padding: 10px 20px;
  border-top: 1px solid #f1f1f1;
  position: relative;
  h3, h4 {
    font-size: 15px;
    line-height: 25px;
    color: #666;
  }
  h4 {
    font-size: 13px;
    margin-top: 5px;
  }
  button {
    width: 60px;
    height: 25px;
    line-height: 25px;
    background: #ececee;
    color: #666;
    font-size: 13px;
    text-align: center;
    position: absolute;
    bottom: 12px;
    right: 30px;
    border: none;
    border-radius: 0;
    &::after {
      border: none;
    }
  }
}
.device-detail {
  padding: 10px 20upx;

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
      background: url('../static/image/gujian.png') center center no-repeat;
      background-size: contain;
      bottom: 74px;
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
        height: 300upx;
        display: flex;
        align-items: center;
        justify-content: center;
        .img-box {
          height: 60px;
          text-align: center;
          image {
            display: inline-block;
            width: 60px;
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
