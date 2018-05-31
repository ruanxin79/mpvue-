import request from './request'

export const getOpenId = (params) => request('/v1/userOpenId', 'get', params);

export const getProductDetail = (params) => request('/v1/getProductDetail', 'get', params)

export const createOrder = (params) => request('/v1/createOrder', 'post', params)

export const getBannerList = (params) => request('/v1/getBannerList', 'get', params)

export const getHotProductList = (params) => request('/v1/hotProductList', 'get', params)


