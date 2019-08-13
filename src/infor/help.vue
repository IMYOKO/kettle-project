<template>
  <view class="news">
    <view class="news-wrapper">
			<ul class="news-list" v-if="helpItem.length > 0">
				<li v-for="(item, index) in helpItem" :key="index" @click="goHelpDetailPage(item)">
					<view class="news-title">{{item.title}}</view>
				</li>
			</ul>
			<view class="no-mores" v-else>暂无更多</view>
		</view>
  </view>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			helpItem: []
		}
	},
	onShow () {
		this.queryHelpList()
	},
	methods: {
		...mapMutations(['setHelpItems']),
		async queryHelpList () {
			const data = await this.$server.queryHelpList()
			this.$server.resultCallback(data,
			(data) => {
        this.helpItem = data.helpItem
			})
		},
		goHelpDetailPage (item) {
			this.$CommonJs.pathTo('/infor/helpDetail')
      this.setHelpItems(item)
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
					padding: 5px 0;
					// margin-bottom: 10px;
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

