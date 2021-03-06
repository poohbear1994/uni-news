'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
	
	const {
		user_id = ''
	} = event
	
	if(!user_id){
		return {
			code:301,
			msg: '获取用户信息失败'
		}
	}
	const userinfo =await db.collection('user').doc(user_id).get()
	
	return {
		code: 200,
		msg: `[云函数 ${context.FUNCTION_NAME}]调用成功`,
		data: userinfo.data[0]
	}
};
