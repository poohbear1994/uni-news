'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	// 获取分类
	const {
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
	console.log(matchObj)
	// 通过分类获取对应的数据
	const list = await db.collection('article').aggregate().match(matchObj).project({
		content: false
	}).skip(pageSize * (page - 1)).limit(pageSize).end()

	return {
		code: 200,
		msg: `[云函数 ${context.FUNCTION_NAME}]调用成功`,
		data: list.data
	}
};
