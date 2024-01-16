<script>
	import {
		checkToken,
		getTrtcUserSig
	} from './apis/auth_apis.js';
	import {
		getUserInfo
	} from './apis/user_service.js';
	import {
		saveFile
	} from './utils/fileUtil.js'
	import list from './uni_modules/uview-ui/libs/config/props/list.js';
	import genTestUserSig from './debug/GenerateTestUserSig.js'
	// 原生插件引入提供如下接口：1V1音视频，群聊音视频。
	const TUICallKit = uni.requireNativePlugin('TencentCloud-TUICallKit');
	// 监听通话的状态，例如：异常、通话开始、结束等。
	const TUICallingEvent = uni.requireNativePlugin('globalEvent');
	// 目前仅提供如下接口：结束通话，设置用户视频画面的渲染模式
	const TUICallEngine = uni.requireNativePlugin('TencentCloud-TUICallKit-TUICallEngine');
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.$TUICallKit = TUICallKit;
			uni.$TUICallingEvent = TUICallingEvent;
			uni.$TUICallEngine = TUICallEngine;
			this.$sqliteUtil.init()
			if (uni.getStorageSync('token') == null || uni.getStorageSync('token') == '') {
				this.$ws.completeClose()
				uni.reLaunch({
					url: '/pages/login/login'
				})
				return
			}
			checkToken().then(res => {
				if (res.code === 200) {
					getUserInfo({
						userId: uni.getStorageSync('userInfo').id
					}).then(res => {
						console.log(res)
						if (res.code === 20010) {
							uni.setStorageSync('userInfo', res.data)
							this.$ws.init();
							this.$callUtils.login(res.data.id)
						}
					})
				}
				return
			})
		},
		onShow: function() {
			console.log('App Show')
			this.$ws.setCornerMark()
			uni.onNetworkStatusChange(res => {
				if (res.isConnected) {
					uni.showToast({
						title: '网络已恢复',
						icon: 'none',
						duration: 1000,
						mask: true
					})
					if (this.$ws.socketTask == null && uni.getStorageInfoSync('userInfo') != null) {
						this.$ws.init()
					}
				} else {
					uni.showToast({
						title: '网络已断开',
						icon: 'none',
						duration: 1000,
						mask: true
					})
					this.$ws.completeClose()
				}
			})
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>>