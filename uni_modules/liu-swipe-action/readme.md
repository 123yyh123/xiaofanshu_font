# liu-watermark适用于uni-app项目的滑动操作、左滑删除、滑动删除组件
### 本组件目前兼容微信小程序、H5
### 本组件是简单好用的滑动操作、左滑删除、滑动删除组件，可自定义样式，源码简单易修改
# --- 扫码预览、关注我们 ---

## 扫码关注公众号，查看更多插件信息，预览插件效果！ 

![](https://uni.ckapi.pro/uniapp/publicize.png)

### 使用示例
``` 
<template>
	<view class="slide-main">
		<view class="list" v-for="(item,index) in list" :key="index">
			<liu-swipe-action :index="index" @clickItem="clickItem">
				<view class="item">
					<image class="item-img" src="https://cdn.pixabay.com/photo/2022/03/31/14/53/camp-7103189_1280.png">
					</image>
					<view class="item-name">{{item}}</view>
				</view>
			</liu-swipe-action>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: ['第1条', '第2条', '第3条', '第4条', '第5条', '第6条']
			}
		},
		methods: {
			//点击操作回调事件
			clickItem(e) {
				console.log('所点击的列表索引：' + e.index)
				console.log('所点击的按钮id：' + e.id)
			}
		}
	}
</script>

<style scoped>
	.slide-main {
		width: 100%;
		height: 100vh;
		background-color: #f0f0f0;
	}

	.list {
		width: 100%;
		margin-top: 1px;
	}

	.item {
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.item-img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-left: 28rpx;
	}

	.item-name {
		margin-left: 16rpx;
		font-size: 30rpx;
		color: #666666;
	}
</style>
```
### 如需图文水印可自行修改组件内容

### 属性说明
| 名称                         | 类型           | 默认值                | 描述            |
| ----------------------------|--------------- | -------------------- | ---------------|
| index                       | Number         | 0                    | 当前列索引
| disable                     | Boolean        | false                | 是否禁用左滑
| btnList                     | Array          | 默认显示编辑、删除      | 操作按钮数组信息，默认显示编辑、删除，可自定义传入
| @clickItem                  | Function       |                      | 点击操作回调事件(返回当前列id和操作按钮id)

