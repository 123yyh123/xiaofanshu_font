<template>
	<view>
		<view class="pcolor flex" @click="open">
			<view class="flex-1 pcolor_bg" :style="[{backgroundColor: getColor}]">_</view>
			<view class="pcolor_right">
				<view class="pcolor_right__jt"></view>
			</view>
		</view>
		<t-color-picker
		ref="colorPicker" 
		:color="dColor"
		@confirm="confirm"
		></t-color-picker>
	</view>
</template>

<script>
	import tColorPicker from './t-color-picker/t-color-picker.vue'
	export default {
		components: {tColorPicker},
		props: {
			color: {
				type: Object,
				default:()=>({r: 0, g: 0,b: 0,a: 1})
			}
		},
		data() {
			return {
				dColor: {}
			}
		},
		computed: {
			getColor() {
				return `rgba(${this.dColor.r},${this.dColor.g},${this.dColor.b},${this.dColor.a})`;
			}
		},
		created() {
			this.dColor = this.color;
		},
		methods: {
			open() {
				this.$refs.colorPicker.open();
			},
			confirm(e) { 
				this.dColor = e.rgba;
				this.$emit('change',e);
			}
		}
	}
</script>

<style scoped lang="scss">
	@mixin flexCenter($align:center,$justify:center) {
		display: flex;
		flex-direction: row;
		align-items: $align;
		justify-content: $justify;
	}
	.flex {
		display: flex;
		&-1 {flex: 1;}
		&__tabs {
			@include flexCenter();
			flex-wrap: nowrap;
		}
		&-start {
			justify-content: flex-start;
		}
	}
	.pcolor {
		@include flexCenter();
		border: 1rpx solid #eee;
		border-radius: 6rpx;
		height: 45rpx;
		padding: 0 6rpx 0 0;
		box-sizing: border-box;
		overflow: hidden;
		&_bg {
			height: 45rpx;
			color: rgba(0,0,0,0);
			border-top-left-radius: 6rpx;
			border-bottom-left-radius: 6rpx;
			border-right: 1rpx solid #eee;
			box-sizing: border-box;
		}
		&_right {
			min-width: 36rpx;
			@include flexCenter();
			&__jt {
				width: 0;
				height: 0;
				border-top: 12rpx solid #999;
				border-right: 9rpx solid transparent;
				border-left: 9rpx solid transparent;
			}
		}
	}
</style>