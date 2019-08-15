<!-- components/evaluate-components/index.wxml -->
<template>
	<view>
		<slot name="header"></slot>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">日期选择</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange" :disabled="!enableEdit">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">时间选择</view>
				<picker mode="time" :value="time" start="09:01" end="21:01" @change="TimeChange" :disabled="!enableEdit">
					<view class="picker">
						{{time}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">预约内容</view>
				<picker :range="Param" range-key="name" :value="paramIndex" @change="ParamChange" :disabled="!enableEdit">
					<view class="picker">
						
						{{Param[paramIndex].name}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">人数</view>
				<input placeholder="请填写到场人数" name="input" type="number" v-model="num" :disabled="!enableEdit"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">预约人</view>
				<input placeholder="请填写预约人姓名" name="input" v-model="name" :disabled="!enableEdit"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="请填写预约人手机号码" name="input" v-model="contactNumber" :disabled="!enableEdit"></input>
			</view>
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="!enableEdit" @input="textareaAInput" placeholder="备注"></textarea>
			</view>
		</form>
		<view class="cu-bar btn-group padding foot margin-bottom ">
			<button @tap="submit" class="cu-btn bg-green shadow-blur round lg">提交</button>
		</view>
	</view>
</template>

<script>
	import mutiPicker from '@/components/wsure-mutiPicker/mutiPicker.vue'
	
//数据模拟
export default {
	props: {
		//是否可编辑
		enableEdit: {
			type: Boolean,
			default: true
		},
		param:{
			type:Array,
			default:function(){
				return []
			}
		},
		shopId:{
			type:String,
			default:null
		}
	},
	components:{
		mutiPicker
	},
	computed:{
		Param(){
			if(this.param.length==0){
				return [{
						"name": "暂无服务可选",
						"param_Id": "1",
						"type": "0",
				}]
			} else {
				return this.param;
			}
			
		}
	},
	data() {
		return {
			date:'',
			time:'',
			name:'',
			startDate:'',
			startTime:'',
			contactNumber:'',
			remark:'',
			num:1,
			paramIndex:0
		}
	},
	methods: {
		TimeChange(e) {
			this.time = e.detail.value
		},
		DateChange(e) {
			this.date = e.detail.value
		},
		ParamChange(e) {
			this.paramIndex = e.detail.value
		},
		textareaAInput(e) {
			this.remark = e.detail.value
		},
		setTime(){
			var fomat = function(str){
				return str.toString().length==1?('0'+str):str;
			}
			var d = new Date();
			var date = (d.getYear()<2019?(1900+d.getYear()):d.getYear()) + "-" + fomat(d.getMonth() + 1) + "-" + fomat(d.getDate());
			this.date = this.startDate = date;
			var time = fomat(d.getHours()) + ":" + fomat(d.getMinutes());
			this.time = this.startTime = time;
		},
		submit(){
			if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.contactNumber))){ 
				uni.showToast({title: '请填写正确手机号码',icon:"none"});
				return false; 
			}
			if(!this.name ||this.name===''){ 
				uni.showToast({title: '请填写预约人姓名',icon:"none"});
				return false; 
			} 
			this.$emit('submit',{
				shopId:this.shopId,
				orderTime:this.date+' '+this.time,
				name:this.name,
				contactNumber:this.contactNumber,
				remark:this.remark,
				num:this.num,
				orderType:this.Param[this.paramIndex].type,
				orderParam:this.Param[this.paramIndex].param_Id
			})
		},
	},
	mounted() {
		if(this.enableEdit){
			this.setTime();
		} else {
			this.setData();
		}
		
	}
};
</script>
<style>
	.cu-bar.foot{
		box-shadow:none;
	}
</style>
