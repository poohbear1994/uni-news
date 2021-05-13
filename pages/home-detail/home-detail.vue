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
			<button class="detail-header__button" type="default" @click="follow(detailData.author.id)">{{detailData.is_author_like?'取消关注':'关注'}}</button>
		</view>
		<!-- 内容区 -->
		<view class="detail-content">
			<view class="detail-html">
				<u-parse :content="detailData.content" :noData="noData">	
					{{detailData.content}}
				</u-parse>
			</view>
			<!-- 评论区 -->
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view v-if="commentsList.length > 0">		
					<view class="comment-content" v-for="item in commentsList" :key="item.comment_id">
						<comment-box :comment="item" @reply="reply"></comment-box>
					</view>
				</view>
				<view v-else class="comment-no__content">
					暂无评论
				</view>
			</view>
		</view>
		<!-- 底部栏 -->
		<view class="detail-bottom">
			<view class="detail-bottom__input" @click="openPopup('comment')">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#F07373"></uni-icons>
			</view>
			<view class="detail-bottom__icons">
				<view class="detail-bottom__icons-box">
					<uni-icons type="chat" size="22" color="#F07373" @click="jumpToDetailComments"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box">
					<uni-icons :type="detailData.is_like ? 'heart-filled' : 'heart'" size="22" color="#F07373" @click="likeTap" ></uni-icons>
				</view>
				<view class="detail-bottom__icons-box">
					<uni-icons :type="detailData.is_thumbs_up? 'hand-thumbsup-filled':'hand-thumbsup' " size="22" color="#F07373" @click="thumbsUp(detailData._id)"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 弹出层 -->
		<comment-popup :popupSwitch="popupSwitch"  @submit="submit"></comment-popup>
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
				// 评论数据
				commentsList:[],
				// 回复的评论
				commentOfReply:{},
				// 当前的模式是评论还是回复
				currentMode:'comment',
				// 当前是否是子回复
				isSubReply: false,
				// 弹出层开关
				popupSwitch: 0,
			};
		},
		methods:{
			// 发布评论/回复
			async submit(textareaVal,finishCallback) {
				uni.showLoading()
				let data = null
				if(this.currentMode === 'comment'){	
					data = this.setPostCommentData(textareaVal)
				}else if(this.currentMode === 'reply'){
					const currentComment = this.getCommentOfReply()
					data = this.setPostReplyData(currentComment, textareaVal)
				}
				const res = await indexModel.updateComment(data)
				uni.hideLoading()
				this.setIsSubReply(false)
				// 返回结果
				if(res.code === 200){
					uni.showToast({
						title:this.currentMode === 'comment'?'评论成功':'回复成功',
						icon:'success'
					})
					finishCallback()
					return
				}else{
					uni.showToast({
						title:'请检查网络',
						icon:'none'
					})
				}
			},
			
			// 设置上传的评论数据
			setPostCommentData(textareaVal) {
				const comment = textareaVal
				const article_id = this.detailData._id
				return {
					article_id,
					content: comment
				}
			},
			
			// 回复评论
			reply(params){
				this.openComment('reply')
				this.setCommentOfReply(params.comment)
				if(params.comment.reply_id){
					this.setIsSubReply(true)
				}
			},
			
			// 设置回复哪条评论
			setCommentOfReply(comment){
				this.commentOfReply = comment
			},
			
			// 获取回复哪条评论
			getCommentOfReply(){
				return this.commentOfReply
			},
			
			// 设置是否回复回复
			setIsSubReply(bool){
				this.isSubReply = bool
			},
			
			// 处理需要上传的回复评论数据
			setPostReplyData(comment, textareaVal){
				const replyData = {
					article_id: this.detailData._id,
					comment_id: comment.comment_id,
					content: textareaVal
				}
				if(this.isSubReply){
					replyData.reply_id = comment.reply_id
					replyData.is_subReply = this.isSubReply
				}
				 return replyData
			},
			
			// 关注 / 取消关注
			async follow(author_id){
				let followState = this.isFollow()
				uni.showLoading()
				const res = await indexModel.updateAuthor({
					author_id
				})
				uni.hideLoading()
				if(res.code === 200){
					uni.$emit('update_author')
					wx.showToast({
						title: followState ? '已取消关注' : '关注成功',
						icon: followState ? 'none' : 'success'
					})
					this.changeFollowState()
					followState = this.isFollow()
				}else{
					wx.showToast({
						title:'网络不好，稍后重试',
						icon:'none'
					})
				}
			},
			
			// 是否关注当前作者
			isFollow(){
				return this.detailData.is_author_like
			},
			
			// 切换关注状态
			changeFollowState(){
				this.detailData.is_author_like = !this.detailData.is_author_like
			},
			
			// 收藏事件
			async likeTap(){
				const likeState = this.isLike()
				uni.showLoading()
			  const res =	await indexModel.updateLike({
					article_id: this.detailData._id
				})
				uni.hideLoading()
				if(res.code === 200) {
					this.changeLikeState()
					uni.$emit('update_article',{item:this.detailData,type:'index'})
					wx.showToast({
						title: likeState? '取消收藏':'已收藏',
						icon: 'none'
					})
				}else{
					wx.showToast({
						title:'网络不好，稍后重试',
						icon:'none'
					})
				}
			},
			
			// 是否已收藏该文章
			isLike(){
				return this.detailData.is_like
			},
			
			// 切换收藏状态
			changeLikeState(){
				this.detailData.is_like = !this.detailData.is_like
			},
			
			// 点赞事件
			async thumbsUp(article_id){
				if(this.isThumbsUp()){
					wx.showToast({
						title: '您已经点赞过',
						icon: 'none'
					})
					return
				}
				uni.showLoading()
				const res = await indexModel.updateThumbsUp({
					article_id
				})
				uni.hideLoading()
				if(res.code === 200){			
					this.changeThumbsUp()
					wx.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			},
			
			// 判断是否已经点赞过
			isThumbsUp(){
				return this.detailData.is_thumbs_up
			},
			
			// 改变点赞状态
			changeThumbsUp(){
				this.detailData.is_thumbs_up = !this.detailData.is_thumbs_up
				this.detailData.thumbs_up_count += 1
			},
			
			// 设置当前模式
			setCurrentMode(mode){
				this.currentMode = mode
			},
			
			// 打开评论区域
			openPopup(mode) {
				this.setCurrentMode(mode)
				const timestamp = Date.parse(new Date())
				this.popupSwitch = timestamp
			},
			
			// 设置评论数据
			setCommentsList(data) {
				this.commentsList = data
			},
			
			// 设置预加载数据
			setPreloadData(query){
				this.detailData = this.analysisQuery(query)
			},
			
			// 设置详情数据
			setDetailData(data){
				this.detailData = data
			},
			
			// 跳转到评论页
			jumpToDetailComments(){
				uni.navigateTo({
					url:`../detail-comments/detail-comments?id=${this.detailData._id}`
				})
			},
			
			// 获取文章详情
			async getDetailData(){
				const res = await indexModel.getDetail({
					article_id: this.detailData._id
				})
				return res.data
			},
			
			// 获取文章评论
			async getComments(){
				const res = await indexModel.getComment({
					article_id: this.detailData._id
				})
				return res.data
			},
			
			// 解析通过query传递的数据
			analysisQuery(query){
				return JSON.parse(query.params)
			},
		},
		
		async onLoad(query){
			this.setPreloadData(query)
			const detailData = await this.getDetailData()
			this.setDetailData(detailData)
			const commentsListData = await this.getComments()
			this.setCommentsList(commentsListData)
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
			.detail-header__button{
				flex-shrink: 0;
				height: 30px;
				font-size: 12px;
				color: #fff;
				background-color: $mk-base-color;
			}
		}
		.detail-content{
			margin-top: 20px;
			min-height: 500px;
			.detail-html {
				padding: 0 15px;
			}
			.detail-comment{
				margin-top: 30px;
				.comment-title{
					padding: 10px 15px;
					font-size: 14px;
					color: #666;
					border-bottom: 1px solid #f5f5f5;
				}
				.comment-content{
					padding: 0 15px;
					border-top: 1px solid #eee;
				}
				.comment-no__content{
					font-size: 14px;
					text-align: center;
					padding: 10px 15px;
				}
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
