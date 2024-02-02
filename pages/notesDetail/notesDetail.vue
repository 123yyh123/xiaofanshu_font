<template>
	<view>
		<view :style="{height: statusBarHeight + 'px'}" style="position: fixed;top: 0;width: 100%;"></view>
		<view :style="{top: statusBarHeight + 'px'}"
			style="position: fixed;width: 100%;height: 44px;background-color: #fff;z-index: 9999;display: flex;align-items: center;padding: 0 10rpx;box-sizing: border-box;">
			<u-icon name="arrow-left" color="#2b2b2b" size="25"></u-icon>
			<view style="margin-left: 20rpx;">
				<image :src="notesDetail.avatarUrl" style="height: 35px;width: 35px;border-radius: 50%;"
					mode="aspectFill"></image>
			</view>
			<view class="authorName">{{notesDetail.nickname}}</view>
			<view v-if="notesDetail.belongUserId!=userInfo.id" style="display: flex;justify-content: space-around;flex: 1;padding: 0 20rpx;">
				<u-tag v-if="notesDetail.isFolllow" text="已关注" plain shape="circle" color="#9ea1a3"
					borderColor="#9ea1a3"></u-tag>
				<u-tag v-else text="关注" plain shape="circle" color="#f56c6c" borderColor="#f56c6c"></u-tag>
				<u-icon name="share-square" color="#2b2b2b" size="30"></u-icon>
			</view>
			<view v-else style="display: flex;margin-left: auto;margin-right: 15rpx;">
				<u-icon name="more-dot-fill" color="#2b2b2b" size="26"></u-icon>
			</view>
		</view>
		<view :style="{height: statusBarHeight+44+ 'px'}" style="width: 100%;"></view>
		<view style="position: relative;">
			<swiper :style="{height: swipperHeight+70 + 'rpx'}" :indicator-dots="true" :circular="true"
				current="swiperCurrent" @change="swiperChange" indicator-active-color="#f56c6c"
				indicator-color="#9ea1a3">
				<swiper-item v-for="(item,index) in notesDetail.notesResources" :key="index">
					<view :style="{height: swipperHeight+'rpx'}"
						style="display: flex;justify-content: center;align-items: center;">
						<image :src="item.url" :style="{height: item.height + 'rpx',width: item.width + 'rpx'}"></image>
					</view>
				</swiper-item>
			</swiper>
			<view
				style="position: absolute;top: 30rpx;right: 30rpx;background-color: #383c3c;border-radius: 20px;font-size: 28rpx;color: #f5f5f5;padding: 8rpx 18rpx;"
				v-if="notesDetail!=null">{{swiperCurrent+1}}/{{swipperCount}}
			</view>
		</view>
		<view style="padding: 10rpx 40rpx;">
			<view style="font-size: 37rpx;color: #474a4d;margin-bottom: 15rpx;word-wrap: break-word;word-break: break-all;letter-spacing: 2rpx;">{{notesDetail.title}}</view>
			<rich-text style="font-size: 35rpx;letter-spacing: 0.1rem;" :nodes="notesDetail.content" @itemclick="clickTopic"></rich-text>
			<view style="display: flex;margin-top: 15rpx;font-size: 24rpx;color: #afafb0;">
				<view>
					<text v-if="notesDetail.updateTime!=notesDetail.createTime">更新于{{notesDetail.updateTime}}</text>
					<text v-else>{{notesDetail.createTime}}</text>
				</view>
				<view style="margin-left: 20rpx;">{{notesDetail.province}}</view>
			</view>
		</view>
		<u-divider style="padding: 0 30rpx;" :hairline="true"></u-divider>
	</view>
</template>

<script>
	import {
		getNotesByNotesId
	} from '@/apis/notes_service.js'
	import {
		weChatTimeFormat
	} from '@/utils/util.js'
	export default {
		data() {
			return {
				statusBarHeight: 0,
				notesDetail: {},
				swipperHeight: 0,
				swiperCurrent: 0,
				swipperCount: 0,
				userInfo: {}
			}
		},
		methods: {
			swiperChange(e) {
				this.swiperCurrent = e.detail.current
			},
			findTopicName(str) {
				// #{&quot;topicname&quot;:&quot;蛋仔派对&quot;}
				let reg = /#{&quot;topicname&quot;:&quot;(.+?)&quot;}/g
				let result = str.match(reg)
				if (result) {
					return result[0].replace(/#{&quot;topicname&quot;:&quot;/g, '').replace(/&quot;}/g, '')
				} else {
					return ''
				}
			},
			findUserId(str) {
				// #{&quot;userId&quot;:&quot;1675532564583455936&quot;}
				let reg = /#{&quot;userId&quot;:&quot;(.+?)&quot;}/g
				let result = str.match(reg)
				if (result) {
					return result[0].replace(/#{&quot;userId&quot;:&quot;/g, '').replace(/&quot;}/g, '')
				} else {
					return ''
				}
			},
			clickTopic(e) {
				if (e.detail.node.name != 'a') {
					return
				}
				// 判断是话题还是用户
				let topicName = this.findTopicName(e.detail.node.attrs.href)
				let userId = this.findUserId(e.detail.node.attrs.href)
				if (topicName != '') {
					uni.navigateTo({
						url: '/pages/topicIndex/topicIndex?topicName=' + topicName
					})
				} else if (userId != '') {
					uni.navigateTo({
						url: '/pages/mine/otherMine?userId=' + userId
					})
				} else {
					console.log('不是话题也不是用户')
				}
			}
		},
		onLoad(options) {
			console.log(options)
			uni.getSystemInfo({
				success: (res) => {
					console.log(res);
					this.statusBarHeight = res.statusBarHeight;
					console.log(this.statusBarHeight);
				}
			})
			this.userInfo = uni.getStorageSync('userInfo')
			getNotesByNotesId({
				notesId: options.notesId
			}).then(res => {
				console.log(res)
				res.data.notesResources.forEach(item => {
					uni.getImageInfo({
						src: item.url,
						success: (image) => {
							if (image.width >= image.height) {
								item.width = 750
								item.height = 750 * image.height / image.width
							} else {
								if (image.height > 1000) {
									item.height = 1000
									item.width = 1000 * image.width / image.height
									if (item.width > 750) {
										item.width = 750
										item.height = 750 * image.height / image.width
									}
								} else {
									if (image.width > 750) {
										item.width = 750
										item.height = 750 * image.height / image.width
									} else {
										item.width = image.width
										item.height = image.height
									}
								}
							}
							console.log(item)
							if (item.height > this.swipperHeight) {
								this.swipperHeight = item.height
							}
						},
						fail: (err) => {
							console.log(err)
						}
					})
				})
				res.data.createTime = weChatTimeFormat(res.data.createTime)
				res.data.updateTime = weChatTimeFormat(res.data.updateTime)
				setTimeout(() => {
					this.notesDetail = res.data
					this.swipperCount = res.data.notesResources.length
				}, 500)
			})
		}
	}
</script>

<style scoped>
	.authorName {
		color: #2b2b2b;
		font-size: 15px;
		margin-left: 20rpx;
		width: 350rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/deep/ .uni-swiper-dots {
		bottom: 30rpx;
	}
</style>