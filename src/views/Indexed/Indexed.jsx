import React, { Component } from 'react'
import Routed from '../../components/Routed'
import { NavLink, Redirect, Switch } from 'react-router-dom'
import $http from "../../utils/http";
import { router } from "../../routes/router.config";
import './Indexed.css'

class Indexed extends Component {
  render() {
    const { routes } = this.props
    return <div className="wrapper">
        <div className="content">
          <Switch>
            <Redirect exact from="/index" to="/index/home" />
            <Routed exact routes={routes} />
          </Switch>
        </div>
        <div className="footer">
          {router.ROUTER_LINK.map((item, index) => {
            return <NavLink to={item.to} key={index} activeStyle={{ color: "#FC4141" }}>
                <i className={item.icon} />
                <span>{item.name}</span>
              </NavLink>;
          })}
        </div>
      </div>;
  }
  componentDidMount() {
    //  $http
    //    .get(
    //      "/server/test.json",
    //      { id: 2, name: "习大大" }
    //    )
    //    .then(data => {
    //      console.log(data);
    //    })
    //    .catch(err => {
    //      console.log(err);
    //    });
  }
}

export default Indexed