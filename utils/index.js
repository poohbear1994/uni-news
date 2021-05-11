const parseTime = (time) => {

	if (time === 'string') {
		time = parseInt(time)
	}
	const date = new Date(time)
	const formAtDate = {
		y: date.getFullYear(),
		m: date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 ,
		d: date.getUTCDate(),
		h: date.getHours(),
		min: date.getMinutes(),
		s: date.getSeconds()
	}

	const {
		y,
		m,
		d,
		h,
		min,
		s
	} = formAtDate

	return `${y}-${m}-${d} ${h}:${min}`
}

export {
	parseTime
}
