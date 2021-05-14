import HTTP from '@/utils/http.js'

class MyModel extends HTTP{
	// 获取用户信息
	getUser(user_id){
		return this.request({
			url:'get_user',
			user_id
		})
	}
	
	// 获取我的文章
	getMyArticle(){
		return this.request({
			url:'get_my_article'
		})
	}
	
	// 意见反馈
	update_feedback({
		feedbackImages,
		content
	}={
		feedbackImages:[],
		content:''
	}){
		return this.request({
			url: 'update_feedback',
			data:{
				feedbackImages,
				content
			}
		})
	}
}

export {
	MyModel
}