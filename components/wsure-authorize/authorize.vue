<template>
	<view class="myCenter" style="margin-top:150upx ;">
		<swiper class="mySwiper" :indicator-dots="true" :autoplay="false" :current="swiperCurrent" @change="swiperChange">
			<swiper-item class="myCenter">
				<view class="logo">
					<view class="img">
						<image mode="widthFix" :src="Style"></image>
					</view>
				</view>
				<view class="form re">
					<view class="res">
						<view>{{NickName}}</view>
					</view>
					<button v-if="!(userInfo && userInfo.nickName)" class="btn" open-type="getUserInfo" @getuserinfo="getUserInfoData">获取个人信息</button>
					<button v-else="" class="btn" @tap="nextSwiper(1)">下一步</button>
				</view>
			</swiper-item>
			<swiper-item class="myCenter">
				<view class="form re">
					<block v-if="phoneNumberChecked === 1">
						<view class="res">
							<view>您已经成功绑定手机</view>
						</view>
						<button class="btn" @tap="nextSwiper(2)">下一步</button>
					</block>
					<block v-if="phoneNumberChecked !== 1">
						<view class="username">
							<view class="get-code" :style="{'color':getCodeBtnColor}" @click.stop="getCode()">{{getCodeText}}</view>
							<input placeholder="请输入手机号" v-model="phoneNumber" placeholder-style="color: rgba(255,255,255,0.8);"/>
						</view>
						<view class="code">
							<input placeholder="请输入验证码" v-model="code" placeholder-style="color: rgba(255,255,255,0.8);"/>
						</view>
						<button class="btn" @tap="doReg">立即绑定</button>
					</block>
				</view>
			</swiper-item>
			<swiper-item class="myCenter">
				<view class="form re">
					<block v-if="!HasAuth">
						<view class="res">
							<view>您还没有授权</view>
						</view>
						<button class="btn" @tap="nextSwiper(0)" v-if="phoneNumberChecked !== 1">去授权</button>
					</block>
					<block v-if="phoneNumberChecked !== 1">
						<view class="res">
							<view>您还没有绑定手机号</view>
						</view>
						<button class="btn" @tap="nextSwiper(1)" v-if="phoneNumberChecked !== 1">去绑定</button>
					</block>
					<block v-if="phoneNumberChecked === 1 && HasAuth">
						<view class="logo">
							<view class="img">
								<image mode="widthFix" :src="Style"></image>
							</view>
						</view>
						<view class="res">{{NickName}}</view>
						<view class="res">
							
							<view>恭喜您已完成注册！</view>
						</view>
						<button class="btn" @tap="toIndex">回到首页</button>
					</block>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			headimg:{
				type:String,
				default:'data:image/png;base64,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'
			},
			userName:{
				type:String,
				default:'未登录'
			},
			phoneNumberChecked:{
				type:Number,
				default:0
			},
			pinSended:{
				type:Number,
				default:0
			},
			codeLength:{
				type:Number,
				default:6
			},
			url:{
				type:String,
				default:'/pages/index/index'
			}
		},
		data() {
			return {
				swiperCurrent:0,
				phoneNumber:"",
				code:'',
				passwd:"",
				getCodeText:'获取验证码',
				getCodeBtnColor:"#ffffff",
				getCodeisWaiting:false,
				userInfo:null
			}
		},
		onLoad() {

		},
		computed:{
			Style(){
				var headimg = this.userInfo && this.userInfo.avatarUrl?this.userInfo.avatarUrl:this.headimg;
				// var style = `background-image:url(${headimg});`;
				return headimg;
			},
			NickName(){
				var nickName = this.userInfo && this.userInfo.nickName?this.userInfo.nickName:this.userName;
				return nickName;
			},
			HasAuth(){
				return this.userInfo && this.userInfo.nickName?true:false;
			}
		},
		watch:{
			phoneNumberChecked(newValue,OldValue){
				if(newValue === 1){
					uni.hideLoading()
					uni.showToast({title: '注册成功',icon:"success"});
				} 
				if(newValue === 2) {
					uni.showToast({title: '注册失败',icon:"success"});
				}
			},
			pinSended(nv,ov){
				if(nv === 1){
					uni.showToast({title: '验证码已发送',icon:"none"});
					this.setTimer();
				} 
				if(nv === 2){
					uni.showToast({title: '验证码发送失败',icon:"none"});
				}
			}
		},
		methods: {
			swiperChange(e){
				console.log(e)
				this.swiperCurrent = e.detail.current;
			},
			Timer(){},
			getCode(){
				uni.hideKeyboard()
				if(this.getCodeisWaiting){
					return ;
				}
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){ 
					uni.showToast({title: '请填写正确手机号码',icon:"none"});
					return false; 
				} 
				this.getCodeText = "发送中..."
				this.getCodeisWaiting = true;
				this.getCodeBtnColor = "rgba(255,255,255,0.5)"
				this.$emit("sendPin",{
					phoneNumber:this.phoneNumber
				});
			},
			setTimer(){
				let holdTime = 60;
				this.getCodeText = "重新获取(60)"
				this.Timer = setInterval(()=>{
					if(holdTime<=0){
						this.getCodeisWaiting = false;
						this.getCodeBtnColor = "#ffffff";
						this.getCodeText = "获取验证码"
						clearInterval(this.Timer);
						return ;
					}
					this.getCodeText = "重新获取("+holdTime+")"
					holdTime--;
					
				},1000)
			},
			doReg(){
				uni.hideKeyboard()
				if(this.pinSended !== 1){
					uni.showToast({title: '请先获取验证码',icon:"none"});
					return false; 
				}
				//模板示例部分验证规则
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){ 
					uni.showToast({title: '请填写正确手机号码',icon:"none"});
					return false; 
				} 
				//非空校验
				if(this.code===''){ 
					uni.showToast({title: '验证码不能为空',icon:"none"});
					return false; 
				}
				let regstr = new RegExp('\\d{'+parseInt(this.codeLength)+'}') ;
				if(!(regstr.test(this.code))){ 
					uni.showToast({title: '验证码不正确',icon:"none"});
					return false; 
				}
				uni.showLoading({
					title: '提交中...'
				})
				this.$emit("checkPhoneNumber",{
					phoneNumber:this.phoneNumber,
					code:this.code
				});
			},
			toIndex(){ 
				uni.hideKeyboard()
				uni.switchTab({
					url: this.url
				});
				uni.navigateBack();
			},
			nextSwiper(index){
				this.swiperCurrent = index;
			},
			getUserInfoData(e){
				console.log(e);
				this.userInfo = e.detail.userInfo
			}
		},
		mounted() {
			// 获取用户信息
			if(!this.userInfo || !this.userInfo.nickName)
			{
				//#ifdef MP
				uni.showLoading({
					title:'加载中...'
				})
				//#endif
				uni.getUserInfo({
					provider: 'weixin',
					success: (infoRes) =>{
						this.userInfo = infoRes.userInfo;
					},
					fail:function(res){
					},complete() {
						uni.hideLoading()
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	@import 'login.scss';
	.form {
		.username,
		.password,
		.code {
			width: 100%;
		}
	}
</style>
