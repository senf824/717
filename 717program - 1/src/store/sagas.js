import {takeEvery, takeLatest} from 'redux-saga/effects'
import {call,put} from 'redux-saga/effects'

import $http from '../utils/http'
// 每一个saga就是一个 generator 函数

// worker saga
function* fetchData() {
  // 使用call去请求数据，call(fn,param)，即fn(param)
  // 实现异步转同步 (适用于串行接口)
  try{
    let res = yield call($http.post,'/mall/index/getGoodsChannel',{channel_id:3})
    // yield //...
    // yield //...
    console.log('通过saga请求数据成功')
    // put 在 saga 中替代dispatch 来触发action 的函数
    yield put({
      type:'TEST_SAGA',
      data:JSON.parse(res)
    })
  }catch(err){
    yield put({
      type:'TEST_SAGA_ERROR',
      data:err
    })
  }
}

// watcher saga

export default function* watchFetch() {
  // 监听每一个type为GET_GOODS_LIST的action
  yield takeEvery(['GET_GOODS_LIST'],fetchData) // 返回每一个
  // yield takeLatest(['GET_GOODS_LIST'],fetchData) // 返回最后一个
}
