<template>
	<view>
		<view style="padding: 30rpx;">
			<block v-for="(item,index) in praiseAndCollectList" v-bind:key="item.id">
				<view
					style="display: flex;padding: 20rpx 0;align-items: center;border-bottom-style: solid;border-width: 1rpx;border-color: #f3f3f2;height: 140rpx;">
					<image :src="item.avatarUrl" style="height: 80rpx;width: 80rpx;border-radius: 50%;"
						@click="goToOtherMine(item.userId)" mode="aspectFill"></image>
					<view
						style="display: flex;flex-direction: column;justify-content: space-between;margin-left: 20rpx;flex: 1;"
						@click="goToNotesDetail(item.notesId,item.notesType)">
						<view style="font-size: 30rpx;color: #2b2b2b;">{{item.userName}}</view>
						<view style="height: 15rpx;"></view>
						<view style="font-size: 25rpx;color: #afafb0;">{{item.content}}</view>
					</view>
					<image :src="item.notesCoverPicture" style="height: 80rpx;width: 90rpx;" mode="aspectFill"
						@click="goToNotesDetail(item.notesId,item.notesType)"></image>
				</view>
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
				praiseAndCollectList: [],
				page: 1,
				pageSize: 10,
				status: "loading"
			};
		},
		methods: {
			/**
			 * @param {Object} time 时间戳
			 */
			timeFormat(time) {
				/// 两个月内为 '01-03'的形式
				/// 两个月前为 '2020-01-03'的形式
				const currentDate = new Date();
				const inputDate = new Date(time);

				// 计算时间差（毫秒）
				const timeDiff = currentDate - inputDate;

				// 两个月的毫秒数
				const twoMonthsInMillis = 2 * 30 * 24 * 60 * 60 * 1000;

				if (timeDiff < twoMonthsInMillis) {
					// 两个月内
					const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
					const day = inputDate.getDate().toString().padStart(2, '0');
					return `${month}-${day}`;
				} else {
					// 两个月前
					const year = inputDate.getFullYear();
					const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
					const day = inputDate.getDate().toString().padStart(2, '0');
					return `${year}-${month}-${day}`;
				}
			},
			goToOtherMine(userId) {
				uni.navigateTo({
					url: `/pages/mine/otherMine?userId=${userId}`
				})
			},
			goToNotesDetail(notesId, notesType) {
				if (notesType == '0') {
					uni.navigateTo({
						url: `/pages/notesDetail/notesDetail?notesId=${notesId}`
					})
				} else if (notesType == '1') {
					uni.navigateTo({
						url: `/pages/notesDetail/notesVideoDetail/noteVideoD?notesId=${notesId}`
					})
				}
			},
			getPraiseAndCollectList() {
				if (this.status == "nomore") {
					return;
				}
				let sql =
					`select * from praise_and_collection order by id desc limit ${(this.page-1)*this.pageSize},${this.pageSize}`;
				this.$sqliteUtil.SqlSelect(sql).then(res => {
					res = transData(res);
					res.forEach(item => {
						item.content=item.content+'  '+this.timeFormat(item.time);
					});
					console.log(res);
					this.praiseAndCollectList = this.praiseAndCollectList.concat(res);
					if (res.length < this.pageSize) {
						this.status = "nomore";
					} else {
						this.status = "loading";
					}
					this.page++;
				})
			}
		},
		onLoad() {
			this.getPraiseAndCollectList();
		},
		onReachBottom() {
			this.getPraiseAndCollectList();
		},
		onPullDownRefresh() {
			this.page = 1;
			this.praiseAndCollectList = [];
			this.status = "loading";
			this.getPraiseAndCollectList();
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 500);

		}
	}
</script>

<style lang="scss">

</style>