'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	// 获取分类
	const {
		user_id,
		value
	} = event

	const userinfo = await db.collection('user').doc(user_id).get()
	const article_like_ids = userinfo.data[0].article_likes_ids

	// 通过分类获取对应的数据
	const list = await db.collection('article').aggregate().addFields({
		is_like: $.in(['$_id', article_like_ids])
	}).project({
		content: false
	}).match({
		title: new RegExp(value)
	}).end()

	return {
		code: 200,
		msg: `[云函数 ${context.FUNCTION_NAME}]调用成功`,
		data: list.data
	}
};
