<template>
	<view>
		<view :style="{height:statusBarHeight+'px'}" style="position: fixed;z-index: 1;width: 100%;"></view>
		<view :style="{top: statusBarHeight+'px'}"
			style="display: flex;height: 44px;align-items: center;position: fixed;z-index: 1;width: 100%;">
			<u-icon name="arrow-left" size="21" style="margin-left: 20rpx;" @click="backLastPage"></u-icon>
			<image mode="aspectFill" style="height: 34px;width: 34px;border-radius: 50%;margin-left: 15rpx;"
				:src="targetUser.avatarUrl">
			</image>
			<view style="margin-left: 15rpx;">
				<view style="font-size: 33rpx;color: #2b2b2b;">{{targetUser.userName}}</view>
				<view style="color: #95949a;font-size: 26rpx;">今天在线</view>
			</view>
			<view style="margin-left: auto;margin-right: 15px;">
				<u-icon name="more-dot-fill" color="#2b2b2b" size="26"></u-icon>
			</view>
		</view>
		<view :style="{height: statusBarHeight+44+'px'}"></view>
		<scroll-view>
			<view v-for="(item,index) in messageList" v-bind:key="item.id">
				<view v-if="item.showTime" style="text-align: center;margin: 15rpx;font-size: 25rpx;color: #95949a;">
					{{item.time}}
				</view>
				<view v-if="item.fromId===targetUser.userId"
					style="display: flex;padding: 20rpx;justify-content: flex-start;">
					<view style="margin-left: 15rpx;">
						<image mode="aspectFill" style="height: 80rpx;width: 80rpx;border-radius: 50%;"
							:src="targetUser.avatarUrl">
						</image>
					</view>
					<view
						style="padding:15rpx;background-color: aqua;display: flex;margin-left: 15rpx;margin-right:110rpx;background-color: #ffffff;border-radius: 30rpx;">
						<view
							style="margin-right: auto;max-width: 460rpx;color:#000000;word-wrap: break-word;word-break: break-all;">
							{{item.content}}
						</view>
					</view>
				</view>
				<view v-else style="display: flex;padding: 20rpx;justify-content: flex-end;">
					<view
						style="padding:15rpx;display: flex;background-color: #518FF1;border-radius: 30rpx;margin-right: 15rpx;">
						<view
							style="margin-left: auto;max-width: 460rpx;color:#ffffff;word-wrap: break-word;word-break: break-all;">
							{{item.content}}
						</view>
					</view>
					<view style="margin-right: 15rpx;">
						<image mode="aspectFill" style="height: 80rpx;width: 80rpx;border-radius: 50%;"
							:src="targetUser.avatarUrl">
						</image>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		timestampFormat,
		weChatTimeFormat,
		transData
	} from '@/utils/util.js'
	export default {
		data() {
			return {
				statusBarHeight: '',
				targetUser: {
					userId: '',
					userName: '',
					avatarUrl: ''
				},
				messageList: [],
				page: 1,
			};
		},
		methods: {
			backLastPage() {
				uni.navigateBack({
					delta: 1
				})
			},
			getChatHistory(page) {
				let offset = (page - 1) * 15
				let sql = `select * from chat_${this.targetUser.userId} order by id desc limit 15 offset ${offset}`
				this.$sqliteUtil.SqlSelect(sql).then(res => {
					res = res.reverse()
					for (let i = 0; i < res.length; i++) {
						// 设置显示时间
						res[i].showTime = true
						if (res[i - 1]) {
							console.log(res[i].time)
							console.log(res[i - 1].time)
							console.log(res[i].time - res[i - 1].time)
							// 如果两条消息时间间隔小于2分钟则不显示时间
							if (res[i].time - res[i - 1].time < 120000) {
								res[i].showTime = false
							}
						}
					}
					res.forEach(item => {
						item.time = weChatTimeFormat(item.time)
					})
					res = transData(res)
					console.log(res)
					this.messageList.unshift(...res)
					console.log(this.messageList)
				})
			}
		},
		onLoad(options) {
			this.targetUser.userId = options.userId
			this.targetUser.userName = options.userName
			this.targetUser.avatarUrl = options.avatarUrl
			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = res.statusBarHeight
				}
			})
			this.getChatHistory(1)
			uni.$on('updateChatRecord', () => {
				let sql1=`select * from chat_${this.targetUser.userId} order by id desc limit 1`
				this.$sqliteUtil.SqlSelect(sql1).then(res=>{
					res = transData(res)
					res[0].time = weChatTimeFormat(res[0].time)
					this.messageList.push(res[0])
				})
			})
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
</style>