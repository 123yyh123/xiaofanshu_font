<!-- 滑动切换选项卡演示(标准写法) -->
<template>
	<!-- 使用z-paging-swiper为根节点可以免计算高度 -->
	<z-paging-swiper>
		<!-- 需要固定在顶部不滚动的view放在slot="top"的view中 -->
		<!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs，若需要使用z-tabs，请在插件市场搜索z-tabs并引入，否则会报插件找不到的错误 -->
		<template #top>
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
		</template>
		<!-- swiper必须设置height:100%，因为swiper有默认的高度，只有设置高度100%才可以铺满页面  -->
		<swiper class="swiper" @change="swipeIndex" :current="actTab" :duration="300" previous-margin="0"
			:style="{height: notesHeight + 'px'}" @transition="transition" @animationfinish="animationFinish">
			<swiper-item>
				<view style="height: 100%;">
					<z-paging ref="paging" v-model="notesList[0].notesList" @query="queryList" :fixed="false">
						<view class="component">
							<view style="width: 100%;display: flex;flex-wrap: wrap;">
								<view class="water-left">
									<block v-for="(item,index) in notesList[0].leftList" :key="index">
										<view style="position: relative;" @click="goToDetail(item.id)">
											<u--image :src="item.coverPicture" width="100%" height="auto"
												mode="widthFix"
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
										<view class="title" @click="goToDetail(item.id)">{{item.title}}</view>
										<view style="display: flex;position: relative;padding: 20rpx;">
											<image style="height: 20px;width: 20px;border-radius: 50%;"
												mode="aspectFill" :src="item.avatarUrl">
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
													<u-icon v-if="item.isLike" name="/static/praise_select.png"
														size="18"
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
									<block v-for="(item,index) in notesList[0].rightList" :key="index">
										<view style="position: relative;" @click="goToDetail(item.id)">
											<u--image :src="item.coverPicture" width="100%" height="auto"
												mode="widthFix"
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
										</view>
										<view class="title" @click="goToDetail(item.id)">{{item.title}}</view>
										<view style="display: flex;position: relative;padding: 20rpx;">
											<image style="height: 20px;width: 20px;border-radius: 50%;"
												mode="aspectFill" :src="item.avatarUrl">
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
													<u-icon v-if="item.isLike" name="/static/praise_select.png"
														size="18"
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
							<u-loadmore margin-top="20" line :status="notesList[0].status" :loading-text="loadingText"
								:loadmore-text="loadmoreText" :nomore-text="nomoreText" />
						</view>
					</z-paging>
				</view>
			</swiper-item>
			<swiper-item>
				<view style="height: 100%;">
					<z-paging ref="paging" v-model="notesList[1].notesList" @query="queryList" :fixed="false">
						<view style="width: 100%;height: 40px;background-color: #fffz;z-index: 9999;">
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
						<view class="component">
							<view style="width: 100%;display: flex;flex-wrap: wrap;">
								<view class="water-left">
									<block v-for="(item,index) in notesList[1].leftList" :key="index">
										<view style="position: relative;" @click="goToDetail(item.id)">
											<u--image :src="item.coverPicture" width="100%" height="auto"
												mode="widthFix"
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
										<view class="title" @click="goToDetail(item.id)">{{item.title}}</view>
										<view style="display: flex;position: relative;padding: 20rpx;">
											<image style="height: 20px;width: 20px;border-radius: 50%;"
												mode="aspectFill" :src="item.avatarUrl">
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
													<u-icon v-if="item.isLike" name="/static/praise_select.png"
														size="18"
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
										<view style="position: relative;" @click="goToDetail(item.id)">
											<u--image :src="item.coverPicture" width="100%" height="auto"
												mode="widthFix"
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
										</view>
										<view class="title" @click="goToDetail(item.id)">{{item.title}}</view>
										<view style="display: flex;position: relative;padding: 20rpx;">
											<image style="height: 20px;width: 20px;border-radius: 50%;"
												mode="aspectFill" :src="item.avatarUrl">
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
													<u-icon v-if="item.isLike" name="/static/praise_select.png"
														size="18"
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
					</z-paging>
				</view>
			</swiper-item>
			<swiper-item>
				<view style="height: 100%;">
					<z-paging ref="paging" v-model="notesList[2].notesList" @query="queryList" :fixed="false">
						<view class="component">
							<view style="width: 100%;display: flex;flex-wrap: wrap;">
								<view class="water-left">
									<block v-for="(item,index) in notesList[2].leftList" :key="index">
										<view style="position: relative;" @click="goToDetail(item.id)">
											<u--image :src="item.coverPicture" width="100%" height="auto"
												mode="widthFix"
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
										<view class="title" @click="goToDetail(item.id)">{{item.title}}</view>
										<view style="display: flex;position: relative;padding: 20rpx;">
											<image style="height: 20px;width: 20px;border-radius: 50%;"
												mode="aspectFill" :src="item.avatarUrl">
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
													<u-icon v-if="item.isLike" name="/static/praise_select.png"
														size="18"
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
										<view style="position: relative;" @click="goToDetail(item.id)">
											<u--image :src="item.coverPicture" width="100%" height="auto"
												mode="widthFix"
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
										</view>
										<view class="title" @click="goToDetail(item.id)">{{item.title}}</view>
										<view style="display: flex;position: relative;padding: 20rpx;">
											<image style="height: 20px;width: 20px;border-radius: 50%;"
												mode="aspectFill" :src="item.avatarUrl">
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
													<u-icon v-if="item.isLike" name="/static/praise_select.png"
														size="18"
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
					</z-paging>
				</view>
			</swiper-item>
		</swiper>
	</z-paging-swiper>
</template>

<script>
	import {
		getLastNotesByPage,
		praiseOrCancelNotes
	} from '@/apis/notes_service.js'
	import {
		searchNotesNearby
	} from '@/apis/search_service.js'
	import ZPMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin.js'
	export default {
		mixins: [ZPMixin],
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
			queryList(pageNo, pageSize) {
				let index = this.actTab;
				getLastNotesByPage({
					page: pageNo,
					pageSize: pageSize,
				}).then(res => {
					console.log(res);
					if (res.code == 20010) {
						this.notesList[index].page += 1;
						this.$refs.paging.complete(res.data.list);
						res.data.list.forEach(item => {
							this.getImageHeight(item.coverPicture).then(res => {
								if (this.notesList[index].leftHeight <= this.notesList[index]
									.rightHeight) {
									this.notesList[index].leftList.push(item)
									this.notesList[index].leftHeight += res
								} else {
									this.notesList[index].rightList.push(item)
									this.notesList[index].rightHeight += res
								}
							})
						})
						if (res.data.list.length < this.notesList[index].pageSize) {
							this.notesList[index].status = 'nomore';
						} else {
							this.notesList[index].status = 'loadmore';
						}
					} else {
						this.notesList[index].status = 'nomore';
					}
				})
			},
			getImageHeight(s) {
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: s,
						success: (res) => {
							resolve(res.height)
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
			goToDetail(id) {
				// 笔记
				uni.navigateTo({
					url: '/pages/notesDetail/notesDetail?notesId=' + id
				})
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
				if (this.notesList[index].status == 'nomore' || this.notesList[index].status == 'loading') {
					return;
				}
				this.notesList[index].status = 'loading';
				if (index == 1 || index == 0) {
					getLastNotesByPage({
						page: this.notesList[index].page,
						pageSize: this.notesList[index].pageSize,
					}).then(res => {
						console.log(res);
						if (res.code == 20010) {
							this.notesList[index].page += 1;
							this.$refs.paging.complete(res.data.list);
							res.data.list.forEach(item => {
								this.getImageHeight(item.coverPicture).then(res => {
									if (this.notesList[index].leftHeight <= this.notesList[index]
										.rightHeight) {
										this.notesList[index].leftList.push(item)
										this.notesList[index].leftHeight += res
									} else {
										this.notesList[index].rightList.push(item)
										this.notesList[index].rightHeight += res
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
							this.$refs.paging.complete(res.data.list);
							res.data.list.forEach(item => {
								this.getImageHeight(item.coverPicture).then(res => {
									if (this.notesList[index].leftHeight <= this.notesList[index]
										.rightHeight) {
										this.notesList[index].leftList.push(item)
										this.notesList[index].leftHeight += res
									} else {
										this.notesList[index].rightList.push(item)
										this.notesList[index].rightHeight += res
									}
								})
							})
							if (re.data.list.length < this.notesList[index]
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
			refreshList(index) {
				if (this.notesList[index].status == 'nomore' || this.notesList[index].status == 'loading') {
					return;
				}
				this.notesList[index].status = 'loading';
				if (index == 1 || index == 0) {
					getLastNotesByPage({
						page: 1,
						pageSize: this.notesList[index].pageSize,
					}).then(res => {
						console.log(res);
						if (res.code == 20010) {
							this.notesList[index].leftHeight = 0;
							this.notesList[index].rightHeight = 0;
							this.notesList[index].leftList = [];
							this.notesList[index].rightList = [];
							this.notesList[index].notesList = res.data.list;
							this.notesList[index].page = 2;
							res.data.list.forEach(item => {
								this.getImageHeight(item.coverPicture).then(res => {
									if (this.notesList[index].leftHeight <= this.notesList[index]
										.rightHeight) {
										this.notesList[index].leftList.push(item)
										this.notesList[index].leftHeight += res
									} else {
										this.notesList[index].rightList.push(item)
										this.notesList[index].rightHeight += res
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
						console.log(res)
						if (res.code == 20010) {
							this.notesList[index].leftHeight = 0;
							this.notesList[index].rightHeight = 0;
							this.notesList[index].leftList = [];
							this.notesList[index].rightList = [];
							this.notesList[index].notesList = res.data.list;
							this.notesList[index].page = 2;
							res.data.list.forEach(item => {
								this.getImageHeight(item.coverPicture).then(res => {
									if (this.notesList[index].leftHeight <= this.notesList[index]
										.rightHeight) {
										this.notesList[index].leftList.push(item)
										this.notesList[index].leftHeight += res
									} else {
										this.notesList[index].rightList.push(item)
										this.notesList[index].rightHeight += res
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
	.swiper {
		height: 100%;
	}

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