import {
	Observer
} from './observer.js'

export class Edit extends Observer {
	#_DEFTEXT;
	constructor({context,maxCount}) {
		super();
		this.#_DEFTEXT = '######################################################NBLSJ######################################################';
		this.ctx = context;
		this.maxCount = maxCount;
		this.textCount = 0;
		this.overstep = false;
		this.timeoutArr = [];
		this.flagArr = [];
	}
	/**
	 * 撤销undo(),恢复redo(),清空内容clear(),清空当前选区样式removeFormat()
	 * 插入分割线insertDivider();
	 * 初始化html内容setContents({html}),设置文本insertText({text})
	 */
	tool(fn, arg = {}) {
		if (typeof(this.ctx[fn]) === 'function') {
			this.ctx[fn](arg);
		}
		return this;
	}


	// 设置初始html
	ready(html) {
		this.tool('setContents', {
			html
		})
	}
	
	// 设置字体相关 https://uniapp.dcloud.io/api/media/editor-context?id=editorcontextformat
	format(name, value) {
		this.ctx.format(name, value);
		return this;
	}

	/**
	 * 写入表情
	 */
	emoji(text) {
		this.tool('insertText', {text});
		return this; 
	}
	
	/**
	 * 写入链接
	 * {
		prefix: '#',
		suffix: '#',
		name:'name',
		data: {}
		}
	 */
	addLink({
		prefix = '',
		suffix = '',
		data = {},
		name
	}) {
		name = prefix + name + suffix;
		data['identification'] = name;
		// #ifdef APP-PLUS
		this.format('color','#ffffff')
		// #endif
		this.tool('insertText', {
			text: this.#_DEFTEXT
		})
		.tool('blur')
		.getContents()
		.then((e) => {
			let ops = e.delta.ops,arr = [];
			for (let i = 0; i < ops.length; i++) {
				let item = ops[i];
				if (!item.insert || typeof item.insert === 'object') {
					arr.push(item);
					continue;
				}
				let isNext = item.insert.indexOf(this.#_DEFTEXT);
				if (isNext > -1) {
					let newObj = {
						attributes: {
							"link": `https://app${this.queryParams(data)}`,
							"textDecoration": "none",
							"color": "#4569d7"
						},
						insert: name
					};
					
					if (item.attributes && item.attributes.link) {
						delete item.attributes;
					}
					let [textPrefix,textSuffix] = item.insert.split(this.#_DEFTEXT);
					arr.push({...item,insert: textPrefix});
					arr.push(newObj);
					arr.push({insert: ' '});
					if (textSuffix) {
						arr.push({...item,insert: textSuffix});
					}
					let remainingArr = ops.slice(i+1);
					arr = [...arr,...remainingArr];
					break;
				}
				else {
					arr.push(item);
				}
			}
			// let insertLen = name.length - this.#_DEFTEXT.length + n;
			this.ctx.setContents({
				delta: {
					ops:arr
				},
				// insertLen,
				complete:()=>{
					this.format('fontFamily', 'inherit')
					.input();
				}
			})
		})
		.catch(err => uni.showToast({
			title: '操作失败',
			icon: 'error'
		}));
		
		
	}

	/**
	 * 获取所有链接
	 */
	async getLink() {
		let {
			delta: {
				ops
			}
		} = await this.getContents();
		let arr = [];
		ops.forEach(item => {
			if (item.attributes && item.attributes.link) {
				arr.push(item.attributes.link);
			}
		});
		return arr;
	}
	
	/**
	 * 添加图片
	 * 如传入tempFilePaths则不再通过相册/相机选择
	 */
	addImage(tempFilePaths) {
		const handle = (filePaths)=> {
			filePaths.forEach(src => {
				this.tool('insertImage', {
						src: src,
						alt: 'IMAGE'
					})
					.tool('insertText', {
						text: "\n"
					})
			})
			this.tool('scrollIntoView')
			return this;
		}
		
		if (tempFilePaths) {
			return handle(tempFilePaths);
		}
		return uni.chooseImage({
			count: 9, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], //从相册选择
			success: (res) => {
				return handle(res.tempFilePaths);
			}
		});
	}
	
	/**
	 * 获取所有图片
	 */
	async getImages() {
		let {
			delta: {
				ops
			}
		} = await this.getContents();
		let arr = [];
		ops.forEach(item => {
			if (item.attributes && item.attributes.alt === 'IMAGE') {
				arr.push(item.insert.image.replace(/data:image\/png;base64,/, ''));
			}
		});
		return arr;
	}
	/**
	 * 替换图片
	 * @param {Function} fn 返回替换后图片地址
	 */
	async replaceImage(fn) {
		let res = await this.getContents();
		let cuops = JSON.stringify(res.delta.ops);
		let ops = res.delta.ops;

		for (let temp of ops) {
			if (typeof temp.insert === "object") {
				if ("image" in temp.insert) {
					let img = temp.insert.image;
					// 将本地图片路径替换为网络路径
					temp.insert.image = await fn(img);
				}
			}
		}

		if (cuops === JSON.stringify(ops)) {
			return res;
		}

		return await this.tool('setContents', {
			delta: {
				ops
			}
		}).getContents();
	}


	// 获取内容
	getContents() {
		return new Promise((resolve, reject) => {
			this.ctx.getContents({
				success: res => {
					resolve(res);
				}
			})
		})
	}
	
	// 光标进入并唤起键盘
	upKeyboard() {
		this.tool('blur').format('fontFamily', 'inherit')
		return this;
	}
	
	/**
	 * 监听输入框变化是否改变链接
	 */
	eventLink(detail) {
		if (!detail) {return;}
		let ops = detail.delta.ops || [];
		let jops = JSON.stringify(ops);
		if (jops.indexOf(this.#_DEFTEXT) > -1) {
			return;
		}
	
		let isSetContents = false;
		for (let i = 0, len = ops.length; i < len; i++) {
			let item = ops[i];
			let isLink = item.attributes && item.attributes.link;
			if (isLink) {
				let nextText = ops[i + 1].insert;
				if (nextText && (nextText.indexOf('\\n') ===0 || nextText.indexOf(' ') ===0)) {
					continue;
				}
				
				ops.splice(i, 1, {
					insert: ''
				}); 
				isSetContents = true;
				break;
			}
		}
		if (isSetContents) {
			this.tool('blur')
			this.ctx.setContents({
				delta: {ops},
				complete:()=>{
					this.input();
					// #ifdef APP-PLUS
					setTimeout(()=>{
						this.upKeyboard();
					},200)
					// #endif
				}
			})
		}
		else {
			this.input(detail);
		}
	
	}
	
	// 检查字数是否超出
	eventTextLenght(detail) {
		this.textCount = detail.text.length - 1;
		if (this.maxCount && this.textCount > this.maxCount) {
			return true;
		}
		return false
	}
	
	// 监听输入框变化
	async input(detail) {
		if (!detail) {detail = await this.getContents();}
		if (detail.text.indexOf(this.#_DEFTEXT) < 0) {
			this.overstep = this.eventTextLenght(detail)
			detail['overstep'] = this.overstep;
			this.$fire('edit:input', detail);
		}
	}
	// 监听样式变化
	statuschange({detail}) {
		if (detail.link) {
			this.ctx.blur();
			return;
		}
		this.debounce(()=> {
			this.$fire('edit:statuschange', detail);
		}, 100,false);
	}

	// 监听焦点进入
	focus({
		detail
	}) {
		this.debounce(()=> {
			this.input(detail);
		}, 100,false);
	}
	// 监听焦点离开
	blur({
		detail
	}) {
		this.debounce(()=> {
			this.$fire('edit:blur', detail);
		}, 100,false);
	}
	
	debounce(fn, time = 500, isImmediate = true, timeoutName = "default") {
		// 清除定时器
		if(!this.timeoutArr[timeoutName]) this.timeoutArr[timeoutName] = null;
		if (this.timeoutArr[timeoutName] !== null) clearTimeout(this.timeoutArr[timeoutName]);
		// 立即执行一次
		if (isImmediate) {
			var callNow = !this.timeoutArr[timeoutName];
			this.timeoutArr[timeoutName] = setTimeout(function() {
				this.timeoutArr[timeoutName] = null;
			}, time);
			if (callNow){
				if(typeof fn === 'function') fn();
			}
		} else {
			// 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时time毫秒后执行fn回调方法
			this.timeoutArr[timeoutName] = setTimeout(function() {
				if(typeof fn === 'function') fn();
			}, time);
		}
	}
	
	queryParamsReverse(locationhref) {
		let href = locationhref || "";
		let theRequest = new Object();
		let str = href.split("?")[1];
		if (str != undefined) {
			let strs = str.split("&");
			for (let i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
	
	queryParams(data = {}, isPrefix = true, arrayFormat = 'brackets') {
		let newData = JSON.parse(JSON.stringify(data));
		let prefix = isPrefix ? '?' : ''
		let _result = []
		if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';
		for (let key in newData) {
			let value = newData[key]
			// 去掉为空的参数
			if (['', undefined, null].indexOf(value) >= 0) {
				continue;
			}
			// 如果值为数组，另行处理
			if (value.constructor === Array) {
				// e.g. {ids: [1, 2, 3]}
				switch (arrayFormat) {
					case 'indices':
						// 结果: ids[0]=1&ids[1]=2&ids[2]=3
						for (let i = 0; i < value.length; i++) {
							_result.push(key + '[' + i + ']=' + value[i])
						}
						break;
					case 'brackets':
						// 结果: ids[]=1&ids[]=2&ids[]=3
						value.forEach(_value => {
							_result.push(key + '[]=' + _value)
						})
						break;
					case 'repeat':
						// 结果: ids=1&ids=2&ids=3
						value.forEach(_value => {
							_result.push(key + '=' + _value)
						})
						break;
					case 'comma':
						// 结果: ids=1,2,3
						let commaStr = "";
						value.forEach(_value => {
							commaStr += (commaStr ? "," : "") + _value;
						})
						_result.push(key + '=' + commaStr)
						break;
					default:
						value.forEach(_value => {
							_result.push(key + '[]=' + _value)
						})
				}
			} else {
				_result.push(key + '=' + value)
			}
		}
		return _result.length ? prefix + _result.join('&') : ''
	}
	
	
}