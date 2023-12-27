import {
	baseUrl
} from '../config/index.js'
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
let reconnectDelay = 3000

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
	completeClose
}

function init() {
	completeClose(); // 关闭之前的连接
	socketTask = uni.connectSocket({
		url: wsUrl,
		complete: () => {}
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
	console.log(value)
	if (ws.socketTask.readyState === 1) {
		ws.socketTask.send({
			data: JSON.stringify(value),
			success() {
				console.log("消息发送成功");
			},
			fail() {
				console.log("消息发送失败");
				completeClose();
			}
		});
	} else {
		console.log("WebSocket 连接已关闭，无法发送消息");
		completeClose();
	}
}

function reconnect() {
	//停止发送心跳
	clearInterval(heartBeatInterval)
	//如果不是人为关闭的话，进行重连
	if (!isOpenSocket) {
		let count = 0;
		reconnectInterval = setInterval(() => {
			console.log("正在尝试重连")
			init();
			count++
			//重连一定次数后就不再重连
			if (count >= reconnectTimes) {
				clearInterval(reconnectInterval)
				console.log("网络异常或服务器错误")
			}
		}, reconnectDelay)
	}
}

function completeClose() {
	clearInterval(heartBeatInterval);
	clearInterval(reconnectInterval);
	canReconnect = false;
	if (ws.socketTask) {
		ws.socketTask.close();
	}
}

module.exports = ws