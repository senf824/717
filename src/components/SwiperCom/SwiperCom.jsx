import React,{ Component } from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

class SwiperCom extends Component {
  render() {
    return <div className="swiper-container" ref="scDom">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <img src={require("../../static/images/banner1.jpg")} alt="" />
          </div>
          <div className="swiper-slide">
            <img src={require("../../static/images/banner2.png")} alt="" />
          </div>
          <div className="swiper-slide">
            <img src={require("../../static/images/banner3.png")} alt="" />
          </div>
          <div className="swiper-slide">
            <img src={require("../../static/images/banner4.png")} alt="" />
          </div>
          <div className="swiper-slide">
            <img src={require("../../static/images/banner5.png")} alt="" />
          </div>
        </div>
      </div>;
  }
  componentDidMount() {
    new Swiper(this.refs.scDom,{
      autoplay: true,
      loop:true
    })
  }
}

export default SwiperCom