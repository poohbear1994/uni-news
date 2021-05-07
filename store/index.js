import Vue from 'vue'
import Vuex from 'vuex'
import { HISTORY_LENGTH } from '../config/index.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		historyList:[]
	},
	mutations:{
		SET_HISTORY_LIST(state,history) {
			state.historyList=history
		},
		ADD_HISTORY_LIST(state,history) {
			state.historyList.unshift(history)
			if(state.historyList.length > 10) {
				state.historyList.pop()
			}
		},
	},
	actions:{
		set_history({commit,state},history){
			commit('SET_HISTORY_LIST',history)
		},
		add_history({commit,state},history){
			commit('ADD_HISTORY_LIST',history)
		}
	}
})

export default store