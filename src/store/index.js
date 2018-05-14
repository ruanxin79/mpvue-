import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
	count: 0
};

export default new Vuex.Store({
    state,
    actions,
    mutations
})