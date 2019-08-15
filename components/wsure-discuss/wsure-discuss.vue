<template>
	<view>
		<view class="cu-card dynamic">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="Headimg"></view>
						<view class="content flex-sub">
							<view class="flex-direction-row justify-between align-center">
								<view>{{userName}}</view> 
								<stars :rate="Appraise"></stars>
							</view>
							<view class="text-gray text-sm flex justify-between">
								{{createTime}}
							</view>
						</view>
					</view>
				</view>
				<view class="text-content">
					{{content}}
				</view>
				<view class="grid flex-sub padding col-3 grid-square" v-if="images.length>0">
					<view class="bg-img" :style="'background-image:url('+item+');'"
					 v-for="(item,index) in images" :key="index" @tap="previewImg(item)">
					</view>
				</view>
				<!--<view class="text-gray text-sm text-right padding-sm">
					 <text class="cuIcon-attentionfill margin-lr-xs"></text> 10
					<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
					<text class="cuIcon-messagefill margin-lr-xs"></text> 30 
				</view>-->
			</view>
		</view>
	</view>
</template>

<script>
	import stars from '@/components/wsure-stars/stars.vue';
	export default {
		components:{
			stars
		},
		props:{
			headimg:{
				type:String,
				default:"https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
			},
			userName:{
				type:String,
				default:"匿名"
			},
			createTime:{
				type:String,
				default:"1970-01-01 00:00:00"
			},
			content:{
				type:String,
				default:"说点什么吧..."
			},
			appraise:{
				type:[Number,String],
				default:"5"
			},
			images:{
				type:Array,
				default:function(){
					return [
					];
				}
			}
		},
		computed:{
			Headimg(){
				var url = this.headimg;
				if(!url || url === ''){
					url = "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg";
				}
				var headimg = `background-image:url(${url});`
				return headimg;
			},
			Appraise(){
				var rate = 5.0;
				if(typeof this.appraise == 'string')
					rate = parseFloat(this.appraise.replace(/[\D\.]/g,''))
				else 
					rate = this.appraise;
				return rate;
			}
		},
		data() {
			return {
				image:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
			};
		},
		methods: {
			previewImg(src){
				var urls = [];
				urls.push(src)
				uni.previewImage({
					current:src,
					urls
				})
			},
		}
	}
</script>

<style>

</style>
