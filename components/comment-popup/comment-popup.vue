<template>
	<uni-popup ref="popup" type="bottom" :maskClick="false">
		<view class="popup-wrap">
			<view class="popup-header">
				<text class="popup-header__item" @click="closeComment">取消</text>
				<text class="popup-header__item" @click="submit">发布</text>
			</view>
			<view class="popup-content">
				<textarea class="popup-textarea" v-model="commentValue" maxlength="200" fixed placeholder="请输入评论内容" auto-focus />
				<view class="popup-count">{{commentValue.length}}/200</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		name:"comment-popup",
		props:{
			popupSwitch:{
				type: Number,
				default: false
			}
		},
		data() {
			return {
				commentValue:''
			};
		},
		watch:{
			popupSwitch(newVal){
				this.$refs.popup.open()
			}
		},
		methods:{
			// 关闭
			closeComment(){
				this.clearCommentValue()
				this.$refs.popup.close()
				// this.$emit('closeCallback')
			},
			
			// 清空弹出层内容
			clearCommentValue(){
				this.commentValue = ''
			},
			
			// 提交
			submit(){
				if(!this.commentValue) {
					uni.showToast({
						title:'请输入评论的内容',
						icon:'none'
					})
					return
				}
				this.$emit('submit', this.commentValue, this.closeComment)
			}
		}
	}
</script>

<style lang="scss">
	.popup-wrap{
		background-color: #fff;
		
		.popup-header{
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: #666;
			border-bottom: 1px #F5F5F5 solid;
			.popup-header__item{
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
			}
		}
		.popup-content{
			width: 100%;
			padding: 15px;
			box-sizing: border-box;
			.popup-textarea{
				width: 100%;
				height: 200px;
			}
			.popup-count{
				display: flex;
				justify-content: flex-end;
				font-size: 12px;
				color: #999;
			}
		}
	}
</style>
