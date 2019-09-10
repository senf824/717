import React, { Component } from 'react'
import './Dialog.css'

class Dialog extends Component {
  render() {
    return (
      <div id='dialog'>
        <div className="d_box">
          <h1>提示</h1>
          <div>
            是否删除
          </div>
        </div>
      </div>
    )
  }
}

export default Dialog