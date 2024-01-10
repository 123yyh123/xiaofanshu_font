<template>
	<view>
		<view :style="{height:statusBarHeight+'px'}" style="position: fixed;z-index: 100;width: 100%;"></view>
		<view :style="{top: statusBarHeight+'px'}"
			style="display: flex;height: 44px;align-items: center;position: fixed;z-index: 100;width: 100%;">
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
		<scroll-view id="scrollChat" scroll-y :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop"
			:style="{height: chatMsgHeight+'px'}" @scrolltoupper="getChatHistory(page)" :upper-threshold='100'>
			<view id="scrollMsg">
				<u-loadmore :status="msgLoading" />
				<view v-for="(item,index) in messageList" v-bind:key="item.id">
					<view v-if="item.showTime"
						style="text-align: center;margin: 15rpx;font-size: 25rpx;color: #95949a;">
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
								:src="userInfo.avatarUrl">
							</image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view style="display: flex;padding: 20rpx;align-items: flex-end;height: 100px;box-sizing: border-box;">
			<view style="background-color: #ffffff;padding: 20rpx;border-radius: 20rpx;flex: 1;">
				<textarea v-model="messageValue" style="width: 100%;" placeholder="请输入消息内容" auto-height
					:adjust-position="false" @focus="focus" @blur="blur" auto-blur></textarea>
			</view>
			<view style="margin-left: 20rpx;">
				<image src="../../static/image/表情.png" style="width: 70rpx;" mode="widthFix"></image>
			</view>
			<!-- <view v-if="!isShowSend"> -->
			<u-transition :show="!isShowSend" mode="slide-down" :duration="300"
				style="display: flex;padding-top: 5rpx;padding-bottom: 5rpx;">
				<image src="../../static/image/加 (1).png" style="width: 79rpx;" mode="widthFix"></image>
			</u-transition>
			<!-- </view> -->
			<u-transition :show="isShowSend" mode="fade-right" :duration="700" style="margin-left: 10rpx;">
				<u-button type="error" text="发送" @click="sendMessage"></u-button>
			</u-transition>
		</view>
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
				chatMsgHeight: '',
				keyboardHeight: '',
				isShowSend: false,
				targetUser: {
					userId: '',
					userName: '',
					avatarUrl: ''
				},
				userInfo: {
					userId: '',
					userName: '',
					avatarUrl: ''
				},
				messageList: [],
				page: 1,
				scrollTop: 0,
				msgLoading: 'loadmore',
				scrollAnimation: false,
				messageValue: ''
			};
		},
		methods: {
			sendMessage() {
				// 发送消息
				if (this.messageValue.trim() == '') {
					return
				}
				let sql =
					`insert into chat_${this.targetUser.userId} (from_id,to_id,content,time,chat_type,is_read,is_send) values ('${this.userInfo.userId}','${this.targetUser.userId}','${this.messageValue}',${new Date().getTime()},1,1,1)`
				this.$sqliteUtil.SqlExecute(sql).then(res => {
					let sql1 = `select * from chat_${this.targetUser.userId} order by id desc limit 1`
					this.$sqliteUtil.SqlSelect(sql1).then(res => {
						let s = this.$ws.send({
							id: res[0].id,
							from: this.userInfo.userId,
							fromName: this.userInfo.userName,
							fromAvatar: this.userInfo.avatarUrl,
							to: this.targetUser.userId,
							content: this.messageValue,
							time: new Date().getTime(),
							messageType: 3,
							chatType: 1
						})
						res = transData(res)
						res[0].time = weChatTimeFormat(res[0].time)
						this.messageValue = ''
						this.messageList.push(res[0])
						this.scrollToBottom()
					})
				})
			},
			backLastPage() {
				uni.navigateBack({
					delta: 1
				})
			},
			getChatHistory(page) {
				if (this.msgLoading == 'nomore') {
					return
				}
				this.msgLoading = 'loading'
				let offset = (page - 1) * 15
				let sql = `select * from chat_${this.targetUser.userId} order by id desc limit 15 offset ${offset}`
				this.$sqliteUtil.SqlSelect(sql).then(res => {
					res = res.reverse()
					for (let i = 0; i < res.length; i++) {
						// 设置显示时间
						res[i].showTime = true
						if (res[i - 1]) {
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
					if (res.length < 15) {
						this.msgLoading = 'nomore'
					} else {
						this.msgLoading = 'loadmore'
						this.page++
					}
				})
			},
			// 使页面滚动到底部
			scrollToBottom() {
				setTimeout(() => {
					let query = uni.createSelectorQuery()
					query.select('#scrollChat').boundingClientRect()
					query.select('#scrollMsg').boundingClientRect()
					query.exec((res) => {
						console.log(res)
						if (res[1].height > res[0].height) {
							this.scrollTop = res[1].height - res[0].height
						}
					})
				}, 100)
			},
			focus(e) {
				console.log(e.detail.height)
				this.keyboardHeight = e.detail.height
				this.chatMsgHeight = this.chatMsgHeight - e.detail.height
				this.scrollToBottom()
			},
			blur(e) {
				this.chatMsgHeight = this.chatMsgHeight + this.keyboardHeight
				this.scrollToBottom()
			},
		},
		watch: {
			// 监听messageValue的值，如果有值则显示发送按钮
			messageValue(val) {
				if (val) {
					this.isShowSend = true
				} else {
					this.isShowSend = false
				}
			}
		},
		onLoad(options) {
			this.targetUser.userId = options.userId
			this.targetUser.userName = options.userName
			this.targetUser.avatarUrl = options.avatarUrl
			this.userInfo.userId = uni.getStorageSync('userInfo').id
			this.userInfo.userName = uni.getStorageSync('userInfo').nickname
			this.userInfo.avatarUrl = uni.getStorageSync('userInfo').avatarUrl
			uni.getSystemInfo({
				success: (res) => {
					console.log(res)
					this.statusBarHeight = res.statusBarHeight
					this.chatMsgHeight = res.screenHeight - res.statusBarHeight - 44 - 100
				}
			})
			this.getChatHistory(1)
			this.scrollToBottom()
			setTimeout(() => {
				this.scrollToBottom()
			}, 200)
			uni.$on('updateChatRecord', () => {
				let sql1 = `select * from chat_${this.targetUser.userId} order by id desc limit 1`
				this.$sqliteUtil.SqlSelect(sql1).then(res => {
					res = transData(res)
					res[0].time = weChatTimeFormat(res[0].time)
					this.messageList.push(res[0])
					this.scrollToBottom()
				})
			})
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	/deep/ .uni-textarea-wrapper {
		max-height: 70px;
	}
</style>