<template>
	<view>
		<uni-load-more v-if="!list.length" status="loading"></uni-load-more>
		<list-card :item="item" v-for="item in list" :key="item._id"></list-card>
		<view class="no-data" v-if="list.length===0 && noArticle">
			你还未发布任何文章
		</view>
	</view>
</template>

<script>
	import {
		MyModel
	} from '@/models/my.js'
	const myModel = new MyModel()
	export default {
		data() {
			return {
				list:[],
				noArticle:false
			};
		},
		methods:{
			// 数据初始化
			async initialData(){
				const res = await myModel.getMyArticle()
				if(res.code === 200){			
					if(res.data.length === 0){
						this.noArticle = true
						return
					}
					this.list = res.data
				}
			}
		},
		onLoad() {
			this.initialData()
		}
	}
</script>

<style lang="scss">
.no-data {
	padding: 50px;
	font-size: 14px;
	color: #999;
	text-align: center;
}
</style>
