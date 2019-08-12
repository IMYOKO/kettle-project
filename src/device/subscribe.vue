<template>
  <view class="subscribe">
    <view class="subscribe-tab">
      <ul class="subscribe-wrapper">
        <li class="active">待进行</li>
        <li>进行中</li>
        <li>已完成</li>
      </ul>
    </view>
    <view class="subscribe-content">
      <ul class="subscribe-list">
        <li>
          <h1>菊花茶 <text class="wait">待进行</text></h1>
          <h5>2019-08-01 12:24:23</h5>
        </li>
        <li>
          <h1>菊花茶 <text class="ing">进行中</text></h1>
          <h5>2019-08-01 12:24:23</h5>
        </li>
        <li>
          <h1>菊花茶 <text class="over">已完成</text></h1>
          <h5>2019-08-01 12:24:23</h5>
        </li>
      </ul>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      id: 0
    }
  }
}
</script>

<style lang="less" scoped>
.subscribe {
  padding-top: 44px;
  .subscribe-tab {
    width: 100%;
    height: 44px;
    line-height: 44px;
    background: #7993b7;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .subscribe-wrapper {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;

    li {
      flex: 1;
      color: #fff;
      font-size: 16px;
      text-align: center;
      &.active {
        font-weight: bold;
        background: #ffb170;
      }
    }
  }

  .subscribe-content {
    margin-top: 10px;
    .subscribe-list {
      background: #fff;
      li {
        padding: 12px 15px;
        border-bottom: 1px solid #ddd;
        &:last-child {
          border-bottom: none;
        }

        h1 {
          color: #000;
          font-size: 18px;
          line-height: 28px;
          padding-right: 4em;
          margin-bottom: 10px;
          word-break: break-all;
          position: relative;
          text {
            font-size: 14px;
            position: absolute;
            top: 0;
            right: 0;

            &.wait {
              color: green;
            }
            &.ing {
              color: red;
            }
            &.over {
              color: gray;
            }
          }
        }
        h5 {
          font-size: 14px;
					line-height: 16px;
					color: #999;
        }
      }
    }
  }
}
</style>
