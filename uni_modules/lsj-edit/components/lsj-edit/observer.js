/**
 * 观察者
 */
export class Observer {
	#messages;
	constructor(e) {
		this.#messages = {};
	}
	
	// 发布信息
	$fire(type,detail={}) {
		if(!this.#messages[type]) {return;}
		let len = this.#messages[type].length;
		for (let i = 0;i < len; i++) {
			this.#messages[type][i].call(this,{type,detail});
		}
	}
	// 注册信息
	$on(type,fn) {
		if (this.#messages[type] && typeof fn === 'function') { 
			this.#messages[type].push(fn);
			return;
		}
		this.#messages[type] = [fn];
	}
	// 移除信息
	$off(type,fn) {
		if (this.#messages[type] instanceof Array){
			let i = this.#messages[type].length - 1;
			for(;i>=0;i--) {
				this.#messages[type][i] === fn && 
				this.#messages[type].splice(i,1);
			}
		}
	}
}