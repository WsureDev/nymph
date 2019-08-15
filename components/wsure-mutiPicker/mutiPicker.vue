<template>
	<view>
		<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray" range-key="name">
			<view class="picker">
				{{multiArray[0][multiIndex[0]].name}}，{{multiArray[1][multiIndex[1]].name}}，{{multiArray[2][multiIndex[2]].name}}
			</view>
		</picker>
	</view>
</template>

<script>
	export default {
		props:{
			deep:{
				type:Number,
				default:3
			},
			defaultValue:{
				type:Array,
				default:function(){
					return [0,0,0]
				}
			},
			pickerData:{
				type:Array,
				default(){
					function createChildren(deep,count,index,children){
						if(deep == index.length){
							return children;
						} else {
							var arr = [];
							for(var i=0;i<count;i++){
								arr.push({
									name:index.join('')+i,
									value:index.join('')+i,
									children:createChildren(deep,count,index.concat([i]),children)
								})
							}
							return arr;
						}
					}
					return createChildren(3,3,[],[]);
				}
			}
		},
		data() {
			return {
				multiIndex: [],
				multiArray: [
					
				],
			};
		},
		methods:{
			MultiChange(e) {
				console.log(e)
				this.multiIndex = e.detail.value
				console.log([
					this.multiArray[0][this.multiIndex[0]].value,
					this.multiArray[1][this.multiIndex[1]].value,
					this.multiArray[2][this.multiIndex[2]].value,
				])
				
			},
			MultiColumnChange(e) {
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				data.multiIndex[e.detail.column] = e.detail.value;
				
				this.createMultiArray(data.multiIndex);
				for(var i=e.detail.column+1;i<this.multiIndex.length;i++){
					data.multiIndex[i] = 0;
				}
				console.log(data.multiIndex.join('_'))
				this.multiIndex = data.multiIndex;
			},
			createMultiArray(multiIndex){
				var MultiArray = [];
				for(var i=0;i<multiIndex.length;i++){
					MultiArray.push(this.getChildren(i,multiIndex,this.pickerData,0))
				}
				this.multiArray = MultiArray;
			},
			getChildren(i,multiIndex,pickerData,s){
				if(i == s){
					return pickerData;
				} else {
					return this.getChildren(i,multiIndex,pickerData[multiIndex[s]].children,s+1 )
				}
			},
			initMultiIndex(){
				var index = []
				for(var i=0;i<this.deep;i++)
				{
					index.push(0)
				}
				this.multiIndex = index;
			}
		},
		mounted() {
			this.initMultiIndex();
			this.createMultiArray(this.multiIndex);
			
		}
	}
</script>

<style>

</style>
