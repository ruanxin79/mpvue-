import * as types from './mutation-types'
export default {
    //初始化页面，获取问卷信息
    [types.INIT_PAGE] (state, {count}) {
        state.count = count;
    }
}