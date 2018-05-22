import request from './request'

export const getOpenId = (params) => request('/v1/userOpenId', 'get', params);



