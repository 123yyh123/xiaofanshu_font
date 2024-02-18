<template>
	<view>
		<view :style="{height: statusBarHeight + 'px'}"
			style="position: fixed;top: 0;width: 100%;z-index: 9999;background-color: #fff;"></view>
		<view :style="{height: statusBarHeight + 'px'}"></view>
		<view style="padding: 10rpx 15rpx;display: flex;height: 44px;">
			<u-icon @click="goToBack" name="arrow-left" size="25"></u-icon>
			<u-search style="margin-left: 20rpx;" :showAction="true" actionText="搜索" :animation="true" :focus="true"
				v-model="searchValue" @search="search" @clear="clearSearch" @custom="search" @focus="focus"></u-search>
		</view>
		<view
			style="display: flex;padding: 20rpx 30rpx;box-sizing: border-box;justify-content: space-between;text-align: center;">
			<view style="font-size: 28rpx;color: #595857;letter-spacing: 2rpx;">历史记录</view>
			<view style="display: flex;">
				<view v-if="startDelete" @click="deleteAllHistory"
					style="font-size: 28rpx;color: #afafb0;letter-spacing: 2rpx;">全部删除</view>
				<view v-if="startDelete" style="font-size: 28rpx;color: #afafb0;margin: 0 10rpx;">|</view>
				<u-icon v-if="!startDelete" @click="startDelete=true" name="trash" size="18" color="#afafb0"></u-icon>
				<view v-else @click="startDelete=false" style="font-size: 28rpx;color: #595857;letter-spacing: 2rpx;">完成
				</view>
			</view>
		</view>
		<view style="padding: 20rpx 30rpx;display: flex;flex-wrap: wrap;">
			<view v-for="(item,index) in searchHistory" :key="index"
				style="display: flex;padding: 10rpx 15rpx;border-radius: 50rpx;border-style: solid;border-color: #f3f3f2;border-width: 1rpx;margin: 20rpx;">
				<view @click="goToSearch(item.content)"
					style="font-size: 28rpx;color: #595857;letter-spacing: 2rpx;word-break: break-all;">{{item.content}}
				</view>
				<u-icon style="margin-left: 10rpx;" v-if="startDelete" @click="deleteHistory(item.id)" name="close"
					size="15" color="#afafb0"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0,
				searchHistory: [],
				startDelete: false,
				searchValue: ''
			};
		},
		methods: {
			search() {
				console.log(this.searchValue)
				// 去除空格换行
				let searchValue = this.searchValue.replace(/[\n\r\s]+/g, '');
				if (searchValue === '') return;
				// 查询数据库是否存在
				this.$sqliteUtil.SqlSelect(`select * from search_history where content='${searchValue}'`).then(res => {
					if (res.length > 0) {
						console.log('已存在');
						this.$sqliteUtil.SqlExecute(
							`update search_history set updateTime=${new Date().getTime()} where content='${searchValue}'`
						).then(res => {
							this.goToSearch(this.searchValue)
						});
					} else {
						console.log('不存在');
						this.$sqliteUtil.SqlExecute(
							`insert into search_history (content,updateTime) values ('${searchValue}',${new Date().getTime()})`
						).then(res => {
							this.goToSearch(this.searchValue)
						});
					}
				});
			},
			goToSearch(keyword) {
				if (this.startDelete) {
					return;
				}
				this.searchValue = ''
				// 再次去除空格，以免搜索历史记录中出现空白
				keyword = keyword.replace(/[\n\r\s]+/g, '');
				this.$sqliteUtil.SqlExecute(
					`update search_history set updateTime=${new Date().getTime()} where content='${keyword}'`
				).then(res => {
					uni.navigateTo({
						url: '/pages/searchPage/searchDetailPage?keyword=' + keyword
					});
				});
			},
			focus() {
				this.startDelete = false;
			},
			refreshSearchList() {
				this.$sqliteUtil.SqlSelect(`select * from search_history order by updateTime desc`).then(res => {
					console.log(res);
					this.searchHistory = res;
				});
			},
			clearSearch() {
				this.searchValue = '';
			},
			deleteHistory(id) {
				this.$sqliteUtil.SqlExecute(`delete from search_history where id=${id}`).then(res => {
					console.log(res);
					this.refreshSearchList();
				});
			},
			deleteAllHistory() {
				this.$sqliteUtil.SqlExecute(`delete from search_history`).then(res => {
					console.log(res);
					this.refreshSearchList();
				});
			},
			goToBack() {
				uni.navigateBack();
			}
		},
		onLoad(options) {
			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = res.statusBarHeight;
				}
			});
			if (options.keyword) {
				this.searchValue = options.keyword
			}
		},
		onShow() {
			this.$sqliteUtil.SqlSelect(`select * from search_history order by updateTime desc`).then(res => {
				console.log(res);
				this.searchHistory = res;
			});
		}
	}
</script>

<style lang="scss">
	input {
		caret-color: #FF2442;
	}
</style>