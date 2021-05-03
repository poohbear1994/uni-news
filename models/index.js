import {
	HTTP
} from '../utils/http.js'

class IndexModel extends HTTP {
	get_label() {
		return this.request({
			url: 'get_label'
		})
	}
	get_list() {
		return this.request({
			url: 'get_list'
		})
	}
}

export {
	IndexModel
}
