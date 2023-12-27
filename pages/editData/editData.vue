<template>
	<view>
		<u-popup :show="showName" mode="right" customStyle="width:750rpx;background-color: #f5f5f5;">
			<view v-if="updateOption===1">
				<u-navbar title="编辑名字" :autoBack="true" placeholder leftText="取消">
					<view @click="saveName" slot="right" :style="{color:nickname==''?'#e5abbe':'#e60033'}">保存</view>
				</u-navbar>
				<view style="height: 50rpx;"></view>
				<text style="margin-left: 60rpx;font-size: 32rpx;">修改一个心仪的名字吧</text>
				<view style="padding: 30rpx;">
					<u--textarea v-model="nickname" style="border-radius: 30rpx;padding: 30rpx;" placeholder="添加一个名字"
						count border='none' maxlength='12' height='1.5em'></u--textarea>
				</view>
				<text style="margin-left: 60rpx;font-size: 28rpx;color: #9ea1a3;">请设置2-12个字符哦，尽量不要包含特殊字符</text>
			</view>
			<view v-else-if="updateOption===3">
				<u-navbar title="编辑简介" :autoBack="true" placeholder leftText="取消">
					<view @click="saveIntroduction" slot="right" :style="{color:introduction==''?'#e5abbe':'#e60033'}">
						保存</view>
				</u-navbar>
				<view style="height: 50rpx;"></view>
				<text style="margin-left: 60rpx;font-size: 32rpx;">写一个自己喜欢的简介吧</text>
				<view style="padding: 30rpx;">
					<u--textarea v-model="introduction" style="border-radius: 30rpx;padding: 30rpx;"
						placeholder="可以说明自己的喜好,特点" count border='none' :maxlength='100' height='120'></u--textarea>
				</view>
			</view>
			<view v-else-if="updateOption===4">
				<u-navbar title="编辑性别" :autoBack="true" placeholder leftText="取消"></u-navbar>
				<view style="height: 50rpx;"></view>
				<text style="margin-left: 60rpx;font-size: 30rpx;color: #9ea1a3;">请选择你的性别</text>
				<view style="margin: 30rpx;background-color: #ffffff;padding: 30rpx;border-radius: 35rpx;">
					<u-radio-group v-model="sex" placement="column" iconPlacement="right" @change="groupChange">
						<u-radio activeColor="red" label="男" :name="1"></u-radio>
						<u-divider :hairline="true"></u-divider>
						<u-radio activeColor="red" label="女" :name="0"></u-radio>
					</u-radio-group>
				</view>
			</view>
			<view v-else-if="updateOption===5">
				<u-navbar title="编辑生日" :autoBack="true" placeholder leftText="取消"></u-navbar>
				<view style="height: 50rpx;"></view>
				<text style="margin-left: 60rpx;font-size: 30rpx;color: #9ea1a3;">请选择你的生日</text>
				<picker mode="date" :value="userInfo.birthday==null?date:userInfo.birthday" start="1900-00-00"
					:end="date" @change="bindDateChange">
					<u-cell style="background-color: #ffffff;margin: 30rpx;border-radius: 30rpx;" :border="false"
						title="生日信息" :isLink="true" :value="userInfo.birthday" @click="showDate=true;"
						size="large"></u-cell>
				</picker>
			</view>
			<view v-else-if="updateOption===6">
				<u-navbar title="编辑地区" :autoBack="true" placeholder leftText="取消"></u-navbar>
				<view style="height: 50rpx;"></view>
				<text style="margin-left: 60rpx;font-size: 30rpx;color: #9ea1a3;">请选择你的地区</text>
				<u-cell style="background-color: #ffffff;margin: 30rpx;border-radius: 30rpx;" :border="false" title="地区"
					:isLink="true" :value="userInfo.area" @click="addressShow=true;" size="large"></u-cell>
				<address-picker :show="addressShow" closeOnClickOverlay @confirm='confirmAddress'
					@cancel='addressShow=false' @close='addressShow = false' :address-data="addressData"
					:indexs="indexs" :areaId="areaId" :type="type"></address-picker>
			</view>
		</u-popup>
		<u-navbar title="编辑资料" :autoBack="true" placeholder>
		</u-navbar>
		<view style="padding: 30rpx;background-color: #ffffff;" class="up">
			<view style="justify-content: center;margin-top: 30rpx;margin-bottom: 30rpx;display: flex;">
				<view style="width: 200rpx;height: 200rpx;position: relative;" @click="chooseAvatar">
					<image style="width: 200rpx;height: 200rpx;border-radius: 50%;" :src="userInfo.avatarUrl"
						mode="aspectFill"></image>
					<view
						style="text-align: center;background-color: #000000;border-radius: 50%;width: 50rpx;height: 50rpx;padding: 5rpx;position: absolute;bottom: 5rpx;right: 5rpx;">
						<image style="width: 40rpx;" src="../../static/image/相机.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<u-cell title="名字" :isLink="true" :value="userInfo.nickname" :name="1" @click="openPopup"></u-cell>
			<u-cell title="小番薯号" :isLink="true" :value="userInfo.uid" :name="2" @click="openPopup"></u-cell>
			<u-cell title="简介" :isLink="true" value="有趣的简介可以吸引粉丝" :name="3" @click="openPopup"></u-cell>
			<u-cell title="性别" :isLink="true" :value="userInfo.sex===0?'女':userInfo.sex===1?'男':''" :name="4"
				@click="openPopup"></u-cell>
			<u-cell title="生日" :isLink="true" :value="userInfo.birthday" :name="5" @click="openPopup"></u-cell>
			<u-cell title="职业" :isLink="true" :value="userInfo.occupation" @click="chooseOccupation"></u-cell>
			<u-cell title="地区" :isLink="true" :value="userInfo.area" :name="6" @click="openPopup"></u-cell>
			<u-cell title="背景图" :isLink="true" @click="chooseBackgroundImage">
				<view slot='value'>
					<image style="height: 22px;" :src="userInfo.homePageBackground" mode="heightFix"></image>
				</view>
			</u-cell>
		</view>
		<view style="padding: 30rpx;background-color: #ffffff;margin-top: 20rpx;padding-bottom: 10rpx;" class="up">
			<view style="display: flex;">更多信息<view style="color: #9ea1a3;font-size: 23rpx;align-self: flex-end;">（仅自己可见）
				</view>
			</view>
			<u-cell title="二维码" :isLink="true" :border="false"><u-icon slot="value" name="grid"
					size="28"></u-icon></u-cell>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl
	} from '../../config/index.js';
	import {updateBackgroundImage,
	updateAvatarUrl,
	updateNickname,
	updateIntroduction,
	updateSex,
	updateArea,
	updateBirthday} from '../../apis/user_service.js'
	export default {
		data() {
			return {
				userInfo: {},
				updateOption: 0,
				showName: false,
				nickname: '',
				introduction: '',
				sex: 2,
				showDate: false,
				addressShow: false,
				indexs: [0, 0, 0],
				areaId: [1, 110000, 110101],
				addressData: ['北京市', '北京市', '东城区'],
				type: 3, //1-省，2-省市，3-省市区
				date: Number(new Date())
			};
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo');
			this.sex = this.userInfo.sex
			this.introduction = this.userInfo.selfIntroduction===null?'':this.userInfo.selfIntroduction
		},
		onBackPress() {
			if (this.showName) {
				this.showName = false
				return true
			}
		},
		methods: {
			chooseOccupation(){
				uni.showToast({
					title: '暂未开放',
					icon: 'none',
					duration: 1000,
					mask: true
				})
				return
			},
			chooseAvatar(){
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						console.log(res.tempFilePaths)
						uni.uploadFile({
							url: baseUrl + '/third/uploadImg',
							filePath: res.tempFilePaths[0],
							name: 'file',
							header: {
								'token': uni.getStorageSync('token')
							},
							success: (res) => {
								let data = JSON.parse(res.data)
								if (data.code === 20020) {
									console.log(data.data)
									updateAvatarUrl({
										userVO: {
											id: this.userInfo.id,
											avatarUrl: data.data
										}
									}).then(res=>{
										if(res.code===20020){
											uni.showToast({
												title: '更换成功',
												icon: 'success',
												duration: 500,
												mask: true
											})
											this.userInfo.avatarUrl = data.data
											uni.setStorageSync('userInfo', this.userInfo)
										}else{
											uni.showToast({
												title: '更换失败',
												icon: 'none',
												duration: 500,
												mask: true
											})
										}
									})
								}
							},
							complete() {
								uni.closePreviewImage({
									success: function() {
										console.log('关闭成功')
									}
								})
							}
						})
					},
					fail: (err) => {
						console.log(err.errMsg)
					}
				})
			},
			chooseBackgroundImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: (res) => {
						console.log(res.tempFilePaths)
						uni.uploadFile({
							url: baseUrl + '/third/uploadImg',
							filePath: res.tempFilePaths[0],
							name: 'file',
							header: {
								'token': uni.getStorageSync('token')
							},
							success: (res) => {
								let data = JSON.parse(res.data)
								if (data.code === 20020) {
									console.log(data.data)
									updateBackgroundImage({
										userVO: {
											id: this.userInfo.id,
											homePageBackground: data.data
										}
									}).then(res => {
										if (res.code === 20020) {
											uni.showToast({
												title: '更换成功',
												icon: 'success',
												duration: 500,
												mask: true
											})
											this.userInfo.homePageBackground = data.data
											uni.setStorageSync('userInfo', this.userInfo)
										} else {
											uni.showToast({
												title: '更换失败',
												icon: 'none',
												duration: 500,
												mask: true
											})
										}
									})
								}
							},
						})
					},
					fail: (err) => {
						console.log(err.errMsg)
					}
				})
			},
			confirmAddress(e) {
				updateArea({
					userVO:{
						id:this.userInfo.id,
						area:e.value.join(' ')
					}
				}).then(res=>{
					if(res.code===20020){
						// 如果第一个与第二个相同，说明是直辖市，只需要显示第一个
						if (e.value[0] === e.value[1]) {
							this.userInfo.area = e.value[0]+' '+e.value[2]
						}else{
							this.userInfo.area = e.value.join(' ')
						}
						this.addressShow = false
						uni.setStorageSync('userInfo', this.userInfo)
					}else{
						uni.showToast({
							title: '更改失败',
							icon: 'none',
							duration: 500,
							mask: true
						})
					}
				})
			},
			bindDateChange(e) {
				updateBirthday({
					userVO:{
						id:this.userInfo.id,
						birthday:e.detail.value
					}
				}).then(res=>{
					if(res.code===20020){
						this.userInfo.birthday = e.detail.value
						this.userInfo.age=res.data
						uni.setStorageSync('userInfo', this.userInfo)
					}else{
						uni.showToast({
							title: '更改失败',
							icon: 'none',
							duration: 500,
							mask: true
						})
					}
				})
			},
			groupChange(e) {
				updateSex({
					userVO:{
						id:this.userInfo.id,
						sex:this.sex
					}
				}).then(res=>{
					if (res.code === 20020) {
						this.userInfo.sex = this.sex
						uni.setStorageSync('userInfo', this.userInfo)
					} else {
						uni.showToast({
							title: '更改失败',
							icon: 'none',
							duration: 500,
							mask: true
						})
					}
				})
			},
			saveIntroduction() {
				if (this.introduction == '') {
					return
				}
				if (this.introduction.length > 100) {
					uni.showToast({
						title: '个人简介不能超过100个字符哦',
						icon: 'none',
						duration: 1000,
						mask: true
					})
					return
				}
				updateIntroduction({
					userVO: {
						id: this.userInfo.id,
						selfIntroduction: this.introduction
					}
				}).then(res => {
					if (res.code === 20020) {
						uni.showToast({
							title: '更改成功',
							icon: 'success',
							duration: 500,
							mask: true
						})
						this.userInfo.selfIntroduction = this.introduction
						uni.setStorageSync('userInfo', this.userInfo)
						this.showName = false
					} else {
						uni.showToast({
							title: '更改失败',
							icon: 'none',
							duration: 500,
							mask: true
						})
					}
				})
			},
			saveName() {
				if (this.nickname == '') {
					return
				}
				if (this.nickname.length === 1) {
					uni.showToast({
						title: '名字不能少于两个字符哦',
						icon: 'none',
						duration: 1000,
						mask: true
					})
					return
				}
				console.log('更改名字')
				updateNickname({
					userVO: {
						id: this.userInfo.id,
						nickname: this.nickname
					}
				}).then(res => {
					if (res.code === 20020) {
						uni.showToast({
							title: '更改成功',
							icon: 'success',
							duration: 500,
							mask: true
						})
						this.userInfo.nickname = this.nickname
						uni.setStorageSync('userInfo', this.userInfo)
						this.showName = false
					} else {
						uni.showToast({
							title: '更改失败',
							icon: 'none',
							duration: 500,
							mask: true
						})
					}
				})
			},
			openPopup(e) {
				console.log(e)
				this.updateOption = e.name
				if (e.name === 2) {
					this.updateOption = 2
					uni.showToast({
						title: '功能还未开放',
						icon: 'none',
						duration: 1000,
						mask: true
					})
					return
				}
				this.showName = true
				return
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.up ::v-deep .u-cell {
		&__body {
			padding: 30rpx 0;
		}

		&__title-text {
			color: #7b7c7d;
		}

		&__value {
			color: #000000;
		}
	}
</style>