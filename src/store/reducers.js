import { combineReducers } from 'redux';
// 添加购物车
export const ADD_CART = 'ADD_CART';
// 删除购物车
export const DELETE_CART = 'DELETE_CART'
// 改变商品数量
export const UPDATE_GOODS_COUNT = "UPDATE_GOODS_COUNT";
// 改变商品选中与否
export const UPDATE_GOODS_SELECTED = "UPDATE_GOODS_SELECTED";
// 更新商品列表
export const UPDATE_GOODS_LIST = "UPDATE_GOODS_LIST";
// 设置全选
export const SELECTED_ALL = "SELECTED_ALL";
// 存储用户信息
export const USER_INFO = 'USER_INFO';
const initState = {
  cart:[],
  user_info:null,
  goods_list:[]
}

const goods_list = (state = initState.goods_list,action)=>{
  switch (action.type) {
    case "TEST_SAGA":
      return action.data;
    default:
      return state;
  }

}

const cart = (state=initState.cart,action)=>{
  switch (action.type) {
    case ADD_CART:
      let flag = false; // 新加的商品购物车里面还没有
      state.forEach((item, index) => {
        if (item.goods_id === action.data.goods_id) {
          ++item.count;
          flag = true;
        }
      });
      return flag ? [...state] : [...state, action.data];
    // case DELETE_CART:
    //   return [...state, action.data];
    case UPDATE_GOODS_COUNT:
      let arr = [...state];
      arr.forEach(item => {
        if (item.goods_id === action.id) {
          item.count = action.data;
        }
      });
      return arr;
    case UPDATE_GOODS_SELECTED:
      let arr2 = [...state];
      arr2.forEach(item => {
        if (item.goods_id === action.id) {
          item.selected = action.data;
        }
      });
      return arr2;
    case UPDATE_GOODS_LIST:
      return action.data
    case SELECTED_ALL:
      let isAll = action.data;
      let arr3 = [...state];
      arr3.forEach(item => {
        item.selected = isAll ? 1 : 0
      });
      return arr3;
    default:
      return state;
  }
  
}

const user_info = (state=initState.user_info,action)=>{
  switch (action.type) {
    case USER_INFO:
      return action.data
    default:
      return {

      }
  }
}

export default combineReducers({
  cart,
  user_info,
  goods_list
});