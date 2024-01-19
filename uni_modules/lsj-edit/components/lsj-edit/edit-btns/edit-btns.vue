<template>
	<view class="btnszw" :style="[{height: getBtnHeight}]">
		<view ref="editBtns" class="edit-btns">
			<view class="btns">
				<view class="btns_left flex-1">
					<view v-for="(item,index) in getTabs" class="icon" :class="[item.icon]"
						:style="[{color:item.name==tab?selectedColor:color}]" @click="clickTab(item,index)">
					</view>
				</view>
				<view class="btns_right" @click="onSubmit">
					<text class="icon lsj-icon lsj-icon-tijiaoqueren defc"></text>
				</view>
			</view>
			
			
			<view v-show="tab=='editor'" class="fcolor">
				<view class="fcolor__title">
					<view v-for="(ct,cti) in editorTitles" class="l-margin-right-40"
						:style="[{'color': styleTab === ct.value ? selectedColor : '#999'}]"
						@click="clickTitleCell(ct.value)">
						<text>{{ ct.text }}</text>
					</view>
				</view>
				<view v-show="styleTab==='color'" class="fcolor_card flex-center l-p-20">
					<view class="flex-1">
						<scroll-view class="fcolor_list scroll" scrollX :showScrollbar="false">
							<view v-for="(c,ci) in fontColor" :key="ci" class="scroll__cell"
								:style="[{backgroundColor: c}]" :class="[{'boxs':statusObj.color ==c.toLowerCase()}]"
								@click="clickColor(c,'color')"></view>
						</scroll-view>
					</view>
					<view class="fcolor_right">
						<colorBtn @change="selectFontColor($event,'color')" />
					</view>
				</view>
				<view v-show="styleTab==='background'" class="fcolor_card flex-center l-p-20">
					<view class="flex-1">
						<scroll-view class="fcolor_list scroll" scrollX :showScrollbar="false">
							<view class="scroll__cell bg-node lsj-icon lsj-icon-touming"></view>
							<view v-for="(c,ci) in bgColor" :key="ci" class="scroll__cell"
								:style="[{backgroundColor: c}]"
								:class="[{'boxs':statusObj.backgroundColor ==c.toLowerCase()}]"
								@click="clickColor(c,'backgroundColor')"></view>
						</scroll-view>
					</view>
					<view class="fcolor_right">
						<colorBtn :color="{r: 241, g: 241,b: 241,a: 1}" @change="selectFontColor($event,'backgroundColor')" />
					</view>
				</view>
				<view v-show="styleTab==='typeface'" class="fcolor_card typeface">
					<view class="zt flex-start">
						<view v-for="(zt,zi) in fontZT" :key="zi" @click="fontCell_Click(zt)">
							<text class="icon lsj-icon defc" :class="[zt.icon]"
								:style="[{color: (statusObj.hasOwnProperty(zt.name) && statusObj[zt.name] == zt.checkID) ? selectedColor : defc}]"></text>
						</view>
					</view>
					<view class="zh flex">
						<view class="zh_title">字号</view>
						<view class="flex-1">
							<slider v-model="fontsize" min="10" max="50" showValue activeColor="#00aaff"
								backgroundColor="#d8d8d8" blockColor="#008bd1" blockSize="20"
								@change="fontSliderChange" />
						</view>
						<view class="flex__tabs font_right">
							<view class="l-margin-left-30" @click="fontSetSize()">
								<text class="icon lsj-icon lsj-icon-zihao- defc b1"></text>
							</view>
							<view class="l-margin-left-30" @click="fontSetSize(true)">
								<text class="icon lsj-icon lsj-icon-zihao defc b1"></text>
							</view>
						</view>
					</view>
				</view>
				<view v-show="styleTab==='format'" class="fcolor_card flex__tabs gs">
					<view v-for="(gs,gi) in fontGS" :key="gi" class="gs_cell" @click="fontCell_Click(gs)">
						<text class="icon lsj-icon defc" :class="[gs.icon]"
							:style="[{color: (statusObj.hasOwnProperty(gs.name) && statusObj[gs.name] == gs.checkID) ? selectedColor : defc}]"></text>
					</view>
				</view>
				
			</view>
			
			
			<view v-show="tab" class="content">
				<view v-show="tab=='emoji'" class="emoji">
					<scroll-view class="emoji__scroll" scrollY="true">
						<view v-for="(item, index) in emojiList" :key="index" hoverClass="opacity-hover"
							class="emoji__scroll_item" @click="edit.emoji(item)">
							<text class="emoji__scroll_item">{{ item }}</text>
						</view>
						<view class="emoji__scroll_item">
							<text style="opacity: 0;">-</text>
						</view>
					</scroll-view>
				</view>
			</view>
			<view v-if="edit.maxCount" class="suffix">
				<text class="suffix_textCount" :class="[{suffix_err: edit.textCount > edit.maxCount}]">{{edit.textCount}}</text>
				/
				<text>{{edit.maxCount}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 富文本编辑器附带的按钮示例组件
	 * 其中颜色选择器在插件市场找了一个比较好用的，t-color-picker插件地址：https://ext.dcloud.net.cn/plugin?id=412
	 */
	import colorBtn from './color/color.vue'
	import props from './mixins/props.js'
	import font from './mixins/font.js'
	export default {
		components: {
			colorBtn
		},
		mixins:[props,font],
		data() {
			return {
				tab: '',
				defc: '#545454',
				btnHeight: 50,
				styleTab: 'color',
				editorTitles: [{
					text: '文字颜色',
					value: 'color'
				}, {
					text: '文字背景',
					value: 'background'
				}, {
					text: '字体',
					value: 'typeface'
				}, {
					text: '格式',
					value: 'format'
				}],
				keysHeight: 0,
				statusHeight: 0
			}
		},
		computed: {
			getTabs() {
				const DEFTAB = [{
						name: 'image',
						icon: 'lsj-icon lsj-icon-tupian'
					},
					{
						name: 'emoji',
						icon: 'lsj-icon lsj-icon-biaoqing'
					},
					{
						name: 'editor',
						icon: 'lsj-icon lsj-icon-ziti'
					},
					{
						name: 'undo',
						icon: 'lsj-icon lsj-icon-a-texteditorback-line'
					},
					{
						name: 'redo',
						icon: 'lsj-icon lsj-icon-a-texteditorforward-line'
					}
				];
				return [...this.tabs, ...DEFTAB];
			},
			getBtnHeight() {
				return this.btnHeight + 'px'; 
			}
		},
		created() {
			this.getAppStatusHeight();
			// 监听焦点进入
			this.edit.$on('edit:focus', this.onFocus);
		},
		methods: {
			// 点击提交
			onSubmit() {
				this.$emit('submit',this.edit);
			},
			// 切换颜色选项
			clickTitleCell(value) {
				this.styleTab = value;
				this.edit.upKeyboard();
			},
			// 点击常用颜色列表
			clickColor(color, type) {
				this.edit.format(type, color);
			},
			// 选择字体颜色和背景色
			selectFontColor({hex,rgba: {r,g,b,a}},type) {
				this.edit.format(type, `rgba(${r},${g},${b},${a})`);
			},
			// 点击标签栏
			clickTab({name}, index) {
				
				let arr = ['emoji', 'editor'];
				// #ifndef APP-PLUS
					this.edit.tool('blur');
				// #endif
				
				if (name === this.tab) {
					this.tab = '';
				}
				else if (arr.includes(name)) {
					this.tab = name;
					if (name === 'editor') {
					}
				}
				this.edit.upKeyboard();
				this.$nextTick(() => {
					this.getBtnHeightHandler();
				});
				switch (name) {
					case 'image':
						this.edit.addImage();
						break;
					case 'undo':
					case 'redo':
						this.edit.tool(name);
						break;
					default:
						break;
				}
				this.$emit('click', {name,index});
			},
			// 获取状态栏高度
			getAppStatusHeight() {
				// #ifdef APP-PLUS
					// 获取系统状态栏高度
					this.statusHeight = plus.navigator.getStatusbarHeight();
				// #endif
			},
			// 获取覆盖层高度
			getBtnHeightHandler() {
				// #ifndef APP-NVUE
				let view = uni
					.createSelectorQuery()
					.in(this)
					.select('.edit-btns')
				view.fields({
					size: true
				}, ({
					height
				}) => {
					this.btnHeight = height;
				}).exec()
				// #endif
				// #ifdef APP-NVUE
				const dom = weex.requireModule('dom')
				dom.getComponentRect(this.$refs.editBtns, ({
					size: {
						height
					}
				}) => {
					this.btnHeight = parseInt(height);
				})
				// #endif
			},
			// 监听焦点进入
			onFocus(e) {
				
			}
		}
	}
</script>
<style scoped lang="scss">
	@import "./icon/iconfont.css";
	@font-face {
	  font-family: "lsj-icon";
	  src: 
	       url('./icon/iconfont.woff2?t=1681109150824') format('woff2'),
	       url('./icon/iconfont.woff?t=1681109150824') format('woff'),
	       url('./icon/iconfont.ttf?t=1681109150824') format('truetype');
	}
	
	// icon资源的网络地址
	// @font-face {
	//   font-family: 'lsj-icon';  /* Project id 4006048 */
	//   src: url('https://at.alicdn.com/t/c/font_4006048_ccclm6urx6.woff2?t=1681808172676') format('woff2'),
	//        url('https://at.alicdn.com/t/c/font_4006048_ccclm6urx6.woff?t=1681808172676') format('woff'),
	//        url('https://at.alicdn.com/t/c/font_4006048_ccclm6urx6.ttf?t=1681808172676') format('truetype');
	// }
	

	// 定义字体(px)单位，小于20都为px单位字体
	@for $i from 9 to 20 {
		.l-font-#{$i} {
			font-size: $i + px;
		}
	}

	// 定义字体(rpx)单位，大于或等于20的都为rpx单位字体
	@for $i from 20 through 40 {
		.l-font-#{$i} {
			font-size: $i + rpx;
		}
	}

	// 定义内外边距，历遍1-200
	@for $i from 0 through 200 {

		// 只要双数和能被5除尽的数
		@if $i % 2==0 or $i % 5==0 {

			// 得出：l-margin-30或者l-m-30
			.l-margin-#{$i},
			.l-m-#{$i} {
				margin: $i + rpx !important;
			}

			// 得出：l-padding-30或者l-p-30
			.l-padding-#{$i},
			.l-p-#{$i} {
				padding: $i + rpx !important;
			}

			@each $short,
			$long in l left,
			t top,
			r right,
			b bottom {

				// 缩写版，结果如： l-m-l-30
				// 定义外边距
				.l-m-#{$short}-#{$i} {
					margin-#{$long}: $i + rpx !important;
				}

				// 定义内边距
				.l-p-#{$short}-#{$i} {
					padding-#{$long}: $i + rpx !important;
				}

				// 完整版，结果如：l-margin-left-30
				// 定义外边距
				.l-margin-#{$long}-#{$i} {
					margin-#{$long}: $i + rpx !important;
				}

				// 定义内边距
				.l-padding-#{$long}-#{$i} {
					padding-#{$long}: $i + rpx !important;
				}
			}
		}
	}

	@mixin flexCenter($align: center, $justify: center) {
		display: flex;
		flex-direction: row;
		align-items: $align;
		justify-content: $justify;
	}

	.t-blue {
		color: #00aaff !important;
	}

	.defc {
		color: #545454;
	}

	.b1 {
		border: 1rpx solid #d8d8d8;
		padding: 3px 6px;
		border-radius: 3px;
	}

	.flex {
		display: flex;

		&-1 {
			flex: 1;
		}

		&__tabs {
			@include flexCenter();
			flex-wrap: nowrap;
		}

		&-start {
			justify-content: flex-start;
		}
	}

	.icon {
		font-size: 40rpx;
	}

	.pl {
		padding: 0 30rpx;
	}
	.edit-btns {
		background-image: linear-gradient(to left, #fff, transparent);
		position: fixed;
		top: var(--window-top);
		left: 0;
		right: 0;
		z-index: 90;
		

		.btns {
			@include flexCenter();
			flex-wrap: nowrap;
			height: 50px;
			background-color: #F1F1F4;
			&_left {
				padding-left: 30rpx;
				display: flex;
				justify-content: space-between;
			}

			&_right {
				margin-left: 80rpx;
				min-width: 80rpx;
				max-width: 80rpx;
				text-align: center;
			}
		}
		
		.suffix {
			background-image: linear-gradient(to left, #fff, transparent);
			display: inline-block;
			box-sizing: border-box;
			position: fixed;
			left: 0;
			right: 0;
			text-align: right;
			padding-right: 20rpx;
			font-size: 24rpx;
			color: #999;
			&_textCount {
				font-size: 26rpx;
				color: #545454;
			}
			&_err {
				color: #ff0000!important;
			}
		}
	}

	.emoji {
		@include flexCenter();
		flex-wrap: nowrap;
		width: 750rpx;
		height: 220rpx;
		border-top: 1rpx solid rgba(0, 0, 0, 0.07);
		background-color: #f2f2f2;
		.icon {
			font-size: 48rpx;
		}

		&__scroll {
			width: 742rpx;
			height: 220rpx;
			&_item {
				display: inline-block;
				width: 56rpx;
				height: 56rpx;
				text-align: center;
				line-height: 56rpx;
				font-size: 36rpx;
			}
		}

		&__close {
			position: absolute;
			z-index: 1;
			right: 0;
			bottom: 0;
			width: 70rpx;
			height: 56rpx;
			background: #fff;

			&_btn {
				@include flexCenter();
				height: 56rpx;
				flex-wrap: nowrap;
			}
		}
	}

	.bg-node {
		border: 1px solid #ddd !important;
		color: #d8d8d8;
	}

	.boxs {
		-webkit-box-shadow: 2px 2px 3px rgba(0, 0, 0, .8);
		-moz-box-shadow: 2px 2px 3px rgba(0, 0, 0, .8);
		box-shadow: 2px 2px 3px rgba(0, 0, 0, .8);
	}
	.flex-center {
		@include flexCenter();
	}
	.fcolor,
	.ftext {
		border-top: 1rpx solid rgba(0, 0, 0, 0.07);
		background-color: #f2f2f2;
		height: 220rpx;

		.scroll {
			::-webkit-scrollbar {
				display: none;
			}

			white-space: nowrap;
			width: 495rpx;
			padding-top: 6rpx;

			&__cell {
				display: inline-block;
				width: 45rpx;
				height: 45rpx;
				font-size: 50rpx;
				overflow: hidden;
				box-sizing: border-box;
				text-align: center;
				margin-right: 25rpx;
				border-radius: 6rpx;
				border: 1px solid transparent;
			}
		}
		.fontSizeTitle {
			font-size: 24rpx;
		}
		&__title {
			@include flexCenter(center, flex-start);
			padding: 20rpx 30rpx;
			color: #999;
			font-size: 24rpx;
		}

		&_card {
			margin: 0 30rpx;
			background-image: linear-gradient(to left, #fff, transparent);
			border-radius: 10rpx;
		}

		&_list {
			@include flexCenter();
			flex-wrap: nowrap;
			justify-content: flex-start;
			box-sizing: border-box;

			&__cell {
				width: 40rpx;
				height: 40rpx;
				margin-right: 30rpx;
				border-radius: 6rpx;
				border: 1px solid transparent;
			}
		}

		&_right {
			width: 140rpx;
		}

		.font_right {
			width: 160rpx;
			justify-content: flex-end;
		}

		.divider {
			height: 2px;
			margin-right: 50rpx;
			border-radius: 2px;
		}
		
		.typeface {
			padding: 10rpx 30rpx 0;
			height: 120rpx;
			overflow: hidden;
			.zt {
				@include flexCenter(center,flex-start);
				flex-wrap: nowrap;
				justify-content: space-between;
				.icon {
					font-size: 34rpx!important;
				}
			}
			.zh {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				margin-top: 10rpx;
				&_title {
					font-size: 20rpx;
					color: #999;
				}
				.icon {
					font-size: 24rpx!important;
				}
			}
		}

		.gs {
			flex-wrap: wrap;
			justify-content: flex-start;
			padding-left: 20rpx;
			padding-top: 10rpx;
			height: 120rpx;
			overflow: hidden;
			.icon {font-size: 32rpx;}
			&_cell {
				min-width: 46rpx;
				min-height: 40rpx;
				margin: 0 10rpx 20rpx;
			}
		}
	}

	.btnszw {
		width: 100%;
		height: 0;
		background-color: #F1F1F4;
	}
</style>