import {$request} from '../utils/request.js'

export const searchNotesNearby=(params={})=>{
	return $request({
		url:'/search/notes/getNotesNearBy',
		method:'POST',
		data:params.pageParam
	})
}