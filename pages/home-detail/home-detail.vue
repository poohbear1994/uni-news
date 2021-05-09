<template>
	<view class="detail">
		<view class="detail-title">
			{{detailData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header__logo">
				<image :src="detailData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header__content">
				<view class="detail-header__content-title">
					{{detailData.author.author_name}}
				</view>
				<view class="detail-header__content-info">
					<text>{{detailData.create_time}}</text>
					<text>{{detailData.browse_count}} 浏览</text>
					<text>{{detailData.thumbs_up_count}} 赞</text>
				</view>
			</view>
		</view>
		<!-- 内容区 -->
		<view class="detail-content">
			<view class="detail-html">
				<u-parse :content="detailData.content" :noData="noData">	
					{{detailData.content}}
				</u-parse>
			</view>
		</view>
		<!-- 底部栏 -->
		<view class="detail-bottom">
			<view class="detail-bottom__input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#F07373"></uni-icons>
			</view>
			<view class="detail-bottom__icons">
				<view class="detail-bottom__icons-box">
					<uni-icons type="chat" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box">
					<uni-icons type="heart" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box">
					<uni-icons type="hand-thumbsup" size="22" color="#F07373"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header__item" @click="closeComment">取消</text>
					<text class="popup-header__item" @click="submitComment">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentsValue" maxlength="200" fixed placeholder="请输入评论内容" />
					<view class="popup-count">{{commentsValue.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import {
		IndexModel
	} from '../../models/index.js'
	const indexModel = new IndexModel()
	export default {
		components:{
			uParse
		},
		data() {
			return {
				detailData: {},
				noData:'<p style="text-align:center; color:#666">详情加载中...</p>',
				// 评论内容
				commentsValue:''
			};
		},
		methods:{
			// 请求文章详情
			async getDetailData(){
				const res = await indexModel.getDetail({
					article_id: this.detailData._id
				})
				return res.data
			},
			// 发布评论
			submitComment() {
				
			},
			// 打开评论区域
			openComment() {
				this.$refs.popup.open()
			},
			// 关闭评论区域
			closeComment() {
				this.$refs.popup.close()
			},
			// 设置预加载数据
			setPreloadData(query){
				this.detailData = this.analysisQuery(query)
			},
			// 设置详情数据
			setDetailData(data){
				this.detailData = data
			},
			// 解析通过query传递的数据
			analysisQuery(query){
				return JSON.parse(query.params)
			}
		},
		async onLoad(query){
			this.setPreloadData(query)
			const detailData = await this.getDetailData()
			this.setDetailData(detailData)
		}
	}
</script>

<style lang="scss">
	.detail{
		padding: 15px 0;
		padding-bottom: 54px;
		.detail-title{
			padding: 0 15px;
			font-size: 18px;
			font-weight: bold;
			color: #333;
		}
		.detail-header{
			display: flex;
			align-items: center;
			margin-top: 10px;
			padding: 0 15px;
			.detail-header__logo{
				flex-shrink: 0;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			
			.detail-header__content{
				width: 100%;
				padding-left: 10px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: 12px;
				.detail-header__content-title{
					font-size: 14px;
					color: #333;
				}
				.detail-header__content-info{
					color: #999;
					text{
						margin-right: 10px;
					}
				}
			}
		}
		.detail-content{
			margin-top: 20px;
			min-height: 500px;
			.detail-html {
				padding: 0 15px;
			}
		}
			
		.detail-bottom{
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			align-items: center;
			width: 100%;
			height: 44px;
			border-top: 1px solid #f5f5f5f;
			background-color: #fff;
			box-sizing: border-box;
			.detail-bottom__input{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-left: 10px;
				padding: 0 10px;
				width: 100%;
				height: 30px;
				border: 1px solid #ddd;
				border-radius: 5px;
				text{
					font-size: 14px;
					color: #999;
				}
			}
			.detail-bottom__icons{
				display: flex;
				flex-shrink: 0;
				padding: 0 10px;
				.detail-bottom__icons-box{
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 44px;
				}
			}
		}
		
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
	}
</style>
