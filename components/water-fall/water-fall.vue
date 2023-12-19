<template>
	<view style="width: 100%;display: flex;flex-wrap: wrap;">
		<view class="water-left">
			<block v-for="(item,index) in leftList" :key="index">
				<view style="position: relative;">
					<image style="width: 100%;height: auto;border-radius: 15rpx;" :src="item.img"
						mode="widthFix">
					</image>
					<view class="look-views" v-if="item.views!=null">
						<u-icon name="eye" color="#ffffff" size="25rpx"></u-icon>
						<view style="margin-left: 5rpx;">{{item.views}}</view>
					</view>
				</view>
				<view class="title">{{item.title}}</view>
				<view style="display: flex;position: relative;padding: 20rpx;">
					<image style="height: 20px;width: 20px;border-radius: 50%;" mode="aspectFill"
						:src="item.avatarUrl"></image>
					<view class="note-username">
						{{item.nickname}}
					</view>
					<view style="display: flex;position: absolute;right: 10rpx;">
						<u-icon name="heart" color="#000000" size="18"></u-icon>
						<text style="color: gray;font-size: 15px;line-height: 18px;margin-left: 3rpx;">{{item.like}}</text>
					</view>
				</view>
			</block>
		</view>
		<view class="water-right">
			<block v-for="(item,index) in rightList" :key="index">
				<view style="position: relative;">
					<image style="width: 100%;height: auto;border-radius: 15rpx;" :src="item.img"
						mode="widthFix">
					</image>
					<view class="look-views"  v-if="item.views!=null">
						<u-icon name="eye" color="#ffffff" size="25rpx"></u-icon>
						<view style="margin-left: 5rpx;">{{item.views}}</view>
					</view>
				</view>
				<view class="title">{{item.title}}</view>
				<view style="display: flex;position: relative;padding: 20rpx;">
					<image style="height: 20px;width: 20px;border-radius: 50%;" mode="aspectFill"
						:src="item.avatarUrl"></image>
					<view class="note-username">
						{{item.nickname}}
					</view>
					<view style="display: flex;position: absolute;right: 10rpx;">
						<u-icon name="heart" color="#000000" size="18"></u-icon>
						<text style="color: gray;font-size: 15px;line-height: 18px;margin-left: 3rpx;">{{item.like}}</text>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name:"water-fall",
		data() {
			return {
				leftList: [],
				rightList: [],
				leftHeight: 0,
				rightHeight: 0,
			};
		},
		props: {
			list: {
				type: Array,
				default: () => []
			},
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.list.forEach((item) => {
					this.getImageHeight(item.img).then(res => {
						if (this.leftHeight <= this.rightHeight) {
							this.leftList.push(item)
							this.leftHeight += res
						} else {
							this.rightList.push(item)
							this.rightHeight += res
						}
					})
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
			addList(e) {
				console.log(e)
				e.forEach((item) => {
					this.getImageHeight(item.img).then(res => {
						if (this.leftHeight <= this.rightHeight) {
							this.leftList.push(item)
							this.leftHeight += res
						} else {
							this.rightList.push(item)
							this.rightHeight += res
						}
					})
				})
			}
		},
	}
</script>

<style lang="scss">
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
</style>