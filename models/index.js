import {
	HTTP
} from '../utils/http.js'

class IndexModel extends HTTP {
	get_label() {
		return this.request({
			url: 'get_label'
		})
	}
}

export {
	IndexModel
}
