import {$request} from '../utils/request.js'

export const resetPassword=(params={})=>{
	return $request({
		url:'/user/resetPassword?phoneNumber='+params.phoneNumber+'&password='+params.password+'&smsCode='+params.smsCode,
		method:'POST'
	})
}

export const getUserInfo=(params={})=>{
	return $request({
		url:'/user/getUserInfo?userId='+params.userId,
		method:'GET'
	})
}

export const updateAvatarUrl=(params={})=>{
	return $request({
		url:'/user/updateAvatarUrl',
		method:'POST',
		data:params.userVO
	})
}

export const updateBackgroundImage=(params={})=>{
	return $request({
		url:'/user/updateBackgroundImage',
		method:'POST',
		data:params.userVO
	})
}

export const updateNickname=(params={})=>{
	return $request({
		url:'/user/updateNickname',
		method:'POST',
		data:params.userVO
	})
}

export const updateIntroduction=(params={})=>{
	return $request({
		url:'/user/updateIntroduction',
		method:'POST',
		data:params.userVO
	})
}

export const updateSex=(params={})=>{
	return $request({
		url:'/user/updateSex',
		method:'POST',
		data:params.userVO
	})
}

export const updateBirthday=(params={})=>{
	return $request({
		url:'/user/updateBirthday',
		method:'POST',
		data:params.userVO
	})
}

export const updateArea=(params={})=>{
	return $request({
		url:'/user/updateArea',
		method:'POST',
		data:params.userVO
	})
}
