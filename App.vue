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
			checkToken().then(res=>{
				if(res.code===200){
					getUserInfo({
						userId: uni.getStorageSync('userInfo').id
					}).then(res=>{
						console.log(res)
						if(res.code===20010){
							uni.setStorageSync('userInfo',res.data)
							this.$ws.init();
						}
					})
				}
				return
			})
		},
		onShow: function() {
			console.log('App Show')
			this.$ws.init()
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