<template>
	<view>
		<view
			style="display: flex;justify-content: space-around;font-size: 30rpx;margin-top: 30rpx;padding: 10rpx 20rpx;">
			<view style="text-align: center;position: relative;" @click="goToPraiseAndCollect">
				<view>
					<image style="width: 85rpx;" mode="widthFix" src="../../static/image/collect.png"></image>
					<u-badge absolute :offset="[0,0]" max="99" :value="praiseAndCollectNum"></u-badge>
				</view>
				<text>赞和收藏</text>
			</view>
			<view style="text-align: center;position: relative;" @click="goToAttentionMessageList">
				<view>
					<image style="width: 85rpx;" mode="widthFix" src="../../static/image/peopleInfo.png"></image>
					<u-badge absolute :offset="[0,0]" max="99" :value="attentionUnreadNum"></u-badge>
				</view>
				<text>新增关注</text>
			</view>
			<view style="text-align: center;">
				<view>
					<image style="width: 85rpx;" mode="widthFix" src="../../static/image/icon-kfckfc.png"></image>
				</view>
				<text>评论和@</text>
			</view>
		</view>
		<view style="margin-top: 30rpx;">
			<block v-for="(item,index) in list" :key="index">
				<liu-swipe-action :index="item.user_id" @clickItem="clickItem" :btnList="operation" :ref="'ref'+index">
					<view style="display: flex;padding: 20rpx;height: 110rpx;" @touchmove="touchmove(index)"
						@click="goToChat(item)">
						<image style="width: 110rpx;height: 110rpx;border-radius: 50%;margin: 0 10rpx;"
							mode="aspectFill" :src="item.avatar_url">
						</image>
						<view style="margin:0 15rpx;flex: 1;align-self: center;">
							<view>{{item.user_name}}</view>
							<rich-text class="simpleMessage" :nodes="item.last_message"></rich-text>
						</view>
						<view style="align-self: center;text-align: end;">
							<view style="color: #949495;font-size: 24rpx;">{{item.last_time}}</view>
							<view v-if="item.unread_num>0" style="display: inline-block;">
								<u-badge numberType="overflow" max="99" :value="item.unread_num"></u-badge>
							</view>
						</view>
					</view>
				</liu-swipe-action>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		sqliteUtil
	} from '../../utils/sqliteUtil.js'
	import {
		timestampFormat,
		stringDateFormat,
		replaceImageTags
	} from '../../utils/util.js'
	export default {
		data() {
			return {
				operation: [{
					id: 1,
					name: '已读',
					width: '150rpx',
					bgColor: '#5f92f7',
					color: '#FFFFFF',
					fontSize: '28rpx'
				}, {
					id: 2,
					name: '删除',
					width: '150rpx',
					bgColor: '#ed656d',
					color: '#FFFFFF',
					fontSize: '28rpx'
				}],
				list: [],
				show: false,
				praiseAndCollectNum: 0,
				attentionUnreadNum: 0,
			}
		},
		methods: {
			goToPraiseAndCollect() {
				this.$sqliteUtil.SqlExecute(`UPDATE system_message SET unread_num=0 WHERE id=1`).then(res => {
					this.refreshPraiseAndCollectNum()
					this.$ws.setCornerMark()
					uni.navigateTo({
						url: `/pages/praiseAndCollect/praiseAndCollect`
					})
				})
			},
			goToAttentionMessageList() {
				this.$sqliteUtil.SqlExecute(`UPDATE system_message SET unread_num=0 WHERE id=2`).then(res => {
					this.refreshAttentionList()
					this.$ws.setCornerMark()
					uni.navigateTo({
						url: `/pages/attentionMessageList/attentionMessageList`
					})
				})
			},
			clickItem(e) {
				if (e.id === 1) {
					let sql = `UPDATE message_list SET unread_num=0 WHERE user_id='${e.index}'`
					this.$sqliteUtil.SqlExecute(sql).then(res => {
						this.refreshList()
						this.resetAll()
						this.$ws.setCornerMark()
					})
				} else if (e.id === 2) {
					let sql = `DELETE FROM message_list WHERE user_id='${e.index}'`
					this.$sqliteUtil.SqlExecute(sql).then(res => {
						this.refreshList()
						this.resetAll()
						this.$ws.setCornerMark()
					})
				}
			},
			resetAll() {
				this.list.forEach((res, index) => {
					this.$refs['ref' + index][0].reset()
				})
			},
			touchmove(index) {
				this.list.forEach((res, i) => {
					if (index != i) {
						this.$refs['ref' + i][0].reset()
					}
				})
			},
			refreshList() {
				this.$sqliteUtil.SqlSelect(`SELECT * FROM message_list ORDER BY last_time DESC`).then(res => {
					res.forEach(item => {
						item.last_time = timestampFormat(Number(item.last_time))
						item.last_message = replaceImageTags(item.last_message)
					})
					this.list = res
				})
			},
			refreshAttentionList() {
				this.$sqliteUtil.SqlSelect(`SELECT unread_num FROM system_message WHERE id=2`).then(res => {
					this.attentionUnreadNum = res[0].unread_num
				})
			},
			refreshPraiseAndCollectNum() {
				this.$sqliteUtil.SqlSelect(`SELECT unread_num FROM system_message WHERE id=1`).then(res => {
					this.praiseAndCollectNum = res[0].unread_num
				})
			},
			goToChat(item) {
				console.log(item)
				// 清除未读消息
				let sql = `UPDATE message_list SET unread_num=0 WHERE user_id='${item.user_id}'`
				this.$sqliteUtil.SqlExecute(sql).then(res => {
					this.refreshList()
					this.resetAll()
					this.$ws.setCornerMark()
				})
				// 为了解决中文乱码问题
				item.avatar_url = encodeURIComponent(item.avatar_url)
				uni.navigateTo({
					url: `/pages/chat/chat?userId=${item.user_id}&userName=${item.user_name}&avatarUrl=${item.avatar_url}`
				})
			}
		},
		onLoad() {
			uni.$on('updateMessageList', () => {
				this.refreshList()
			})
			uni.$on('updateAttentionList', () => {
				this.refreshAttentionList()
			})
			uni.$on('updatePraiseAndCollectionList', () => {
				this.refreshPraiseAndCollectNum()
			})
		},
		onShow() {
			this.refreshList()
			this.refreshAttentionList()
			this.refreshPraiseAndCollectNum()
		},
		onPullDownRefresh() {
			this.refreshList()
			try{
				let refreshText = {
					from: uni.getStorageSync('userInfo').id,
					content: uni.getStorageSync('token'),
					messageType: 1,
				}
				this.$ws.send(refreshText)
			}catch(e){
				console.log(e)
			}finally{
				uni.stopPullDownRefresh()
			}
		}
	}
</script>


<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.simpleMessage {
		color: #949495;
		font-size: 30rpx;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		display: -webkit-box;
		overflow: hidden;
	}
</style>