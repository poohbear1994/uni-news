<template>
	<view class="comment-box">
		<view class="comment-header">
			<view class="comment-header__logo">
				<image :src="comment.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-header__info">
				<view v-if="!comment.is_subReply" class="title">
					{{comment.author.author_name}}
				</view>
				<view v-else class="title">
					{{comment.author.author_name}}
					<text class="reply-text">回复</text>
					{{comment.to}}
				</view>
				<view>{{parseTime(comment.create_time)}}</view>
			</view>
		</view>
		<view class="comment-content">
			<view>{{comment.comment_content}}</view>
			<view class="comment-info">
				<view class="comment-button" @click="commentReply({comment,is_reply:reply})">回复</view>
			</view>
			<view class="comment-reply" v-for="item in comment.replys" :key="item.id">
				<comment-box :reply="true" :comment="item" @reply="commentReply"></comment-box>
			</view>
		</view>
	</view>
</template>

<script>
	import commentBox from '@/components/comment-box/comment-box.vue'
	import { parseTime } from '@/utils/index'
	export default {
		name: "comment-box",
		comments: {
			commentBox
		},
		props: {
			comment: {
				type: Object,
				default () {
					return {}
				}
			},
			// 是否是对回复的回复
			reply:{
				type: Boolean,
				default: false
			}
		},
		watch:{
			comment(newVal){
				console.log(newVal)
			}
		},
		data() {
			return {

			};
		},
		methods:{
			commentReply(params){
				// 回复回复
				if(params.is_reply){
					params.comment.reply_id = params.comment.comment_id
					params.comment.comment_id = this.comment.comment_id
				}
				this.$emit('reply',params)
			},
			parseTime(str){
				return parseTime(str)
			}
		}
	}
</script>

<style lang="scss">
	.comment-box {
		margin: 15px 0;

		.comment-header {
			display: flex;

			.comment-header__logo {
				flex-shrink: 0;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.comment-header__info {
				display: flex;
				flex-direction: column;
				padding-left: 12px;
				font-size: 12px;
				color: #999;
				line-height: 1;

				.title {
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;
					.reply-text{
						margin: 0 10px;
						font-size: bold;
						color: #000;
					}
				}
			}

		}

		.comment-content {
			margin-top: 10px;
			font-size: 14px;
			color: #000;

			.comment-info {
				margin-top: 15px;
				display: flex;

				.comment-button {
					padding: 2px 10px;
					font-size: 12px;
					color: #999;
					border-radius: 20px;
					border: 1px solid #ccc;
				}
			}

			.comment-reply {
				display: flex;
				margin: 15px 0;
				padding: 0 10px;
				border: 1px #eee solid;
			}
		}
	}
</style>
