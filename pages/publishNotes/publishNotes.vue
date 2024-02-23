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
								<text style="font-size: 35rpx;color: #FF2442;" @click="addTopic">添加</text>
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
				</u-popup>
				<u-popup :show="showEmoji" :round="10" mode="bottom" @close="showEmoji=false">
					<scroll-view :style="{height: keyboardHeight+'px'}" scroll-y>
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
				</u-popup>
				<view>
					<view style="margin-top: 20rpx;padding: 10rpx;">
						<u--input v-model="title" :fontSize="18" caret-color: #FF2442; placeholder="请输入标题"
							style="font-size: 30rpx;letter-spacing: 1px;" :maxlength="20" showWordLimit clearable
							border="none"></u--input>
						<u-divider></u-divider>
					</view>
					<lsj-edit ref="lsjEdit" placeholder="请输入正文" :maxCount="1000" @onReady="editReady">
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
							@click="showEmoji=true">
							<u-icon name="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/expression.png"
								:size="15"></u-icon>
							<view style="font-size: 25rpx;color: #2b2b2b;margin-left: 5rpx;">表情</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup :show="showCategory" :round="10" mode="bottom" @close="showCategory=false">
			<view style="height: 750rpx;">
				<view style="padding: 30rpx;height: 50rpx;text-align: center;font-size: 35rpx;line-height: 50rpx;">
					选择分类</view>
				<view style="padding: 0 30rpx 15rpx 30rpx;font-size: 24rpx;color: #2b2b2b;">tip:建议选择分类，ai分析生成的分类可能不准确</view>
				<scroll-view style="height: 600rpx;" scroll-y>
					<view v-for="rowIndex in Math.ceil(categoryList.length / 3)" :key="rowIndex"
						style="display: flex; padding: 40rpx;">
						<view v-for="colIndex in 3" :key="colIndex" style="text-align: center;width: 33%;"
							v-if="(rowIndex - 1) * 3 + colIndex - 1 < categoryList.length">
							<view @click="chooseCategoryItem(rowIndex,colIndex)"
								style="padding: 10rpx 20rpx;border-radius: 30rpx;background-color: #afafb0;color: #ffffff;margin: 0 20rpx;" :style="categoryId==categoryList[(rowIndex - 1) * 3 + colIndex - 1].id?'background-color:#FF2442;color:#ffffff':''">
								{{categoryList[(rowIndex - 1) * 3 + colIndex - 1].categoryName}}
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<u-cell v-if="categoryName==''" icon="grid" title="选择分类" @click="chooseCategory" :isLink="true"
			arrow-direction="right" :border="false" size="large"></u-cell>
		<u-cell v-else icon="grid" iconStyle="color: #FF2442" titleStyle="color: #FF2442" :title="categoryName"
			@click="chooseCategory" :isLink="true" arrow-direction="right" :border="false" size="large"></u-cell>
		<u-cell v-if="address==''" icon="map" title="添加地点" @click="chooseAddress" :isLink="true" arrow-direction="right"
			:border="false" size="large"></u-cell>
		<u-cell v-else icon="map" iconStyle="color: #2ca9e1" titleStyle="color: #2ca9e1" :title="address"
			@click="chooseAddress" :isLink="true" arrow-direction="right" :border="false" size="large"></u-cell>
		<u-cell v-if="authority===0" icon="lock-open" title="公开可见" :isLink="true" arrow-direction="right"
			:border="false" size="large" @click="chooseAuth"></u-cell>
		<u-cell v-if="authority===1" icon="lock" title="仅自己可见" iconStyle="color: #FF2442" titleStyle="color: #FF2442"
			:isLink="true" arrow-direction="right" :border="false" size="large" @click="chooseAuth"></u-cell>
		<view style="height: 180rpx;"></view>
		<view v-if="showBottom"
			style="display: flex;position: fixed;bottom: 0;width: 750rpx;height: 160rpx;align-items: center;z-index: 99;background-color: #ffffff;">
			<view style="display: flex;flex-direction: column;align-items: center;margin-left: 30rpx;flex: 1;"
				@click="saveDraftTip">
				<u-icon
					name="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E5%AD%98%E8%8D%89%E7%A8%BF.png"
					size="40"></u-icon>
				<view style="font-size: 25rpx;color: #2b2b2b;">存草稿</view>
			</view>
			<view @click="publishNotes"
				style="margin-left: 30rpx;margin-right: 30rpx;border-radius: 50px;flex: 5;background-color:#FF2442;height: 100rpx;display: flex;align-items: center;justify-content: center;">
				<view style="color: #ffffff;font-size: 37rpx;letter-spacing: 1px;">发布笔记</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getAttentionList
	} from '../../apis/user_service'
	import editBtns from '@/uni_modules/lsj-edit/components/lsj-edit/edit-btns/edit-btns.vue'
	import {
		emojiList
	} from '@/utils/emojiUtil.js'
	import {
		addNote,
		getNotesCategoryList
	} from '../../apis/notes_service'
	import {
		baseUrl
	} from '../../config/index.js'
	import {
		uploadFile
	} from "@/utils/fileUtil.js"
	export default {
		components: {
			editBtns
		},
		data() {
			return {
				isUpdate: false,
				tableId: '',
				edit: null,
				type: '',
				tempFilePaths: [],
				coverPicture: '',
				videoB: '',
				title: '',
				content: '',
				topicname: '',
				categoryName: '',
				categoryId: '',
				categoryList: [],
				showCategory: false,
				showAddTopic: false,
				showAttenUser: false,
				attentionUser: {
					list: [],
					page: 1,
					pageSize: 10,
					status: 'loading',
					isLoading: false,
					isNoMore: false
				},
				keyboardHeight: 302,
				showEmoji: false,
				emojiList: [],
				address: '',
				latitude: '',
				longitude: '',
				authority: 0,
				showBottom: true
			};
		},
		methods: {
			// 选择分类
			chooseCategory() {
				if (this.categoryList.length != 0) {
					this.showCategory = true
					return
				}
				getNotesCategoryList().then(res => {
					if (res.code == 20010) {
						this.categoryList = res.data
						console.log(this.categoryList)
						this.showCategory = true
					} else {
						uni.showToast({
							title: '获取分类失败',
							icon: 'none'
						});
					}
				}).catch(err => {
					uni.showToast({
						title: '获取分类失败',
						icon: 'none'
					});
				})
			},
			chooseCategoryItem(rowIndex, colIndex) {
				this.categoryName = this.categoryList[(rowIndex - 1) * 3 + colIndex - 1].categoryName
				this.categoryId = this.categoryList[(rowIndex - 1) * 3 + colIndex - 1].id
				this.showCategory = false
			},
			publishNotes() {
				// 检查字段
				if (this.title == '') {
					uni.showToast({
						title: '请输入标题',
						icon: 'none'
					});
					return
				}
				this.$showModal({
					title: "提示",
					content: "确认发布笔记吗？",
					align: "left", // 对齐方式 left/center/right
					cancelText: "取消", // 取消按钮的文字
					cancelColor: "#FF2442", // 取消按钮颜色
					confirmText: "确定", // 确认按钮文字
					confirmColor: "#FF2442", // 确认按钮颜色 
					showCancel: true, // 是否显示取消按钮，默认为 true
				}).then(res => {
					uni.showLoading({
						title: '发布中...',
						mask: true,
					})
					// 将tempFilePaths中本地路径的文件全部上传
					let promises = [];
					let notesResources = [];
					if (this.type === 0) {
						// 多个文件上传
						console.log(this.tempFilePaths)
						this.tempFilePaths.forEach(item => {
							promises.push(uploadFile(baseUrl + '/third/uploadImg', item, 'file'));
						})
					} else {
						// 单个文件上传
						promises.push(uploadFile(baseUrl + '/third/uploadVideo', this.tempFilePaths[0], 'file'));
					}
					Promise.all(promises).then(res => {
						notesResources = res
						console.log(notesResources)
						this.edit.getContents().then(res => {
							console.log(res)
							let noteVO = {
								title: this.title,
								realContent: res.text,
								content: res.html,
								belongCategory: this.categoryId==''?null:this.categoryId,
								notesType: this.type,
								belongUserId: uni.getStorageSync('userInfo').id,
								coverPicture: this.coverPicture,
								address: this.address,
								latitude: this.latitude,
								longitude: this.longitude,
								authority: this.authority,
								notesResources: JSON.stringify(notesResources)
							}
							console.log(noteVO)
							addNote({
								notesVO: noteVO
							}).then(res => {
								if (res.code == 20020) {
									if (this.isUpdate) {
										this.$sqliteUtil.SqlExecute(
											`delete from draft_notes where id = ${this.tableId}`
										)
									}
									setTimeout(() => {
										uni.hideLoading()
										uni.showToast({
											title: '发布成功',
											icon: 'none'
										});
										uni.switchTab({
											url: '/pages/index/index'
										})
									}, 500)
								} else {
									uni.hideLoading()
									uni.showToast({
										title: res.msg == '' ? '发布失败' : res.msg,
										icon: 'none'
									});
								}
							}).catch(err => {
								uni.hideLoading()
								uni.showToast({
									title: '发布失败',
									icon: 'none'
								});
							})
						}).catch(err => {
							uni.hideLoading()
							uni.showToast({
								title: '发布失败',
								icon: 'none'
							});
						})
					}).catch(err => {
						uni.hideLoading()
						uni.showToast({
							title: '发布失败',
							icon: 'none'
						});
					})
				})
			},
			saveDraftTip() {
				// 查询所有草稿
				this.$sqliteUtil.SqlSelect(`select * from draft_notes`).then(res => {
					console.log(res)
				})
				this.$showModal({
					title: "提示",
					content: "确认保存笔记至草稿箱吗？",
					align: "left", // 对齐方式 left/center/right
					cancelText: "取消", // 取消按钮的文字
					cancelColor: "#FF2442", // 取消按钮颜色
					confirmText: "确定", // 确认按钮文字
					confirmColor: "#FF2442", // 确认按钮颜色 
					showCancel: true, // 是否显示取消按钮，默认为 true
				}).then(res => {
					// 将页面数据存入数据库
					this.saveDraft()
				})
			},
			saveDraft() {
				// 保存草稿
				this.edit.getContents().then(res => {
					console.log(res)
					this.content = res.html
					if (this.coverPicture == '' && this.type == 0) {
						this.coverPicture = this.tempFilePaths[0]
					}
					if (this.isUpdate) {
						let sql1 = `delete from draft_notes where id = ${this.tableId}`
						this.$sqliteUtil.SqlExecute(sql1).then(res => {
							console.log(res)
						})
					}
					setTimeout(() => {
						let sql2 =
							`insert into draft_notes (title,content,type,coverPicture,address,latitude,longitude,authority,tempFilePaths,updateTime) values ('${this.title}','${this.content}','${this.type}','${this.coverPicture}','${this.address}','${this.latitude}','${this.longitude}','${this.authority}','${JSON.stringify(this.tempFilePaths)}',datetime('now','localtime'))`
						this.$sqliteUtil.SqlExecute(sql2).then(res => {
							uni.showToast({
								title: '保存成功',
								icon: 'none'
							});
							uni.switchTab({
								url: '/pages/index/index'
							})
						}).catch(err => {
							uni.showToast({
								title: '保存失败',
								icon: 'none'
							});
						})
					}, 500)
				})
			},
			chooseAuth() {
				uni.showActionSheet({
					itemList: ['公开可见', '仅自己可见'],
					success: (res) => {
						if (res.tapIndex == 0) {
							this.authority = 0
						} else {
							this.authority = 1
						}
					}
				});
			},
			chooseAddress() {
				uni.chooseLocation({
					success: (res) => {
						if (res.name === '地图位置') {
							this.address = res.address
						} else {
							this.address = res.name
						}
					}
				});
			},
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
			// 插入话题
			addTopic() {
				// this.edit.insertCustomHtml(`<span style="color: #e2041b;">#${this.topicname}#</span>`)
				this.edit.addLink({
					prefix: '#',
					suffix: '#',
					name: this.topicname,
					data: {
						topicname: this.topicname,
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
			},
			editReady(edit) {
				// 将富文本对象存放到当前页面，便于后续直接操作
				this.edit = edit;
				this.edit.ready(this.content)
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
			if (options.update == 0) {
				// 从发布笔记进入
				this.type = Number(options.type)
				this.tempFilePaths = JSON.parse(options.tempFilePaths)
			} else if (options.update == 1) {
				// 从草稿箱进入
				this.isUpdate = true
				this.tableId = options.tableId
				let id = options.tableId
				let sql = `select * from draft_notes where id=${id}`
				this.$sqliteUtil.SqlSelect(sql).then(res => {
					console.log(res)
					this.title = res[0].title
					this.content = res[0].content
					this.type = Number(res[0].type)
					this.coverPicture = res[0].coverPicture
					this.videoB = res[0].videoB
					this.topicname = res[0].topicname
					this.address = res[0].address
					this.latitude = res[0].latitude
					this.longitude = res[0].longitude
					this.authority = Number(res[0].authority)
					this.tempFilePaths = JSON.parse(res[0].tempFilePaths)
				})
			} else if (options.update == 2) {
				// 从编辑笔记进入
				this.isUpdate = true
				this.tableId = options.tableId
				let id = options.tableId

			}
			// 获取表情列表
			let sql = `select * from emoji_list`
			this.$sqliteUtil.SqlSelect(sql).then(res => {
				if (res.length == 0) {
					this.emojiList = emojiList
				} else {
					this.emojiList = res
				}
			})
			uni.getLocation({
				type: 'gcj02',
				success: (res) => {
					this.latitude = res.latitude
					this.longitude = res.longitude
				}
			});
			uni.onKeyboardHeightChange((res) => {
				if (res.height != 0) {
					this.keyboardHeight = res.height
				}
				if (res.height == 0) {
					this.showBottom = true
				} else {
					this.showBottom = false
				}
			});
		},
		onBackPress() {
			if (this.showAddTopic) {
				this.showAddTopic = false
				return true
			}
			if (this.showAttenUser) {
				this.showAttenUser = false
				return true
			}
			if (this.showEmoji) {
				this.showEmoji = false
				return true
			}
			uni.showActionSheet({
				alertText: '是否保存草稿',
				itemList: ['保存草稿', '不保存'],
				success: (res) => {
					if (res.tapIndex == 0) {
						this.saveDraft()
					} else {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}
				}
			})
			return true
		}
	}
</script>

<style lang="scss">
	editor {
		caret-color: #FF2442;
	}

	input {
		caret-color: #FF2442;
	}
</style>