<template>
	<view>
		<view class="cu-bar bg-white search" > <!-- fixed :style="[{top:CustomBar + 'px'}]" -->
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" confirm-type="search" v-model="searchWord"></input>
				<text class="cuIcon-roundclose clear" v-if="searchWord.length>0" @tap="clear"></text>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="Search(searchWord)">搜索</button>
			</view>
		</view>
		<view class="cu-bar bg-white" v-if="searchHistory.length>0">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 搜索历史：
			</view>
			<view class="action" @tap="showModal" :data-target="null">
				<text class="cuIcon-deletefill text-orange margin-right"></text>
			</view>
		</view>
		<view class='padding-sm flex flex-wrap bg-white' v-if="searchHistory.length>0">
			<view class="padding-xs " v-for="(item,index) in searchHistory" :key="index" >
				<view class='cu-tag line-black' hover-class="bg-gray" @tap="setSearchWord(item)" @longpress="showModal" :data-target="item">{{item}}</view>
				<!-- <view class="absolute"></view>
				<text class="closeIcon text-gray cuIcon-roundclose" @tap="deleteHistory(index)"></text> -->
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="deleteWord==''?'':'show'">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @tap="deleteHistory(deleteWord)">确定</view>
					<view class="action text-blue" @tap="hideModal">取消</view>
				</view>
				<view class="padding-xl">
					是否删除“{{deleteWord?deleteWord:'全部历史记录'}}”？
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var wordList = uni.getStorageSync('searchHistory');
	export default {
		props:{
			getSearchList:{
				type: Function,
				default: function(){
					return (e)=>{
						console.log(e)
					}
				}
			},
		},
		data() {
			return {
				searchHistory:wordList?wordList:[],
				searchWord:'',
				deleteWord:''
			};
		},
		methods:{
			showModal(e) {
				this.deleteWord = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.deleteWord = ''
			},
			setSearchWord(word){
				this.searchWord = word;
			},
			deleteHistory(item){
				console.log(item);
				if(item == null) {
					console.log('删除全部');
					this.searchHistory = [];
				} else {
					console.log('删除:'+item);
					this.searchHistory = this.searchHistory.filter(word => word !== item);
				}
				wordList = this.searchHistory;
				uni.setStorageSync('searchHistory',this.searchHistory);
				this.hideModal()
				console.log(this.searchHistory);
			},
			Search(word){
				if(/^\s*$/.test(word)){
					return;
				}
				if(this.searchHistory.indexOf(word)<0){
					this.searchHistory.push(word)
					if(this.searchHistory.length>10){
						this.searchHistory.shift()
					}
					uni.setStorageSync('searchHistory',this.searchHistory);
					
				}
				this.$emit("search",{
					word:this.searchWord
				});
			},
			clear(){
				this.searchWord = ''
			}
		}
	}
</script>

<style>
	.absolute{
		position: absolute;
	}
	.closeIcon{
		position: relative;
		/* left: -16upx; */
		top: -20upx;
	}
	.clear{
		font-size: 32upx;
	}
	.searchTag{
		max-width: 200upx;
	}
</style>
