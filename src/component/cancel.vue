<template>
  <view class="cancels">
    <view class="bg"></view>
    <view class="form-wrapper">
      <view class="input-box">
        <text>取消预约？</text>
      </view>
      <view class="button-wrapper">
        <text>取消</text>
        <text>确定</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
.cancels {
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
}
</style>