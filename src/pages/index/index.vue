<template>
	<view class="home">
		<view class="banner-wrapper" v-if="bannerItem.length > 0">
			<swiper class="swiper"
				:indicator-dots="indicatorDots"
				:indicator-color="'#000'"
				:indicator-active-color="'#fff'"
				:autoplay="autoplay"
				:interval="interval"
				:duration="duration"
			>
				<swiper-item class="swiper-item" v-for="(item, index) in bannerItem" :key='index' @click="goWebView(item.img_url)">
					<image :src="item.img_path" class="image" />
				</swiper-item>
			</swiper>
		</view>

		<ul>
			<li v-for="(item, index) in devices" :key="index">
				<view>{{item.RSSI}}</view>
				<view>{{item.deviceId}}</view>
				<view>{{item.name}}</view>
			</li>
		</ul>

		<view class="shebei-wrapper">
			<view class="title">我的设备</view>
			<!-- 未绑定 -->
			<view class="my-shebei" style="margin-top: 10px">
				<DeviceList :deviceItem='deviceItem' where='home' />
			</view>
		</view>

		<view class="news-wrapper">
			<view class="title">新闻资讯
				<view class="more" @click="$CommonJs.pathTo('/infor/news')">更多>></view>
			</view>
			<ul class="news-list" v-if="newsItem.length > 0">
				<li v-for="(item, index) in newsItem" :key="index">
					<view class="news-title" @click="goNewsPage(item)">{{item.title}}</view>
					<view class="news-jianshu">{{item.jianshu}}</view>
					<view class="news-time">{{item.addtime}}</view>
				</li>
			</ul>
			<view class="no-mores" v-else>暂无更多</view>
		</view>
	</view>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import DeviceList from '../../component/deviceList'
import { log } from 'util';
export default {
	data() {
		return {
			weixinCode: '',
			indicatorDots: true,
			autoplay: true,
			interval: 3000,
			duration: 500,
			deviceItem: [],
			bannerItem: [],
			newsItem: [],
			devices: [],
			isPullDownRefresh: false
		}
	},
	onShow() {
		console.log('=====> 首页页面刷新！')
		this.setUpDateFn(this.wexinlogin)
		this.wexinlogin()
	},
	onPullDownRefresh() {
		this.isPullDownRefresh = true
		this.wexinlogin()
	},
	onHide() {
    this.setUpDateFn(null)
  },
	computed: {
		...mapState(['openid'])
	},
	methods: {
		...mapMutations(['setUserInfor', 'setNewsItems', 'setUpDateFn']),
		goWebView (url) {
			this.$CommonJs.pathTo('/infor/webView?url=' + url)
		},
		goNewsPage (item) {
			this.$CommonJs.pathTo('/infor/newDetail?newsid=' + item.newsid)
      this.setNewsItems(item)
		},
		wexinlogin () {
			uni.login({
				provider: 'weixin',
				success: (loginRes) => {
					this.weixinCode = loginRes.code
					this.login()
				},
				fail: () => {
					if (this.isPullDownRefresh) {
						uni.stopPullDownRefresh()
						this.isPullDownRefresh = false
					}
				}
			})
		},
		async login () {
			uni.showLoading({
        title: '请求中...'
      });
			const data = await this.$server.login({code: this.weixinCode})
			uni.hideLoading();
			if (this.isPullDownRefresh) {
        uni.stopPullDownRefresh()
        this.isPullDownRefresh = false
      }
			this.$server.resultCallback(
				data,
				(data) => {
					console.log('=====> 首页数据请求成功！')
					console.log(data)
					this.deviceItem = data.deviceItem
					this.bannerItem = data.bannerItem
					this.newsItem = data.newsItem
					this.setUserInfor(data)
				}
			)
		}
	},
	components: {
		DeviceList
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
.home {
	padding: 15px 15px 20px;

	.banner-wrapper {
		height: 350upx;
		border-radius: 20px;
		overflow: hidden;
		margin-bottom: 20px;
		.swiper {
			height: 350upx;
			border-radius: 20px;
			overflow: hidden;
			transform: translateY(0); 
			background: #fff;
		}

		.swiper-item {
			height: 100%;
			background: #fff;

			navigator, 
			.image {
				width: 100%;
				height: 350upx;
				display: block;
			}
		}
	}

	.title {
		font-size: 18px;
		font-weight: bold;
		line-height: 28px;
		.more {
			float: right;
			font-size: 14px;
			color: #666;
		}
	}

	.shebei-wrapper {
		padding-bottom: 30px;
	}

	.news-wrapper {
		.news-list {
			margin-top: 10px;
			background: #fff;
			padding: 10px 0;
			border-radius: 20px;

			li {
				padding: 10px 15px;
				border-bottom: 1px solid #ddd;
				&:last-child {
					border-bottom: none;
				}
				.news-title {
					color: #666;
					font-size: 16px;
					line-height: 24px;
					margin-bottom: 5px;
					word-break: break-all;
					font-weight: bold;
					text-overflow: ellipsis;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.news-jianshu {
					font-size: 15px;
					color: #666;
					line-height: 23px;
					margin-bottom: 10px;
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

