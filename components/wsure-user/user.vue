<template>
	<view>
		<view class="padding flex justify-between bg-yellow">
			<view class="flex justify-start">
				<view class="cu-avatar xl round" :style="Style"></view> <!--  margin-left -->
				<view class="text-xl padding">
					<text class="text-black text-bold">
						{{userInfo && userInfo.nickName ? userInfo.nickName : userName}}
					</text>
				</view>
			</view>
			<view class="flex align-center text-xl padding-left-xl radius" hover-class="bg-head" :data-url="profileUrl" @tap="toChild">
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<!-- :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']" -->
		<view class="orders bg-yellow shadow-blur">
			<view class="cu-list menu card-menu margin-top shadow-blur menulist" style="width: 100%;">
				<view class="cu-item arrow">
					<button class="cu-btn content" :data-url="myBookingUrl" @tap="toChild">
						<text class="cuIcon-footprint text-olive"></text>
						<text class="text-grey">我的预约</text>
					</button>
				</view>
				<view class="cu-item arrow">
					<button class="cu-btn content" :data-url="discussUrl" @tap="toChild">
						<!-- <image src="/static/logo.png" class="png" mode="aspectFit"></image> -->
						<text class="cuIcon-edit text-olive"></text>
						<text class="text-grey">我的评价</text>
					</button>
				</view>
				<view class="cu-item arrow">
					<button class="cu-btn content" :data-url="collectionUrl" @tap="toChild">
						<text class="cuIcon-crown text-olive"></text>
						<text class="text-grey">我的收藏</text>
					</button>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
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
			profileUrl:{
				type:String,
				default:'/pages/book/custom/profile'
			},
			myBookingUrl:{
				type:String,
				default:'/pages/book/custom/myBooking'
			},
			discussUrl:{
				type:String,
				default:'/pages/book/custom/discuss'
			},
			collectionUrl:{
				type:String,
				default:'/pages/book/custom/collection'
			},
		},
		data() {
			return {
				userInfo:null
			};
		},
		methods:{
			toChild(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			getUserInfo_(e){
				console.log(e)
			}
		},
		mounted(){
			// 获取用户信息
			console.log('ws-user')
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
	/* .box_{
		width: 96%;
		padding: 0 2%;
		height: 22vw;
		background-color: #fefefe;
		border-radius: 12px;
		-webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
		margin-bottom: 20px;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
	} */
</style>
