class HTTP {
	request(params) {
		const {
			url,
			data,
		} = params
		const dataObj = {
			user_id : '608e47a79abec80001c2ce32',
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

export {
	HTTP
}
