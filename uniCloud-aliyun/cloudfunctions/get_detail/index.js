'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	// 解析参数
	const {
		user_id,
		article_id
	} = event

	// 获取用户数据
	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]
	// 获取文章列表数据
	let list = await db.collection('article').aggregate().addFields({
		// 是否是喜欢的作者
		is_author_like: $.in(['$author.id', user.author_likes_ids]),
		// 是否是收藏的文章
		is_like: $.in(['$_id', user.article_likes_ids]),
		// 是否点赞
		is_thumbs_up: $.in(['$_id', user.thumbs_up_article_ids])
	}).match({
		_id: article_id
	}).project({
		coments: false
	}).end()
	console.log(list)

	return {
		code: 200,
		msg: `[云函数 ${context.FUNCTION_NAME}]调用成功`,
		data: list.data[0]
	}
};
