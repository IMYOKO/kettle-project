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
  </view>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      mac: ''
    }
  },
  computed: {
    ...mapState(['userid'])
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
      const data = await this.$server.addDevice({userid: this.userid, mac: this.mac})
      this.$server.resultCallback(data,
			(data) => {
        this.$CommonJs.showToast('添加成功！')
        setTimeout(() => {
          uni.navigateBack()
        }, 500)
			})
    }
  }
}
</script>

<style lang="less" scoped>
.add-device {
  padding: 15px 20px;

  .button-wrapper {
    padding-top: 30%;
    display: flex;
    justify-content: center;
    .button {
      width: 60%;
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
        padding: 6px 0;
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
        width: 34px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        font-weight: bold;
        color: #f9b073;
        line-height: 40px;
        text-align: center;
        image {
          margin-top: 3px;
          width: 34px;
          height: 34px;
        }
      }
    }
  }
}
</style>
