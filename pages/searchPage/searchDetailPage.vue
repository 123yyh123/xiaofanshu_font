<template>
	<view>
		<view :style="{height: statusBarHeight + 'px'}"
			style="position: fixed;top: 0;width: 100%;background-color: #fff;z-index: 9999;"></view>
		<view :style="{height: statusBarHeight + 'px'}"></view>
		<view style="padding: 10rpx 30rpx 10rpx 15rpx;display: flex;height: 44px;align-items: center;">
			<u-icon @click="goToBack" name="arrow-left" size="25"></u-icon>
			<view @click="goToSearchValue"
				style="background-color: #f2f2f2;padding: 10rpx 20rpx;color: #606266;display: flex;border-radius: 50rpx;flex: 1;margin-left: 20rpx;height: 64rpx;align-items: center;text-align: center;box-sizing: border-box;">
				<u-icon name="search" size="22" color="#909399"></u-icon>
				<view style="font-size: 30rpx;margin-left: 15rpx;">{{searchValue}}</view>
			</view>
		</view>
		<view
			style="display: flex;height: 35px;width: 100%;align-items: flex-start;border-bottom-style: solid;border-bottom-color: #f3f3f2;border-bottom-width: 1rpx;">
			<view style="display: flex;align-items: center;width: 33%;justify-content: center;" @click="clickAll"
				:style="{color: current === 0 ? '#16160e' : '#9fa0a0',fontWeight: current === 0 ? '600' : 'normal'}">
				<view>{{radiovalue1}}</view>
				<u-icon v-if="!show" name="arrow-down" size="18"
					:color="current === 0 ? '#16160e' : '#9fa0a0'"></u-icon>
				<u-icon v-else name="arrow-up" size="18" :color="current === 0 ? '#16160e' : '#9fa0a0'"></u-icon>
			</view>
			<view style="display: flex;align-items: center;width: 33%;justify-content: center;font-weight: ;"
				@click="clickUser"
				:style="{color: current === 1 ? '#16160e' : '#9fa0a0',fontWeight: current === 1 ? '600' : 'normal'}">
				<view>用户</view>
			</view>
			<u-transition :show="current==0" mode="slide-right">
				<view style="display: flex;align-items: center;width: 250rpx;justify-content: center;">
					<view style="color: #9fa0a0;font-size: 30rpx;">|</view>
					<view style="margin-left: 20rpx;"
						:style="{color: screening ? '#16160e' : '#9fa0a0',fontWeight: screening ? '600' : 'normal'}"
						@click="openScreening">筛选</view>
					<u-icon name="list" size="18" :color="screening ? '#16160e' : '#9fa0a0'"
						@click="openScreening"></u-icon>
				</view>
			</u-transition>
		</view>
		<view v-if="current==0" class="component">
			<view style="width: 100%;display: flex;flex-wrap: wrap;">
				<view class="water-left">
					<block v-for="(item,index) in notesList.leftList" :key="index">
						<view style="position: relative;" @click="goToDetail(item.id,item.notesType)">
							<u--image :src="item.coverPicture" width="100%" height="auto" mode="widthFix"
								style="max-height: 500rpx;overflow: hidden;border-radius: 20rpx;">
								<template v-slot:loading>
									<view style="height: 200rpx;text-align: center;padding: 20rpx;">
										<u-loading-icon color="#e83929"></u-loading-icon>
										<view style="font-size: 30rpx;">loading......</view>
									</view>
								</template>
							</u--image>
							<view class="look-views" v-if="item.views!=null">
								<u-icon name="eye" color="#ffffff" size="25rpx"></u-icon>
								<view style="margin-left: 5rpx;">{{item.views}}</view>
							</view>
							<view v-if="item.notesType==1" class="video-play">
								<u-icon name="play-right-fill" color="#ffffff" size="25rpx"></u-icon>
							</view>
						</view>
						<view class="title" @click="goToDetail(item.id,item.notesType)">{{item.title}}</view>
						<view style="display: flex;position: relative;padding: 20rpx;">
							<image style="height: 20px;width: 20px;border-radius: 50%;" mode="aspectFill"
								:src="item.avatarUrl">
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
					</block>
				</view>
				<view class="water-right">
					<block v-for="(item,index) in notesList.rightList" :key="index">
						<view style="position: relative;" @click="goToDetail(item.id,item.notesType)">
							<u--image :src="item.coverPicture" width="100%" height="auto" mode="widthFix"
								style="max-height: 500rpx;overflow: hidden;border-radius: 20rpx;">
								<template v-slot:loading>
									<view
										style="height: 200rpx;text-align: center;padding: 20rpx;margin-bottom: 30rpx;">
										<u-loading-icon color="#e83929"></u-loading-icon>
										<view style="font-size: 30rpx;">loading......</view>
									</view>
								</template>
							</u--image>
							<view class="look-views" v-if="item.views!=null">
								<u-icon name="eye" color="#ffffff" size="25rpx"></u-icon>
								<view style="margin-left: 5rpx;">{{item.views}}</view>
							</view>
							<view v-if="item.notesType==1" class="video-play">
								<u-icon name="play-right-fill" color="#ffffff" size="25rpx"></u-icon>
							</view>
						</view>
						<view class="title" @click="goToDetail(item.id,item.notesType)">{{item.title}}</view>
						<view style="display: flex;position: relative;padding: 20rpx;">
							<image style="height: 20px;width: 20px;border-radius: 50%;" mode="aspectFill"
								:src="item.avatarUrl">
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
					</block>
				</view>
			</view>
			<u-loadmore margin-top="20" line :status="notesList.status" :loading-text="loadingText"
				:loadmore-text="loadmoreText" :nomore-text="nomoreText" />
		</view>
		<view v-if="current==1">
			<view style="padding: 0 30rpx;">
				<block v-for="(item,index) in userList.list" :key="index">
					<view
						style="display: flex;padding: 20rpx 0;align-items: center;border-bottom-style: solid;border-width: 1rpx;border-color: #f3f3f2;height: 140rpx;">
						<image :src="item.avatarUrl" style="height: 80rpx;width: 80rpx;border-radius: 50%;" @click="goToUserMine(item.id)"
							mode="aspectFill"></image>
						<view @click="goToUserMine(item.id)"
							style="display: flex;flex-direction: column;justify-content: space-between;margin-left: 20rpx;flex: 1;">
							<view style="font-size: 30rpx;color: #2b2b2b;">{{item.nickname}}</view>
							<view style="height: 15rpx;"></view>
							<view style="font-size: 25rpx;color: #afafb0;">小番薯号：{{item.uid}}</view>
						</view>
						<u-tag style="margin-left: auto;" text="去私信" plain shape="circle" borderColor="#afafb0"
							color="#2b2b2b" @click="goToChat(item)"></u-tag>
					</view>
				</block>
				<view style="margin-top: 70rpx;">
					<u-loadmore :status="userList.status" loadingIcon="spinner" line></u-loadmore>
				</view>
			</view>
		</view>
		<view @touchmove.stop.prevent="moveHandle">
			<u-popup :show="show" mode="top" @close="show=false" :customStyle="{top: statusBarHeight + 95 + 'px'}"
				overlayOpacity="0">
				<view style="padding: 0 40rpx;">
					<u-radio-group v-model="radiovalue1" placement="column" iconPlacement="right" shape="square">
						<u-radio :customStyle="{marginBottom: '8px'}" v-for="(item, index) in radiolist1" :key="index"
							:label="item.name" :name="item.name" @change="radioChange" activeColor="#f56c6c"
							labelSize="35rpx" size="45rpx"
							:labelColor="radiovalue1 === item.name ? '#f56c6c' : '#383c3c'">
						</u-radio>
					</u-radio-group>
				</view>
			</u-popup>
			<u-popup :show="screening" mode="top" @close="screening=false"
				:customStyle="{top: statusBarHeight +95 + 'px'}" overlayOpacity="0">
				<view style="padding: 20rpx;font-size: 32rpx;">
					<view style="color: #000000;">笔记类型</view>
					<view style="display: flex;">
						<view @click="chooseNoteType(2)"
							style="padding:25rpx 50rpx;border-radius: 20rpx;margin: 20rpx;border-color: #f56c6c;border-width: 1rpx;"
							:style="{borderStyle: noteType === 2 ? 'solid' : 'none',backgroundColor: noteType === 2 ? '#fdeff2' : '#e5e4e6'}">
							<view :style="{color: noteType === 2 ? '#f56c6c' : '#000000'}">全部</view>
						</view>
						<view @click="chooseNoteType(0)"
							style="padding:25rpx 50rpx;border-radius: 20rpx;margin: 20rpx;border-color: #f56c6c;border-width: 1rpx;"
							:style="{borderStyle: noteType === 0 ? 'solid' : 'none',backgroundColor: noteType === 0 ? '#fdeff2' : '#e5e4e6'}">
							<view :style="{color: noteType === 0 ? '#f56c6c' : '#000000'}">图文</view>
						</view>
						<view @click="chooseNoteType(1)"
							style="padding:25rpx 50rpx;border-radius: 20rpx;margin: 20rpx;border-color: #f56c6c;border-width: 1rpx;"
							:style="{borderStyle: noteType === 1 ? 'solid' : 'none',backgroundColor: noteType === 1 ? '#fdeff2' : '#e5e4e6'}">
							<view :style="{color: noteType === 1 ? '#f56c6c' : '#000000'}">视频</view>
						</view>
					</view>
				</view>
			</u-popup>
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
	import {
		searchNotesByKeyword,
		searchUserByKeyword
	} from '@/apis/search_service.js'
	export default {
		data() {
			return {
				statusBarHeight: 0,
				searchValue: '',
				title: 'hello',
				show: false,
				current: 0,
				screening: false,
				radiolist1: [{
						name: '最新',
						disabled: false
					},
					{
						name: '最热',
						disabled: false
					}
				],
				radiovalue1: '最新',
				noteType: 2,
				notesList: {
					leftList: [],
					rightList: [],
					leftHeight: 0,
					rightHeight: 0,
					status: 'loadmore',
					page: 1,
					pageSize: 10,
				},
				userList: {
					list: [],
					page: 1,
					pageSize: 10,
					status: 'loadmore'
				},
				loadingText: '加载中...',
				loadmoreText: '加载更多',
				nomoreText: '没有更多了',
			};
		},
		methods: {
			moveHandle(e) {},
			goToChat(item) {
				uni.navigateTo({
					url: `/pages/chat/chat?userId=${item.id}&userName=${item.nickname}&avatarUrl=${item.avatarUrl}`
				})
			},
			goToUserMine(id) {
				uni.navigateTo({
					url: `/pages/mine/otherMine?userId=${id}`
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
				console.log(type)
				praiseOrCancelNotes({
					notesId: id,
					userId: uni.getStorageSync('userInfo').id,
					targetUserId: targetUserId
				}).then(res => {
					console.log(res)
					if (res.code == 20020) {
						if (type === 1) {
							console.log(this.notesList.leftList[index])
							if (this.notesList.leftList[index].isLike) {
								this.notesList.leftList[index].notesLikeNum = this.notesList.leftList[index]
									.notesLikeNum - 1
								this.notesList.leftList[index].isLike = false
							} else {
								this.notesList.leftList[index].notesLikeNum = this.notesList.leftList[index]
									.notesLikeNum + 1
								this.notesList.leftList[index].isLike = true
							}
						} else {
							if (this.notesList.rightList[index].isLike) {
								this.notesList.rightList[index].notesLikeNum = this.notesList.rightList[index]
									.notesLikeNum - 1
								this.notesList.rightList[index].isLike = false
							} else {
								this.notesList.rightList[index].notesLikeNum = this.notesList.rightList[index]
									.notesLikeNum + 1
								this.notesList.rightList[index].isLike = true
							}
						}
					}
				})
			},
			getMoreUser() {
				if (this.userList.status == 'nomore' || this.userList.status == 'loading') {
					return;
				}
				this.userList.status = 'loading';
				searchUserByKeyword({
					keyword: this.searchValue,
					page: this.userList.page,
					pageSize: this.userList.pageSize
				}).then(res => {
					if (res.code == 20010) {
						console.log(res.data)
						this.userList.page += 1;
						this.userList.list = this.userList.list.concat(res.data)
						if (res.data.length < this.userList.pageSize) {
							this.userList.status = 'nomore';
						} else {
							this.userList.status = 'loadmore';
						}
					} else {
						this.userList.status = 'nomore';
						uni.showToast({
							title: res.msg == '' ? '获取用户失败' : res.msg,
							icon: 'none'
						})
					}
				})
			},
			goToDetail(id, type) {
				console.log(type)
				if (type == 0) {
					// 笔记
					uni.navigateTo({
						url: '/pages/notesDetail/notesDetail?notesId=' + id
					})
				} else {
					// 视频
					console.log('视频')
					uni.navigateTo({
						url: '/pages/notesDetail/notesVideoDetail/noteVideoD?notesId=' + id
					})
				}
			},
			getMoreNotes() {
				if (this.notesList.status == 'nomore' || this.notesList.status == 'loading') {
					return;
				}
				this.notesList.status = 'loading';
				searchNotesByKeyword({
					keyword: this.searchValue,
					page: this.notesList.page,
					pageSize: this.notesList.pageSize,
					notesType: this.noteType,
					hot: this.radiovalue1 === '最新' ? 0 : 1
				}).then(res => {
					if (res.code == 20010) {
						console.log(res.data.list)
						this.notesList.page += 1;
						res.data.list.forEach(item => {
							this.getImageHeight(item.coverPicture).then(res => {
								item.coverPicture = res.path
								if (this.notesList.leftHeight <= this.notesList
									.rightHeight) {
									this.notesList.leftList.push(item)
									this.notesList.leftHeight += res.height+pxToRpx(50)
								} else {
									this.notesList.rightList.push(item)
									this.notesList.rightHeight += res.height+pxToRpx(50)
								}
							})
						})
						if (res.data.list.length < this.notesList.pageSize) {
							this.notesList.status = 'nomore';
						} else {
							this.notesList.status = 'loadmore';
						}
					} else {
						this.notesList.status = 'nomore';
						uni.showToast({
							title: res.msg == '' ? '获取笔记失败' : res.msg,
							icon: 'none'
						})
					}
				})
			},
			chooseNoteType(n) {
				this.noteType = n
				this.screening = false
				this.notesList = {
					leftList: [],
					rightList: [],
					leftHeight: 0,
					rightHeight: 0,
					status: 'loadmore',
					page: 1,
					pageSize: 10,
				}
				this.getMoreNotes()
			},
			radioChange(n) {
				this.radiovalue1 = n;
				this.show = false
				this.notesList = {
					leftList: [],
					rightList: [],
					leftHeight: 0,
					rightHeight: 0,
					status: 'loadmore',
					page: 1,
					pageSize: 10,
				}
				this.getMoreNotes()
			},
			clickAll() {
				if (this.current === 0) {
					this.show = !this.show
				} else {
					this.current = 0
					this.show = false
					this.notesList = {
						leftList: [],
						rightList: [],
						leftHeight: 0,
						rightHeight: 0,
						status: 'loadmore',
						page: 1,
						pageSize: 10,
					}
					this.getMoreNotes()
				}
			},
			clickUser() {
				if (this.current != 1 && this.userList.list.length == 0) {
					this.current = 1
					this.getMoreUser()
				} else if (this.current != 1) {
					this.current = 1
				} else if (this.current == 1) {
					this.userList = {
						list: [],
						page: 1,
						pageSize: 10,
						status: 'loadmore'
					}
					this.getMoreUser()
				}
			},
			openScreening() {
				if (this.show) {
					this.show = false
					return
				}
				if (this.current != 0) {
					return
				}
				this.screening = !this.screening
			},
			goToSearchValue() {
				console.log(this.searchValue)
				uni.navigateTo({
					url: `/pages/searchPage/searchPage?keyword=${this.searchValue}`
				})
			},
			goToBack() {
				uni.navigateBack();
			}
		},
		onLoad(options) {
			this.searchValue = options.keyword
			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = res.statusBarHeight;
				},
			});
			this.getMoreNotes()
		},
		onShow() {
			uni.$once('updateSearch', (keyword) => {
				console.log(keyword)
				this.searchValue = keyword
				if (this.current == 0) {
					this.notesList = {
						leftList: [],
						rightList: [],
						leftHeight: 0,
						rightHeight: 0,
						status: 'loadmore',
						page: 1,
						pageSize: 10,
					}
					this.getMoreNotes()
				} else if (this.current == 1) {
					this.userList = {
						list: [],
						page: 1,
						pageSize: 10,
						status: 'loadmore'
					}
					this.getMoreUser()
				}
			})

		},
		onReachBottom() {
			if (this.current == 0) {
				this.getMoreNotes()
			} else if (this.current == 1) {
				this.getMoreUser()
			}
		},
		onPullDownRefresh() {
			if (this.current == 0) {
				this.notesList = {
					leftList: [],
					rightList: [],
					leftHeight: 0,
					rightHeight: 0,
					status: 'loadmore',
					page: 1,
					pageSize: 10,
				}
				this.getMoreNotes()
			} else if (this.current == 1) {
				this.userList = {
					list: [],
					page: 1,
					pageSize: 10,
					status: 'loadmore'
				}
				this.getMoreUser()
			}
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 800);
		}
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