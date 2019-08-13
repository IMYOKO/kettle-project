<template>
  <view class="news">
    <view class="news-wrapper">
			<ul class="news-list" v-if="newsItem.length > 0">
				<li v-for="(item, index) in newsItem" :key="index" @click="goNewsPage(item)">
					<view class="news-title">{{item.title}}</view>
					<view class="news-time">{{item.addtime}}</view>
				</li>
			</ul>
			<view class="no-mores" v-else>暂无新闻</view>
		</view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
	data () {
		return {
			page: 1,
			totalpage: 1,
			rows: 20,
			newsItem: []
		}
	},
	onShow () {
		this.queryNewsList()
	},
  methods: {
		...mapMutations(['setNewsItems']),
		async queryNewsList () {
			const data = await this.$server.queryNewsList({page: this.page})
			this.$server.resultCallback(data,
			(data) => {
        this.newsItem = data.newsItem
        this.totalpage = data.totalpage
        this.rows = data.rows
			})
		},
		goNewsPage (item) {
			this.$CommonJs.pathTo('/infor/newDetail?newsid=' + item.newsid)
      this.setNewsItems(item)
		}
	}
}
</script>

<style lang="less" scoped>
.no-mores {
	height: 50px;
	line-height: 50px;
	font-size: 14px;
	color: #999;
	text-align: center;
}
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
