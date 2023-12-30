<template>
	<view>
		<view
			style="display: flex;justify-content: space-around;font-size: 30rpx;margin-top: 30rpx;padding: 10rpx 20rpx;">
			<view style="text-align: center;">
				<view>
					<image style="width: 85rpx;" mode="widthFix" src="../../static/image/精品收藏.png"></image>
				</view>
				<text>赞和收藏</text>
			</view>
			<view style="text-align: center;">
				<view>
					<image style="width: 85rpx;" mode="widthFix" src="../../static/image/人员信息.png"></image>
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
				<view style="display: flex;padding: 20rpx;height: 110rpx;">
					<image style="width: 110rpx;height: 110rpx;border-radius: 50%;margin: 0 10rpx;" mode="aspectFill"
						:src="item.avatar_url">
					</image>
					<view style="margin:0 15rpx;flex: 1;align-self: center;">
						<view>{{item.user_name}}</view>
						<view class="simpleMessage">{{item.last_message}}</view>
					</view>
					<view style="align-self: center;text-align: end;">
						<view style="color: #949495;font-size: 24rpx;">{{item.last_time}}</view>
						<view v-if="item.unread_num>0" style="display: inline-block;">
							<u-badge numberType="overflow" max="99" :value="item.unread_num"></u-badge>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {
		sqliteUtil
	} from '../../utils/sqliteUtil.js'
	import {timestampFormat,stringDateFormat} from '../../utils/util.js'
	export default {
		data() {
			return {
				list: [],
			}
		},
		methods: {
		},
		onLoad() {
			uni.$on('updateMessageList', () => {
				this.$sqliteUtil.SqlSelect(`SELECT * FROM message_list ORDER BY last_time DESC`).then(res => {
					res.forEach(item => {
						item.last_time = timestampFormat(item.last_time)
					})
					this.list = res
				})
			})
		},
		onShow() {
			this.$sqliteUtil.SqlSelect(`SELECT * FROM message_list ORDER BY last_time DESC`).then(res => {
				res.forEach(item => {
					item.last_time = timestampFormat(item.last_time)
				})
				this.list = res
			})
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