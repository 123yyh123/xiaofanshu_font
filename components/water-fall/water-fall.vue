<template>
	<view style="width: 100%;display: flex;flex-wrap: wrap;">
		<view class="water-left">
			<block v-for="(item,index) in leftList" :key="index">
				<view style="position: relative;" @click="goToDetail(item.id,item.notesType)">
					<u--image :src="item.coverPicture" width="100%" height="auto" mode="widthFix" :fade="false" lazyLoad
						style="max-height: 500rpx;overflow: hidden;border-radius: 20rpx;">
						<template v-slot:loading>
							<view style="height: 200rpx;text-align: center;padding: 20rpx;">
								<u-loading-icon color="#e83929"></u-loading-icon>
								<view style="font-size: 30rpx;">loading......</view>
							</view>
						</template>
					</u--image>
					<view class="look-views" v-if="item.notesViewNum!=null&&item.belongUserId==userId">
						<u-icon name="eye" color="#ffffff" size="25rpx"></u-icon>
						<view style="margin-left: 5rpx;">{{item.notesViewNum}}</view>
					</view>
					<view v-if="item.notesType==1" class="video-play">
						<u-icon name="play-right-fill" color="#ffffff" size="25rpx"></u-icon>
					</view>
				</view>
				<view class="title" @click="goToDetail(item.id,item.notesType)">{{item.title}}</view>
				<view style="display: flex;position: relative;padding: 20rpx;" v-if="slot_bottom">
					<image style="height: 20px;width: 20px;border-radius: 50%;" mode="aspectFill" :src="item.avatarUrl">
					</image>
					<view class="note-username">
						{{item.nickname}}
					</view>
					<view style="display: flex;position: absolute;right: 10rpx;">
						<u-transition :show="!item.isLike" mode="fade" duration="2000">
							<u-icon v-if="!item.isLike" name="/static/praise.png" size="18"
								@click="praiseNotes(item.id,item.belongUserId,1,index)"></u-icon>
						</u-transition>
						<u-transition :show="item.isLike" mode="fade" duration="2000">
							<u-icon v-if="item.isLike" name="/static/praise_select.png" size="18"
								@click="praiseNotes(item.id,item.belongUserId,1,index)"></u-icon>
						</u-transition>
						<view v-if="item.notesLikeNum>0"
							style="color: gray;font-size: 15px;line-height: 18px;margin-left: 3rpx;">
							{{item.notesLikeNum}}
						</view>
					</view>
				</view>
				<view v-else style="display: flex;position: relative;padding: 20rpx;">
					<view style="margin-right: auto;color: #c8c9cc;font-size: 23rpx;">{{item.updateTime}}</view>
					<u-icon name="trash" @click="deleteDraft(item.id,0)" color="#c8c9cc" size="18"></u-icon>
				</view>
			</block>
		</view>
		<view class="water-right">
			<block v-for="(item,index) in rightList" :key="index">
				<view style="position: relative;" @click="goToDetail(item.id,item.notesType)">
					<u--image :src="item.coverPicture" width="100%" height="auto" mode="widthFix" :fade="false" lazyLoad
						style="max-height: 500rpx;overflow: hidden;border-radius: 20rpx;">
						<template v-slot:loading>
							<view style="height: 200rpx;text-align: center;padding: 20rpx;margin-bottom: 30rpx;">
								<u-loading-icon color="#e83929"></u-loading-icon>
								<view style="font-size: 30rpx;">loading......</view>
							</view>
						</template>
					</u--image>
					<view class="look-views" v-if="item.notesViewNum!=null&&item.belongUserId==userId">
						<u-icon name="eye" color="#ffffff" size="25rpx"></u-icon>
						<view style="margin-left: 5rpx;">{{item.notesViewNum}}</view>
					</view>
					<view v-if="item.notesType==1" class="video-play">
						<u-icon name="play-right-fill" color="#ffffff" size="25rpx"></u-icon>
					</view>
				</view>
				<view class="title" @click="goToDetail(item.id,item.notesType)">{{item.title}}</view>
				<view style="display: flex;position: relative;padding: 20rpx;" v-if="slot_bottom">
					<image style="height: 20px;width: 20px;border-radius: 50%;" mode="aspectFill" :src="item.avatarUrl">
					</image>
					<view class="note-username">
						{{item.nickname}}
					</view>
					<view style="display: flex;position: absolute;right: 10rpx;">
						<u-transition :show="!item.isLike" mode="fade" duration="2000">
							<u-icon v-if="!item.isLike" name="/static/praise.png" size="18"
								@click="praiseNotes(item.id,item.belongUserId,2,index)"></u-icon>
						</u-transition>
						<u-transition :show="item.isLike" mode="fade" duration="2000">
							<u-icon v-if="item.isLike" name="/static/praise_select.png" size="18"
								@click="praiseNotes(item.id,item.belongUserId,2,index)"></u-icon>
						</u-transition>
						<view v-if="item.notesLikeNum>0"
							style="color: gray;font-size: 15px;line-height: 18px;margin-left: 3rpx;">
							{{item.notesLikeNum}}
						</view>
					</view>
				</view>
				<view v-else style="display: flex;position: relative;padding: 20rpx;">
					<view style="margin-right: auto;color: #c8c9cc;font-size: 23rpx;">{{item.updateTime}}</view>
					<u-icon name="trash" @click="deleteDraft(item.id,1)" color="#c8c9cc" size="18"></u-icon>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		praiseOrCancelNotes
	} from '@/apis/notes_service.js'
	import {
		pxToRpx
	} from '@/utils/util.js'
	export default {
		name: "water-fall",
		data() {
			return {
				leftList: [],
				rightList: [],
				leftHeight: 0,
				rightHeight: 0,
				userId: uni.getStorageSync('userInfo').id
			};
		},
		props: {
			list: {
				type: Array,
				default: () => []
			},
			slot_bottom: {
				type: Boolean,
				default: true
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.list.forEach((item) => {
					this.getImageHeight(item.coverPicture).then(res => {
						item.coverPicture = res.path
						if (this.leftHeight <= this.rightHeight) {
							this.leftList.push(item)
							this.leftHeight += res.height+pxToRpx(50)
						} else {
							this.rightList.push(item)
							this.rightHeight += res.height+pxToRpx(50)
						}
					})
				})
			},
			getImageHeight(s) {
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: s,
						success: (res) => {
							let imageHeight = pxToRpx(res.height);
							let imageWidth = pxToRpx(res.width);
							const width = 360;
							const maxHeight = 500;
							let height = width * imageHeight / imageWidth;
							if (height > maxHeight) {
								height = maxHeight;
							}
							let obj = {
								height: height,
								path: res.path
							}
							resolve(obj)
						},
					})
				})
			},
			praiseNotes(id, targetUserId, type, index) {
				praiseOrCancelNotes({
					notesId: id,
					userId: uni.getStorageSync('userInfo').id,
					targetUserId: targetUserId
				}).then(res => {
					console.log(res)
					if (res.code == 20020) {
						if (type === 1) {
							if (this.leftList[index].isLike) {
								this.leftList[index].notesLikeNum = this.leftList[index].notesLikeNum - 1
								this.leftList[index].isLike = false
							} else {
								this.leftList[index].notesLikeNum = this.leftList[index].notesLikeNum + 1
								this.leftList[index].isLike = true
							}
						} else {
							if (this.rightList[index].isLike) {
								this.rightList[index].notesLikeNum = this.rightList[index].notesLikeNum - 1
								this.rightList[index].isLike = false
							} else {
								this.rightList[index].notesLikeNum = this.rightList[index].notesLikeNum + 1
								this.rightList[index].isLike = true
							}
						}
					}
				})
			},
			addList(e) {
				console.log(e)
				e.forEach((item) => {
					this.getImageHeight(item.coverPicture).then(res => {
						item.coverPicture = res.path
						if (this.leftHeight <= this.rightHeight) {
							this.leftList.push(item)
							this.leftHeight += res.height+pxToRpx(50)
						} else {
							this.rightList.push(item)
							this.rightHeight += res.height+pxToRpx(50)
						}
					})
				})
			},
			refresh() {
				this.leftList = []
				this.rightList = []
				this.leftHeight = 0
				this.rightHeight = 0
				this.init()
			},
			clear() {
				this.leftList = []
				this.rightList = []
				this.leftHeight = 0
				this.rightHeight = 0
			},
			deleteDraft(id, num) {
				this.$showModal({
					title: "提示",
					content: "确认删除该草稿吗？",
					align: "left", // 对齐方式 left/center/right
					cancelText: "取消", // 取消按钮的文字
					cancelColor: "#FF2442", // 取消按钮颜色
					confirmText: "确定", // 确认按钮文字
					confirmColor: "#FF2442", // 确认按钮颜色 
					showCancel: true, // 是否显示取消按钮，默认为 true
				}).then(res => {
					console.log(id)
					let sql = `delete from draft_notes where id = ${id}`
					this.$sqliteUtil.SqlExecute(sql).then(res => {
						if (num == 0) {
							this.leftList = this.leftList.filter(item => item.id != id)
						} else {
							this.rightList = this.rightList.filter(item => item.id != id)
						}
					})
				})
			},
			goToDetail(id, type) {
				if (!this.slot_bottom) {
					// 草稿
					uni.navigateTo({
						url: '/pages/publishNotes/publishNotes?update=1&tableId=' + id
					})
				} else {
					// 笔记
					if (type == 0) {
						uni.navigateTo({
							url: '/pages/notesDetail/notesDetail?notesId=' + id
						})
					} else {
						uni.navigateTo({
							url: '/pages/notesDetail/notesVideoDetail/noteVideoD?notesId=' + id
						})
					}
				}
			}
		},
	}
</script>

<style lang="scss">
	.water-left,
	.water-right {
		width: 48%;
		margin: 20rpx auto;
	}

	.title {
		font-size: 30rpx;
		padding: 10rpx;
		color: #000000;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-height: 1.4em;
		max-height: 2.4em;
	}

	.note-username {
		margin-left: 10rpx;
		color: #16160e;
		font-size: 23rpx;
		line-height: 20px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: calc(100% - 70px);
	}

	.look-views {
		display: flex;
		position: absolute;
		bottom: 20rpx;
		left: 8rpx;
		color: #ffffff;
		background-color: rgba(123, 124, 125, 0.6);
		// filter: brightness(65%);
		padding: 5rpx 10rpx;
		border-radius: 50rpx;
		font-size: 25rpx;
	}

	.video-play {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		background-color: rgba(123, 124, 125, 0.6);
		// filter: brightness(65%);
		padding: 10rpx;
		border-radius: 50%;
	}
</style>