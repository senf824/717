import React, {Component} from 'react'
import $http from '../../../utils/http'
import {getCookie} from '../../../utils/utils'
import './address.scss'
// 收货地址
class Address extends Component {
  constructor(props) {
    super(props);
    this.state={
      list:null
    }
    this.toConsignee = this.toConsignee.bind(this);
    this.goBack=this.goBack.bind(this)
  }
  // 去设置新的邮寄地址
  toConsignee() {
    const { history } = this.props;
    history.push("/consignee");
  }
  goBack() {
    const { history } = this.props
    history.go(-1)
  }
  componentDidMount() {
    // console.log('根据token向后台请求邮寄地址的列表数据')
    $http.post('/user/Mail/getList',{
      token:getCookie('token')
    })
    .then(res=>{
      if(res.success === 1){
        this.setState({
          list:res.data
        })
      }
    })
  }
  render() {
    const {list} = this.state
    return (
      <div id='address'>
        <header>
          <i className="iconfont icon-fanhui" onClick={this.goBack} />
          <p>收货地址</p>
          <i />
        </header>
        <section>
          {
            list ? list.map((item,idx)=>{
              return (
                <div key={idx} className='item-list'>
                  {console.log(item)}
                  <h3><span>{item.name}</span> <span>{item.phone}</span></h3>
                  <p>{item.city + item.region + item.address}</p>
                  <div className="item-footer">
                    <span>编辑</span>
                    <span>删除</span>
                  </div>
                </div>
              )
            }): <p>目前没有邮寄地址...</p>
          }
          <button onClick={this.toConsignee}><span>+</span>新增地址</button>
        </section>
      </div>
    )
  }
}

export default Address;
