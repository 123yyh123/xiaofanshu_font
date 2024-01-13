<template>
	<view :style="[boxStyel]" class="box">
		<view class="audio-style" :style="[audioStyel]" :class="{ 'animation': isPlay }">
			<view class="small" :style="{'background-color': color}"></view>
			<view class="middle" :style="{'border-right-color': color}"></view>
			<view class="large" :style="{'border-right-color': color}"></view>
		</view>
	</view>
</template>
<script>
export default {
	emits: [],
	props: {
		isPlay: {
			type: [Boolean],
			default: false
		},
		direction: {
			type: String,
			default: 'right'
		},
		size: {
			type: Number,
			default: 24
		},
		color: {
			type: String,
			default: '#222'
		}
	},
	data() {
		return {
		};
	},
	computed: {
		audioStyel() {
			return {
				transform: `scale(${this.size / 24})`
			};
		},
		boxStyel() {
			const directDic = { right: '0deg', bottom: '90deg', left: '180deg', top: '270deg' };
			const dir = directDic[this.direction || 'left'];
			const style = {
				transform: `rotate(${dir})`,
				width: this.size + 'px',
				height: this.size + 'px'
			};
			return style;
		}
	},
	methods: {}
};
</script>
<style lang="scss" scoped>
view{
	box-sizing: border-box;
}
.box {
	// border: 1px solid #4c4c4c;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}
.audio-style {
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	& > view {
		border: 2px solid transparent;
		border-radius: 50%;
	}
}
.small {
	border: 0px solid;
	width: 3px;
	height: 3px;
}

.middle {
	width: 16px;
	height: 16px;
	margin-left: -11px;
	opacity: 1;
}

.large {
	width: 24px;
	height: 24px;
	margin-left: -19px;
	opacity: 1;
}
.animation {
	.middle {
		animation: middle 1.2s ease-in-out infinite;
	}
	.large {
		animation: large 1.2s ease-in-out infinite;
	}
}
// 语音播放动画
@keyframes middle {
	0% {
		opacity: 0;
	}
	10% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@keyframes large {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	60% {
		opacity: 0;
	}
	100% {
		opacity: 0;
	}
}
</style>
