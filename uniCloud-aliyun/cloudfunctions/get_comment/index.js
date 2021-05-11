'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {
	const {
		user_id,
		article_id,
		pageSize=10,
		page=1
	} = event
	
	const list = await db.collection('article')
	.aggregate()
	.match({
		_id: article_id
	})
	.unwind('$comments')
	.project({
		_id: false,
		comments: true
	})
	.replaceRoot({
		newRoot: '$comments'
	})
	.skip(pageSize*(page-1))
	.limit(pageSize)
	.end()
	
	return {
		code: 200,
		msg: `[云函数 ${context.FUNCTION_NAME}]调用成功`,
		data: list.data
	}
};
