<template>
	<view class="home">
		<navbar :isSearch="true" @input="change" :searchWord="searchWord"></navbar>
		<view class="home-list">
			<view v-if="is_history" class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear">清空</text>
				</view>
				<view class="label-content">
					<view @click="tagClick(item)" v-if="historyList.length > 0" class="label-content__item" v-for="item in historyList">
						{{item}}
					</view>
					<view v-if="historyList.length === 0" class="no-data">暂无搜索历史</view>
				</view>
			</view>
			<view v-else>			
				<uni-load-more v-if="loadingStatus" iconType="snow" status="loading" />
				<list-scroll v-if="searchList.length > 0" >
					<list-card @click="goDetail" v-for="item in searchList" :item="item" :key="item._id"/>
				</list-scroll>
				<view v-if="noResult" class="no-result">没有相关搜索数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import {
		IndexModel
	} from '../../models/index.js'
	const indexModel = new IndexModel()
	export default {
		data() {
			return {
				is_history: true,
				searchList: [],
				loadingStatus: false,
				searchWord: '',
				noResult: false
			};
		},
		computed:{
			...mapState(['historyList'])
		},
		methods: {
			change(value) {
				this.hideHistory()
				this.setSearchWord(value)
				this.hideNoResult()
				if(!value){
					clearTimeout(this.timer)
					this.mark = false
					this.clearSearchList()
					this.showHistory()
					return
				} 
				if(!this.mark) {
					this.mark = true
					this.timer = setTimeout(() => {
						this.getSearchListData(value)
						.then(data => {
							this.setSearchList(data)
							this.hideLoading()
							if(!data.length){
								this.showNoResult()
							}
						})
						this.mark = false
					},300)
				}
			},
			// 获取搜索数据
			async getSearchListData(value) { 
				if(!value){
					this.clearSearchList()
					this.showHistory()
					return
				}
				this.showLoading()
				const {
					data
				} = await indexModel.getSearch(value)
				return data
			},
			// 设置搜索列表
			setSearchList(data) {
				this.searchList = data
			},
			// 清空搜索列表
			clearSearchList() {
				this.searchList = []
			},
			// 进入详情页
			goDetail(item) {
				this.addHistory()
			},
			// 添加搜索历史
			addHistory(){
				this.$store.dispatch('add_history',this.searchWord)
			},
			// 设置searchWord
			setSearchWord(word){
				this.searchWord = word
			},
			// 标签点击事件
			tagClick(item){
				this.clearSearchList()
				this.searchWord = item
				this.change(item)
			},
			// 展示历史记录
			showHistory() {
				this.is_history = true
			},
			// 隐藏历史记录
			hideHistory() {
				this.is_history = false
			},
			// 显示loading
			showLoading() {
				this.loadingStatus = true
			},
			// 隐藏loading
			hideLoading() {
				this.loadingStatus = false
			},
			// 显示nodata
			showNoResult() {
				this.noResult = true
			},
			// 隐藏nodata
			hideNoResult() {
				this.noResult = false
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		border: 1px solid red;

		.home-list {
			.label-box {
				background-color: #fff;
				margin-bottom: 10px;
				.label-header {
					display: flex;
					justify-content: space-between;
					font-size: 14px;
					color: #666;
					padding: 10px 15px;
					border-bottom: 1px solid #f5f5f5;
					.label-title {
						color: $mk-base-color;
					}
					.label-clear {
						color: #30b33a;
						font-weight: bold;
					}
				}
				.label-content {
					display: flex;
					flex-wrap: wrap;
					padding: 15px;
					padding-top: 0;
					.label-content__item {
						padding: 2px 10px;
						margin-top: 12px;
						margin-right: 10px;
						border-radius: 5px;
						border: 1px solid #666;
						font-size: 14px;
						color: #666;
					}
					.no-data {
						height: 200px;
						line-height: 200px;
						width: 100%;
						font-size: 12px;
						text-align: center;
						color: #666;
					}
				}
			}
			.no-result {
				height: 200px;
				line-height: 200px;
				width: 100%;
				font-size: 12px;
				text-align: center;
				color: #666;
			}
		}
	}
</style>
