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

		<!-- <button
			v-if="isdevelopment"
			open-type="getUserInfo"
			@getuserinfo="getuserinfo"
		>获取信息</button> -->

		<view class="shebei-wrapper">
			<view class="title">我的设备</view>
			<!-- 未绑定 -->
			<view class="my-shebei" style="margin-top: 10px">
				<DeviceList :deviceItem='deviceItem' />
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
			isdevelopment: false,
			indicatorDots: true,
			autoplay: true,
			interval: 3000,
			duration: 500,
			deviceItem: [],
			bannerItem: [],
			newsItem: [],
			devices: []
		}
	},
	onShow() {
		if (process.env.NODE_ENV === 'development') {
			this.isdevelopment = true
		}
		this.wexinlogin()
	},
	computed: {
		...mapState(['openid'])
	},
	methods: {
		...mapMutations(['setUserInfor', 'setNewsItems']),
		getuserinfo(e) {
			console.log(e)
		},
		lanya () {
			function ab2hex(buffer) {
				const hexArr = Array.prototype.map.call(
					new Uint8Array(buffer),
					function (bit) {
						return ('00' + bit.toString(16)).slice(-2)
					}
				)
				return hexArr.join('')
			}
			uni.openBluetoothAdapter({
				success: (res) => {
					console.log('初始化蓝牙成功！')
					this.$CommonJs.showToast('初始化蓝牙成功！')
					uni.startBluetoothDevicesDiscovery({
						allowDuplicatesKey: false,
						interval: 0,
						success: (res) => {
							console.log('开始搜索蓝牙！')
							uni.showLoading({
								title: '开始搜索蓝牙！'
							});
							uni.getBluetoothDevices({
								success: (res) => {
									console.log('蓝牙: ', res.devices)
									// uni.hideLoading()
									// const list = res.devices
									// this.devices = list
									uni.onBluetoothDeviceFound((devices) => {
										console.log('new device list has founded')
										console.log(devices)
										console.log(devices.devices[0])
										const devicesList = this.devices.slice(0)
										let hasDevices = false
										devicesList.map(item => {
											if (item.deviceId === devices.devices[0].deviceId) {
												hasDevices = true
											}
										})
										if (!hasDevices) {
											this.devices.push(devices.devices[0])
										}
										if (devices.devices[0].name === 'YOKO') {
											uni.hideLoading()
											this.$CommonJs.showToast('找到yoko, 停止搜索')
											uni.stopBluetoothDevicesDiscovery({
												success: (res) => {
													console.log('停止搜索蓝牙！')
												}
											})
										}
									})
								}
							})
							console.log(res)
						},
						fail (err) {
							console.log(err)
						}
					})
				},
				fail (err) {
					console.log(err)
				}
			})
		},
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
					this.login(loginRes.code)
				}
			})
		},
		async login (code) {
			const data = await this.$server.login({code})
			this.$server.resultCallback(
				data,
				(data) => {
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

