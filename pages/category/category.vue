<template>
	<view>
		<view v-for="rowIndex in Math.ceil(iconList.length / 3)" :key="rowIndex"
			style="display: flex; padding: 40rpx;">
			<view v-for="colIndex in 3" :key="colIndex" style="text-align: center;width: 33%;display: flex;flex-direction: column;align-items: center;"
				v-if="(rowIndex - 1) * 3 + colIndex - 1 < iconList.length" @click="goToCategoryDetail(iconList[(rowIndex - 1) * 3 + colIndex - 1].id)">
				<u-icon :name="iconList[(rowIndex - 1) * 3 + colIndex - 1].icon" size="45"></u-icon>
				<text style="margin-top: 30rpx;">{{ iconList[(rowIndex - 1) * 3 + colIndex - 1].categoryName }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {getNotesCategoryList} from '@/apis/notes_service.js'
	export default {
		data() {
			return {
				iconList: []
			}
		},
		methods: {
			goToCategoryDetail(id) {
				uni.navigateTo({
					url: `/pages/category/categoryDetail?id=${id}&categoryName=${this.iconList.find(item => item.id === id).categoryName}`
				})
			}
		},
		onLoad() {
			getNotesCategoryList().then(res => {
				this.iconList = res.data
			})
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #ffffff;
	}
</style>