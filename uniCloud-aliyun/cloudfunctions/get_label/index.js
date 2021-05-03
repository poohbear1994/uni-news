'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const label = await db.collection('label').get()
	return {
		code: 200,
		msg: `[云函数 ${context.FUNCTION_NAME}]调用成功`,
		data: label.data
	}
};
