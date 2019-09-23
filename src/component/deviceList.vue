<template>
  <view class="devices">
    <ul class="device-list" v-if="deviceItem.length > 0">
      <li v-for="(item, index) in deviceItem" :key='index'>
        <view class="device-item" @click="goDeviceInfor(item)" @longpress='showFx(item)'>
          <!-- <view class="normal" v-if="item.status === '0'"></view>
          <view class="worker" v-if="item.status === '1'"></view>
          <view class="out-line" v-if="item.status === '2'"></view> -->
          <view class="worker-type status-0" v-if="item.status === '0'">空闲</view>
          <view class="worker-type status-1" v-if="item.status === '1' || item.status === '3' || item.status === '4'">工作中</view>
          <view class="worker-type status-2" v-if="item.status === '2'">离线</view>
          <view class="img-box">
            <image :src='item.devicelogo' :class="{'outline': item.status === '2'}" />
          </view>
          <view class="name" :class="{'outline': item.status === '2'}">{{item.devicename}}</view>
        </view>
      </li>
      <li>
        <view class="device-item" @click="addDevice">
          <view class="add-box">
            <view class="add">+</view>
          </view>
          <view class="name">新增设备</view>
        </view>
      </li>
    </ul>
    <view class="no-device-list" v-else>
      <view class="add-box" @click="addDevice">
        <view class="add">+</view>
      </view>
      <view class="name">新增设备</view>
    </view>

    <!-- 分享 start -->
    <Share v-if="shareType" :where='where' :deviceItemItem='deviceItemItem' />
    <!-- 分享 end -->
  </view>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import Share from './share'
export default {
  props: {
    where: String,
    deviceItem: Array
  },
  data () {
    return {
      deviceItemItem: {
        deviceid: null,
        devicemac: '',
        devicename: '',
        devicelogo: '',
        status: null, // 设备状态  0空闲  1工作中  2离线 3保温中 4保温暂停
        is_zhu: null, // 是否是主用户  0否  1是   主用户可以删除子用户、分享给用户、编辑设备。为0则无权限
      }
    }
  },
  computed: {
    ...mapState(['userid', 'shareType'])
  },
  methods: {
    ...mapMutations(['setShareType']),
    goDeviceInfor (item) {
      this.$CommonJs.pathTo('/device/deviceItem?deviceid=' + item.deviceid + '&title=' + item.devicename)
    },
    addDevice () {
      this.$CommonJs.pathTo('/device/add')
    },
    showFx (item) {
      this.setShareType(true)
      this.deviceItemItem = Object.assign({}, this.deviceItemItem, item)
      console.log(this.deviceItemItem)
    }
  },
  components: {
    Share
  }
}
</script>

<style lang="less" scoped>
.devices {
  .no-device-list {
    background: #fff;
    padding: 30px 0;
    border-radius: 20px;
    .add-box {
      height: 60px;
      display: flex;
      justify-content: center;
      .add {
        width: 50px;
        height: 50px;
        color: #fff;
        font-size: 30px;
        line-height: 45px;
        text-align: center;
        background: #ffb170;
        border-radius: 30px;
        align-self: center;
        box-shadow: 0 2px 5px rgba(0, 0, 0, .3);
      }
    }
    .name {
      margin-top: 5px;
      height: 20px;
      line-height: 20px;
      font-size: 16px;
      color: #333;
      text-align: center;
    }
  }

  .device-list {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 33.33%;

      @media screen and (max-width: 320px) {
        width: 50%;
      }
      .device-item {
        margin: 0 5px 10px;
        background: #fff;
        border-radius: 20px;
        padding: 15px 5px;
        position: relative;
        overflow: hidden;

        .worker-type {
          position: absolute;
          right: 10px;
          top: 5px;
          z-index: 10;
          font-size: 10px;

          &.status-0 {
            color: rgb(1, 216, 48);
          }
          &.status-1 {
            color: rgb(231, 10, 10);
          }
          &.status-2 {
            color: rgb(196, 196, 196);
          }
        }

        .worker,
        .normal,
        .out-line {
          position: absolute;
          right: 10px;
          top: 10px;
          width: 10px;
          height: 10px;
          z-index: 10;
          border-radius: 10px;
          background: rgb(231, 10, 10);

          &.out-line {
            background: rgb(196, 196, 196);
          }
          &.normal {
            background: rgb(1, 216, 48);
          }
        }
        .img-box {
          height: 60px;
          text-align: center;
          image {
            display: inline-block;
            width: 60px;
            height: 60px;

            &.outline {
              filter: grayscale(100%);
            }
          }
        }
        .add-box {
          height: 60px;
          display: flex;
          justify-content: center;
          .add {
            width: 50px;
            height: 50px;
            color: #fff;
            font-size: 30px;
            line-height: 45px;
            text-align: center;
            background: #ffb170;
            border-radius: 30px;
            align-self: center;
            box-shadow: 0 2px 5px rgba(0, 0, 0, .3);
          }
        }
        .name {
          margin-top: 5px;
          height: 20px;
          line-height: 20px;
          font-size: 16px;
          color: #333;
          text-align: center;

          &.outline {
            color: #999;
          }
        }
      }
    }
  }
}
</style>
