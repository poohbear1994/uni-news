(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home-detail/home-detail"],{"05e4":function(t,e,n){"use strict";var a=n("3002"),i=n.n(a);i.a},3002:function(t,e,n){},8875:function(t,e,n){"use strict";n.r(e);var a=n("b860"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},b860:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("a34a")),i=n("9305");function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,a,i,o,r){try{var s=t[o](r),u=s.value}catch(c){return void n(c)}s.done?e(u):Promise.resolve(u).then(a,i)}function s(t){return function(){var e=this,n=arguments;return new Promise((function(a,i){var o=t.apply(e,n);function s(t){r(o,a,i,s,u,"next",t)}function u(t){r(o,a,i,s,u,"throw",t)}s(void 0)}))}}var u=function(){Promise.all([n.e("common/vendor"),n.e("components/gaoyia-parse/parse")]).then(function(){return resolve(n("b19d"))}.bind(null,n)).catch(n.oe)},c=new i.IndexModel,l={components:{uParse:u},data:function(){return{detailData:{},noData:'<p style="text-align:center; color:#666">详情加载中...</p>',commentsList:[],commentOfReply:{},currentMode:"comment",isSubReply:!1,popupSwitch:0}},methods:{submit:function(e,n){var i=this;return s(a.default.mark((function o(){var r,s,u,l;return a.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.showLoading(),r=null,"comment"===i.currentMode?r=i.setPostCommentData(e):"reply"===i.currentMode&&(s=i.getCommentOfReply(),r=i.setPostReplyData(s,e)),a.next=5,c.updateComment(r);case 5:if(u=a.sent,t.hideLoading(),i.setIsSubReply(!1),200!==u.code){a.next=18;break}return t.showToast({title:"comment"===i.currentMode?"评论成功":"回复成功",icon:"success"}),a.next=12,i.getComments();case 12:return l=a.sent,i.setCommentsList(l),n(),a.abrupt("return");case 18:t.showToast({title:"请检查网络",icon:"none"});case 19:case"end":return a.stop()}}),o)})))()},setPostCommentData:function(t){var e=t,n=this.detailData._id;return{article_id:n,content:e}},reply:function(t){this.openPopup("reply"),this.setCommentOfReply(t.comment),t.comment.reply_id&&this.setIsSubReply(!0)},setCommentOfReply:function(t){this.commentOfReply=t},getCommentOfReply:function(){return this.commentOfReply},setIsSubReply:function(t){this.isSubReply=t},setPostReplyData:function(t,e){var n={article_id:this.detailData._id,comment_id:t.comment_id,content:e};return this.isSubReply&&(n.reply_id=t.reply_id,n.is_subReply=this.isSubReply),n},follow:function(e){var n=this;return s(a.default.mark((function i(){var o,r;return a.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return o=n.isFollow(),t.showLoading(),a.next=4,c.updateAuthor({author_id:e});case 4:r=a.sent,t.hideLoading(),200===r.code?(t.$emit("update_author"),wx.showToast({title:o?"已取消关注":"关注成功",icon:o?"none":"success"}),n.changeFollowState(),o=n.isFollow()):wx.showToast({title:"网络不好，稍后重试",icon:"none"});case 7:case"end":return a.stop()}}),i)})))()},isFollow:function(){return this.detailData.is_author_like},changeFollowState:function(){this.detailData.is_author_like=!this.detailData.is_author_like},likeTap:function(){var e=this;return s(a.default.mark((function n(){var i,o;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=e.isLike(),t.showLoading(),n.next=4,c.updateLike({article_id:e.detailData._id});case 4:o=n.sent,t.hideLoading(),200===o.code?(e.changeLikeState(),t.$emit("update_article",{item:e.detailData,type:"index"}),wx.showToast({title:i?"取消收藏":"已收藏",icon:"none"})):wx.showToast({title:"网络不好，稍后重试",icon:"none"});case 7:case"end":return n.stop()}}),n)})))()},isLike:function(){return this.detailData.is_like},changeLikeState:function(){this.detailData.is_like=!this.detailData.is_like},thumbsUp:function(e){var n=this;return s(a.default.mark((function i(){var o;return a.default.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!n.isThumbsUp()){a.next=3;break}return wx.showToast({title:"您已经点赞过",icon:"none"}),a.abrupt("return");case 3:return t.showLoading(),a.next=6,c.updateThumbsUp({article_id:e});case 6:o=a.sent,t.hideLoading(),200===o.code&&(n.changeThumbsUp(),wx.showToast({title:o.msg,icon:"none"}));case 9:case"end":return a.stop()}}),i)})))()},isThumbsUp:function(){return this.detailData.is_thumbs_up},changeThumbsUp:function(){this.detailData.is_thumbs_up=!this.detailData.is_thumbs_up,this.detailData.thumbs_up_count+=1},setCurrentMode:function(t){this.currentMode=t},openPopup:function(t){this.setCurrentMode(t);var e=Date.parse(new Date);this.popupSwitch=e},setCommentsList:function(t){this.commentsList=t},setPreloadData:function(t){this.detailData=this.analysisQuery(t)},setDetailData:function(t){this.detailData=t},jumpToDetailComments:function(){t.navigateTo({url:"../detail-comments/detail-comments?id=".concat(this.detailData._id)})},getDetailData:function(){var t=this;return s(a.default.mark((function e(){var n;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.getDetail({article_id:t.detailData._id});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})))()},getComments:function(){var t=this;return s(a.default.mark((function e(){var n;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.getComment({article_id:t.detailData._id});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})))()},analysisQuery:function(t){return JSON.parse(t.params)}},onLoad:function(t){var e=this;return s(a.default.mark((function n(){var i,o;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.setPreloadData(t),n.next=3,e.getDetailData();case 3:return i=n.sent,e.setDetailData(i),n.next=7,e.getComments();case 7:o=n.sent,e.setCommentsList(o);case 9:case"end":return n.stop()}}),n)})))()}};e.default=l}).call(this,n("543d")["default"])},c36b:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var a={commentBox:function(){return Promise.all([n.e("common/vendor"),n.e("components/comment-box/comment-box")]).then(n.bind(null,"1959"))},uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"648f"))},commentPopup:function(){return n.e("components/comment-popup/comment-popup").then(n.bind(null,"4305"))}},i=function(){var t=this,e=t.$createElement;t._self._c},o=[]},e222:function(t,e,n){"use strict";(function(t){n("91ee");a(n("66fd"));var e=a(n("ffda"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},ffda:function(t,e,n){"use strict";n.r(e);var a=n("c36b"),i=n("8875");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("05e4");var r,s=n("f0c5"),u=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=u.exports}},[["e222","common/runtime","common/vendor"]]]);