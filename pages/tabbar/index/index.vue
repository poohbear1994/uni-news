<template>
	<view class="home">
		<navbar />
		<tab :list="tabList" :tabIndex="tabIndex" @tab="tab" />
		<view class="home-list">
			<list :tab="tabList" @change="change" :activeIndex="activeIndex" :types="types"></list>
		</view>
	</view>
</template>

<script>
	import {
		IndexModel
	} from '@/models/index.js'
	const indexModel = new IndexModel()
	export default {
		data() {
			return {
				tabList: [],
				tabIndex: 0,
				activeIndex: 0,
				types:'index'
			}
		},
		methods: {
			// 获取选项卡item
			async getLabel() {
				const {
					data
				} = await indexModel.getLabel()
				data.unshift({
					name: '全部'
				})
				this.tabList = data
			},
			tab({
				data,
				index
			}) {
				this.activeIndex = index
			},
			change(current) {
				this.tabIndex = current
				this.activeIndex = current
			}
		},
		onLoad() {
			uni.$on('labelChange',() => {
				this.getLabel()
				this.tabIndex = 0,
				this.activeIndex = 0
			})
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
