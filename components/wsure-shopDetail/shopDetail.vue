<!-- components/evaluate-components/index.wxml -->
<template>
	<view>
		<view class="detailPage">
			<view class="shopDetail bg-white">
				<image class="shopImage radius shadow-lg" :src="Image"
				 mode="scaleToFill"></image>
				<view class="shopImage shopInfo">	
					<view class="shopName">{{name}}</view>
					<view>
						<stars :rate="rate"></stars>
						<view class="shopDistance">{{distance ==''?'':'距您'+distance}}</view>
					</view>
				</view>
			</view>
			<view class="shopDetailTag solid-bottom bg-white">
				<ws-tags :tags="tags"></ws-tags>
				<view class="collection" hover-class="collectionH" @tap="collection">
					<text class="lg text-black icon" :class="'cuIcon-like' + (isCollection?'fill':'')"></text>
					<text> {{isCollection?'已':''}}收藏</text>
				</view>
			</view>
			<view class="shopAddress solid-bottom solid-top bg-white">
				<view class="address solid-right" @tap="openLocation">
					<text class="locationIcon lg text-black cuIcon-location"></text>
					<text class="locationText">
						{{address}}
					</text>
				</view>
				<view class="phoneIcon solid-left" @tap="makePhoneCall">
					<text class="lg text-black cuIcon-phone"></text>
				</view>
			</view>
			<view class="introduction solid-top solid-bottom">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-blue"></text>商家信息
					</view>
				</view>
				<view class="cu-card dynamic">
					<view class="cu-item shadow">
						<view class="padding bg-white cu-card dynamic">
							
							<view class="text-left">
								{{introduce}}
							</view>
							<!-- <view class="text-center ">我于杀戮之中绽放 ,亦如黎明中的花朵</view>
							<view class="text-right ">我于杀戮之中绽放 ,亦如黎明中的花朵</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import stars from '@/components/wsure-stars/stars.vue'
	import wsTags from '@/components/wsure-tags/wsure-tags.vue'
	import utll from '@/common/util.js';
//数据模拟
export default {
	computed:{
		Image(){
			
			var defauleImg = 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg';
			var image = !this.image || this.image === ''?defauleImg :this.BaseUrl+this.image;
			return image;
		}
	},
	props: {
		shopId:{
			type: String,
			default: null
		},
		name: {
			type: String,
			default: "店铺店铺店铺店铺店铺"
		},
		image: {
			type: String,
			default: null
		},
		distance: {
			type: String,
			default: "1.5km"
		},
		tags: {
			type: [Array,String],
			default: function(){
				return ['标签1','标签2','标签3','标签4'];
			}
		},
		//总评分
		rate: {
			type: Number,
			default: 4.6
		},
		address:{
			type:String,
			default:'新疆乌鲁木齐市...'
		},
		phoneNumber:{
			type:String,
			default:''
		},
		introduce:{
			type:String,
			default:'商家准备中...'
		},
		lng:{
			type: Number,
			default: 43.80095
		},
		lat:{
			type: Number,
			default: 87.59811
		},
		isCollection:{
			type:Boolean,
			default:false
		}
	},
	data() {
		return {
		}
	},
	methods: {
		collection(){
			this.$emit('collection',{
				shopId:this.shopId,
				isCollection:this.isCollection
			})
		},
		previewImg(src,urls){
			uni.previewImage({
				current:src,
				urls
			})
		},
		goUrl(url){
			uni.navigateTo({
				url:url
			})
		},
		makePhoneCall: function () {
			if(this.phoneNumber === '')
			{
				uni.showToast({
					title: '店家电话为空!',
					icon:'none'
				});
			}
			uni.makePhoneCall({
				phoneNumber: this.phoneNumber.replace(/\D/g,''),
				success: () => {
					console.log("成功拨打电话")
				}
			})
		},
		openLocation: function () {
			var gcjLocation = utll.bd09togcj02(this.lng,this.lat)
			uni.openLocation({
				longitude: gcjLocation.longitude,
				latitude: gcjLocation.latitude,
				name: this.name,
				address: this.address
			})
		}
	},
	components:{
		stars,
		wsTags
	}
};
</script>
<style scoped>

.shop{
	display: flex;
	flex-direction: row;
	width: 750upx;
	height: 210upx;
	padding: 20upx;
	/* border:0.5upx solid #00F; */
	border-bottom: .5upx solid rgba(0, 0, 0, .3);
}
.shopImage{
	/* background: #39B54A; */
	margin-left: 10upx;
	width: 330upx;
	height: 180upx;
}
.shopName{
	font-size: 32upx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.shopDetailTag{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 750upx;
	/* height: 80upx; */
	padding: 20upx;
	/* background: #8799A3; */
	align-items: center;
}
.line{
	position: relative;
}

.line:after {
	position: absolute;
	z-index: 10;
	right: 0;
	bottom: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5);
	background-color: #c8c7cc;
}
.line::before {
	position: absolute;
	z-index: 10;
	right: 0;
	top: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5);
	background-color: #c8c7cc;
}
.shopDetail{
	padding: 40upx 20upx 10upx 20upx;
	/* background: #1CBBB4; */
	width: 750upx;
	height: 230upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.shopButton{
	margin: 10upx 0;
	/* background: #1CBBB4; */
	width: 90upx;
	height: 150upx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.shopStars{
	margin-left: 10upx;
}
.shopDistance{
	font-size: 24upx;
	margin-top: 20upx;
}
.detailRow{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 450upx;
}
.detailPage{
	display: flex;
	flex-direction: column;
}

.shopInfo{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.collection{
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 30upx;
	margin: 0 10upx;
}
.collectionH{
	color: #333333;
}
.icon{
	color: #A5673F;
	font-size: 56upx;
}
.shopAddress{
	display: flex;
	flex-direction: row;
	width: 750upx;
	height: 140upx;
}
.address{
	display: flex;
	flex-direction: row;
	width: 610upx;
}
.phoneIcon{
	width: 140upx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 80upx;
}
.locationIcon{
	width: 90upx;
	padding-top: 30upx;
	display: flex;
	justify-content: center;
	/* align-items: center; */
	font-size: 40upx;
}
.locationText{
	width:520upx;
	height: 80upx;
	margin: 30upx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.introduction{
	
}
</style>
