exports.install = function(Vue, options) {
	// 全局函数

	/**
	 * 底部菜单
	 * @param {Object} param
	 */
	Vue.prototype.$showActionSheet = function(param) {
		// #ifdef APP-PLUS
		uni.$off('_systemShowActionSheetMessage');
		uni.setStorageSync('_systemShowActionSheetParam', param);
		this.$jump('$actionSheet');
		uni.$once('_systemShowActionSheetMessage', (res) => {
			if (typeof param.success != 'undefined') {
				param.success(res);
			}
		});
		// #endif
		
		// #ifndef APP-PLUS
		uni.showActionSheet({
			itemList: param.itemList,
			success: function(res) {
				if (typeof param.success != 'undefined') {
					param.success(res);
				}
			}
		});
		// #endif
	};
	
	/**
	 * 跳转页面
	 */
	Vue.prototype.$jump = function(page, redirect) {
		// 是否关闭当前页面
		redirect = typeof redirect != 'undefined' ? redirect : false;
		if (redirect) {
			uni.redirectTo({
				url: page
			});
		} else {
			if (page.indexOf('$actionSheet') == 0) {
				// 打开actionSheet
				uni.navigateTo({
					url: '/pages/actionSheet/actionSheet',
					animationType: "fade-in"
				});
			} else {
				uni.navigateTo({
					url: page,
					animationType: "zoom-fade-out"
				});
			}
		}
	};

};
