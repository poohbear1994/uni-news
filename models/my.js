import HTTP from '@/utils/http.js'

class MyModel extends HTTP{
	getUser(user_id){
		return this.request({
			url:'get_user',
			user_id
		})
	}
}

export {
	MyModel
}