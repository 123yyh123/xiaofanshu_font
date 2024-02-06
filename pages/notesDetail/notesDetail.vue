<template>
	<view>
		<view :style="{height: statusBarHeight + 'px'}"
			style="position: fixed;top: 0;width: 100%;z-index: 9999;background-color: #fff;"></view>
		<view :style="{top: statusBarHeight + 'px'}"
			style="position: fixed;width: 100%;height: 44px;background-color: #fff;z-index: 9999;display: flex;align-items: center;padding: 0 10rpx;box-sizing: border-box;">
			<u-icon name="arrow-left" color="#2b2b2b" size="25"></u-icon>
			<view style="margin-left: 20rpx;">
				<image :src="notesDetail.avatarUrl" style="height: 35px;width: 35px;border-radius: 50%;"
					mode="aspectFill"></image>
			</view>
			<view class="authorName">{{notesDetail.nickname}}</view>
			<view v-if="notesDetail.belongUserId!=userInfo.id"
				style="display: flex;justify-content: space-around;flex: 1;padding: 0 20rpx;">
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
			<view
				style="font-size: 37rpx;color: #474a4d;margin-bottom: 15rpx;word-wrap: break-word;word-break: break-all;letter-spacing: 2rpx;">
				{{notesDetail.title}}
			</view>
			<rich-text style="font-size: 35rpx;letter-spacing: 0.1rem;" :nodes="notesDetail.content"
				@itemclick="clickTopic"></rich-text>
			<view style="display: flex;margin-top: 15rpx;font-size: 24rpx;color: #afafb0;">
				<view>
					<text v-if="notesDetail.updateTime!=notesDetail.createTime">更新于{{notesDetail.updateTime}}</text>
					<text v-else>{{notesDetail.createTime}}</text>
				</view>
				<view style="margin-left: 20rpx;">{{notesDetail.province}}</view>
			</view>
		</view>
		<u-divider style="padding: 0 30rpx;" :hairline="true"></u-divider>
		<view style="padding: 30rpx;">
			<view v-if="commentCount>0" style="font-size: 25rpx;color: #474a4d;">共{{commentCount}}条评论</view>
			<view v-else style="font-size: 25rpx;color: #474a4d;">暂无评论</view>
			<view style="display: flex;margin-top: 20rpx;height: 90rpx;align-items: center;">
				<image style="height: 70rpx;width: 70rpx;border-radius: 50%;" mode="aspectFill"
					:src="userInfo.avatarUrl"></image>
				<view @click="replyNotes"
					style="margin-left: 20rpx;flex: 1;background-color: #f3f3f2;padding: 20rpx;border-radius: 70rpx;height: 100%;box-sizing: border-box;display: flex;align-items: center;">
					<view style="font-size: 30rpx;color: #afafb0;margin-left: 10rpx;">爱评论的人运气都不差</view>
					<view style="display: flex;justify-content: space-around;flex: 1;padding: 0 10rpx 0 50rpx;">
						<u-icon name="/static/aite.png" size="25"></u-icon>
						<u-icon name="/static/emoji.png" size="25"></u-icon>
						<u-icon name="/static/photo.png" size="25"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view style="padding: 30rpx;">
			<block v-for="(item,index) in commentList" v-bind:key="item.id">
				<view style="display: flex;align-items: flex-start;">
					<image :src="item.commentUserAvatar" style="height: 70rpx;width: 70rpx;border-radius: 50%;"
						mode="aspectFill" @click="goToOtherMine(item.commentUserId)"></image>
					<view style="flex: 1;padding: 0 10px;word-break: break-all;text-overflow: ellipsis;">
						<view style="display: flex;font-size: 26rpx;color: #afafb0;">
							<view
								style="word-break: break-all;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width: 300rpx;"
								@click="goToOtherMine(item.commentUserId)">
								{{item.commentUserName}}
							</view>
							<view v-if="item.commentUserId!=item.belongUserId"
								style="margin-left: 10rpx;padding: 4rpx 10rpx;background-color: #f3f3f2;color: #7d7d7d;border-radius: 50rpx;white-space: nowrap;width: 50rpx;">
								作者</view>
						</view>
						<rich-text style="font-size: 14px;letter-spacing: 0.05rem;color: #383c3c;" :nodes="item.content"
							@click="replyFirstComment(item)" @itemclick="clickUser"></rich-text>
						<view v-if="item.pictureUrl!=null&&item.pictureUrl!=''" style="margin-top: 10rpx;"
							@click="previewImage(item.picture.url)">
							<image :src="item.picture.url"
								:style="{height: item.picture.height + 'rpx',width: item.picture.width + 'rpx'}"
								style="border-radius: 20rpx;" mode="aspectFill"></image>
						</view>
						<view style="display: flex;align-items: center;margin-top: 10rpx;"
							@click="replyFirstComment(item)">
							<view style="font-size: 24rpx;color: #afafb0;">{{item.createTime}}</view>
							<view style="margin-left: 20rpx;font-size: 24rpx;color: #afafb0;">{{item.province}}</view>
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
										style="height: 50rpx;width: 50rpx;border-radius: 50%;" mode="aspectFill"
										@click="goToOtherMine(item2.commentUserId)"></image>
									<view
										style="flex: 1;padding: 0 20rpx;word-break: break-all;overflow: hidden;text-overflow: ellipsis;">
										<view style="display: flex;font-size: 26rpx;color: #afafb0;width: 350rpx;">
											<view
												style="word-break: break-all;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;max-width: 300rpx;"
												@click="goToOtherMine(item2.commentUserId)">
												{{item2.commentUserName}}
											</view>
											<view v-if="item2.commentUserId!=item2.belongUserId"
												style="margin-left: 10rpx;padding: 4rpx 10rpx;background-color: #f3f3f2;color: #7d7d7d;border-radius: 50rpx;white-space: nowrap;width: 50rpx;">
												作者</view>
										</view>
										<rich-text style="font-size: 14px;letter-spacing: 0.05rem;color: #383c3c;"
											:nodes="item2.content" @click="replySecondComment(item,item2)"
											@itemclick="clickUser"></rich-text>
										<view v-if="item2.pictureUrl!=null&&item2.pictureUrl!=''"
											style="margin-top: 10rpx;" @click="previewImage(item2.picture.url)">
											<image :src="item2.picture.url"
												:style="{height: item2.picture.height + 'rpx',width: item2.picture.width + 'rpx'}"
												style="border-radius: 20rpx;" mode="aspectFill"></image>
										</view>
										<view style="display: flex;align-items: center;margin-top: 10rpx;"
											@click="replySecondComment(item,item2)">
											<view style="font-size: 24rpx;color: #afafb0;">
												{{item2.createTime}}
											</view>
											<view style="margin-left: 20rpx;font-size: 24rpx;color: #afafb0;">
												{{item2.province}}
											</view>
											<view style="margin-left: 20rpx;font-size: 24rpx;color: #7d7d7d;">回复</view>
										</view>
									</view>
									<view
										style="width: 30px;display: flex;flex-direction: column;justify-content: center;text-align: center;padding: 5rpx;box-sizing: border-box;position: absolute;right: -40px;top: 0;">
										<u-icon v-if="!item2.isLike" name="/static/praise.png" size="24"></u-icon>
										<u-icon v-else name="/static/praise_select.png" size="24"></u-icon>
										<view v-if="item2.commentLikeNum>0" style="font-size: 12px;color: #7d7d7d;">
											{{item2.commentLikeNum}}
										</view>
									</view>
								</view>
							</block>
						</view>
						<u-loadmore v-if="item.commentReplyNum>0" :fontSize="13" color="#5b7e91"
							style="width: 350rpx;letter-spacing: 0.05rem;" :status="item.children.status"
							:loading-text="loadingText" :loadmore-text="item.children.loadmoreText" nomore-text=" "
							@loadmore="getReplyList(item.id)" />
					</view>
					<view
						style="width: 30px;display: flex;flex-direction: column;justify-content: center;text-align: center;padding: 5rpx;box-sizing: border-box;">
						<u-icon v-if="!item.isLike" name="/static/praise.png" size="24"></u-icon>
						<u-icon v-else name="/static/praise_select.png" size="24"></u-icon>
						<view v-if="item.commentLikeNum>0" style="font-size: 12px;color: #7d7d7d;">
							{{item.commentLikeNum}}
						</view>
					</view>
				</view>
				<u-divider style="padding-left: 100rpx;" :hairline="true"></u-divider>
			</block>
		</view>
		<u-popup :show="inputField" mode="bottom" @close="closeEditor">
			<view style="width: 100%;box-sizing: border-box;position: fixed;bottom: 0;background-color: #fff;">
				<view @click="onEditClick">
					<lsj-edit class="lsjComment" style="height: auto" ref="lsjComment" :placeholder="editPlaceholder"
						:maxCount="1000" @onReady="editReady">
					</lsj-edit>
				</view>
				<view style="display: flex;width: 100%;padding: 0 10rpx;box-sizing: border-box;height: 90rpx;">
					<view style="display: flex;justify-content: space-around;width: 50%;align-items: center;">
						<view @touchend.prevent="chooseAite">
							<u-icon name="/static/aite.png" size="25"></u-icon>
						</view>
						<view @touchend.prevent="openEmoji">
							<u-icon v-if="!showEmoji" name="/static/emoji.png" size="25"></u-icon>
							<u-icon v-else name="/static/keyBoard.png" size="25"></u-icon>
						</view>
						<view @touchend.prevent="chooseImage">
							<u-icon name="/static/photo.png" size="25"></u-icon>
						</view>
					</view>
					<view style="display: flex;margin-left: auto;margin-right: 20rpx;align-items: center;"
						@touchend.prevent="sendComment">
						<u-button style="height: 70rpx;" size="mini" type="error" shape="circle">发送</u-button>
					</view>
				</view>
				<view v-if="commentImagesurl!=''" style="padding: 30rpx;display: flex;">
					<view style="position: relative;">
						<image :src="commentImagesurl" style="height: 100rpx;width: 100rpx;" mode="aspectFill"></image>
						<view
							style="position: absolute;top: 0;right: 0;background-color: #7d7d7d;padding: 5rpx;border-bottom-left-radius: 50%;border-top-right-radius: 5rpx;">
							<u-icon name="close" size="9" color="#f3f3f2" @click="deleteImage"></u-icon>
						</view>
					</view>
				</view>
				<scroll-view :scroll-x="true"
					style="background-color: #fff;display: flex;align-items: center;white-space: nowrap;"
					v-if="bottomEmoji.length>0 && !showEmoji">
					<view style="display: inline-flex;align-items: center;padding: 0 15rpx;">
						<block v-for="(item,index) in bottomEmoji" v-bind:key="index">
							<view @click="addEmoji(item.name)" style="padding: 15rpx;">
								<image :src="item.url" style="width: 70rpx;height: 70rpx;" mode="widthFix" lazy-load>
								</image>
							</view>
						</block>
					</view>
				</scroll-view>
				<view v-if="showEmoji">
					<scroll-view :style="{height: keyboardHeight+'px'}" scroll-y style="background-color: aliceblue;">
						<view
							style="display: grid;padding: 20rpx;;grid-template-columns: repeat(5,1fr);gap: 20rpx;text-align: center;">
							<block v-for="(item,index) in emojiList" v-bind:key="index">
								<view @click="addEmoji(item.name)">
									<image :src="item.url" style="width: 100rpx;height: 100rpx;" mode="widthFix"
										lazy-load>
									</image>
								</view>
							</block>
						</view>
					</scroll-view>
				</view>
				<view v-if="showAite" style="background-color: #f3f3f2;">
					<scroll-view style="height: 500rpx;" @scrolltolower="getAttentionUser">
						<view v-if="attentionUser.list.length>0" style="padding: 30rpx;">
							<block v-for="(item,index) in attentionUser.list" v-bind:key="item.id">
								<view style="display: flex;padding: 10rpx 0;align-items: center;">
									<image :src="item.avatarUrl" style="height: 90rpx;width: 90rpx;border-radius: 50%;">
									</image>
									<view
										style="display: flex;flex-direction: column;justify-content: space-between;margin-left: 20rpx;flex: 1;">
										<view style="font-size: 30rpx;color: #2b2b2b;">{{item.nickname}}</view>
									</view>
									<view style="margin-left: auto;">
										<view
											style="width: 150rpx;height: 60rpx;line-height: 60rpx;text-align: center;border-radius: 30rpx;background-color: #FF2442;color: #ffffff;font-size: 25rpx;"
											@click="addUser(item)">@Ta</view>
									</view>
								</view>
								<u-divider></u-divider>
							</block>
							<view style="margin-top: 70rpx;">
								<u-loadmore :status="attentionUser.status" loadingIcon="spinner" line></u-loadmore>
							</view>
						</view>
						<view v-else style="display: flex;justify-content: center;align-items: center;height: 500rpx;">
							<view style="font-size: 25rpx;color: #afafb0;">暂无数据</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</u-popup>
		<view v-if="!inputField"
			style="position: fixed;bottom: 0;display: flex;padding: 20rpx;box-sizing: border-box;height: 60px;width: 100%;background-color: #fff;">
			<view class="bottom-edit" @click="replyNotes">
				<u-icon name="/static/icons_edit.png" size="21"></u-icon>
				<view style="font-size: 32rpx;color: #afafb0;margin-left: 10rpx;">说点什么...</view>
			</view>
			<view class="bottom-icon">
				<view style="display: flex;align-items: center;margin: 0 10rpx;">
					<u-icon v-if="!notesDetail.isLike" name="/static/praise.png" size="28"></u-icon>
					<u-icon v-else name="/static/praise_select.png" size="28"></u-icon>
					<view v-if="notesDetail.notesLikeNum>0">{{notesDetail.notesLikeNum}}</view>
					<view style="font-size: 30rpx;" v-else>点赞</view>
				</view>
				<view style="display: flex;align-items: center;margin: 0 10rpx;">
					<u-icon v-if="!notesDetail.isCollect" name="/static/collect.png" size="28"></u-icon>
					<u-icon v-else name="/static/collect_select.png" size="28"></u-icon>
					<view v-if="notesDetail.notesCollectNum>0">{{notesDetail.notesCollectNum}}</view>
					<view style="font-size: 30rpx;" v-else>收藏</view>
				</view>
				<view style="display: flex;align-items: center;margin: 0 10rpx;">
					<u-icon name="/static/comment.png" size="28"></u-icon>
					<view v-if="commentCount>0">{{commentCount}}</view>
					<view style="font-size: 30rpx;" v-else>评论</view>
				</view>
			</view>
		</view>
		<view style="height: 60px;"></view>
	</view>
</template>

<script>
	import {
		emojiList
	} from '@/utils/emojiUtil.js'
	import {
		getNotesByNotesId
	} from '@/apis/notes_service.js'
	import {
		weChatTimeFormat
	} from '@/utils/util.js'
	import {
		getAttentionList
	} from '@/apis/user_service'
	import {
		addComment,
		getCommentCountByNotesId,
		getCommentFirstListByNotesId,
		getCommentSecondListByNotesId
	} from '@/apis/comment_service'
	import {
		baseUrl
	} from '@/config/index.js'
	export default {
		data() {
			return {
				editPlaceholder: '爱评论的人运气都不差',
				statusBarHeight: 0,
				notesDetail: {},
				commentCount: 0,
				commentList: [],
				swipperHeight: 0,
				swiperCurrent: 0,
				swipperCount: 0,
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
			}
		},
		methods: {
			clickUser(e) {
				console.log(e)
				if (e.detail.node.name != 'a') {
					return
				}
				let userId = this.findUserId(e.detail.node.attrs.href)
				this.goToOtherMine(userId)
			},
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
								item.page++;
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
											item.commentReplyNum++
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
													item.commentReplyNum++
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
			replyFirstComment(item) {
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
			replySecondComment(fitem, item) {
				this.editPlaceholder = '回复 @' + item.commentUserName
				this.content = ''
				this.revealcontent = ''
				this.replyCommentUserId = item.commentUserId
				this.replyCommentUserName = item.commentUserName
				this.parentId = fitem.id
				this.openEditor()
			},
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
			openEditor() {
				this.inputField = true
				this.showEmoji = false
				this.showAite = false
				setTimeout(() => {
					this.$refs.lsjComment.keyboardShow()
				}, 700)
			},
			onEditClick() {
				this.showEmoji = false
				this.showAite = false
			},
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
			previewImage(url) {
				uni.previewImage({
					urls: [url]
				})
			},
			goToOtherMine(userId) {
				uni.navigateTo({
					url: '/pages/mine/otherMine?userId=' + userId
				})
			},
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
			chooseAite() {
				uni.hideKeyboard()
				this.showAite = true
				this.showEmoji = false
				this.getAttentionUser()
			},
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
			deleteImage() {
				this.commentImagesurl = ''
				this.$refs.lsjComment.keyboardShow()
			},
			editReady(edit) {
				this.edit = edit
				const reg = /<img/g;
				if (!(this.revealcontent == '\n' || this.revealcontent == '') || reg.test(this.content)) {
					this.edit.ready(this.content)
				}
			},
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
			getCommentCountByNotesId({
				notesId: options.notesId
			}).then(res => {
				this.commentCount = res.data
			})
			getCommentFirstListByNotesId({
				notesId: options.notesId,
				page: 1,
				pageSize: 10
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
										item.picture.height = 350 * image.height / image.width
									} else {
										item.picture.width = image.width
										item.picture.height = image.height
									}
								} else {
									if (image.height > 350) {
										item.picture.height = 350
										item.picture.width = 350 * image.width / image.height
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
					this.commentList = res.data
				}, 700)
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

	.bottom-icon {
		display: flex;
		justify-content: space-around;
		font-size: 35rpx;
		color: #2b2b2b;
		justify-content: space-around;
		padding-right: 10rpx;
	}

	.bottom-edit {
		padding: 0 15rpx;
		background-color: #f3f3f2;
		border-radius: 50px;
		margin: 10rpx 18rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/deep/ .uni-swiper-dots {
		bottom: 30rpx;
	}

	/deep/ .lsjComment .lsj-edit-edit-container {
		background-color: #f3f3f2 !important;
		min-height: 40px !important;
		max-height: 140px !important;
		height: auto !important;
		font-size: 30rpx;
		padding: 30rpx;
		border-radius: 35rpx;
	}

	/deep/ .ql-editor.ql-blank:before {
		font-size: 30rpx;
	}

	/deep/ .editot-pd {
		padding: 15rpx 20rpx !important;
	}
</style>