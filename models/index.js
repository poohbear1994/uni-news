import {
	HTTP
} from '../utils/http.js'

class IndexModel extends HTTP {
	getLabel() {
		return this.request({
			url: 'get_label'
		})
	}
	getList(data) {
		return this.request({
			url: 'get_list',
			data
		})
	}
}

export {
	IndexModel
}
