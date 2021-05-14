<template>
	<view>
		<view class="feedback-title">意见反馈</view>
		<view class="feedback-content">
			<textarea class="feedback-textarea" v-model="textAreaVal" value="" placeholder="请输入您要反馈的问题" />
		</view>
		<view class="feedback-title">反馈图片:</view>
		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item,index) in imageList" :key="item.url">
				<view class="close-icon" @click="del(index)">
					<uni-icons type="closeempty" size="18" color="#ffffff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="scaleToFill"></image>
				</view>
			</view>

			<!-- + 号按钮 -->
			<view class="feedback-image-item" @click="addImage" v-if="showAdd">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		<button type="primary" class="feedback-btn" @click="submit">提交意见</button>
	</view>
</template>

<script>
	import {
		MyModel
	} from '@/models/my.js'
	const myModel = new MyModel()
	export default {
		data() {
			return {
				imageList: [],
				showAdd: true,
				textAreaVal:''
			};
		},
		methods: {

			// 上传图片
			async uploadFile(item) {
				const res = await uniCloud.uploadFile({
					filePath: item.url,
					cloudPath: item.name
				})
				return res
			},

			// 提交
			async submit() {
				const imagesPath = []
				
				uni.showLoading()
				// 上传图片的api每次只能上传一次图片
				for(let i = 0; i < this.imageList.length; i++){
					const res = await this.uploadFile(this.imageList[i])
					imagesPath.push(res.fileID)
				}
				const res = await myModel.update_feedback({
					feedbackImages:imagesPath,
					content: this.textAreaVal
				})
				uni.hideLoading()
				if(res.code === 200){
					uni.showToast({
						title:'意见反馈成功！',
						icon:'none'
					})
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/tabbar/my/my'
						})						
					},1000)
				}else{
					uni.showToast({
						title:'反馈提交失败',
						icon:'none'
					})
				}
			},

			// 添加图片
			async addImage() {
				const totalCount = 5
				if (this.imageList.length >= totalCount) {
					this.showAdd = false
					return
				}
				const count = totalCount - this.imageList.length
				const res = await uni.chooseImage({
					count
				})
				const imgPaths = res[1].tempFilePaths
				// 处理h5多选状态
				if (imgPaths.length < count) {
					imgPaths.forEach((path, index) => {
						this.imageList.push({
							url: path,
							name: res[1].tempFiles[index].name
						})
					})
				}
				this.isHideAddBtn(totalCount)
			},

			// 隐藏 + 按钮
			isHideAddBtn(totalCount) {
				if (this.imageList.length >= totalCount) {
					this.showAdd = false
				}
			},

			// 删除图片
			del(index) {
				this.imageList.splice(index, 1)
			}
		}
	}
</script>

<style lang="scss">
	.feedback-title {
		font-size: 14px;
		margin: 15px;
		margin-bottom: 0;
		color: #666;
	}

	.feedback-content {
		margin: 15px;
		padding: 10px;
		box-sizing: border-box;
		border: 1px solid #eee;

		.feedback-textarea {
			font-size: 12px;
			width: 100%;
			height: 100px;
		}
	}

	.feedback-image-box {
		display: flex;
		flex-wrap: wrap;
		padding: 10px;

		.feedback-image-item {
			position: relative;
			width: 33.33%;
			height: 0;
			padding-top: 33.33%;
			box-sizing: border-box;

			.close-icon {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				right: 0;
				top: 0;
				width: 22px;
				height: 22px;
				border-radius: 50%;
				background-color: #ff5a5f;
				z-index: 2;
			}

			.image-box {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 5px;
				right: 5px;
				bottom: 5px;
				left: 5px;
				border: 1px solid #eee;
				border-radius: 5px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.feedback-btn {
		margin: 0 15px;
		background-color: $mk-base-color;
	}
</style>
