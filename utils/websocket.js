import {
	baseUrl
} from '@/config'
import sqliteUtil from '../utils/sqliteUtil.js'
import {
	imageUrlToBase64
} from '../utils/util.js';
//是否已经连接上ws
let isOpenSocket = false
//心跳间隔，单位毫秒
let heartBeatDelay = 3000
let heartBeatInterval = null
//心跳时发送的消息文本
let heartBeatText = {
	from: uni.getStorageSync('userInfo').id,
	content: "ping",
	messageType: 1,
}
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
		console.log(res);
		let message = JSON.parse(res.data)
		console.log(message)
		// 聊天信息
		if (message.messageType === 3) {
			console.log('聊天信息')
			if (sqliteUtil.isOpen()) {
				console.log('数据库打开成功')
				let s = `select * from message_list where user_id='${message.from}'`
				sqliteUtil.SqlSelect(s).then(res => {
					console.log(res)
					imageUrlToBase64(message.fromAvatar).then(img => {
						if (res.length > 0) {
							let sql =
								`UPDATE message_list SET last_message='${message.content}', last_time=${message.time}, stranger=${message.friendType}, avatar_url='${img}', user_name='${message.fromName}', unread_num=unread_num+1 WHERE user_id='${message.from}'`;
							sqliteUtil.SqlExecute(sql).then(res => {
								setCornerMark()
							})
						} else {
							let sql =
								`INSERT INTO message_list (user_id, stranger, last_message, last_time, avatar_url, user_name, unread_num) VALUES ('${message.from}', ${message.friendType}, '${message.content}', ${message.time}, '${img}', '${message.fromName}', 1)`;
							sqliteUtil.SqlExecute(sql).then(res => {
								setCornerMark()
							})
						}
						uni.$emit('updateMessageList')
					})
				})
			}
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
		send(heartBeatText);
	}, heartBeatDelay)
}

function send(value) {
	if (ws.socketTask.readyState === 1) {
		ws.socketTask.send({
			data: JSON.stringify(value),
			success(res) {
				console.log("消息发送成功");
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

function setCornerMark(){
	// 获取消息列表的总未读数
	let s = `select sum(unread_num) as total from message_list`
	sqliteUtil.SqlSelect(s).then(res => {
		if(res[0].total>0){
			uni.setTabBarBadge({
				index:2,
				text: res[0].total>99?'99+':res[0].total.toString()
			})
			console.log(res[0].total)
		}else{
			uni.removeTabBarBadge({
				index:2
			})
		}
	})
}

module.exports = ws