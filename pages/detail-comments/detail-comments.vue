<template>
	<view>
		<view class="comments-content" v-for="(item,index) in commentsList" :key="item.comment_id">
			<comment-box :comment="item" ></comment-box>
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
				article_id:'',
				commentsList:[],
				pageSize:10,
				page:1,
				lock: false
			};
		},
		methods:{
			
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
</style>
