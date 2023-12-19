<script>
	import {
		checkToken
	} from './apis/auth_apis.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			if (uni.getStorageSync('token') == null || uni.getStorageSync('token') == '') {
				uni.reLaunch({
					url: '/pages/login/login'
				})
				return
			}
			checkToken().then(res => {
				if (res.code != 200) {
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}
				return
			})
		},
		onShow: function() {
			console.log('App Show')
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