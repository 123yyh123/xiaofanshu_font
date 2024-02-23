<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		onLoad(options) {
			console.log(options.id, options.categoryName)
			uni.setNavigationBarTitle({
				title: options.categoryName,

			})
		}
	}
</script>

<style lang="scss">

</style>