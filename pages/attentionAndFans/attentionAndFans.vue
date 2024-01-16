<template>
	<view>
		<view :style="{height:statusBarHeight+'px'}" style="position: fixed;z-index: 100;width: 100%;"></view>
		<view :style="{height: statusBarHeight+'px'}"></view>
		<u-sticky bgColor="#ffffff" :offset-top="statusBarHeight+'px'">
			<view style="display: flex;position: relative;justify-content: center;height: 44px;align-items: center;">
				<view style="position: absolute;left: 20rpx;" @click="goToBack">
					<u-icon name="arrow-left" color="#16160e" size="20"></u-icon>
				</view>
				<u-tabs @click='changetabs' :current="actTab" :list="tabsList" lineWidth="35" lineColor="#f56c6c"
					:activeStyle="{
				            color: '#16160e',
							fontSize: '35rpx',
				            transform: 'scale(1.05)'
				        }" :inactiveStyle="{
				            color: '#606266',
							fontSize: '32rpx',
				            transform: 'scale(1)'
				        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 35px;">
				</u-tabs>
			</view>
		</u-sticky>
		<u-popup :show="showMore" :round="10" mode="bottom" @close="showMore=false" :safeAreaInsetTop="true"
			:safeAreaInsetBottom="true" bgColor="#f5f5f5" :overlayOpacity="0.3">
			<view>
				<view
					style="margin: 25rpx;margin-top: 0;padding: 15rpx;background-color: #ffffff;border-radius: 30rpx;">
					<u-cell :border="false" title="设置备注名" :isLink="true" arrow-direction="right"
						@click="setRemarkName(clickItem)"></u-cell>
				</view>
				<view
					style="margin: 25rpx;margin-top: 0;padding: 15rpx;background-color: #ffffff;border-radius: 30rpx;">
					<u-cell v-if="clickItem.isAttention" titleStyle="color: #e83929;" :border="false" title="取消关注"
						@click="cancelAttention(clickItem.userId)"></u-cell>
					<u-cell v-else titleStyle="color: #e83929;" :border="false" title="关注"
						@click="attention(clickItem.userId)"></u-cell>
				</view>
			</view>
		</u-popup>
		<u-popup :show="showUpdateRemark" :round="10" mode="center" @close="showUpdateRemark=false"
			:overlayOpacity="0.3" :safeAreaInsetBottom="true">
			<view style="width: 570rpx;">
				<view style="padding: 20rpx;text-align: center;">
					<view style="font-size: 35rpx;">修改备注</view>
					<view style="font-size: 25rpx;color: #949495;margin-top: 10rpx;">最多不超过12字</view>
				</view>
				<view
					style="margin: 30rpx;margin-top: 15rpx;padding: 20rpx;background-color: #f3f3f2;border-radius: 20rpx;">
					<u-input :placeholder="clickItem.nickname" v-model="clickRemarkName" focus border="none" clearable
						maxlength="12" color="#2b2b2b"></u-input>
				</view>
				<u-line></u-line>
				<view style="padding: 30rpx;display: flex;">
					<view
						style="flex: 1;text-align: center;border-right-style: solid;border-right-color: #e5e4e6;border-right-width: 0.5rpx;">
						<text style="font-size: 35rpx;color: #949495;" @click="showUpdateRemark=false">取消</text>
					</view>
					<view style="flex: 1;text-align: center;">
						<text style="font-size: 35rpx;color: #e83929;" @click="updateRemark">修改</text>
					</view>
				</view>
			</view>
		</u-popup>
		<view>
			<swiper class="data_list" @change="swipeIndex" :current="actTab" :duration="300" previous-margin="0"
				:style="{height:windowHeight+'px'}">
				<swiper-item>
					<scroll-view scroll-y :style="{height:windowHeight+'px'}" @scrolltolower="getList">
						<view style="font-size: 25rpx;color: #949495;padding: 20rpx;">我的关注（ {{tabsList[0].total}} ）
						</view>
						<view v-if="tabsList[0].list.length>0">
							<view v-for="(item,index) in tabsList[0].list" :key="index" style="padding: 10rpx;">
								<view style="padding: 10rpx;display: flex;align-items: center;">
									<view class="list_item_left" @click="goToMine(item.userId)">
										<image :src="item.avatarUrl" mode="aspectFill"
											style="width: 110rpx;height: 110rpx;border-radius: 50%;"></image>
									</view>
									<view class="list_item_right" @click="goToMine(item.userId)"
										style=" margin-left: 20rpx;margin-right: 20rpx;;display: flex;flex-direction: column;justify-content: center;">
										<view class="selfIntroduction" style="font-size: 35rpx;color: #2b2b2b;">
											{{item.nickname}}
										</view>
										<view class="selfIntroduction"
											v-if="item.selfIntroduction!=null&&item.selfIntroduction!=''">
											{{item.selfIntroduction}}
										</view>
										<view class="selfIntroduction" v-else>还没有简介</view>
									</view>
									<view style="margin-left: auto;">
										<u-tag v-if="item.bidirectional" text="互相关注" plain shape="circle"
											borderColor="#949495" color="#949495"
											@click="cancelAttention(item.userId)"></u-tag>
										<u-tag v-else-if="item.isAttention" text="已关注" plain shape="circle"
											borderColor="#949495" color="#949495"
											@click="cancelAttention(item.userId)"></u-tag>
										<u-tag v-else text="关注" plain shape="circle" borderColor="#f56c6c"
											color="#f56c6c" @click="attention(item.userId)"></u-tag>
									</view>
									<u-icon style="margin-left: 20rpx;margin-right: 20rpx;" name="more-dot-fill"
										size="20" @click="showMorePop(item)"></u-icon>
								</view>
							</view>
							<u-loadmore :status="tabsList[0].status" line margin-top="20" margin-bottom="20" loadingIcon="semicircle"></u-loadmore>
						</view>
						<view v-else class="no_data">
							<u-divider text="暂无数据" :dashed="true"></u-divider>
						</view>
					</scroll-view>		
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y :style="{height:windowHeight+'px'}" @scrolltolower="getList">
						<view style="font-size: 25rpx;color: #949495;padding: 20rpx;">我的粉丝（ {{tabsList[1].total}} ）
						</view>
						<view v-if="tabsList[1].list.length>0">
							<view v-for="(item,index) in tabsList[1].list" :key="index" style="padding: 10rpx;">
								<view style="padding: 10rpx;display: flex;align-items: center;">
									<view class="list_item_left" @click="goToMine(item.userId)">
										<image :src="item.avatarUrl" mode="aspectFill"
											style="width: 110rpx;height: 110rpx;border-radius: 50%;"></image>
									</view>
									<view class="list_item_right" @click="goToMine(item.userId)"
										style=" margin-left: 20rpx;margin-right: 20rpx;;display: flex;flex-direction: column;justify-content: center;">
										<view class="selfIntroduction" style="font-size: 35rpx;color: #2b2b2b;">
											{{item.nickname}}
										</view>
										<view class="selfIntroduction"
											v-if="item.selfIntroduction!=null&&item.selfIntroduction!=''">
											{{item.selfIntroduction}}
										</view>
										<view class="selfIntroduction" v-else>还没有简介</view>
									</view>
									<view style="margin-left: auto;">
										<u-tag v-if="item.bidirectional" text="互相关注" plain shape="circle"
											borderColor="#949495" color="#949495"
											@click="cancelAttention(item.userId)"></u-tag>
										<u-tag v-else text="回关" plain shape="circle" borderColor="#f56c6c"
											color="#f56c6c" @click="attention(item.userId)"></u-tag>
									</view>
								</view>
							</view>
							<u-loadmore :status="tabsList[1].status" line margin-top="20" margin-bottom="20"></u-loadmore>
						</view>
						<view v-else class="no_data">
							<u-divider text="暂无数据" :dashed="true"></u-divider>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		getAttentionList,
		getFansList,
		updateAttention,
		updateRemarkName
	} from '../../apis/user_service'
	import {formatTimestamp2} from '@/utils/util.js'
	export default {
		data() {
			return {
				userId: '',
				clickItem: {},
				clickRemarkName: '',
				showMore: false,
				showUpdateRemark: false,
				statusBarHeight: 0,
				windowHeight: 0,
				actTab: 0,
				tabsList: [{
					name: '关注',
					page: 1,
					pageSize: 15,
					list: [],
					total: 0,
					isLoading: false,
					isNoMore: false,
					status: 'loading'
				}, {
					name: '粉丝',
					page: 1,
					pageSize: 15,
					list: [],
					total: 0,
					isLoading: false,
					isNoMore: false,
					status: 'loading'
				}]
			};
		},
		methods: {
			goToMine(userId) {
				uni.navigateTo({
					url: '/pages/mine/otherMine?userId=' + userId
				})
			},
			setRemarkName(item) {
				if (!item.isAttention) {
					uni.showToast({
						title: '您取消了关注,无法设置备注名',
						icon: 'none',
						duration: 1000,
					});
					return;
				}
				this.clickRemarkName = item.nickname;
				this.showUpdateRemark = true;
			},
			showMorePop(item) {
				this.clickItem = item;
				this.showMore = true;
			},
			updateRemark() {
				if (this.clickRemarkName == '') {
					this.clickRemarkName = this.clickItem.nickname;
				}
				updateRemarkName({
					userId: this.userId,
					targetUserId: this.clickItem.userId,
					remarkName: this.clickRemarkName
				}).then(res => {
					if (res.code == 20020) {
						this.tabsList[this.actTab].list.forEach(item => {
							if (item.userId == this.clickItem.userId) {
								item.nickname = this.clickRemarkName;
							}
						})
						this.showUpdateRemark = false;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 1000,
						})
					}
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
								userId: this.userId,
								targetUserId: userId,
							}).then(res => {
								if (res.code == 20020) {
									this.tabsList[this.actTab].list.forEach(item => {
										if (item.userId == userId) {
											item.bidirectional = false;
											item.isAttention = false;
										}
									})
									this.showMore = false;
								}
							})
						} else if (res.cancel) {}
					}
				});
			},
			attention(userId) {
				updateAttention({
					userId: this.userId,
					targetUserId: userId,
				}).then(res => {
					if (res.code == 20020) {
						this.tabsList[this.actTab].list.forEach(item => {
							if (item.userId == userId) {
								item.bidirectional = true;
								item.isAttention = true;
							}
						})
						this.showMore = false;
						this.$ws.send({
						  from: this.userId,
						  to: userId,
						  fromName: uni.getStorageSync('userInfo').nickname,
						  fromAvatar: uni.getStorageSync('userInfo').avatarUrl,
						  messageType: 4,
						  content: '开始关注你了 ' + formatTimestamp2(new Date().getTime()),
						  chatType: 0,
						  friendType: 0,
						  audioTime: 0,
						});
					}
				})
			},
			changetabs(e) {
				this.actTab = e.index;
			},
			swipeIndex(e) {
				this.actTab = e.detail.current;
				if (this.tabsList[this.actTab].list.length == 0) {
					this.getList();
				}
			},
			getList() {
				if (this.tabsList[this.actTab].isNoMore) {
					return;
				}
				this.tabsList[this.actTab].isLoading = true;
				setTimeout(() => {
					if (this.actTab == 0) {
						getAttentionList({
							userId: this.userId,
							pageNum: this.tabsList[this.actTab].page,
							pageSize: this.tabsList[this.actTab].pageSize,
						}).then(res => {
							if (res.code == 20010) {
								if(res.data.length<this.tabsList[0].pageSize){
									this.tabsList[0].isNoMore=true;
									this.tabsList[0].status='nomore';
								}
								res.data.forEach(item => {
									item.isAttention = true;
								})
								this.tabsList[0].list = this.tabsList[0].list.concat(res.data);
								this.tabsList[0].page++;
							}
						}).finally(() => {
							this.tabsList[0].isLoading = false;
						})
					} else {
						getFansList({
							userId: this.userId,
							pageNum: this.tabsList[this.actTab].page,
							pageSize: this.tabsList[this.actTab].pageSize,
						}).then(res => {
							if (res.code == 20010) {
								if(res.data.length<this.tabsList[1].pageSize){
									this.tabsList[1].isNoMore=true;
									this.tabsList[1].status='nomore';
								}
								this.tabsList[1].list = this.tabsList[1].list.concat(res.data);
								this.tabsList[1].page++;
							}
						}).finally(() => {
							this.tabsList[1].isLoading = false;
						})
					}
				}, 500)
			},
			goToBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onBackPress() {
			if (this.showUpdateRemark) {
				this.showUpdateRemark = false;
				return true;
			}
			if (this.showMore) {
				this.showMore = false;
				return true;
			}
			return false;
		},
		onLoad(options) {
			console.log(options)
			this.userId = options.userId;
			this.actTab = options.type;
			this.tabsList[0].total = Number(options.attentionNum);
			this.tabsList[1].total = Number(options.fansNum);
			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = res.statusBarHeight
					this.windowHeight = res.screenHeight - res.statusBarHeight - 44
				}
			})
			this.getList();
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}
	.selfIntroduction {
		font-size: 27rpx;
		color: #949495;
		width: 320rpx;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		overflow: hidden;
	}
</style>