<script>
	import {
		checkToken
	} from './apis/auth_apis.js';
	import {
		getUserInfo
	} from './apis/user_service.js'
import list from './uni_modules/uview-ui/libs/config/props/list.js';
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
						}
					})
				}
				return
			})
		},
		onShow: function() {
			console.log('App Show')
			uni.onNetworkStatusChange(res => {
				if (res.isConnected) {
					uni.showToast({
						title: '网络已恢复',
						icon: 'none',
						duration: 1000,
						mask: true
					})
					if(this.$ws.socketTask==null&&uni.getStorageInfoSync('userInfo')!=null){
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
		}
	}
</script>
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>>