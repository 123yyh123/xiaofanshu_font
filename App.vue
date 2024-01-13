<script>
	import {
		checkToken,
		getTrtcUserSig
	} from './apis/auth_apis.js';
	import {
		getUserInfo
	} from './apis/user_service.js';
	import {
		emojiList
	} from './utils/emojiUtil.js'
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
			TUICallKit.enableFloatWindow(true);
			uni.$TUICallKit = TUICallKit;
			uni.$TUICallingEvent = TUICallingEvent;
			uni.$TUICallEngine = TUICallEngine;
			this.$sqliteUtil.openSqlite().then(res => {
				console.log(res)
				this.$sqliteUtil.SqlExecute(`CREATE TABLE IF NOT EXISTS message_list (
					"id"
					INTEGER PRIMARY KEY AUTOINCREMENT,
					user_id TEXT UNIQUE,
					avatar_url TEXT,
					user_name TEXT,
					last_message TEXT,
					last_time INTEGER,
					unread_num INTEGER,
					stranger BOOLEAN
				);`)
				// this.$sqliteUtil.SqlExecute(`ALTER TABLE chat_1735294666611408897 ADD COLUMN audio_time INTEGER;`)
				// 创建一个存储表情的表
				this.$sqliteUtil.SqlExecute(`CREATE TABLE IF NOT EXISTS emoji_list (
					"id"
					INTEGER PRIMARY KEY AUTOINCREMENT,
					url TEXT UNIQUE,
					name TEXT UNIQUE
				);`).then(res => {
					// 判断表情是否存在，不存在则插入，异步方法
					emojiList.forEach((res, index) => {
						this.insertEmoji(res)
					})
				})
			})
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
							getTrtcUserSig({
								userId: res.data.id
							}).then(res => {
								console.log(res.data)
								let s={
									userID: res.data.userId,
									userSig: res.data.userSig,
									SDKAppID: Number(res.data.sdkAppId),
								}
								console.log(s)
								uni.$TUICallKit.login(s, (res) => {
									console.log(res)
									if (res.code === 0) {
										console.log('login success');
										uni.$TUICallKit.setSelfInfo({
											avatar: uni.getStorageSync( 
												'userInfo').avatarUrl,
											nickName: uni.getStorageSync(
												'userInfo').nickname
										});
									} else {
										console.log(
											`login failed, error message = ${res.msg}`
										);
									}
								});
							})
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
		methods: {
			// 插入表情
			async insertEmoji(item) {
				let sql1 = `SELECT * FROM emoji_list WHERE name='${item.name}'`
				this.$sqliteUtil.SqlSelect(sql1).then(res => {
					if (res.length == 0) {
						saveFile(item.url).then(res => {
							let sql2 =
								`INSERT INTO emoji_list (url,name) VALUES ("${res}","${item.name}")`
							this.$sqliteUtil.SqlExecute(sql2)
						})
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>>