<template>
	<view>
		<view style="padding: 40rpx;">
			<u-cell-group :customStyle="{'backgroundColor': '#ffffff','borderRadius': '40rpx','padding':'10rpx'}"
				:border="false">
				<u-cell title="手机号" :isLink="true" :value="userInfo.hidePhone" @click="showPhoneTips"></u-cell>
				<u-cell :border="false" title="修改密码" :isLink="true" @click="goToReset"></u-cell>
			</u-cell-group>
		</view>
		<view style="padding: 0 40rpx;">
			<u-cell-group :customStyle="{'backgroundColor': '#ffffff','borderRadius': '40rpx','padding':'10rpx'}"
				:border="false">
				<u-cell title="微信账号" :isLink="true" :value="userInfo.isBindWechat?'已绑定':'未绑定'"
					@click="bindThird(0)"></u-cell>
				<u-cell title="QQ账号" :isLink="true" :value="userInfo.isBindQQ?'已绑定':'未绑定'"
					@click="bindThird(1)"></u-cell>
				<u-cell :border="false" title="Facebook账号" :isLink="true" :value="userInfo.isBindFacebook?'已绑定':'未绑定'"
					@click="bindThird(2)"></u-cell>
			</u-cell-group>
		</view>
		<view style="padding: 40rpx;">
			<u-cell-group :customStyle="{'backgroundColor': '#ffffff','borderRadius': '40rpx','padding':'10rpx'}"
				:border="false">
				<u-cell :border="false" title="登陆设备信息" :isLink="true" @click="viewSystemctlInfo=true"></u-cell>
			</u-cell-group>
		</view>
		<view style="padding: 0 40rpx;">
			<u-cell-group :customStyle="{'backgroundColor': '#ffffff','borderRadius': '40rpx','padding':'10rpx'}"
				:border="false">
				<u-cell :border="false" title="注销账号" :isLink="true"></u-cell>
			</u-cell-group>
		</view>
		<view @click="logout"
			style="margin: 40rpx;padding: 20rpx 40rpx;text-align: center;width: 600rpx;background-color: #ffffff;border-radius: 40rpx;height: 60rpx;line-height: 60rpx;">
			退出登录
		</view>
		<view @touchmove.stop.prevent="moveHandle">
			<u-popup :show="viewSystemctlInfo" mode="center" :customStyle="{'borderRadius': '40rpx'}"
				@close="viewSystemctlInfo=false">
				<view style="padding: 40rpx;text-align: center;width: 500rpx;">
					<view style="margin-bottom: 20rpx;">设备信息</view>
					<view style="margin-bottom: 20rpx;">{{phoneInfo.systemctlInfo}}</view>
					<view>系统版本：{{userInfo.appVersion}}</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		getUserIsBindThird
	} from '@/apis/user_service.js'
	import {logout} from '@/apis/auth_apis.js'
	export default {
		data() {
			return {
				userInfo: {},
				phoneInfo: {},
				viewSystemctlInfo: false,
			}
		},
		methods: {
			moveHandle(e) {},
			bindThird(type) {
				let tipContent = '';
				let isBind = false;
				if(type==0){
					tipContent = '微信';
					isBind = this.userInfo.isBindWechat;
				}else if(type==1){
					tipContent = 'QQ';
					isBind = this.userInfo.isBindQQ;
				}else{
					tipContent = 'Facebook';
					isBind = this.userInfo.isBindFacebook;
				}
				if(isBind){
					uni.showModal({
						title: '确认解绑？',
						content: '解绑'+tipContent+'账号后，将无法继续使用它登录该账号',
						success: (res) => {
							if (res.confirm) {
								uni.showToast({
									title: '解绑成功',
									icon: 'none'
								})
							}
						}
					})
				}else{
					// 暂时没有申请第三方登录的appid，暂时不做处理
					uni.showToast({
						title: '绑定'+tipContent+'账号',
						icon: 'none'
					})
					// this.$sqliteUtil.SqlExecute('drop table if exists praise_and_collection');
				}
			},
			goToReset() {
				uni.navigateTo({
					url: '/pages/setting/resetPasswordMethods'
				})
			},
			showPhoneTips() {
				this.$showModal({
					title: "更换绑定的手机号？",
					content: '当前绑定的手机号为' + this.userInfo.hidePhone.substring(3),
					align: "left", // 对齐方式 left/center/right
					cancelText: "取消", // 取消按钮的文字
					cancelColor: "#FF2442", // 取消按钮颜色
					confirmText: "确定", // 确认按钮文字
					confirmColor: "#FF2442", // 确认按钮颜色 
					showCancel: true, // 是否显示取消按钮，默认为 true
				}).then(res => {
					uni.navigateTo({
						url: '/pages/setting/updateBindPhone'
					})
				})
			},
			logout() {
				this.$showModal({
					title: "退出登录",
					content: '确定要退出登录吗？',
					align: "left", // 对齐方式 left/center/right
					cancelText: "取消", // 取消按钮的文字
					cancelColor: "#FF2442", // 取消按钮颜色
					confirmText: "确定", // 确认按钮文字
					confirmColor: "#FF2442", // 确认按钮颜色 
					showCancel: true, // 是否显示取消按钮，默认为 true
				}).then(res => {
					logout({
						userId: this.userInfo.id
					}).then(res => {
						console.log(res);
						uni.removeStorageSync('token');
						uni.removeStorageSync('userInfo');
						this.$ws.completeClose();
						this.$sqliteUtil.closeSqlite();
						uni.reLaunch({
							url: '/pages/login/login'
						})
					})
				})
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo');
			this.userInfo.hidePhone = '+86' + this.userInfo.phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
			getUserIsBindThird().then(res => {
				this.userInfo.isBindWechat = res.data.wechatBind;
				this.userInfo.isBindQQ = res.data.qqBind;
				this.userInfo.isBindFacebook = res.data.facebookBind;
			})
			uni.getSystemInfo({
				success: (res) => {
					console.log(res);
					this.phoneInfo.systemctlInfo = res.deviceBrand + ' ' + res.deviceModel + ' ' + res.system
					this.userInfo.appVersion = res.appVersion
				}
			});
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}
</style>