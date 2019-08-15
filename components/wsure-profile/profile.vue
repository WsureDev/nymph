<template>
	<view>
		<view class="padding flex justify-center bg-yellow">
			<view class="cu-avatar xxl round" :style="Style"></view>
			<!--  margin-left -->
			<!--<view class="flex justify-start">
				<view class="cu-avatar xl round" :style="Style"></view> 
				 <view class="solid-bottom text-xl padding">
					<text class="text-black text-bold">{{userName}}</text>
				</view> 
			</view>-->
		</view>
		<!-- :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']" -->
		<view class="orders bg-yellow shadow-blur">
			<view class="cu-list menu card-menu margin-top shadow-blur menulist" style="width: 100%;">
				<form>
					<view class="cu-form-group">
						<view class="title">
							<text class="cuIcon-info text-olive myIcon"></text>
							ID
						</view>
						<!-- <input placeholder="输入框带个图标" name="input" disabled=""></input> -->
						<!-- <text class='cuIcon-locationfill text-orange'></text> -->
						<view class="flex flex-direction-row align-center uni-ellipsis">
							<view class="cu-load load-cuIcon" :class="isLoad?'loading':'over'"></view>
							<view class="picker uni-ellipsis">
								<!-- <view class="action">
									
								</view> -->
								{{openId && openId.userId?openId.userId:'获取中...'}}
							</view>
						</view>
						
					</view>
					<view class="cu-form-group">
						<view class="title">
							<text class="cuIcon-profile text-olive myIcon"></text>
							昵称
						</view>
						<!-- <input placeholder="输入框带个图标" name="input" disabled=""></input> -->
						<!-- <text class='cuIcon-locationfill text-orange'></text> -->
						<view class="picker">
							{{userInfo && userInfo.nickName ? userInfo.nickName : userName}}
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title">
							<text class="cuIcon-calendar text-olive myIcon"></text>
							生日
						</view>
						<picker mode="date" :value="date" start="1930-01-01" end="2020-09-01" @change="DateChange">
							<view class="picker">
								{{birth_?birth_:birth}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">
							<text class="cuIcon-location text-olive myIcon"></text>
							城市
						</view>
						<view class="myPicker" @click="showMulLinkageThreePicker(false)">
							<view class="picker">
								{{city_?city_:city}}
							</view>
						</view>
					</view>
				</form>
			</view>
		</view>
		<view class="cu-bar btn-group padding foot margin-bottom ">
			<button @tap="save" class="cu-btn bg-green shadow-blur round lg">保存</button>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components:{
			mpvueCityPicker
		},
		computed:{
			Style(){
				var headimg = this.userInfo && this.userInfo.avatarUrl?this.userInfo.avatarUrl:this.headimg;
				var style = `background-image:url(${headimg});`;
				return style;
			}
		},
		props:{
			headimg:{
				type:String,
				default:'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
			},
			userName:{
				type:String,
				default:'未授权'
			},
			birth:{
				type:String,
				default:'2019-08-01'
			},
			city:{
				type:String,
				default:'新疆-乌鲁木齐'
			},
		},
		data() {
			return {
				openId:null,
				isLoad:true,
				cityPickerValueDefault: [30, 0,0],
				themeColor: '#007AFF',
				birth_: null,
				city_:null,
				userInfo:null,
			};
		},
		methods:{
			DateChange(e) {
				this.birth_ = e.detail.value
			},
			// 三级联动选择
			showMulLinkageThreePicker(e) {
				// this.isOrigin = e;
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.city_  = e.label.toString().replace('新疆维吾尔自治区','新疆');
			},
			onCancel(e) {
			},
			save(){
				this.$emit('save',{
					openId: this.openId,
					userInfo: this.userInfo,
					birth: this.birth_,
					city: this.city_
				})
			}
		},
		mounted() {
			uni.login({
				provider: 'weixin',
				success: (loginRes)=> {
					console.log(loginRes);
					this.$api.openId({js_code:loginRes.code}).then((res)=>{
						console.log(res);
						this.openId = res.data;
						
					}).catch((err)=>{
						this.openId = '获取失败'
					}).finally(()=>{
						this.isLoad = false;
					});
				},
				fail(loginRes) {
					console.log(loginRes);
				},
				complete:()=> {
					
				}
			});
			// 获取用户信息
			if(!this.userInfo)
			{
				uni.showLoading({
					title:'加载中...'
				})
				uni.getUserInfo({
					provider: 'weixin',
					success: (infoRes) =>{
						console.log(infoRes);
						this.userInfo = infoRes.userInfo;
						this.iv = infoRes.iv;
					},
					fail:function(res){
						console.log(res)
					},complete() {
						uni.hideLoading()
					}
				});
			}
		}
	}
</script>

<style>
	.bg-head{
		background-color: #fb9d08;
	}
	.padding-left-xl {
		padding-left: 50upx;
	}
	.orders{
		
		width: 100%;
		height: 11vw;
		padding: 0 4%;
		margin-bottom: calc(11vw );
		display: flex;
		align-items: flex-start;
		border-radius: 0 0 100% 100%;
	}
	.menulist{
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
	}
	.myIcon{
		margin-right: 10upx;
		padding: 10upx;
	}
	.cu-form-group .myPicker {
		flex: 1;
		padding-right: 40upx;
		overflow: hidden;
		position: relative;
	}
	
	.cu-form-group .myPicker .picker {
		line-height: 100upx;
		font-size: 28upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
		text-align: right;
	}
	
	.cu-form-group .myPicker::after {
		font-family: cuIcon;
		display: block;
		content: "\e6a3";
		position: absolute;
		font-size: 34upx;
		color: #8799a3;
		line-height: 100upx;
		width: 60upx;
		text-align: center;
		top: 0;
		bottom: 0;
		right: -20upx;
		margin: auto;
	}
	.cu-bar.foot{
		box-shadow:none;
	}
</style>
