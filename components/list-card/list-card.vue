<template>
	<view @click="open">
		<!-- 基础卡片样式 -->
		<view v-if="item.mode === 'base'" class="list-card">
			<view class="listcard-image">
				<image :src="item.cover[0]" mode="aspectFill" />
			</view>
			<view class="listcard-content">
				<view class="listcard-content_title">
					<text>{{item.title}}</text>
					<like :item="item" :types="types"></like>
				</view>
				<view class="listcard-content__des">
					<view class="listcard-content__des-label">
						<view class="listcard-content__des-label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="listcard-content__des-browe">{{item.
browse_count}}浏览</view>
				</view>
			</view>
		</view>

		<!-- 多图模式 -->
		<view class="list-card mode-column" v-if="item.mode === 'column'">
			<view class="listcard-content">
				<view class="listcard-content_title">
					<text>{{item.title}}</text>
					<like :item="item" :types="types"></like>
				</view>
				<view class="listcard-image">
					<view v-if="index < 3" v-for="(img, index) in item.cover" :key="index" class="listcard-image__item">
						<image :src="img" mode="aspectFill" />
					</view>
				</view>
				<view class="listcard-content__des">
					<view class="listcard-content__des-label">
						<view class="listcard-content__des-label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="listcard-content__des-browe">{{item.
browse_count}}浏览</view>
				</view>
			</view>
		</view>

		<!-- 大图模式 -->
		<view class="list-card mode-image" v-if="item.mode === 'image'">
			<view class="listcard-content">
				<view class="listcard-image">
					<image :src="item.cover[0]" mode="scaleToFill" />
				</view>
				<view class="listcard-content_title">
					<text>{{item.title}}</text>
					<like :item="item" :types="types"></like>
				</view>
				<view class="listcard-content__des">
					<view class="listcard-content__des-label">
						<view class="listcard-content__des-label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="listcard-content__des-browe">{{item.
browse_count}}浏览</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "list-card",
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			},
			types: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			};
		},
		methods: {
			// 跳转页面
			open() {
				this.$emit('click',this.item)
				this.jumpToDetail()
			},
			// 跳转到详情页
			jumpToDetail(){
				const params = this.setDetailPreloadData()
				uni.navigateTo({
					url:`/pages/home-detail/home-detail?params=${JSON.stringify(params)}`
				})
			},
			// 设置传给detail页预加载用的数据
			setDetailPreloadData(){
				const { _id, title, create_time, thumbs_up_count, browse_count, author } = this.item
				return { _id, title, create_time, thumbs_up_count, browse_count, author }
			}
		}
	}
</script>

<style lang="scss">
	.list-card {
		display: flex;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
		box-sizing: border-box;

		.listcard-image {
			flex-shrink: 0;
			width: 60px;
			height: 60px;
			border-radius: 5px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.listcard-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;

			.listcard-content_title {
				position: relative;
				padding-right: 30px;
				font-size: 14px;
				color: #333;
				font-weight: 400;
				line-height: 1.2;

				text {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}

			.listcard-content__des {
				display: flex;
				justify-content: space-between;
				font-size: 12px;

				.listcard-content__des-label {
					display: flex;

					.listcard-content__des-label-item {
						padding: 0 5px;
						margin-right: 5px;
						border-radius: 5px;
						color: $mk-base-color;
						border: 1px solid $mk-base-color;
					}
				}

				.listcard-content__des-browe {
					color: #999;
					line-height: 1.5;
				}
			}
		}

		&.mode-column {
			.listcard-content {
				width: 100%;
				padding-left: 0;

				.listcard-image {
					display: flex;
					margin-top: 10px;
					width: 100%;
					height: 70px;

					.listcard-image__item {
						margin-left: 10px;
						width: 100%;
						border-radius: 5px;
						overflow: hidden;
						background-color: #000;

						&:first-child {
							margin-left: 0;
						}

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.listcard-content__des {
					margin-top: 10px;
				}
			}
		}

		&.mode-image {
			flex-direction: column;

			.listcard-image {
				width: 100%;
				height: 100px;
			}

			.listcard-content {
				padding-left: 0;
				margin-top: 10px;

				.listcard-content__des {
					display: flex;
					align-items: center;
					margin-top: 10px;
				}
			}
		}
	}
</style>
