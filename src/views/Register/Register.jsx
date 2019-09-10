import React, { Component } from 'react'
import $http from '../../utils/http'
import { Link } from "react-router-dom";
import "./Register.scss";

class Register extends Component {
  constructor() {
    super();
    this.toRegister = this.toRegister.bind(this);
    this.toHome = this.toHome.bind(this);
  }
  toHome() {
    const { history } = this.props;
    history.push("/index/home");
  }
  render() {
    return <div className="register">
        <header>
          <span>
            <i className="iconfont icon-fanhui" onClick={this.toHome} />
          </span>
          <p>注册717</p>
          <span>
            <Link to="/login">登录</Link>
          </span>
        </header>
        <section>
          <p>
            <i className="iconfont icon-weibiaoti2fuzhi12" />
            <input type="text" className="username" ref="username" placeholder="请输入您的用户名" />
          </p>
          <p>
            <i className="iconfont icon-mima" />
            <input type="password" className="password" ref="password" placeholder="请输入您的密码" />
          </p>
          <button onClick={this.toRegister}>立即注册</button>
        </section>
      </div>;
  }
  toRegister() {
    const { history } = this.props;
    const { username, password } = this.refs;
    if ((!username.value, !password.value)) return;
    $http
      .post("/user/register", {
        username: username.value,
        password: password.value
      })
      .then(res => {
        if (res.success === 1) {
          history.push("/login");
        }
      });
  }
}

export default Register