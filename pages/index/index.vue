<template>
	<view>
		<u-action-sheet :actions="list" :title="title" :show="show"></u-action-sheet>
		<view style="height: 300px;"></view>
		<u-button @click="toComment(1)">打开ActionSheet</u-button>
		<image src="https://gitee.com/yyh12345678/image/raw/master/image/不高兴.gif" style="width: 120px;height: 120px;"
			mode="aspectFill"></image>
	</view>
</template>

<script>
	import { createAlarm } from "@/utils/nativeMsg.js";
	export default {
		data() {
			return {
				title: '标题',
				list: [{
						name: '选项一',
						subname: "选项一描述",
						color: '#ffaa7f',
						fontSize: '20'
					},
					{
						name: '选项二禁用',
						disabled: true
					},
					{
						name: '开启load加载', //开启后文字不显示
						loading: true
					}
				],
				show: false,
			}
		},
		methods: {
			toComment(index) {
				let alarmId = Date.now()
				let msg = {
					alarmId: alarmId,
					warningTypeStr: "告警消息",
					projectName: "2023年5月17日",
					description: "十万火急，赶紧处理！！！"
				};
				createAlarm(msg,res=>{
					console.log(res)
				})
			}
		}
	};
</script>
<style>
</style>