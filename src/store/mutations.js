import * as types from './mutation-types'
export default {
    [types.INIT_USERINFO] (state, {userInfo}) {
    	state.userInfo = userInfo;
    },
    [types.SAVE_LOGIN_CODE] (state, {loginCode}) {
    	console.log(loginCode)
    	state.loginCode = loginCode;
    }
}