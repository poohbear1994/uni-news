'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		author_id
	} = event
	
	// 获取用户关注的作者数据
	const user = await db.collection('user').doc(user_id).get()
	const author_likes_ids = user.data[0].author_likes_ids
	
	let author_ids = null
	// 判断是 关注/取消关注
	if(author_likes_ids.includes(author_id)){
		// 取消关注
		author_ids = dbCmd.pull(author_id)
	}else{
		// 关注
		author_ids = dbCmd.addToSet(author_id)
	}
	
	await db.collection('user').doc(user_id).update({
		author_likes_ids: author_ids
	})
	
	return {
		code: 200,
		msg: `[云函数 ${context.FUNCTION_NAME}]调用成功`,
	}
};
