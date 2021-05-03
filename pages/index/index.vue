<template>
	<view class="home">
		<navbar />
		<tab :list="tabList" :tabIndex="tabIndex" @tab="tab" />
		<view class="home-list">
			<list :tab="tabList" @change="change" :activeIndex="activeIndex"></list>
		</view>
	</view>
</template>

<script>
	import {
		IndexModel
	} from '../../models/index.js'
	const indexModel = new IndexModel()
	export default {
		data() {
			return {
				tabList: [],
				tabIndex: 0,
				activeIndex: 0
			}
		},
		methods: {
			// 获取选项卡item
			async getLabel() {
				const labelRes = await indexModel.get_label()
				this.tabList = labelRes.data
			},
			tab({
				data,
				index
			}) {
				this.activeIndex = index
			},
			change(current) {
				this.tabIndex = current
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
		overflow: hidden;

		.home-list {
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
