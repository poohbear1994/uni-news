<template>
	<view>
		<view class="comments-content" v-for="(item,index) in commentsList" :key="item.comment_id">
			<comment-box :comment="item" @reply="reply"></comment-box>
		</view>
		<view class="comment-btn" @click="comment">
			<uni-icons type="compose" size="30" color="#fff"></uni-icons>
			评论
		</view>
		<comment-popup :popupSwitch="popupSwitch"  @submit="submit"></comment-popup>
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
				article_id:'',
				commentsList:[],
				currentTarget:{},
				pageSize:10,
				page:1,
				lock: false,
				// 弹出层开关
				popupSwitch: 0,
				currentMode: 'comment'
			};
		},
		methods:{
			// 提交事件
			async submit(submitVal,finishCallback){
				const {comment} = this.getCurrentTarget()
				const currentMode = this.getCurrentMode()
				this.showLoading()
				let res = null
				if(currentMode === 'reply'){
					res = await indexModel.updateComment({
						article_id: this.article_id,
						content: submitVal,
						comment_id: comment.comment_id,
						reply_id: comment.reply_id,
						is_subReply: comment.reply_id ? true : false
					})					
				}else if(currentMode === 'comment'){
					res = await indexModel.updateComment({
						article_id: this.article_id,
						content: submitVal
					})
				}
				this.hideLoading()
				if(res.code === 200){
					uni.showToast({
						title:currentMode === 'comment'?'评论成功':'回复成功',
						icon:'none'
					})
				}
				finishCallback()
			},
			
			// 评论
			comment(){
				this.setCurrentMode('comment')
				const data = {
					article_id: this.article_id
				}
				this.setCurrentTarget({comment:data})
				this.openPopup()
			},
			
			// 回复
			reply(params){
				this.setCurrentMode('reply')
				this.setCurrentTarget(params)
				this.openPopup()
			},
			
			// 设置回复/评论的目标
			setCurrentTarget(obj){
				this.currentTarget = obj
			},
			
			// 设置当前模式是回复还是评论
			setCurrentMode(mode){
				this.currentMode = mode
			},
			
			// 获取当前的模式
			getCurrentMode(){
				return this.currentMode
			},
			
			// 获取当前目标
			getCurrentTarget(){
				return this.currentTarget
			},
			
			// 打开弹出层
			openPopup(){
				const timestamp = Date.parse(new Date())
				this.popupSwitch = timestamp
			},
			
			// 加载更多
			loadMore(){
				if(this.isLoacking()){
					return
				}
				this.addPage()
				this.getCommentListData(this.addCommentList,this.reducePage)
			},
			
			// 增加评论列表数据
			addCommentList(list){
				this.commentsList.push(...list)
				this.isNeedToLocked(list)
			},
			
			// 增加当前页数
			addPage(){
				this.page = this.page + 1
			},
			
			// 减少当前页
			reducePage(){
				this.page = this.page - 1
			},
			
			// 上锁
			locked(){
				this.lock = true
			},
			
			// 开锁
			unLock(){
				this.lock = false
			},
			
			// 是否上锁
			isLoacking(){
				return this.lock
			},
			
			// 是否需要上锁
			isNeedToLocked(list){
				// 如果list长度小于pageSize，则表示加载多了最后一页
				if(list.length < this.pageSize){
					this.locked()
				}
			},
			
			// 初始化评论列表
			initialCommentList(){
				this.getCommentListData(this.setCommentList)
			},
			
			// 获取评论列表数据
			async getCommentListData(successCb,failCb){
				this.showLoading()
				const {
					article_id,
					pageSize,
					page
				} = this
				const res = await indexModel.getComment({
					article_id,
					pageSize,
					page
				})
				this.hideLoading()
				if(res.code === 200){
					successCb(res.data)
				}else{
					wx.showToast({
						title:'网络不好，请稍后重试',
						icon:'none'
					})
					if(failCb){						
						failCb()
					}
				}
			},
			
			// 设置commenList
			setCommentList(list){
				this.commentsList = list
				this.isNeedToLocked(list)
			},
			
			// 开启loading
			showLoading(){
				uni.showLoading()
			},
			
			// 关闭loading
			hideLoading(){
				uni.hideLoading()
			},
			
			// 设置article_id
			setArticleId(article_id){
				this.article_id = article_id
			}
		},
		
		onLoad(query){
			this.setArticleId(query.id)
			this.initialCommentList()
		},
		
		// 页面触底事件
		onReachBottom(){
			this.loadMore()
		}
	}
</script>

<style lang="scss">
.comments-content{
	padding:0 15px;
}
.comment-btn{
	position: fixed;
	right: 10px;
	bottom: 60px;
	z-index: 9;
	width: 50px;
	height: 50px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 13px;
	color: #fff;
	background-color: #4CD964;
	border: 1px solid #00BFFF;
	padding: 10px;
	border-radius: 50%;
}
</style>
