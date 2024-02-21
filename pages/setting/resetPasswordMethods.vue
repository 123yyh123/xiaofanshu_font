<template>
	<view>
		<view style="font-size: 30rpx;color: #95949a;margin: 40rpx 0 0 80rpx;">请先进行身份验证</view>
		<view style="padding: 40rpx;">
			<u-cell-group :customStyle="{'backgroundColor': '#ffffff','borderRadius': '40rpx','padding':'10rpx'}"
				:border="false">
				<u-cell title="手机验证码验证" :isLink="true" @click="goToSmsReset"></u-cell>
				<u-cell :border="false" title="原密码验证" :isLink="true" @click="goToPasswordVerify"></u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goToSmsReset(){
				uni.navigateTo({
					url: '/pages/login/forget'
				})
			},
			goToPasswordVerify(){
				uni.navigateTo({
					url: '/pages/setting/setPasswordByPasswordVerify'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
</style>
