<template>
	<view>
		<view :style="{height: statusBarHeight + 'px'}" style="position: fixed;top: 0;width: 100%;"></view>
		<view :style="{top: statusBarHeight + 'px'}"
			style="position: fixed;width: 100%;height: 44px;background-color: #fff;z-index: 9999;display: flex;align-items: center;justify-content: center;">
			<u-tabs @click='changetabs' :current="actTab" :list="tabsList" lineWidth="40" lineColor="#f56c6c"
				:activeStyle="{
				            color: '#16160e',
							fontSize: '35rpx',
				            transform: 'scale(1.05)'
				        }" :inactiveStyle="{
				            color: '#606266',
							fontSize: '32rpx',
				            transform: 'scale(1)'
				        }" itemStyle="padding-left: 20px; padding-right: 20px; height: 40px;">
			</u-tabs>
			<view style="position: absolute;right: 30rpx;">
				<u-icon @click="goToSearch" name="search" color="#16160e" size="29"></u-icon>
			</view>
		</view>
		<view :style="{height: statusBarHeight+40+ 'px'}" style="width: 100%;background-color:antiquewhite;"></view>
		<swiper @change="swipeIndex" :current="actTab" :duration="300" previous-margin="0"
			:style="{height: notesHeight + 'px'}" @transition="transition" @animationfinish="animationFinish">
			<swiper-item>
				<scroll-view scroll-y :style="{height: notesHeight + 'px'}" @scrolltolower="onReach"
					:refresher-enabled="enablerefresh" @refresherrefresh="onRefresh" :refresher-triggered="refreshing"
					:refresher-threshold="100">
					<view class="component">
						<view v-for="(item,index) in notesList[0].notesList" :key="index" style="border-bottom-style: solid;border-bottom-width: 1rpx;border-bottom-color: #f3f3f2;padding-bottom: 40rpx;">
							<view style="display: flex;padding: 20rpx 40rpx;align-items: center;">
								<image :src="item.avatarUrl" style="width: 80rpx;height: 80rpx;border-radius: 50%;"
									@click="goToUser(item.belongUserId)">
								</image>
								<view style="margin-left: 10rpx;">
									<view style="font-size: 32rpx;color: #2b2b2b;">{{item.nickname}}</view>
								</view>
								<view style="margin:0 10rpx;font-size: 26rpx;color: #afafb0;">·</view>
								<view v-if="item.createTime!=item.updateTime" style="font-size: 26rpx;color: #afafb0;">
									更新于</view>
								<view style="font-size: 26rpx;color: #afafb0;">{{item.updateTime}}</view>
								<u-icon style="margin-left: auto;" name="more-dot-fill" size="25"></u-icon>
							</view>
							<view @click="goToDetail(item.id,item.notesType)"
								style="width: 750rpx;height: auto;background-color: #ffffff;justify-content: center;display: flex;">
								<u--image :height="item.height+'rpx'" :width="item.width+'rpx'" :src="item.coverPicture"
									:fade="false" lazyLoad mode="aspectFill" :duration="300">
									<template v-slot:loading>
										<view style="height: 200rpx;text-align: center;padding: 20rpx;">
											<u-loading-icon color="#e83929"></u-loading-icon>
											<view style="font-size: 30rpx;">loading......</view>
										</view>
									</template>
								</u--image>
							</view>
							<view style="padding: 20rpx;display: flex;">
								<view style="margin-left: auto;margin-right: 20rpx;display: flex;align-items: center;">
									<u-transition :show="!item.isLike" mode="fade" duration="2000">
										<u-icon v-if="!item.isLike" name="/static/praise.png" size="28"
											@click="praiseUserNotes(item.id,item.belongUserId,index)"></u-icon>
									</u-transition>
									<u-transition :show="item.isLike" mode="fade" duration="2000">
										<u-icon v-if="item.isLike" name="/static/praise_select.png" size="28"
											@click="praiseUserNotes(item.id,item.belongUserId,index)"></u-icon>
									</u-transition>
									<view v-if="item.notesLikeNum>0"
										style="color: #2b2b2b;font-size: 30rpx;margin-left: 10rpx;text-align: center;">
										{{item.notesLikeNum}}
									</view>
									<view style="width: 20rpx;"></view>
									<u-transition :show="item.isCollect" mode="fade" duration="2000">
										<u-icon v-if="item.isCollect" name="/static/collect_select.png"
											@click="collectNotes(item.id,item.belongUserId,index)" size="28"></u-icon>
									</u-transition>
									<u-transition :show="!item.isCollect" mode="fade" duration="2000">
										<u-icon v-if="!item.isCollect" name="/static/collect.png" size="28"
											@click="collectNotes(item.id,item.belongUserId,index)"></u-icon>
									</u-transition>
									<view v-if="item.notesCollectNum>0"
										style="color: #2b2b2b;font-size: 30rpx;margin-left: 10rpx;text-align: center;">
										{{item.notesCollectNum}}
									</view>
								</view>
							</view>
							<view @click="goToDetail(item.id,item.notesType)">
								<rich-text :nodes="item.content"
									style="padding: 0 40rpx;color: #595857;font-size: 35rpx;-webkit-line-clamp: 1;"
									class="title"></rich-text>
							</view>
						</view>
						<u-loadmore margin-top="20" line :status="notesList[0].status" :loading-text="loadingText"
							:loadmore-text="loadmoreText" :nomore-text="nomoreText" />
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<!-- <view style="width: 100%;height: 40px;background-color: #fffz;z-index: 9999;">
					<u-tabs @click='changeType' :current="typeTabIndex" :list="findList" lineWidth="0"
						lineColor="#f56c6c" :activeStyle="{
				            color: '#16160e',
							fontSize: '32rpx',
				            transform: 'scale(1.05)'
				        }" :inactiveStyle="{
				            color: '#606266',
							fontSize: '30rpx',
				            transform: 'scale(1)'
				        }" itemStyle="padding-left: 10px; padding-right: 10px; height: 40px;"
						style="padding-left: 20rpx;padding-right: 20rpx;">
						<view slot="right" @tap="$u.toast('插槽被点击')" style="padding-left: 5rpx;">
							<u-icon name="list" size="24" bold></u-icon>
						</view>
					</u-tabs>
				</view> -->
				<scroll-view scroll-y :style="{height: notesHeight + 'px'}" @scrolltolower="onReach"
					:refresher-enabled="enablerefresh" @refresherrefresh="onRefresh" :refresher-triggered="refreshing"
					:refresher-threshold="100">
					<view class="component">
						<view style="width: 100%;display: flex;flex-wrap: wrap;">
							<view class="water-left">
								<block v-for="(item,index) in notesList[1].leftList" :key="index">
									<view style="position: relative;" @click="goToDetail(item.id,item.notesType)">
										<u--image :src="item.coverPicture" :fade="false" lazyLoad width="100%"
											height="auto" mode="widthFix"
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
											<u-icon v-if="item.notesType==1" name="play-right-fill" color="#ffffff"
												size="25rpx"></u-icon>
										</view>
									</view>
									<view class="title" @click="goToDetail(item.id,item.notesType)">{{item.title}}
									</view>
									<view style="display: flex;position: relative;padding: 20rpx;">
										<image style="height: 20px;width: 20px;border-radius: 50%;" mode="aspectFill"
											@click="goToUser(item.belongUserId)" :src="item.avatarUrl">
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
								<block v-for="(item,index) in notesList[1].rightList" :key="index">
									<view style="position: relative;" @click="goToDetail(item.id,item.notesType)">
										<u--image :src="item.coverPicture" width="100%" height="auto" mode="widthFix"
											:fade="false" lazyLoad
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
									<view class="title" @click="goToDetail(item.id,item.notesType)">{{item.title}}
									</view>
									<view style="display: flex;position: relative;padding: 20rpx;">
										<image style="height: 20px;width: 20px;border-radius: 50%;" mode="aspectFill"
											@click="goToUser(item.belongUserId)" :src="item.avatarUrl">
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
						<u-loadmore margin-top="20" line :status="notesList[1].status" :loading-text="loadingText"
							:loadmore-text="loadmoreText" :nomore-text="nomoreText" />
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y :style="{height: notesHeight + 'px'}" @scrolltolower="onReach"
					:refresher-enabled="enablerefresh" @refresherrefresh="onRefresh" :refresher-triggered="refreshing"
					:refresher-threshold="100">
					<view class="component">
						<view style="width: 100%;display: flex;flex-wrap: wrap;">
							<view class="water-left">
								<block v-for="(item,index) in notesList[2].leftList" :key="index">
									<view style="position: relative;" @click="goToDetail(item.id,item.notesType)">
										<u--image :src="item.coverPicture" width="100%" height="auto" mode="widthFix"
											:fade="false" lazyLoad
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
									<view class="title" @click="goToDetail(item.id,item.notesType)">{{item.title}}
									</view>
									<view style="display: flex;position: relative;padding: 20rpx;">
										<image style="height: 20px;width: 20px;border-radius: 50%;" mode="aspectFill"
											@click="goToUser(item.belongUserId)" :src="item.avatarUrl">
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
								<block v-for="(item,index) in notesList[2].rightList" :key="index">
									<view style="position: relative;" @click="goToDetail(item.id,item.notesType)">
										<u--image :src="item.coverPicture" width="100%" height="auto" mode="widthFix"
											:fade="false" lazyLoad
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
									<view class="title" @click="goToDetail(item.id,item.notesType)">{{item.title}}
									</view>
									<view style="display: flex;position: relative;padding: 20rpx;">
										<image style="height: 20px;width: 20px;border-radius: 50%;" mode="aspectFill"
											@click="goToUser(item.belongUserId)" :src="item.avatarUrl">
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
						<u-loadmore margin-top="20" line :status="notesList[2].status" :loading-text="loadingText"
							:loadmore-text="loadmoreText" :nomore-text="nomoreText" />
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		getLastNotesByPage,
		praiseOrCancelNotes,
		getAttentionUserNotes,
		collectOrCancelNotes
	} from '@/apis/notes_service.js'
	import {
		searchNotesNearby
	} from '@/apis/search_service.js'
	import {
		pxToRpx,
		weChatTimeFormat
	} from '@/utils/util.js'
	export default {
		data() {
			return {
				statusBarHeight: 0,
				notesHeight: 0,
				actTab: 1,
				tabsList: [{
					name: '关注',
				}, {
					name: '发现',
				}, {
					name: '附近',
				}],
				findList: [{
					name: '推荐',
				}, {
					name: '视频'
				}, {
					name: '动漫'
				}, {
					name: '科技'
				}, {
					name: '美食'
				}, {
					name: '文化'
				}, {
					name: '游戏'
				}, {
					name: '情感'
				}],
				typeTabIndex: 0,
				notesList: [{
					notesList: [],
					leftList: [],
					rightList: [],
					leftHeight: 0,
					rightHeight: 0,
					status: 'loadmore',
					page: 1,
					pageSize: 10,
				}, {
					notesList: [],
					leftList: [],
					rightList: [],
					leftHeight: 0,
					rightHeight: 0,
					status: 'loadmore',
					page: 1,
					pageSize: 10,
				}, {
					notesList: [],
					leftList: [],
					rightList: [],
					leftHeight: 0,
					rightHeight: 0,
					status: 'loadmore',
					page: 1,
					pageSize: 10,
				}],
				loadingText: '加载中...',
				loadmoreText: '加载更多',
				nomoreText: '没有更多了',
				refreshing: false,
				latitude: 0,
				longitude: 0,
				enablerefresh: true,
			}
		},
		methods: {
			goToSearch() {
				uni.navigateTo({
					url: '/pages/searchPage/searchPage'
				})
			},
			goToUser(id) {
				uni.navigateTo({
					url: '/pages/mine/otherMine?userId=' + id
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
				let i = this.actTab;
				praiseOrCancelNotes({
					notesId: id,
					userId: uni.getStorageSync('userInfo').id,
					targetUserId: targetUserId
				}).then(res => {
					console.log(res)
					if (res.code == 20020) {
						if (type === 1) {
							console.log(this.notesList[i].leftList[index])
							if (this.notesList[i].leftList[index].isLike) {
								this.notesList[i].leftList[index].notesLikeNum = this.notesList[i].leftList[index]
									.notesLikeNum - 1
								this.notesList[i].leftList[index].isLike = false
							} else {
								this.notesList[i].leftList[index].notesLikeNum = this.notesList[i].leftList[index]
									.notesLikeNum + 1
								this.notesList[i].leftList[index].isLike = true
							}
						} else {
							if (this.notesList[i].rightList[index].isLike) {
								this.notesList[i].rightList[index].notesLikeNum = this.notesList[i].rightList[
									index].notesLikeNum - 1
								this.notesList[i].rightList[index].isLike = false
							} else {
								this.notesList[i].rightList[index].notesLikeNum = this.notesList[i].rightList[
									index].notesLikeNum + 1
								this.notesList[i].rightList[index].isLike = true
							}
						}
					}
				})
			},
			praiseUserNotes(id, targetUserId, index) {
				let i = this.actTab;
				praiseOrCancelNotes({
					notesId: id,
					userId: uni.getStorageSync('userInfo').id,
					targetUserId: targetUserId
				}).then(res => {
					console.log(res)
					if (res.code == 20020) {
						if (this.notesList[i].notesList[index].isLike) {
							this.notesList[i].notesList[index].notesLikeNum = this.notesList[i].notesList[index]
								.notesLikeNum - 1
							this.notesList[i].notesList[index].isLike = false
						} else {
							this.notesList[i].notesList[index].notesLikeNum = this.notesList[i].notesList[index]
								.notesLikeNum + 1
							this.notesList[i].notesList[index].isLike = true
						}
					}
				})
			},
			collectNotes(id, targetUserId, index) {
				let i = this.actTab;
				collectOrCancelNotes({
					notesId: id,
					userId: uni.getStorageSync('userInfo').id,
					targetUserId: targetUserId
				}).then(res => {
					console.log(res)
					if (res.code == 20020) {
						if (this.notesList[i].notesList[index].isCollect) {
							this.notesList[i].notesList[index].notesCollectNum = this.notesList[i].notesList[index]
								.notesCollectNum - 1
							this.notesList[i].notesList[index].isCollect = false
						} else {
							this.notesList[i].notesList[index].notesCollectNum = this.notesList[i].notesList[index]
								.notesCollectNum + 1
							this.notesList[i].notesList[index].isCollect = true
						}
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
			animationFinish(e) {
				this.enablerefresh = true;
			},
			transition(e) {
				if (e.target.dx == 0) {
					this.enablerefresh = true;
				} else {
					this.enablerefresh = false;
				}
			},
			getMoreNotes(index) {
				console.log(index)
				if (this.notesList[index].status == 'nomore' || this.notesList[index].status == 'loading') {
					return;
				}
				this.notesList[index].status = 'loading';
				if (index == 0) {
					console.log('关注')
					getAttentionUserNotes({
						page: this.notesList[index].page,
						pageSize: this.notesList[index].pageSize,
					}).then(res => {
						if (res.code == 20010) {
							console.log(res)
							this.notesList[index].page += 1;
							res.data.list.forEach(item => {
								item.createTime = weChatTimeFormat(item.createTime)
								item.updateTime = weChatTimeFormat(item.updateTime)
								item.content = '<p>' + item.title + '   ' + item.content.substring(3)
								uni.getImageInfo({
									src: item.coverPicture,
									success: (image) => {
										item.coverPicture = image.path
										if (image.width >= image.height) {
											item.width = 750
											item.height = 750 * image.height / image.width
										} else {
											if (image.height > 800) {
												item.height = 800
												item.width = 800 * image.width / image.height
												if (item.width > 750) {
													item.width = 750
													item.height = 750 * image.height / image
														.width
												}
											} else {
												if (image.width > 750) {
													item.width = 750
													item.height = 750 * image.height / image
														.width
												} else {
													item.width = image.width
													item.height = image.height
												}
											}
										}
									},
									fail: (err) => {
										console.log(err)
									}
								})
							})
							if (res.data.list.length < this.notesList[index]
								.pageSize) {
								this.notesList[index].status = 'nomore';
							} else {
								this.notesList[index].status = 'loadmore';
							}
							setTimeout(() => {
								this.notesList[index].notesList = this.notesList[index].notesList.concat(
									res.data.list)
							}, 800)
						} else {
							this.notesList[index].status = 'nomore';
						}
					})
				} else if (index == 1) {
					getLastNotesByPage({
						page: this.notesList[index].page,
						pageSize: this.notesList[index].pageSize,
					}).then(res => {
						if (res.code == 20010) {
							this.notesList[index].page += 1;
							res.data.list.forEach(item => {
								this.getImageHeight(item.coverPicture).then(res => {
									item.coverPicture = res.path
									if (this.notesList[index].leftHeight <= this.notesList[index]
										.rightHeight) {
										this.notesList[index].leftList.push(item)
										this.notesList[index].leftHeight += (res.height + pxToRpx(
											50))
									} else {
										this.notesList[index].rightList.push(item)
										this.notesList[index].rightHeight += (res.height + pxToRpx(
											50))
									}
								})
							})
							if (res.data.list.length < this.notesList[index]
								.pageSize) {
								this.notesList[index].status = 'nomore';
							} else {
								this.notesList[index].status = 'loadmore';
							}
						} else {
							this.notesList[index].status = 'nomore';
						}
					})
				} else if (index == 2) {
					let pageParam = {
						page: this.notesList[index].page,
						pageSize: this.notesList[index].pageSize,
						latitude: this.latitude,
						longitude: this.longitude
					};
					searchNotesNearby({
						pageParam
					}).then(res => {
						console.log(res)
						if (res.code == 20010) {
							this.notesList[index].page += 1;
							if (res.data.list.length < this.notesList[index]
								.pageSize) {
								this.notesList[index].status = 'nomore';
							} else {
								this.notesList[index].status = 'loadmore';
							}
							res.data.list.forEach(item => {
								this.getImageHeight(item.coverPicture).then(res => {
									item.coverPicture = res.path
									if (this.notesList[index].leftHeight <= this.notesList[index]
										.rightHeight) {
										this.notesList[index].leftList.push(item)
										this.notesList[index].leftHeight += (res.height + pxToRpx(
											50))
									} else {
										this.notesList[index].rightList.push(item)
										this.notesList[index].rightHeight += (res.height + pxToRpx(
											50))
									}
								})
							})
						} else {
							this.notesList[index].status = 'nomore';
							unin.showToast({
								title: res.msg,
								icon: 'none',
								duration: 1000
							})
						}
					})
				}
			},
			refreshList(index) {
				if (this.notesList[index].status == 'nomore' || this.notesList[index].status == 'loading') {
					return;
				}
				this.notesList[index].status = 'loading';
				if (index == 0) {
					getAttentionUserNotes({
						page: 1,
						pageSize: this.notesList[index].pageSize,
					}).then(res => {
						if (res.code == 20010) {
							console.log(res)
							res.data.list.forEach(item => {
								item.createTime = weChatTimeFormat(item.createTime)
								item.updateTime = weChatTimeFormat(item.updateTime)
								item.content = '<p>' + item.title + '   ' + item.content.substring(3)
								uni.getImageInfo({
									src: item.coverPicture,
									success: (image) => {
										item.coverPicture = image.path
										if (image.width >= image.height) {
											item.width = 750
											item.height = 750 * image.height / image.width
										} else {
											if (image.height > 800) {
												item.height = 800
												item.width = 800 * image.width / image.height
												if (item.width > 750) {
													item.width = 750
													item.height = 750 * image.height / image
														.width
												}
											} else {
												if (image.width > 750) {
													item.width = 750
													item.height = 750 * image.height / image
														.width
												} else {
													item.width = image.width
													item.height = image.height
												}
											}
										}
									},
									fail: (err) => {
										console.log(err)
									}
								})
							})
							setTimeout(() => {
								console.log(res.data)
								this.notesList[index].notesList = res.data.list;
								this.notesList[index].page = 2;
							}, 800)
							if (res.data.list.length < this.notesList[index]
								.pageSize) {
								this.notesList[index].status = 'nomore';
							} else {
								this.notesList[index].status = 'loadmore';
							}
						} else {
							this.notesList[index].status = 'nomore';
						}
					})
				} else if (index == 1) {
					getLastNotesByPage({
						page: 1,
						pageSize: this.notesList[index].pageSize,
					}).then(res => {
						if (res.code == 20010) {
							this.notesList[index].leftHeight = 0;
							this.notesList[index].rightHeight = 0;
							this.notesList[index].leftList = [];
							this.notesList[index].rightList = [];
							this.notesList[index].page = 2;
							res.data.list.forEach(item => {
								this.getImageHeight(item.coverPicture).then(res => {
									item.coverPicture = res.path
									if (this.notesList[index].leftHeight <= this.notesList[index]
										.rightHeight) {
										this.notesList[index].leftList.push(item)
										this.notesList[index].leftHeight += (res.height + pxToRpx(
											50))
									} else {
										this.notesList[index].rightList.push(item)
										this.notesList[index].rightHeight += (res.height + pxToRpx(
											50))
									}
								})
							})
							if (res.data.list.length < this.notesList[index]
								.pageSize) {
								this.notesList[index].status = 'nomore';
							} else {
								this.notesList[index].status = 'loadmore';
							}
						} else {
							this.notesList[index].status = 'nomore';
						}
					})
				} else if (index == 2) {
					let pageParam = {
						page: 1,
						pageSize: this.notesList[index].pageSize,
						latitude: this.latitude,
						longitude: this.longitude
					};
					searchNotesNearby({
						pageParam
					}).then(res => {
						if (res.code == 20010) {
							this.notesList[index].leftHeight = 0;
							this.notesList[index].rightHeight = 0;
							this.notesList[index].leftList = [];
							this.notesList[index].rightList = [];
							this.notesList[index].page = 2;
							res.data.list.forEach(item => {
								this.getImageHeight(item.coverPicture).then(res => {
									item.coverPicture = res.path
									if (this.notesList[index].leftHeight <= this.notesList[index]
										.rightHeight) {
										this.notesList[index].leftList.push(item)
										this.notesList[index].leftHeight += (res.height + pxToRpx(
											50))
									} else {
										this.notesList[index].rightList.push(item)
										this.notesList[index].rightHeight += (res.height + pxToRpx(
											50))
									}
								})
							})
							if (res.data.list.length < this.notesList[index]
								.pageSize) {
								this.notesList[index].status = 'nomore';
							} else {
								this.notesList[index].status = 'loadmore';
							}
						} else {
							this.notesList[index].status = 'nomore';
							unin.showToast({
								title: res.msg,
								icon: 'none',
								duration: 1000
							})
						}
					})
				}
			},
			changetabs(e) {
				let index = e.index;
				if (this.actTab != index) {
					this.actTab = index;
					return;
				}
				this.actTab = index;
				if (this.latitude == 0 || this.longitude == 0) {
					uni.getLocation({
						type: 'gcj02',
						success: (res) => {
							this.latitude = res.latitude;
							this.longitude = res.longitude;
							this.notesList[index].status = 'loadmore';
							this.notesList[index].page = 1;
							this.refreshList(index);
						},
						fail: (err) => {
							console.log(err);
							uni.showToast({
								title: '获取位置失败',
								icon: 'none'
							})
						}
					})
				} else {
					this.notesList[index].status = 'loadmore';
					this.notesList[index].page = 1;
					this.refreshList(index);
				}
			},
			onRefresh() {
				console.log('onRefresh')
				if (this.refreshing) {
					return;
				}
				this.refreshing = true;
				let index = this.actTab;
				this.notesList[index].status = 'loadmore';
				this.notesList[index].page = 1;
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						this.latitude = res.latitude;
						this.longitude = res.longitude;
						this.refreshList(index);
						setTimeout(() => {
							this.refreshing = false;
						}, 700);
					},
					fail: (err) => {
						console.log(err);
						uni.showToast({
							title: '获取位置失败',
							icon: 'none'
						})
					}
				})
			},
			swipeIndex(e) {
				let index = e.detail.current;
				this.actTab = index;
				if (this.latitude == 0 || this.longitude == 0) {
					uni.getLocation({
						type: 'gcj02',
						success: (res) => {
							this.latitude = res.latitude;
							this.longitude = res.longitude;
							if (this.notesList[index].leftList.length == 0) {
								this.refreshList(index);
							}
						},
						fail: (err) => {
							console.log(err);
							uni.showToast({
								title: '获取位置失败',
								icon: 'none'
							})
						}
					})
				} else {
					if (this.notesList[index].leftList.length == 0) {
						this.refreshList(index);
					}
				}
			},
			typeTabChange(e) {
				this.typeTabIndex = e.detail.current;
			},
			changeType(e) {
				this.typeTabIndex = e.index;
			},
			onReach() {
				console.log('onReach');
				this.getMoreNotes(this.actTab);
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					console.log(res);
					this.statusBarHeight = res.statusBarHeight;
					this.notesHeight = res.windowHeight - this.statusBarHeight - 40;
					console.log(this.statusBarHeight);
				}
			})
			this.getMoreNotes(this.actTab);
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh');
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 700);
		}
	};
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