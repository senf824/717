import React, { Component } from 'react'
import $http from '../../utils/http'
import SwiperCom from '../../components/SwiperCom'
import GoodsCom from '../../components/GoodsCom'
import './Home.scss'

const dllist = [
  "家乡味道",
  "进口食品",
  "牛奶乳品",
  "茶果冲饮",
  "休闲零食",
  "米面粮油",
  "调味调料",
  "酒水饮料"
];
class Home extends Component {
  constructor() {
    super()
    this.state = {
      goodslist: [],
      channel_id: 2,
      caniquery: true
    }
    this.toSearch=this.toSearch.bind(this)
    this.scrolling=this.scrolling.bind(this)
    this.toMine=this.toMine.bind(this)
  }
  // 进入搜索页
  toSearch() {
    const {history} = this.props
    history.push('/index/search')
  }
  // 进入我的页
  toMine() {
    const { history } = this.props;
    history.push("/index/mine");
  }
  // 滚动事件
  scrolling() {
    // console.log(this.state.goodslist);
    if(this.state.channel_id > 8) return;
    if(!this.state.caniquery) return;
    const {scroller} = this.refs
    const st = scroller.scrollTop;
    const sh = scroller.offsetHeight;
    const sw = scroller.scrollHeight
    if (sw - (st + sh) < 50) {
      // console.log("该请求数据了");
      this.setState(
        {
          channel_id: ++this.state.channel_id,
          caniquery: false
        },
        () => {
          $http
            .post("/mall/index/getGoodsChannel", {
              channel_id: this.state.channel_id
            })
            .then(res => {
              this.setState({
                goodslist: [
                  ...this.state.goodslist,
                  ...JSON.parse(res).data.data
                ],
                caniquery: true
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      );
    }
  }
  render() {
    const { goodslist } = this.state
    return <div className="home">
        {/* home的header部分 */}
        <header>
          <span className="homelo">
            <img src={require("../../static/images/homelo.gif")} alt="" />
          </span>
          <p>
            <i className="iconfont icon-sousuokuang" />
            <input type="text" placeholder="请输入您要搜索的商品" onFocus={this.toSearch} />
          </p>
          <span onClick={this.toMine}>
            <small />
            我的店铺
          </span>
        </header>
        <section onScroll={this.scrolling} ref="scroller">
          {/* banner轮播 */}
          <SwiperCom />
          {/* 图文列表1 */}
          <div className="dl1">
            {dllist.map((item, idx) => {
              return <dl key={idx}>
                  <dt>
                    <img src={require(`../../static/images/nav${idx + 1}.png`)} alt="" />
                  </dt>
                  <dd>{item}</dd>
                </dl>;
            })}
          </div>
          {/* 商城动态 */}
          <div className="mall-dynamic">
            <span>商城动态</span>
            <div className='small-swiper'>
              绿色无公害 无污染 无添加 天然有机蔬菜源头吃的放心，健康第一，安全保证，确保蔬菜新鲜。
            </div>
          </div>
          {/* 天天特惠 */}
          <div>
            <div className="title">
              <span>天天特惠</span>
              <small>每天有惊喜</small>
              <span>更多</span>
            </div>
            <div className="img-box">
              <img src="" alt="" />
              <img src="" alt="" />
              <img src="" alt="" />
            </div>
          </div>
          {/* 产品列表 */}
          <div className="goods-list">
            {goodslist && goodslist.map((item, idx) => {
                return <GoodsCom data={item} key={idx} />;
              })}
          </div>
          {
            this.state.channel_id > 8 && <p className='s-bottom'>我是有底线的...</p>
          }
        </section>
      </div>;
  }
  componentDidMount() {
    // 请求goodslist数据
    $http
      .post("/mall/index/getGoodsChannel", {
        channel_id: this.state.channel_id
      })
      .then(res => {
        this.setState({
          goodslist:JSON.parse(res).data.data
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Home