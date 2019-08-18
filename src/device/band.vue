<template>
  <view class="phone">
    <h2 class="title">绑定手机</h2>
    <ul class="from">
      <li>
        <input type="text" v-model="mobile" placeholder="请输入手机号码">
      </li>
      <li>
        <input type="text" class="code" v-model="code" placeholder="请输入验证码">
        <view class="get-code" @click="getCode">{{codeText}}</view>
      </li>
    </ul>
    <view class="button-wrapper">
      <view class="button" @click="bindMobile">确定</view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      mobile: '',
      code: '',
      callBackCode: '',
      hasSend: false,
      codeText: '获取验证码',
      timer: null,
      current: 10
    }
  },
  onUnload () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  computed: {
    ...mapState(['userid'])
  },
  methods: {
    ...mapMutations(['setMobile']),
    isMobile (phone) {
      const reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/
      return reg.test(phone)
    },
    async bindMobile () {
      // uni.navigateBack()
      if (this.mobile == '') {
        this.$CommonJs.showToast('请输入手机号码！')
        return false
      }
      if (!this.isMobile(this.mobile)) {
        this.$CommonJs.showToast('请输入正确的手机号码！')
        return false
      }
      if (this.code == '') {
        this.$CommonJs.showToast('请输入验证码！')
        return false
      }
      if (this.callBackCode == '') {
        this.$CommonJs.showToast('请先获取验证码！')
        return false
      }
      if (this.callBackCode !== this.code) {
        this.$CommonJs.showToast('验证码错误！')
        return false
      }
      const prams = {
        userid: this.userid,
        mobile: this.mobile,
        code: this.code
      }
      const data = await this.$server.bindMobile(prams)
			this.$server.resultCallback(
				data,
				() => {
          this.setMobile(this.mobile)
          this.$CommonJs.showToast('绑定成功！')
          setTimeout(() => {
            uni.navigateBack()
          }, 1500)
				}
			)
    },
    async getCode () {
      if (this.hasSend) {
        return false
      }
      if (this.mobile == '') {
        this.$CommonJs.showToast('请输入手机号码！')
        return false
      }
      if (!this.isMobile(this.mobile)) {
        this.$CommonJs.showToast('请输入正确的手机号码！')
        return false
      }
      const prams = {
        userid: this.userid,
        mobile: this.mobile
      }
      try {
        this.hasSend = true
        const data = await this.$server.getCode(prams)
        this.$server.resultCallback(
          data,
          (data) => {
            this.callBackCode = data.code
            this.$CommonJs.showToast('验证码发送成功，请注意查收！')
            let current = 10
            this.timer = setInterval(()=> {
              current --;
              this.codeText = current + 'S'
              if (current <= 0) {
                clearInterval(this.timer)
                this.codeText = '获取验证码'
                this.hasSend = false
              }
            }, 1000)
          },
          () => {
            this.hasSend = false
          }
        )
      } catch (error) {
        
      }
    }
  }
}
</script>

<style lang="less" scoped>
.phone {
  padding: 15px 20px;

  .title {
    text-align: center;
    font-size: 20px;
    color: #000;
    padding: 10% 0;
  }

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
        width: 35%;
        height: 40px;
        font-size: 16px;
        font-weight: bold;
        color: #f9b073;
        line-height: 40px;
        text-align: center;
      }
    }
  }
}
</style>

