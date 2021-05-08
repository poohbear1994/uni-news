'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		type
	} = event
	let matchObj = {}
	if(type !== 'all'){
		matchObj = {
			current: true
		}
	}
	
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	
	const label = await db.collection('label').aggregate().addFields({
		current: $.in(['$_id',$.ifNull([userinfo.label_ids,[]])])
	}).match(matchObj).end()
	
	return {
		code: 200,
		msg: `[云函数 ${context.FUNCTION_NAME}]调用成功`,
		data: label.data
	}
};
