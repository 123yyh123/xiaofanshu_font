<template>
	<view>
		<view style="width: 100%;text-align: center;font-size: 50rpx;letter-spacing: 3rpx;margin: 40rpx 0;">新手机号验证
		</view>
		<view class="main">
			<wInput v-model="phoneData" type="text" maxlength="11" placeholder="手机号"></wInput>
			<wInput v-model="verCode" type="number" maxlength="6" placeholder="请输入6位验证码" isShowCode ref="runCode"
				@setCode="getVerCode()"></wInput>
			<wButton class="wbutton" text="确 定" :rotate="isRotate" @click.native="update"></wButton>
		</view>
	</view>
</template>

<script>
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button
	import {
		sendBindPhoneSms
	} from '@/apis/third_service.js'
	import {
		updatePhoneNumber
	} from '@/apis/user_service.js'
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
		methods: {
			update() {
				// 判断验证码是否输入
				if (this.verCode.length == 0 || this.verCode.length != 6) {
					uni.showToast({
						icon: 'none',
						mask: true,
						duration: 1000,
						title: '请输入正确的验证码'
					});
					return;
				}
				updatePhoneNumber({
					phoneNumber: this.phoneData,
					smsCode: this.verCode
				}).then(res => {
					if (res.code == 20020) {
						uni.removeStorage({
							key: 'userInfo',
							success: () => {
								this.userInfo.phoneNumber = this.phoneData
								uni.setStorageSync('userInfo', this.userInfo)
								uni.showToast({
									icon: 'none',
									mask: true,
									duration: 500,
									title: '修改成功'
								});
								setTimeout(() => {
									uni.switchTab({
										url: '/pages/mine/mine'
									})
								}, 500)
							},
							fail: () => {
								uni.showToast({
									icon: 'none',
									mask: true,
									duration: 1000,
									title: '修改失败'
								});
							}
						})
					} else {
						uni.showToast({
							icon: 'none',
							mask: true,
							duration: 1000,
							title: res.msg == '' ? '修改失败' : res.msg
						});
					}
				})

			},
			getVerCode() {
				//判断是否输入手机号，手机号是否规范
				const reg = /^1[3456789]\d{9}$/;
				if (this.phoneData.length == "" || !reg.test(this.phoneData)) {
					uni.showToast({
						icon: 'none',
						mask: true,
						duration: 1000,
						title: '手机号格式不正确'
					});
					return;
				}
				//获取验证码
				sendBindPhoneSms({
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
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo')
		}
	}
</script>

<style lang="scss">
	@import url("@/components/watch-login/css/icon.css");
	@import url("../login/css/main.css");
</style>