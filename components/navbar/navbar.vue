<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<view :style="{height: statusBarHeight+'px'}"></view>
			<!-- 导航栏 -->
			<view class="navbar-content" :class="{search:isSearch}"
				:style="{ height: navbarHeight + 'px', width: searchWidth ? searchWidth + 'px' : '100%'}"
				@click.stop="open">
				<view class="navbar-content__search-icons">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<!-- 伪搜索框 -->
				<view v-if="!isSearch" class="navbar-search">
					<view class="navbar-search_icon">
						<uni-icons type="search" size="16" color="999"></uni-icons>
					</view>
					<view class="navbar-search_text">react 17.0</view>
				</view>
				<!-- 真搜索框 -->
				<view v-else class="navbar-search">
					<input class="navbar-search_text" v-model="inputVal" @input="inputChange" type="text"
						placeholder="请输入要搜索的内容" />
				</view>
			</view>
		</view>
		<view :style="{height: navbarHeight + statusBarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		name: "navbar",
		props: {
			isSearch: {
				type: Boolean,
				default: false
			},
			searchWord: {
				type: [Number, String],
				default:''
			}
		},
		data() {
			return {
				statusBarHeight: 0,
				navbarHeight: 45,
				searchWidth: 0,
				inputVal: ''
			};
		},
		watch:{
			searchWord(newVal){
				this.inputVal = newVal
			}
		},
		methods: {
			open() {
				if (this.isSearch) return
				uni.navigateTo({
					url: '../../pages/home-search/home-search'
				})
			},
			inputChange() {
				this.$emit('input',this.inputVal)
			}
		},
		created() {
			// 获取状态栏高度
			const info = uni.getSystemInfoSync()
			this.statusBarHeight = info.statusBarHeight

			// 获取胶囊按钮的位置
			// #ifndef H5
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// 导航栏高度 =（胶囊底部距离页面顶部高度 - 状态栏高度） + （胶囊顶部距离页面顶部高度 - 状态栏高度）
			const navbarHeight = (menuButtonInfo.bottom - this.statusBarHeight) + (menuButtonInfo.top - this
				.statusBarHeight)
			this.navbarHeight = navbarHeight
			this.searchWidth = menuButtonInfo.left
			// #endif 
		}
	}
</script>

<style lang="scss" scoped>
	.navbar {
		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			width: 100%;
			background-color: $mk-base-color;

			.navbar-content {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 45px;
				padding: 0 15px;
				box-sizing: border-box;

				.navbar-search {
					display: flex;
					justify-content: row;
					align-items: center;
					padding: 0 15px;
					width: 100%;
					height: 30px;
					border-radius: 30px;
					background-color: #fff;

					.navbar-search_icon {
						margin-right: 10px;
					}

					.navbar-search_text {
						width: 100%;
						font-size: 14px;
						color: 999;
					}
				}

				&.search {
					padding-left: 0;

					.navbar-content__search-icons {
						margin-left: 10px;
						margin-right: 10px;
					}

					.navbar-search {
						border-radius: 5px;
					}
				}
			}
		}
	}
</style>
