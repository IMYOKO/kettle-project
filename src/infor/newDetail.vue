<template>
  <view class="news-detail">
    <view class="news-title">
      {{newsItems.title}}
    </view>
    <view class="news-time">{{newsItems.addtime}}</view>
    <view class="news-content">
      {{newsItems.content}}
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  onUnload() {
    this.setNewsItems({
      newsid: null,
      title: '',
      content: '',
      addtime: '',
    })
  },
  computed: {
    ...mapState(['newsItems'])
  },
  methods: {
    ...mapMutations(['setNewsItems']),
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
