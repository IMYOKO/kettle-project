<template>
  <view class="share">
    <view class="bg" @click="close"></view>
    <view class="share-wrapper"  v-if="active === 0">
      <view class="sharw-content">
        <ul>
          <li v-if="deviceItemItem.is_zhu==='1'">
            <view class="item" @click="showType(1)">
              <view class="image">
                <image src='../static/image/edital.png' />
              </view>
              <view class="title">重命名</view>
            </view>
          </li>
          <li v-if="deviceItemItem.is_zhu==='1'">
            <view class="item" @click="showType(3)">
              <view class="image">
                <image src='../static/image/share.png' />
              </view>
              <view class="title">分享</view>
            </view>
          </li>
          <li>
            <view class="item" @click="showType(2)">
              <view class="image">
                <image src='../static/image/del.png' />
              </view>
              <view class="title">删除{{where}}</view>
            </view>
          </li>
          <li v-if="deviceItemItem.is_zhu==='1'">
            <view class="item" @click="queryDeviceUser">
              <view class="image">
                <image src='../static/image/ziuser.png' />
              </view>
              <view class="title">子用户</view>
            </view>
          </li>
        </ul>
      </view>
    </view>

    <!-- 重命名 start -->
    <view class="form-wrapper" v-if="active === 1">
      <view class="input-box">
        <input type="text" v-model="deviceName" placeholder="请输入设备名称">
      </view>
      <view class="button-wrapper">
        <text @click="cancel">取消</text>
        <text @click="updateDevice(1)">确定</text>
      </view>
    </view>
    <!-- 重命名 end -->

    <!-- 分享 start -->
    <view class="form-wrapper" v-if="active === 3">
      <view class="input-box">
        <input type="text" v-model="mobile" placeholder="请输入手机号码">
      </view>
      <view class="button-wrapper">
        <text @click="cancel">取消</text>
        <text @click="updateDevice(3)">确定</text>
      </view>
    </view>
    <!-- 分享 end -->

    <!-- 删除 start -->
    <view class="form-wrapper" v-if="active === 2">
      <view class="input-box">
        <text>确定删除此设备？</text>
      </view>
      <view class="button-wrapper">
        <text @click="cancel">取消</text>
        <text @click="updateDevice(2)">确定</text>
      </view>
    </view>
    <!-- 删除 end -->

    <!-- 子用户 start -->
    <view class="zi-user-wrapper" v-if="active === 4">
      <view class="zi-user-content">
        <h2>子用户列表 <image  @click="cancel" src='../static/image/close.png' /></h2>
        <ul class="zi-user">
          <li v-for="(item, index) in userItem" :key="index">
            {item.mobile} <text @click="delDeviceUser(item.userid)">删除</text>
          </li>
        </ul>
      </view>
    </view>
    <!-- 子用户 end -->
  </view>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  props: {
    where: String,
    deviceItemItem: Object,
    closeShareType: Function
  },
  data () {
    return {
      active: 0, // 1、修改设备名称  2、删除设备  3、分享设备  4、子用户
      deviceName: '',
      mobile: '',
      timer: null,
      userItem: []
    }
  },
  destroyed () {
    this.cancel()
    if (this.timer) clearTimeout(this.timer)
  },
  computed: {
    ...mapState(['userid', 'upDateFn'])
  },
  methods: {
    ...mapMutations(['setShareType']),
    showType (type) {
      this.active = type
    },
    cancel (type) {
      this.active = 0
      this.deviceName = ''
      this.mobile = ''
      if (type) {
        this.upDateFn()
      }
      this.setShareType(false)
    },
    close () {
      if (this.active === 0) {
        this.setShareType(false)
        this.deviceName = ''
        this.mobile = ''
      }
    },
    isMobile (phone) {
      const reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/
      return reg.test(phone)
    },
    async updateDevice (type) {
      // “type”:”1、修改设备名称  2、删除设备  3、分享设备”
      let prams = {
        type,
        userid: this.userid,
        deviceid: this.deviceItemItem.deviceid
      }
      if (type === 1) {
        if (this.deviceName == '') {
          this.$CommonJs.showToast('设备名称不能为空！')
          return false
        }
        prams.devicename = this.deviceName
      }
      if (type === 3) {
        if (this.mobile == '') {
          this.$CommonJs.showToast('手机号码不能为空！')
          return false
        }
        if (!this.isMobile(this.mobile)) {
          this.$CommonJs.showToast('请输入正确的手机号码！')
          return false
        }
        prams.mobile = this.mobile
      }
      console.log(prams)
      // return false
      const data =  await this.$server.updateDevice(prams)
      this.$server.resultCallback(
				data,
				(data) => {
          this.$CommonJs.showToast('操作成功！')
          this.timer = setTimeout(() => {
            this.cancel(true)
          }, 1000)
				}
			)
    },
    // 查询子用户
    async queryDeviceUser () {
      const prams = {
        userid: this.userid,
        deviceid: this.deviceItemItem.deviceid
      }
      const data = await this.$server.queryDeviceUser(prams)
      this.$server.resultCallback(
				data,
				(data) => {
          this.userItem = data.data.userItem
          this.showType(4)
				}
			)
    },
    // 删除子用户
    async delDeviceUser (deluserid) {
      const prams = {
        userid: this.userid,
        deviceid: this.deviceItemItem.deviceid,
        deluserid
      }
      const data = await this.$server.delDeviceUser(prams)
      this.$server.resultCallback(
				data,
				(data) => {
          this.$CommonJs.showToast('操作成功！')
          this.timer = setTimeout(() => {
            this.cancel(true)
          }, 1000)
				}
			)
    }
  }
}
</script>

<style lang="less" scoped>
.share {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(0, 0, 0, .6);
  }

  .share-wrapper {
    position: absolute;
    bottom: 10px;
    left: 0;
    z-index: 100;
    width: 100%;
    .sharw-content {
      margin: 0 15px;
      background: #fff;
      border-radius: 10px;
      ul {
        display: flex;
        justify-content: center;
        li {
          text-align: center;
          width: 25%;
          display: inline-flex;
          justify-content: center;
          .item {
            padding: 12px 15px 8px;
            display: inline-block;
          }

          .image {
            text-align: center;
            display: flex;
            justify-content: center;
            height: 24px;
            image {
              width: 24px;
              height: 24px;
              display: block;
            }
          }

          .title {
            color: #666;
            font-size: 14px;
            margin-top: 3px;
            line-height: 20px;
          }
        }
      }
    }
  }

  .form-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 101;
    width: 80%;
    padding: 20px 20px 0;
    background: #fff;
    border-radius: 10px;
    transform: translate(-50%, -50%);

    .input-box {
      margin-bottom: 5px;
      border-bottom: 1px solid #dedede;
      input {
        font-size: 14px;
        padding: 5px 0;
      }
      text {
        font-size: 15px;
        display: block;
        line-height: 25px;
        padding-bottom: 10px;
      }
    }

    .button-wrapper {
      display: flex;

      text {
        width: 50%;
        font-size: 14px;
        line-height: 54px;
        text-align: center;
        &:nth-of-type(1) {
          color: red;
        }
      }
    }
  }

  .zi-user-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 110;
    .zi-user-content {
      border-radius: 5px;
      background: #fff;
      position: absolute;
      left: 15px;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);

      h2 {
        padding: 0 15px;
        text-align: center;
        font-size: 16px;
        color: #333;
        line-height: 34px;
        image {
          float: right;
          display: block;
          width: 24px;
          height: 24px;
          margin-top: 5px;
        }
      }
    }
  }

  .zi-user {
    padding: 0 15px;
    max-height: 900upx;
    overflow-y: auto;
    li {
      height: 34px;
      font-size: 15px;
      color: #666;
      line-height: 34px;
      text {
        font-size: 13px;
        color: #999;
        float: right;
      }
    }
  }
}
</style>