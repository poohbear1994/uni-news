import {
	HTTP
} from '../utils/http.js'

class IndexModel extends HTTP {
	// 获取category
	getLabel({
		type
	} = {type:''}) {
		return this.request({
			url: 'get_label',
			data: {
				type
			}
		})
	}
	
	// 获取列表数据
	getList({
		category,
		page,
		pageSize
	} = {
		category: "全部",
		page: 1,
		pageSize: 5
	}) {
		return this.request({
			url: 'get_list',
			data: {
				category,
				page,
				pageSize
			}
		})
	}
	
	// 更新收藏
	updateLike({
		article_id
	} = {
		article_id: ''
	}) {
		return this.request({
			url: 'update_like',
			data: {
				article_id
			}
		})
	}
	
	// 搜索
	getSearch(value) {
		return this.request({
			url: 'get_search',
			data: {
				value
			}
		})
	}
	
	// 更新我的标签
	updateLabel({
		label
	} = {label : []}) {
		return this.request({
			url: 'update_label',
			data: {
				label
			}
		})
	}
	
	// 获取文章详情
	getDetail({
		article_id
	} = {
		article_id: ''
	}) {
		return this.request({
			url: 'get_detail',
			data: {
				article_id
			}
		})
	}
	
	// 获取评论
	getComment({
		article_id
	}={
		article_id:''
	}){
		return this.request({
			url: 'get_comment',
			data:{
				article_id
			}
		})
	}
	
	// 更新评论
	updateComment({
		article_id,
		content,
		comment_id,
		reply_id,
		is_subReply
	} = {
		article_id: '',
		content: '',
		comment_id: '',
		reply_id: '',
		is_subReply: false
	}){
		return this.request({
			url: 'update_comment',
			data:{
				article_id,
				content,
				comment_id,
				reply_id,
				is_subReply
			}
		})
	}
	
	// 更新作者（关注，取消关注）
	updateAuthor({
		author_id
	}={
		author_id: ''
	}){
		return this.request({
			url: 'update_author',
			data:{
				author_id
			}
		})
	}
	
	// 文章点赞
	updateThumbsUp({
		article_id
	}={
		article_id: ''
	}){
		return this.request({
			url: 'update_thumbsup',
			data:{
				article_id
			}
		})
	}
}

export {
	IndexModel
}
