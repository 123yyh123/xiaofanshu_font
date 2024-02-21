import {
	$request
} from '../utils/request.js'

export const sendBindPhoneSms = (params = {}) => {
	return $request({
		url: '/third/sendBindPhoneSms?phoneNumber=' + params.phoneNumber,
		method: 'GET'
	})
}

export const sendResetPhoneSms = (params = {}) => {
	return $request({
		url: '/third/sendResetPhoneSms?phoneNumber=' + params.phoneNumber,
		method: 'GET'
	})
}
export const sendRegisterPhoneSms = (params = {}) => {
	return $request({
		url: '/third/sendRegisterPhoneSms?phoneNumber=' + params.phoneNumber,
		method: 'GET'
	})
}

export const checkBindSmsCode = (params = {}) => {
	return $request({
		url: '/third/checkBindSmsCode?phoneNumber=' + params.phoneNumber + '&smsCode=' + params.smsCode,
		method: 'POST',
	})
}

export const checkResetSmsCode = (params = {}) => {
	return $request({
		url: '/third/checkResetSmsCode?phoneNumber=' + params.phoneNumber + '&smsCode=' + params.smsCode,
		method: 'POST'
	})
}