# lsj-edit

### 插件地址：https://ext.dcloud.net.cn/plugin?name=lsj-edit
若能帮到你请不要手软点亮5颗星~
------

## 使用组件前必读
- 此组件是对editor组件二次封装，增加了类似微信的@谁来看 和 类似微博的插入#话题等功能
- 如希望插入话题或@后光标不指向最后而指向话题后面，需要在editor组件源码加入一段代码，需要可以加Q群发你
- 为了方便大家更换按钮控件，我将控制器按钮和编辑器画布拆分成了两个组件
- 你完全可以自定义编辑器，所有功能都封装到了edit类，方便各位调用,[查看Edit详细文档](#p1)
- 因为比较懒，只测试了H5和App端，其他端懒得测了，如果遇到问题可以群里Q我
------
# 划重点！！！
如果你希望自定义编辑器，Edit类实例的方法和事件机制你需要了解,具体查看示例项目或[查看Edit详细文档](#p1)
------

## 基本使用

### lsj-edit组件属性与事件绑定

| 属性			| 是否必填	|  值类型	| 默认值/返回值		| 说明								|
| --------- 	| -------- 	| -----: 	| --: 				| :------------:					|
| html			|	否 		| String	|-					| 初始化时加载的html，例如加载草稿		|
| placeholder	|	否 		| String	|开始输入			| 编辑器提示信息						|
| maxCount		|	否 		| Number	|0					| 最大输入字数，含空格和符号，超出最大限制时Edit返回overstep：true			|
| readOnly		|	否 		| Boolean	|false				| 编辑器是否只读						|
| styles		|	否 		| Object	|-					| 编辑器自定义样式					|
| showImgSize	|	否 		| Boolean	|true				| 点击图片时显示图片大小控件			|
| showImgToolbar|	否 		| Boolean	|true				| 点击图片时显示工具栏控件				|
| showImgResize	|	否 		| Boolean	|true				| 点击图片时显示修改尺寸控件			|
| @onReady		|	否 		| Function	|[Class] Edit		| 编辑器初始化完成触发回调，返回edit实例对象|

### 附带的按钮edit-btns组件属性与事件绑定

| 属性			| 是否必填	|  值类型		| 默认值/返回值		| 说明								|
| --------- 	| -------- 	| -----: 		| --: 				| :------------:					|
| edit			|	是 		| [Class] Edit	|-					| 将edit对象传入和使用				|
| color			|	否 		| String		|#999999			| Tab栏字体默认颜色					|
| selectedColor	|	否 		| String		|#00aaff			| Tab栏字体选中颜色					|
| fontColor		|	否 		| Array			|Array				| 字体常用颜色数组					|
| bgColor		|	否 		| Array			|Array				| 字体常用背景色数组					|
| tabs			|	否 		| Array			|#、@				| Tab栏是否需要显示#和@				|
| emojiList		|	否 		| Array			|true				| emoji列表							|
| @click		|	否 		| Function		|Object {name,index}| 点击Tab栏时回调						|
| @submit		|	否 		| Function		|Class Edit			| 点击Tab栏右侧提交按钮时回调			|


### VUE 
```html
<lsj-edit 
ref="lsjEdit" 
placeholder="输入正文"
:maxCount="200"
@onReady="editReady">
	<template v-slot:btns="data">
		<edit-btns 
		:edit="data.edit" 
		@click="onTabClick" 
		@submit="save"></edit-btns>
	</template>
</lsj-edit>
```

### JS
```javascript
import editBtns from '@/uni_modules/lsj-edit/components/lsj-edit/edit-btns/edit-btns.vue';
export default {
	components:{
		// 富文本基本操作按键，可自行选择是否使用示例的按键
		editBtns
	},
	data() {
		return {
			edit: null
		}
	},
	methods: {
		// 编辑器初始化完毕，返回edit对象
		editReady(edit) {
			// 将富文本对象存放到当前页面，便于后续直接操作
			this.edit = edit;
		},
		// 演示----按钮组件点击事件
		onTabClick({name,index}) {
			switch (index){
				// 插入#话题#
				case 0:
					this.addLink();
					break;
				// @某人
				case 1:
					this.addLink2();
					break;
				default:
					break;
			}
		},
		// 演示发布
		async save() {
			// 获取插入的图片列表
			let imgs = await this.edit.getImages()
			// 判断是否允许提交
			if (!this.edit.textCount && !imgs.length) {
				uni.showToast({
					title: '请录入内容'
				});
			}
				
			// 将所有未上传的本地图片上传到服务器并替换到编辑器
			this.edit.replaceImage(async(img)=>{
				// 已上传的无需再上传
				// 这里没有放到edit内部去过滤，因为我觉得需不需要上传得你自己决定
				// 比如插入的base64图片是否需要上传
				// img.indexOf('http') = 0说明这个图片已经是网络地址，无需替换就直接跳过
				if(img.indexOf('http') === 0) {return img;}
				
				// 上传并替换图片
				/* 
					let {data} = await uni.uploadFile({
						url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
						filePath: img, //本地图片
						name: 'file',
						formData: {
							'user': 'test'
						}
					});
					return data;
				 */
				
				// 因为演示的时候没有服务器，所以直接换个网络图方便后续演示，
				// 实际项目应使用上方注释内容
				return 'https://t7.baidu.com/it/u=3406125714,2513313326&fm=193&f=GIF'
				
			}).then(res=>{
				console.log('替换完成,最终内容为',JSON.stringify(res));
				
				// 示例项目可查看解析富文本演示
				uni.navigateTo({
					url: '/pages/article/article?data='+escape(res.html)
				});
			});	
				
		},
		// 插入话题示例
		addLink() {
			this.edit.addLink({
				prefix: '#',
				suffix: '#',
				name: '有问题欢迎加入LSJ插件交流群',
				data: {
					name: 'QQ交流群',
					qqGroupChatID: '667530868',
				}
			})
		},
		// @某人示例
		addLink2() {
			this.edit.addLink({
				prefix: '@',
				name: '马冬梅',
				data: {
					userId: 10,
				}
			})
		}
	}
}
```


# <a id="p1">Edit类实例的方法和事件机制</a>

## Edit实例方法

### tool
*  调用editorContext对象的事件，如撤销undo,恢复redo,清空内容clear,失焦blur等
*  调用方式：edit.tool('blur')

| 参数			| 说明										|
| --------- 	| --------------------						|
| name			| editorContext对象的事件名称，如撤销undo,恢复redo,清空内容clear等	|
| value			| editorContext事件参数，如初始化html内容edit.tool('setContents',{html}),设置文本edit.tool('insertText',{text})	|


### format
*  修改样式,支持的值可查看[editorContext format](https://uniapp.dcloud.net.cn/api/media/editor-context.html#)
*  调用方式：edit.format('color','#999999')

| 参数			| 说明										|
| --------- 	| --------------------						|
| name			| 属性	|
| value			| 值	|


### getContents
*  获取编辑器内容,返回Promise.resolve
*  调用方式：await edit.getContents()


### upKeyboard
*  使光标进入编辑器并唤起键盘
*  调用方式：edit.upKeyboard()


### emoji
*  插入emoji表情
*  调用方式：edit.emoji('😀')

| 参数			| 说明										|
| --------- 	| --------------------						|
| emojiText		| emoji字体									|


### addLink
*  插入带参数的链接，如插入#话题或@谁
*  调用方式：edit.addLink(Object)

| 参数		| 必填	| 说明										|
| --------- | ---	| --------------------						|
| prefix	| 否	| 在插入的内容前面添加一串字符，例如@谁			|
| suffix	| 否	| 在插入的内容后面添加一串字符，例如 #话题#的 #号|
| name		| 是	| 插入的字符串								|
| data		| 否	| 链接附带的参数，用于解析后点击该链接返回		|


### getLink
*  获取编辑器内添加的所有链接
*  调用方式：edit.getLink()


### addImage
*  通过相册/相机选择图片并添加到编辑器中，此时图片是本地路径，在发布前应将图片上传，具体可查看示例项目index.vue提交事件示例;
*  调用方式：edit.addImage(tempFilePaths)

| 参数			|类型 	| 必填	| 说明										|
| --------- 	|---	| ---	| --------------------						|
| tempFilePaths	|Array	| 否	| 不传参数时调起相册/相机选择，传入图片数组时直接插入	|


### getImages
*  获取编辑器内添加的所有图片
*  调用方式：edit.getImages()


### replaceImage
*  替换图片，编辑器内每个图片都会触发传入的fn,根据需要可自行替换成新的图片地址，用于将本地图片上传到服务器
*  必须传入Function，且必须return一个图片地址
*  调用方式：edit.replaceImage(fn)

| 参数		|类型 		| 必填	| 说明										|
| --------- |---		| ---	| --------------------						|
| fn		|Function	| 是	| return的图片地址将替换之前的图片				|

``` javascript
// 提交前将所有未上传的本地图片上传到服务器并替换到编辑器
edit.replaceImage(async(img)=>{
	// 已上传的无需再上传
	// 这里没有放到edit内部去过滤，因为我觉得需不需要替换得你自己决定
	// 比如插入的base64图片是否需要上传
	// img.indexOf('http') = 0说明这个图片已经是网络地址，就跳过
	if(img.indexOf('http') === 0) {return img;}
	
	// 上传并替换图片
	let {data} = await uni.uploadFile({
		url: 'https://www.example.com/upload', //仅为示例，非真实的接口地址
		filePath: img, //本地图片
		name: 'file',
		formData: {
			'user': 'test'
		}
	});
	return data;
	
}).then(res=>{
	console.log('所有图片替换完成,返回最新的detail',JSON.stringify(res));
});	
```


--------

## 事件机制
*  Edit为您设计了观察者模式，您可以在需要的地方注册和发送事件

### $fire(eventName,any)
*  发送事件
*  示例：
``` javascript
edit.$fire('edit:focus', detail);
```

### $on([eventName, callback])
*  注册事件
*  示例：
``` javascript
edit.$on('edit:focus',(e)=> {
	console.log('监听光标进入',e);
})
```

### $off([eventName, callback])
*  移除某个注册的事件
*  示例：
``` javascript
edit.$off('edit:focus', (e)=> {
	console.log('监听光标进入',e);
});
```

### Edit内置的事件
*  只需在需要的地方注册即会自动在对应的时机触发

| 事件				| 说明										|
| --------------	| --------------------						|
| edit:input		| 编辑器内输入或删除内容时触发					|
| edit:statuschange	| 光标所指向的内容样式变化时触发，返回当前样式	|
| edit:focus		| 焦点进入时触发								|
| edit:blur			| 焦点离开时触发								|




## 温馨提示
0. 如说明表达还不够清楚，不清楚怎么使用可导入完整示例项目运行体验和查看	
4. 欢迎加入QQ讨论群：701468256(已满)
5. 欢迎加入QQ讨论群：469580165(已满)
6. 欢迎加入QQ讨论群：667530868
7. 若能帮到你还请点亮5颗小星星以作鼓励哈~
8. 若能帮到你还请点亮5颗小星星以作鼓励哈~
9. 若能帮到你还请点亮5颗小星星以作鼓励哈~