import React, { Component } from 'react'
import './Result.scss'

class Result extends Component {
  constructor() {
    super()
    this.toSearch = this.toSearch.bind(this)
  }
  toSearch() {
    const { location, history } = this.props;
    history.push(location.state.from)
  }
  render() {
    return (
      <div>
        <i onClick={this.toSearch}>返回</i>
        {this.props.location.state.key_words}
      </div>
    )
  }
  componentDidMount() {
    const { location } = this.props
    // console.log(location.state)
    // 根据location.state.key_words向后台请求相应数据
  }
}

export default Result