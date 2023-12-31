<template>
	<view class="liu-slide">
		<view class="liu-slide-left" :style="'position: relative;left:'+left+'rpx'" @touchstart="touchstart"
			@touchmove="touchmove" @touchend="touchend">
			<slot></slot>
		</view>
		<view class="liu-slide-right">
			<view class="btn-item" v-for="(item,index) in btnList" :key="index"
				:style="'width:'+item.width+';height:'+height+'rpx;background-color:'+item.bgColor+';color:'+item.color+';font-size:'+item.fontSize"
				@click.stop="clickItem(item)">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//操作按钮数组
			btnList: {
				type: Array,
				default: () => {
					return [{
						id: '1',
						name: '编辑',
						width: '100rpx',
						bgColor: '#5f92f7',
						color: '#FFFFFF',
						fontSize: '28rpx'
					}, {
						id: '2',
						name: '删除',
						width: '100rpx',
						bgColor: '#ed656d',
						color: '#FFFFFF',
						fontSize: '28rpx'
					}]
				}
			},
			//当前列索引
			index: {
				type: String,
				require: true,
				default: ''
			},
			//是否禁用
			disable: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				x: 0,
				left: 0,
				operation: 0,
				height: 0,
				screenWidth: 0
			};
		},
		mounted() {
			this.$nextTick(res => {
				const systemInfo = uni.getSystemInfoSync()
				this.screenWidth = systemInfo.screenWidth
				this.getBtnWidth()
				this.getListHeight()
			})
		},
		methods: {
			clickItem(e) {
				this.$emit('clickItem', {
					index: this.index,
					id: e.id
				})
			},
			//重置方法
			reset() {
				this.left = 0
			},
			getBtnWidth() {
				let view = uni.createSelectorQuery().in(this).select(".liu-slide-right");
				view.boundingClientRect(rect => {
					this.operation = this.px2rpx(rect.width, this.screenWidth)
				}).exec()
			},
			getListHeight() {
				let view = uni.createSelectorQuery().in(this).select(".liu-slide-left");
				view.boundingClientRect(rect => {
					this.height = this.px2rpx(rect.height, this.screenWidth)
				}).exec()
			},
			px2rpx(px, screenWidth) {
				return px / (screenWidth / 750)
			},
			touchstart(e) {
				if(this.disable) return
				this.x = this.px2rpx(e.touches[0].clientX, this.screenWidth)
			},
			touchmove(e) {
				if(this.disable) return
				let clientX = this.x - this.px2rpx(e.touches[0].clientX, this.screenWidth)
				if (clientX <= 0) this.left = 0
				else if (this.operation <= clientX) this.left = this.operation * -1
				else this.left = clientX * -1
			},
			touchend(e) {
				if(this.disable) return
				let clientX = this.x - this.px2rpx(e.changedTouches[0].clientX, this.screenWidth)
				this.left = clientX > this.operation / 2 ? this.operation * -1 : 0
			},
		}
	}
</script>

<style scoped>
	.liu-slide {
		width: 100%;
		position: relative;
		overflow: hidden;
	}

	.liu-slide-left {
		width: 100%;
		overflow: hidden;
		background-color: #FFFFFF;
		transition: left 0.2s ease-in-out;
		z-index: 999;
	}

	.liu-slide-right {
		position: absolute;
		top: 0rpx;
		right: 0;
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.btn-item {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>