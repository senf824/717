import React, { Component } from 'react'
import $http from '../../utils/http'
import './Catagory.scss'

class Catagory extends Component {
  constructor() {
    super();
    this.state = {
      catagoryList: null,
      activeIndex: 0,
      list: null
    };
    this.toSearch=this.toSearch.bind(this)
  }
  // 进入搜索页
  toSearch() {
    const { history } = this.props;
    history.push("/index/search");
  }
  // 切换类名
  toggleActive(idx) {
    const { catagoryList } = this.state;
    this.setState({
      activeIndex: idx,
      list: catagoryList[idx].list
    });
  }
  render() {
    const { activeIndex, list, catagoryList } = this.state;
    return (
      catagoryList && (
        <div id="catagory">
          <header>
            <i className="iconfont icon-sousuokuang" />
            <input type="text" placeholder="输入您要购买的商品" onFocus={this.toSearch} />
          </header>
          <section>
            <ul className="left">
              {catagoryList.map((item, idx) => {
                return (
                  <li
                    className={activeIndex === idx ? "active" : ""}
                    key={idx}
                    onClick={() => this.toggleActive(idx)}
                  >
                    {item.title}
                  </li>
                );
              })}
            </ul>
            <div className="right">
              {list.map((item, idx) => {
                return (
                  <dl key={idx}>
                    <dt>
                      <img
                        src={require(`../../static/images/${item.img}@2x.png`)}
                        alt=""
                      />
                    </dt>
                    <dd>{item.name}</dd>
                  </dl>
                );
              })}
            </div>
          </section>
        </div>
      )
    );
  }
  componentDidMount() {
    $http.get("/mobile/Category/categorySon", { sonid: 2 }).then(res => {
      this.setState({
        catagoryList: res,
        list: res[0].list
      });
    });
  }
}

export default Catagory