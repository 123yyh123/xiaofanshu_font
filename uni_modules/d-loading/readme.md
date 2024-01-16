# 插件名称：d-loading 更新时间：2022.06.17



## 使用步骤 仅2步（已亲测）

### 【一】准备：

````
1.复制图片目录到【根目录】：
'@/uni_modules/d-swiper-type/components/d-swiper-type/pages/static'

2.    main.js 中增加这2行代码

import dLoading from '@/uni_modules/d-loading/components/d-loading/d-loading.vue'
Vue.component('dLoading',dLoading)

````


### 【二】使用：
````


<template>
	<view>
	
		<dLoading :status="loading"></dLoading>
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				loading:''
			}
		},
		onLoad() {
			this.loading = true
			
			
			var that = this
			if (true) {
				setTimeout(function(){
					that.loading = false
				},1000)
			}
			
			
		},
	}
</script>


gif 来源color ui
````

