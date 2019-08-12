<template>
	<view class="home">
		<view class="banner-wrapper">
			<swiper class="swiper"
				:indicator-dots="indicatorDots"
				:indicator-color="'#000'"
				:indicator-active-color="'#fff'"
				:autoplay="autoplay"
				:interval="interval"
				:duration="duration"
			>
				<swiper-item class="swiper-item">
					<image src="../../static/image/bm_banner_01@2x.png" class="image" />
				</swiper-item>
				<swiper-item class="swiper-item">
					<image src="../../static/image/bm_banner_02@2x.png" class="image" />
				</swiper-item>
				<swiper-item class="swiper-item">
					<image src="../../static/image/bm_banner_03@2x.png" class="image" />
				</swiper-item>
				<!-- <swiper-item class="swiper-item" v-for="(item, index) in bannerList" :key="index">
					<image @click="golinkurl(item.linkUrl)" class="image" :src="item.imageUrl" width="100%" alt=""/>
				</swiper-item> -->
			</swiper>
		</view>

		<view class="shebei-wrapper">
			<view class="title">我的设备</view>
			<!-- 未绑定 -->
			<view class="my-shebei" style="margin-top: 10px">
				<DeviceList />
			</view>
		</view>

		<view class="news-wrapper">
			<view class="title">新闻资讯
				<view class="more" @click="$CommonJs.pathTo('/infor/news')">更多>></view>
			</view>
			<ul class="news-list">
				<li>
					<view class="news-title" @click="$CommonJs.pathTo('/infor/newDetail?id=1')">这里是新闻标题这里是新闻标题这里是新闻标题这里是新闻标题</view>
					<view class="news-time">2019-08-01 12:24:23</view>
				</li>
				<li>
					<view class="news-title">这里是新闻标题这里是新闻标题这里是新闻标题这里是新闻标题</view>
					<view class="news-time">2019-08-01 12:24:23</view>
				</li>
				<li>
					<view class="news-title">这里是新闻标题这里是新闻标题这里是新闻标题这里是新闻标题</view>
					<view class="news-time">2019-08-01 12:24:23</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
import DeviceList from '../../component/deviceList'
export default {
	data() {
		return {
			indicatorDots: true,
			autoplay: true,
			interval: 3000,
			duration: 500,
			bannerList: []
		}
	},
	onShow() {
		// this.$CommonJs.getUserInfor()
	},
	methods: {
	},
	components: {
		DeviceList
	}
}
</script>

<style lang="less" scoped>
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
					margin-bottom: 10px;
					word-break: break-all;
					font-weight: bold;
					text-overflow: ellipsis;
					overflow: hidden;
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

