<template>
  <view class="code">
    <view class="bg" @click="setCodeType(false)"></view>
    <view class="code-wrapper">
      <view class="code-box">
        <view class="code-item">

        </view>
        <view class="tel">电话：13032213634</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['setCodeType'])
  }
}
</script>

<style lang="less" scoped>
.code {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  &-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 200;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: #fff;
    border-radius: 20px;
    .code-box {
      width: 240px;
      background: #fff;
      .code-item {
        margin-top: 20px;
        width: 200px;
        height: 200px;
        background: gray;
        margin-left: 20px;
      }
      .tel {
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
    }
  }

  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
    background: rgba(0, 0, 0, .6)
  }
}

</style>

