<template>
	<view>
		<u-popup :show="moreShow" mode="left" @close="closeMore" :safeAreaInsetTop="true" :safeAreaInsetBottom="false" customStyle="width: 125%">
				<view>
		            <text>人生若只如初见，何事秋风悲画扇</text>
				</view>
			</u-popup>
		<view class="info" :style="{ height: screenHeight}">
			<view class="filter" :style="{backgroundImage: 'url(' + userInfo.homePageBackground + ')'}"></view>
			<view class="status-bar"
				:style="{height:statusBarHeight+'px',backgroundColor: 'rgba(128,128,128,'+ opacity+')'}"></view>
			<view class="navigation-bar"
				:style="{height: navigationBarHeight,top:statusBarHeight+'px',backgroundColor: 'rgba(128,128,128,'+ opacity+')'}">
				<view :style="{height: iconHeight}" style="position: absolute;left: 40rpx;opacity: 1;" @click="openMore">
					<image :style="{height: iconHeight}" src="../../static/image/更多.png" mode="heightFix"></image>
				</view>
				<view :style="{height: iconHeight}" style="position: absolute;right: 40rpx;opacity: 1;">
					<image :style="{height: iconHeight}" src="../../static/image/分享.png" mode="heightFix"></image>
				</view>
				<view :style="{height: iconHeight}" style="opacity: 1;">
					<u-transition :show="show" mode="fade-up">
						<image :style="{height: statusBarHeight*0.8+'px',width:statusBarHeight*0.8+'px'}"
							:src="userInfo.avatarUrl" style="border-radius: 50%;" mode="aspectFill"></image>
					</u-transition>
				</view>
			</view>
			<view :style="{height:stickyHeight}"></view>
			<view style="padding: 0 40rpx 20rpx 40rpx;">
				<view class="userinfo-main">
					<image :src="userInfo.avatarUrl" mode="aspectFill"></image>
					<view class="userinfo-main-right">
						<text :decode="true">{{userInfo.nickname}}</text>
						<text :decode="true">小番薯号：{{userInfo.uid}}</text>
						<text :decode="true">IP属地：日本</text>
					</view>
				</view>
				<view class="introduction">{{userInfo.selfIntroductionlen==null?'点击这里，填写简介':userInfo.selfIntroduction}}
				</view>
				<view style="display: flex;">
					<view v-if="userInfo.age!=null||userInfo.sex===1" class="tag"><u-icon name="man" color="#2ca9e1"
							size="20"></u-icon>{{userInfo.age}}岁</view>
					<view v-else-if="userInfo.age!=null||userInfo.sex===0" class="tag"><u-icon name="woman"
							color="#e198b4" size="20"></u-icon>{{userInfo.age}}岁</view>
					<view class="tag">日本东京</view>
				</view>
				<view style="display: flex;width: 100%;">
					<view style="width: 50%;display: flex;justify-content: space-around;">
						<view class="guanzhu">
							<view>8</view>
							<view style="color: #e5e4e6;">关注</view>
						</view>
						<view class="guanzhu">
							<view>8</view>
							<view style="color: #e5e4e6;">粉丝</view>
						</view>
						<view class="guanzhu">
							<view>8</view>
							<view style="color: #e5e4e6;">获赞与收藏</view>
						</view>
					</view>
					<view style="width: 50%;display: flex;align-items: flex-end;justify-content: space-around;">
						<view class="tag1">编辑资料</view>
						<view class="tag1" style="width: 40px;display: flex;">
							<image src="../../static/image/设置.png" mode="heightFix"></image>
						</view>
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;">
					<view class="looked">
						<view style="display: flex;">
							<u-icon name="bag" color="#ffffff" size="18"></u-icon>
							<text style="color: #ffffff;font-size: 27rpx;margin-left: 10rpx;">购物车</text>
						</view>
						<text style="font-size: 25rpx;color: #595857;">查看推荐好物</text>
					</view>
					<view class="looked">
						<view style="display: flex;">
							<u-icon name="question-circle" color="#ffffff" size="18"></u-icon>
							<text style="color: #ffffff;font-size: 27rpx;margin-left: 10rpx;">创作灵感</text>
						</view>
						<text style="font-size: 25rpx;color: #595857;">学创作找灵感</text>
					</view>
					<view class="looked">
						<view style="display: flex;">
							<u-icon name="clock" color="#ffffff" size="18"></u-icon>
							<text style="color: #ffffff;font-size: 27rpx;margin-left: 10rpx;">浏览记录</text>
						</view>
						<text style="font-size: 25rpx;color: #595857;">看过的笔记</text>
					</view>
				</view>
			</view>
		</view>
		<u-sticky bgColor="#fff" :offset-top="stickyHeight">
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
					<u-icon name="search" color="#16160e" size="40"></u-icon>
				</view>
			</view>
		</u-sticky>
		<view>
			<!-- 			<scroll-view scroll-y="true" :style="{height:notesHeight}"> -->
			<swiper class="data_list" @change="swipeIndex" :current="actTab" :duration="300" previous-margin="0"
				:style="{height:notesHeight}">
				<swiper-item>
					<scroll-view scroll-y="true" :style="{height:notesHeight}" @scrolltolower="onReach"
						lower-threshold="20">
						<view class="component">
							<water-fall :list="notesList" ref="water1"></water-fall>
							<u-loadmore margin-top="20" line :status="status1" :loading-text="loadingText"
								:loadmore-text="loadmoreText" :nomore-text="nomoreText" />
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" :style="{height:notesHeight}" @scrolltolower="onReach"
						lower-threshold="20">
						<view class="component">
							<water-fall :list="notesList" ref="water2"></water-fall>
							<u-loadmore margin-top="20" line :status="status2" :loading-text="loadingText"
								:loadmore-text="loadmoreText" :nomore-text="nomoreText" />
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" :style="{height:notesHeight}" @scrolltolower="onReach"
						lower-threshold="20">
						<view class="component">
							<water-fall :list="notesList" ref="water3"></water-fall>
							<u-loadmore margin-top="20" line :status="status3" :loading-text="loadingText"
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
		userInfo
	} from 'os';
	import {
		getUserInfo
	} from '../../apis/user_service.js';
	export default {
		data() {
			return {
				tabsList: [{
					name: '笔记',
				}, {
					name: '收藏',
				}, {
					name: '赞过',
				}],
				screenHeight: '',
				statusBarHeight: '',
				navigationBarHeight: '',
				stickyHeight: '',
				notesHeight: '',
				iconHeight: '',
				// mianInfoHeight:'',
				swiperHeight: 0,
				opacity: 0,
				userInfo: {},
				actTab: 0,
				show: false,
				moreShow:false,
				status1: 'nomore',
				status2: 'nomore',
				status3: 'nomore',
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '实在没有了',
				notesList: [{
						img: '/static/image/胡桃 原神 可爱小鬼 高清 电脑 壁纸_彼岸壁纸.png',
						title: 'djcn是基础会计IS第几次都是才看见IC降低市场价就是打吃谁的错',
						nickname: '你好',
						avatarUrl: '/static/image/b_3d585f28151e71504d46b9ae5e9ae340.png',
						like: 8,
						views: 10,
					}, {
						img: '/static/image/b_3d585f28151e71504d46b9ae5e9ae340.png',
						title: '速度吃豆腐谁都能接受就是城市化IS几次好鸡翅尖',
						nickname: 'dscnj',
						avatarUrl: '/static/image/b_3d585f28151e71504d46b9ae5e9ae340.png',
						like: 8,
						views: 110,
					}, {
						img: '/static/image/原神 雷电将军 雨天.png',
						title: 'dncjsn生产基地那就计算机吃',
						nickname: 'd打输出多少打输',
						avatarUrl: '/static/image/00001.png',
						like: 8,
						views: 1033,
					}, {
						img: '/static/image/《原神》明霄灯海 甘雨 刻晴 游戏壁纸_彼岸壁纸.jpg',
						title: '时代潮流的基底节打输出',
						nickname: '你成绩',
						avatarUrl: '/static/image/00001.png',
						like: 8,
						views: 103,
					}, {
						img: '/static/image/胡桃 原神 可爱小鬼 高清 电脑 壁纸_彼岸壁纸.png',
						title: 'djcn是基础会计IS第几次都是才看见IC降低市场价就是打吃谁的错',
						nickname: '你好',
						avatarUrl: '/static/image/b_3d585f28151e71504d46b9ae5e9ae340.png',
						like: 8,
						views: 10,
					}, {
						img: '/static/image/b_3d585f28151e71504d46b9ae5e9ae340.png',
						title: '速度吃豆腐谁都能接受就是城市化IS几次好鸡翅尖',
						nickname: 'dscnj',
						avatarUrl: '/static/image/b_3d585f28151e71504d46b9ae5e9ae340.png',
						like: 8,
						views: 110,
					},
					{
						img: '/static/image/b_3d585f28151e71504d46b9ae5e9ae340.png',
						title: '速度吃豆腐谁都能接受就是城市化IS几次好鸡翅尖',
						nickname: 'dscnj',
						avatarUrl: '/static/image/b_3d585f28151e71504d46b9ae5e9ae340.png',
						like: 8,
						views: 110,
					}, {
						img: '/static/image/《原神》明霄灯海 甘雨 刻晴 游戏壁纸_彼岸壁纸.jpg',
						title: '时代潮流的基底节打输出',
						nickname: '你成绩',
						avatarUrl: '/static/image/00001.png',
						like: 8,
						views: 103,
					}, {
						img: '/static/image/原神 雷电将军 雨天.png',
						title: 'dncjsn生产基地那就计算机吃',
						nickname: 'd打输出多少打输',
						avatarUrl: '/static/image/00001.png',
						like: 8,
						views: 1033,
					}, {
						img: '/static/image/胡桃 原神 可爱小鬼 高清 电脑 壁纸_彼岸壁纸.png',
						title: 'djcn是基础会计IS第几次都是才看见IC降低市场价就是打吃谁的错',
						nickname: '你好',
						avatarUrl: '/static/image/b_3d585f28151e71504d46b9ae5e9ae340.png',
						like: 8,
						views: 10,
					},

				],
				leftList: [],
				rightList: [],
				leftHeight: 0,
				rightHeight: 0,
			};
		},
		methods: {
			openMore(){
				this.moreShow=true
				uni.hideTabBar({
					animation: true
				})
			},
			closeMore(){
				this.moreShow=false
				uni.showTabBar({
					animation: true
				})
			},
			rpxToPx(rpx) {
				const screenWidth = uni.getSystemInfoSync().screenWidth
				return (screenWidth * Number.parseInt(rpx)) / 750
			},
			changetabs(e) {
				this.actTab = e.index
			},
			swipeIndex(e) {
				this.actTab = e.detail.current
				this.setSwiperHeight()
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
			// getImageHeight(s) {
			// 	return new Promise((resolve, reject) => {
			// 		uni.getImageInfo({
			// 			src: s,
			// 			success: (res) => {
			// 				resolve(res.height)
			// 			},
			// 		})
			// 	})
			// },
			onReach() {
				if (this.actTab === 0) {
					this.status1 = 'loading'
					this.$refs.water1.addList(this.notesList)
				}
				if (this.actTab === 1) {
					this.status2 = 'loading'
					this.$refs.water2.addList(this.notesList)
				}
				if (this.actTab === 2) {
					this.status3 = 'loading'
					this.$refs.water3.addList(this.notesList)
				}
			},
		},
		onPullDownRefresh() {
			console.log('下拉刷新')
			// getUserInfo({
			// 	userId:this.userInfo.id
			// }).then((res)=>{
			// 	if(res.code==20010){
			// 		this.userInfo=res.data
			// 	}else{
			// 		uni.showToast({
			// 			icon:'error',
			// 			duration:1000,
			// 			:'加载失败'
			// 		})
			// 	}
			// })
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.screenHeight = res.screenHeight / 2 + 'px'
					this.statusBarHeight = res.statusBarHeight
					this.navigationBarHeight = res.statusBarHeight * 1.2 + 'px'
					this.stickyHeight = res.statusBarHeight * 2.2 + 'px'
					// 去除导航栏和状态栏的高度，再减去底部tabbar的高度和吸附栏的高度
					// this.mianInfoHeight=res.screenHeight / 2 + 15-res.statusBarHeight * 2.2 +'px'
					this.notesHeight = res.screenHeight - res.statusBarHeight * 2.2 - 85 + 'px'
					this.iconHeight = res.statusBarHeight * 0.55 + 'px'
				}
			})
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'));
			console.log(this.userInfo)
		},
		onReady() {
			// this.notesList.forEach((item) => {
			// 	this.getImageHeight(item.img).then(res => {
			// 		if (this.leftHeight <= this.rightHeight) {
			// 			this.leftList.push(item)
			// 			this.leftHeight += res
			// 		} else {
			// 			this.rightList.push(item)
			// 			this.rightHeight += res
			// 		}
			// 	})
			// })
			this.setSwiperHeight();
		},
		onPageScroll(e) {
			if (e.scrollTop > this.rpxToPx(200)) {
				this.show = true
			} else {
				this.show = false
			}
			this.opacity = e.scrollTop / (Number(this.screenHeight.substring(0, this.screenHeight.length - 2)) - 80) >= 0 ?
				e.scrollTop / (Number(this.screenHeight.substring(0, this.screenHeight.length - 2)) - 80) : e.scrollTop / (
					Number(this.screenHeight.substring(0, this.screenHeight.length - 2)));
		},
		onReachBottom() {
			console.log('触底了')
			// if(this.actTab===0){
			// 	this.$refs.water1.addList(this.notesList)
			// }
			// if(this.actTab===1){
			// 	this.$refs.water2.addList(this.notesList)
			// }
			// if(this.actTab===2){
			// 	this.$refs.water3.addList(this.notesList)
			// }
			// this.setSwiperHeight()
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
		background-color: rgba(255, 255, 255, 0.2);
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