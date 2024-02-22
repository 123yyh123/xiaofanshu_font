import {$request} from '../utils/request.js'

export const searchNotesNearby=(params={})=>{
	return $request({
		url:'/search/notes/getNotesNearBy',
		method:'POST',
		data:params.pageParam
	})
}

export const searchNotesByKeyword=(params={})=>{
	return $request({
		url:'/search/notes/getNotesByKeyword?page='+params.page+'&pageSize='+params.pageSize+'&keyword='+params.keyword+'&notesType='+params.notesType+'&hot='+params.hot,
		method:'GET'
	})
}

export const searchUserByKeyword=(params={})=>{
	return $request({
		url:'/search/user/getUser?page='+params.page+'&pageSize='+params.pageSize+'&keyword='+params.keyword,
		method:'GET'
	})
}