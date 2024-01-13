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
			@click="closeME">
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
						<!-- 文本消息 -->
						<view v-if="item.chatType===1"
							style="padding:15rpx;display: flex;margin-left: 15rpx;margin-right:110rpx;background-color: #ffffff;border-radius: 30rpx;">
							<rich-text
								style="margin-right: auto;max-width: 460rpx;color: #2b2b2b;word-wrap: break-word;word-break: break-all;"
								:nodes="item.content"></rich-text>
						</view>
						<!-- 图片消息 -->
						<view v-else-if="item.chatType===2" style="padding: 15rpx;margin-left: 15rpx;">
							<rich-text @click="preImage" :nodes="item.content" :data-node="item.content"></rich-text>
						</view>
						<!-- 语音消息 -->
						<view v-else-if="item.chatType===4" :style="{width: handleVoiceWidth(item.audioTime)}"
							@tap="playAudio(item)"
							style="padding:15rpx;display: flex;margin-left: 15rpx;margin-right:110rpx;background-color: #ffffff;border-radius: 30rpx;">
							<view style="display: flex;align-items: center;">
								<a-trumpet :isPlay="currentPlay===item.id" direction="right" color="#2b2b2b" :size="30"></a-trumpet>
								<view>{{item.audioTime}}"</view>
							</view>
						</view>
					</view>
					<view v-else
						style="display: flex;padding: 20rpx;justify-content: flex-end;align-items: flex-start;">
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
						<view v-else-if="item.chatType===2" style="padding:15rpx;padding-right: 15rpx;">
							<rich-text @click="preImage" :nodes="item.content" :data-node="item.content"></rich-text>
						</view>
						<view v-else-if="item.chatType===4" :style="{width: handleVoiceWidth(item.audioTime)}"
							@tap="playAudio(item)"
							style="padding:15rpx;display: flex;background-color: #518FF1;border-radius: 30rpx;margin-right: 15rpx;">
							<view style="display: flex;align-items: center;margin-left: auto;">
								<view style="color: #ffffff;">{{item.audioTime}}"</view>
								<a-trumpet :isPlay="currentPlay===item.id" direction="left" color="#ffffff" :size="30"></a-trumpet>
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

		<view
			style="display: flex;padding: 20rpx;align-items: flex-end;height: 100px;box-sizing: border-box;width: 100%;">
			<view style="background-color: #ffffff;padding: 20rpx;border-radius: 20rpx;flex: 1;">
				<textarea v-model="messageValue" style="width: 100%;caret-color: #F56C6C;color: #2b2b2b;"
					placeholder="请输入消息内容" auto-height :adjust-position="false" @focus="focus" @blur="blur" auto-blur
					:cursor="cursor"></textarea>
			</view>
			<view style="margin-left: 20rpx;" @click="openEmoji">
				<image src="../../static/image/表情.png" style="width: 70rpx;" mode="widthFix"></image>
			</view>
			<u-transition :show="!isShowSend" mode="slide-down" :duration="300"
				style="display: flex;padding-top: 5rpx;padding-bottom: 5rpx;" @click="openMore">
				<image src="../../static/image/加 (1).png" style="width: 79rpx;" mode="widthFix"></image>
			</u-transition>
			<u-transition :show="isShowSend" mode="fade-right" :duration="700" style="margin-left: 10rpx;">
				<u-button type="error" text="发送" @click="sendMessage"></u-button>
			</u-transition>
		</view>
		<u-popup :show="showRecordPop" mode="bottom" :round="10" @close="closeRecordPop"
			customStyle="background-color: #f5f5f5">
			<view
				style="text-align: center;padding: 30rpx;padding-bottom: 10rpx;display: flex;flex-direction: column;justify-content:center;">
				<view :class="['mic-layer',{'mic-layer-talking':isTalking}]">
					<!-- 按钮样式 -->
					<view :class="isTalking?'mic-btn-talking':'mic-btn'" @touchstart="touchStart" @touchend="onEnd"
						@longpress="onStart" @touchmove="handleRecordMove">
						<view v-show="!isTalking">
							<image src="../../static/image/录音 (1).png" style="height: 100px;" mode="heightFix"></image>
						</view>
						<view v-show="isTalking" class="mic-btn-talking_text">说话中...</view>
						<view v-show="isTalking&&!sendLock" class="tip-text"><text class="mr-10">松开</text>发送</view>
					</view>
					<!-- 语音音阶动画 -->
					<view v-if="isTalking" :class="['record-animate-box',{'active':sendLock}]">
						<view class="voice-scale">
							<view class="item" v-for="(item,index) in 10" :key="index"></view>
						</view>
					</view>
					<!-- 取消发送 -->
					<view v-if="isTalking" :class="['record-cancel',{'active':sendLock}]">
						<text class="close-icon">x</text>
						<view class="tip-text" v-show="sendLock"><text class="mr-10">松开</text>取消</view>
					</view>
				</view>
				<view style="margin-top: 30rpx;">按住开始录音</view>
			</view>
		</u-popup>
		<view v-if="showEmoji">
			<scroll-view :style="{height: keyboardHeight+'px'}" scroll-y style="background-color: aliceblue;">
				<view
					style="display: grid;padding: 20rpx;;grid-template-columns: repeat(5,1fr);gap: 20rpx;text-align: center;">
					<block v-for="(item,index) in emojiList" v-bind:key="index">
						<view @click="addEmoji(item.name)">
							<image :src="item.url" style="width: 100rpx;height: 100rpx;" mode="widthFix" lazy-load>
							</image>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<view v-if="showMore" :style="{height: keyboardHeight+'px'}" style="background-color: #f5f5f5;color: #2b2b2b;">
			<view
				style="display: grid;text-align: center;;grid-template-columns: repeat(4,1fr);padding: 20rpx;gap: 20rpx;row-gap: 50rpx;">
				<view style="text-align: center;" @click="chooseImage">
					<view style="padding: 30rpx 40rpx;background-color: #ffffff;border-radius: 30rpx;">
						<image src="../../static/image/相册 (1).png" style="width: 80rpx;border-radius: 20rpx;"
							mode="widthFix"></image>
					</view>
					<view>相册</view>
				</view>
				<view style="text-align: center;" @click="takePhoto">
					<view style="padding: 30rpx 40rpx;background-color: #ffffff;border-radius: 30rpx;">
						<image src="../../static/image/拍照.png" style="width: 80rpx;border-radius: 20rpx;"
							mode="widthFix">
						</image>
					</view>
					<view>拍照</view>
				</view>
				<view style="text-align: center;">
					<view style="padding: 30rpx 40rpx;background-color: #ffffff;border-radius: 30rpx;">
						<image src="../../static/image/电话.png" style="width: 80rpx;border-radius: 20rpx;"
							mode="widthFix">
						</image>
					</view>
					<view>电话</view>
				</view>
				<view style="text-align: center;">
					<view style="padding: 30rpx 40rpx;background-color: #ffffff;border-radius: 30rpx;">
						<image src="../../static/image/文件.png" style="width: 80rpx;border-radius: 20rpx;"
							mode="widthFix">
						</image>
					</view>
					<view>文件</view>
				</view>
				<view style="text-align: center;flex-basis: calc((100% - 3 * 20rpx) / 4);"
					@click="showRecordPop = true">
					<view style="padding: 30rpx 40rpx;background-color: #ffffff;border-radius: 30rpx;">
						<image src="../../static/image/语音 (1).png" style="width: 80rpx;border-radius: 20rpx;"
							mode="widthFix">
						</image>
					</view>
					<view>语音</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const innerAudioContext = uni.createInnerAudioContext();
	import {
		timestampFormat,
		weChatTimeFormat,
		transData,
		replaceImageMessage,
	} from '@/utils/util.js'
	import {
		emojiList
	} from '@/utils/emojiUtil.js'
	import {
		baseUrl
	} from '@/config/index.js'
	import {
		zoomOutImage
	} from '@/utils/fileUtil.js'
	export default {
		data() {
			return {
				isTalking: false, // 是否正在讲话
				sendLock: false, // 语音是否发送锁，true-不发送，false-发送（用于上滑取消发送）
				record: null, // 语音对象
				startPoint: {}, //记录长按录音开始点信息,用于后面计算滑动距离。
				timer: null, // 计时器
				leng: 0, // 计时器时间
				currentPlay: '', // 当前播放的语音id
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
				// fo: false,
				emojiList: [],
				cursor: 0,
				showMore: false,
				showRecordPop: false,
			};
		},
		methods: {
			playAudio(item) {
				if (this.currentPlay === item.id) {
					innerAudioContext.pause()
					this.currentPlay = ''
					return
				}
				if (this.currentPlay !== '') {
					innerAudioContext.stop()
				}
				this.currentPlay = item.id
				innerAudioContext.src = item.content
				innerAudioContext.play()
				innerAudioContext.onEnded(() => {
					this.currentPlay = ''
				})
			},
			/**
			 * 开始录音
			 */
			onStart() {
				const option = {
					format: 'mp3'
				}
				console.log('start');
				this.isTalking = true
				uni.vibrateShort(); // 震动
				this.leng = 0
				this.timer = setInterval(() => {
					this.leng++
					if (this.leng >= 60) {
						this.onEnd()
						return
					}
				}, 1000)
				this.record.start(option)
				this.record.onStart(res => {
					console.log('start', res);
				})
				this.record.onError(res => {
					console.log('录音错误事件：', res);
				})
			},
			/**
			 * 结束录音
			 */
			onEnd() {
				this.isTalking = false
				this.record.stop()
				clearTimeout(this.timer)
				this.record.onStop(res => {
					console.log(res, "录音回调地址");
					if (this.sendLock) {
						this.sendLock = false // 恢复锁状态
						console.log('取消发送');
						return
					} // 取消发送
					if (res.duration < 1000) {
						uni.showToast({
							icon: 'error',
							title: '说话时间太短'
						})
						return
					}
					uni.uploadFile({
						url: baseUrl + '/third/uploadAudio',
						filePath: res.tempFilePath,
						name: 'file',
						header: {
							'token': uni.getStorageSync('token')
						},
						success: (res) => {
							let data = JSON.parse(res.data)
							if (data.code == 20020) {
								console.log(data)
								this.sendAudio(data.data, this.leng)
							}
						}
					})
				})
			},
			sendAudio(url, time) {
				let sql1 = `create table if not exists chat_${this.targetUser.userId} (
				id integer primary key autoincrement, 
				from_id text, 
				to_id text, 
				content text, 
				time integer, 
				chat_type integer, 
				is_read integer,
				is_send integer,
				audio_time integer);`
				this.$sqliteUtil.SqlExecute(sql1).then(res => {
					let content = url
					let sql2 =
						`insert into chat_${this.targetUser.userId} (from_id,to_id,content,time,chat_type,is_read,is_send,audio_time) values ('${this.userInfo.userId}','${this.targetUser.userId}',"${content}",${new Date().getTime()},4,1,0,${time})`
					this.$sqliteUtil.SqlExecute(sql2).then(res => {
						let sql3 =
							`select * from chat_${this.targetUser.userId} order by id desc limit 1`
						this.$sqliteUtil.SqlSelect(sql3).then(res => {
							res = transData(res)
							res[0].time = weChatTimeFormat(res[0].time)
							this.messageList.push(res[0])
							this.scrollToBottom()
							this.$ws.send({
								id: res[0].id,
								from: this.userInfo.userId,
								fromName: this.userInfo.userName,
								fromAvatar: this.userInfo.avatarUrl,
								to: this.targetUser.userId,
								content: content,
								time: new Date().getTime(),
								messageType: 3,
								chatType: 4,
								friendType: 0,
								audioTime: time
							})
						})
					})
				})
				let sql4 = `select * from message_list where user_id='${this.targetUser.userId}'`
				this.$sqliteUtil.SqlSelect(sql4).then(res => {
					if (res.length == 0) {
						let sql5 =
							`insert into message_list (user_id,avatar_url,user_name,last_message,last_time,unread_num,stranger) values ('${this.targetUser.userId}','${this.targetUser.avatarUrl}','${this.targetUser.userName}',"[语音]",${new Date().getTime()},0,0)`
						this.$sqliteUtil.SqlExecute(sql5)
					} else {
						let sql6 =
							`update message_list set last_message="[语音]",last_time=${new Date().getTime()},unread_num=0 where user_id='${this.targetUser.userId}'`
						this.$sqliteUtil.SqlExecute(sql6)
					}
				})
			},
			/**
			 * 开始触屏
			 * @param {Object} e
			 */
			touchStart(e) {
				this.startPoint.clientX = e.changedTouches[0].clientX; //手指按下时的X坐标
				this.startPoint.clientY = e.changedTouches[0].clientY; //手指按下时的Y坐标
			},
			/**
			 * 录音时手指滑动
			 * @param {Object} e
			 */
			handleRecordMove(e) {
				let touchData = e.touches[0]; //滑动过程中，手指滑动的坐标信息
				let moveX = touchData.clientX - this.startPoint.clientX;
				let moveY = touchData.clientY - this.startPoint.clientY;
				if (moveY > -45) { // 滑动距离不够则不取消发送
					this.sendLock = false
				} else {
					this.sendLock = true
				}
			},
			// 处理语音长度
			handleVoiceWidth(lenght) {
				lenght = lenght - 1;
				let Lmin = 138;
				let Lmax = 366
				let barCanChangeLen = Lmax - Lmin;

				// 11秒以内的语音
				if (lenght < 11) {
					// VoicePlayTimes 为10秒时，正好为可变长度的一半
					return (Lmin + lenght * 0.05 * barCanChangeLen) + 'rpx';
				} else {
					// 12-60秒的语音
					return (Lmin + 0.5 * barCanChangeLen + (lenght - 10) * 0.01 * barCanChangeLen) + 'rpx';
				}
			},
			closeRecordPop() {
				this.showRecordPop = false
			},
			takePhoto() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['camera'],
					success: (res) => {
						res.tempFilePaths.forEach(item => {
							uni.uploadFile({
								url: baseUrl + '/third/uploadImg',
								filePath: item,
								name: 'file',
								header: {
									'token': uni.getStorageSync('token')
								},
								success: (res) => {
									let data = JSON.parse(res.data)
									if (data.code == 20020) {
										console.log(data)
										this.sendImage(data.data)
									}
								}

							})
						})
					}
				})
			},
			preImage(e) {
				let s = e.target.dataset.node
				// <img src='${url}' style='max-width: 200px;height: auto;'></img>`
				// 使用正则表达式匹配<img>标签中的src属性值
				const srcRegex = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/;
				const match = s.match(srcRegex);
				if (match) {
					const imgSrc = match[1];
					uni.previewImage({
						urls: [imgSrc]
					});
				}

			},
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						res.tempFilePaths.forEach(item => {
							uni.uploadFile({
								url: baseUrl + '/third/uploadImg',
								filePath: item,
								name: 'file',
								header: {
									'token': uni.getStorageSync('token')
								},
								success: (res) => {
									let data = JSON.parse(res.data)
									if (data.code == 20020) {
										console.log(data)
										this.sendImage(data.data)
									}
								}

							})
						})
					}
				})
			},
			sendImage(url) {
				let sql1 = `create table if not exists chat_${this.targetUser.userId} (
				id integer primary key autoincrement, 
				from_id text, 
				to_id text, 
				content text, 
				time integer, 
				chat_type integer, 
				is_read integer,
				is_send integer,
				audio_time integer);`
				this.$sqliteUtil.SqlExecute(sql1).then(res => {
					zoomOutImage(url).then(result => {
						console.log(result)
						let content =
							`<img src='${result.src}' style='width: ${result.width}px;height: ${result.height}px;'></img>`
						let sql2 =
							`insert into chat_${this.targetUser.userId} (from_id,to_id,content,time,chat_type,is_read,is_send,audio_time) values ('${this.userInfo.userId}','${this.targetUser.userId}',"${content}",${new Date().getTime()},2,1,0,0)`
						this.$sqliteUtil.SqlExecute(sql2).then(res => {
							let sql3 =
								`select * from chat_${this.targetUser.userId} order by id desc limit 1`
							this.$sqliteUtil.SqlSelect(sql3).then(res => {
								res = transData(res)
								res[0].time = weChatTimeFormat(res[0].time)
								this.messageList.push(res[0])
								this.scrollToBottom()
								this.$ws.send({
									id: res[0].id,
									from: this.userInfo.userId,
									fromName: this.userInfo.userName,
									fromAvatar: this.userInfo.avatarUrl,
									to: this.targetUser.userId,
									content: content,
									time: new Date().getTime(),
									messageType: 3,
									chatType: 2,
									friendType: 0,
									audioTime: 0
								})
							})
						})
					})
				})
				let sql4 = `select * from message_list where user_id='${this.targetUser.userId}'`
				this.$sqliteUtil.SqlSelect(sql4).then(res => {
					if (res.length == 0) {
						let sql5 =
							`insert into message_list (user_id,avatar_url,user_name,last_message,last_time,unread_num,stranger) values ('${this.targetUser.userId}','${this.targetUser.avatarUrl}','${this.targetUser.userName}',"[图片]",${new Date().getTime()},0,0)`
						this.$sqliteUtil.SqlExecute(sql5)
					} else {
						let sql6 =
							`update message_list set last_message="[图片]",last_time=${new Date().getTime()} where user_id='${this.targetUser.userId}'`
						this.$sqliteUtil.SqlExecute(sql6)
					}
				})
			},
			openMore() {
				if (this.showMore) {
					this.showMore = false
					this.chatMsgHeight = this.chatMsgHeight + this.keyboardHeight
					this.scrollToBottom()
					return
				} else {
					if (this.showEmoji) {
						this.showEmoji = false
						this.chatMsgHeight = this.chatMsgHeight + this.keyboardHeight
						this.scrollToBottom()
					}
					this.showMore = true
					this.chatMsgHeight = this.chatMsgHeight - this.keyboardHeight
					this.scrollToBottom()
				}
			},
			addEmoji(name) {
				name = '[' + name + 'XFS]'
				this.messageValue = this.messageValue.slice(0, this.cursor) + name + this.messageValue.slice(
					this
					.cursor)
				this.cursor = this.cursor + name.length
			},
			openEmoji() {
				if (this.showEmoji) {
					return
				}
				if (this.showMore) {
					this.showMore = false
					this.chatMsgHeight = this.chatMsgHeight + this.keyboardHeight
					this.scrollToBottom()
				}
				this.chatMsgHeight = this.chatMsgHeight - this.keyboardHeight
				this.scrollToBottom()
				this.showEmoji = true
			},
			closeME() {
				if (this.showEmoji && this.showMore) {
					this.showEmoji = false
					this.showMore = false
					this.chatMsgHeight = this.chatMsgHeight + this.keyboardHeight
					this.scrollToBottom()
					return
				}
				if (this.showEmoji) {
					this.showEmoji = false
					this.chatMsgHeight = this.chatMsgHeight + this.keyboardHeight
					this.scrollToBottom()
					return
				}
				if (this.showMore) {
					this.showMore = false
					this.chatMsgHeight = this.chatMsgHeight + this.keyboardHeight
					this.scrollToBottom()
					return
				}

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
				is_send integer,
				audio_time integer);`
				this.$sqliteUtil.SqlExecute(s2).then(res => {
					let sql =
						`insert into chat_${this.targetUser.userId} (from_id,to_id,content,time,chat_type,is_read,is_send,audio_time) values ('${this.userInfo.userId}','${this.targetUser.userId}',"${content}",${new Date().getTime()},${chatType},1,0,0)`
					this.$sqliteUtil.SqlExecute(sql).then(res => {
						let sql1 =
							`select * from chat_${this.targetUser.userId} order by id desc limit 1`
						this.$sqliteUtil.SqlSelect(sql1).then(res => {
							res = transData(res)
							res[0].time = weChatTimeFormat(res[0].time)
							this.messageValue = ''
							this.messageList.push(res[0])
							this.scrollToBottom()
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
								friendType: 0,
								audioTime: 0
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
			// 异步将数据库中的网络图片路径转换为本地路径
			async updateChatContent(message) {
				let content = message.content
				replaceImageMessage(content).then(res => {
					content = res
					let sql =
						`update chat_${this.targetUser.userId} set content="${content}" where id=${message.id}`
					this.$sqliteUtil.SqlExecute(sql)
				})
			},
			getChatHistory(page) {
				if (this.msgLoading == 'nomore') {
					return
				}
				this.msgLoading = 'loading'
				let offset = (page - 1) * 15
				let sql =
					`select * from chat_${this.targetUser.userId} order by id desc limit 15 offset ${offset}`
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
						this.updateChatContent(res[i])
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
				this.cursor = e.detail.cursor
				this.chatMsgHeight = this.chatMsgHeight + this.keyboardHeight
				this.scrollToBottom()
			}
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
					this.statusBarHeight = res.statusBarHeight
					this.chatMsgHeight = res.screenHeight - res.statusBarHeight - 44 - 100
				}
			})
			// 获取表情列表
			let sql = `select * from emoji_list`
			this.$sqliteUtil.SqlSelect(sql).then(res => {
				if (res.length == 0) {
					this.emojiList = emojiList
				} else {
					this.emojiList = res
				}
			})
			this.record = uni.getRecorderManager()
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
		onBackPress() {
			if (this.showEmoji || this.showMore) {
				this.closeME()
				return true
			}
			return false
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.mr-10 {
		margin-right: 10rpx;
	}

	.mic-layer {
		position: fixed;
		bottom: 40rpx;
		left: 0;
		right: 0;
		width: 100%;
		box-sizing: border-box;
	}

	/* 讲话中样式 */
	.mic-layer-talking {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, .6);

		.mic-btn-talking {
			position: absolute;
			bottom: 0;
			width: 100vw;
			height: 200rpx;
			border-radius: 80px 80px 0 0;
			background-color: #F2F2F2;

			&_text {
				color: #999999;
				padding: 60rpx 0;
				text-align: center;
			}
		}

		/* 发送、取消提示文字 */
		.tip-text {
			position: absolute;
			top: -60rpx;
			left: 50%;
			width: 160rpx;
			text-align: center;
			transform: translateX(-50%);
			color: #E3E4EA;
			font-size: 24rpx;
		}

		/* 上方语音动画 */
		.record-animate-box {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 300rpx;
			height: 140rpx;
			background-color: #2878F4;
			border-radius: 28rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all .3s;

			&.active {
				background-color: #f56c6c;
				width: 140rpx;
			}

			/* 语音音阶 */
			.voice-scale {
				width: 60%;
				height: 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.item {
					display: block;
					background: #333333;
					width: 4rpx;
					height: 10%;
					margin-right: 2.5px;
					float: left;

					&:last-child {
						margin-right: 0px;
					}

					&:nth-child(1) {
						animation: load 1s 0.8s infinite linear;
					}

					&:nth-child(2) {
						animation: load 1s 0.6s infinite linear;
					}

					&:nth-child(3) {
						animation: load 1s 0.4s infinite linear;
					}

					&:nth-child(4) {
						animation: load 1s 0.2s infinite linear;
					}

					&:nth-child(5) {
						animation: load 1s 0s infinite linear;
					}

					&:nth-child(6) {
						animation: load 1s 0.2s infinite linear;
					}

					&:nth-child(7) {
						animation: load 1s 0.4s infinite linear;
					}

					&:nth-child(8) {
						animation: load 1s 0.6s infinite linear;
					}

					&:nth-child(9) {
						animation: load 1s 0.8s infinite linear;
					}

					&:nth-child(10) {
						animation: load 1s 1s infinite linear;
					}
				}
			}

			@keyframes load {
				0% {
					height: 10%;
				}

				50% {
					height: 100%;
				}

				100% {
					height: 10%;
				}
			}
		}

		/* 取消按钮 */
		.record-cancel {
			position: absolute;
			left: 50%;
			bottom: 300rpx;
			transform: translateX(-50%);
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background-color: rgba(0, 0, 0, .2);
			display: flex;
			justify-content: center;
			align-items: center;
			transition: all .3s;

			&.active {
				transform: translateX(-50%) scale(1.2);
				background-color: #f56c6c;
			}

			.close-icon {
				font-size: 40rpx;
				color: #FFFFFF;
			}
		}
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