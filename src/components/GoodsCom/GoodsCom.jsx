import React, { Component } from 'react'
import $http from '../../utils/http'
import Toast from "../../components/Toast";
// import Lazyload from 'react-lazyload'
import { withRouter } from 'react-router-dom'
import { getCookie } from "../../utils/utils";
import { connect } from 'react-redux'
import { ADD_CART } from '../../store/reducers'
import './GoodsCom.scss'

// const Placeholder = () =>{
//   return <img src={require('../../static/images/default.jpg')} alt=""/>
// }
class GoodsCom extends Component {
  constructor() {
    super()
    this.state={
      content: null,
      time: 1000
    }
    this.addCart=this.addCart.bind(this)
  }
  // 添加购物车
  addCart(e) {
    const { data, history, location } = this.props;
    e.stopPropagation()
    if(getCookie('token')){ // 用户已登录
      $http
        .post("/user/Cart/addCart", {
          token: getCookie("token"),
          goods_id: data.goods_id,
          goods_info: data
        })
        .then(res => {
          if(res === 1){
            this.setState({
              content: '加入购物车成功'
            })
            this.props.dispatch({
              type:ADD_CART,
              data:{
                ...data,
                count:1,
                selected:0
              }
            })
          }else{
            this.setState({
              content: '登录过期，请重新登录'
            },()=>{
              setTimeout(() => {
                history.push('/login',{
                  from: location.pathname
                })
              }, 2000);
            })
          }
        });
    }else{ // 用户未登录跳转到登录页
      this.setState({
        content: '请登录账号'
      },()=>{
        setTimeout(() => {
          history.push('/login',{
            from: location.pathname
          })
        }, 2000);
      })
    }
  }
  // 跳转详情页
  toDetail(id) {
    const { history } = this.props
    history.push(`/detail?goods_id=${id}`,{id})
    // console.log(id)
  }
  callbackToast() {
    this.setState({
      content: null
    })
  }
  render() {
    // console.log(this.props);
    const { content, time } = this.state
    const { data } = this.props;
    return <dl className="goods-item" onClick={() => this.toDetail(data.goods_id)}>
        <dt>
          {/* <Lazyload overflow once height={'100%'} placeholder={<Placeholder/>} debounce={200}> */}
          <img src={`http://www.lb717.com//${data.obj_data}`} alt="" />
          {/* </Lazyload> */}
        </dt>
        <dd>
          <p className="goods-detail">{data.goods_name}</p>
          <p className="goods-price-box">
            <span className="goods-price">￥{data.discount_price}</span>
            <i className="iconfont icon-gouwuche" onClick={this.addCart}>
              <small>+</small>
            </i>
          </p>
          {
            content && <Toast content={content} time={time} callback={ this.callbackToast.bind(this)}/>
          }
        </dd>
      </dl>;
  }
}

export default connect(null)(withRouter(GoodsCom));