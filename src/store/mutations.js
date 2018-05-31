import * as types from './mutation-types'
export default {
    [types.INIT_USERINFO] (state, {userInfo}) {
    	state.userInfo = userInfo;
    },
    [types.SAVE_LOGIN_CODE] (state, {loginCode}) {
    	state.loginCode = loginCode;
    },
    [types.SAVE_PRODUCT_DETAIL] (state, {productDetail}) {
    	state.productDetail = productDetail;
    },
    [types.SAVE_OPENID] (state, {openId}) {
    	state.openId = openId;
    },   
    [types.SAVE_BANNER_ACTIVATE] (state, {banners, activates}) {
        state.banners = banners;
        state.activates = activates;
    },     
}