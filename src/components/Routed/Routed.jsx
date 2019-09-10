import React, { Component } from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import { getCookie } from '../../utils/utils'

const isLogin = ()=>{
  return !!getCookie('token')
}
class Routed extends Component {
  render() {
    const { routes } = this.props
    return (
      <Switch>
        {routes.map((item, index) => {
          return (
            <Route 
              key={index} 
              path={item.path} 
              render={
                (location) => {
                  return item.authorization && !isLogin() 
                    ? <Redirect to={{pathname:'/login',state:{from:item.path}}}></Redirect> 
                    : <item.component {...location} routes={item.children} />;
              }} />
          )
        })}
      </Switch>
    )
        
      
  }
}

export default Routed