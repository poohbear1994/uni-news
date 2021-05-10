'use strict';

const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command

exports.main = async (event, context) => {

	const {
		user_id,
		article_id,
		content,
		comment_id='',
		// 子回复ID
		reply_id='',
		is_subReply=false
	} = event
	
	// 获取用户数据
	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]

	// 获取文章数据
	let article = await db.collection('article').doc(article_id).get()
	// 获取该文章下的评论
	let comments = article.data[0].comments


	let commentObj = {
		comment_id: getID(5),
		comment_content: content,
		create_time: new Date().getTime(),
		// 区分是子回复还是主回复
		is_subReply,
		author: {
			author_id: user._id,
			author_name: user.author_name,
			avatar: user.avator,
			// 专业
			professional: user.professional
		},
		// 回复
		replys: []
	}

	// 评论
	if (!comment_id) {
		commentObj.replys = []
		commentObj = dbCmd.unshift(commentObj)
	} else { 
		// 回复
		// 获取该条评论的在评论数组中的索引
		let commentIndex = comments.findIndex(item => item.comment_id === comment_id)
		let commentAuthor = ''
		if(is_subReply){
			// 子回复
			commentAuthor = comments[commentIndex].replys.find(item => item.comment_id === reply_id)
		}else{
			// 主回复
			// 获取作者信息
			commentAuthor = comments.find(item => item.comment_id === comment_id)
		}
		commentAuthor = commentAuthor.author.author_name
		commentObj.to = commentAuthor

		// 更新回复信息
		commentObj = {
			[commentIndex]: {
				replys: dbCmd.unshift(commentObj)
			}
		}
	}

	// 向文章数据中插入评论
	await db.collection('article').doc(article_id).update({
		comments: commentObj
	})

	return {
		code: 200,
		msg: `[云函数 ${context.FUNCTION_NAME}]调用成功`,
	}
};

function getID(length) {
	return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}
