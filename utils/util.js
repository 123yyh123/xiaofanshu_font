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