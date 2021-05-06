<template>
	<view>
		<view class="icons" @click.stop="likeTap">
			<uni-icons size="20" color="#f07373" :type="like?'heart-filled':'heart'" />
		</view>
	</view>
</template>

<script>
	import { IndexModel } from '../../models/index.js'
	const indexModel = new IndexModel()
	export default {
		name:"like",
		props:{
			item: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		watch:{
			item(newVal) {
				this.like = newVal.is_like
			}
		},
		data() {
			return {
				like: false
			};
		},
		methods:{
			likeTap() {
				this.like = !this.like
				this.updateLikes()
			},
			async updateLikes() {
				uni.showLoading()
				const res = await indexModel.updateLike({
					article_id: this.item._id
				})
				console.log(res)
				uni.hideLoading()
				uni.showToast({
					title:this.like?'收藏成功':'取消收藏',
					icon:'success'
				})
			}
		},
		created() {
			// console.log(this.item)
			this.like = this.item.is_like
		}
	}
</script>

<style lang="scss">
	.icons {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width:  20px;
		height: 20px;
	}
</style>
