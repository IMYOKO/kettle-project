<template>
  <view class="devices">
    <view class="has-devices" v-if="isYuyue">
      <view class="top-box">
        <h3>{{yuyueInfor.yy_modelname}}</h3>
        <h5>{{yuyueInfor.yy_status === '0' ? '预约' : yuyueInfor.yy_status === '1' ? '进行' : ''}}中</h5>
        <h5 class="mt-180">您已预约 {{yuyueInfor.yy_overtime}} {{yuyueInfor.yy_status === '0' ? '进行' : yuyueInfor.yy_status === '1' ? '完成' : ''}}烹饪</h5>
        <h1>{{syTime}}</h1>
      </view>
      <view class="bottom-box">
        <view class="quxiao">
          <view class="quxiao-inner" @click="setCancelPopType(true)">取消</view>
        </view>
      </view>

      <CancelPop v-if="showCancelPop" where='deviceInfo' :modelid='deviceInfoItems.modelid' :deviceid='deviceInfoItems.deviceid' />
    </view>
    <view class="devices-infor" v-else>
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
            <view class="time">保温时长 <text class="span">{{shichang}}分钟</text><text class="em"></text></view>
            <slider class="slider-wen" :value="shichang" @change="sliderChangeSC" min="0" max="120" />
            <view class="text">
              <text>0分钟</text>
              <text>120分钟</text>
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
            <text @click="yuyueFn">预约</text>
            <text @click="kaishi">开始</text>
          </view>
        </view>
        <view class="button" v-else>
          <view class="button-wrapper" @click="overDeviceYy">
            <text>停止工作</text>
          </view>
        </view>
      </view>

      <!-- 预约弹窗 新版 -->
      <!-- <view class="yuyue-pop" v-if='showPop'>
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
      </view> -->
      <!-- 预约弹窗 新版 -->

      <!-- 预约弹窗 旧版 -->
      <!-- <view class="yuyue-pop" v-if='false'>
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
      </view> -->
      <!-- 预约弹窗 旧版 -->

      <!-- 预约弹窗 第三版 -->
      <view class="yuyue-pop" v-if='showPop'>
        <view class="time-select">
          <h2>选择时间</h2>
          <view class="times">
            <!-- <view class="date-cel">
              <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
                <view class="uni-input">{{date}}</view>
              </picker>
            </view> -->
            <view class="date-cel">
              <picker @change="bindPickerChangedanxuan" :value="shijianindex" :range="shijian">
                <view class="uni-input">{{shijian[shijianindex]}}</view>
              </picker>
            </view>
            <!-- <view class="date-cel">
              <picker mode="time" :value="time" start="00:00" end="23:59" @change="bindTimeChange">
                <view class="uni-input">{{time}}:00</view>
              </picker>
            </view> -->
            <view class="date-cel">
              <!-- <picker mode="multiSelector" :value="time" start="00:00" end="23:59" @change="bindTimeChange">
                <view class="uni-input">{{time}}:00</view>
              </picker> -->
              <picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
                <view class="uni-input">{{multiArray[0][multiIndex[0]]}}:{{multiArray[1][multiIndex[1]]}}:00</view>
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
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import CancelPop from '../component/cancel'
function getDate(type) {
  const date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  // let hour = date.getHours();
  // let minute = Number.parseInt(date.getMinutes() / 10);
  // console.log(hour, minute)

  if (type === 'start') {
    year = year - 60;
  } else if (type === 'end') {
    year = year + 2;
  }
  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;

  return `${year}-${month}-${day}`;
}
let hours = []
let minutes = []
for (let index = 0; index < 24; index++) {
  if (index < 10) index = `0${index}`
  hours.push(`${index}`)
}
for (let index = 0; index < 6; index++) {
  minutes.push(`${index}0`)
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
      shichang: 60,
      wendu: 80,
      timeArray: ['10分钟', '20分钟', '30分钟', '40分钟', '50分钟', '60分钟', '70分钟', '80分钟', '90分钟', '100分钟', '110分钟', '120分钟'],
      timeIndex: 0,
      multiArray: [
        hours,
        minutes
      ],
      multiIndex: [0, 0],
      shijian: ['今天', '明天'],
      shijianindex: 0,
      isYuyue: false,
      timer: null,
      syTime: '00:00:00'
    }
  },
  onLoad (option) {
    console.log('页面参数=====>', option)
    console.log('预约参数=====>', this.yuyueInfor)
    this.status = option.status
    if (this.deviceInfoItems.status === '1') {
      this.showButton = false
    }
    if (this.yuyueInfor.yy_modelid) {
      this.isYuyue = true
      this.timer = setInterval(() => {
        this.getTimer(this.yuyueInfor.yy_overtime, this.yuyueInfor.yy_status)
      }, 1000)
      this.getTimer(this.yuyueInfor.yy_overtime, this.yuyueInfor.yy_status)
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
    this.setYuyueInfor({
      yy_modelid: null,
      yy_modelname: "",
      yy_overtime: "",
      yy_status: ""
    })
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  computed: {
    ...mapState(['userid', 'deviceInfoItems', 'showCancelPop', 'yuyueInfor'])
  },
  methods: {
    ...mapMutations(['setDeviceInfoItems', 'setCancelPopType', 'setYuyueInfor']),
    async overDeviceYy () {
      const prams = {
        userid: this.userid,
        deviceid: this.deviceInfoItems.deviceid,
        modelid: 0
      }
      const data = await this.$server.overDeviceYy(prams)
      this.$server.resultCallback(
				data,
				(data) => {
          this.$CommonJs.showToast('操作成功！')
          this.setCancelPopType(false)
          uni.navigateBack({})
				}
			)
    },
    getTimer (overTime, status) {
      // 预约工作状态:0待进行，1进行中（进行中要计算进行了多久，待进行要计算还要多长时间才开始工作
      const nowTime = new Date().getTime()
      let overTimes = overTime.substring(0, 19).replace(/-/g,'/');
          overTimes = new Date(overTimes).getTime();

      let xcTimestamp
      if (status === '0') {
        xcTimestamp = overTimes - nowTime
      } else {
        xcTimestamp = nowTime - overTimes
      }
      // console.log(nowTime, overTimes, xcTimestamp)

      // xcTimestamp <= 0 表示预约时间到了
      if (xcTimestamp <= 0 && status === '0') {
        console.log('已经过了时间。')
        this.$CommonJs.showToast('时间到！')
        // this.isYuyue = false
        this.syTime = '00:00:00'
        if (this.timer) {
          clearInterval(this.timer)
        }
      } else {
        let day = Number.parseInt(xcTimestamp / ( 24 * 60 * 60 * 1000 ))
        let hour = Number.parseInt(xcTimestamp / ( 60 * 60 * 1000 ) % 24)
            hour < 10 ? hour = '0' + hour : hour
        let minute = Math.floor(xcTimestamp / ( 60 * 1000 ) % 60)
            minute < 10 ? minute = '0' + minute : minute
        let second = Math.floor(xcTimestamp / ( 1000 ) % 60)
            second < 10 ? second = '0' + second : second
            // console.log(day, hour, minute, second)
        if (day > 0) {
          this.syTime = `${day}:${hour}:${minute}:${second}`
          return
        }
        this.syTime = `${hour}:${minute}:${second}`
      }
    },
    yuyueFn () {
      this.showPop = true
      const nowData = new Date().getTime() + 10 * 60 * 1000
      const date = new Date(nowData);
      let hour = date.getHours();
      let minute = Number.parseInt(date.getMinutes() / 10);
      // console.log(nowData, date, hour, minute)
      let multiIndex = [hour, minute]
      this.multiIndex = multiIndex
    },
    bindPickerChangedanxuan (e) {
      console.log('picker发送选择改变，携带值为：' + e.target.value)
      this.shijianindex = e.target.value
    },
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
    bindMultiPickerColumnChange (e) {
      console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
      this.multiIndex[e.detail.column] = e.detail.value
      this.$forceUpdate()
    },
    async saveJobTime (type) {
      let prams = {
        type,
        userid: this.userid,
        deviceid: Number(this.deviceInfoItems.deviceid),
        modelid: this.deviceInfoItems.modelid,
        // time: type === 0 ? this.date + ' ' + this.time + ':00' : '',
        // time: type === 0 ? this.date + ' ' + this.multiArray[0][this.multiIndex[0]] + ':' + this.multiArray[1][this.multiIndex[1]] + ':00' : '',
        shichang: this.shichang,
        wendu: this.wendu
      }

      // 今天明天时间判断
      if (type === 0) {
        let timestamp = Number.parseInt(new Date().getTime())
        if (this.shijianindex === 0) {
          prams.time = this.$CommonJs.timestampToTime(timestamp, false, 'YMD') + this.multiArray[0][this.multiIndex[0]] + ':' + this.multiArray[1][this.multiIndex[1]] + ':00'
        } else {
          let timestamp_Tm = timestamp + 24 * 60 * 60 * 1000
          prams.time = this.$CommonJs.timestampToTime(timestamp_Tm, false, 'YMD') + this.multiArray[0][this.multiIndex[0]] + ':' + this.multiArray[1][this.multiIndex[1]] + ':00'
        }
        let dates = prams.time.substring(0, 19).replace(/-/g,'/');
        const formTime = new Date(dates).getTime()
        console.log('当前日期： ', prams.time)
        console.log('当前时间： ', timestamp)
        console.log('预约时间： ', formTime)
        console.log('预约时间是否小于当前时间： ', formTime < timestamp)
        if (formTime < timestamp) {
          this.$CommonJs.showToast('预约时间要大于当前时间！')
          return false
        }
      } else {
        prams.time = ''
      }

      // 旧的10分钟的实现方式
      // if (type === 0) {
      //   const yuyuetime = Number.parseInt(this.timeArray[this.timeIndex])
      //   const timestamp = Number.parseInt(new Date().getTime()) + 60 * 1000 * yuyuetime
      //   prams.time = this.$CommonJs.timestampToTime(timestamp)
      //   console.log(yuyuetime)
      // } else {
      //   prams.time = ''
      // }

      // console.log(prams)
      // return false

      const data =  await this.$server.saveJobTime(prams)
      this.$server.resultCallback(
				data,
				(data) => {
          this.$CommonJs.showToast('操作成功！')
          setTimeout(()=>{
            uni.navigateBack({})
          }, 1000)
          // this.setDeviceInfoItems({ status: '1' })
				}
			)
    },
    kaishi () {
      uni.showModal({
        content: "请注意使用环境安全，避免不安全因素，再开始！",
        confirmText: "确定",
        cancelText: "取消",
        success: (res) => {
          if (res.confirm) {
            this.saveJobTime(1)
            console.log('用户点击确定');
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
        }
      })
		}
  },
  components: {
    CancelPop
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