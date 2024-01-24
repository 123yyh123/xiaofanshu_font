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
		<view :style="{height: statusBarHeight + 40 + 'px'}"></view>
		<view>
			<swiper @change="swipeIndex" :current="actTab" :duration="300" previous-margin="0"
				:style="{height:notesHeight + 'px'}">
				<swiper-item>
					<scroll-view scroll-y :style="{height:notesHeight+'px'}" @scrolltolower="onReach"
						lower-threshold="20" refresher-enabled refresher-default-style="white">
						<view class="component">
							<view style="background-color: aqua;width: 100%;height: 2000px;"></view>
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
					<view :style="{height:notesHeight-40+'px'}">
						<swiper :duration="300" :current="typeTabIndex" previous-margin="0" @change="typeTabChange"
							:style="{height:notesHeight-40+'px'}">
							<swiper-item v-for="(item, index) in findList" :key="index">
								<scroll-view scroll-y :style="{height:notesHeight-40+'px'}" @scrolltolower="onReach"
									lower-threshold="20" refresher-enabled>
									<view class="component">
										<water-fall :list="findNotes.notesList" ref="water2"></water-fall>
										<u-loadmore margin-top="20" line :status="status2" :loading-text="loadingText"
											:loadmore-text="loadmoreText" :nomore-text="nomoreText" />
									</view>
								</scroll-view>
							</swiper-item>
						</swiper>
					</view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y :style="{height:notesHeight+'px'}" @scrolltolower="onReach"
						lower-threshold="20">
						<view class="component">
							<view style="background-color: aqua;width: 100%;height: 2000px;"></view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
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
				attentionNotes: {
					notesList: [],
					status: 'nomore',
					page: 1,
					pageSize: 10,
					total: 0,
				},
				findNotes: {
					notesList: [{
							coverPicture: 'https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/Snipaste_2023-12-02_22-12-23.png',
							title: 'djcn是基础会计IS第几次都是才看见IC降低市场价就是打吃谁的错',
							nickname: '你好',
							avatarUrl: '/static/image/b_3d585f28151e71504d46b9ae5e9ae340.png',
							like: 8,
							views: 10,
						}, {
							coverPicture: 'https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E5%8E%9F%E7%A5%9E%20%E9%9B%B7%E7%94%B5%E5%B0%86%E5%86%9B%20%E9%9B%A8%E5%A4%A9.png',
							title: '速度吃豆腐谁都能接受就是城市化IS几次好鸡翅尖',
							nickname: 'dscnj',
							avatarUrl: '/static/image/b_3d585f28151e71504d46b9ae5e9ae340.png',
							like: 8,
							views: 110,
						}, {
							coverPicture: 'https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E3%80%8A%E5%8E%9F%E7%A5%9E%E3%80%8B%E6%98%8E%E9%9C%84%E7%81%AF%E6%B5%B7%20%E7%94%98%E9%9B%A8%20%E5%88%BB%E6%99%B4%20%E6%B8%B8%E6%88%8F%E5%A3%81%E7%BA%B8_%E5%BD%BC%E5%B2%B8%E5%A3%81%E7%BA%B8.jpg',
							title: 'dncjsn生产基地那就计算机吃',
							nickname: 'd打输出多少打输',
							avatarUrl: '/static/image/00001.png',
							like: 8,
							views: 1033,
						}, {
							coverPicture: 'https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E5%8E%9F%E7%A5%9E%20%E9%9B%B7%E7%94%B5%E5%B0%86%E5%86%9B%20%E9%9B%A8%E5%A4%A9.png',
							title: '时代潮流的基底节打输出',
							nickname: '你成绩',
							avatarUrl: '/static/image/00001.png',
							like: 8,
							views: 103,
						}, {
							coverPicture: 'https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E5%8E%9F%E7%A5%9E%E7%A5%9E%E9%87%8C%E7%BB%AB%E5%8D%8E%E5%92%8C%E5%85%AB%E9%87%8D%E7%A5%9E%E5%AD%90%E5%8A%A8%E6%BC%AB%E5%A3%81%E7%BA%B8_%E5%BD%BC%E5%B2%B8%E5%A3%81%E7%BA%B8.jpg',
							title: 'djcn是基础会计IS第几次都是才看见IC降低市场价就是打吃谁的错',
							nickname: '你好',
							avatarUrl: '/static/image/b_3d585f28151e71504d46b9ae5e9ae340.png',
							like: 8,
							views: 10,
						}, {
							coverPicture: 'https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E5%8E%9F%E7%A5%9E%E7%A5%9E%E9%87%8C%E7%BB%AB%E5%8D%8E%E5%92%8C%E5%85%AB%E9%87%8D%E7%A5%9E%E5%AD%90%E5%8A%A8%E6%BC%AB%E5%A3%81%E7%BA%B8_%E5%BD%BC%E5%B2%B8%E5%A3%81%E7%BA%B8.jpg',
							title: '速度吃豆腐谁都能接受就是城市化IS几次好鸡翅尖',
							nickname: 'dscnj',
							avatarUrl: '/static/image/b_3d585f28151e71504d46b9ae5e9ae340.png',
							like: 8,
							views: 110,
						},
						{
							coverPicture: 'https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/Snipaste_2023-12-02_22-12-23.png',
							title: '速度吃豆腐谁都能接受就是城市化IS几次好鸡翅尖',
							nickname: 'dscnj',
							avatarUrl: '/static/image/b_3d585f28151e71504d46b9ae5e9ae340.png',
							like: 8,
							views: 110,
						}, {
							coverPicture: 'https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E8%83%A1%E6%A1%83%20%E5%8E%9F%E7%A5%9E%20%E5%8F%AF%E7%88%B1%E5%B0%8F%E9%AC%BC%20%E9%AB%98%E6%B8%85%20%E7%94%B5%E8%84%91%20%E5%A3%81%E7%BA%B8_%E5%BD%BC%E5%B2%B8%E5%A3%81%E7%BA%B8.jpg',
							title: '时代潮流的基底节打输出',
							nickname: '你成绩',
							avatarUrl: '/static/image/00001.png',
							like: 8,
							views: 103,
						}, {
							coverPicture: 'https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/Snipaste_2023-12-02_22-12-23.png',
							title: 'dncjsn生产基地那就计算机吃',
							nickname: 'd打输出多少打输',
							avatarUrl: '/static/image/00001.png',
							like: 8,
							views: 1033,
						}, {
							coverPicture: 'https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E3%80%8A%E5%8E%9F%E7%A5%9E%E3%80%8B%E6%98%8E%E9%9C%84%E7%81%AF%E6%B5%B7%20%E7%94%98%E9%9B%A8%20%E5%88%BB%E6%99%B4%20%E6%B8%B8%E6%88%8F%E5%A3%81%E7%BA%B8_%E5%BD%BC%E5%B2%B8%E5%A3%81%E7%BA%B8.jpg',
							title: 'djcn是基础会计IS第几次都是才看见IC降低市场价就是打吃谁的错',
							nickname: '你好',
							avatarUrl: '/static/image/b_3d585f28151e71504d46b9ae5e9ae340.png',
							like: 8,
							views: 10,
						}
					],
					status: 'nomore',
					page: 1,
					pageSize: 10,
					total: 0,
				},
				nearbyNotes: {
					notesList: [],
					status: 'nomore',
					page: 1,
					pageSize: 10,
					total: 0,
				},
			}
		},
		methods: {
			changetabs(e) {
				this.actTab = e.index;
			},
			swipeIndex(e) {
				this.actTab = e.detail.current;
			},
			typeTabChange(e) {
				this.typeTabIndex = e.detail.current;
			},
			changeType(e) {
				this.typeTabIndex = e.index;
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = res.statusBarHeight;
					this.notesHeight = res.screenHeight - this.statusBarHeight - 40;
					console.log(this.statusBarHeight);
				}
			})
		}
	};
</script>
<style>
</style>