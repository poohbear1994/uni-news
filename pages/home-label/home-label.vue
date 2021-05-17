<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editLabel">{{is_edit?'完成':'编辑'}}</view>
			</view>
			<view class="label-content">
				<view v-if="loadingStatus" class="loading">			
					<uni-load-more iconType="snow" status="loading"/>
				</view>
				<view class="label-content__item" v-for="item in listOfMyLabels" :key="item.name">
					{{item.name}}
					<uni-icons v-if="is_edit" type="clear" size="20" color="red" class="icons-close"
						@click="cancelLabel(item)" />
				</view>
				<view class="edit-tip" v-if="is_edit">点击下方标签添加至我的标签</view>
				<view class="edit-tip" v-if="!loadingStatus&&!is_edit">点击编辑按钮编辑我的标签</view>
			</view>
		</view>
		<view v-if="is_edit" class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<view class="label-content">
				<view class="label-content__item" v-for="item in listOfRecommendLabels"
					:key="item.name" @click="addToListOfMyLabels(item)">{{item.name}}</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		IndexModel
	} from '../../models/index.js'
	const indexModel = new IndexModel()
	export default {
		data() {
			return {
				is_edit: false,
				listOfAllLabels: [],
				listOfMyLabels: [],
				listOfRecommendLabels: [],
				loadingStatus: true,
				originalMyLabels:[]
			};
		},
		watch: {
			listOfAllLabels(newval,oldVal) {
				this.setListOfMyLabelsAndListOfRecommendLabels()
			}
		},
		methods: {
			async editLabel() {
				this.is_edit = !this.is_edit
				const status = this.is_edit ? 'edit' : 'finish'
				if (status === 'finish') {
					const ids = this.getIdForListOfMyLabels()
					const data = await indexModel.updateLabel({
						label: ids
					})
					uni.showLoading()
					if(data.code === 200){
						uni.showToast({
							title:'编辑成功',
							icon:'success'
						})
						uni.hideLoading()
						uni.$emit('labelChange')
					}
				}
			},
			// 获取标签数据
			async getLabel() {
				const res = await indexModel.getLabel({
					type: 'all'
				})
				return res.data
			},
			// 设置所有标签
			setListOfAllLabels(data) {
				this.listOfAllLabels = data
			},
			// 设置我的标签与推荐标签
			setListOfMyLabelsAndListOfRecommendLabels() {
				const listOfMyLabels = []
				const listOfRecommendLabels = []
				for (let item of this.listOfAllLabels) {
					if (item.current) {
						listOfMyLabels.unshift(item)
					} else {
						listOfRecommendLabels.unshift(item)
					}
				}
				this.listOfMyLabels = listOfMyLabels
				this.listOfRecommendLabels = listOfRecommendLabels
			},
			// 取消标签
			cancelLabel(item) {
				item.current = false
				this.setListOfAllLabels([...this.listOfMyLabels, ...this.listOfRecommendLabels])
			},
			// 添加推荐标签到我的标签
			addToListOfMyLabels(item) {
				item.current = true
				this.setListOfAllLabels([...this.listOfMyLabels, ...this.listOfRecommendLabels])
			},
			// 获取我的标签列表的id
			getIdForListOfMyLabels(){
				const ids = []
				for (let item of this.listOfMyLabels) {
					ids.push(item._id)
				}
				return ids
			},
			// 关闭loading
			closeLoading() {
				this.loadingStatus = false
			}
		},
		async onLoad() {
			const data = await this.getLabel()
			this.setListOfAllLabels(data)
			this.closeLoading()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.label {
		.label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px solid #f5f5f5;

				.label-edit {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;
				.loading{
					width: 100%;
				}
				.label-content__item {
					position: relative;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px solid #666;
					font-size: 14px;
					color: #666;

					.icons-close {
						position: absolute;
						top: -10px;
						right: -10px;
						background-color: #fff;
						border-radius: 50%;
					}
				}
				.edit-tip {
					height: 30px;
					line-height: 30px;
					font-size: 12px;
					text-align: center;
					width: 100%;
					color: #666;
					padding-top: 15px;
				}
			}
		}
	}
</style>
