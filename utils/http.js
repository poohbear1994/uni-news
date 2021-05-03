class HTTP {
	request(params) {
		const {
			url,
			data
		} = params
		return new Promise((resolve, reject) => {
			uniCloud.callFunction({
				name: url,
				data
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
