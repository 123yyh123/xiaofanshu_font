import {$request} from '../utils/request.js'

export const resetPassword=(params={})=>{
	return $request({
		url:'/user/resetPassword?phoneNumber='+params.phoneNumber+'&password='+params.password+'&smsCode='params.smsCode,
		method:'POST'
	})
}
