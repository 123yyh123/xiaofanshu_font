import {$request} from '../utils/request.js'

export const generalLogin=(params={})=>{
	return $request({
		url: '/auth/login?phoneNumber=' + params.phoneNumber+'&password='+params.password,
		method: 'POST'
	})
}

export const otherLogin=(params={})=>{
	return $request({
		url: '/auth/otherLogin?type='+params.type+'&code='+params.code,
		method: 'POST'
	})
}
	
export const bindNumberPhone=(params={})=>{
	return $request({
		url:'/auth/bindPhone',
		method:'POST',
		data:params.registerVo
	})
}