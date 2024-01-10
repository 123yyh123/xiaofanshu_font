import {
	pathToBase64
} from '../js_sdk/mmmm-image-tools/index.js'
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
	const today = new Date().getTime()
	// 当前时间减去获取到的时间
	const sub = today - time
	const day = 1000 * 60 * 60 * 24
	const timeDate = new Date(time)
	const currentYear = new Date().getFullYear()
	const getYear = new Date(time).getFullYear()
	const HHmm = `${formatTime2("hh", timeDate)}:${formatTime2("mm", timeDate)}`
	const showWeekDay = isShowWeekDay(sub, timeDate.getDay())
	if (currentYear > getYear) {
		return `${formatTime2("yyyy年MM月dd日", timeDate)} ${todayTimeFormat(timeDate.getHours())} ${formatTime2("hh:mm", timeDate)}`
	} else if (showWeekDay) {
		return `${weekFormat(timeDate.getDay())} ${HHmm}`
	} else if (sub > day && sub < day * 2) {
		return `昨天 ${HHmm}`
	} else if (sub <= day) {
		return HHmm
	} else {
		return `${formatTime2("MM月dd日", timeDate)} ${todayTimeFormat(timeDate.getHours())} ${formatTime2("hh:mm", timeDate)}`
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
export const transData=(souceData)=>{
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
