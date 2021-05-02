class  SystemInfo{
	constructor(arg) {
	   this.systemInfo = uni.getSystemInfoSync()
	}
	// 获取系统信息
	getSystemInfo() {
		console.log(this)
		return this.systemInfo
	}
	
	// 获取状态栏高度
	getStatusBarHeight() {
		return this.systemInfo.statusBarHeight
	}
}

export { SystemInfo }