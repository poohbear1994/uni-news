<template>
	<view class="home">
		<navbar />
		<tab :list="tabList" @tab="tab"/>
		<list-scroll>
			
		</list-scroll>
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
	page {
		height: 100%;
		display: flex;
	}
	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		border: 1px solid red;
	}
</style>
