<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<view :style="{height: statusBarHeight+'px'}"></view>
			<view class="navbar-content" :style="{ height: navbarHeight + 'px', width: searchWidth ? searchWidth + 'px' : '100%'}">		
				<view class="navbar-serach">
					<view class="navbar-serach_icon">
						<uni-icons type="search" size="16" color="999"></uni-icons>
					</view>
					<view class="navbar-serach_text">react 17.0</view>
				</view>			
			</view>
		</view>
		<view :style="{height: navbarHeight + statusBarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		name:"navbar",
		data() {
			return {
				statusBarHeight: 0,
				navbarHeight: 45,
				searchWidth: 0
			};
		},
		methods:{
			
		},
		created() {
			// 获取状态栏高度
			const info = uni.getSystemInfoSync()
			this.statusBarHeight = info.statusBarHeight
			
			// 获取胶囊按钮的位置
			// #ifndef H5
			const menuButtonInfo  = uni.getMenuButtonBoundingClientRect()
			// 导航栏高度 =（胶囊底部距离页面顶部高度 - 状态栏高度） + （胶囊顶部距离页面顶部高度 - 状态栏高度）
			const navbarHeight = ( menuButtonInfo.bottom - this.statusBarHeight ) + ( menuButtonInfo.top - this.statusBarHeight )
			this.navbarHeight = navbarHeight
			this.searchWidth = menuButtonInfo.left
			// #endif 
		}
	}
</script>

<style lang="scss" scoped>
	// @import '../../common/css/icon.css';
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
				.navbar-serach{
					display: flex;
					justify-content: row;
					align-items: center;
					padding: 0 15px;
					width: 100%;
					height: 30px;
					border-radius: 30px;
					background-color: #fff;
					.navbar-serach_icon{
						margin-right: 10px;
					}
					.navbar-serach_text{
						font-size: 12px;
						color: 999;
					}
				}
			}
		}
	}
</style>
