<template>
  <view class="add-device">
    <ul class="from">
      <li>
        <input type="text" class="code" v-model="mac" placeholder="请输入设备码">
        <view class="get-code" @click="getScanCode">
          <image src='../static/image/scan.png' />
        </view>
      </li>
    </ul>
    <view class="button-wrapper">
     <view class="button" @click="sumbit">确定</view>
    </view>

    <view class="scan-wrapper">
      <view class="scan-box">
        <view class="scan-botton">
          <view class="scan-inner" @click="startLocalServiceDiscovery">
            扫描附近设备
          </view>
        </view>
      </view>
    </view>

    <view class="device">
      <h3>已发现设备</h3>
      <ul class="device-list" v-if="deviceList.length > 0">
        <li v-for="(item, index) in deviceList" :key="index" @click="connectDevice(item.serviceName)">
          <text>{{item.serviceName}}</text>
        </li>
      </ul>
    </view>

    <view class="d-bg" v-if="isStartLocalServiceDiscovery"></view>
  </view>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      mac: '',
      deviceList: [],
      timer: null,
      count: 0,
      isStartLocalServiceDiscovery: false
    }
  },
  computed: {
    ...mapState(['userid'])
  },
  onLoad () {
    uni.showModal({
      content: "请确认设备配网完成，并确保手机与设备是连接到同一路由器！",
      confirmText: "下一步",
      cancelText: "取消",
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击下一步');
        } else if (res.cancel) {
          console.log('用户点击取消');
          uni.navigateBack({})
        }
      }
    })
  },
  onUnload () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    getScanCode () {
      const _this = this
      uni.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          // console.log('条码类型：' + res.scanType);
          // console.log('条码内容：' + res.result);
          this.mac = res.result
        }
      });
    },
    async sumbit () {
      if (this.mac == '') {
        this.$CommonJs.showToast('请输入设备码！')
        return false
      }
      uni.showLoading({
        title: '设备添加中，请等待...'
      });
      const data = await this.$server.addDevice({userid: this.userid, mac: this.mac})
      uni.hideLoading();
      this.$server.resultCallback(data,
			(data) => {
        this.$CommonJs.showToast('添加成功！')
        setTimeout(() => {
          uni.navigateBack()
        }, 500)
			})
    },
    connectDevice (mac) {
      uni.showModal({
        content: "确认添加此设备？",
        confirmText: "确认",
        cancelText: "取消",
        success: (res) => {
          if (res.confirm) {
            this.mac = mac
             this.sumbit()
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
    },
    // mDns 
    startLocalServiceDiscovery () {
      //#ifdef MP-WEIXIN
      if (this.isStartLocalServiceDiscovery) {
        uni.showLoading({
          title: '扫描中，请等待...'
        });
        return
      }
      uni.showLoading({
        title: '扫描中，请等待...'
      });
      this.isStartLocalServiceDiscovery = true
      this.deviceList = []
      clearInterval(this.timer)
      console.log('列表清除： ', this.deviceList)
      this.timer = setInterval(() => {
        this.count ++ 
        if (this.count >= 10) {
          clearInterval(this.timer)
          this.count = 0
          this.isStartLocalServiceDiscovery = false
          uni.hideLoading();
          wx.stopLocalServiceDiscovery({
            success: () => {
              console.log('停止 dns 扫描成功。')
              console.log('停止 dns 扫描成功： ', this.deviceList)
            },
            fail: () => {
              console.log('停止 dns 扫描失败。')
              console.log('停止 dns 扫描成功： ', this.deviceList)
            }
          })
        }
      }, 1000)
      wx.startLocalServiceDiscovery({
        // 当前手机所连的局域网下有一个 _kettle._tcp 类型的服务
        serviceType: '_kettle._tcp',
        success: () => {
          // this.startLSD = true
          console.log('startLocalServiceDiscovery success')
          wx.onLocalServiceFound((res)=> {
            console.log('mDNS 服务发现的事件的回调: ', res)
            if (res.serviceName && res.serviceName.length === 12) {
              let hasService = false
              this.deviceList.map(item => {
                if (item.serviceName == res.serviceName) {
                  hasService = true
                }
              })
              if (!hasService) {
                this.deviceList.push(res)
              }
              console.log('deviceList: ', this.deviceList)
            }
          })
        },
        fail: () => {
          this.$CommonJs.showToast('startLocalServiceDiscovery失败！')
          console.log('startLocalServiceDiscovery失败: ')
        }
      })
      //#endif
    }
  }
}
</script>

<style lang="less" scoped>
.add-device {
  padding: 20px 20px;

  .d-bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background: rgba(0, 0, 0, .2);
  }

  .button-wrapper {
    padding-top: 30%;
    display: flex;
    justify-content: center;
    .button {
      width: 80%;
      height: 44px;
      line-height: 44px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      border-radius: 22px;
      background: #7993b7;
    }
  }

  .from {
    li {
      height: 50px;
      position: relative;
      border-bottom: 1px solid #b3b3b3;

      input {
        position: absolute;
        left: 0;
        bottom: 0px;
        width: 100%;
        padding: 8px 0;
        font-size: 16px;
        color: #333;

        &.code {
          width: 60%;
        }
      }

      .get-code {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 10;
        width: 30px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-weight: bold;
        color: #f9b073;
        line-height: 40px;
        text-align: center;
        image {
          margin-top: 5px;
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  .scan-wrapper {
    padding:  40px 0;

    .scan-box {
      display: flex;
      justify-content: center;

      .scan-botton {
        width: 100px;
        height: 100px;
        border-radius: 100px;
        text-align: center;
        line-height: 100px;
        padding: 5px;
        border: 1px solid #7993b7;

        .scan-inner {
          font-size: 12px;
          color: #fff;
          border-radius: 100px;
          background: #7993b7;
        }
      }
    }
  }

  .device {
    background: #e6e5ea;
    border-radius: 5px;

    h3 {
      height: 64px;
      line-height: 64px;
      color: #7993b7;
      font-size: 15px;
      text-align: center;
      border-bottom: 1px solid #fff;
    }
    .device-list {
      li {
        padding: 0 15px;
        height: 44px;
        line-height: 44px;
        border-bottom: 1px solid #fff;
        &:last-child {
          border-bottom: none;
        }
        display: flex;
        justify-content: space-between;
        text {
          font-size: 14px;
          color: #333;
          &:last-of-type {
            color: #999;
          }
        }
      }
    }
  }
}
</style>
