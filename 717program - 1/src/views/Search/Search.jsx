import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Search.scss'

const list = ['蜂蜜','三黄鸡','红酒','米面油','红枣','干果','零食']
class Search extends Component {
  constructor() {
    super();
    this.state = {
      historylist: null
    };
    this.toSearch = this.toSearch.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
    this.testSaga=this.testSaga.bind(this)
  }
  toSearch() {
    const keyWords = this.refs.keyWords.value;
    if (!keyWords) return;
    let ls = localStorage;
    if (ls.getItem("SearchHistory")) {
      let shArr = JSON.parse(ls.getItem("SearchHistory"));
      if (shArr.indexOf(keyWords) > -1) return;
      shArr.push(keyWords);
      ls.setItem("SearchHistory", JSON.stringify(shArr));
    } else {
      ls.setItem("SearchHistory", JSON.stringify([keyWords]));
    }
    // 跳转至搜索详情页
    const { history, location } = this.props;
    console.log(this.props)
    history.push("/index/result", {
      key_words: keyWords,
      from: location.pathname
    });
  }
  // 跳转至搜索详情页
  toResult(keyWords) {
    const { history, location } = this.props;
    history.push("/index/result", {
      key_words: keyWords,
      from: location.pathname
    });
  }
  // 删除搜索记录
  clearHistory() {
    localStorage.removeItem("SearchHistory");
    this.setState({
      historylist: null
    })
  }
  // 实验saga
  testSaga() {
    const { dispatch } = this.props
    dispatch({
      type:'GET_GOODS_LIST'
    })
  }
  componentDidMount() {
    if (localStorage.getItem("SearchHistory")) {
      this.setState({
        historylist: JSON.parse(localStorage.getItem("SearchHistory"))
      });
    }
  }
  render() {
    const { historylist } = this.state;
    const { goodsList } = this.props;
    // console.log(goodsList)
    return (
      <div id="search">
        <header>
          <i className="iconfont icon-sousuokuang" />
          <input type="text" placeholder="搜索你想找的商品" ref="keyWords" />
          <span onClick={this.toSearch}>搜索</span>
        </header>
        <section>
          <p>
            最近搜索 
            <i className="iconfont icon-shanchu" onClick={this.clearHistory} />
          </p>
          <ul>
            {historylist ? (
              historylist.map((item, idx) => {
                return (
                  <li key={idx} onClick={() => this.toResult(item)}>
                    {item}
                  </li>
                );
              })
            ) : (
              <div>暂无搜索记录...</div>
            )}
          </ul>
          <p>大家都在搜</p>
          <ul>
            <li onClick={this.testSaga}>点击测试saga中间件</li>
            {list.map((item, idx) => {
              return (
                <li key={idx} onClick={() => this.toResult(item)}>
                  {item}
                </li>
              );
            })}
          </ul>
          <div> 通过saga请求数据，将异步转同步，并渲染：
            <p>{goodsList.data && goodsList.data.data[0].goods_name}</p>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    goodsList:state.goods_list
  }
}
export default connect(mapStateToProps,null,null,{pure:false})(Search)