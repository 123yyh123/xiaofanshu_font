<template>
	<view>
		<dLoading :status="true" ref="loadingMine"></dLoading>
		<u-popup :show="moreShow" mode="left" customStyle="width:525rpx" @close="closeMore" :safeAreaInsetTop="true"
			:safeAreaInsetBottom="false" :overlayStyle="{'touch-action':'none'}">
			<scroll-view scroll-y="true" :style="{height: screenHeight*2+'px'}" style="font-size: 28rpx;">
				<view style="height: 150rpx;"></view>
				<view style="display: flex;padding: 0 60rpx 60rpx 60rpx;">
					<image style="height: 60rpx;" mode="heightFix"
						src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E6%B7%BB%E5%8A%A0%E5%A5%BD%E5%8F%8B.png">
					</image>
					<view style="margin-left: 20rpx;line-height: 60rpx;">发现好友</view>
				</view>
				<view style="display: flex;padding: 0 60rpx 60rpx 60rpx;">
					<image style="height: 60rpx;" mode="heightFix" src="../../static/image/creationCenter.png"></image>
					<view style="margin-left: 20rpx;line-height: 60rpx;">创作中心</view>
				</view>
				<view style="display: flex;padding: 0 60rpx 60rpx 60rpx;">
					<image style="height: 60rpx;" mode="heightFix"
						src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E6%B4%BB%E5%8A%A8%E4%B8%AD%E5%BF%83%20%281%29.png">
					</image>
					<view style="margin-left: 20rpx;line-height: 60rpx;">活动中心</view>
				</view>
				<view style="display: flex;padding: 0 60rpx 60rpx 60rpx;">
					<image style="height: 60rpx;" mode="heightFix"
						src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E6%88%91%E7%9A%84%E8%8D%89%E7%A8%BF.png">
					</image>
					<view style="margin-left: 20rpx;line-height: 60rpx;">我的草稿</view>
				</view>
				<view style="display: flex;padding: 0 60rpx 60rpx 60rpx;">
					<image style="height: 60rpx;" mode="heightFix"
						src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E6%B5%8F%E8%A7%88%E8%AE%B0%E5%BD%95.png">
					</image>
					<view style="margin-left: 20rpx;line-height: 60rpx;">浏览记录</view>
				</view>
				<view style="display: flex;padding: 0 60rpx 60rpx 60rpx;">
					<image style="height: 60rpx;" mode="heightFix"
						src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E9%92%B1%E5%8C%85.png">
					</image>
					<view style="margin-left: 20rpx;line-height: 60rpx;">钱包</view>
				</view>
				<view style="display: flex;padding: 0 60rpx 60rpx 60rpx;">
					<image style="height: 60rpx;" mode="heightFix"
						src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E5%85%8D%E6%B5%81%E9%87%8F%E7%95%85%E5%90%AC_52.png">
					</image>
					<view style="margin-left: 20rpx;line-height: 60rpx;">免流量</view>
				</view>
				<view style="display: flex;padding: 0 60rpx 60rpx 60rpx;">
					<image style="height: 60rpx;" mode="heightFix"
						src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E7%A4%BC%E7%89%A9%20%E6%B4%BB%E5%8A%A8.png">
					</image>
					<view style="margin-left: 20rpx;line-height: 60rpx;">好物体验</view>
				</view>
				<view style="display: flex;padding: 0 60rpx 60rpx 60rpx;">
					<image style="height: 60rpx;" mode="heightFix"
						src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E8%AE%A2%E5%8D%95%20%281%29.png">
					</image>
					<view style="margin-left: 20rpx;line-height: 60rpx;">订单</view>
				</view>
				<view style="display: flex;padding: 0 60rpx 60rpx 60rpx;">
					<image style="height: 60rpx;" mode="heightFix"
						src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E8%B4%AD%E7%89%A9%E8%BD%A6.png">
					</image>
					<view style="margin-left: 20rpx;line-height: 60rpx;">购物车</view>
				</view>
				<view style="display: flex;padding: 0 60rpx 60rpx 60rpx;">
					<image style="height: 60rpx;" mode="heightFix"
						src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E5%8D%A1%E5%88%B8.png">
					</image>
					<view style="margin-left: 20rpx;line-height: 60rpx;">卡券</view>
				</view>
				<view style="display: flex;padding: 0 60rpx 60rpx 60rpx;">
					<image style="height: 60rpx;" mode="heightFix"
						src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E5%BF%83%E6%84%BF%E5%8D%95.png">
					</image>
					<view style="margin-left: 20rpx;line-height: 60rpx;">心愿单</view>
				</view>
				<view style="display: flex;padding: 0 60rpx 60rpx 60rpx;">
					<image style="height: 60rpx;" mode="heightFix"
						src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E5%B0%8F%E8%8D%89.png">
					</image>
					<view style="margin-left: 20rpx;line-height: 60rpx;">社区公约</view>
				</view>
				<view style="height: 200rpx;"></view>
			</scroll-view>
			<view
				style="position: fixed;bottom: 0;display: flex;justify-content: space-between;align-items: center;width:525rpx;background-color: #ffffff;padding: 20rpx 60rpx;box-sizing: border-box;font-size: 25rpx;color: #727171;">
				<view style="text-align: -webkit-center">
					<view
						style="display: flex;justify-content: center;align-items: center;width: 80rpx;height: 80rpx;background-color: #dcdddd;border-radius: 50%;">
						<image style="height: 40rpx;" mode="heightFix"
							src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E8%AE%BE%E7%BD%AE%20%281%29.png">
						</image>
					</view>
					<view style="text-align: center;margin-top: 5rpx;">设置</view>
				</view>
				<view style="text-align: -webkit-center">
					<view
						style="display: flex;justify-content: center;align-items: center;width: 80rpx;height: 80rpx;background-color: #dcdddd;border-radius: 50%;text-align: -webkit-center;">
						<image style="height: 40rpx;" mode="heightFix"
							src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E5%AE%A2%E6%9C%8D.png">
						</image>
					</view>
					<view style="text-align: center;margin-top: 5rpx;">帮助与反馈</view>
				</view>
				<view style="text-align: -webkit-center">
					<view
						style="display: flex;justify-content: center;align-items: center;width: 80rpx;height: 80rpx;background-color: #dcdddd;border-radius: 50%;text-align: -webkit-center;">
						<image style="height: 40rpx;" mode="heightFix"
							src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E6%89%AB%E4%B8%80%E6%89%AB.png">
						</image>
					</view>
					<view style="text-align: center;margin-top: 5rpx;">扫一扫</view>
				</view>
			</view>
		</u-popup>
		<u-popup :show="introductionShow" mode="bottom" :overlayStyle="{'touch-action':'none'}">
			<view :style="{height: screenHeight*2+'px'}" style="background-color: #f3f3f2;">
				<view :style="{height: statusBarHeight+'px'}"></view>
				<view
					style="display: flex;justify-content: space-between;height: 50rpx;padding: 20rpx;margin-bottom: 45rpx;">
					<view style="color: #727171;" @click="closeintroductionShow">取消</view>
					<view style="31rpx">编辑简介</view>
					<view v-if="selfIntroduction==''" style="color: #f09199;">保存</view>
					<view v-else style="color: #d9333f;">保存</view>
				</view>
				<text style="margin-left: 50rpx;color: #727171;font-size: 30rpx;">可以自定义简介哦</text>
				<view style="margin: 30rpx;background-color: #ffffff;border-radius: 30rpx;padding: 35rpx;">
					<u--textarea v-model="selfIntroduction" count maxlength="100" placeholder="点击填写兴趣爱好,生活方式等个人简介"
						height="200rpx" border="none" placeholderStyle="color: #727171"
						style="color: #000000;"></u--textarea>
				</view>
			</view>
		</u-popup>
		<view class="info" :style="{ height: screenHeight+'px'}">
			<view class="filter" :style="{backgroundImage: 'url(' + userInfo.homePageBackground + ')'}"></view>
			<view class="status-bar"
				:style="{height:statusBarHeight+'px',backgroundColor: 'rgba(128,128,128,'+ opacity+')'}"></view>
			<view class="navigation-bar"
				:style="{height: navigationBarHeight,top:statusBarHeight+'px',backgroundColor: 'rgba(128,128,128,'+ opacity+')'}">
				<view :style="{height: iconHeight}" style="position: absolute;left: 40rpx;opacity: 1;"
					@click="openMore">
					<image :style="{height: iconHeight}"
						src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E6%9B%B4%E5%A4%9A.png"
						mode="heightFix"></image>
				</view>
				<view :style="{height: iconHeight}" style="position: absolute;right: 40rpx;opacity: 1;">
					<image :style="{height: iconHeight}"
						src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E5%88%86%E4%BA%AB.png"
						mode="heightFix"></image>
				</view>
				<view :style="{height: iconHeight}"
					style="opacity: 1;display: flex;flex-direction: column;justify-content: center;">
					<u-transition :show="show" mode="fade-up">
						<image :style="{height: statusBarHeight*0.8+'px',width:statusBarHeight*0.8+'px'}"
							:src="userInfo.avatarUrl" style="border-radius: 50%;" mode="aspectFill"></image>
					</u-transition>
				</view>
			</view>
			<view :style="{height:stickyHeight+'px'}"></view>
			<view class="top-main">
				<view class="userinfo-main">
					<image :src="userInfo.avatarUrl" mode="aspectFill" @click="viewAvatarUrl"></image>
					<view class="userinfo-main-right">
						<text :decode="true">{{userInfo.nickname}}</text>
						<text :decode="true">小番薯号：{{userInfo.uid}}</text>
						<text :decode="true">IP属地：{{userInfo.ipAddr}}</text>
					</view>
				</view>
				<view class="introduction" @click="changeIntroduction">
					{{userInfo.selfIntroduction==null?'点击这里，填写简介':userInfo.selfIntroduction}}
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
						<view class="guanzhu" @click="goToAttentionAndFans(0)">
							<view>{{userInfo.attentionNum}}</view>
							<view style="color: #e5e4e6;">关注</view>
						</view>
						<view class="guanzhu" @click="goToAttentionAndFans(1)">
							<view>{{userInfo.fansNum}}</view>
							<view style="color: #e5e4e6;">粉丝</view>
						</view>
						<view class="guanzhu">
							<view>8</view>
							<view style="color: #e5e4e6;">获赞与收藏</view>
						</view>
					</view>
					<view style="width: 50%;display: flex;align-items: flex-end;justify-content: space-around;">
						<view class="tag1" @click="editData">编辑资料</view>
						<view class="tag1" style="width: 40px;display: flex;">
							<image
								src="https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E8%AE%BE%E7%BD%AE.png"
								mode="heightFix"></image>
						</view>
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;">
					<view class="looked">
						<view style="display: flex;">
							<u-icon name="bag" color="#ffffff" size="18"></u-icon>
							<text style="color: #ffffff;font-size: 27rpx;margin-left: 10rpx;">购物车</text>
						</view>
						<text style="font-size: 25rpx;color: #afafb0;">查看推荐好物</text>
					</view>
					<view class="looked">
						<view style="display: flex;">
							<u-icon name="question-circle" color="#ffffff" size="18"></u-icon>
							<text style="color: #ffffff;font-size: 27rpx;margin-left: 10rpx;">创作灵感</text>
						</view>
						<text style="font-size: 25rpx;color: #afafb0;">学创作找灵感</text>
					</view>
					<view class="looked">
						<view style="display: flex;">
							<u-icon name="clock" color="#ffffff" size="18"></u-icon>
							<text style="color: #ffffff;font-size: 27rpx;margin-left: 10rpx;">浏览记录</text>
						</view>
						<text style="font-size: 25rpx;color: #afafb0;">看过的笔记</text>
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
					<u-icon name="search" color="#16160e" size="25"></u-icon>
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
							<u-divider style="margin: 10rpx;"></u-divider>
							<view
								style="display: flex;padding: 20rpx;background-color: #ffffff;font-size: 30rpx;justify-content: space-around;align-items: center;">
								<view style="display: flex;" :style="{color: noteType==0?'#16160e':'#afafb0'}"
									@click="changeNoteType(0)">
									<u-icon name="lock-open" size="20"
										:color="noteType==0?'#16160e':'#afafb0'"></u-icon>
									<view>公开{{noteType==0?' · '+notesList[0].total:''}}</view>
								</view>
								<view style="display: flex;" :style="{color: noteType==1?'#16160e':'#afafb0'}"
									@click="changeNoteType(1)">
									<u-icon name="lock" size="20" :color="noteType==1?'#16160e':'#afafb0'"></u-icon>
									<view>私密{{noteType==1?' · '+notesList[0].total:''}}</view>
								</view>
								<view style="display: flex;" :style="{color: noteType==2?'#16160e':'#afafb0'}"
									@click="changeNoteType(2)">
									<u-icon name="edit-pen" size="20" :color="noteType==2?'#16160e':'#afafb0'"></u-icon>
									<view>草稿{{noteType==2?' · '+notesList[0].total:''}}</view>
								</view>
							</view>
							<u-divider style="margin: 10rpx;"></u-divider>
							<water-fall :list="notesList[0].notesList" ref="water1" :slot_bottom="noteType!=2">
							</water-fall>
							<u-loadmore margin-top="20" line :status="status1" :loading-text="loadingText"
								:loadmore-text="loadmoreText" :nomore-text="nomoreText" />
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view :scroll-y="isScroll" :style="{height:notesHeight}" @scrolltolower="onReach"
						lower-threshold="20">
						<view class="component">
							<water-fall :list="notesList" ref="water2"></water-fall>
							<u-loadmore margin-top="20" line :status="status2" :loading-text="loadingText"
								:loadmore-text="loadmoreText" :nomore-text="nomoreText" />
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view :scroll-y="isScroll" :style="{height:notesHeight}" @scrolltolower="onReach"
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
		getUserInfo,
		updateAvatarUrl
	} from '../../apis/user_service.js';
	import {
		baseUrl
	} from '../../config/index.js';
	import {
		weChatTimeFormat
	} from '../../utils/util.js';
	import {
		getNotesByUserId
	} from '../../apis/notes_service.js';
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
				moreShow: false,
				introductionShow: false,
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
				status1: 'nomore',
				status2: 'nomore',
				status3: 'nomore',
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '实在没有了',
				noteType: 0,
				selfIntroduction: '',
			};
		},
		methods: {
			getMoreNotes(index, authority) {
				if (this.notesList[index].status == 'nomore' || this.notesList[index].status == 'loading') {
					return
				}
				this.notesList[index].status = 'loading'
				getNotesByUserId({
					page: this.notesList[index].page,
					pageSize: this.notesList[index].pageSize,
					authority: authority,
					type: index
				}).then(res => {
					if (res.code === 20010) {
						console.log(res)
						this.notesList[index].notesList = res.data.list
						this.notesList[index].page++
						this.notesList[index].total = res.data.total
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
			},
			getMoreDraftNotes() {
				if (this.notesList[0].status == 'nomore' || this.notesList[0].status == 'loading') {
					return
				}
				this.notesList[0].status = 'loading'
				let offset = (this.notesList[0].page - 1) * this.notesList[0].pageSize
				let sql1 =
					`select * from draft_notes draft_notes order by id desc limit ${this.notesList[0].pageSize} offset ${offset}`
				this.$sqliteUtil.SqlSelect(sql1).then(res => {
					res.forEach(item => {
						item.updateTime = weChatTimeFormat(item.updateTime)
						if (item.coverPicture == '') {
							item.coverPicture =
								'https://xiaofanshu.oss-cn-hangzhou.aliyuncs.com/2024/01/common/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202024-01-21%20212119.png'
						}
					})
					this.notesList[0].notesList = res
					this.notesList[0].page++
					setTimeout(() => {
						this.$refs.water1.addList(this.notesList[0].notesList);
						if (this.notesList[0].notesList.length < this.notesList[0]
							.pageSize) {
							this.notesList[0].status = 'nomore';
						} else {
							this.notesList[0].status = 'loadmore';
						}
					}, 700);
				}).catch(err => {
					console.log(err)
				})
			},
			changeNoteType(e) {
				this.$refs.loadingMine.reset()
				this.noteType = e
				this.notesList[0] = {
					notesList: [],
					status: 'loadmore',
					page: 1,
					pageSize: 10,
					total: 0
				}
				this.$refs.water1.clear()
				if (e === 2) {
					//草稿
					this.getMoreDraftNotes()
				} else {
					this.getMoreNotes(0, e)
				}
			},
			goToAttentionAndFans(e) {
				console.log(e)
				uni.navigateTo({
					url: '/pages/attentionAndFans/attentionAndFans?userId=' + this.userInfo.id + '&type=' + e +
						'&attentionNum=' + this.userInfo.attentionNum + '&fansNum=' + this.userInfo.fansNum
				})
			},
			editData() {
				uni.navigateTo({
					url: '/pages/editData/editData'
				})
			},
			changeIntroduction() {
				this.introductionShow = true
				uni.hideTabBar({
					animation: true
				})
			},
			closeintroductionShow() {
				this.introductionShow = false
				uni.showTabBar({
					animation: true
				})
			},
			viewAvatarUrl() {
				uni.previewImage({
					urls: [this.userInfo.avatarUrl],
					current: 0,
					indicator: 'none',
					longPressActions: {
						itemList: ['更换头像', '保存到相册'],
						success: (data) => {
							console.log(data.tapIndex)
							plus.nativeUI.closePreviewImage();
							if (data.tapIndex === 0) {
								uni.chooseImage({
									count: 1,
									sizeType: ['original', 'compressed'],
									sourceType: ['album'],
									success: (res) => {
										console.log(res.tempFilePaths)
										uni.uploadFile({
											url: baseUrl + '/third/uploadImg',
											filePath: res.tempFilePaths[0],
											name: 'file',
											header: {
												'token': uni.getStorageSync('token')
											},
											success: (res) => {
												let data = JSON.parse(res.data)
												if (data.code === 20020) {
													console.log(data.data)
													updateAvatarUrl({
														userVO: {
															id: this.userInfo
																.id,
															avatarUrl: data
																.data
														}
													}).then(res => {
														if (res.code ===
															20020) {
															uni.showToast({
																title: '更换成功',
																icon: 'success',
																duration: 500,
																mask: true
															})
															this.userInfo
																.avatarUrl =
																data.data
															uni.setStorageSync(
																'userInfo',
																this
																.userInfo)
														} else {
															uni.showToast({
																title: '更换失败',
																icon: 'none',
																duration: 500,
																mask: true
															})
														}
													})
												}
											},
											complete() {
												uni.closePreviewImage({
													success: function() {
														console.log('关闭成功')
													}
												})
											}
										})
									},
									fail: (err) => {
										console.log(err.errMsg)
									}
								})
							} else if (data.tapIndex === 1) {
								this.downLoadImg(this.userInfo.avatarUrl);
							}
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
			openMore() {
				this.moreShow = true
				uni.hideTabBar({
					animation: true
				})
			},
			closeMore() {
				this.moreShow = false
				uni.showTabBar({
					animation: true
				})
			},
			rpxToPx(rpx) {
				const screenWidth = uni.getSystemInfoSync().screenWidth
				return (screenWidth * Number.parseInt(rpx)) / 750
			},
			changetabs(e) {
				this.$refs.loadingMine.reset()
				let index = e.index
				if (this.actTab == index) {
					this.notesList[index].status = 'loadmore';
					this.notesList[index].page = 1;
					this.notesList[index].notesList = [];
					if (index == 0) {
						this.$refs.water1.clear()
						if (this.noteType == 2) {
							this.getMoreDraftNotes()
						} else {
							this.getMoreNotes(0, this.noteType)
						}
					} else if (index == 1) {
						this.$refs.water2.clear()
						this.getMoreNotes(1, 0)
					} else if (index == 2) {
						this.$refs.water3.clear()
						this.getMoreNotes(2, 0)
					}
					return
				}
				this.actTab = index
				if (this.notesList[index].page == 1) {
					if (index == 0) {
						if (this.noteType == 2) {
							this.getMoreDraftNotes()
						} else {
							this.getMoreNotes(0, this.noteType)
						}
					} else if (index == 1) {
						this.getMoreNotes(1, 0)
					} else if (index == 2) {
						this.getMoreNotes(2, 0)
					}
				}
			},
			swipeIndex(e) {
				this.actTab = e.detail.current
				let index = e.detail.current
				if (this.notesList[index].page == 1) {
					if (index == 0) {
						if (this.noteType == 2) {
							this.getMoreDraftNotes()
						} else {
							this.getMoreNotes(0, this.noteType)
						}
					} else if (index == 1) {
						this.getMoreNotes(1, 0)
					} else if (index == 2) {
						this.getMoreNotes(2, 0)
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
				if (this.actTab == 0) {
					if (this.noteType == 2) {
						this.getMoreDraftNotes()
					} else {
						this.getMoreNotes(0, this.noteType)
					}
				} else if (this.actTab == 1) {
					this.getMoreNotes(1, 0)
				} else if (this.actTab == 2) {
					this.getMoreNotes(2, 0)
				}
			},
		},
		onPullDownRefresh() {
			this.$refs.loadingMine.reset()
			getUserInfo({
				userId: uni.getStorageSync('userInfo').id
			}).then(res => {
				if (res.code === 20010) {
					console.log(res.data)
					uni.setStorageSync('userInfo', res.data)
					this.userInfo = res.data
				} else {
					uni.showToast({
						icon: 'none',
						duration: 1000,
						title: res.msg == null ? '加载失败' : res.msg
					})
				}
			}).catch(err => {
				console.log(err)
			})
			let index = this.actTab
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
			if (index == 0) {
				if (this.noteType == 2) {
					this.getMoreDraftNotes()
				} else {
					this.getMoreNotes(0, this.noteType)
				}
			} else if (index == 1) {
				this.getMoreNotes(1, 0)
			} else if (index == 2) {
				this.getMoreNotes(2, 0)
			}
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 700)
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					this.screenHeight = res.screenHeight / 2
					this.statusBarHeight = res.statusBarHeight
					this.navigationBarHeight = res.statusBarHeight * 1.2 + 'px'
					this.stickyHeight = res.statusBarHeight * 2.2
					// 去除导航栏和状态栏的高度，再减去底部tabbar的高度和吸附栏的高度
					// this.mianInfoHeight=res.screenHeight / 2 + 15-res.statusBarHeight * 2.2 +'px'
					this.notesHeight = res.screenHeight - res.statusBarHeight * 2.2 - 85 + 'px'
					this.iconHeight = res.statusBarHeight * 0.55 + 'px'
					// this.mainInfoHeight=this.screenHeight-this.stickyHeight;
				}
			})
			this.getMoreNotes(0, 0)
		},
		onReady() {
			let query = uni.createSelectorQuery().in(this);
			query.selectAll(".info").boundingClientRect(data => {
				this.mainInfoHeight = data[0].height - this.stickyHeight - 5
			}).exec()
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo');
			this.area = ''
			if (this.userInfo.area != null && this.userInfo.area != '') {
				let s = this.userInfo.area.split(' ')
				if (s.length === 2) {
					s.forEach((item, index) => {
						this.area += item.substring(0, item.length - 1)
					})
				} else if (s.length === 3) {
					// 只显示省市
					s.forEach((item, index) => {
						if (index != 2) {
							this.area += item.substring(0, item.length - 1)
						}
					})
				}
			}
			console.log(this.area)
		},
		onPageScroll(e) {
			// console.log(e.scrollTop+'_'+this.mainInfoHeight)
			if (e.scrollTop < this.mainInfoHeight) {
				this.isScroll = false
			} else {
				this.isScroll = true
			}
			if (e.scrollTop > this.rpxToPx(200)) {
				this.show = true
			} else {
				this.show = false
			}
			this.opacity = e.scrollTop / (Number(this.screenHeight) - 80) >= 0 ?
				e.scrollTop / (Number(this.screenHeight) - 80) : e.scrollTop / (
					Number(this.screenHeight));
		},
		onBackPress() {
			if (this.moreShow) {
				this.closeMore()
				return true
			}
			if (this.introductionShow) {
				this.closeintroductionShow()
				return true
			}
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