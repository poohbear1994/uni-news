'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	// 获取分类
	const {
		user_id,
		category,
		page = 1,
		pageSize = 5
	} = event

	let matchObj = {}
	if (category !== '全部') {
		matchObj = {
			classify: category
		}
	}
	
	const userinfo = await db.collection('user').doc(user_id).get()
	const article_like_ids = userinfo.data[0].article_likes_ids
	
	// 通过分类获取对应的数据
	const list = await db.collection('article').aggregate().addFields({
		is_like:$.in(['$_id',article_like_ids])
	}).match(matchObj).project({
		content: false
	}).skip(pageSize * (page - 1)).limit(pageSize).end()

	return {
		code: 200,
		msg: `[云函数 ${context.FUNCTION_NAME}]调用成功`,
		data: list.data
	}
};
