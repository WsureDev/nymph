<!-- components/evaluate-components/index.wxml -->
<template>
	<view class="shop bg-white solid-bottom" @click="tapShop">
		<!-- <view class=""> -->
		<image class="shopImage radius shadow-lg" :src="ImageSrc"
		 mode="scaleToFill"></image>
		<!-- </view> -->
		<view class="shopDetail flex-wrap">
			<view class="detailRow">
				<view class="shopName uni-ellipsis">{{name}}</view>
				<button v-if="buttonName" class="cu-btn sm bookingButton bg-cyan" @click="clickBtn">{{buttonName}}</button>
			</view>
			
			<!-- <view class="shopTag">
				<view class="padding-xs" v-for="(item,index) in tags" :key="index" >
					<view class="cu-tag line-black sm">{{item}}</view>
				</view>
			</view> -->
			<ws-tags :tags="tags"></ws-tags>
			<view class="detailRow">
				<view class="shopStars">
					<stars :rate="rate"></stars>
				</view>
				<view class="flex">
					<text v-if="distance" class="shopDistance">距您{{Distance}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import stars from '@/components/wsure-stars/stars.vue'
	import wsTags from '@/components/wsure-tags/wsure-tags.vue'
//数据模拟
export default {
	props: {
		value:{
			type:Object,
			default:function(){
				return {}
			}
		},
		shopId:{
			type:String,
			default:null
		},
		buttonName: {
			type: String,
			default: null
		},
		name: {
			type: String,
			default: "店铺"
		},
		image: {
			type: String,
			default: null
		},
		distance: {
			type: String,
			default: null
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
		}
	},
	computed:{
		ImageSrc(){
			var defaultImage = "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg";
			var src = !this.image || this.image === '' ? defaultImage : this.BaseUrl+ this.image;
			return src;
		} ,
		Distance(){
			if(!this.distance||this.distance==='')
				return null;
			
			return this.distance && this.distance.length>3? (parseInt(this.distance)/1000).toFixed(2)+'km': this.distance+'m'
		}
	},
	data() {
		return {}
	},
	components:{
		stars,
		wsTags
	},
	methods: {
		previewImg(src,urls){
			uni.previewImage({
				current:src,
				urls
			})
		},
		shopData(){
			var req = {
				name:this.name,
				image:this.image,
				distance:this.Distance,
				tags:this.tags,
				rate:this.rate,
				shopId:this.shopId,
				value:this.value
			};
			return req;
		},
		tapShop(){
			this.$emit("clickShop",this.shopData());
		},
		clickBtn(url){
			this.$emit("clickBtn",this.shopData());
		}
	}
};
</script>
<style scoped>
@import './iconfont.css';
.evaluateBox {
	width: 100%;
	margin-bottom: 120upx;
}

.evaluate-header {
	width: 100%;
	height: 80upx;
	display: flex;
	justify-content: space-between;
	padding: 20upx;
	align-items: center;
	margin-bottom: 12upx;
	box-sizing: border-box;
	border-bottom: 1upx solid #e5e5e5;
}

.evaluateBox .title {
	display: flex;
	align-items: center;
	color: #000000;
	font-size: 30upx;
}

.total {
	/* flex: 1; */
	height: 100%;
	font-size: 30upx;
	color: #d76d9d;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.stars {
	width: 180upx;
	height: 36upx;
	position: relative;
}
.stars .box {
	width: 180upx;
}
.stars-normal {
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
	color: #ccc;
}
.stars-selected {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
	color: #fde16d;
	overflow: hidden;
}
.stars-selected .iconfont,
.stars-normal .iconfont {
	font-size: 36upx;
}

.lists .item {
	padding: 20upx;
	display: flex;
	/* height: auto; */
	/* align-items: center; */
	font-size: 22upx;
	color: #999;
}

.lists .item .icon {
	width: 60upx;
	height: 60upx;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 26upx;
	/* align-self: flex-start; */
}

.lists .item .info {
	flex: 1;
	font-size: 26upx;
	color: #666;
}

.info .name-time {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 6upx;
}
.lists .info .stars {
	width: 140upx;
}

.info .stars-normal .iconfont,
.info .stars-selected .iconfont {
	font-size: 28upx;
}

.info .stars .box {
	width: 140upx;
}
.lists .info .evaluate-content {
	color: #000;
	font-size: 28upx;
	text-align: left;
	padding-top: 6upx;
}
.info .evaluate-content .imgs {
	display: flex;
	flex-wrap: wrap;
	padding-top: 6upx;
}
.evaluate-content .imgs .imgs-box {
	width: 25%;
	padding-right: 10upx;
	box-sizing: border-box;
}
/* .evaluate-content .imgs .imgs-box:nth-child(4n+1){
	padding-left: 0;
}
.evaluate-content .imgs .imgs-box:nth-child(4n){
	padding-right: 0;
} */
.no-lists {
	padding: 20upx 0;
	text-align: center;
	font-size: 24upx;
	color: #666;
}
.shop{
	display: flex;
	flex-direction: row;
	width: 750upx;
	height: 210upx;
	padding: 20upx;
}
.shopImage{
	margin: 10upx 0upx;
	/* background: #39B54A; */
	width: 240upx;
	height: 150upx;
}
.shopName{
	margin-left:10upx ;
	width: 340upx;
	font-size: 32upx;
}
.shopTag{
	display: flex;
	flex-direction: row;
	overflow: hidden;
	
}
.shopDetail{
	margin: 10upx 0upx 10upx 20upx;
	/* background: #1CBBB4; */
	width: 450upx;
	height: 150upx;
	display: flex;
	flex-direction: column;
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
	/* overflow: hidden;
	white-space:nowrap; */
	text-align: right;
}
.detailRow{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 450upx;
}
</style>
