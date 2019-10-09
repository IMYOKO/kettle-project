<template>
  <view class="devices">
    <view class="has-devices">
      <view class="top-box">
        <h3>{{yy_modelname}}</h3>
        <!-- <h3>{{status === '1' ? '停止工作？' : status === '3' || status === '4' ? '停止保温？' : ''}}</h3> -->
        <h1>{{wendu}}</h1>
        <h5> </h5>
        <h5 class="mt-180">{{status === '1' ? '剩余' : status === '3' || status === '4' ? '保温' : ''}}</h5>
        <h1>{{over_time}}分钟</h1>
      </view>
      <view class="bottom-box">
        <view class="quxiao">
          <view class="quxiao-inner" @click="setStopWorkeType(true)">停止</view>
        </view>
      </view>

      <StopWorke v-if="showStopWorke" where='deviceInfo' :deviceid='deviceid' :device_status="status" />
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import StopWorke from '../component/stopWorke'


export default {
  data () {
    return {
      status: -1,
      deviceid: null,
      over_time: '',
      yy_modelname: '',
      wendu: null,
      timer: null
    }
  },
  onLoad (option) {
    console.log(option)
    this.status = option.status
    this.deviceid = option.deviceid
    this.over_time = option.over_time
    this.wendu = option.wendu
    this.yy_modelname = option.yy_modelname
  },
  onUnload () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  computed: {
    ...mapState(['userid', 'showStopWorke'])
  },
  methods: {
    ...mapMutations(['setStopWorkeType'])
  },
  components: {
    StopWorke
  }
}
</script>

<style lang="less" scoped>
.has-devices {
  min-height: 100vh;
  background: #fff;
  text-align: center;
  .top-box {
    padding: 20px 0px 18%;
    background: #feb070;
  }
  .bottom-box {
    padding: 40px 0;
    display: flex;
    justify-content: center;
    .quxiao {
      width: 120px;
      height: 120px;
      border-radius: 120px;
      text-align: center;
      line-height: 120px;
      padding: 5px;
      border: 1px solid #feb070;

      .quxiao-inner {
        font-size: 30px;
        color: #fff;
        border-radius: 120px;
        background: #feb070;
      }
    }
  }
  h3 {
    color: #000;
    font-size: 15px;
    line-height: 25px;
  }
  h5 {
    color: #333;
    font-size: 12px;
    line-height: 25px;
    &.mt-180 {
      margin-top: 18%;
    }
  }
  h1 {
    color: #fff;
    font-size: 88upx;
    line-height: 70px;
    font-weight: 600;
    letter-spacing: 8px;
  }
}
.devices-infor {
  padding: 15px;

  .ad-wrapper {
    height: 350upx;
    border-radius: 20px;
    overflow: hidden;
    margin: 0 0 15px 0;
    image {
      width: 100%;
      height: 100%;
    }
  }

  .caipu-title {
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 5px;
    border-bottom: 1px solid #dedede;
  }

  .caipu-content {
    font-size: 14px;
    line-height: 24px;
    color: #666;
    padding-top: 4px;
    padding-bottom: 20px;
    border-bottom: 1px solid #dedede;
  }

  .infor-wrapper {
    padding: 30px 0;
    .baowen {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #333;
      display: flex;
      justify-content: space-between;
    }
    .time-wrapper {
      li {
        margin-bottom: 20px;
      }
      padding-top: 10px;
      .time {
        color: #666;
        font-size: 13px;
        line-height: 20px;

        .span {
          color: #ffb170;
          margin: 0 10px;
        }

        .em {
          font-size: 12px;
        }
      }

      .text {
        color: #999;
        display: flex;
        font-size: 12px;
        line-height: 20px;
        justify-content: space-between;
      }
    }
    .button {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      &-wrapper {
        width: 80%;
        display: flex;
        height: 44px;
        line-height: 44px;
        border-radius: 44px;
        border: 1px solid #7993b7;
        text {
          color: #7993b7;
          flex: 1;
          text-align: center;
          font-size: 15px;
          border-left: 1px solid #7993b7;
          &:nth-of-type(1) {
            border-left: none;
          }
        }
      }
    }
  }

  .yuyue-pop {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    .time-select {
      width: 80%;
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 100;
      transform: translate(-50%, -50%);
      border-radius: 10px;
      padding: 10px 20upx;
      background: #fff;

      h2 {
        font-size: 16px;
        line-height: 36px;
        text-align: center;
        margin-bottom: 20px;
      }

      .times {
        display: flex;
        font-size: 16px;
        line-height: 44px;
        justify-content: space-around;
        border-bottom: 1px solid #dedede;
        border-top: 1px solid #dedede;
      }
      .button-box {
        display: flex;
        margin: 30px 0 10px;
        justify-content: center;
        text {
          height: 44px;
          font-size: 15px;
          color: #fff;
          line-height: 44px;
          border-radius: 44px;
          text-align: center;
          background: #7993b7;
          width: 80%;
        }
      }
    }
    .bg {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
      background: rgba(0, 0, 0, .6);
    }
  }
  
}
</style>