<template>
	<swiper class="home" @change="change" :current="activeIndex">
		<swiper-item class="swiper-item" v-for="(item, index) in tab" :key="item.name">
			<list-item :list="list"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	import {
		IndexModel
	} from '../../models/index.js'
	const indexModel = new IndexModel()
	export default {
		name: "list",
		components: {
			listItem
		},
		props: {
			tab: {
				type: Array,
				default () {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default () {
					return 0
				}
			}
		},
		data() {
			return {
				list: []
			};
		},
		methods: {
			change(e) {
				const {
					current
				} = e.detail
				this.$emit('change', current)
			},
			async getList() {
				const res = await indexModel.get_list()
				this.list = res.data
			}
		},
		created() {
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;

			.list-scroll {
				height: 100%;
			}
		}
	}
</style>
