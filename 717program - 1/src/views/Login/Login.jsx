import React, { Component } from "react";
import $http from '../../utils/http'
import {Link} from 'react-router-dom'
// import Toast from "../../components/Toast";
import { connect } from 'react-redux';
import { USER_INFO } from '../../store/reducers'
import "./Login.scss";

class Login extends Component {
  constructor() {
    super();
    // this.state = {
    //   content: null,
    //   time:2000
    // };
    this.toLogin = this.toLogin.bind(this);
    this.toHome = this.toHome.bind(this);
  }
  // 返回home页
  toHome() {
    const { history } = this.props;
    history.push("/index/home");
  }
  // componentDidMount() {
  //   this.setState({
  //     content: "请登录账号"
  //   });
  // }
  // callbackToast() {
  //   this.setState({
  //     content: null
  //   });
  // }
  render() {
    // const { content, time } = this.state
    return (
      <div className="login">
        <header>
          <span>
            <i className="iconfont icon-fanhui" onClick={this.toHome} />
          </span>
          <p>登录717</p>
          <span>
            <Link to="/register">注册</Link>
          </span>
        </header>
        <section>
          <p>
            <i className='iconfont icon-weibiaoti2fuzhi12'></i>
            <input type="text" className="username" ref="username" placeholder='请输入您的用户名'/>
          </p>
          <p>
            <i className='iconfont icon-mima'></i>
            <input type="password" className="password" ref="password" placeholder='请输入您的密码' />
          </p>
          <button onClick={this.toLogin}>立即登录</button>
        </section>
        {/* {content && (
          <Toast content={content} time={time} callback={this.callbackToast.bind(this)} />
        )} */}
      </div>
    );
  }
  toLogin() {
    const { username, password } = this.refs;
    const { location, history } = this.props;
    $http
      .post("/user/login", {
        username: username.value,
        password: password.value
      })
      .then(res => {
        // console.log(res)
        if (res.success === 1) {
          // 把用户信息存储一份到store中
          this.props.saveUser(res.user)
          // 把用户信息存储一份到localStorage中
          localStorage.setItem('user-info',JSON.stringify(res.user))
          // 登录成功后要跳转的页面
          let from = location.state ? location.state.from : "/index/home";
          document.cookie = "token=" + res.token;
          // history.push(from);
          history.replace(from);
        } else {
          alert("登录出错");
        }
      });
  }
}

const mapStateToProps = ()=>{
  return {

  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    saveUser(data){
      dispatch({
        type: USER_INFO,
        data
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
