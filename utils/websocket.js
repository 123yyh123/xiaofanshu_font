import {
	baseUrl
} from '@/config'
import {
	saveFile
} from '../utils/fileUtil.js'
import sqliteUtil from '../utils/sqliteUtil.js'
import {
	imageUrlToBase64,
	replaceImageMessage,
	replaceImageTags,
	formatTimestamp
} from '../utils/util.js';
import {
	createAlarm
} from "@/utils/nativeMsg.js";
//是否已经连接上ws
let isOpenSocket = false
//心跳间隔，单位毫秒
let heartBeatDelay = 8000
let heartBeatInterval = null

//最大重连次数
let reconnectTimes = 10
let reconnectInterval = null
//重连间隔，单位毫秒
let reconnectDelay = 10000

let wsUrl = baseUrl + '/ws/xfs'

let socketTask = null

//这个参数是防止重连失败之后onClose方法会重复执行reconnect方法，导致重连定时器出问题
//连接并打开之后可重连，且只执行重连方法一次
let canReconnect = false

//封装的对象，最后以模块化向外暴露，
//init方法 初始化socketTask对象
//completeClose方法 完全将socketTask关闭（不重连）
//其他关于socketTask的方法与uniapp的socketTask api一致
let ws = {
	socketTask: null,
	init,
	send,
	completeClose,
	setCornerMark,
}
// 定时器，10秒内服务器未应答,没有将对应的消息定时器清除，将对应的消息状态设置为发送失败
let timer = {}

function init() {
	socketTask = uni.connectSocket({
		url: wsUrl,
		fail: (res) => {
			console.log(res);
		}
	})
	socketTask.onOpen(() => {
		clearInterval(heartBeatInterval);
		clearInterval(reconnectInterval);
		isOpenSocket = true;
		canReconnect = true;
		send({
			from: uni.getStorageSync('userInfo').id,
			messageType: 0,
		});
		heartBeat();
	})
	socketTask.onMessage((res) => {
		let message = JSON.parse(res.data)
		console.log(message)
		// 聊天信息
		if (message.messageType === 3) {
			console.log('聊天信息')
			if (sqliteUtil.isOpen()) {
				console.log('数据库打开成功')
				// 更新消息列表
				let s = `select * from message_list where user_id='${message.from}'`
				sqliteUtil.SqlSelect(s).then(res => {
					console.log(res)
					imageUrlToBase64(message.fromAvatar).then(img => {
						let con = replaceImageTags(message.content)
						if (message.chatType === 4) {
							con = '[语音]'
						}
						if (res.length > 0) {
							let sql =
								`UPDATE message_list SET last_message="${con}", last_time=${message.time}, stranger=${message.friendType}, avatar_url='${img}', user_name='${message.fromName}', unread_num=unread_num+1 WHERE user_id='${message.from}'`;
							sqliteUtil.SqlExecute(sql).then(res => {
								setCornerMark()
							})
						} else {
							let sql =
								`INSERT INTO message_list (user_id, stranger, last_message, last_time, avatar_url, user_name, unread_num) VALUES ('${message.from}', ${message.friendType}, "${con}", ${message.time}, '${img}', '${message.fromName}', 1)`;
							sqliteUtil.SqlExecute(sql).then(res => {
								setCornerMark()
							})
						}
						uni.$emit('updateMessageList')
					})
				})
				// 更新聊天记录，先判断是否存在与该用户的聊天记录表，如果不存在则创建
				let s2 = `create table if not exists chat_${message.from} (
				id integer primary key autoincrement, 
				from_id text, 
				to_id text, 
				content text, 
				time integer, 
				chat_type integer, 
				is_read integer,
				is_send integer,
				audio_time integer);`
				replaceImageMessage(message.content).then(res => {
					message.content = res
					console.log(message.content)
					sqliteUtil.SqlExecute(s2).then(res => {
						// 插入聊天记录
						let sql =
							`INSERT INTO chat_${message.from} (from_id, to_id, content, time, chat_type,is_read, is_send,audio_time) VALUES ('${message.from}', '${message.to}', "${message.content}", ${message.time}, ${message.chatType},0,1,${message.audioTime})`
						sqliteUtil.SqlExecute(sql).then(res => {
							console.log('插入聊天记录成功')
							uni.$emit('updateChatRecord')
						})
					})
				})
				let alarmId = Date.now()
				let msg = {
					alarmId: alarmId,
					warningTypeStr: message.fromName,
					projectName: formatTimestamp(message.time),
					description: message.content,
				};
				createAlarm(msg, res => {
					if (res.type === 'click') {
						uni.navigateTo({
							url: `/pages/chat/chat?friendId=${message.from}&friendName=${message.fromName}&friendAvatar=${message.fromAvatar}`
						})
					}
				})
			}
		}
		// 服务器应答
		if (message.messageType === 5) {
			console.log('服务器应答')
			if (sqliteUtil.isOpen()) {
				// 0代表发送中，1代表发送成功，2代表发送失败
				// 0未读，1已读
				let status = 1
				if (message.content) {
					status = 2
				}
				message.status = status
				// 清除定时器
				clearTimeout(timer['time' + message.to + message.id])
				// 更新聊天记录
				let sql =
					`UPDATE chat_${message.to} SET is_send=${status} WHERE id=${message.id} and from_id='${message.from}' and to_id='${message.to}'`
				sqliteUtil.SqlExecute(sql).then(res => {
					console.log('更新聊天记录成功')
					uni.$emit('updateMsgStatus', message)
				})
			}
		}
		// 鉴权失败
		if (message.messageType === 6) {
			console.log('鉴权失败')
			uni.showToast({
				title: message.content == null ? '登录状态失效，请重新登录' : message.content,
				icon: 'none',
				duration: 1000,
				mask: true
			})
			uni.removeStorageSync('userInfo')
			uni.removeStorageSync('token')
			completeClose()
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}, 1000)
		}
	})
	socketTask.onClose(() => {
		isOpenSocket = false;
		if (canReconnect) {
			reconnect();
			canReconnect = false;
		}
	})
	ws.socketTask = socketTask;
}


function heartBeat() {
	heartBeatInterval = setInterval(() => {
		let heartBeatText = {
			from: uni.getStorageSync('userInfo').id,
			content: uni.getStorageSync('token'),
			messageType: 1,
		}
		send(heartBeatText);
	}, heartBeatDelay)
}

function send(value) {
	if (value.messageType === 3) {
		timer['time' + value.to + value.id] = setTimeout(() => {
			console.log('发送超时')
			if (sqliteUtil.isOpen()) {
				let sql =
					`UPDATE chat_${value.to} SET is_send=2 WHERE id=${value.id} and from_id='${value.from}' and to_id='${value.to}'`
				sqliteUtil.SqlExecute(sql).then(res => {
					console.log('更新消息状态成功')
					value.status = 2
					value.content = '发送失败'
					uni.$emit('updateMsgStatus', value)
				})
			}
		}, 10000)
	}
	if (ws.socketTask.readyState === 1) {
		ws.socketTask.send({
			data: JSON.stringify(value),
			success(res) {
				// console.log("消息发送成功");
				return true;
			},
			fail() {
				console.log("消息发送失败");
				completeClose();
				init();
				return false;
			}
		});
	} else {
		console.log("WebSocket 连接已关闭，无法发送消息");
		completeClose();
		init();
		// 观察10次，如果10次都没有连接成功，则不再发送消息
		let count = 0;
		// 每1秒观察一次是否连接成功，连接成功后发送消息
		let interval = setInterval(() => {
			if (count >= 10) {
				clearInterval(interval)
				return false;
			}
			console.log('连接状态：' + ws.socketTask.readyState)
			if (ws.socketTask.readyState === 1) {
				ws.socketTask.send({
					data: JSON.stringify(value),
					success(res) {
						// console.log("消息发送成功");
						clearInterval(interval)
						return true;
					},
					fail() {
						console.log("消息发送失败");
						completeClose();
						init();
						return false;
					}
				});
			}
			count++
		}, 1000)
		return false;
	}
}

function reconnect() {
	//停止发送心跳
	//如果不是人为关闭的话，进行重连
	if (!isOpenSocket) {
		completeClose();
		let count = 0;
		reconnectInterval = setInterval(() => {
			console.log("正在尝试重连")
			init();
			count++
			if (count >= reconnectTimes) {
				clearInterval(reconnectInterval)
				console.log("网络异常或服务器错误")
			}
		}, reconnectDelay)
	}
}

function completeClose() {
	console.log("关闭连接")
	clearInterval(heartBeatInterval);
	clearInterval(reconnectInterval);
	canReconnect = false;
	ws.socketTask = null;
	if (ws.socketTask) {
		ws.socketTask.close();
	}
}

function setCornerMark() {
	// 获取消息列表的总未读数
	let s = `select sum(unread_num) as total from message_list`
	sqliteUtil.SqlSelect(s).then(res => {
		if (res[0].total > 0) {
			uni.setTabBarBadge({
				index: 2,
				text: res[0].total > 99 ? '99+' : res[0].total.toString()
			})
			console.log(res[0].total)
		} else {
			uni.removeTabBarBadge({
				index: 2
			})
		}
	})
}

module.exports = ws