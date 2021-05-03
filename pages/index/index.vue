<template>
	<view class="content">
		<navbar />
		<tab :list="tabList" @tab="tab"/>
		<view v-for="item in 100">
			{{item}}
		</view>
	</view>
</template>

<script>
	import {IndexModel} from '../../models/index.js'
	const indexModel = new IndexModel()
	export default {
		data() {
			return {
				tabList: []
			}
		},
		methods: {
			// 获取选项卡item
			async getLabel() {
				const labelRes = await indexModel.get_label()
				this.tabList = labelRes.data
			},
			tab({data,index}) {
				console.log(data.name, index)
			}
		},
		onLoad() {
			this.getLabel()
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
