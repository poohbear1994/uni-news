<template>
	<view class="follow">
		<view class="follow-tab">
			<view class="follow-tab__box">
				<view class="follow-tab__item" :class="{active: activeIndex === 0}" @click="tab(0)">文章</view>
				<view class="follow-tab__item" :class="{active: activeIndex === 1}" @click="tab(1)">作者</view>
			</view>
		</view>
		<view class="follow-list">
			<swiper class="follow-list__swiper" :current="activeIndex" @change="change">
				<swiper-item>
					<list-scroll>
						<uni-load-more v-if="articleList.length === 0 && !noArticle" iconType="snow" status="loading">
						</uni-load-more>
						<list-card v-for="(item, index) in articleList" :item="item" :key="item._id" types="follow"></list-card>
						<view class="no-data" v-if="articleList.length === 0 && noArticle">
							你还没有收藏文章哦
						</view>
					</list-scroll>
				</swiper-item>
				<swiper-item>
					<list-scroll>
						<uni-load-more v-if="articleList.length === 0 && !noAuthor" iconType="snow" status="loading">
						</uni-load-more>
						<list-author v-for="(item, index) in authorList" :item="item" :key="item.id"></list-author>
						<view class="no-data" v-if="authorList.length === 0 && noAuthor">
							你还没有关注的作者哦
						</view>
					</list-scroll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		FollowModel
	} from '@/models/follow.js'
	const followModel = new FollowModel()
	export default {
		data() {
			return {
				activeIndex: 0,
				articleList: [],
				authorList: [],
				noArticle: false,
				noAuthor: false
			}
		},
		methods: {
			// 切换选项卡
			change(e){
				this.activeIndex = e.detail.current
			},
			
			// 取消关注文章
			cancelFollowArticle({
				item,
				type
			}) {
				if(type === 'follow'){
					this.articleFilter(item._id)
				}
			},

			// 根据id过滤掉取消关注的文章
			articleFilter(id) {
				const articleList = this.articleList.filter((item) => {
					return item._id !== id
				})
				this.articleList = articleList
			},
			
			// 获取关注的作者
			async getAuthorData() {
				const res = await followModel.getAuthor()
				if (res.code === 200) {
					this.authorList = res.data
					this.noAuthor = true
				} else {
					uni.showToast({
						title: '网络不好，稍后重试',
						icon: 'none'
					})
				}
			},

			// 获取关注的文章
			async getFollowData() {
				const res = await followModel.getFollow()
				if (res.code === 200) {
					this.articleList = res.data
					this.noArticle = true
				} else {
					uni.showToast({
						title: '网络不好，稍后重试',
						icon: 'none'
					})
				}
			},

			// 切换选项卡
			tab(index) {
				this.activeIndex = index
			}
		},
		onLoad() {
			this.getFollowData()
			this.getAuthorData()
			uni.$on('update_article', this.cancelFollowArticle)
			uni.$on('update_author', this.getAuthorData)
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.follow {
		height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1;

		.follow-tab {
			height: 30px;
			padding: 10px 20px;
			border-bottom: 1px #f5f5f5 solid;

			.follow-tab__box {
				display: flex;
				width: 100%;
				height: 100%;
				border: 1px solid $mk-base-color;
				border-radius: 5px;

				.follow-tab__item {
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #666;
					font-size: 14px;

					&:first-child {
						border-right: 1px solid $mk-base-color;
					}

					&.active {
						color: $mk-base-color;
					}
				}
			}
		}

		.follow-list {
			flex: 1;

			.follow-list__swiper {
				height: 100%;

				.swiper-item {
					height: 100%;
				}

				.no-data {
					padding: 50px;
					font-size: 14px;
					color: #999;
					text-align: center;
				}
			}
		}
	}
</style>
