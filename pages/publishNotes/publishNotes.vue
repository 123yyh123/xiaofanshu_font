<template>
	<view>
		<view style="padding: 30rpx;">
			<view>
				<scroll-view v-if="type===0" scroll-x enable-flex="true">
					<view style="display: flex;">
						<block v-for="(item,index) in tempFilePaths" v-bind:key="index">
							<view style="position: relative;">
								<u--image :showLoading="true" :src="item" mode="aspectFill" height="240rpx"
									width="240rpx" :radius="10" style="margin: 0 10rpx;"></u--image>
								<view
									style="position: absolute;top: 0;right: 10rpx;background-color: #7d7d7d;padding: 5rpx;border-bottom-left-radius: 50%;border-top-right-radius: 5rpx;">
									<u-icon name="close" size="12" color="#f3f3f2" @click="deleteImage(index)"></u-icon>
								</view>
							</view>
						</block>
						<view>
							<view @click="insertImage"
								style="width: 240rpx;height: 240rpx;border-radius: 10px;display: flex;justify-content: center;align-items: center;background-color: #f3f3f2;margin: 0 10rpx;">
								<u-icon name="plus" size="28"></u-icon>
							</view>
						</view>
					</view>
				</scroll-view>
				<scroll-view v-else-if="type===1" scroll-x enable-flex="true">
					<view v-show="false">
						<video id="video" :src="tempFilePaths[0]" controls="controls" style="width: 100%;"
							@fullscreenchange="fullscreenchange"></video>
					</view>
					<view style="display: flex;">
						<view>
							<view
								style="width: 240rpx;height: 240rpx;border-radius: 10px;display: flex;justify-content: center;align-items: center;background-color: #f3f3f2;margin: 0 10rpx;">
								<u-icon
									name="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E8%A7%86%E9%A2%91.png"
									size="28"></u-icon>
							</view>
						</view>
						<view>
							<view v-if="coverPicture!=''" style="position: relative;">
								<u--image :src="coverPicture" mode="aspectFill" height="240rpx" width="240rpx"
									:radius="10" style="margin: 0 10rpx;"></u--image>
								<view @click="deleteCoverPicture"
									style="position: absolute;top: 0;right: 10rpx;background-color: #7d7d7d;padding: 10rpx;border-bottom-left-radius: 50%;border-top-right-radius: 5rpx;">
									<u--image
										src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E5%8F%89%E5%8F%B7.png"
										mode="aspectFill" height="20rpx" width="20rpx"></u--image>
								</view>
							</view>
							<view v-else>
								<view @click="insertCoverPicture"
									style="width: 240rpx;height: 240rpx;border-radius: 10px;background-color: #f3f3f2;margin: 0 10rpx;display: flex;flex-direction: column;justify-content: center;align-items: center;">
									<u-icon name="plus-circle" size="28"></u-icon>
									<view style="font-size: 23rpx;color: #2b2b2b;">添加封面</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 预览视频 -->
					<view
						style="background-color: #f3f3f2;margin-top: 20rpx;border-radius: 10px;padding: 10rpx 20rpx;display: inline-flex;margin-left: 10rpx;"
						@click="previewVideo">
						<u-icon name="play-right-fill" color="#2b2b2b"></u-icon>
						<view style="font-size: 23rpx;color: #2b2b2b;">预览视频</view>
					</view>
				</scroll-view>
				<u-popup :show="showAddTopic" :round="10" mode="center" @close="showAddTopic=false"
					:overlayOpacity="0.3" :safeAreaInsetBottom="true">
					<view style="width: 570rpx;">
						<view style="padding: 20rpx;text-align: center;">
							<view style="font-size: 35rpx;">添加话题</view>
							<view style="font-size: 25rpx;color: #949495;margin-top: 10rpx;">最多不超过12字</view>
						</view>
						<view
							style="margin: 30rpx;margin-top: 15rpx;padding: 20rpx;background-color: #f3f3f2;border-radius: 20rpx;">
							<u-input placeholder="请输入话题" v-model="topicname" focus border="none" clearable
								maxlength="12" color="#2b2b2b"></u-input>
						</view>
						<u-line></u-line>
						<view style="padding: 30rpx;display: flex;">
							<view
								style="flex: 1;text-align: center;border-right-style: solid;border-right-color: #e5e4e6;border-right-width: 0.5rpx;">
								<text style="font-size: 35rpx;color: #949495;" @click="cancelAddTopic">取消</text>
							</view>
							<view style="flex: 1;text-align: center;">
								<text style="font-size: 35rpx;color: #e83929;" @click="addTopic">添加</text>
							</view>
						</view>
					</view>
				</u-popup>
				<u-popup :show="showAttenUser" :round="10" mode="bottom" @close="showAttenUser=false">
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
											style="width: 150rpx;height: 60rpx;line-height: 60rpx;text-align: center;border-radius: 30rpx;background-color: #e2041b;color: #f3f3f2;font-size: 25rpx;"
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
				</u-popup>
				<view>
					<view style="margin-top: 20rpx;padding: 10rpx;">
						<u--input v-model="title" :fontSize="18" caret-color: #F56C6C; placeholder="请输入标题"
							style="font-size: 30rpx;" :maxlength="20" showWordLimit clearable border="none"></u--input>
						<u-divider></u-divider>
						<lsj-edit ref="lsjEdit" placeholder="请输入正文" :maxCount="200" @onReady="editReady">
						</lsj-edit>
						<view style="display: flex;margin-top: 10rpx;">
							<view style="padding: 15rpx;background-color: #dcdddd;border-radius: 40rpx;display: flex;"
								@click="showAddTopic=true">
								<u-icon
									name="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E8%AF%9D%E9%A2%98%20%282%29.png"
									:size="14"></u-icon>
								<view style="font-size: 25rpx;color: #2b2b2b;margin-left: 5rpx;">添加话题</view>
							</view>
							<view
								style="padding: 15rpx;background-color: #dcdddd;border-radius: 40rpx;display: flex;margin-left: 20rpx;"
								@click="openAttenUser">
								<u-icon
									name="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E8%89%BE%E7%89%B9.png"
									:size="14"></u-icon>
								<view style="font-size: 25rpx;color: #2b2b2b;margin-left: 5rpx;">用户</view>
							</view>
							<view
								style="padding: 15rpx;background-color: #dcdddd;border-radius: 40rpx;display: flex;margin-left: 20rpx;"
								@click="save">
								<u-icon
									name="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E6%96%87%E4%BB%B6.png"
									:size="14"></u-icon>
								<view style="font-size: 25rpx;color: #2b2b2b;margin-left: 5rpx;">完成</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getAttentionList
	} from '../../apis/user_service'
	import editBtns from '@/uni_modules/lsj-edit/components/lsj-edit/edit-btns/edit-btns.vue'
	export default {
		components: {
			// 富文本基本操作按键，可自行选择是否使用示例的按键
			editBtns
		},
		data() {
			return {
				edit: null,
				type: '',
				tempFilePaths: [],
				coverPicture: '',
				videoB: '',
				title: '',
				content: '',
				topicname: '',
				showAddTopic: false,
				showAttenUser: false,
				attentionUser: {
					list: [],
					page: 1,
					pageSize: 10,
					status: 'loading',
					isLoading: false,
					isNoMore: false
				}
			};
		},
		methods: {
			cancelAddTopic() {
				this.topicname = ''
				this.showAddTopic = false
			},
			openAttenUser() {
				this.showAttenUser = true
				this.getAttentionUser()
			},
			getAttentionUser() {
				if (this.attentionUser.isNoMore) {
					return;
				}
				this.attentionUser.isLoading = true;
				setTimeout(() => {
					getAttentionList({
						userId: uni.getStorageSync('userInfo').id,
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
			// 演示发布
			async save() {
				// 获取插入的图片列表
				let imgs = await this.edit.getImages()
				// 判断是否允许提交
				if (!this.edit.textCount && !imgs.length) {
					uni.showToast({
						title: '请录入内容'
					});
				}
				let con = await this.edit.getContents()
				console.log(con)
			},
			// 插入话题示例
			addTopic() {
				this.edit.addLink({
					prefix: '#',
					suffix: '#',
					name: this.topicname,
					data: {
						name: '话题',
						topicId: 10,
					}
				})
				this.topicname = ''
				this.showAddTopic = false
			},
			// @某人示例
			addUser(item) {
				this.showAttenUser = false
				this.edit.addLink({
					prefix: '@',
					name: item.nickname,
					data: {
						userId: item.userId,
					}
				})
			},
			editReady(edit) {
				// 将富文本对象存放到当前页面，便于后续直接操作
				this.edit = edit;
			},
			previewVideo() {
				this.videoB = uni.createVideoContext('video', this)
				this.videoB.requestFullScreen({
					direction: 0
				})
				this.videoB.play()
			},
			fullscreenchange(e) {
				if (!e.detail.fullScreen) {
					this.videoB.pause()
				}
			},
			deleteCoverPicture() {
				this.coverPicture = ''
			},
			insertCoverPicture() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						// tempFilePath可以作为img标签的src属性显示图片
						let tempFilePaths = res.tempFilePaths
						let filePaths = []
						tempFilePaths.forEach(item => {
							uni.saveFile({
								tempFilePath: item,
								success: (res) => {
									filePaths.push(res.savedFilePath)
									if (filePaths.length == tempFilePaths.length) {
										this.coverPicture = filePaths[0]
									}
								}
							});
						})
					}
				})
			},
			deleteImage(index) {
				// 去除下标为index的图片
				this.tempFilePaths.splice(index, 1)
			},
			insertImage() {
				// 最多插入9个图片
				if (this.tempFilePaths.length >= 9) {
					return
				}
				uni.chooseImage({
					count: 9 - this.tempFilePaths.length,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						// tempFilePath可以作为img标签的src属性显示图片
						let tempFilePaths = res.tempFilePaths
						let filePaths = []
						tempFilePaths.forEach(item => {
							uni.saveFile({
								tempFilePath: item,
								success: (res) => {
									filePaths.push(res.savedFilePath)
									if (filePaths.length == tempFilePaths.length) {
										this.tempFilePaths = this.tempFilePaths.concat(
											filePaths)
									}
								}
							});
						})
					}
				})
			}
		},
		onLoad(options) {
			this.type = Number(options.type)
			this.tempFilePaths = JSON.parse(options.tempFilePaths)
		},
	}
</script>

<style lang="scss">
	editor {
		caret-color: #F56C6C;
	}

	input {
		caret-color: #F56C6C;
	}
</style>