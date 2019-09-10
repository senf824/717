import React, { Component } from 'react'
import {loginOut} from '../../utils/utils'
import './Setting.scss'

class Setting extends Component {
  constructor() {
    super()
    this.loginout=this.loginout.bind(this)
    this.toMine=this.toMine.bind(this)
  }
  loginout() {
    loginOut()
    const {history} = this.props;
    history.push("/index/home");
  }
  toMine() {
    const { history } = this.props;
    history.push("/index/mine");
  }
  render() {
    return <div id="setting">
        <header>
          <span>
            <i className="iconfont icon-fanhui" onClick={this.toMine} />
          </span>
          <p>设置</p>
          <span />
        </header>
        <section>
          <p className="user-top">
            <span>我的头像</span> <i className="iconfont icon-qianjin" />
          </p>
          <p>
            <span>用户名</span> <i className="iconfont icon-qianjin" />
          </p>
          <p>
            <span>我的二维码名片</span> <i className="iconfont icon-qianjin" />
          </p>
          <button onClick={this.loginout}>退出登录</button>
        </section>
      </div>;
  }
}

export default Setting