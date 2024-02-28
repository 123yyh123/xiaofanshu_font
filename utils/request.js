import {
	baseUrl
} from '../config/index'
import ws from './websocket.js'
export const $request = (params = {}) => {
	return new Promise(function(resolve, reject) {
		uni.showLoading({
			title: '加载中',
			mask: true
		})
		let header = {
			'token': uni.getStorageSync('token')
		}
		const timer = setTimeout(() => {
			uni.hideLoading()
			reject(new Error('请求超时'))
		}, 5000);
		uni.request({
			url: baseUrl + params.url,
			method: params.method,
			header: header,
			data: params.data,
			success: (res) => {
				if (res.data.code === 40310 || res.data.code === 40320 || res.data.code ===
					40330) {
					uni.hideLoading();
					ws.completeClose()
					uni.showToast({
						icon: "none",
						title: "用户未认证或登录过期,请重新登录",
						duration: 500
					});
					uni.removeStorageSync("userInfo")
					uni.removeStorageSync('token')
					setTimeout(function() {
						uni.reLaunch({
							url: "/pages/login/login"
						});
					}, 500);
				} else if (res.data.code === 10061) {
					uni.hideLoading();
					ws.completeClose()
					uni.showToast({
						icon: "none",
						title: "用户已在其他地方登录,请重新登录",
						duration: 500
					});
					uni.removeStorageSync("userInfo")
					uni.removeStorageSync('token')
					setTimeout(function() {
						uni.reLaunch({
							url: "/pages/login/login"
						});
					}, 500);
				} else if (res.data.code === 10110) {
					uni.hideLoading();
					uni.showToast({
						title:res.data.msg,
						icon:'none',
						mask:true,
						duration:1500
					})
				}
				resolve(res.data)
			},
			fail(err) {
				reject(err)
				ws.completeClose()
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}