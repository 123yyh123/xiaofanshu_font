<template>
	<view>
		<dLoading :status="true" ref="loadingMine"></dLoading>
		<view class="info" :style="{ height: screenHeight+'px'}">
			<view class="filter" :style="{backgroundImage: 'url(' + userInfo.homePageBackground + ')'}"></view>
			<view class="status-bar"
				:style="{height:statusBarHeight+'px',backgroundColor: 'rgba(128,128,128,'+ opacity+')'}"></view>
			<view class="navigation-bar"
				:style="{height: navigationBarHeight,top:statusBarHeight+'px',backgroundColor: 'rgba(128,128,128,'+ opacity+')'}">
				<view :style="{height: iconHeight}" style="margin-left: 40rpx;margin-right: auto;opacity: 1;"
					@click="goToBack">
					<u-icon name="arrow-left" color="#16160e" size="20"></u-icon>
				</view>
				<view :style="{height: iconHeight}"
					style="opacity: 1;display: flex;flex-direction: column;justify-content: center;">
					<u-transition :show="show" mode="fade-up">
						<image :style="{height: statusBarHeight*0.8+'px',width:statusBarHeight*0.8+'px'}"
							:src="userInfo.avatarUrl" style="border-radius: 50%;" mode="aspectFill"></image>
					</u-transition>
				</view>
				<view v-if="showSend" @click="goToChat"
					style="position: absolute;right: 120rpx;padding: 10rpx 25rpx;color: #f5f5f5;border-style: solid;border-color: #f5f5f5;border-radius: 30rpx;height: 35rpx;line-height: 35rpx;font-size: 26rpx;">
					<u-transition :show="showSend" mode="fade-up">
						<view>发消息</view>
					</u-transition>
				</view>
				<view :style="{height: iconHeight}" style="margin-left: auto;margin-right: 40rpx;opacity: 1;">
					<u-icon name="more-dot-fill" color="#16160e" size="20"></u-icon>
				</view>
			</view>
			<view :style="{height:stickyHeight+'px'}"></view>
			<view class="top-main">
				<view class="userinfo-main">
					<image :src="userInfo.avatarUrl" mode="aspectFill" @click="viewAvatarUrl"></image>
					<view class="userinfo-main-right">
						<text :decode="true">{{userInfo.nickname}}</text>
						<text :decode="true">小番薯号：{{userInfo.uid}}</text>
					</view>
				</view>
				<view class="introduction">
					{{userInfo.selfIntroduction==null?'':userInfo.selfIntroduction}}
				</view>
				<view style="display: flex;">
					<view v-if="userInfo.age!=null&&userInfo.sex===1" class="tag">
						<u-icon name="man" color="#2ca9e1" size="20"></u-icon>
						<view v-if="userInfo.age!=null">{{userInfo.age}}岁</view>
					</view>
					<view v-if="userInfo.age!=null&&userInfo.sex===0" class="tag">
						<u-icon name="woman" color="#e198b4" size="20"></u-icon>
						<view v-if="userInfo.age!=null">{{userInfo.age}}岁</view>
					</view>
					<view v-if="userInfo.age!=null&&userInfo.sex===2">
						<view>{{userInfo.age}}岁</view>
					</view>
					<view v-if="userInfo.age==null&&userInfo.sex==1">
						<u-icon name="man" color="#2ca9e1" size="20"></u-icon>
					</view>
					<view v-if="userInfo.age==null&&userInfo.sex==0">
						<u-icon name="woman" color="#e198b4" size="20"></u-icon>
					</view>
					<view class="tag">{{area}}</view>
				</view>
				<view style="display: flex;width: 100%;">
					<view style="width: 50%;display: flex;justify-content: space-around;">
						<view class="guanzhu">
							<view>{{userInfo.attentionNum}}</view>
							<view style="color: #e5e4e6;">关注</view>
						</view>
						<view class="guanzhu">
							<view>{{userInfo.fansNum}}</view>
							<view style="color: #e5e4e6;">粉丝</view>
						</view>
						<view class="guanzhu">
							<view>8</view>
							<view style="color: #e5e4e6;">获赞与收藏</view>
						</view>
					</view>
					<view style="width: 50%;display: flex;align-items: flex-end;justify-content: space-around;">
						<view class="tag1" @click="goToChat">发消息</view>
						<view class="tag1" style="width: 40px;display: flex;">
							<image v-if="userInfo.attentionStatus===1" @click="cancelAttention(userInfo.id)"
								src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E5%B7%B2%E5%85%B3%E6%B3%A8.png"
								mode="heightFix"></image>
							<image v-if="userInfo.attentionStatus===0" @click="attention(userInfo.id)"
								src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E5%85%B3%E6%B3%A8%20%281%29.png"
								mode="heightFix"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-sticky bgColor="#fff" :offset-top="stickyHeight+'px'">
			<view style="display: flex;position: relative;justify-content: center;height: 50px;align-items: center;">
				<u-tabs @click='changetabs' :current="actTab" :list="tabsList" lineWidth="40" lineColor="#f56c6c"
					:activeStyle="{
					            color: '#16160e',
								fontSize: '35rpx',
					            transform: 'scale(1.05)'
					        }" :inactiveStyle="{
					            color: '#606266',
								fontSize: '32rpx',
					            transform: 'scale(1)'
					        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 40px;">
				</u-tabs>
				<view style="position: absolute;right: 0;">
					<u-icon name="search" color="#16160e" size="30"></u-icon>
				</view>
			</view>
		</u-sticky>
		<view>
			<swiper class="data_list" @change="swipeIndex" :current="actTab" :duration="300" previous-margin="0"
				:style="{height:notesHeight}">
				<swiper-item>
					<scroll-view :scroll-y="isScroll" :style="{height:notesHeight}" @scrolltolower="onReach"
						lower-threshold="20">
						<view class="component">
							<water-fall :list="notesList[0].notesList" ref="water1"></water-fall>
							<u-loadmore margin-top="20" line :status="notesList[0].status" :loading-text="loadingText"
								:loadmore-text="loadmoreText" :nomore-text="nomoreText" />
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view :scroll-y="isScroll" :style="{height:notesHeight}" @scrolltolower="onReach"
						lower-threshold="20">
						<view class="component">
							<water-fall :list="notesList[1].notesList" ref="water2"></water-fall>
							<u-loadmore margin-top="20" line :status="notesList[1].status" :loading-text="loadingText"
								:loadmore-text="loadmoreText" :nomore-text="nomoreText" />
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
			<!-- </scroll-view> -->
		</view>
	</view>
</template>

<script>
	import {
		getViewUserInfo,
		updateAttention
	} from '@/apis/user_service.js'
	import {
		provinceToAbbr
	} from '@/utils/addressUtils.js'
	import {
		getNotesByView,
		getNotesCountByUserId
	} from '../../apis/notes_service.js';
	export default {
		data() {
			return {
				tabsList: [{
					name: '笔记',
				}, {
					name: '收藏',
				}],
				area: '',
				screenHeight: '',
				statusBarHeight: '',
				navigationBarHeight: '',
				stickyHeight: '',
				notesHeight: '',
				iconHeight: '',
				mainInfoHeight: 0,
				swiperHeight: 0,
				opacity: 0,
				userInfo: {},
				actTab: 0,
				isScroll: false,
				show: false,
				showSend: false,
				moreShow: false,
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '实在没有了',
				notesList: [{
					notesList: [],
					status: 'loadmore',
					page: 1,
					pageSize: 10,
				}, {
					notesList: [],
					status: 'loadmore',
					page: 1,
					pageSize: 10,
				}],
			};
		},
		methods: {
			goToChat() {
				uni.navigateTo({
					url: '/pages/chat/chat?userId=' + this.userInfo.id + '&userName=' + this.userInfo.nickname +
						'&avatarUrl=' + this.userInfo.avatarUrl
				})
			},
			viewAvatarUrl() {
				uni.previewImage({
					urls: [this.userInfo.avatarUrl],
					current: 0,
					indicator: 'none',
					longPressActions: {
						itemList: ['保存到相册'],
						success: (data) => {
							console.log(data.tapIndex)
							plus.nativeUI.closePreviewImage();
							this.downLoadImg(this.userInfo.avatarUrl);
						},
						fail: (err) => {
							console.log(err.errMsg);
						}
					}
				})
			},
			downLoadImg(e) {
				uni.downloadFile({
					url: e,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败，请检查应用权限",
										icon: "none"
									});
								}
							});
						}
					},
					fail: (err) => {
						uni.showToast({
							title: "失败啦",
							icon: "none"
						});
					}
				})
			},
			goToBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			cancelAttention(userId) {
				uni.showModal({
					content: '确认不再关注？',
					cancelColor: '#F56C6C',
					confirmColor: '#F56C6C',
					success: (res) => {
						if (res.confirm) {
							updateAttention({
								userId: uni.getStorageSync('userInfo').id,
								targetUserId: userId,
							}).then(res => {
								if (res.code == 20020) {
									this.userInfo.attentionStatus = 0;
								}
							})
						} else if (res.cancel) {}
					}
				});
			},
			attention(userId) {
				updateAttention({
					userId: uni.getStorageSync('userInfo').id,
					targetUserId: userId,
				}).then(res => {
					if (res.code == 20020) {
						this.userInfo.attentionStatus = 1;
					}
				})
			},
			rpxToPx(rpx) {
				const screenWidth = uni.getSystemInfoSync().screenWidth
				return (screenWidth * Number.parseInt(rpx)) / 750
			},
			changetabs(e) {
				let index = e.index
				if (this.actTab == index) {
					this.$refs.loadingMine.reset()
					this.notesList[index].status = 'loadmore';
					this.notesList[index].page = 1;
					this.notesList[index].notesList = [];
					if (index == 0) {
						this.$refs.water1.clear()
						this.getMoreNotes(0)
					} else if (index == 1) {
						this.$refs.water2.clear()
						this.getMoreNotes(1)
					}
					return
				}
				this.actTab = index
				if (this.notesList[index].page == 1) {
					this.$refs.loadingMine.reset()
					if (index == 0) {
						this.getMoreNotes(0)
					} else if (index == 1) {
						this.getMoreNotes(1)
					}
				}
			},
			swipeIndex(e) {
				this.actTab = e.detail.current
				let index = e.detail.current
				if (this.notesList[index].page == 1) {
					if (index == 0) {
						this.getMoreNotes(0)
					} else if (index == 1) {
						this.getMoreNotes(1)
					}
				}
			},
			setSwiperHeight() {
				setTimeout(() => {
					let query = uni.createSelectorQuery().in(this);
					query.selectAll(".component").boundingClientRect(data => {
						console.log(data)
						this.swiperHeight = data[this.actTab].height
					}).exec()
				}, 1000)
			},
			onReach() {
				this.getMoreNotes(this.actTab)
			},
			getMoreNotes(index) {
				if (this.notesList[index].status == 'nomore' || this.notesList[index].status == 'loading') {
					return
				}
				this.notesList[index].status = 'loading'
				getNotesByView({
					page: this.notesList[index].page,
					pageSize: this.notesList[index].pageSize,
					type: index,
					userId: this.userInfo.id
				}).then(res => {
					if (res.code === 20010) {
						console.log(res)
						this.notesList[index].notesList = res.data.list
						this.notesList[index].page++
						setTimeout(() => {
							if (index == 0) {
								this.$refs.water1.addList(this.notesList[0].notesList);
							} else if (index == 1) {
								this.$refs.water2.addList(this.notesList[1].notesList);
							} else if (index == 2) {
								this.$refs.water3.addList(this.notesList[2].notesList);
							}
							if (this.notesList[index].notesList.length < this.notesList[index]
								.pageSize) {
								this.notesList[index].status = 'nomore';
							} else {
								this.notesList[index].status = 'loadmore';
							}
						}, 700);
					} else {
						this.notesList[index].status = 'nomore';
					}
				}).catch(err => {
					console.log(err)
				})
			}
		},
		onLoad(options) {
			console.log(options.userId)
			uni.getSystemInfo({
				success: (res) => {
					this.screenHeight = res.screenHeight / 2 - 40
					this.statusBarHeight = res.statusBarHeight
					this.navigationBarHeight = res.statusBarHeight * 1.2 + 'px'
					this.stickyHeight = res.statusBarHeight * 2.2
					this.notesHeight = res.screenHeight - res.statusBarHeight * 2.2 - 45 + 'px'
					this.iconHeight = res.statusBarHeight * 0.55 + 'px'
				}
			})
			getViewUserInfo({
				userId: options.userId
			}).then(res => {
				if (res.code == 20010) {
					this.userInfo = res.data
					this.getMoreNotes(0)
					console.log(this.userInfo)
					this.area = ''
					if (this.userInfo.area != null && this.userInfo.area != '') {
						let s = this.userInfo.area.split(' ')
						if (s.length === 2) {
							s.forEach((item, index) => {
								if (index == 0) {
									this.area += provinceToAbbr(item)
								} else {
									this.area += item.substring(0, item.length - 1)
								}
							})
						} else if (s.length === 3) {
							// 只显示省市
							s.forEach((item, index) => {
								if (index != 2) {
									if (index == 0) {
										this.area += provinceToAbbr(item)
									} else {
										this.area += item.substring(0, item.length - 1)
									}
								}
							})
						}
					}
					console.log(this.area)
				}
			})
		},
		onPullDownRefresh() {
			this.$refs.water1.refresh()
			this.$refs.water2.refresh()
			this.$refs.water3.refresh()
			uni.stopPullDownRefresh()
		},
		onReady() {
			let query = uni.createSelectorQuery().in(this);
			query.selectAll(".info").boundingClientRect(data => {
				this.mainInfoHeight = data[0].height - this.stickyHeight - 5
			}).exec()
		},
		onPageScroll(e) {
			// console.log(e.scrollTop+'_'+this.mainInfoHeight)
			if (e.scrollTop < this.mainInfoHeight) {
				this.isScroll = false
				this.showSend = false
			} else {
				this.isScroll = true
				this.showSend = true
			}
			if (e.scrollTop > this.rpxToPx(200)) {
				this.show = true
			} else {
				this.show = false
			}
			this.opacity = e.scrollTop / (Number(this.screenHeight) - 80) >= 0 ?
				e.scrollTop / (Number(this.screenHeight) - 80) : e.scrollTop / (
					Number(this.screenHeight));
		}
	}
</script>

<style lang="scss">
	.info {
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		background-color: rgba(0, 0, 0, 0.1);
		position: relative;
	}

	.filter {
		width: 100%;
		height: 110%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		filter: brightness(65%);
		background-color: #ffffff;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

	.top-main {
		padding: 0 40rpx 20rpx 40rpx;
	}

	.status-bar {
		position: fixed;
		width: 100%;
		z-index: 1;
	}

	.navigation-bar {
		position: fixed;
		width: 100%;
		display: flex;
		align-items: center;
		z-index: 1;
		justify-content: center;
	}

	.userinfo-main {
		display: inline-flex;
		align-items: center;
	}

	.userinfo-main image {
		border-radius: 50%;
		height: 160rpx;
		width: 160rpx;
		margin: 40rpx 40rpx 40rpx 0;
	}

	.userinfo-main-right {
		margin: 50rpx 0rpx;

		text:nth-child(1) {
			color: #ffffff;
			font-size: 35rpx;
			display: block;
		}

		text:nth-child(2) {
			margin-top: 10rpx;
			color: #95949a;
			font-size: 25rpx;
			display: block;
		}

		text:nth-child(3) {
			color: #95949a;
			font-size: 25rpx;
			display: block;
		}
	}

	.introduction {
		color: #ffffff;
		font-size: 30rpx;
		margin-right: 40rpx;
		word-wrap: break-word;
		white-space: normal;
		word-break: break-all;
	}

	.tag {
		height: 19px;
		margin-top: 20rpx;
		margin-right: 20rpx;
		display: inline-flex;
		line-height: 20px;
		color: #ffffff;
		font-size: 28rpx;
		border-radius: 30rpx;
		background-color: rgba(255, 255, 255, 0.1);
		padding: 5rpx 20rpx;
	}

	.tag1 {
		color: #ffffff;
		height: 30px;
		border-radius: 30rpx;
		border-color: #ffffff;
		border-style: solid;
		line-height: 30px;
		padding: 0rpx 20rpx 0rpx 20rpx;
		justify-content: center;
		font-size: 27rpx;

		image {
			height: 22px;
			margin-top: 4px;
			margin-bottom: 4px;
		}
	}

	.guanzhu {
		margin-top: 20rpx;
		margin-buttom: 20rpx;
		margin-right: 25rpx;
		text-align: center;
		color: #ffffff;
		font-size: 24rpx;
	}

	.looked {
		width: 6em;
		margin-top: 30rpx;
		padding: 10rpx 0rpx 10rpx 20rpx;
		background-color: rgba(89, 88, 87, 0.6);
		border-radius: 20rpx;
	}

	::v-deep .u-sticky {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.notes {
		width: 750rpx;
		background-color: #ffffff;
		// overflow:auto;
	}
</style>