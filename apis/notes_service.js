import {$request} from '../utils/request.js'

export const addNote=(params={})=>{
	return $request({
		url:'/notes/publish',
		method:'POST',
		data:params.notesVO
	})
}