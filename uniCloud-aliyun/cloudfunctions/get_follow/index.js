'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id
	} = event
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	
	const list = await db.collection('article')
	.aggregate()
	.addFields({
		is_like: $.in(['$_id', userinfo.article_likes_ids])
	})
	.project({
		content: false
	})
	.match({
		is_like: true
	})
	.end()
	
	return {
		code: 200,
		msg: `[云函数 ${context.FUNCTION_NAME}]调用成功`,
		data: list.data
	}
};
