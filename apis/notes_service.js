import {$request} from '../utils/request.js'

export const addNote=(params={})=>{
	return $request({
		url:'/notes/publish',
		method:'POST',
		data:params.notesVO
	})
}

export const getLastNotesByPage=(params={})=>{
	return $request({
		url:'/notes/getLastNotesByPage?page='+params.page+'&pageSize='+params.pageSize,
		method:'GET'
	})
}

export const getNotesByUserId=(params={})=>{
	return $request({
		url:'/notes/getNotesByUserId?page='+params.page+'&pageSize='+params.pageSize+'&authority='+params.authority+'&type='+params.type,
		method:'GET'
	})
}