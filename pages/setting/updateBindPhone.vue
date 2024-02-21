<template>
	<view>
		<view style="width: 100%;text-align: center;font-size: 50rpx;letter-spacing: 3rpx;margin: 40rpx 0;">现手机号验证</view>
		<view class="main">
			<wInput v-model="phoneData" type="text" maxlength="11" placeholder="手机号"></wInput>
			<wInput v-model="verCode" type="number" maxlength="6" placeholder="请输入6位验证码" isShowCode ref="runCode"
				@setCode="getVerCode()"></wInput>
			<wButton class="wbutton" text="确 定" :rotate="isRotate" @click.native="goToUpdate"></wButton>
		</view>
	</view>
</template>

<script>
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button
	import {
		sendResetPhoneSms,
		checkResetSmsCode
	} from '@/apis/third_service.js'
	
	export default {
		components: {
			wInput,
			wButton,
		},
		data() {
			return {
				userInfo: {},
				isRotate: false, //是否加载旋转
				verCode: "", //验证码
				phoneData: "", //手机号
			};
		},
		methods:{
			goToUpdate(){
				// 判断验证码是否输入
				if (this.verCode.length == 0||this.verCode.length!=6) {
					uni.showToast({
						icon: 'none',
						mask: true,
						duration: 1000,
						title: '请输入正确的验证码'
					});
					return;
				}
				checkResetSmsCode({
					phoneNumber: this.phoneData,
					smsCode: this.verCode
				}).then(res => {
					if (res.code == 20020) {
						uni.navigateTo({
							url: '/pages/setting/updateNewPhone'
						})
					} else {
						uni.showToast({
							icon: 'none',
							mask: true,
							duration: 1000,
							title: '验证码错误'
						});
					}
				})
			},
			getVerCode() {
				if(this.phoneData!=this.userInfo.phoneNumber){
					uni.showToast({
						icon: 'none',
						mask: true,
						duration: 500,
						title: '请输入正确的绑定手机号'
					});
					return;
				}
				//获取验证码
				sendResetPhoneSms({
					phoneNumber: this.phoneData,
				}).then(res => {
					this.$refs.runCode.$emit('runCode');
					if (res.code == 20010) {
						uni.showToast({
							icon: 'none',
							mask: true,
							duration: 1000,
							title: '发送成功'
						});
					} else {
						uni.showToast({
							icon: 'none',
							mask: true,
							duration: 1000,
							title: res.msg
						});
					}
				})
			},
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo');
			this.phoneData=this.userInfo.phoneNumber
		},
	}
</script>

<style lang="scss">
	@import url("@/components/watch-login/css/icon.css");
	@import url("../login/css/main.css");
</style>