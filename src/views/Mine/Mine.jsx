import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Mine.scss'

const ICON1 = [
  {
    icon: "iconfont icon-daifukuandingdan",
    name: "待付款"
  },
  {
    icon: "iconfont icon-daifahuo",
    name: "待发货"
  },
  {
    icon: "iconfont icon-yifahuo",
    name: "待收货"
  },
  {
    icon: "iconfont icon-shouhou",
    name: "售后"
  },
  {
    icon: "iconfont icon-yduiwodedingdan",
    name: "我的订单》"
  }
];
class Mine extends Component {
  constructor() {
    super()
    this.toSetting=this.toSetting.bind(this)
    this.toSite=this.toSite.bind(this)
  }
  toSetting() {
    const { history } = this.props;
    history.push('/setting')
  }
  // 去到地址页
  toSite() {
    const { history } = this.props;
    history.push("/address"); 
  }
  render() {
    const { userInfo } = this.props
    return (
      <div id='mine'>
        <header>
          <i className='iconfont icon-shezhi' onClick={this.toSetting}></i>
          <p>
            我的717商城
          </p>
        </header>
        <section>
          <div className="top">
            <img src={require('../../static/images/user.png')} alt=""/>
            <p className='username'>{userInfo.name}</p>
            <p className='username'>{userInfo.nickName}</p>
          </div>
          <div className='shop'>
            <img src={require('../../static/images/shoping.png')} alt=""/>
            <p>我的店铺</p>
            <i className='iconfont icon-qianjin'></i>
          </div>
          <div className='icon-list'>
            {ICON1.map((item, idx) => {
              return (
                <div className='icon-item' key={idx}>
                  <i className={item.icon}></i>
                  <p>{item.name}</p> 
                </div>
              );
            })}
          </div>
          <ul className='ul-list'>
            <li>
              <i className='iconfont icon-yly_zhanghuyue'></i>
              <p>账户余额 <span>></span></p>
            </li>
            <li onClick={this.toSite}>
              <i className='iconfont icon-dizhi'></i>
              <p>地址管理 <span>></span></p>
            </li>
            <li>
              <i className='iconfont icon-kefu'></i>
              <p>我的客服 <span>></span></p>
            </li>
          </ul>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    userInfo: JSON.parse(localStorage.getItem('user-info')) 
  }
}
export default connect(mapStateToProps)(Mine)

/**
 * 
      
 */