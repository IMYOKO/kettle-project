<template>
  <view class="news-detail">
    <view class="news-title">
      {{helpItems.title}}
    </view>
    <!-- <view class="news-time">2019-08-01 12:24:23</view> -->
    <view class="news-content">
      {{helpItems.content}}
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  onUnload() {
    this.setHelpItems({
      title: '',
      content: '',
    })
  },
  computed: {
    ...mapState(['helpItems'])
  },
  methods: {
    ...mapMutations(['setHelpItems']),
  }
}
</script>

<style lang="less" scoped>
.news-detail {
  padding: 15px;
  .news-title {
    color: #333;
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 10px;
    word-break: break-all;
    font-weight: bold;
  }

  .news-time {
    font-size: 14px;
    line-height: 16px;
    color: #999;
  }

  .news-content {
    color: #333;
    font-size: 16px;
    line-height: 24px;
    margin: 26px 0 0;
    word-break: break-all;
  }
}
</style>
