<template>
	<view class="forget">
		
		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">若你忘记了密码，可在此重置新密码。</view>
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="请输入手机号码"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="20"
					placeholder="请输入新密码,密码6-16位，必须包含数字和字母"
					isShowPass
				></wInput>
				
				<wInput
					v-model="verCode"
					type="number"
					maxlength="6"
					placeholder="验证码"
					isShowCode
					codeText="获取验证码"
					setTime="60"
					ref="runCode"
					@setCode="getVerCode()"
				></wInput>
			</view>
			
			<wButton 
				class="wbutton"
				text="重置密码"
				:rotate="isRotate" 
				@click.native="startRePass()"
			></wButton>

		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {sendResetPhoneSms} from '../../apis/third_service.js' //发送验证码
	import {resetPassword}  from '../../apis/user_service.js'
	export default {
		data() {
			return {
				phoneData: "", //电话
				passData: "", //密码
				verCode:"", //验证码
				isRotate: false, //是否加载旋转
			}
		},
		components:{
			wInput,
			wButton
		},
		methods: {
			getVerCode(){
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
				console.log("获取验证码")
				//获取验证码
				sendResetPhoneSms({
					phoneNumber:this.phoneData,
				}).then(res=>{
					this.$refs.runCode.$emit('runCode');
					if(res.code==20010){
						uni.showToast({
							icon: 'none',
							mask: true,
							duration: 1000,
							title: '发送成功'
						});
					}else{
						uni.showToast({
							icon: 'none',
							mask: true,
							duration: 1000,
							title: res.msg
						});
					}
				})
			},
			startRePass() {
				//重置密码
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
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
			    //判断是否输入密码，密码是否规范，长度为6-16位，包含数字和字母，可以有特殊字符
			    const phoneReg = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,16})$/;
			    if (this.passData.length == "" || this.passData.length < 6 || this.passData.length > 16 || !phoneReg.test(
			    		this.passData)) {
			    	uni.showToast({
			    		icon: 'none',
			    		mask: true,
			    		duration: 1000,
			    		title: '密码格式不正确'
			    	});
			    	return;
			    }
				if(this.verCode.length!=6){
					uni.showToast({
						icon: 'none',
						mask: true,
						duration: 1000,
						title: '验证码不正确'
					});
					return;
				}
				resetPassword({
					phoneNumber:this.phoneData,
					password:this.passData,
					smsCode:this.verCode
				}).then(res=>{
					if(res.code==20020){
						uni.showToast({
							icon: 'none',
							mask: true,
							duration: 1000,
							title: '重置成功'
						});
						uni.navigateBack({
							delta: 1
						});
					}else{
						uni.showToast({
							icon: 'none',
							mask: true,
							duration: 1000,
							title: res.msg
						});
					}
					this.isRotate=false
				}).catch(err=>{
					this.isRotate=false
				})
				console.log("重置密码成功")
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>

