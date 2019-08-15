<template>
		<view class="shopTag">
			<view class="padding-xs" v-for="(item,index) in Tags" :key="index" >
				<view class="cu-tag sm line-black" hover-class="bg-yellow">{{item}}</view>
			</view>
		</view>
</template>

<script>
	export default {
		props:{
			tags: {
				type: [Array,String],
				default: function(){
					return ['标签1','标签2','标签3','标签4'];
				}
			},
		},
		computed:{
			Tags(){
				if(typeof this.tags == 'string'){
					return this.tags.split(',')
				} else {
					return this.tags;
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.shopTag{
	display: flex;
	flex-direction: row;
	overflow: hidden;
}
</style>
