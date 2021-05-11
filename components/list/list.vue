<template>
	<swiper class="home" @change="change" :current="activeIndex">
		<swiper-item class="swiper-item" v-for="(item, index) in tab" :key="item.name">
			<list-item @loadmore="loadmore(index)" :list="listCacheData[index] ? listCacheData[index].data : []"
				:loading="loading[index]"></list-item>
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
				currentIndex: 0,
				list: [],
				listCacheData: {},
				pageSize: 5,
				loading: {}
			};
		},
		watch:{
			tab(){
				this.listCacheData = {}
				this.loading={}
				this.initializeData()
			}
		},
		methods: {
			async change(e) {
				const {
					current
				} = e.detail
				this.$emit('change', current)
				// 如果没有缓存
				if (!this.isCaching(current)) {
					const category = this.getCategory(current)
					const page = 1
					const data = await this.getListData({
						category,
						page,
						pageSize: this.pageSize
					})
					this.setList(data)
					this.setListCacheData({
						data,
						page,
						index: current
					})
					this.setLoading(current, 'more')
				}
			},

			// 获取list数据
			async getListData(parmas = {
				category: "全部",
				page: 1,
				pageSize: 5
			}) {
				const {
					data
				} = await indexModel.getList(parmas)
				return data
			},

			// 设置list
			setList(data) {
				this.list = data
			},

			// 获取分类
			getCategory(index) {
				return this.tab[index].name
			},

			// 设置缓存
			setListCacheData(parmas = {
				index: 0,
				data: [],
				page: 1,
				loadingStatus: 'more'
			}) {
				const {
					index,
					data,
					page
				} = parmas
				// 这里使用this.$set是为了通知页面，需要进行数据更新
				this.$set(this.listCacheData, index, {
					data: data,
					loadedPage: page
				})
			},

			// 从缓存获取数据
			getListforCacheData(index) {
				return this.listCacheData[index]
			},

			// 判断该分类有没有缓存数据
			isCaching(index) {
				return this.listCacheData.hasOwnProperty(index)
			},

			// 加载更多
			async loadmore() {
				if (this.loading[this.activeIndex] === 'noMore') {
					this.setLoading(this.activeIndex, 'noMore')
					return
				}
				const cacheData = this.getListforCacheData(this.activeIndex)
				let page = cacheData.loadedPage + 1
				const category = this.getCategory(this.activeIndex)
				const data = await this.getListData({
					category,
					page,
					pageSize: this.pageSize
				})
				if (data.length) {
					this.setListCacheData({
						index: this.activeIndex,
						data: cacheData.data.concat(data),
						page,
					})
					this.setLoading(this.activeIndex, 'more')
				} else {
					this.setLoading(this.activeIndex, 'noMore')
				}
			},

			// 设置loading状态
			setLoading(index, status) {
				this.$set(this.loading,index,status)
			},
			
			// 初始化数据
			async initializeData(){
				const data = await this.getListData({
					category: "全部"
				})
				this.setList(data)
				this.setListCacheData({
					index: 0,
					data,
					page: 1
				})
				this.setLoading(this.activeIndex, 'more')
			}
		},
		
		created(){
			uni.$on('update_article', () => {
				console.log('更新点赞')
			})
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
