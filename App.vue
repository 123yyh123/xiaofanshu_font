<script>
	import {
		checkToken
	} from './apis/auth_apis.js';
	import {getUserInfo} from './apis/user_service.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			if (uni.getStorageSync('token') == null || uni.getStorageSync('token') == '') {
				uni.reLaunch({
					url: '/pages/login/login'
				})
				return
			}
			getUserInfo().then(res=>{
				if(res.code===20021){
					uni.setStorageSync('userInfo', JSON.stringify(res.data));
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