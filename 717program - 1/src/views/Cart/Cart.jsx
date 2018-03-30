import React, { Component } from 'react'
import $http from '../../utils/http'
import { getCookie } from '../../utils/utils'
import { connect } from 'react-redux'
import { UPDATE_GOODS_LIST, SELECTED_ALL } from '../../store/reducers'

import './Cart.scss'
import CartItem from './CartItem'

class Cart extends Component {
  constructor() {
    super()
    this.state={
      isAll: true,
      edit:'编辑',
      pay:'结算'
    }
    this.toHome=this.toHome.bind(this)
    this.cartEdit=this.cartEdit.bind(this)
  }
  // 返回首页
  toHome() {
    const { history } = this.props;
    history.push("/index/home");
  }
  cartEdit() {
    const { edit, pay } = this.state
    this.setState({
      edit: edit === "编辑" ? "完成" : "编辑",
      pay: edit === "编辑" ? "删除" : "结算"
    });
  }
  componentDidMount() {
    this.props.fetchGoodsList(this.props.history)
  }
  render() {
    const { cartlist, totalCost, selectAll, toggleSelectedAll } = this.props;
    const { isAll, edit, pay } = this.state
    return (
      <div id='cart'>
        <header>
          <span><i className='iconfont icon-fanhui' onClick={this.toHome}></i><b></b></span>
          <p>购物车</p>
          <span> <small onClick={this.cartEdit}> {edit}</small><i className='iconfont icon-tuisongxiaoxi'></i></span>
        </header>
        <section>
          {
            cartlist.length > 0 && cartlist.map((item,idx)=>{
              return <CartItem item={item} key={idx} />;
            }) || cartlist.length === 0 && <div>购物车内暂无商品...</div>
          }
        </section>
        <footer>
          <div className='f-left'>
            <div className='f-left-l'>
              <span 
                onClick={
                  ()=>{
                    this.setState({
                      isAll: !isAll
                    });
                    toggleSelectedAll(isAll)
                  }
                } 
                className={selectAll ? 'item-inp item-inp-active':'item-inp' }></span>
                <span>全选</span> 
            </div>
            <div>
              <p>合计：￥{totalCost}</p>
              <small>（运费：￥0）</small>
            </div>
          </div>
          <span className='f-btn' onClick={()=>{this.toDelGoods()}}>
            {pay}
          </span>
        </footer>
      </div>
    )
  }
  // 删除商品
  toDelGoods() {
    if(this.state.edit === '编辑') return;
    let selectedID=[];
    this.props.cartlist.forEach(item=>{
      if(item.selected === 1){
        selectedID.push(item.goods_id)
      }
    })
    this.props.delCartGoods(selectedID)
  }
}

const mapStateToProps = (state, ownProps)=>{
  // 遍历cart 计算总价
  let totalCost = 0;
  let selectAll = true; // 默认全选
  state.cart.forEach((item,index)=>{
    if (item.selected === 1) {
      totalCost += item.discount_price * item.count;
    }
    if(item.selected === 0){
      selectAll = false;
    }
  })
  return {
    cartlist:state.cart,
    totalCost,
    selectAll
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    fetchGoodsList(history) {
      $http.post('/user/Cart/goodsList',{
        token:getCookie('token')
      })
      .then(res=>{
        if(res.error===1){
          history.push('/login',{
            from:'/index/cart'
          })
        }else{
          dispatch({
            type: UPDATE_GOODS_LIST,
            data: res
          })
        }
      })
    },
    toggleSelectedAll(isAll) {
      dispatch({
        type: SELECTED_ALL,
        data: isAll
      })
    },
    delCartGoods(selectedID){
      $http.post('/user/Cart/delGoods',{
        selectedID,
        token:getCookie('token')
      })
      .then(res=>{
        if(res.success === 1){
          dispatch({
            type: UPDATE_GOODS_LIST,
            data: res.leftGoods
          })
        }
        console.log(res)
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)