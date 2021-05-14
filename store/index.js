import Vue from 'vue'
import Vuex from 'vuex'
import { HISTORY_LENGTH } from '../config/index.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		userinfo: uni.getStorageSync('user_info') || {},
		historyList: uni.getStorageSync('__history') || []
	},
	mutations:{
		SET_USER_INFO(state,userinfo){
			state.userinfo = userinfo
		},
		ADD_HISTORY_LIST(state,history) {
			const list = state.historyList
			list.unshift(history)
			if(list.length > HISTORY_LENGTH) {
				list.pop()
			}
			uni.setStorageSync('__history',list)
		},
		CLEAR_HISTORY_LIST(state){
			state.historyList = []
		}
	},
	actions:{
		set_userinfo({commit,state},userinfo){
			commit('SET_USER_INFO',userinfo)
			uni.setStorageSync('user_info',userinfo)
		},
		add_history({commit,state},history){
			commit('ADD_HISTORY_LIST',history)
		},
		clear_history({commit,state}){
			uni.removeStorageSync('__history')
			commit('CLEAR_HISTORY_LIST')
		}
	}
})

export default store