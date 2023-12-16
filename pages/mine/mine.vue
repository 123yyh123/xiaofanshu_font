<template>
	<view>
		<view class="info" :style="{ height: screenHeight}">
			<view class="filter" :style="{backgroundImage: 'url(' + userInfo.homePageBackground + ')'}"></view>
			<view class="status-bar" :style="{height:statusBarHeight,backgroundColor: 'rgba(128,128,128,'+ opacity+')'}"></view>
			<view class="navigation-bar" :style="{height: navigationBarHeight,top:statusBarHeight,backgroundColor: 'rgba(128,128,128,'+ opacity+')'}">
				<view :style="{height: iconHeight}" style="position: absolute;left: 30rpx;opacity: 1;">
					<image :style="{height: iconHeight}" src="../../static/image/更多.png" mode="heightFix"></image>
				</view>
				<view :style="{height: iconHeight}" style="position: absolute;right: 30rpx;opacity: 1;">
					<image :style="{height: iconHeight}" src="../../static/image/分享.png" mode="heightFix"></image>
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
					<view style="width: 55%;display: flex;justify-content: flex-start;">
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
					<view style="width: 45%;display: flex;justify-content: flex-end;align-items: flex-end;">
						<view class="tag1">编辑资料</view>
						<view class="tag1" style="width: 40px;display: flex;">
							<image src="../../static/image/设置.png" mode="heightFix"></image>
						</view>
					</view>
				</view>
				<view class="looked">
					<view style="display: flex;">
						<u-icon name="clock" color="#ffffff" size="20"></u-icon>
						<text style="color: #ffffff;font-size: 30rpx;margin-left: 10rpx;">浏览记录</text>
					</view>
					<text>看过的笔记</text>
				</view>
			</view>
		</view>
		<view class="notes-head" :style="{top:stickyHeight}">
			<view style="display: flex;position: relative;justify-content: center;height: 50px;align-items: center;">
				<view>
					<u-tabs :list="list1" lineWidth="40" lineColor="#f56c6c" :activeStyle="{
					            color: '#16160e',
								fontSize: '35rpx',
					            transform: 'scale(1.05)'
					        }" :inactiveStyle="{
					            color: '#606266',
								fontSize: '32rpx',
					            transform: 'scale(1)'
					        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 50px;">
					</u-tabs>
				</view>
				<view style="position: absolute;right: 0;">
					<u-icon name="search" color="#16160e" size="40"></u-icon>
				</view>
			</view>
		</view>
		<view class="notes" :style="{height: notesHeight}">
			<view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userInfo
	} from 'os';
	import {
		getUserInfo
	} from '../../apis/user_service.js'
	export default {
		data() {
			return {
				list1: [{
						name: '笔记',
					}, {
						name: '收藏',
					},
					{
						name: '赞过',
					}
				],
				screenHeight: '',
				statusBarHeight: '',
				navigationBarHeight: '',
				stickyHeight: '',
				notesHeight: '',
				iconHeight: '',
				opacity: 0,
				userInfo: {},
			};
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
			// 			title:'加载失败'
			// 		})
			// 	}
			// })
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.screenHeight = res.screenHeight / 2 + 15 + 'px'
					this.statusBarHeight = res.statusBarHeight + 'px'
					this.navigationBarHeight = res.statusBarHeight * 1.2 + 'px'
					this.stickyHeight = res.statusBarHeight * 2.2 + 'px'
					// 去除导航栏和状态栏的高度，再减去底部tabbar的高度和吸附栏的高度
					this.notesHeight = res.screenHeight - res.statusBarHeight * 2.2-85+ 'px'
					this.iconHeight = res.statusBarHeight * 0.6 + 'px'
				}
			})
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'));
			console.log(this.userInfo)
		},
		onPageScroll(e){
			this.opacity=e.scrollTop/(Number(this.screenHeight.substring(0,this.screenHeight.length-2))-80)>=0?e.scrollTop/(Number(this.screenHeight.substring(0,this.screenHeight.length-2))-80):e.scrollTop/(Number(this.screenHeight.substring(0,this.screenHeight.length-2)));
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
		margin-top: 20rpx;
		margin-left: 20rpx;
		height: 30px;
		border-radius: 30rpx;
		border-color: #ffffff;
		border-style: solid;
		line-height: 30px;
		padding: 5rpx 15rpx 5rpx 15rpx;
		justify-content: center;

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
	}

	.looked {
		width: 6em;
		margin-top: 30rpx;
		padding: 10rpx 20rpx;
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 20rpx;
		text:nth-child(2) {
			font-size: 27rpx;
			color: #95949a;
		}
	}

	.notes {
		width: 750rpx;
		background-color: #ffffff;
		overflow:auto;
	}

	.notes-head {
		position: sticky;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		background-color: #ffffff;
	}
</style>