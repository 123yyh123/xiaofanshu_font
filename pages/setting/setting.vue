<template>
	<view>
		<view style="padding: 40rpx;">
			<u-cell-group :customStyle="{'backgroundColor': '#ffffff','borderRadius': '40rpx','padding':'10rpx'}"
				:border="false">
				<u-cell title="手机号" :isLink="true" :value="userInfo.hidePhone"></u-cell>
				<u-cell :border="false" title="修改密码" :isLink="true"></u-cell>
			</u-cell-group>
		</view>
		<view style="padding: 0 40rpx;">
			<u-cell-group :customStyle="{'backgroundColor': '#ffffff','borderRadius': '40rpx','padding':'10rpx'}"
				:border="false">
				<u-cell title="微信账号" :isLink="true" :value="userInfo.isBindWechat?'已绑定':'未绑定'"></u-cell>
				<u-cell title="QQ账号" :isLink="true" :value="userInfo.isBindQQ?'已绑定':'未绑定'"></u-cell>
				<u-cell :border="false" title="Facebook账号" :isLink="true"
					:value="userInfo.isBindFacebook?'已绑定':'未绑定'"></u-cell>
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
		<view style="margin: 40rpx;padding: 20rpx 40rpx;text-align: center;width: 600rpx;box-sizing: border-box;background-color: #ffffff;border-radius: 30rpx;">
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
	export default {
		data() {
			return {
				userInfo: {},
				phoneInfo: {},
				viewSystemctlInfo: false,
			}
		},
		methods: {
			moveHandle(e) {}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo');
			this.userInfo.hidePhone = this.userInfo.phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
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