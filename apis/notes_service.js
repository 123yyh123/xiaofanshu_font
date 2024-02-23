import {
	$request
} from '../utils/request.js'

export const addNote = (params = {}) => {
	return $request({
		url: '/notes/publish',
		method: 'POST',
		data: params.notesVO
	})
}

export const getLastNotesByPage = (params = {}) => {
	return $request({
		url: '/notes/getLastNotesByPage?page=' + params.page + '&pageSize=' + params.pageSize,
		method: 'GET'
	})
}

export const getAttentionUserNotes = (params = {}) => {
	return $request({
		url: '/notes/getAttentionUserNotes?page=' + params.page + '&pageSize=' + params.pageSize,
		method: 'GET',
	})
}

export const getNotesByUserId = (params = {}) => {
	return $request({
		url: '/notes/getNotesByUserId?page=' + params.page + '&pageSize=' + params.pageSize +
			'&authority=' + params.authority + '&type=' + params.type,
		method: 'GET'
	})
}

export const getNotesByView = (params = {}) => {
	return $request({
		url: '/notes/getNotesByView?page=' + params.page + '&pageSize=' + params.pageSize + '&type=' +
			params.type + '&userId=' + params.userId,
		method: 'GET',
	})
}

export const getNotesByNotesId = (params = {}) => {
	return $request({
		url: '/notes/getNotesByNotesId?notesId=' + params.notesId,
		method: 'GET'
	})
}

export const praiseOrCancelNotes = (params = {}) => {
	return $request({
		url: '/notes/praiseNotes?notesId=' + params.notesId + '&userId=' + params.userId +
			'&targetUserId=' + params.targetUserId,
		method: 'POST'
	})
}

export const collectOrCancelNotes = (params = {}) => {
	return $request({
		url: '/notes/collectNotes?notesId=' + params.notesId + '&userId=' + params.userId +
			'&targetUserId=' + params.targetUserId,
		method: 'POST'
	})
}

export const updateNotesViewCount = (params = {}) => {
	return $request({
		url: '/notes/viewNotes?notesId=' + params.notesId,
		method: 'POST'
	})
}

export const getNotesCountByUserId = (params = {}) => {
	return $request({
		url: '/notes/getAllNotesCountAndPraiseCountAndCollectCount',
		method: 'GET'
	})
}

export const getNotesCategoryList=()=>{
	return $request({
		url:'/notes/category/getNotesCategoryList',
		method:'GET'
	})
}