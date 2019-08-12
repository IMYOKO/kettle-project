<template>
  <view class="phone">
    <h2 class="title">绑定手机</h2>
    <ul class="from">
      <li>
        <input type="text" v-model="phone" placeholder="请输入手机号码">
      </li>
      <li>
        <input type="text" class="code" v-model="code" placeholder="请输入验证码">
        <view class="get-code">获取验证码</view>
      </li>
    </ul>
    <view class="button-wrapper">
     <view class="button">确定</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      phone: '',
      code: ''
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

