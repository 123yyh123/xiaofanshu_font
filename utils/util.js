import {
	pathToBase64
} from '../js_sdk/mmmm-image-tools/index.js'
import {
	emojiList
} from './emojiUtil'
import {
	saveFile
} from './fileUtil.js'
export const timestampFormat = timespan => {
	var dateTime = new Date(timespan) // 将传进来的字符串或者毫秒转为标准时间
	return dateTimeFormat(dateTime)
}

export const stringDateFormat = params => {
	var fullDate = params.split(" ")[0].split("-");
	var fullTime = params.split(" ")[1].split(":");
	var dateTime = new Date(fullDate[0], fullDate[1] - 1, fullDate[2], (fullTime[0] != null ? fullTime[0] : 0), (
		fullTime[1] != null ? fullTime[1] : 0), (fullTime[2] != null ? fullTime[2] : 0));
	console.log(dateTime)
	return dateTimeFormat(dateTime)
}

function dateTimeFormat(dateTime) {
	var year = dateTime.getFullYear();
	var month = padZero(dateTime.getMonth() + 1); // 补零
	var day = padZero(dateTime.getDate()); // 补零
	var hour = padZero(dateTime.getHours()); // 补零
	var minute = padZero(dateTime.getMinutes()); // 补零
	var millisecond = dateTime.getTime(); // 将当前编辑的时间转换为毫秒
	var now = new Date(); // 获取本机当前的时间
	var nowNew = now.getTime(); // 将本机的时间转换为毫秒
	var milliseconds = 0;
	var timeSpanStr;

	milliseconds = nowNew - millisecond;

	if (milliseconds <= 1000 * 60 * 1) { // 小于一分钟展示为刚刚
		timeSpanStr = '刚刚';
	} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) { // 大于一分钟小于一小时展示为分钟
		timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
	} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) { // 大于一小时小于一天展示为小时
		timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
	} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) { // 大于一天小于十五天展示位天
		timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
	} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year === now.getFullYear()) {
		timeSpanStr = month + '-' + day;
	} else {
		timeSpanStr = year + '-' + month + '-' + day;
	}
	return timeSpanStr;
	// 补零函数
	function padZero(number) {
		return number < 10 ? '0' + number : number;
	}
}

export const imageUrlToBase64 = (url) => {
	return new Promise((resolve, reject) => {
		uni.getImageInfo({
			src: url,
			success: (res) => {
				pathToBase64(res.path).then((base64) => {
					resolve(base64)
				})
			}
		})
	})
}

function formatTime2(fmt, timestamp) {
	var date = new Date(timestamp) // 兼容safari
	var o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
		'q+': Math.floor((date.getMonth() + 3) / 3),
		'S': date.getMilliseconds()
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
		}
	}
	return fmt
}

// 星期格式转换 0-6：周日到周六
function weekFormat(e, prefix = "周") {
	switch (e) {
		case 0:
			return prefix + "日"
			break;
		case 1:
			return prefix + "一"
			break;
		case 2:
			return prefix + "二"
			break;
		case 3:
			return prefix + "三"
			break;
		case 4:
			return prefix + "四"
			break;
		case 5:
			return prefix + "五"
			break;
		case 6:
			return prefix + "六"
			break;
		default:
			return ""
			break;
	}
}
// 转换今日的时辰格式
function todayTimeFormat(e) {
	if (e >= 0 && e < 7) {
		return "凌晨"
	} else if (e >= 7 && e < 11) {
		return "上午"
	} else if (e >= 11 && e < 13) {
		return "中午"
	} else if (e >= 13 && e < 18) {
		return "下午"
	} else if (e >= 18 && e < 24) {
		return "晚上"
	} else {
		return ""
	}
}

// 是否显示周几
function isShowWeekDay(sub, weekDay) {
	const currentWeekDay = new Date().getDay()
	const dayTime = 1000 * 60 * 60 * 24
	// 1.当前时间与消息时间相差必须大于2天小于7天
	// 2.当前时间距离本周一相差必须大于2天且小于当前距离周一的天数
	// 3.消息时间不可能是0-周日，因为周日没有给后面时间留空间，不会走这里的逻辑，而是走今天的逻辑
	if (sub >= dayTime * 2 && weekDay !== 0 && sub <= dayTime * currentWeekDay) {
		return true
	} else {
		return false
	}
}


// 仿微信时间显示格式转换 @time 时间戳毫秒
export const weChatTimeFormat = (time) => {
	const today = new Date();
	const timeDate = new Date(time);

	// 获取当前时间的年月日时分秒
	const currentYear = today.getFullYear();
	const currentMonth = today.getMonth();
	const currentDay = today.getDate();
	const currentHour = today.getHours();
	const currentMinute = today.getMinutes();

	// 获取消息时间的年月日时分秒
	const messageYear = timeDate.getFullYear();
	const messageMonth = timeDate.getMonth();
	const messageDay = timeDate.getDate();
	const messageHour = timeDate.getHours();
	const messageMinute = timeDate.getMinutes();

	const subDays = currentDay - messageDay;

	if (currentYear > messageYear) {
		// 显示完整日期时间
		return `${formatTime2("yyyy年MM月dd日", timeDate)} ${todayTimeFormat(messageHour)} ${formatTime2("hh:mm", timeDate)}`;
	} else if (subDays === 0) {
		// 今天
		return `${todayTimeFormat(messageHour)} ${formatTime2("hh:mm", timeDate)}`;
	} else if (subDays === 1) {
		// 昨天
		return `昨天 ${formatTime2("hh:mm", timeDate)}`;
	} else if (subDays === 2) {
		// 前天
		return `前天 ${formatTime2("hh:mm", timeDate)}`;
	} else if (isShowWeekDay(subDays, timeDate.getDay())) {
		// 一周内，显示周几
		return `${weekFormat(timeDate.getDay())} ${formatTime2("hh:mm", timeDate)}`;
	} else if (currentYear === messageYear) {
		// 其他情况，显示日期和时间
		return `${formatTime2("MM月dd日", timeDate)} ${todayTimeFormat(messageHour)} ${formatTime2("hh:mm", timeDate)}`;
	}
}





// 1) 将字符串转换成驼峰写法
function toHump(str) {
	// 将字符串通过 下划线 拆分成多段 形成一个数组
	var strArr = str.split('_');

	// 将数组中每个元素的第一个字母修改成大写形式
	// charAt(0) 返回该元素的第一个字母 user -> u
	// substring(1) 将字符串从第一个字母开始截取 user -> ser
	for (let i = 1; i < strArr.length; i++) {
		strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
	}

	// 数组转换成字符串
	return strArr.join('');
}

// 2) 格式化数组中的对象
export const transData = (souceData) => {
	return souceData.map(item => {
		// 准备最后返回的对象
		let obj = {}

		Object.keys(item).forEach(key => {
			if (/\_(\w)/.test(key)) {
				// 如果需要转化 则进行驼峰转化
				let _key = toHump(key)
				obj[_key] = item[key]
			} else {
				// 如果不需要直接赋值
				obj[key] = item[key]
			}
		})
		return obj
	})
}

export const replaceImageTags = (message) => {
	// 正则表达式匹配<image>标签
	const imageTagRegex = /<img src='(.*?)' style='width: (\d+)px;height: (\d+)px;'><\/img>/g;
	// 使用replace函数进行替换
	return message.replace(imageTagRegex, function(match, src, width, height) {
		// 这里可以根据需要进行调整，例如将width和height应用到表情显示的样式中
		// return `[${getEmojiNameFromUrl(src)}XFS]`;
		let name = getEmojiNameFromUrl(src)
		if (name == '') {
			return '[图片]'
		}
		return `[${name}XFS]`;
	});
}

// 获取表情名称
function getEmojiNameFromUrl(url) {
	// 在这里根据url获取表情名称，你可能需要维护一个表情名称和url的映射关系
	const emoji = emojiList.find(item => item.url === url);
	return emoji ? emoji.name : '';
}


// 匹配对方发来的聊天消息中的图片标签，将src属性的值替换为本地路径
export const replaceImageMessage = (message) => {
	// 正则表达式匹配<img>标签
	const imageTagRegex = /<img src='(.*?)' style='width: (\d+)px;height: (\d+)px;'><\/img>/g;
	const promises = []; // 用于存储保存文件的Promise数组
	// 使用replace函数进行替换
	const replacedMessage = message.replace(imageTagRegex, function(match, src, width, height) {
		// 如果src是本地路径，则不进行替换
		if (src.indexOf('http') === -1) {
			return match;
		}
		// 保存文件，并将Promise加入数组
		const promise = saveFile(src)
			.then(localFilePath => {
				console.log(localFilePath);
				return `<img src='${localFilePath}' style='width: ${width}px;height: ${height}px;'></img>`;
			})
			.catch(error => {
				console.error(error);
				return match; // 如果保存失败，保持原样
			});
		promises.push(promise);
		return ''; // 将匹配的内容替换为空字符串，等待Promise完成后再进行拼接
	});

	// 使用Promise.all等待所有的异步操作完成
	return Promise.all(promises).then(results => {
		// 将替换后的内容和原始消息拼接起来
		return replacedMessage.replace(/$/, results.join(''));
	});
}