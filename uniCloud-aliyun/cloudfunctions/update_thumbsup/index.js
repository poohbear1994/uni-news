'use strict';
const db = uniCloud.database()
const dbCmd = db.command

exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event
	
	// 获取用户数据
	const user = await db.collection('user').doc(user_id).get()
	// 获取点赞数据
	let thumbs_up_article_ids = user.data[0].thumbs_up_article_ids
	
	let thumbs_ids = null
	if(thumbs_up_article_ids.includes(article_id)){
		return {
			code: 200,
			msg: `您已经点赞过了`,
		}
	} else {
		thumbs_ids = dbCmd.addToSet(article_id)
	}
	
	await db.collection('user').doc(user_id).update({
		thumbs_up_article_ids: thumbs_ids
	})
	
	await db.collection('article').doc(article_id).update({
		thumbs_up_count: dbCmd.inc(1)
	})
	
	return {
		code: 200,
		msg: `点赞成功`,
	}
};
