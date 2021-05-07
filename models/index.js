import {
	HTTP
} from '../utils/http.js'

class IndexModel extends HTTP {
	// 获取categor
	getLabel() {
		return this.request({
			url: 'get_label'
		})
	}
	// 获取列表数据
	getList(data = {
		category: "全部",
		page: 1,
		pageSize: 5
	}) {
		return this.request({
			url: 'get_list',
			data
		})
	}
	// 更新收藏
	updateLike(data = {
		artcle_id: 0
	}) {
		return this.request({
			url: 'update_like',
			data
		})
	}
	// 搜索
	getSearch(value) {
		return this.request({
			url:'get_search',
			data:{
				value
			}
		})
	}
}

export {
	IndexModel
}
