
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/tabbar/index/index","pages/tabbar/my/my","pages/tabbar/follow/follow","pages/home-search/home-search","pages/home-label/home-label","pages/home-detail/home-detail","pages/detail-comments/detail-comments","pages/my-article/my-article","pages/feedback/feedback"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F07373","backgroundColor":"#F8F8F8"},"tabBar":{"list":[{"pagePath":"pages/tabbar/index/index","iconPath":"static/tabbar/home.png","selectedIconPath":"static/tabbar/home-active.png","text":"首页"},{"pagePath":"pages/tabbar/follow/follow","iconPath":"static/tabbar/follow.png","selectedIconPath":"static/tabbar/follow-active.png","text":"关注"},{"pagePath":"pages/tabbar/my/my","iconPath":"static/tabbar/my.png","selectedIconPath":"static/tabbar/my-active.png","text":"我的"}],"color":"#666","selectedColor":"#f07373","backgroundColor":"#fff","borderStyle":"black"},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"uni-news","compilerVersion":"3.1.12","entryPagePath":"pages/tabbar/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/tabbar/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","enablePullDownRefresh":false,"scrollIndicator":"none"}},{"path":"/pages/tabbar/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/tabbar/follow/follow","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"关注","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/home-search/home-search","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/home-label/home-label","meta":{},"window":{"navigationBarTitleText":"标签管理","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/home-detail/home-detail","meta":{},"window":{"navigationBarTitleText":"uni-news","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/detail-comments/detail-comments","meta":{},"window":{"navigationBarTitleText":"评论","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/my-article/my-article","meta":{},"window":{"navigationBarTitleText":"我的文章","navigationBarTextStyle":"white","enablePullDownRefresh":false}},{"path":"/pages/feedback/feedback","meta":{},"window":{"navigationBarTitleText":"意见反馈","navigationBarTextStyle":"white","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});