<template>
	<view>
		<view style="padding: 70rpx;text-align: center;font-size: 40rpx;">绑定手机号验证</view>
		<view class="main">
			<wInput v-model="phoneData" type="text" maxlength="11" placeholder="手机号"></wInput>
			<wInput v-model="verCode" type="number" maxlength="6" placeholder="请输入6位验证码" isShowCode ref="runCode"
				@setCode="getVerCode()"></wInput>
			<wButton class="wbutton" text="确 定" :rotate="isRotate" @click.native="startReg()"></wButton>
		</view>
	</view>
</template>

<script>
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {
		bindNumberPhone,
		getTrtcUserSig
	} from '../../apis/auth_apis.js'
	import {
		sendBindPhoneSms
	} from '../../apis/third_service.js'
	export default {
		data() {
			return {
				phoneData: '', // 用户/电话
				verCode: "", //验证码
				isRotate: false, //是否加载旋转
				userinfo: {},
				type: 0
			};
		},
		components: {
			wInput,
			wButton,
		},
		onLoad(e) {
			this.userinfo = JSON.parse(e.data)
			this.type = e.type
			console.log(this.userinfo)
			console.log(this.type)
		},
		methods: {
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
			},
			startReg() {
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
				if (this.verCode.length != 6) {
					uni.showToast({
						icon: 'none',
						mask: true,
						duration: 1000,
						title: '验证码不正确'
					});
					return;
				}
				uni.showLoading({
					mask: true,
					title: '创建中...',
				})
				bindNumberPhone({
					registerVo: {
						phoneNumber: this.phoneData,
						smsCode: this.verCode,
						registerType: this.type,
						openId: this.userinfo.openId,
						nickname: this.userinfo.nickName,
						avatarUrl: this.userinfo.avatarUrl
					}
				}).then(res => {
					console.log(res)
					if (res.code != 20020) {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							mask: true,
							duration: 1000,
							title: res.msg
						});
						return;
					} else {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							mask: true,
							duration: 1000,
							title: '绑定成功'
						});
						uni.setStorageSync('token', res.data.token)
						uni.setStorageSync('userInfo', res.data)
						this.$sqliteUtil.init()
						this.$callUtils.login(res.data.id)
						this.$ws.init()
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}, 1000)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>