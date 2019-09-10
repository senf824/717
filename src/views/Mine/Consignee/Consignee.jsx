import React, { Component } from 'react'
import $http from '../../../utils/http'
import {getCookie} from '../../../utils/utils';
import './Consignee.scss'
// 收货人
class Consignee extends Component {
  constructor() {
    super();
    this.state = {
      obj:{
        province: '北京',
        city: '北京',
        region: '海淀区',
        token: getCookie('token')
      },
      provinceList: null, // 省
      cityList: null, // 市
      regionList: null // 区
    }
    this.goBack = this.goBack.bind(this);
    this.toSave=this.toSave.bind(this);
  }
  goBack() {
    const { history } = this.props;
    history.go(-1);
  }
  // 获取相应的val值
  getVal(e,n) {
    const { obj, provinceList, cityList, regionList } = this.state;
    let newObj = {...obj};
    const val = e.target.value;
    newObj[n]=val;
    this.setState({
      obj:newObj
    })
    switch (e.target.name) {
      case 'province':  // 选中省时
        provinceList.forEach(item=>{
          if(item.name === val){
            this.setState({
              cityList: item.city,
              regionList: item.city[0].area
            });
          }
        })
        break;
      case 'city':  // 选中市时
        cityList.forEach(item=>{
          if(item.name === val){
            this.setState({
              regionList: item.area
            })
          }
        })
        break;
    }
  }
  // 向后台发送新的邮寄地址
  toSave() {
    // console.log("向后台发送新的邮寄地址 带token");
    const { history } = this.props;
    const { obj } = this.state;
    // 正则判断val值
    // let reg_exp_name=/([A-Za-z\d\u4e00-\u9f50]+)$/g; // 收货人姓名正则
    // let reg_exp_phone = /^[1][3,4,5,7,8][0-9]{9}$/; // 手机号正则
    // if(reg_exp_name.test(obj.name)){
    //   alert('请正确输入收货人姓名')
    // }
    // if(reg_exp_phone.test(obj.phone)){
    //   alert('请正确输入手机号')
    // }
    // if(!obj.address){
    //   alert('请填写详细地址')
    // }

    if ((!obj.name || !obj.phone || !obj.address)) return;
    $http
      .post("/user/Mail/addNew", obj)
      .then(res => {
        // console.log(res)
        if (res.success === 1) {
          history.go(-1);
        }
      });
  }
  // 请求级联菜单数据
  componentDidMount() {
    $http.get("/user/Mail/pcr",{})
    .then(res=>{
      this.setState({
        provinceList:res,
        cityList: res[0].city,
        regionList: res[0].city[0].area
      })
    })
  }
  render() {
    const { provinceList, cityList, regionList } = this.state;
    return (
      <div id='consignee'>
        <header>
          <i className="iconfont icon-fanhui" onClick={this.goBack} />
          <p>收货人</p>
          <i />
        </header>
        <section>
          <p>
            <input type="text" placeholder='收货人姓名' onChange={(e)=>{this.getVal(e,'name')}}/>
          </p>
          <p>
            <input type="text" placeholder='手机号' onChange={(e)=>{this.getVal(e,'phone')}}/>
          </p>
          <p className='select'>
            <select className='province' name="province" id="" onChange={(e)=>{this.getVal(e,'province')}}>
              {
                // 省
                provinceList && provinceList.map((item,idx)=>{
                  return <option key={idx} value={item.name}>{item.name}</option>
                })
              }
            </select>
            <small></small>
            <select className='city' name="city" id="" onChange={(e)=>{this.getVal(e,'city')}}>
              {
                // 市
                cityList && cityList.map((item,idx)=>{
                  return <option key={idx} value={item.name}>{item.name}</option>
                })
              }
            </select>
          </p>
          <p>
            <select className='district' name="" id="" onChange={(e)=>{this.getVal(e,'region')}}>
              {
                // 区
                regionList && regionList.map((item,idx)=>{
                  return <option key={idx} value={item}>{item}</option>
                })
              }
            </select>
          </p>
          <p>
            <input type="text" placeholder='详细地址' onChange={(e)=>{this.getVal(e,'address')}}/>
          </p>
          <p><span className='default'>√</span>设为默认地址</p>
          <button onClick={this.toSave}>保存</button>
        </section>
      </div>
    );
  }
}

export default Consignee
