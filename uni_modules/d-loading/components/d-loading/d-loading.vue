<template>
	<view class="dengLoadingVue">
		<view class="maskVueHiddenShow" v-if="statusLoading" @click="onCheckHiddenApi"
			@touchmove.stop.prevent="moveHandle">
			<view class="maskVueHiddenShowWrapper">
				<image src="../../../../static/01114d59941891000000212989593d.gif" class="maskVueHiddenShowWrapperGif"
					mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			status: false,
		},
		created() {
			if (this.statusLoading == true) {
				var that = this
				setTimeout(function() {
					that.statusLoading = false
				}, 1500)
			}
		},
		data() {
			return {
				statusLoading: true,
			};
		},
		watch: {
			status(e) {
				this.statusLoading = e

			}
		},
		methods: {
			moveHandle() {},
			onCheckHiddenApi() {},
			reset() {
				this.statusLoading = true
				var that = this
				setTimeout(function() {
					that.statusLoading = false
				}, 1500)
			}
		}
	}
</script>

<style lang="scss">
	.dengLoadingVue {
		.maskVueHiddenShow {
			z-index: 1000;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #ffffff;
			opacity: 0.6;
			//
			display: flex;
			align-items: center;
			justify-content: center;

			.maskVueHiddenShowWrapper {
				width: 80%;
				height: 300rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.maskVueHiddenShowWrapperGif {
					width: 400rpx;
				}
			}
		}
	}
</style>