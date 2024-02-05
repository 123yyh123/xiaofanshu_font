import {$request} from '../utils/request.js'

export const addComment=(params={})=>{
	return $request({
		url:'/comment/addComment',
		method:'POST',
		data:params.commentVO
	})
}