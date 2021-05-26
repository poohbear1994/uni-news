#uni-news#
uni-app开发的小程序与wap

# 页面
* tabbar页面 底部栏页面
	1.index页面 首页
	2.follow页面 关注页
	3.my页面 个人页
* detail-comments页面 评论详情页
* feedback页面 意见反馈页面
* home-detail页面 详情页
* home-label页面 标签编辑页
* home-search页面 搜索页
* my-article页面 我的文章页

# 组件
* like 点赞
* list 首页新闻列表组件
* list-author 文章详情作者组件
* list-card 新闻列表新闻卡片组件
* list-scroll 新闻列表滚动组件
* comment-box 评论组件
* comment-popup 评论输入框弹出层
* navbar 自定义导航栏，兼容微信小程序胶囊按钮
* tab 首页新闻标签

# 功能
* index页 文章收藏功能
* home-label页 标签编辑功能
* home-detail页 评论功能，回复，子回复功能，点赞功能，作者关注功能
* detail-comments 评论功能，回复，子回复功能
* home-search页 文章搜索功能
* feedback页 意见反馈功能

# 难点
1.index页面，home-detail页面 收藏状态的相互关联，通过uni.$emit()与uni.$on()发布订阅模式，进行全局状态的通知切换收藏状态，而my-article页面，follow页面因为收藏之后数据增加，则是进入时重新发送请求，获取新的数据
2.index页面新闻列表，滑动切换不同列表时，不应展示白屏，或者重新请求数据，因此，对请求到的数据进行缓存，而非每次切换时都请求已经有了的，无意义的数据