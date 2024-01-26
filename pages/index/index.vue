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
				<u-icon name="search" color="#16160e" size="29"></u-icon>
			</view>
		</view>
		<view :style="{height: statusBarHeight+40+ 'px'}" style="width: 100%;background-color:antiquewhite;"></view>
		<swiper @change="swipeIndex" :current="actTab" :duration="300" previous-margin="0" :style="{height: notesHeight + 'px'}">
			<swiper-item>
				<scroll-view scroll-y :style="{height: notesHeight + 'px'}" @scrolltolower="onReach" refresher-enabled @refresherrefresh="onRefresh" :refresher-triggered="refreshing" :refresher-threshold="60">
					<view class="component">
						<water-fall :list="notesList[0].notesList" ref="water1"></water-fall>
						<u-loadmore margin-top="20" line :status="notesList[0].status" :loading-text="loadingText"
							:loadmore-text="loadmoreText" :nomore-text="nomoreText" />
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<view style="width: 100%;height: 40px;background-color: #fff;z-index: 9999;">
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
				</view>
				<scroll-view scroll-y :style="{height: notesHeight-40 + 'px'}" @scrolltolower="onReach" refresher-enabled @refresherrefresh="onRefresh" :refresher-triggered="refreshing" :refresher-threshold="60">
					<view class="component">
						<water-fall :list="notesList[1].notesList" ref="water2"></water-fall>
						<u-loadmore margin-top="20" line :status="notesList[1].status" :loading-text="loadingText"
							:loadmore-text="loadmoreText" :nomore-text="nomoreText" />
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y :style="{height: notesHeight + 'px'}" @scrolltolower="onReach" refresher-enabled @refresherrefresh="onRefresh" :refresher-triggered="refreshing" :refresher-threshold="60">
					<view class="component">
						<water-fall :list="notesList[2].notesList" ref="water3"></water-fall>
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
		getLastNotesByPage
	} from '@/apis/notes_service.js'
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
					name: '电影'
				}, {
					name: '科技'
				}, {
					name: '音乐'
				}, {
					name: '美食'
				}, {
					name: '文化'
				}, {
					name: '财经'
				}, {
					name: '手工'
				}],
				typeTabIndex: 0,
				notesList: [{
					notesList: [],
					status: 'loadmore',
					page: 1,
					pageSize: 10,
					total: 0,
				}, {
					notesList: [],
					status: 'loadmore',
					page: 1,
					pageSize: 10,
					total: 0,
				}, {
					notesList: [],
					status: 'loadmore',
					page: 1,
					pageSize: 10,
					total: 0,
				}],
				loadingText: '加载中...',
				loadmoreText: '加载更多',
				nomoreText: '没有更多了',
				refreshing: false,
			}
		},
		methods: {
			getMoreNotes(index) {
				if (this.notesList[index].status == 'nomore' || this.notesList[index].status == 'loading') {
					return;
				}
				this.notesList[index].status = 'loading';
				getLastNotesByPage({
					page: this.notesList[index].page,
					pageSize: this.notesList[index].pageSize,
				}).then(res => {
					console.log(res);
					if (res.code == 20010) {
						this.notesList[index].total = res.data.total;
						this.notesList[index].page += 1;
						this.notesList[index].notesList = res.data.list;
						setTimeout(() => {
							if (index == 0) {
								this.$refs.water1.addList(this.notesList[0].notesList);
							} else if (index == 1) {
								this.$refs.water2.addList(this.notesList[1].notesList);
							} else if (index == 2) {
								this.$refs.water3.addList(this.notesList[2].notesList);
							}
							if (this.notesList[index].notesList.length < this.notesList[index].pageSize) {
								this.notesList[index].status = 'nomore';
							} else {
								this.notesList[index].status = 'loadmore';
							}
						}, 1000);
					} else {
						this.notesList[index].status = 'nomore';
					}
				})
			},
			changetabs(e) {
				let index = e.index;
				this.actTab = index;
				this.notesList[index].status = 'loadmore';
				this.notesList[index].page = 1;
				this.notesList[index].notesList = [];
				if (index == 0) {
					this.$refs.water1.clear();
				} else if (index == 1) {
					this.$refs.water2.clear();
				} else if (index == 2) {
					this.$refs.water3.clear();
				}
				this.getMoreNotes(index);
			},
			onRefresh() {
				console.log('onRefresh');
				if (this.refreshing) {
					return;
				}
				this.refreshing = true;
				let index = this.actTab;
				this.notesList[index].status = 'loadmore';
				this.notesList[index].page = 1;
				this.notesList[index].notesList = [];
				if (index == 0) {
					this.$refs.water1.clear();
				} else if (index == 1) {
					this.$refs.water2.clear();
				} else if (index == 2) {
					this.$refs.water3.clear();
				}
				this.getMoreNotes(index);
				setTimeout(() => {
					this.refreshing = false;
				}, 700);
			},
			swipeIndex(e) {
				let index = e.detail.current;
				this.actTab = index;
				if(this.notesList[index].notesList.length == 0&&this.notesList[index].page == 1) {
					this.getMoreNotes(index);
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
			let index = this.actTab;
			this.notesList[index].status = 'loadmore';
			this.notesList[index].page = 1;
			this.notesList[index].notesList = [];
			if (index == 0) {
				this.$refs.water1.clear();
			} else if (index == 1) {
				this.$refs.water2.clear();
			} else if (index == 2) {
				this.$refs.water3.clear();
			}
			this.getMoreNotes(index);
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 700);
		}
	};
</script>
<style>
</style>