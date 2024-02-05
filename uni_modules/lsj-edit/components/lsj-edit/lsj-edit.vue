<template>
	<view class="lsj-edit-container">
		<view class="lsj-edit-scrollview">
<!-- 			<view v-if="edit" class="lsj-edit-btns">
				<slot name="btns" :edit="edit"></slot>
			</view> -->
			<view class="editot-pd">
				<editor id="editor" ref="editot" class="lsj-edit-edit-container" 
				style="word-break: break-all;height: 250px;"
				:placeholder="placeholderText" 
				:readOnly="onreadOnly" 
				:showImgSize="showImgSize" 
				:showImgToolbar="showImgToolbar"
				:showImgResize="showImgResize" 
				@ready="onEditorReady" 
				@statuschange="statuschange" 
				@focus="editFocus"
				@blur="editBlur" 
				@input="onInput"></editor>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 插件详细使用方式可查看readme.md文档
	 */
	import {Edit} from './edit.js'
	export default {
		props: {
			// 最大输入字符数
			maxCount: {
				type: [Number,String],
				default: 0
			},
			// 占位符
			placeholder: {
				type: String,
				default: '开始输入...'
			},
			// 初始化html
			html: {
				type: String,
				default: ''
			},
			// 编辑器是否只读
			readOnly: {
				type: Boolean,
				default: false
			},
			showImgSize: {
				type: Boolean,
				default: true
			},
			showImgToolbar: {
				type: Boolean,
				default: true
			},
			showImgResize: {
				type: Boolean,
				default: true
			},
			styles: {
				type: Object,
				default:()=>{}
			}
		},
		watch: {
			html(h5) {
				if (this.edit) {
					this.edit.ready(this.html);
				}
			}
		},
		data() {
			return {
				minHeight: 300,
				edit: null,
				isFocus: false,
				onreadOnly: false,
			}
		},
		computed: {
			placeholderText() {
				return this.placeholder;
			}
		},
		mounted() {
			// #ifdef APP-PLUS
			setTimeout(()=>{
				// #ifdef APP-NVUE
				plus.webview.currentWebview().setStyle({
					softinputMode: 'adjustResize'
				});
				// #endif
				// #ifndef APP-NVUE
					this.$root.$scope.$getAppWebview().setStyle({
						softinputMode: 'adjustResize'
					});
				// #endif
			},300);
			// #endif
		},
		methods: {
			// 初始化
			onEditorReady(e) {
				uni.createSelectorQuery()
					.in(this)
					.select('#editor')
					.fields({
						size: true,
						context: true
					}, res => {
						this.edit = new Edit({context: res.context,maxCount: this.maxCount});
						this.edit.ready(this.html);

						this.$emit('onReady', this.edit);
						setTimeout(() => {
							this.edit.tool('blur');
						}, 400)

					})
					.exec();
			},
			// 输入回调处理
			onInput({
				detail={}
			}) {
				if (!detail.delta) {return;}
				this.edit.eventLink(detail);
			},
			// 状态变化监听并发送通知
			statuschange(e) {
				this.edit.statuschange(e);
			},
			// 焦点进入并发送通知
			editFocus(e) {
				this.isFocus = true
				this.edit.focus(e);
			},
			// 焦点离开并发送通知
			editBlur(e) {
				this.isFocus = false
				this.edit.blur(e);
				// uni.$emit('editorBlur', e);
			},
			// 弹出键盘
			keyboardShow() {
				console.log('keyboardShow')
				this.edit.upKeyboard()
			},
		}
	}
</script>

<style scoped lang="scss">
	/deep/ * {
		user-select: text;
		-webkit-user-select: text;
	}

	// /deep/ p{
	//   line-height: 80rpx !important;
	// }
	
	.lsj-edit-container {
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
		display: flex;
		flex-direction: column;
		overflow: hidden;
		// background-color: #CCCCCC;
	}
	.lsj-edit-scrollview {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.editot-pd {
		padding: 30rpx 20rpx 100rpx;
	}

	.lsj-edit-edit-container {
		flex: 1;
		font-size: 34rpx;
		/* #ifndef APP-NVUE */
		line-height: 160%;
		width: calc(100% - 12rpx);
		height: auto;
		margin: 0 auto;
		/* #endif */
		/* #ifdef APP-NVUE */
		width: 710rpx;
		/* #endif */
	}
	.keyHeight {
		display: inline-block;
		width: 100%;
	}

	/deep/ .ql-editor.ql-blank:before {
		font-style: normal;
		font-size: 16px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #A5A7B9;
	}
	editor {
		caret-color: #FF2442;
	}
</style>