class HTTP {
	request(params) {
		const {
			url,
			data,
			user_id
		} = params
		const dataObj = {
			user_id: uni.getStorageSync('user_id') || user_id,
			...data
		}
		return new Promise((resolve, reject) => {
			uniCloud.callFunction({
				name: url,
				data: dataObj
			}).then(res => {
				if (res.result.code === 200) {
					resolve(res.result)
				} else {
					reject(res.result)
				}
			}).catch(err => {
				reject(err)
			})
		})
	}
}

export default HTTP
