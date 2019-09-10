import React, { Component } from 'react'
import './Detail.css'

class Detail extends Component {
  render() {
    console.log(this.props)
    console.log(this.props.location.state.id)
    return (
      <div>
        Detail
      </div>
    )
  }
}

export default Detail