import React, { Component } from 'react'
import './Toast.css'

class Toast extends Component {
  constructor(props){
    super(props)
    const { content, time, callback } = this.props;
    this.state={
      content,
      time,
      callback
    }
  }
  componentDidMount() {
    const { time, callback } = this.state;
    setTimeout(() => {
      this.setState({
        content: null,
      },()=>{
        callback()
      })
    }, time);
  }
  render() {
    const { content } = this.state
    return content && (
      <div id='toast'>
        {content}
      </div>
    )
  }
}
Toast.defaultProps={
  content:'信息提示条',
  time:2000
}

export default Toast