import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
	userInfo: {},
	loginCode: "",
	openId: '',
	productDetail: {},
	banners: [],
	activates: [],
	orderDetail: {},
	disabled: true,
};

export default new Vuex.Store({
    state,
    actions,
    mutations
})