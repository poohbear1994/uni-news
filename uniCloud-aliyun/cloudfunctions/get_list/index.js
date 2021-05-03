'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const list = await db.collection('article').field({
		content: false
	}).get()

	return {
		code: 200,
		msg: `[云函数 ${context.FUNCTION_NAME}]调用成功`,
		data: list.data
	}
};
