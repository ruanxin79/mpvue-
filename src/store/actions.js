import * as types from './mutation-types'
import * as wx from '../utils/wx'
import * as api from '../utils/api'
import store from './index'

export const initPage = ({
  commit
}, {}) => {
  wx.getUserInfo().then(userInfo => {
    commit(types.INIT_USERINFO, {
      userInfo
    })
  })

  wx.getLoginCode().then((loginCode) => {
    commit(types.SAVE_LOGIN_CODE, {
      loginCode
    })
    api.getOpenId({
      code: loginCode
    }).then((res) => {
      commit(types.SAVE_OPENID, {
        openId: res.data.openid
      })
    })
  })

  api.getBannerList().then((res) => {

    let banners = res.data.filter(item => item.type == 0);
    let activates = res.data.filter(item => item.type == 1);

    commit(types.SAVE_BANNER_ACTIVATE, {
      banners,
      activates
    })
  })
}

export const requsetProductDetail = ({
  commit
}, {
  productId
}) => {
  let params = {
    serial_number: productId,
    openid: store.state.openId
  };
  api.getProductDetail(params).then((res) => {
    commit(types.SAVE_PRODUCT_DETAIL, {
      productDetail: res.data
    })
  })
}


