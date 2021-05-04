<template>
	<list-scroll @loadmore="loadmore" class="list-scroll">
		<list-card v-for="item in list" :item="item" :key="item._id"/>
		<uni-load-more v-if="loadingStatus" iconType="snow" :status="loadingStatus" />
	</list-scroll>
</template>

<script>
	export default {
		name: 'listItem',
		props:{
			list:{
				type: Array,
				default() {
					return []
				}
			},
			loading:{
				type: String,
				default() {
					return 'loading'
				}
			}
		},
		data(){
			return {
				loadingStatus: 'loading'
			}
		},
		watch:{
			loading(newVal) {
				this.loadingStatus = newVal
			},
			list(newVal) {
				if(newVal.length!==0 && newVal.length < 5) {
					this.loadingStatus = 'noMore'
				}
			}
		},
		methods: {
			loadmore() {
				if(!this.loadingStatus||this.loadingStatus === 'noMore'){
					return
				}
				this.$emit('loadmore')
				this.loadingStatus = 'loading'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-scroll {
		height: 100%;
	}
</style>
