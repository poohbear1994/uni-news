import Vue from 'vue'
import Vuex from 'vuex'
import { HISTORY_LENGTH } from '../config/index.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		historyList: uni.getStorageSync('__history') || []
	},
	mutations:{
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