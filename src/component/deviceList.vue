<template>
  <view class="devices">
    <ul class="device-list" v-if="deviceItem.length > 0">
      <li v-for="(item, index) in deviceItem" :key='index'>
        <view class="device-item" @click="goDeviceInfor(item)">
          <view class="img-box">
            <image :src='item.devicelogo' />
          </view>
          <view class="name">{{item.devicename}}</view>
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
  </view>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  props: {
    deviceItem: Array
  },
  data () {
    return {}
  },
  computed: {
    ...mapState(['userid'])
  },
  methods: {
    goDeviceInfor (item) {
      this.$CommonJs.pathTo('/device/deviceList?deviceid=' + item.deviceid + '&title=' + item.devicename)
    },
    addDevice () {
      this.$CommonJs.pathTo('/device/add')
    }
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
        .img-box {
          height: 60px;
          text-align: center;
          image {
            display: inline-block;
            width: 50px;
            height: 60px;
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
        }
      }
    }
  }
}
</style>
