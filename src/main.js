import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/store'
// config router
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { router } from './routes/router.config'
import Routed from "./components/Routed";
// font set & common style set
import './utils/fontSet'
import './static/css/style.css'
import "./static/fonts/iconfont.css";
// call react-dom to render root
ReactDom.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/index" />
        <Routed exact routes={router.ROUTER_VIEW} />
      </Switch>
    </Router>
  </Provider>
  ,
  document.getElementById("root")
);