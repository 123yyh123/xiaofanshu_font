// 通话工具
import {
	getTrtcUserSig
} from '@/apis/auth_apis.js'

let callUtils = {
	login,
	call
}

function login(userId) {
	getTrtcUserSig({
		userId: userId
	}).then(res => {
		let s = {
			userID: res.data.userId,
			userSig: res.data.userSig,
			SDKAppID: Number(res.data.sdkAppId),
		}
		uni.$TUICallKit.login(s, (res) => {
			if (res.code === 0) {
				console.log('login success');
				uni.$TUICallKit.enableFloatWindow(true);
				uni.$TUICallKit.setSelfInfo({
					avatar: uni.getStorageSync('userInfo').avatarUrl,
					nickName: uni.getStorageSync('userInfo').nickname
				});
			} else {
				console.log(
					`login failed, error message = ${res.msg}`
				);
			}
		});
	}).catch(err => {
		console.log(err);
	})
	uni.$TUICallingEvent.addEventListener('onCallCancelled', (res) => {
		console.log('onCallCancelled', res);
	});

}

function call(userId, type) {
	uni.$TUICallKit.call({
		userID: userId,
		callMediaType: type, // 语音通话(1)、视频通话(2)
	}, (res) => {
		if (res.code === 0) {
			console.log('call success');
		} else {
			console.log(res.msg);
		}
	})
}

module.exports = callUtils;