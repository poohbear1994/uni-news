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
		article_id: 0
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
		article_id: 0
	}) {
		return this.request({
			url: 'get_detail',
			data: {
				article_id
			}
		})
	}
}

export {
	IndexModel
}
