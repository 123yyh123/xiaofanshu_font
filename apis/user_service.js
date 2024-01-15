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

export const getAttentionList=(params={})=>{
	return $request({
		url:'/user/relation/attentionList?userId='+params.userId+'&pageNum='+params.pageNum+'&pageSize='+params.pageSize,
		method:'GET'
	})
}
export const getFansList=(params={})=>{
	return $request({
		url:'/user/relation/fansList?userId='+params.userId+'&pageNum='+params.pageNum+'&pageSize='+params.pageSize,
		method:'GET'
	})
}

export const updateAttention=(params={})=>{
	return $request({
		url:'/user/relation/attention?userId='+params.userId+'&targetUserId='+params.targetUserId,
		method:'POST'
	})
}

export const updateRemarkName=(params={})=>{
	return $request({
		url:'/user/relation/updateRemarkName?userId='+params.userId+'&targetUserId='+params.targetUserId+'&remarkName='+params.remarkName,
		method:'POST'
	})
}
