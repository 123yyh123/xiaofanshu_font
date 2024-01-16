<template>
	<view>
		<view style="padding: 30rpx;">
			<block v-for="(item,index) in attentionMessageList" v-bind:key="item.id">
				<view style="display: flex;padding: 10rpx 0;align-items: center;">
					<image :src="item.avatarUrl" style="height: 90rpx;width: 90rpx;border-radius: 50%;" @click="goToOtherMine(item.userId)"
						mode="aspectFill"></image>
					<view
						style="display: flex;flex-direction: column;justify-content: space-between;margin-left: 20rpx;flex: 1;" @click="goToOtherMine(item.userId)">
						<view style="font-size: 30rpx;color: #2b2b2b;">{{item.userName}}</view>
						<view style="font-size: 25rpx;color: #afafb0;">{{item.content}}</view>
					</view>
					<u-tag style="margin-left: auto;" text="去私信" plain shape="circle" borderColor="#afafb0"
						color="#2b2b2b" @click="goToChat(item)"></u-tag>
				</view>
				<u-divider></u-divider>
			</block>
			<view style="margin-top: 70rpx;">
				<u-loadmore :status="status" loadingIcon="spinner" line></u-loadmore>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		transData
	} from "@/utils/util.js"
	export default {
		data() {
			return {
				attentionMessageList: [],
				page: 1,
				pageSize: 10,
				status: "loading"
			};
		},
		methods: {
			goToOtherMine(userId) {
				uni.navigateTo({
					url: `/pages/mine/otherMine?userId=${userId}`
				})
			},
			getAttentionMessageList() {
				if (this.status == "nomore") {
					return;
				}
				let sql =
					`select * from attention_message order by id desc limit ${(this.page-1)*this.pageSize},${this.pageSize}`;
				this.$sqliteUtil.SqlSelect(sql).then(res => {
					res = transData(res);
					this.attentionMessageList = this.attentionMessageList.concat(res);
					if (res.length < this.pageSize) {
						this.status = "nomore";
					} else {
						this.status = "loading";
					}
					this.page++;
				})
			},
			goToChat(item) {
				uni.navigateTo({
					url: `/pages/chat/chat?userId=${item.userId}&userName=${item.userName}&avatarUrl=${item.avatarUrl}`
				})
			}
		},
		onLoad() {
			this.getAttentionMessageList();
		},
		onReachBottom() {
			this.getAttentionMessageList();
		},
		onPullDownRefresh() {
			this.page = 1;
			this.attentionMessageList = [];
			this.status = "loading";
			this.getAttentionMessageList();
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 500);

		}
	}
</script>

<style lang="scss">

</style>