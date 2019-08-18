<template>
  <view class="devices-infor">
    <view class="ad-wrapper" v-if="deviceInfoItems.img_path">
      <image :src="deviceInfoItems.img_path" />
    </view>
    <view class="caipu-title">查看菜谱</view>
    <view class="caipu-content">
      {{deviceInfoItems.peifang}}
    </view>
    <view class="infor-wrapper">
      <view class="baowen">
        <view class="title">保温</view>
        <switch class="swicth" :checked="baowen" @change="switchChange" />
      </view>
      <ul class="time-wrapper">
        <li>
          <view class="time">保温时长 <text class="span">{{shichang}}小时</text><text class="em"></text></view>
          <slider class="slider-wen" :value="shichang" @change="sliderChangeSC" min="0" max="12" />
          <view class="text">
            <text>0小时</text>
            <text>12小时</text>
          </view>
        </li>
        <li>
          <view class="time">保温温度 <text class="span">{{wendu}}℃</text><text class="em"></text></view>
          <slider class="slider-wen" :value="wendu" @change="sliderChangeWD" min="0" max="100" />
          <view class="text">
            <text>0℃</text>
            <text>100℃</text>
          </view>
        </li>
      </ul>
      <view class="button" v-if="showButton">
        <view class="button-wrapper">
          <text @click="showPop = true">预约</text>
          <text @click="saveJobTime(1)">确定</text>
        </view>
      </view>
      <view class="button" v-else>
        <view class="button-wrapper">
          <text>设备工作中...</text>
        </view>
      </view>
    </view>

    <!-- 预约弹窗 新版 -->
    <view class="yuyue-pop" v-if='showPop'>
      <view class="time-select">
        <h2>选择预约时间</h2>
        <view class="times">
          <view class="date-cel">
            <picker @change="bindPickerChange" :value="timeIndex" :range="timeArray">
              <view class="uni-input">{{timeArray[timeIndex]}}</view>
            </picker>
          </view>
        </view>
        <view class="button-box">
          <text @click="() => {showPop = false; saveJobTime(0)}" >确定预约</text>
        </view>
      </view>
      <view class="bg" @click="showPop = false"></view>
    </view>
    <!-- 预约弹窗 新版 -->

    <!-- 预约弹窗 旧版 -->
    <view class="yuyue-pop" v-if='false'>
      <view class="time-select">
        <h2>选择时间</h2>
        <view class="times">
          <view class="date-cel">
            <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
              <view class="uni-input">{{date}}</view>
            </picker>
          </view>
          <view class="date-cel">
            <picker mode="time" :value="time" start="00:00" end="23:59" @change="bindTimeChange">
              <view class="uni-input">{{time}}:00</view>
            </picker>
          </view>
        </view>
        <view class="button-box">
          <text @click="() => {showPop = false; saveJobTime(0)}" >确定预约</text>
        </view>
      </view>
      <view class="bg" @click="showPop = false"></view>
    </view>
    <!-- 预约弹窗 旧版 -->
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
function getDate(type) {
  const date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (type === 'start') {
    year = year - 60;
  } else if (type === 'end') {
    year = year + 2;
  }
  month = month > 9 ? month : '0' + month;;
  day = day > 9 ? day : '0' + day;

  return `${year}-${month}-${day}`;
}
export default {
  data () {
    return {
      showButton: true,
      showPop: false,
      baowen: true,
      date: getDate({
        format: true
      }),
      startDate: getDate('start'),
      endDate: getDate('end'),
      time: '06:00',
      shichang: 0,
      wendu: 0,
      timeArray: ['10分钟', '20分钟', '30分钟', '40分钟', '50分钟', '60分钟', '70分钟', '80分钟', '90分钟', '100分钟', '110分钟', '120分钟'],
      timeIndex: 0,
    }
  },
  onLoad (option) {
    this.status = option.status
    if (this.deviceInfoItems.status === '1') {
      this.showButton = false
    }
    uni.setNavigationBarTitle({
    　title: option.title
    })
  },
  onUnload () {
    this.setDeviceInfoItems({
      modelid: null,
      deviceid: null,
      peifang: '',
      img_path: '',
      status: null
    })
  },
  computed: {
    ...mapState(['userid', 'deviceInfoItems'])
  },
  methods: {
    ...mapMutations(['setDeviceInfoItems']),
    bindPickerChange: function(e) {
      console.log('picker发送选择改变，携带值为：' + e.target.value)
      this.timeIndex = e.target.value
    },
    sliderChangeSC(e) {
      this.shichang = e.detail.value
      // console.log('value 发生变化：' + e.detail.value)
    },
    sliderChangeWD(e) {
      this.wendu = e.detail.value
      // console.log('value 发生变化：' + e.detail.value)
    },
    switchChange (e) {
      this.baowen = e.target.value
      if (!this.baowen) {
        this.shichang = 0
        this.wendu = 0
      }
      // console.log('switch2 发生 change 事件，携带值为', e.target.value)
    },
    bindDateChange (e) {
      this.date = e.target.value
    },
    bindTimeChange (e) {
      this.time = e.target.value
    },
    async saveJobTime (type) {
      let prams = {
        type,
        userid: this.userid,
        deviceid: Number(this.deviceInfoItems.deviceid),
        modelid: this.deviceInfoItems.modelid,
        // time: type === 0 ? this.date + ' ' + this.time + ':00' : '',
        shichang: this.shichang,
        wendu: this.wendu
      }
      if (type === 0) {
        const yuyuetime = Number.parseInt(this.timeArray[this.timeIndex])
        const timestamp = Number.parseInt(new Date().getTime()) + 60 * 1000 * yuyuetime
        prams.time = this.$CommonJs.timestampToTime(timestamp)
        console.log(yuyuetime)
      } else {
        prams.time = ''
      }
      // console.log(prams)
      // return false
      const data =  await this.$server.saveJobTime(prams)
      this.$server.resultCallback(
				data,
				(data) => {
          this.$CommonJs.showToast('操作成功！')
          this.setDeviceInfoItems({ status: '1' })
				}
			)
    }
  }
}
</script>

<style lang="less" scoped>
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