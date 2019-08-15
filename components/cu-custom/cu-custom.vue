<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<block v-if="isBack&&(!isCustom)">
					<view class="action" @tap="BackPage" v-if="isBack">
						<text class="cuIcon-back"></text>
						<slot name="backText"></slot>
					</view>
				</block>
				<block v-if="!isBack&&isCustom">
					<!-- #ifdef MP -->
					<view class="action border-custom"  v-if="isCustom" :style="styleMP">
						<text class="cuIcon-back" @tap="BackPage"></text>
						<text class="cuIcon-homefill" @tap="toHome"></text>
					</view>
					<!-- #endif -->
					<!-- #ifndef MP -->
					<view class="action border-custom"  v-if="isCustom" :style="styleNMP">
						<text class="cuIcon-back" @tap="BackPage"></text>
						<text class="cuIcon-homefill" @tap="toHome"></text>
					</view>
					<!-- #endif -->
				</block>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				Custom: this.Custom,
				HomeUrl: this.HomeUrl
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			},
			styleMP() {
				var Custom= this.Custom;
				var style = `width:${Custom.width}px;height:${Custom.height}px;margin-left:calc(750rpx - ${Custom.right}px)`;
				return style;
			},
			styleNMP() {
				var Custom= {width:150,height:60,left:20};
				var style = `width:${Custom.width}upx;height:${Custom.height}upx;margin-left:${Custom.left}upx;`;
				return style;
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
			isCustom: {
				type: [Boolean, String],
				default: false
			},
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			toHome(){
				uni.reLaunch({
					url: this.HomeUrl,
				})
			}
		}
	}
</script>

<style>

</style>
