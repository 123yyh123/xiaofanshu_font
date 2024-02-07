import {$request} from '../utils/request.js'

export const addComment=(params={})=>{
	return $request({
		url:'/comment/addComment',
		method:'POST',
		data:params.commentVO
	})
}

export const getCommentCountByNotesId=(params={})=>{
	return $request({
		url:'/comment/getCommentCount?notesId='+params.notesId,
		method:'GET'
	})
}

export const getCommentFirstListByNotesId=(params={})=>{
	return $request({
		url:'/comment/getCommentFirstList?notesId='+params.notesId+'&page='+params.page+'&pageSize='+params.pageSize,
		method:'GET'
	})
}

export const getCommentSecondListByNotesId=(params={})=>{
	return $request({
		url:'/comment/getCommentSecondList?notesId='+params.notesId+'&parentId='+params.parentId+'&page='+params.page+'&pageSize='+params.pageSize,
		method:'GET'
	})
}

export const praiseOrCancelComment = (params={})=>{
	return $request({
		url:'/comment/praiseComment?commentId='+params.commentId+'&userId='+params.userId+'&targetUserId='+params.targetUserId,
		method:'POST'
	})
}