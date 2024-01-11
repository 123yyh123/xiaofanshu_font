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
		<u-notify ref="uNotify"></u-notify>
		<scroll-view id="scrollChat" scroll-y :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop"
			:style="{height: chatMsgHeight+'px'}" @scrolltoupper="getChatHistory(page)" upper-threshold="100"
			@click="closeEmoji">
			<view id="scrollMsg">
				<u-loadmore v-if="msgLoading==='nomore'" :status="msgLoading" line font-size="12" />
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
						<view v-if="item.chatType===1"
							style="padding:15rpx;background-color: aqua;display: flex;margin-left: 15rpx;margin-right:110rpx;background-color: #ffffff;border-radius: 30rpx;">
							<rich-text
								style="margin-right: auto;max-width: 460rpx;color: #2b2b2b;word-wrap: break-word;word-break: break-all;"
								:nodes="item.content"></rich-text>
						</view>
						<view v-else-if="item.chatType===2">
							<rich-text :nodes="item.content"></rich-text>
						</view>
					</view>
					<view v-else style="display: flex;padding: 20rpx;justify-content: flex-end;align-items: center;">
						<view style="margin-right: 20rpx;">
							<u-icon v-if="item.isSend===2" name="error-circle-fill" color="#E43D30" size="20"></u-icon>
							<u-loading-icon size="17" :show="item.isSend===0"></u-loading-icon>
						</view>
						<view v-if="item.chatType===1"
							style="padding:15rpx;display: flex;background-color: #518FF1;border-radius: 30rpx;margin-right: 15rpx;">
							<rich-text
								style="margin-left: auto;max-width: 460rpx;color:#ffffff;word-wrap: break-word;word-break: break-all;"
								:nodes="item.content"></rich-text>
						</view>
						<view v-else-if="item.chatType===2">
							<rich-text :nodes="item.content"></rich-text>
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

		<view
			style="display: flex;padding: 20rpx;align-items: flex-end;height: 100px;box-sizing: border-box;width: 100%;">
			<view style="background-color: #ffffff;padding: 20rpx;border-radius: 20rpx;flex: 1;">
				<textarea v-model="messageValue" style="width: 100%;caret-color: #F56C6C;color: #2b2b2b;"
					placeholder="请输入消息内容" auto-height :adjust-position="false" @focus="focus" @blur="blur" auto-blur
					:focus="fo" :cursor="cursor"></textarea>
			</view>
			<view style="margin-left: 20rpx;" @click="openEmoji">
				<image src="../../static/image/表情.png" style="width: 70rpx;" mode="widthFix"></image>
			</view>
			<u-transition :show="!isShowSend" mode="slide-down" :duration="300"
				style="display: flex;padding-top: 5rpx;padding-bottom: 5rpx;">
				<image src="../../static/image/加 (1).png" style="width: 79rpx;" mode="widthFix"></image>
			</u-transition>
			<u-transition :show="isShowSend" mode="fade-right" :duration="700" style="margin-left: 10rpx;">
				<u-button type="error" text="发送" @click="sendMessage"></u-button>
			</u-transition>
		</view>
		<scroll-view v-if="showEmoji" :style="{height: keyboardHeight+'px'}" scroll-y
			style="background-color: aliceblue;">
			<view style="display: flex;flex-wrap: wrap;padding: 20rpx;justify-content: space-around;">
				<block v-for="(item,index) in emojiList" v-bind:key="index">
					<view style="margin: 20rpx;" @click="addEmoji(item.name)">
						<image :src="item.url" style="width: 100rpx;height: 100rpx;" mode="widthFix" lazy-load></image>
					</view>
				</block>
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
	import {
		emojiList
	} from '@/utils/emojiUtil.js'
	export default {
		data() {
			return {
				statusBarHeight: '',
				chatMsgHeight: '',
				keyboardHeight: 302,
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
				msgLoading: 'loading',
				scrollAnimation: false,
				messageValue: '',
				showEmoji: false,
				fo: false,
				emojiList: emojiList,
				cursor: 0
			};
		},
		methods: {
			addEmoji(name) {
				name = '[' + name + 'XFS]'
				this.messageValue = this.messageValue.slice(0, this.cursor) + name + this.messageValue.slice(this.cursor)
				this.cursor = this.cursor + name.length
				this.fo = true
			},
			openEmoji() {
				if (this.showEmoji) {
					return
				}
				this.chatMsgHeight = this.chatMsgHeight - this.keyboardHeight
				this.scrollToBottom()
				this.showEmoji = true
			},
			closeEmoji() {
				if (this.showEmoji) {
					this.chatMsgHeight = this.chatMsgHeight + this.keyboardHeight
					this.scrollToBottom()
					this.showEmoji = false
				}
				this.fo = false
			},
			sendMessage() {
				// 发送消息
				if (this.messageValue.trim() == '') {
					return
				}
				let chatType = 1
				// 将content里面的[表情 XFS]转换为 <image> 若消息里没有其他内容，只有一个表情，设置聊天类型为2
				const reg = /^\[[\u4e00-\u9fa5]{1,7}XFS\]$/;
				let content = this.messageValue.trim();

				if (reg.test(content)) {
					chatType = 2;
					content = content.replace(/^\[[\u4e00-\u9fa5]{1,7}XFS\]$/, function(match) {
						let emojiName = match.slice(1, match.length - 4);
						let emojiUrl = '';
						emojiList.forEach(item => {
							if (item.name == emojiName) {
								emojiUrl = item.url;
							}
						});
						return `<img src='${emojiUrl}' style='width: 120px;height: 120px;'></img>`;
					});
				} else {
					content = content.replace(/\[[\u4e00-\u9fa5]{1,7}XFS\]/g, function(match) {
						let emojiName = match.slice(1, match.length - 4);
						let emojiUrl = '';
						emojiList.forEach(item => {
							if (item.name == emojiName) {
								emojiUrl = item.url;
							}
						});
						return `<img src='${emojiUrl}' style='width: 30px;height: 30px;'></img>`;
					});
				}
				let s2 = `create table if not exists chat_${this.targetUser.userId} (
				id integer primary key autoincrement, 
				from_id text, 
				to_id text, 
				content text, 
				time integer, 
				chat_type integer, 
				is_read integer,
				is_send integer);`
				this.$sqliteUtil.SqlExecute(s2).then(res => {
					let sql =
						`insert into chat_${this.targetUser.userId} (from_id,to_id,content,time,chat_type,is_read,is_send) values ('${this.userInfo.userId}','${this.targetUser.userId}',"${content}",${new Date().getTime()},${chatType},1,0)`
					this.$sqliteUtil.SqlExecute(sql).then(res => {
						let sql1 = `select * from chat_${this.targetUser.userId} order by id desc limit 1`
						this.$sqliteUtil.SqlSelect(sql1).then(res => {
							res = transData(res)
							res[0].time = weChatTimeFormat(res[0].time)
							this.messageValue = ''
							this.messageList.push(res[0])
							this.scrollToBottom()
							console.log(this.messageList)
							this.$ws.send({
								id: res[0].id,
								from: this.userInfo.userId,
								fromName: this.userInfo.userName,
								fromAvatar: this.userInfo.avatarUrl,
								to: this.targetUser.userId,
								content: content,
								time: new Date().getTime(),
								messageType: 3,
								chatType: chatType,
								friendType: 0
							})
						})
					})
				})
				// 更新消息列表
				let sql2 = `select * from message_list where user_id='${this.targetUser.userId}'`
				this.$sqliteUtil.SqlSelect(sql2).then(res => {
					if (res.length == 0) {
						let sql3 =
							`insert into message_list (user_id,avatar_url,user_name,last_message,last_time,unread_num,stranger) values ('${this.targetUser.userId}','${this.targetUser.avatarUrl}','${this.targetUser.userName}',"${this.messageValue}",${new Date().getTime()},0,0)`
						this.$sqliteUtil.SqlExecute(sql3)
					} else {
						let sql4 =
							`update message_list set last_message="${this.messageValue}",last_time=${new Date().getTime()} where user_id='${this.targetUser.userId}'`
						this.$sqliteUtil.SqlExecute(sql4)
					}
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
					this.messageList.unshift(...res)
					console.log(this.messageList)
					if (res.length < 15) {
						this.msgLoading = 'nomore'
					} else {
						this.msgLoading = 'loading'
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
				console.log(e)
				this.cursor = e.detail.cursor
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
			uni.$on('updateMsgStatus', (data) => {
				console.log(data)
				for (let i = this.messageList.length - 1; i >= 0; i--) {
					if (this.messageList[i].id == data.id) {
						console.log('找到了')
						this.messageList[i].isSend = data.status
						this.$set(this.messageList, i, this.messageList[i])
						if (data.status == 2) {
							console.log('发送失败')
							this.$refs.uNotify.show({
								type: 'error',
								message: data.content,
								duration: 1500,
								safeAreaInsetTop: true
							})
						}
						break
					}
				}
			})
		},
	}
</script>
<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
</style>
<style lang="scss" scoped>
	::v-deep .uni-textarea-wrapper {
		max-height: 70px;
	}

	::v-deep .u-tag {
		border-style: none;
	}
</style>