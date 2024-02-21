<template>
	<view>
		<view style="font-size: 30rpx;color: #95949a;margin: 40rpx 0 0 80rpx;">原密码</view>
		<view
			style="margin: 40rpx;padding: 20rpx 40rpx;width: 600rpx;background-color: #ffffff;border-radius: 30rpx;height: 60rpx;line-height: 60rpx;">
			<input password type="text" placeholder="输入原密码" v-model="oldPassword" />
		</view>
		<view style="font-size: 30rpx;color: #95949a;margin: 40rpx 0 0 80rpx;">新密码</view>
		<view
			style="margin: 40rpx;padding: 20rpx 40rpx;width: 600rpx;background-color: #ffffff;border-radius: 30rpx;height: 150rpx;display: flex;flex-direction: column;justify-content: space-around;">
			<input password type="text" placeholder="输入新的密码" v-model="newPassword" />
			<view style="height: 1rpx;border-bottom-style: solid;border-width: 1rpx;border-color: #f3f3f2;"></view>
			<input password type="text" placeholder="再次输入密码" v-model="confimPassword" />
		</view>
		<view style="font-size: 30rpx;color: #95949a;margin: 40rpx 0 0 80rpx;">
			密码6-16位，必须包含数字和字母
		</view>
		<view @click="resetPassword"
			style="margin: 40rpx;padding: 20rpx 40rpx;text-align: center;width: 600rpx;background-color: #ff2442;border-radius: 40rpx;height: 60rpx;line-height: 60rpx;color: #ffffff;">
			完成
		</view>
	</view>
</template>

<script>
	import {resetPasswordByOld} from '@/apis/user_service.js' 
	export default {
		data() {
			return {
				oldPassword: '',
				newPassword: '',
				confimPassword: ''
			};
		},
		methods: {
			resetPassword() {
				//判断是否输入原密码
				if (this.oldPassword.length == 0) {
					uni.showToast({
						icon: 'none',
						mask: true,
						duration: 1000,
						title: '请输入原密码'
					});
					return;
				}
				// 判断原密码是否符合规范
				const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
				if (!reg.test(this.oldPassword)) {
					uni.showToast({
						icon: 'none',
						mask: true,
						duration: 1000,
						title: '密码6-16位，必须包含数字和字母'
					});
					return
				}
				//判断是否输入新密码
				if (this.newPassword.length == 0) {
					uni.showToast({
						icon: 'none',
						mask: true,
						duration: 1000,
						title: '请输入新密码'
					});
					return;
				}
				//判断是否输入确认密码
				if (this.confimPassword.length == 0) {
					uni.showToast({
						icon: 'none',
						mask: true,
						duration: 1000,
						title: '请输入确认密码'
					});
					return;
				}
				//判断新密码和确认密码是否一致
				if (this.newPassword !== this.confimPassword) {
					uni.showToast({
						icon: 'none',
						mask: true,
						duration: 1000,
						title: '新密码和确认密码不一致'
					});
					return;
				}
				//判断新密码是否符合规范
				if (!reg.test(this.newPassword)) {
					uni.showToast({
						icon: 'none',
						mask: true,
						duration: 1000,
						title: '密码6-16位，必须包含数字和字母'
					});
					return
				}
				resetPasswordByOld({
					passwordVO: {
						oldPassword: this.oldPassword,
						newPassword: this.newPassword
					}
				}).then(res => {
					if (res.code == 20020) {
						uni.showToast({
							icon: 'none',
							mask: true,
							duration: 1000,
							title: '修改成功'
						});
						uni.navigateBack({
							delta: 1
						})
					} else {
						uni.showToast({
							icon: 'none',
							mask: true,
							duration: 1000,
							title: res.msg==''?'修改失败':res.msg
						});
					}
				})
			}
		},
		onLoad() {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	input {
		caret-color: #FF2442;
	}
</style>