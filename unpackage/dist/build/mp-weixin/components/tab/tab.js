(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tab/tab"],{"16e7":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={name:"tab",props:{list:{type:Array,default:function(){return[]}},tabIndex:{type:Number,default:function(){return 0}}},data:function(){return{activeIndex:0}},watch:{tabIndex:function(n){this.activeIndex=n}},methods:{clickTab:function(n,t){this.activeIndex=t,this.$emit("tab",{data:n,index:t})},open:function(){n.navigateTo({url:"/pages/home-label/home-label"})}}};t.default=e}).call(this,e("543d")["default"])},"1b15":function(n,t,e){},"1e82":function(n,t,e){"use strict";var u=e("1b15"),a=e.n(u);a.a},"4d02":function(n,t,e){"use strict";e.r(t);var u=e("e4cb"),a=e("9906");for(var i in a)"default"!==i&&function(n){e.d(t,n,(function(){return a[n]}))}(i);e("1e82");var c,o=e("f0c5"),r=Object(o["a"])(a["default"],u["b"],u["c"],!1,null,"1841df88",null,!1,u["a"],c);t["default"]=r.exports},9906:function(n,t,e){"use strict";e.r(t);var u=e("16e7"),a=e.n(u);for(var i in u)"default"!==i&&function(n){e.d(t,n,(function(){return u[n]}))}(i);t["default"]=a.a},e4cb:function(n,t,e){"use strict";e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return i})),e.d(t,"a",(function(){return u}));var u={uniIcons:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(e.bind(null,"648f"))}},a=function(){var n=this,t=n.$createElement;n._self._c},i=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tab/tab-create-component',
    {
        'components/tab/tab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4d02"))
        })
    },
    [['components/tab/tab-create-component']]
]);
