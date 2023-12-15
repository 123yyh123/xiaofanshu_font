import {$request} from '../utils/request.js'

export const sendBindPhoneSms=(params={})=>{
	return $request({
		url:'/third/sendBindPhoneSms?phoneNumber='+params.phoneNumber,
		method:'GET'
	})
}

export const sendResetPhoneSms=(params={})=>{
	return $request({
		url:'/third/sendResetPhoneSms?phoneNumber='+params.phoneNumber,
		method:'GET'
	})
}
export const sendRegisterPhoneSms=(params={})=>{
	return $request({
		url:'/third/sendRegisterPhoneSms?phoneNumber='+params.phoneNumber,
		method:'GET'
	})
}