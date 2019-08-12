<template>
  <view class="news">
    <view class="news-wrapper">
			<ul class="news-list">
				<li>
					<view class="news-title">这里是新闻标题这里是新闻标题这里是新闻标题这里是新闻标题</view>
					<view class="news-time">2019-08-01 12:24:23</view>
				</li>
				<li>
					<view class="news-title">这里是新闻标题这里是新闻标题这里是新闻标题这里是新闻标题</view>
					<view class="news-time">2019-08-01 12:24:23</view>
				</li>
				<li>
					<view class="news-title">这里是新闻标题这里是新闻标题这里是新闻标题这里是新闻标题这里是新闻标题这里是新闻标题这里是新闻标题这里是新闻标题</view>
					<view class="news-time">2019-08-01 12:24:23</view>
				</li>
			</ul>
		</view>
  </view>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
.news {
  height: 100%;
  background: #fafafa;
  padding: 10px 15px 20px;
  .news-wrapper {
		.news-list {
			border-radius: 20px;

			li {
				padding: 10px 0;
				border-bottom: 1px solid #ddd;
				.news-title {
					color: #333;
					font-size: 16px;
					line-height: 24px;
					margin-bottom: 10px;
          word-break: break-all;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.news-time {
					font-size: 14px;
					line-height: 16px;
					color: #999;
				}
			}
		}
	}
}
</style>
