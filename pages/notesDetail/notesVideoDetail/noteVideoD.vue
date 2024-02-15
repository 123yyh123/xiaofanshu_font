<template>
	<view>
		<view :style="{height: statusBarHeight + 'px'}"
			style="position: fixed;top: 0;width: 100%;z-index: 9999;background-color: #000000;">
		</view>
		<view :style="{height: statusBarHeight + 'px'}"></view>
		<view v-if="!commentShow"
			style="position: relative;justify-content: center;background-color: black;display: flex;align-items: center;background-color: #000000;"
			:style="{height: screenHeight-statusBarHeight-50 + 'px',width: screenWidth + 'px'}">
			<view
				style="display: flex;position: absolute;top: 0;width: 750rpx;height: 44px;align-items: center;padding: 20rpx;justify-content: space-between;box-sizing: border-box;">
				<u-icon name="arrow-left" color="#f5f5f5" size="25"></u-icon>
				<u-icon name="share-square" color="#f5f5f5" size="27"></u-icon>
			</view>
			<video :src="notesDetail.videoUrl" auto-play controls object-fit="contain" style="width: 750rpx;"
				:poster="notesDetail.coverPicture"></video>
			<view style="position: absolute;bottom: 0;width: 750rpx;padding: 20rpx;box-sizing: border-box;">
				<view style="display: flex;align-items: center;">
					<u--image :src="notesDetail.avatarUrl" shape="circle" height="70rpx" width="70rpx"></u--image>
					<text style="color: #f5f5f5;font-size: 33rpx;margin-left: 20rpx;">{{notesDetail.nickname}}</text>
					<view v-if="!notesDetail.isFollow"
						style="background-color: #e60033;border-radius: 50rpx;padding: 10rpx 25rpx;margin-left: 20rpx;text-align: center;color: #f5f5f5;font-size: 28rpx;">
						关注
					</view>
					<view v-else
						style="background-color: rgba(0, 0, 0, 0);border-radius: 50rpx;padding: 10rpx 25rpx;margin-left: 20rpx;border-style: solid;border-color: #f5f5f5;border-width: 1rpx;text-align: center;color: #f5f5f5;font-size: 28rpx;">
						已关注
					</view>
				</view>
				<view style="margin-top: 20rpx;padding: 10rpx;box-sizing: border-box;">
					<rich-text :nodes="notesDetail.content" style="font-size: 15px;color: #f5f5f5;"></rich-text>
				</view>
			</view>
		</view>
		<view v-if="commentShow" :style="{height: (screenHeight-statusBarHeight)*(1/3)+'px'}"
			style="display: flex;align-items: center;justify-content: center;background-color: #000000;">
			<video :src="notesDetail.notesResources[0].url" auto-play controls object-fit="contain"
				:poster="notesDetail.coverPicture">
			</video>
		</view>
		<view v-if="!commentShow"
			style="display: flex;padding: 20rpx;width: 750rpx;box-sizing: border-box;height: 50px;background-color: #000000;align-items: center;">
			<view
				style="padding: 15rpx 40rpx;background-color: #241a08;border-radius: 50rpx;color: #949495;font-size: 30rpx;text-align: center;">
				发条弹幕吧
			</view>
			<view style="display: flex;flex: 1;justify-content: space-around;text-align: center;align-items: center;">
				<view style="display: flex;align-items: center;">
					<u-transition :show="!notesDetail.isLike" mode="fade" duration="2000">
						<u-icon v-if="!notesDetail.isLike" name="/static/praise_white.png" size="28"
							@click="praiseNotes(notesDetail.id)"></u-icon>
					</u-transition>
					<u-transition :show="notesDetail.isLike" mode="fade" duration="2000">
						<u-icon v-if="notesDetail.isLike" name="/static/praise_select.png" size="28"
							@click="praiseNotes(notesDetail.id)"></u-icon>
					</u-transition>
					<text v-if="notesDetail.notesLikeNum>0"
						style="color: #f5f5f5;font-size: 30rpx;margin-left: 10rpx;">{{notesDetail.notesLikeNum}}</text>
					<text v-else style="color: #f5f5f5;font-size: 30rpx;margin-left: 10rpx;">点赞</text>
				</view>
				<view style="display: flex;align-items: center;">
					<u-transition :show="!notesDetail.isCollect" mode="fade" duration="2000">
						<u-icon v-if="!notesDetail.isCollect" name="/static/collect_white.png" size="28"
							@click="collectNotes(notesDetail.id)"></u-icon>
					</u-transition>
					<u-transition :show="notesDetail.isCollect" mode="fade" duration="2000">
						<u-icon v-if="notesDetail.isCollect" name="/static/collect_select.png" size="28"
							@click="collectNotes(notesDetail.id)"></u-icon>
					</u-transition>
					<text v-if="notesDetail.notesCollectNum>0"
						style="color: #f5f5f5;font-size: 30rpx;margin-left: 10rpx;">{{notesDetail.notesCollectNum}}</text>
					<text v-else style="color: #f5f5f5;font-size: 30rpx;margin-left: 10rpx;">收藏</text>
				</view>
				<view style="display: flex;align-items: center;" @click="openComment">
					<u-icon name="/static/comment_white.png" size="28"></u-icon>
					<text v-if="commentCount>0"
						style="color: #f5f5f5;font-size: 30rpx;margin-left: 10rpx;">{{commentCount}}</text>
					<text v-else style="color: #f5f5f5;font-size: 30rpx;margin-left: 10rpx;">评论</text>
				</view>
			</view>
		</view>
		<u-popup :show="commentShow" position="bottom" @close="commentShow = false">
			<view style="background-color: #ffffff;" :style="{height: (screenHeight-statusBarHeight)*(2/3) + 'px'}">
				<view v-if="commentShow"
					style="display: flex;align-items: center;position: fixed;bottom: 0;background-color: #ffffff;padding: 20rpx;box-sizing: border-box;width: 750rpx;z-index: 9999;">
					<view @click="replyNotes"
						style="width: 100%;background-color: #f3f3f2;padding: 20rpx;border-radius: 70rpx;height: 100%;box-sizing: border-box;display: flex;align-items: center;">
						<view style="font-size: 30rpx;color: #afafb0;margin-left: 10rpx;">爱评论的人运气都不差</view>
						<view style="display: flex;justify-content: space-around;flex: 1;padding: 0 10rpx 0 50rpx;">
							<u-icon name="/static/aite.png" size="25"></u-icon>
							<u-icon name="/static/emoji.png" size="25"></u-icon>
							<u-icon name="/static/photo.png" size="25"></u-icon>
						</view>
					</view>
				</view>
				<view
					style="display: flex;justify-content: center;position: relative;height: 35px;padding: 15rpx;text-align: center;align-items: center;">
					<text style="font-size: 34rpx;" decode>共&nbsp;24&nbsp;条&nbsp;评&nbsp;论</text>
					<u-icon style="position: absolute;right: 20rpx;" name="close" size="21"
						@click="commentShow = false"></u-icon>
				</view>
				<scroll-view scroll-y @scrolltolower="getMoreComment"
					:style="{height: (screenHeight-statusBarHeight)*(2/3)-130 + 'px'}">
					<view style="padding: 30rpx;">
						<block v-for="(item,index) in commentList" v-bind:key="item.id">
							<view style="display: flex;align-items: flex-start;">
								<image :src="item.commentUserAvatar"
									style="height: 70rpx;width: 70rpx;border-radius: 50%;" mode="aspectFill"
									@click="goToOtherMine(item.commentUserId)"></image>
								<view style="flex: 1;padding: 0 10px;word-break: break-all;text-overflow: ellipsis;">
									<view style="display: flex;font-size: 26rpx;color: #afafb0;">
										<view
											style="word-break: break-all;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width: 300rpx;"
											@click="goToOtherMine(item.commentUserId)">
											{{item.commentUserName}}
										</view>
										<view v-if="item.commentUserId==notesDetail.belongUserId"
											style="margin-left: 10rpx;padding: 4rpx 10rpx;background-color: #f3f3f2;color: #7d7d7d;border-radius: 50rpx;white-space: nowrap;width: 50rpx;text-align: center;">
											作者</view>
										<view v-else-if="item.commentUserId==userInfo.id"
											style="margin-left: 10rpx;padding: 4rpx 10rpx;background-color: #f3f3f2;color: #7d7d7d;border-radius: 50rpx;white-space: nowrap;width: 30rpx;text-align: center;">
											我
										</view>
									</view>
									<rich-text style="font-size: 14px;letter-spacing: 0.05rem;color: #383c3c;"
										:nodes="item.content" @longpress="openCommentSetting(item,0)"
										@touchend="touchend" @click="replyFirstComment(item)"
										@itemclick="clickUser"></rich-text>
									<view v-if="item.pictureUrl!=null&&item.pictureUrl!=''" style="margin-top: 10rpx;"
										@click="previewImage(item.picture.url)">
										<image :src="item.picture.url"
											:style="{height: item.picture.height + 'rpx',width: item.picture.width + 'rpx'}"
											style="border-radius: 20rpx;" mode="aspectFill"></image>
									</view>
									<view style="display: flex;align-items: center;margin-top: 10rpx;"
										@longpress="openCommentSetting(item,0)" @touchend="touchend"
										@click="replyFirstComment(item)">
										<view style="font-size: 24rpx;color: #afafb0;">{{item.createTime}}</view>
										<view style="margin-left: 20rpx;font-size: 24rpx;color: #afafb0;">
											{{item.province}}
										</view>
										<view style="margin-left: 20rpx;font-size: 24rpx;color: #7d7d7d;">回复</view>
									</view>
									<view v-if="item.isTop"
										style="background-color: #fdeff2;padding: 5rpx 10rpx;border-radius: 50rpx;font-size: 22rpx;color: #FF2442;display: inline-block">
										置顶评论
									</view>
									<view v-if="item.commentReplyNum>0" style="margin-top: 10rpx;">
										<block v-for="(item2,index2) in item.children.list" v-bind:key="item2.id">
											<view
												style="display: flex;align-items: flex-start;margin-top: 10rpx;position: relative;">
												<image :src="item2.commentUserAvatar"
													style="height: 50rpx;width: 50rpx;border-radius: 50%;"
													mode="aspectFill" @click="goToOtherMine(item2.commentUserId)">
												</image>
												<view
													style="flex: 1;padding: 0 20rpx;word-break: break-all;overflow: hidden;text-overflow: ellipsis;">
													<view
														style="display: flex;font-size: 26rpx;color: #afafb0;width: 350rpx;">
														<view
															style="word-break: break-all;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width: 300rpx;"
															@click="goToOtherMine(item2.commentUserId)">
															{{item2.commentUserName}}
														</view>
														<view v-if="item2.commentUserId==notesDetail.belongUserId"
															style="margin-left: 10rpx;padding: 4rpx 10rpx;background-color: #f3f3f2;color: #7d7d7d;border-radius: 50rpx;white-space: nowrap;width: 50rpx;text-align: center;">
															作者</view>
														<view v-else-if="item2.commentUserId==userInfo.id"
															style="margin-left: 10rpx;padding: 4rpx 10rpx;background-color: #f3f3f2;color: #7d7d7d;border-radius: 50rpx;white-space: nowrap;width: 30rpx;text-align: center;">
															我
														</view>
													</view>
													<rich-text
														style="font-size: 14px;letter-spacing: 0.05rem;color: #383c3c;"
														@longpress="openCommentSetting(item2,item)" @touchend="touchend"
														:nodes="item2.content" @click="replySecondComment(item,item2)"
														@itemclick="clickUser"></rich-text>
													<view v-if="item2.pictureUrl!=null&&item2.pictureUrl!=''"
														style="margin-top: 10rpx;"
														@click="previewImage(item2.picture.url)">
														<image :src="item2.picture.url"
															:style="{height: item2.picture.height + 'rpx',width: item2.picture.width + 'rpx'}"
															style="border-radius: 20rpx;" mode="aspectFill"></image>
													</view>
													<view style="display: flex;align-items: center;margin-top: 10rpx;"
														@longpress="openCommentSetting(item2,item)" @touchend="touchend"
														@click="replySecondComment(item,item2)">
														<view style="font-size: 24rpx;color: #afafb0;">
															{{item2.createTime}}
														</view>
														<view
															style="margin-left: 20rpx;font-size: 24rpx;color: #afafb0;">
															{{item2.province}}
														</view>
														<view
															style="margin-left: 20rpx;font-size: 24rpx;color: #7d7d7d;">
															回复</view>
													</view>
												</view>
												<view
													style="width: 30px;display: flex;flex-direction: column;justify-content: center;text-align: center;padding: 5rpx;box-sizing: border-box;position: absolute;right: -40px;top: 0;">
													<u-transition :show="!item2.isLike" mode="fade" duration="2000">
														<u-icon v-if="!item2.isLike" name="/static/praise.png" size="24"
															@click="praiseComment(item2.id,item2.commentUserId,2,[index,index2])"></u-icon>
													</u-transition>
													<u-transition :show="item2.isLike" mode="fade" duration="2000">
														<u-icon v-if="item2.isLike" name="/static/praise_select.png"
															size="24"
															@click="praiseComment(item2.id, item2.commentUserId, 2, [index,index2])"></u-icon>
													</u-transition>
													<view v-if="item2.commentLikeNum>0"
														style="font-size: 12px;color: #7d7d7d;">
														{{item2.commentLikeNum}}
													</view>
												</view>
											</view>
										</block>
									</view>
									<u-loadmore v-if="item.commentReplyNum>0" :fontSize="13" color="#5b7e91"
										style="width: 350rpx;letter-spacing: 0.05rem;" :status="item.children.status"
										:loading-text="loadingText" :loadmore-text="item.children.loadmoreText"
										nomore-text=" " @loadmore="getReplyList(item.id)" />
								</view>
								<view
									style="width: 30px; display: flex; flex-direction: column; justify-content: center; text-align: center; padding: 5rpx; box-sizing: border-box;">
									<u-transition :show="!item.isLike" mode="fade" duration="2000">
										<u-icon v-if="!item.isLike" name="/static/praise.png" size="24"
											@click="praiseComment(item.id,item.commentUserId,1,[index])"></u-icon>
									</u-transition>
									<u-transition :show="item.isLike" mode="fade" duration="2000">
										<u-icon v-if="item.isLike" name="/static/praise_select.png" size="24"
											@click="praiseComment(item.id, item.commentUserId, 1, [index])"></u-icon>
									</u-transition>
									<view v-if="item.commentLikeNum > 0" style="font-size: 12px; color: #7d7d7d;">
										{{ item.commentLikeNum }}
									</view>
								</view>
							</view>
							<u-divider style="padding-left: 100rpx;" :hairline="true"></u-divider>
						</block>
						<u-loadmore line :status="status" :loading-text="loadingText"
							loadingIcon="semicircle"></u-loadmore>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		emojiList
	} from '@/utils/emojiUtil.js'
	import {
		getNotesByNotesId,
		praiseOrCancelNotes,
		collectOrCancelNotes
	} from '@/apis/notes_service.js'
	import {
		weChatTimeFormat,
		replaceHTMLTags
	} from '@/utils/util.js'
	import {
		getAttentionList,
		updateAttention
	} from '@/apis/user_service'
	import {
		addComment,
		getCommentCountByNotesId,
		getCommentFirstListByNotesId,
		getCommentSecondListByNotesId,
		praiseOrCancelComment,
		setNotesTopComment,
		deleteNotesComment
	} from '@/apis/comment_service'
	import {
		baseUrl
	} from '@/config/index.js'
	export default {
		data() {
			return {
				screenHeight: 0,
				screenWidth: 0,
				statusBarHeight: 0,
				commentShow: false,
				editPlaceholder: '爱评论的人运气都不差',
				notesDetail: {},
				commentCount: 0,
				commentList: [],
				page: 1,
				pageSize: 10,
				status: 'loadmore',
				userInfo: {},
				edit: null,
				keyboardHeight: 0,
				inputField: false,
				showEmoji: false,
				showAite: false,
				attentionUser: {
					list: [],
					page: 1,
					pageSize: 10,
					status: 'loading',
					isLoading: false,
					isNoMore: false
				},
				emojiList: [],
				bottomEmoji: [],
				commentImagesurl: '',
				content: '',
				revealcontent: '',
				replyCommentUserId: 0,
				replyCommentUserName: '',
				parentId: 0,
				loadingText: '加载中...',
				showBubble: false,
				isLongPress: false,
			}
		},
		methods: {
			/**
			 * 关注用户
			 */
			attention() {
				this.$showModal({
					title: '提示',
					content: this.notesDetail.isFollow ? '是否取消关注?' : '是否关注?',
					cancelText: "取消", // 取消按钮的文字
					cancelColor: "#949495", // 取消按钮的文字颜色
					confirmText: "确定", // 确认按钮文字
					confirmColor: "#FF2442", // 确认按钮颜色 
					showCancel: true, // 是否显示取消按钮，默认为 true
				}).then(res => {
					updateAttention({
						userId: this.userInfo.id,
						targetUserId: this.notesDetail.belongUserId
					}).then(res => {
						console.log(res)
						if (res.code == 20020) {
							this.notesDetail.isFollow = !this.notesDetail.isFollow
							uni.showToast({
								title: this.notesDetail.isFollow ? '关注成功' : '取消关注成功',
								icon: 'none'
							})
						}
					})
				})
			},
			openCommentSetting(e, e1) {
				this.isLongPress = true
				let itemList = ['置顶', '回复', '复制', '删除']
				if ((this.notesDetail.belongUserId != this.userInfo.id) || e.parentId != 0) {
					itemList.shift()
				} else {
					if (e.isTop) {
						itemList[0] = '取消置顶'
					}
				}
				if (this.notesDetail.belongUserId != this.userInfo.id && e.commentUserId != this.userInfo.id) {
					itemList.pop()
				}
				this.$showActionSheet({
					itemList: itemList,
					success: (data) => {
						let text = itemList[data.tapIndex]
						console.log(text)
						if (text === '置顶') {
							this.topComment(e.id, 0)
						}
						if (text === '取消置顶') {
							this.topComment(e.id, 1)
						}
						if (text === '回复') {
							if (e1 == 0) {
								this.replyFirstComment(e)
							} else {
								this.replySecondComment(e1, e)
							}
						}
						if (text === '复制') {
							let a = replaceHTMLTags(e.content)
							uni.setClipboardData({
								data: a,
								success: function() {
									uni.showToast({
										title: '复制成功',
										icon: 'none'
									})
								}
							})
						}
						if (text === '删除') {
							this.deleteComment(e)
						}
					}
				})
			},
			/** 置顶评论
			 * @param {Object} id
			 */
			topComment(id, type) {
				this.$showModal({
					title: '提示',
					content: type == 0 ? '是否置顶评论?' : '是否取消置顶评论?',
					cancelText: "取消", // 取消按钮的文字
					cancelColor: "#949495", // 取消按钮的文字颜色
					confirmText: "确定", // 确认按钮文字
					confirmColor: "#FF2442", // 确认按钮颜色 
					showCancel: true, // 是否显示取消按钮，默认为 true
				}).then(res => {
					setNotesTopComment({
						commentId: id,
					}).then(res => {
						console.log(res)
						if (res.code == 20020) {
							uni.showToast({
								title: type == 0 ? '置顶成功' : '取消置顶成功',
								icon: 'none'
							})
							// 将置顶的评论放到第一位
							this.commentList.forEach((item, index) => {
								if (item.id == id) {
									if (type == 0) {
										item.isTop = true
										this.commentList.splice(index, 1)
										this.commentList.unshift(item)
									} else {
										item.isTop = false
									}
								} else {
									item.isTop = false
								}
							})
						} else {
							uni.showToast({
								title: res.msg == null ? type == 0 ? '置顶失败' : '取消置顶失败' : res.msg,
								icon: 'none'
							})
						}
					})
				})
			},
			/** 删除评论
			 * @param {Object} e
			 */
			deleteComment(e) {
				this.$showModal({
					title: '提示',
					content: '是否删除评论?',
					cancelText: "取消", // 取消按钮的文字
					cancelColor: "#949495", // 取消按钮的文字颜色
					confirmText: "确定", // 确认按钮文字
					confirmColor: "#FF2442", // 确认按钮颜色 
					showCancel: true, // 是否显示取消按钮，默认为 true
				}).then(res => {
					deleteNotesComment({
						commentId: e.id,
					}).then(res => {
						console.log(res)
						if (res.code == 20020) {
							uni.showToast({
								title: '删除成功',
								icon: 'none'
							})
							// 删除评论
							if (e.parentId == '0') {
								this.commentList.forEach((item, index) => {
									if (item.id == e.id) {
										this.commentList.splice(index, 1)
									}
								})
							} else {
								this.commentList.forEach((item, index) => {
									if (item.id == e.parentId) {
										item.children.list.forEach((item2, index2) => {
											if (item2.id == e.id) {
												item.children.list.splice(index2, 1)
											}
										})
									}
								})
							}
						} else {
							uni.showToast({
								title: res.msg == null ? '删除失败' : res.msg,
								icon: 'none'
							})
						}
					})
				})
			},
			touchend() {
				setTimeout(() => {
					this.isLongPress = false
				}, 200)
			},
			/**
			 * 点赞或取消点赞笔记
			 * @param {Object} id
			 */
			praiseNotes(id) {
				praiseOrCancelNotes({
					notesId: id,
					userId: this.userInfo.id,
					targetUserId: this.notesDetail.belongUserId
				}).then(res => {
					console.log(res)
					if (res.code == 20020) {
						if (this.notesDetail.isLike) {
							this.notesDetail.notesLikeNum = this.notesDetail.notesLikeNum - 1
							this.notesDetail.isLike = false
						} else {
							this.notesDetail.notesLikeNum = this.notesDetail.notesLikeNum + 1
							this.notesDetail.isLike = true
						}
					}
				})
			},
			/**
			 * 收藏或取消收藏笔记
			 * @param {Object} id
			 */
			collectNotes(id) {
				collectOrCancelNotes({
					notesId: id,
					userId: this.userInfo.id,
					targetUserId: this.notesDetail.belongUserId
				}).then(res => {
					console.log(res)
					if (res.code == 20020) {
						if (this.notesDetail.isCollect) {
							this.notesDetail.notesCollectNum = this.notesDetail.notesCollectNum - 1
							this.notesDetail.isCollect = false
						} else {
							this.notesDetail.notesCollectNum = this.notesDetail.notesCollectNum + 1
							this.notesDetail.isCollect = true
						}
					}
				})
			},
			/** 点赞或取消点赞评论
			 * @param {Object} id 评论id
			 * @param {Object} userId 评论人id
			 * @param {Object} type 评论类型 1:一级评论 2:二级评论
			 * @param {Object} index 评论下标，数组，[一级评论下标，二级评论下标]
			 */
			praiseComment(id, userId, type, index) {
				console.log(id, userId, type, index)
				praiseOrCancelComment({
					commentId: id,
					userId: this.userInfo.id,
					targetUserId: userId
				}).then(res => {
					console.log(res)
					if (res.code == 20020) {
						if (type == 1) {
							if (this.commentList[index].isLike) {
								this.commentList[index].isLike = false
								this.commentList[index].commentLikeNum--
							} else {
								this.commentList[index].isLike = true
								this.commentList[index].commentLikeNum++
							}
						} else {
							if (this.commentList[index[0]].children.list[index[1]].isLike) {
								this.commentList[index[0]].children.list[index[1]].isLike = false
								this.commentList[index[0]].children.list[index[1]].commentLikeNum--
							} else {
								this.commentList[index[0]].children.list[index[1]].isLike = true
								this.commentList[index[0]].children.list[index[1]].commentLikeNum++
							}
						}
					}
				})
			},
			/** 点击用户头像跳转到用户主页
			 * @param {Object} e
			 */
			clickUser(e) {
				console.log(e)
				if (e.detail.node.name != 'a') {
					return
				}
				let userId = this.findUserId(e.detail.node.attrs.href)
				this.goToOtherMine(userId)
			},
			/** 获取一级评论的子评论
			 * @param {Object} e
			 */
			getReplyList(id) {
				console.log(id)
				this.commentList.forEach(item => {
					if (item.id == id) {
						if (item.children.status == 'loading' || item.children.status == 'nomore') {
							return;
						}
						item.children.status = 'loading';
						getCommentSecondListByNotesId({
							notesId: this.notesDetail.id,
							parentId: id,
							page: item.children.page,
							pageSize: item.children.pageSize
						}).then(res => {
							console.log(res)
							if (res.code == 20010) {
								item.children.page++
								item.children.loadmoreText = '展开更多回复'
								res.data.forEach(item => {
									item.createTime = weChatTimeFormat(Number(item.createTime))
									if (item.pictureUrl != null && item.pictureUrl != '') {
										uni.getImageInfo({
											src: item.pictureUrl,
											success: (image) => {
												item.picture = {
													url: item.pictureUrl,
												}
												// 图片长度最长为350rpx,高度最高为350rpx
												if (image.width >= image.height) {
													if (image.width > 350) {
														item.picture.width = 350
														item.picture.height = 350 *
															image.height / image.width
													} else {
														item.picture.width = image
															.width
														item.picture.height = image
															.height
													}
												} else {
													if (image.height > 350) {
														item.picture.height = 350
														item.picture.width = 350 *
															image.width / image.height
													} else {
														item.picture.width = image
															.width
														item.picture.height = image
															.height
													}
												}
												console.log(item.picture)
											},
											fail: (err) => {
												console.log(err)
											}
										})
									} else {
										item.picture = null
									}
								})
								setTimeout(() => {
									if (res.data.length < item.children.pageSize) {
										item.children.status = 'nomore';
									} else {
										item.children.status = 'loadmore';
									}
									item.children.list.push(...res.data)
								}, 1000)
							} else {
								item.children.status = 'nomore';
							}
						}).catch(err => {
							item.children.status = 'nomore';
						}).finally(() => {
							console.log(this.commentList)
							return;
						})
					}
				})
			},
			/**
			 * 发送评论
			 */
			sendComment() {
				this.edit.getContents().then(res => {
					console.log(res)
					// 如果res.text里面只有换行符或者空格，res.html也没有<img>标签，就不允许发布	
					const regex = /^[\n\s]+$/;
					const regex2 = /<img/g;
					if (regex.test(res.text) && this.commentImagesurl == '' && !regex2.test(res.html)) {
						uni.showToast({
							title: '请输入内容',
							icon: 'none'
						})
						return;
					}
					this.content = res.html
					if (this.commentImagesurl == '') {
						let commentVO = {
							content: this.content,
							replyUserId: this.replyCommentUserId,
							replyUserName: this.replyCommentUserName,
							notesId: this.notesDetail.id,
							commentUserId: this.userInfo.id,
							parentId: this.parentId
						}
						console.log(commentVO)
						addComment({
							commentVO
						}).then(res => {
							console.log(res)
							if (res.code == 20020) {
								uni.showToast({
									title: '评论已发布',
									icon: 'success'
								})
								this.commentCount++
								res.data.createTime = weChatTimeFormat(Number(res.data.createTime))
								console.log(res.data)
								if (this.parentId == 0) {
									res.data.children = {
										list: [],
										page: 1,
										pageSize: 10,
										status: 'loadmore',
										loadmoreText: '—— 展开更多回复 ——'
									}
									console.log(res.data)
									this.commentList.unshift(res.data)
								} else {
									this.commentList.forEach(item => {
										if (item.id == this.parentId) {
											console.log(item)
											if (item.children.page == 1) {
												item.commentReplyNum++
												item.children.loadmoreText = '—— 展开' + item
													.commentReplyNum + '条回复 ——'
											} else {
												item.children.list.unshift(res.data)
											}
										}
									})
								}
								this.content = ''
								this.inputField = false
							} else {
								uni.showToast({
									title: res.msg == null ? '评论失败' : res.msg,
									icon: 'none'
								})
							}
						}).catch(err => {
							uni.showToast({
								title: '评论失败',
								icon: 'none'
							})
						})
						return
					}
					uni.uploadFile({
						url: baseUrl + '/third/uploadImg',
						filePath: this.commentImagesurl,
						name: 'file',
						header: {
							'token': uni.getStorageSync('token')
						},
						success: (res) => {
							let data = JSON.parse(res.data)
							if (data.code === 20020) {
								console.log(data.data)
								this.commentImagesurl = data.data
								let commentVO = {
									content: this.content,
									replyUserId: this.replyCommentUserId,
									replyUserName: this.replyCommentUserName,
									notesId: this.notesDetail.id,
									commentUserId: this.userInfo.id,
									parentId: this.parentId,
									pictureUrl: this.commentImagesurl
								}
								console.log(commentVO)
								addComment({
									commentVO
								}).then(res => {
									console.log(res)
									if (res.code == 20020) {
										uni.showToast({
											title: '评论已发布',
											icon: 'success'
										})
										this.commentCount++
										res.data.createTime = weChatTimeFormat(Number(res.data
											.createTime))
										if (this.parentId == 0) {
											res.data.children = {
												list: [],
												page: 1,
												pageSize: 10,
												status: 'loadmore',
												loadmoreText: '—— 展开更多回复 ——'
											}
											this.commentList.unshift(res.data)
										} else {
											this.commentList.forEach(item => {
												if (item.id == this.parentId) {
													console.log(item)
													if (item.children.page == 1) {
														item.commentReplyNum++
														item.children.loadmoreText =
															'—— 展开' + item
															.commentReplyNum + '条回复 ——'
													} else {
														item.children.list.unshift(res
															.data)
													}
												}
											})
										}
										this.content = ''
										this.revealcontent = ''
										this.commentImagesurl = ''
										this.inputField = false
									} else {
										uni.showToast({
											title: res.msg == null ? '评论失败' : res.msg,
											icon: 'none'
										})
									}
								}).catch(err => {
									uni.showToast({
										title: '评论失败',
										icon: 'none'
									})
								})
							} else {
								uni.showToast({
									title: '图片上传失败',
									icon: 'none'
								})
							}
						},
						fail: (err) => {
							uni.showToast({
								title: '图片上传失败',
								icon: 'none'
							})
						}
					})
				})
			},
			/**
			 * 回复一级评论
			 * @param {Object} item 一级评论
			 */
			replyFirstComment(item) {
				if (this.isLongPress) {
					return
				}
				this.editPlaceholder = '回复 @' + item.commentUserName
				if (this.replyCommentUserId != item.commentUserId) {
					this.content = ''
					this.revealcontent = ''
				}
				this.replyCommentUserId = 0
				this.replyCommentUserName = ''
				this.parentId = item.id
				this.openEditor()
			},
			/**
			 * 回复二级评论
			 * @param {Object} fitem 一级评论
			 * @param {Object} item 二级评论
			 */
			replySecondComment(fitem, item) {
				if (this.isLongPress) {
					return
				}
				this.editPlaceholder = '回复 @' + item.commentUserName
				this.content = ''
				this.revealcontent = ''
				this.replyCommentUserId = item.commentUserId
				this.replyCommentUserName = item.commentUserName
				this.parentId = fitem.id
				this.openEditor()
			},
			/**
			 * 回复笔记，即发布一级评论
			 */
			replyNotes() {
				this.editPlaceholder = '爱评论的人运气都不差'
				if (this.replyCommentUserId != 0) {
					this.content = ''
					this.revealcontent = ''
				}
				this.replyCommentUserId = 0
				this.replyCommentUserName = ''
				this.parentId = 0
				this.openEditor()
			},
			/**
			 * 弹出输入框
			 */
			openEditor() {
				this.inputField = true
				this.showEmoji = false
				this.showAite = false
				setTimeout(() => {
					this.$refs.lsjComment.keyboardShow()
				}, 700)
			},

			/**
			 * 点击输入框
			 */
			onEditClick() {
				this.showEmoji = false
				this.showAite = false
			},
			/**
			 * 关闭输入框
			 */
			closeEditor() {
				this.inputField = false
				this.showEmoji = false
				this.showAite = false
				this.edit.getContents().then(res => {
					console.log(res)
					this.content = res.html
					this.revealcontent = res.text
				})
				uni.hideKeyboard()
			},
			/**
			 * 预览图片
			 */
			previewImage(url) {
				uni.previewImage({
					urls: [url]
				})
			},
			/**
			 * 前往对方用户主页
			 * @param {Object} userId
			 */
			goToOtherMine(userId) {
				uni.navigateTo({
					url: '/pages/mine/otherMine?userId=' + userId
				})
			},
			/**
			 * 获取一级评论列表
			 * @param {Object} notesId 笔记id
			 */
			getFirstComment(notesId) {
				if (this.status == 'loading' || this.status == 'nomore') {
					return;
				}
				this.status = 'loading';
				getCommentFirstListByNotesId({
					notesId: notesId,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res)
					res.data.forEach(item => {
						item.createTime = weChatTimeFormat(Number(item.createTime))
						item.children = {
							list: [],
							page: 1,
							pageSize: 10,
							status: 'loadmore',
							loadmoreText: '—— 展开' + item.commentReplyNum + '条回复 ——'
						}
						if (item.pictureUrl != null && item.pictureUrl != '') {
							uni.getImageInfo({
								src: item.pictureUrl,
								success: (image) => {
									item.picture = {
										url: item.pictureUrl,
									}
									// 图片长度最长为350rpx,高度最高为350rpx
									if (image.width >= image.height) {
										if (image.width > 350) {
											item.picture.width = 350
											item.picture.height = 350 * image.height / image
												.width
										} else {
											item.picture.width = image.width
											item.picture.height = image.height
										}
									} else {
										if (image.height > 350) {
											item.picture.height = 350
											item.picture.width = 350 * image.width / image
												.height
										} else {
											item.picture.width = image.width
											item.picture.height = image.height
										}
									}
									console.log(item.picture)
								},
								fail: (err) => {
									console.log(err)
								}
							})
						} else {
							item.picture = null
						}
					})
					setTimeout(() => {
						this.page++;
						if (res.data.length < this.pageSize) {
							this.status = 'nomore';
						} else {
							this.status = 'loadmore';
						}
						this.commentList = this.commentList.concat(res.data)
					}, 700)
				}).catch(err => {
					console.log(err)
				})
			},
			/**
			 * 评论输入框添加@用户
			 * @param {Object} item 
			 */
			addUser(item) {
				this.showAite = false
				this.$refs.lsjComment.keyboardShow()
				this.edit.addLink({
					prefix: '@',
					name: item.nickname,
					data: {
						userId: item.userId,
					}
				})
			},
			/**
			 * 评论输入框添加emoji
			 * @param {Object} name 
			 */
			addEmoji(name) {
				let sql = `update emoji_list set updateTime=datetime('now','localtime') where name='${name}'`
				this.$sqliteUtil.SqlExecute(sql)
				let emojiUrl = '';
				emojiList.forEach(item => {
					if (item.name == name) {
						emojiUrl = item.url;
					}
				})
				// this.edit.insertEmoji(emojiUrl, name)
				this.edit.insertCustomEmoji(emojiUrl, name, '15px', '15px')
				this.showEmoji = false
				this.$refs.lsjComment.keyboardShow()
			},
			/**
			 * 选择 @用户 的弹窗
			 */
			chooseAite() {
				uni.hideKeyboard()
				this.showAite = true
				this.showEmoji = false
				this.getAttentionUser()
			},
			/**
			 * 获取关注用户列表
			 */
			getAttentionUser() {
				if (this.attentionUser.isNoMore) {
					return;
				}
				this.attentionUser.isLoading = true;
				setTimeout(() => {
					getAttentionList({
						userId: this.userInfo.id,
						pageNum: this.attentionUser.page,
						pageSize: this.attentionUser.pageSize,
					}).then(res => {
						if (res.code == 20010) {
							console.log(res)
							if (res.data.length < this.attentionUser.pageSize) {
								this.attentionUser.isNoMore = true;
								this.attentionUser.status = 'nomore';
							}
							this.attentionUser.list = this.attentionUser.list.concat(res.data);
							this.attentionUser.page++;
						}
					}).finally(() => {
						this.attentionUser.isLoading = false;
					})
				}, 500)
			},
			/**
			 * 打开emoji弹出层
			 */
			openEmoji() {
				if (this.showEmoji) {
					this.showEmoji = false
					this.$refs.lsjComment.keyboardShow()
				} else {
					this.showAite = false
					this.showEmoji = true
					uni.hideKeyboard()
				}
			},
			/**
			 * 选择发布评论的图片
			 */
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						console.log(res)
						this.commentImagesurl = res.tempFilePaths[0]
					},
					complete: () => {
						this.$refs.lsjComment.keyboardShow()
					}
				})
			},
			/**
			 * 删除发布评论的图片
			 */
			deleteImage() {
				this.commentImagesurl = ''
				this.$refs.lsjComment.keyboardShow()
			},
			/**
			 * 编辑器初始化
			 * @param {Object} edit 
			 */
			editReady(edit) {
				this.edit = edit
				const reg = /<img/g;
				if (!(this.revealcontent == '\n' || this.revealcontent == '') || reg.test(this.content)) {
					this.edit.ready(this.content)
				}
			},
			/**
			 * swiper切换
			 * @param {Object} e 
			 */
			swiperChange(e) {
				this.swiperCurrent = e.detail.current
			},
			/**
			 * 提取话题名
			 * @param {Object} str 
			 */
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
			/**
			 * 提取用户id
			 * @param {Object} str 
			 */
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
			/**
			 * 点击话题或者用户
			 * @param {Object} e 
			 */
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
			},
			/**
			 * 返回上一页
			 */
			goBack() {
				uni.navigateBack()
			},
			openComment() {
				this.commentShow = true
			},
			getMoreComment() {
				this.getFirstComment(this.notesDetail.id)
			},
		},
		onLoad(options) {
			uni.getSystemInfo({
				success: (res) => {
					this.screenHeight = res.screenHeight;
					this.screenWidth = res.screenWidth;
					this.statusBarHeight = res.statusBarHeight;
				}
			})
			let sql = `select * from emoji_list`
			this.$sqliteUtil.SqlSelect(sql).then(res => {
				if (res.length == 0) {
					this.emojiList = emojiList
				} else {
					this.emojiList = res
				}
			})
			let sql1 = `select * from emoji_list order by updateTime desc limit 9`
			this.$sqliteUtil.SqlSelect(sql1).then(res => {
				if (res.length == 0) {
					this.bottomEmoji = emojiList
					console.log(this.bottomEmoji)
				} else {
					this.bottomEmoji = res
				}
			})
			uni.onKeyboardHeightChange((res) => {
				if (res.height > 0 && this.keyboardHeight == 0) {
					this.keyboardHeight = res.height
				}
			})
			this.userInfo = uni.getStorageSync('userInfo');
			getNotesByNotesId({
				notesId: options.notesId
			}).then(res => {
				res.data.createTime = weChatTimeFormat(res.data.createTime)
				res.data.updateTime = weChatTimeFormat(res.data.updateTime)
				res.data.videoUrl = res.data.notesResources[0].url
				res.data.content = parseHtml('<p>' + res.data.title + '    ' + res.data.content.substring(3))
				this.notesDetail = res.data;
				console.log(this.notesDetail);
			});
			getCommentCountByNotesId({
				notesId: options.notesId
			}).then(res => {
				this.commentCount = res.data
			})
			this.getFirstComment('1750993978482753537')
		},
		onBackPress() {
			if (this.commentShow) {
				this.commentShow = false
				return true
			}
			return false
		}
	}
</script>

<style lang="scss">

</style>