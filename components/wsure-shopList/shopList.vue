<template>
	<view>
		<scroll-view scroll-x class="bg-white nav solid-bottom" v-if="sorts.length>0">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in sorts" :key="index" @tap="tabSelect" :data-id="index">
					{{item.title}}
				</view>
			</view>
		</scroll-view>
		<view class="solid-top" v-for="(item,index) in shops" :key="index" v-show="shops.length>0">
			<shop @clickBtn="clickBtn" :buttonName="buttonName" :name="item.name" :image="item.image" :rate="item.rate" :tags="item.tags" :distance="item.distance"></shop>
		</view>
		<view class="cu-item shadow" v-show="state ==2 && shops.length == 0">
			<view class="padding cu-card dynamic shadow-blur"> 
				<view class="text-center text-orange">暂无数据...</view>
			</view>
		</view>
		<view class="cu-item shadow" v-show="!(state ==2 && shops.length == 0)">
			<view class="padding cu-card dynamic">
				<view class="text-center text-orange shadow-blur">{{StateText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import shop from '@/components/wsure-shop/shop.vue'
	export default {
		props:{
			sorts: {
				type: Array,
				default: function(){
					return []
				}
			},
			shops: {
				type: Array,
				default:function(){
					return []
				}
			},
			buttonName: {
				type: String,
				default: "查看"
			},
			state:{
				type:Number,
				default:0
			}
		},
		computed:{
			StateText(){
				var text = '';
				switch(this.state){
					case 0:text = '上拉加载更多...';break;
					case 1:text = '加载中，请稍后...';break;
					case 2:text = '无更多内容...';break;
					default:text = '无更多内容...';break;
				}
				return text;
			}
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				tags:['as1','as2','as3'],
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			clickBtn(e){
				this.$emit("clickBtn",e);
			}
		},
		components:{
			shop
		}
	}
</script>

<style>

</style>
