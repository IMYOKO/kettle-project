<template>
  <view class="user">
    <!-- 绑定手机信息 start -->
    <!-- <view class="phone-wrapper">
      <view class="phone-infor" v-if="mobile">{{mobile}}</view>
      <view class="button-wrapper" v-else>
        <view class="button" @click="$CommonJs.pathTo('/device/band')">绑定手机</view>
      </view>
    </view> -->
    <view class="phone-wrapper u-logo">
      <view class='user-logo'>
        <image src='../../static/image/userlogo.png' />
      </view>
      <view class="phone" v-if="mobile">{{mobile}}</view>
      <view class="band-phone" v-else><text @click="$CommonJs.pathTo('/device/band')">点击绑定手机</text></view>
    </view>
    <!-- 绑定手机信息 end -->

    <!-- 我的设备 start -->
    <ul class="shebei-list">
      <li>
        <view class="item clearfix" @click="goPage('/device/devices')">
          <view class="icon icon-01"></view>
          <view class="text">我的设备</view>
          <view class="next"></view>
        </view>
      </li>
      <li>
        <view class="item clearfix" @click="goPage('/device/subscribe')">
          <view class="icon icon-02"></view>
          <view class="text">我的预约</view>
          <view class="next"></view>
        </view>
      </li>
      <li>
        <view class="item clearfix" @click="$CommonJs.pathTo('/infor/help')">
          <view class="icon icon-03"></view>
          <view class="text">帮助中心</view>
          <view class="next"></view>
        </view>
      </li>
    </ul>
    <!-- 我的设备 end -->
  </view>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['mobile'])
  },
  methods: {
    goPage (url) {
      this.$CommonJs.pathTo(url)
      // if (this.mobile) {
      //   this.$CommonJs.pathTo(url)
      // } else {
      //   this.$CommonJs.showToast('请先绑定手机号码！')
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  padding: 30px 15px 20px;
  .phone-wrapper {
    border-radius: 20px;
    padding: 36px 20px;
    background: #fff;
    margin-bottom: 30px;

    .button-wrapper {
      text-align: center;
      .button {
        display: inline-block;
        width: 280upx;
        height: 44px;
        color: #fff;
        font-weight: bold;
        line-height: 44px;
        font-size: 16px;
        border-radius: 22px;
        background: #ffb170;
        box-shadow: 0 2px 5px rgba(0, 0, 0, .3);
      }
    }

    .phone-infor {
      font-size: 28px;
      font-weight: bold;
      color: #000;
      text-align: center;
    }

    &.u-logo {
      padding: 20px;
      height: 64px;
      .user-logo {
        width: 64px;
        height: 64px;
        float: left;
        image {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .phone {
        font-size: 20px;
        padding-left: 84px;
        line-height: 64px;
      }
      .band-phone {
        margin-left: 84px;
        line-height: 64px;
        border-radius: 10px;
        font-size: 16px;
        text-decoration: underline;
      }
    }
  }

  .shebei-list {
    border-top: 1px solid #ddd;
    li {
      border-bottom: 1px solid #ddd;
      .item {
        height: 68px;
        line-height: 68px;
        padding: 0 10px;
        .icon {
          float: left;
          width: 44px;
          height: 44px;
          margin-top: 12px;
          &-01 {
            background: url('../../static/image/shebei@2x.png') center center no-repeat;
            background-size: contain;
          }
          &-02 {
            background: url('../../static/image/yuyue@2x.png') center center no-repeat;
            background-size: contain;
          }
          &-03 {
            background: url('../../static/image/help@2x.png') center center no-repeat;
            background-size: contain;
          }
        }
        .text {
          font-size: 18px;
          margin-left: 20px;
          float: left;
        }

        .next {
          width: 24px;
          height: 24px;
          float: right;
          margin-top: 23px;
          background: url('../../static/image/zx_more@2x.png') center center no-repeat;
          background-size: contain;
        }
      }
    }
  }
}
</style>
