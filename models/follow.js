import HTTP from '@/utils/http.js'

class FollowModel extends HTTP{
	// 获取关注的文章
	getFollow(){
		return this.request({
			url:'get_follow'
		})
	}
	
	// 获取关注的作者
	getAuthor(){
		return this.request({
			url:'get_author'
		})
	}
}

export {
	FollowModel
}