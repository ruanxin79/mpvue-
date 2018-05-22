import * as types from './mutation-types'
import * as wx from '../utils/wx'
import * as api from '../utils/api'

export const initPage = ({commit}, {}) => {
    wx.getUserInfo().then(userInfo => {
        commit(types.INIT_USERINFO, {userInfo})
    })

    wx.getLoginCode().then((loginCode) => {
    	commit(types.SAVE_LOGIN_CODE, {loginCode})
    	api.getOpenId({code: loginCode}).then((res) => {
    		console.log(res)
    	}).catch((e) => {
    		console.log(e)
    	})
    })


}